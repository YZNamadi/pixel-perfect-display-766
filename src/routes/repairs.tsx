import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShieldCheck,
  Wrench,
  Building2,
  BarChart3,
  ScrollText,
  Settings,
  CreditCard,
  Users,
  Search,
  Calendar,
  Eye,
  Pencil,
  Check,
  BadgeCheck,
  X,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";

export const Route = createFileRoute("/repairs")({
  head: () => ({
    meta: [
      { title: "Kearly | Repairs & Maintenance Tickets" },
      {
        name: "description",
        content:
          "Track active maintenance tickets and repairs with priority, status, assignee and SLA across every Kearly site.",
      },
      { property: "og:title", content: "Kearly | Repairs & Maintenance Tickets" },
      {
        property: "og:description",
        content:
          "Track active maintenance tickets and repairs with priority, status, assignee and SLA across every Kearly site.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RepairsPage,
});

const overviewNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Equipment", icon: Stethoscope, to: "/equipment" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const, active: true, badge: "2" },
  { label: "Buildings", icon: Building2, to: "/assets" as const },
];

const governanceNav = [
  { label: "Reports", icon: BarChart3, to: "/reports" as const },
  { label: "Team", icon: Users, to: "/team" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Billing", icon: CreditCard, to: "/settings" as const },
];

const tabs = [
  { key: "all", label: "All Tickets (12)" },
  { key: "open", label: "Open (2)" },
  { key: "progress", label: "In Progress (6)" },
  { key: "closed", label: "Closed (4)" },
];

type Ticket = {
  id: string;
  title: string;
  site: string;
  priority: "P1" | "P2" | "P3";
  status: "Open" | "In Progress" | "Closed";
  assignee: string;
  created: string;
  sla: string;
  slaTone?: "red" | "muted";
};

const tickets: Ticket[] = [
  { id: "#4821", title: "Communal heating failure", site: "Riverside Court", priority: "P1", status: "Open", assignee: "Michael Fin", created: "", sla: "" },
  { id: "#4819", title: "Broken window latch - Ward A", site: "Victoria Wharf", priority: "P2", status: "In Progress", assignee: "James Carter", created: "Yesterday", sla: "24h remaining" },
  { id: "#4815", title: "Lift door sensor malfunction", site: "Elmwood Court", priority: "P1", status: "In Progress", assignee: "David Vance", created: "2 days ago", sla: "Overdue 12h", slaTone: "red" },
  { id: "#4812", title: "Leaking pipe ground floor", site: "Maple Business Park", priority: "P2", status: "In Progress", assignee: "James Carter", created: "3 days ago", sla: "On Track" },
  { id: "#4809", title: "Emergency exit light replacement", site: "Northgate House", priority: "P3", status: "Closed", assignee: "Sarah Jones", created: "5 days ago", sla: "Met SLA" },
  { id: "#4806", title: "HVAC filter periodic swap", site: "Kingsway Tower", priority: "P3", status: "Closed", assignee: "Michael Finch", created: "1 week ago", sla: "Met SLA" },
];

const priorityTone = (p: Ticket["priority"]) => (p === "P1" ? "tone-red" : p === "P2" ? "tone-amber" : "tone-muted");

const statusTone = (s: Ticket["status"]) =>
  s === "Open" ? "tone-blue" : s === "In Progress" ? "tone-amber" : "tone-muted";

function RepairsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [deleteTicket, setDeleteTicket] = useState<string | null>(null);

  return (
    <div className="po-shell">
      <aside className="po-sidebar">
        <Link to="/dashboard" className="po-logo" aria-label="Kearly">
          <svg width="26" height="26" viewBox="0 0 100 100" aria-hidden="true">
            <rect x="5" y="5" width="40" height="40" rx="10" fill="#15803D" />
            <path d="M 55 5 L 95 5 L 95 45 Q 75 45 55 25 Z" fill="#15803D" />
            <rect x="5" y="55" width="40" height="40" rx="10" fill="#15803D" />
            <path d="M 55 55 Q 75 55 95 75 L 95 95 L 55 95 Z" fill="#15803D" />
          </svg>
          <span className="po-logo-text">
            <span className="po-logo-name">KEARLY</span>
            <span className="po-logo-tag">Compliance. Automated &amp; Simplified.</span>
          </span>
        </Link>

        <nav className="po-nav" aria-label="Main navigation">
          <p className="po-nav-label">OVERVIEW</p>
          {overviewNav.map(({ label, icon: Icon, to, active, badge }) => (
            <Link key={label} to={to} className={`po-nav-item ${active ? "is-active" : ""}`}>
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
              {badge ? <span className="po-nav-badge">{badge}</span> : null}
            </Link>
          ))}

          <p className="po-nav-label po-nav-label-gap">GOVERNANCE</p>
          {governanceNav.map(({ label, icon: Icon, to }) => (
            <Link key={label} to={to} className="po-nav-item">
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="po-sidebar-foot">
          <Link to="/settings" className="po-nav-item">
            <Settings size={17} aria-hidden="true" />
            <span>Settings</span>
          </Link>
          <div className="po-user">
            <span className="po-user-avatar" aria-hidden="true">
              AR
            </span>
            <span className="po-user-text">
              <span className="po-user-name">Alex Rowe</span>
              <span className="po-user-role">Portfolio admin</span>
            </span>
          </div>
        </div>
      </aside>

      <main className="po-main">
        <header className="po-topbar">
          <div>
            <h1 className="po-title">Repairs</h1>
            <p className="po-subtitle">Active maintenance tickets &amp; repairs</p>
          </div>
          <div className="po-topbar-actions">
            <div className="po-search">
              <Search size={15} aria-hidden="true" />
              <input type="search" placeholder="Search..." aria-label="Search tickets" />
            </div>
            <span className="po-chip">Jul 2024</span>
            <span className="po-chip">
              <Calendar size={14} aria-hidden="true" />
              All buildings
            </span>
            <Link to="/add-task" className="po-download">
              New Ticket
            </Link>
          </div>
        </header>

        <div className="cl-tabs" role="tablist" aria-label="Ticket filters">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              className={`cl-tab ${activeTab === key ? "is-active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="rp-filters">
          <button type="button" className="rp-filter is-active">
            Priority: All
          </button>
          <button type="button" className="rp-filter">
            Site: All
          </button>
          <button type="button" className="rp-filter">
            Assignee: All
          </button>
        </div>

        <section className="cl-panel" aria-label="Repair tickets">
          <div className="cl-table-wrap">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TITLE</th>
                  <th>SITE</th>
                  <th>PRIORITY</th>
                  <th>STATUS</th>
                  <th>ASSIGNED TO</th>
                  <th>CREATED</th>
                  <th>SLA</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id}>
                    <td className="rp-id">{t.id}</td>
                    <td className="cl-name">{t.title}</td>
                    <td>{t.site}</td>
                    <td>
                      <span className={`rp-priority ${priorityTone(t.priority)}`}>{t.priority}</span>
                    </td>
                    <td>
                      <span className={`rp-status ${statusTone(t.status)}`}>{t.status}</span>
                    </td>
                    <td>{t.assignee}</td>
                    <td className="rp-created">{t.created}</td>
                    <td className={t.slaTone === "red" ? "rp-sla-red" : undefined}>{t.sla}</td>
                    <td>
                      {t.status === "Open" ? (
                        <span className="rp-actions">
                          <Link to="/edit-task" className="rp-btn">
                            <Pencil size={13} aria-hidden="true" />
                            Edit
                          </Link>
                          <button type="button" className="rp-btn tone-green">
                            <Check size={13} aria-hidden="true" />
                            Complete
                          </button>
                          <button type="button" className="rp-btn tone-blue">
                            <BadgeCheck size={13} aria-hidden="true" />
                            Review
                          </button>
                          <button type="button" className="rp-btn tone-red" onClick={() => setDeleteTicket(t.id)}>
                            <X size={13} aria-hidden="true" />
                            Delete
                          </button>
                        </span>
                      ) : (
                        <button type="button" className="rp-btn">
                          <Eye size={13} aria-hidden="true" />
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cl-foot">
            <small>Showing 1-6 of 12 tickets</small>
            <div className="cl-pager">
              <button type="button" className="cl-page">
                Previous
              </button>
              <button type="button" className="cl-page is-current">
                Next
              </button>
            </div>
          </div>
        </section>
      </main>

      {deleteTicket && (
        <div className="cp-overlay" role="presentation" onClick={() => setDeleteTicket(null)}>
          <div
            className="cp-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="rp-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cp-modal-head">
              <span className="cp-modal-icon" aria-hidden="true">
                <AlertTriangle size={26} />
              </span>
              <h2 className="cp-modal-title" id="rp-modal-title">
                Delete Ticket
              </h2>
            </div>
            <p className="cp-modal-text">
              Are you sure you want to delete ticket {deleteTicket}?
              <br />
              This action cannot be undone.
            </p>
            <div className="cp-modal-actions">
              <button type="button" className="cp-modal-cancel" onClick={() => setDeleteTicket(null)}>
                Cancel
              </button>
              <button type="button" className="cp-modal-delete" onClick={() => setDeleteTicket(null)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
