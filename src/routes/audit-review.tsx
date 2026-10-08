import { ProductSelect } from "@/components/product-select";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { auditEvents } from "@/lib/audit-events";

export const Route = createFileRoute("/audit-review")({
  validateSearch: (search: Record<string, unknown>) => ({ id: typeof search["id"] === "string" ? search["id"] : "e1" }),
  head: () => ({
    meta: [
      { title: "Kearly | Review Audit Entry" },
      { name: "description", content: "Review an immutable audit log event and record an administrative decision in Kearly." },
      { property: "og:title", content: "Kearly | Review Audit Entry" },
      { property: "og:description", content: "Review an immutable audit log event and record an administrative decision in Kearly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuditReviewPage,
});

const statuses = ["Pending Review", "Reviewed", "Flagged for Follow-up"];
const priorities = ["Low", "Normal", "High", "Critical"];

function AuditReviewPage() {
  const { id } = Route.useSearch();
  const navigate = useNavigate();
  const entry = auditEvents.find((e) => e.id === id) ?? auditEvents[0]!;
  const [status, setStatus] = useState("Pending Review");
  const [priority, setPriority] = useState("Normal");
  const [notes, setNotes] = useState("");

  const rows = [
    ["Timestamp", entry.time],
    ["User", entry.user],
    ["Action Type", entry.action],
    ["Details", entry.details],
    ["Entity Affected", entry.entity || "Portfolio-wide"],
    ["IP Address", entry.ip ?? "10.0.0.12"],
    ["Session ID", entry.session ?? `sess_${entry.id}x9q2`],
  ];

  const finish = (label: string) => {
    toast.success(label);
    navigate({ to: "/audit-log" });
  };

  return (
    <AppShell active="Audit log">
      <div className="ar-page">
        <nav className="ar-crumbs" aria-label="Breadcrumb"><Link to="/audit-log">System Audit Log</Link><span>&gt;</span><strong>Review Entry</strong></nav>
        <header className="ar-head">
          <div><h1 className="ar-title">{entry.action}</h1><p className="ar-sub">Platform compliance trace event detailed records</p></div>
          <span className="ar-pill">{status === "Pending Review" ? "Action Pending" : status}</span>
        </header>

        <section className="ar-card">
          <div className="ar-card-head"><h2>Immutable Event Metadata</h2><span className="ar-secure">SECURE RECORD</span></div>
          <dl className="ar-meta">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </section>

        <section className="ar-card">
          <h2 className="ar-card-title"><ShieldCheck size={16} aria-hidden="true" />Administrative Review &amp; Action</h2>
          <div className="ar-grid">
            <label className="ar-field"><span>Review Status</span><span className="ar-select ar-select-dot"><ProductSelect value={status} onChange={(e) => setStatus(e.target.value)}>{statuses.map((s) => <option key={s}>{s}</option>)}</ProductSelect><ChevronDown size={14} aria-hidden="true" /></span></label>
            <label className="ar-field"><span>Priority</span><span className="ar-select"><ProductSelect value={priority} onChange={(e) => setPriority(e.target.value)}>{priorities.map((p) => <option key={p}>{p}</option>)}</ProductSelect><ChevronDown size={14} aria-hidden="true" /></span></label>
          </div>
          <label className="ar-field"><span>Reviewer Notes</span><textarea rows={4} placeholder="Add review notes..." value={notes} onChange={(e) => setNotes(e.target.value)} /></label>
          <div className="ar-actions">
            <button type="button" className="ar-primary" onClick={() => finish("Entry marked as reviewed")}>Mark as Reviewed</button>
            <button type="button" className="ar-secondary" onClick={() => finish("Entry flagged for follow-up")}>Flag for Follow-up</button>
            <Link to="/audit-log" className="ar-back">Back to Logs</Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
