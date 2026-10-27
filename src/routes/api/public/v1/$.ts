import { createFileRoute } from "@tanstack/react-router";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, apikey",
  "Access-Control-Expose-Headers": "Content-Disposition",
};

function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(CORS)) headers.set(k, v);
  return new Response(response.body, { status: response.status, headers });
}

async function handle({ request, params }: { request: Request; params: { _splat?: string } }) {
  try {
    const mod = await import("@/lib/api/v1.server");
    return withCors(await mod.handleV1(request, params._splat ?? ""));
  } catch (error) {
    const status = (error as { status?: number }).status ?? 500;
    const message = status >= 500 ? "Internal server error" : (error as Error).message;
    if (status >= 500) console.error("[api/v1]", error);
    return withCors(Response.json({ error: message }, { status }));
  }
}

export const Route = createFileRoute("/api/public/v1/$")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      GET: handle,
      POST: handle,
      PATCH: handle,
      PUT: handle,
      DELETE: handle,
    },
  },
});
