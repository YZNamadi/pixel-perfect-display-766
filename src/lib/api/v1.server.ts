// REST v1 implementation for /api/public/v1/*. Server-only module.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type Ctx = { userId: string; email: string; db: SupabaseClient<Database> };

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function serverClient(): SupabaseClient<Database> {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      // Opaque sb_ keys are not JWTs; send apikey only, never a bearer of the key itself.
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

async function requireCtx(request: Request): Promise<Ctx> {
  const token = new URL(request.url).searchParams.get("token") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) throw new ApiError(401, "Missing bearer token");
  const base = serverClient();
  const { data, error } = await base.auth.getUser(token);
  if (error || !data.user) throw new ApiError(401, "Invalid or expired token");
  const db = createClient<Database>(process.env["SUPABASE_URL"]!, process.env["SUPABASE_PUBLISHABLE_KEY"]!, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (process.env["SUPABASE_PUBLISHABLE_KEY"]!.startsWith("sb_")) {
          const a = h.get("Authorization");
          if (a && a !== `Bearer ${token}`) h.delete("Authorization");
        }
        h.set("apikey", process.env["SUPABASE_PUBLISHABLE_KEY"]!);
        h.set("Authorization", `Bearer ${token}`);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
  return { userId: data.user.id, email: data.user.email ?? "", db };
}

function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}

// Generic CRUD resources. Key = URL segment, value = table + searchable columns.
const RESOURCES: Record<string, { table: string; search: string[]; immutable?: boolean; fixed?: Record<string, unknown> }> = {
  sites: { table: "sites", search: ["name", "city"] },
  equipment: { table: "equipment", search: ["name", "serial", "category"] },
  tickets: { table: "repair_tickets", search: ["title", "description", "assignee"] },
  tasks: { table: "tasks", search: ["title", "category", "assignee"] },
  documents: { table: "documents", search: ["name", "category"] },
  members: { table: "team_members", search: ["name", "email", "role"], fixed: { member_type: "internal" } },
  contractors: { table: "team_members", search: ["name", "email", "role", "company"], fixed: { member_type: "contractor" } },
  certificates: { table: "certificates", search: ["name"] },
  staff: { table: "staff_records", search: ["name", "job_title", "department"] },
  training: { table: "training_records", search: ["course"] },
  reports: { table: "reports", search: ["title", "category", "staff_member"] },
  audit: { table: "audit_log", search: ["actor", "action", "details", "entity"], immutable: true },
  quotes: { table: "ticket_quotes", search: ["note"] },
  notifications: { table: "notifications", search: ["title", "body"] },
};

function pick(res: { table: string; search: string[] }, url: URL, fixed?: Record<string, unknown>) {
  const filters: Record<string, unknown> = { ...fixed };
  for (const [k, v] of url.searchParams.entries()) {
    if (["token", "q", "limit", "offset", "order", "dir"].includes(k)) continue;
    filters[k] = v;
  }
  const q = url.searchParams.get("q");
  let query = (arguments[3] as SupabaseClient<Database>).from(res.table as never).select("*");
  if (q && res.search.length) {
    const or = res.search.map((c) => `${c}.ilike.%${q}%`).join(",");
    query = query.or(or);
  }
  for (const [k, v] of Object.entries(filters)) query = query.eq(k, v as never);
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 100), 1000);
  const offset = Number(url.searchParams.get("offset") ?? 0);
  const order = url.searchParams.get("order");
  if (order) query = query.order(order, { ascending: url.searchParams.get("dir") !== "desc" });
  else query = query.order("created_at", { ascending: false }).order("occurred_at", { ascending: false });
  return query.range(offset, offset + limit - 1);
}

