import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Building2,
  BarChart3,
  ScrollText,
  Settings,
  CreditCard,
  Users,
  Search,
  Plus,
  Calendar,
} from "lucide-react";

export const Route = createFileRoute("/edit-task")({
  head: () => ({
    meta: [
      { title: "Kearly | Edit Repair Ticket" },
      {
        name: "description",
        content:
          "Update a maintenance repair ticket: title, site, assignee, priority, status and engineer notes.",
      },
      { property: "og:title", content: "Kearly | Edit Repair Ticket" },
      {
        property: "og:description",
        content:
          "Update a maintenance repair ticket: title, site, assignee, priority, status and engineer notes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EditTicketPage,
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

function EditTicketPage() {
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
            <span className="po-chip">
              <Calendar size={14} aria-hidden="true" />
              Jul 2024
            </span>
            <Link to="/add-task" className="po-download">
              <Plus size={15} aria-hidden="true" />
              New Ticket
            </Link>
          </div>
        </header>

        <nav className="et-crumbs" aria-label="Breadcrumb">
          <Link to="/repairs">Repairs</Link>
          <span aria-hidden="true">/</span>
          <span className="et-crumb-current">Edit Ticket</span>
        </nav>

        <form
          className="at-card et-card"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="et-card-head">
            <h2 className="at-card-title et-title">Edit Ticket #4821</h2>
            <span className="et-priority">P1 Priority</span>
          </div>

          <label className="at-field">
            <span className="at-label">Ticket Title</span>
            <input className="at-input" type="text" defaultValue="Communal heating failure" />
          </label>

          <div className="et-grid">
            <label className="at-field">
              <span className="at-label">Site</span>
              <select className="at-input" defaultValue="riverside">
                <option value="riverside">Riverside Court</option>
                <option value="northgate">Northgate House</option>
                <option value="kingsway">Kingsway Tower</option>
                <option value="elmwood">Elmwood Court</option>
                <option value="maple">Maple Business Park</option>
                <option value="victoria">Victoria Wharf</option>
              </select>
            </label>

            <label className="at-field">
              <span className="at-label">Assigned To</span>
              <select className="at-input" defaultValue="michael">
                <option value="michael">Michael Finch</option>
                <option value="sarah">Sarah Jones</option>
                <option value="james">James Carter</option>
                <option value="alex">Alex Rowe</option>
                <option value="david">David Vance</option>
              </select>
            </label>

            <label className="at-field">
              <span className="at-label">Priority</span>
              <select className="at-input" defaultValue="p1">
                <option value="p1">P1 - Critical</option>
                <option value="p2">P2 - High</option>
                <option value="p3">P3 - Routine</option>
              </select>
            </label>

            <label className="at-field">
              <span className="at-label">Status</span>
              <select className="at-input" defaultValue="open">
                <option value="open">Open</option>
                <option value="progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </label>
          </div>

          <label className="at-field">
            <span className="at-label">Description &amp; Notes</span>
            <textarea
              className="at-input at-textarea et-textarea"
              rows={4}
              defaultValue="Total boiler lockout reported on boiler #2. Affecting communal corridors and hot water loop supply. Resident callouts logged."
            />
          </label>

          <div className="at-actions et-actions">
            <Link to="/repairs" className="at-cancel">
              Cancel
            </Link>
            <Link to="/repairs" className="at-next">
              Save Changes
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
