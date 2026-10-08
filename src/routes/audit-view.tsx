import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";
import { auditEvents } from "@/lib/audit-events";

export const Route = createFileRoute("/audit-view")({
  validateSearch: (search: Record<string, unknown>) => ({ id: typeof search["id"] === "string" ? search["id"] : "e1" }),
  head: () => ({
    meta: [
      { title: "Kearly | View Audit Entry" },
      { name: "description", content: "View the immutable metadata of a Kearly audit log event." },
      { property: "og:title", content: "Kearly | View Audit Entry" },
      { property: "og:description", content: "View the immutable metadata of a Kearly audit log event." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuditViewPage,
});

function AuditViewPage() {
  const { id } = Route.useSearch();
  const entry = auditEvents.find((e) => e.id === id) ?? auditEvents[0]!;
  const rows = [
    ["Timestamp", entry.time],
    ["User", entry.user],
    ["Action Type", entry.action],
    ["Details", entry.details],
    ["Entity Affected", entry.entity || "Portfolio-wide"],
    ["IP Address", entry.ip ?? "10.0.0.12"],
    ["Session ID", entry.session ?? `sess_${entry.id}x9q2`],
  ];

  return (
    <AppShell active="Audit log">
      <div className="ar-page av-page">
        <nav className="ar-crumbs" aria-label="Breadcrumb"><Link to="/audit-log">System Audit Log</Link><span>&gt;</span><strong>View Entry</strong></nav>
        <header className="ar-head">
          <div><h1 className="ar-title">{entry.action}</h1><p className="ar-sub">Platform compliance trace event detailed records</p></div>
          <span className="ar-pill av-pill">Completed</span>
        </header>
        <section className="ar-card">
          <div className="ar-card-head"><h2>Immutable Event Metadata</h2><span className="ar-secure">SECURE RECORD</span></div>
          <dl className="ar-meta">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </section>
        <div className="av-footer"><Link to="/audit-log" className="av-back">Back to Logs</Link></div>
      </div>
    </AppShell>
  );
}
