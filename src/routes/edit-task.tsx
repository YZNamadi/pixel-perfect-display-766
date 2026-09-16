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
  CheckCircle2,
  Pencil,
  AlertTriangle,

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

        <div className="et-layout">
          <form
            className="at-card et-card"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="et-card-head">
              <div>
                <h2 className="at-card-title et-title">Edit Ticket #44621</h2>
                <p className="et-card-sub">Update the details for this active repair ticket</p>
              </div>
              <span className="et-status-pill">In Progress</span>
            </div>

            <label className="at-field">
              <span className="at-label et-caps">TITLE</span>
              <input className="at-input" type="text" defaultValue="Communal heating failure" />
            </label>

            <label className="at-field">
              <span className="at-label et-caps">SITE</span>
              <input className="at-input" type="text" defaultValue="Riverside Court - Block B" />
            </label>

            <label className="at-field">
              <span className="at-label et-caps">PRIORITY</span>
              <select className="at-input" defaultValue="p1">
                <option value="p1">P1 - Urgent SLA</option>
                <option value="p2">P2 - High</option>
                <option value="p3">P3 - Routine</option>
              </select>
            </label>

            <label className="at-field">
              <span className="at-label et-caps">STATUS</span>
              <select className="at-input" defaultValue="progress">
                <option value="open">Open</option>
                <option value="progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </label>

            <label className="at-field">
              <span className="at-label et-caps">ASSIGNED TO</span>
              <select className="at-input" defaultValue="michael">
                <option value="michael">Michael Finch</option>
                <option value="sarah">Sarah Jones</option>
                <option value="james">James Carter</option>
                <option value="alex">Alex Rowe</option>
                <option value="david">David Vance</option>
              </select>
            </label>

            <label className="at-field">
              <span className="at-label et-caps">DESCRIPTION / NOTES</span>
              <textarea
                className="at-input at-textarea et-textarea"
                rows={3}
                defaultValue="Total boiler lockout reported on boiler #2. Affecting communal corridors and hot water loop supply. Resident callouts logged. Urgent dispatch requested."
              />
            </label>

            <div className="at-actions et-actions">
              <Link to="/repairs" className="at-cancel">
                Cancel
              </Link>
              <Link to="/repairs" className="at-next et-save">
                Save Changes
              </Link>
            </div>
          </form>

          <aside className="at-card et-activity" aria-label="Activity log">
            <h2 className="at-card-title">Activity Log</h2>
            <ul className="et-log">
              <li className="et-log-row">
                <span className="et-log-icon tone-blue" aria-hidden="true">
                  <CheckCircle2 size={16} />
                </span>
                <div>
                  <strong>Completed by Michael Finch</strong>
                  <small>Today, 11:20 AM</small>
                  <p>&ldquo;Thermostat replaced and hot loop stabilized at 65C.&rdquo;</p>
                </div>
              </li>
              <li className="et-log-row">
                <span className="et-log-icon tone-amber" aria-hidden="true">
                  <Pencil size={16} />
                </span>
                <div>
                  <strong>Status Changed to In Progress</strong>
                  <small>Today, 09:15 AM</small>
                </div>
              </li>
              <li className="et-log-row">
                <span className="et-log-icon tone-red" aria-hidden="true">
                  <AlertTriangle size={16} />
                </span>
                <div>
                  <strong>Ticket Created</strong>
                  <small>Today, 08:30 AM • by Alex Rowe</small>
                </div>
              </li>
            </ul>
          </aside>
        </div>

      </main>
    </div>
  );
}