async function listResource(ctx: Ctx, seg: string, url: URL) {
  const res = RESOURCES[seg];
  if (!res) throw new ApiError(404, `Unknown resource ${seg}`);
  const { data, error } = await pick(res, url, res.fixed, ctx.db);
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

async function createResource(ctx: Ctx, seg: string, body: Record<string, unknown>) {
  const res = RESOURCES[seg];
  if (!res) throw new ApiError(404, `Unknown resource ${seg}`);
  delete body.owner_id;
  delete body.id;
  const row = { ...res.fixed, ...body, owner_id: ctx.userId };
  const { data, error } = await ctx.db.from(res.table as never).insert(row as never).select().single();
  if (error) throw new ApiError(400, error.message);
  return json({ data }, 201);
}

async function getResource(ctx: Ctx, seg: string, id: string) {
  const res = RESOURCES[seg];
  if (!res) throw new ApiError(404, `Unknown resource ${seg}`);
  const { data, error } = await ctx.db.from(res.table as never).select("*").eq("id", id).maybeSingle();
  if (error) throw new ApiError(400, error.message);
  if (!data) throw new ApiError(404, "Not found");
  return json({ data });
}

const AUDIT_REVIEW_FIELDS = ["review_status", "priority", "notes"];

async function updateResource(ctx: Ctx, seg: string, id: string, body: Record<string, unknown>) {
  const res = RESOURCES[seg];
  if (!res) throw new ApiError(404, `Unknown resource ${seg}`);
  delete body.owner_id;
  delete body.id;
  delete body.created_at;
  if (res.immutable) {
    const filtered: Record<string, unknown> = {};
    for (const f of AUDIT_REVIEW_FIELDS) if (f in body) filtered[f] = body[f];
    if (!Object.keys(filtered).length) throw new ApiError(403, "Audit entries are immutable; only review fields can be updated");
    body = filtered;
  }
  const { data, error } = await ctx.db.from(res.table as never).update(body as never).eq("id", id).select().single();
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

async function deleteResource(ctx: Ctx, seg: string, id: string) {
  const res = RESOURCES[seg];
  if (!res) throw new ApiError(404, `Unknown resource ${seg}`);
  if (res.immutable) throw new ApiError(403, "Audit entries are read-only and cannot be deleted");
  const { error } = await ctx.db.from(res.table as never).delete().eq("id", id);
  if (error) throw new ApiError(400, error.message);
  return json({ deleted: true });
}

// ---------- Auth ----------
async function signUp(body: { email?: string; password?: string; full_name?: string; account_type?: string }) {
  if (!body.email || !body.password) throw new ApiError(400, "email and password are required");
  const base = serverClient();
  const { data, error } = await base.auth.signUp({
    email: body.email,
    password: body.password,
    options: { data: { full_name: body.full_name ?? "", account_type: body.account_type ?? "facility" } },
  });
  if (error) throw new ApiError(400, error.message);
  return json({ user: data.user, session: data.session, message: data.session ? "Signed up" : "Check your email to confirm your account" }, 201);
}

async function logIn(body: { email?: string; password?: string }) {
  if (!body.email || !body.password) throw new ApiError(400, "email and password are required");
  const base = serverClient();
  const { data, error } = await base.auth.signInWithPassword({ email: body.email, password: body.password });
  if (error) throw new ApiError(401, error.message);
  return json({ session: data.session, user: data.user });
}

async function refreshToken(body: { refresh_token?: string }) {
  if (!body.refresh_token) throw new ApiError(400, "refresh_token is required");
  const base = serverClient();
  const { data, error } = await base.auth.refreshSession({ refresh_token: body.refresh_token });
  if (error) throw new ApiError(401, error.message);
  return json({ session: data.session });
}

async function logOut(body: { refresh_token?: string }) {
  if (!body.refresh_token) throw new ApiError(400, "refresh_token is required");
  const base = serverClient();
  await base.auth.setSession({ access_token: body.refresh_token, refresh_token: body.refresh_token } as never);
  const { error } = await base.auth.signOut({ scope: "global" });
  return json({ signed_out: true, detail: error?.message ?? null });
}

async function me(ctx: Ctx) {
  const { data: profile } = await ctx.db.from("profiles").select("*").eq("id", ctx.userId).maybeSingle();
  const { data: roles } = await ctx.db.from("user_roles").select("role").eq("user_id", ctx.userId);
  return json({ data: { profile, roles: (roles ?? []).map((r) => r.role) } });
}

async function updateMe(ctx: Ctx, body: Record<string, unknown>) {
  delete body.id;
  delete body.email;
  const { data, error } = await ctx.db.from("profiles").update(body as never).eq("id", ctx.userId).select().single();
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

// ---------- Dashboard ----------
async function dashboardSummary(ctx: Ctx) {
  const [sites, tickets, tasks, equip, docs] = await Promise.all([
    ctx.db.from("sites").select("id,name,compliance_score,ppm_outstanding,open_repairs"),
    ctx.db.from("repair_tickets").select("id,status,priority").neq("status", "Completed"),
    ctx.db.from("tasks").select("id,status,due_date").neq("status", "Completed"),
    ctx.db.from("equipment").select("id,next_due,status"),
    ctx.db.from("documents").select("id", { count: "exact", head: true }),
  ]);
  const siteRows = sites.data ?? [];
  return json({
    data: {
      sites: siteRows.length,
      average_compliance: siteRows.length ? Math.round(siteRows.reduce((s, x) => s + x.compliance_score, 0) / siteRows.length) : 0,
      open_tickets: tickets.data?.length ?? 0,
      open_tasks: tasks.data?.length ?? 0,
      overdue_tasks: (tasks.data ?? []).filter((t) => t.due_date && t.due_date < new Date().toISOString().slice(0, 10)).length,
      equipment_active: (equip.data ?? []).filter((e) => e.status === "Active").length,
      documents: docs.count ?? 0,
      per_site: siteRows,
    },
  });
}

async function dashboardActivity(ctx: Ctx) {
  const [audit, tickets] = await Promise.all([
    ctx.db.from("audit_log").select("*").order("occurred_at", { ascending: false }).limit(10),
    ctx.db.from("repair_tickets").select("*").order("created_at", { ascending: false }).limit(5),
  ]);
  return json({ data: { audit: audit.data ?? [], tickets: tickets.data ?? [] } });
}

async function siteStats(ctx: Ctx, id: string) {
  const { data: site } = await ctx.db.from("sites").select("*").eq("id", id).maybeSingle();
  if (!site) throw new ApiError(404, "Site not found");
  const [equip, tickets, tasks] = await Promise.all([
    ctx.db.from("equipment").select("id,status").eq("site_id", id),
    ctx.db.from("repair_tickets").select("id,status").eq("site_id", id).neq("status", "Completed"),
    ctx.db.from("tasks").select("id,status,due_date").eq("site_id", id).neq("status", "Completed"),
  ]);
  return json({
    data: {
      site,
      equipment: { total: equip.data?.length ?? 0, under_maintenance: (equip.data ?? []).filter((e) => e.status === "Under Maintenance").length },
      open_tickets: tickets.data?.length ?? 0,
      outstanding_tasks: tasks.data?.length ?? 0,
    },
  });
}

// ---------- Tasks ----------
async function taskCalendar(ctx: Ctx, url: URL) {
  const month = url.searchParams.get("month") ?? new Date().toISOString().slice(0, 7);
  const { data, error } = await ctx.db.from("tasks").select("*").gte("due_date", `${month}-01`).lte("due_date", `${month}-31`);
  if (error) throw new ApiError(400, error.message);
  const byDate: Record<string, unknown[]> = {};
  for (const t of data ?? []) {
    const d = (t as { due_date: string }).due_date;
    (byDate[d] ??= []).push(t);
  }
  return json({ data: byDate, month });
}

async function completeTask(ctx: Ctx, id: string) {
  const { data, error } = await ctx.db.from("tasks").update({ status: "Completed", completed_at: new Date().toISOString() }).eq("id", id).select().single();
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

// ---------- Tickets ----------
async function assignTicket(ctx: Ctx, id: string, body: { assignee?: string; priority?: string }) {
  const patch: Record<string, unknown> = {};
  if (body.assignee) patch.assignee = body.assignee;
  if (body.priority) patch.priority = body.priority;
  if (body.assignee) patch.status = "In Progress";
  const { data, error } = await ctx.db.from("repair_tickets").update(patch).eq("id", id).select().single();
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

async function completeTicket(ctx: Ctx, id: string) {
  const { data, error } = await ctx.db.from("repair_tickets").update({ status: "Completed", completed_at: new Date().toISOString() }).eq("id", id).select().single();
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

async function reviewTicket(ctx: Ctx, id: string, body: { status?: string }) {
  const status = body.status === "Completed" ? "Completed" : "In Review";
  const patch: Record<string, unknown> = { status };
  if (status === "Completed") patch.completed_at = new Date().toISOString();
  const { data, error } = await ctx.db.from("repair_tickets").update(patch).eq("id", id).select().single();
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

async function listQuotes(ctx: Ctx, ticketId: string) {
  const { data, error } = await ctx.db.from("ticket_quotes").select("*").eq("ticket_id", ticketId);
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

async function createQuote(ctx: Ctx, ticketId: string, body: Record<string, unknown>) {
  delete body.owner_id;
  delete body.id;
  const { data, error } = await ctx.db.from("ticket_quotes").insert({ ...body, ticket_id: ticketId, owner_id: ctx.userId } as never).select().single();
  if (error) throw new ApiError(400, error.message);
  return json({ data }, 201);
}

async function decideQuote(ctx: Ctx, _ticketId: string, quoteId: string, body: { status?: string }) {
  const status = body.status === "Accepted" ? "Accepted" : "Rejected";
  const { data, error } = await ctx.db.from("ticket_quotes").update({ status }).eq("id", quoteId).select().single();
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

// ---------- Uploads ----------
async function uploadFile(ctx: Ctx, bucket: string, request: Request, extra: (form: FormData) => Record<string, unknown>) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) throw new ApiError(400, "file is required");
  const path = `${ctx.userId}/${Date.now()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
  const { error } = await ctx.db.storage.from(bucket).upload(path, file, { upsert: false });
  if (error) throw new ApiError(400, error.message);
  const row = { ...extra(form), file_path: path, file_size: file.size, name: file.name, owner_id: ctx.userId };
  const table = bucket === "documents" ? "documents" : "certificates";
  const { data, error: dbError } = await ctx.db.from(table as never).insert(row as never).select().single();
  if (dbError) throw new ApiError(400, dbError.message);
  return json({ data }, 201);
}

async function downloadFile(ctx: Ctx, table: "documents" | "certificates", id: string) {
  const { data: row, error } = await ctx.db.from(table).select("*").eq("id", id).maybeSingle();
  if (error || !row) throw new ApiError(404, "File not found");
  const { data: blob, error: dlError } = await ctx.db.storage.from(table).download(row.file_path);
  if (dlError || !blob) throw new ApiError(404, "Stored file missing");
  const type = (row as { name: string }).name.split(".").pop()?.toLowerCase();
  const types: Record<string, string> = { pdf: "application/pdf", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", doc: "application/msword", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" };
  return new Response(blob, { headers: { "content-type": types[type ?? ""] ?? "application/octet-stream", "content-disposition": `attachment; filename="${(row as { name: string }).name}"` } });
}

// ---------- Reports ----------
async function generateReport(ctx: Ctx, id: string) {
  const { data: report } = await ctx.db.from("reports").select("*").eq("id", id).maybeSingle();
  if (!report) throw new ApiError(404, "Report not found");
  const summary = await dashboardSummaryData(ctx);
  const { data, error } = await ctx.db.from("reports").update({ payload: summary as never }).eq("id", id).select().single();
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

async function dashboardSummaryData(ctx: Ctx) {
  const res = await dashboardSummary(ctx);
  return ((await res.json()) as { data: unknown }).data;
}

async function exportReport(ctx: Ctx, id: string) {
  const { data: report } = await ctx.db.from("reports").select("*").eq("id", id).maybeSingle();
  if (!report) throw new ApiError(404, "Report not found");
  const r = report as unknown as { title: string; category: string; status: string; payload: unknown; created_at: string };
  const lines = [
    `Kearly Report: ${r.title}`,
    `Category: ${r.category}`,
    `Status: ${r.status}`,
    `Generated: ${r.created_at}`,
    "",
    JSON.stringify(r.payload, null, 2),
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8", "content-disposition": `attachment; filename="${r.title.replace(/[^\w\- ]/g, "")}.txt"` },
  });
}

// ---------- Audit ----------
async function reviewAudit(ctx: Ctx, id: string, body: { review_status?: string; priority?: string; notes?: string }) {
  const patch: Record<string, unknown> = {};
  if (body.review_status) patch.review_status = body.review_status;
  if (body.priority) patch.priority = body.priority;
  if (body.notes !== undefined) patch.notes = body.notes;
  if (!Object.keys(patch).length) throw new ApiError(400, "Nothing to update");
  const { data, error } = await ctx.db.from("audit_log").update(patch).eq("id", id).select().single();
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

async function flagAudit(ctx: Ctx, id: string, body: { notes?: string }) {
  return reviewAudit(ctx, id, { review_status: "Flagged for Follow-up", notes: body.notes ?? "" });
}

// ---------- Notifications ----------
async function markRead(ctx: Ctx, id: string) {
  const { data, error } = await ctx.db.from("notifications").update({ read: true }).eq("id", id).select().single();
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

async function markAllRead(ctx: Ctx) {
  const { error } = await ctx.db.from("notifications").update({ read: true }).eq("owner_id", ctx.userId);
  if (error) throw new ApiError(400, error.message);
  return json({ updated: true });
}

// ---------- Contractors ----------
async function contractorJobs(ctx: Ctx, id: string) {
  const { data, error } = await ctx.db.from("repair_tickets").select("*").eq("assignee", id);
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

async function contractorCertificates(ctx: Ctx, id: string) {
  const { data, error } = await ctx.db.from("certificates").select("*").eq("member_id", id);
  if (error) throw new ApiError(400, error.message);
  return json({ data });
}

// ---------- Settings ----------
async function getSettings(ctx: Ctx) {
  const { data } = await ctx.db.from("app_settings").select("*").eq("owner_id", ctx.userId).maybeSingle();
  return json({ data: data?.data ?? {} });
}

async function putSettings(ctx: Ctx, body: Record<string, unknown>) {
  const { data, error } = await ctx.db.from("app_settings").upsert({ owner_id: ctx.userId, data: body, updated_at: new Date().toISOString() }).select().single();
  if (error) throw new ApiError(400, error.message);
  return json({ data: data.data });
}

// ---------- Spec ----------
const SPEC_ENDPOINTS: string[] = [
  "POST /auth/signup", "POST /auth/login", "POST /auth/logout", "POST /auth/refresh", "GET /auth/me", "PATCH /auth/me",
  "GET /dashboard/summary", "GET /dashboard/activity",
  ...Object.keys(RESOURCES).flatMap((r) => [`GET /${r}`, `POST /${r}`, `GET /${r}/{id}`, `PATCH /${r}/{id}`, `DELETE /${r}/{id}`]),
  "GET /sites/{id}/stats", "GET /tasks/calendar", "POST /tasks/{id}/complete",
  "POST /tickets/{id}/assign", "POST /tickets/{id}/complete", "POST /tickets/{id}/review",
  "GET /tickets/{id}/quotes", "POST /tickets/{id}/quotes", "PATCH /tickets/{id}/quotes/{quoteId}",
  "POST /documents/upload", "GET /documents/{id}/download",
  "POST /certificates/upload", "GET /certificates/{id}/download",
  "POST /reports/{id}/generate", "GET /reports/{id}/export",
  "POST /audit/{id}/review", "POST /audit/{id}/flag",
  "POST /notifications/{id}/read", "POST /notifications/read-all",
  "GET /contractors/{id}/jobs", "GET /contractors/{id}/certificates",
  "GET /settings", "PUT /settings",
];

function spec() {
  return json({ version: "v1", count: SPEC_ENDPOINTS.length, endpoints: SPEC_ENDPOINTS });
}

function readBody(request: Request): Promise<Record<string, unknown>> {
  return request.json().catch(() => ({}));
}

export async function handleV1(request: Request, splat: string): Promise<Response> {
  const method = request.method.toUpperCase();
  const url = new URL(request.url);
  const parts = splat.split("/").filter(Boolean);
  const [head, ...rest] = parts;

  // Spec + auth endpoints need no bearer.
  if (method === "GET" && head === "_spec") return spec();
  if (head === "auth") {
    const sub = rest.join("/");
    if (method === "POST" && sub === "signup") return signUp(await readBody(request));
    if (method === "POST" && sub === "login") return logIn(await readBody(request));
    if (method === "POST" && sub === "refresh") return refreshToken(await readBody(request));
    if (method === "POST" && sub === "logout") return logOut(await readBody(request));
    const ctx = await requireCtx(request);
    if (method === "GET" && sub === "me") return me(ctx);
    if (method === "PATCH" && sub === "me") return updateMe(ctx, await readBody(request));
    throw new ApiError(404, "Unknown auth endpoint");
  }

  const ctx = await requireCtx(request);

  if (method === "GET" && head === "dashboard" && rest[0] === "summary") return dashboardSummary(ctx);
  if (method === "GET" && head === "dashboard" && rest[0] === "activity") return dashboardActivity(ctx);
  if (method === "GET" && head === "settings" && rest.length === 0) return getSettings(ctx);
  if (method === "PUT" && head === "settings" && rest.length === 0) return putSettings(ctx, await readBody(request));
  if (method === "GET" && head === "tasks" && rest[0] === "calendar") return taskCalendar(ctx, url);
  if (method === "POST" && head === "notifications" && rest[0] === "read-all") return markAllRead(ctx);

  const seg = head;
  if (RESOURCES[seg]) {
    const [id, sub, subId] = rest;

    if (!id) {
      if (method === "GET") return listResource(ctx, seg, url);
      if (method === "POST") return createResource(ctx, seg, await readBody(request));
      throw new ApiError(405, "Method not allowed");
    }

    const body = method === "POST" || method === "PATCH" || method === "PUT" ? await readBody(request) : undefined;

    if (!sub) {
      if (method === "GET") return getResource(ctx, seg, id);
      if (method === "PATCH" || method === "PUT") return updateResource(ctx, seg, id, body!);
      if (method === "DELETE") return deleteResource(ctx, seg, id);
      throw new ApiError(405, "Method not allowed");
    }

    if (seg === "sites" && sub === "stats" && method === "GET") return siteStats(ctx, id);
    if (seg === "tasks" && sub === "complete" && method === "POST") return completeTask(ctx, id);
    if (seg === "tickets" && sub === "assign" && method === "POST") return assignTicket(ctx, id, body as never);
    if (seg === "tickets" && sub === "complete" && method === "POST") return completeTicket(ctx, id);
    if (seg === "tickets" && sub === "review" && method === "POST") return reviewTicket(ctx, id, body as never);
    if (seg === "tickets" && sub === "quotes") {
      if (method === "GET" && !subId) return listQuotes(ctx, id);
      if (method === "POST" && !subId) return createQuote(ctx, id, body!);
      if (method === "PATCH" && subId) return decideQuote(ctx, id, subId, body as never);
    }
    if (seg === "documents" && sub === "upload" && method === "POST")
      return uploadFile(ctx, "documents", request, (form) => ({
        category: (form.get("category") as string) || "Compliance",
        status: (form.get("status") as string) || "Draft",
        site_id: (form.get("site_id") as string) || null,
      }));
    if (seg === "documents" && sub === "download" && method === "GET") return downloadFile(ctx, "documents", id);
    if (seg === "certificates" && sub === "upload" && method === "POST")
      return uploadFile(ctx, "certificates", request, (form) => ({
        member_id: (form.get("member_id") as string) || null,
        expires_on: (form.get("expires_on") as string) || null,
      }));
    if (seg === "certificates" && sub === "download" && method === "GET") return downloadFile(ctx, "certificates", id);
    if (seg === "reports" && sub === "generate" && method === "POST") return generateReport(ctx, id);
    if (seg === "reports" && sub === "export" && method === "GET") return exportReport(ctx, id);
    if (seg === "audit" && sub === "review" && method === "POST") return reviewAudit(ctx, id, body as never);
    if (seg === "audit" && sub === "flag" && method === "POST") return flagAudit(ctx, id, body as never);
    if (seg === "notifications" && sub === "read" && method === "POST") return markRead(ctx, id);
    if (seg === "contractors" && sub === "jobs" && method === "GET") return contractorJobs(ctx, id);
    if (seg === "contractors" && sub === "certificates" && method === "GET") return contractorCertificates(ctx, id);

    throw new ApiError(404, `Unknown endpoint ${method} /${splat}`);
  }

  throw new ApiError(404, `Unknown endpoint ${method} /${splat}`);
}

export { json as apiJson };
