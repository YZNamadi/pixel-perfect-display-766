# Wiring Kearly pages to the real backend

Lovable Cloud is enabled. The database tables (see `drizzle/migrations/0000_create_core_schema.sql`)
and the REST API (`docs/API.md`) are live. Product pages must now read and write real data.

## Client access

Use the browser Supabase client — RLS scopes every row to the signed-in account:

```ts
import { supabase } from "@/integrations/supabase/client";
```

## Pattern

1. Replace static demo arrays with a React Query hook using the client:

```ts
const sitesQuery = useQuery({
  queryKey: ["sites"],
  queryFn: async () => {
    const { data, error } = await supabase.from("sites").select("*").order("name");
    if (error) throw error;
    return data ?? [];
  },
});
```

2. Mutations call the same client (`insert` / `update` / `delete`) and invalidate the
   matching query key, then show a sonner toast. NEVER seed data on page load.
3. Initial state while loading: keep the layout intact, render an empty/skeleton state.
   Do NOT fall back to demo rows when the table returns empty — show the real empty state.
4. Keep every visual treatment, label, dropdown, and layout exactly as-is. Only the
   data source changes.

## Tables ↔ pages

| Table | Pages |
| --- | --- |
| sites | assets (Buildings), building, site, add-site, dashboard |
| equipment | equipment, add-equipment, edit-equipment, equipment-detail |
| repair_tickets | repairs, new-ticket, review-ticket, complete-ticket, complete, contractor-jobs |
| tasks | compliance, add-task, edit-task, schedule |
| documents | documents |
| team_members | team-members, edit-member, contractor-profile, team |
| certificates | contractor-certificates, contractor-profile |
| reports | reports, edit-report |
| audit_log | audit-log, audit-review, audit-view |
| staff_records / training_records | staff-records, add-training-record |
| notifications | dashboard, settings |

## Ownership

The signed-in user owns their rows (`owner_id = auth.uid()` via RLS). When creating rows,
do NOT send `owner_id` — omit it; RLS `with check` uses `auth.uid()` which does not auto-fill,
so either omit `owner_id` and use an RPC/insert through the API, or include
`(await supabase.auth.getUser()).data.user?.id`. Prefer explicitly setting `owner_id`
from the current user on insert.

## Empty-vs-signed-out

If the visitor is not signed in, pages may keep their demo/sample presentation — check
`supabase.auth.getSession()` once; only query live data when a session exists. This keeps
the marketing preview working while signed-in users get their real data.
