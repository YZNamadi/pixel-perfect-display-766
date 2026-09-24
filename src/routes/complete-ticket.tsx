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
  Stethoscope,
} from "lucide-react";

export const Route = createFileRoute("/complete-ticket")({
  head: () => ({
    meta: [
      { title: "Kearly | Mark Repair Ticket Complete" },
      {
        name: "description",
        content:
          "Record resolution details, completion time and follow-up inspection needs when closing a Kearly repair ticket.",
      },
      { property: "og:title", content: "Kearly | Mark Repair Ticket Complete" },
      {
        property: "og:description",
        content:
          "Record resolution details, completion time and follow-up inspection needs when closing a Kearly repair ticket.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompleteTicketPage,
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
  { label: "Team", icon: Users, to: "/team-members" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Billing", icon: CreditCard, to: "/settings" as const },
];

function CompleteTicketPage() {
  const [followUp, setFollowUp] = useState(false);

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
              <input type="search" placeholder="Search..." aria-label="Search" />
            </div>
            <span className="po-chip">
              <Calendar size={14} aria-hidden="true" />
              Jul 2024
            </span>
            <Link to="/add-task" className="rp-new">
              New Ticket
            </Link>
          </div>
        </header>

        <nav className="et-crumbs" aria-label="Breadcrumb">
          <Link to="/repairs">Repairs</Link>
          <span aria-hidden="true">/</span>
          <span className="et-crumb-current">Mark Complete</span>
        </nav>

        <form
          className="ct-card"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="ct-ticket">
            <p className="ct-ticket-label">CURRENTLY COMPLETING TICKET</p>
            <p className="ct-ticket-title">
              #4821 Communal heating failure
              <span className="ct-ticket-priority">P1</span>
            </p>
            <p className="ct-ticket-meta">Assigned to Michael Finch • Riverside Court</p>
          </div>

          <label className="at-field">
            <span className="at-label">Resolution Details</span>
            <textarea
              className="at-input at-textarea ct-textarea"
              rows={5}
              defaultValue="Replaced faulty limit thermostat and reset the primary system control loop. Tested hot water supply lines and confirmed flow temperature has stabilized at 65°C."
            />
          </label>

          <div className="ct-grid">
            <label className="at-field">
              <span className="at-label">Completed Date &amp; Time</span>
              <input className="at-input" type="text" defaultValue="Jul 18, 2024 - 11:20 AM" />
            </label>

            <div className="at-field">
              <span className="at-label">Follow-up Inspection Required?</span>
              <div className="ct-toggle-row">
                <button
                  type="button"
                  role="switch"
                  aria-checked={followUp}
                  aria-label="Follow-up inspection required"
                  className={`se-switch ${followUp ? "is-on" : ""}`}
                  onClick={() => setFollowUp((v) => !v)}
                >
                  <span className="se-switch-knob" />
                </button>
                <span className="ct-toggle-text">Schedule verification check in 7 days</span>
              </div>
            </div>
          </div>

          <div className="ct-actions">
            <Link to="/repairs" className="at-cancel ct-cancel">
              Cancel
            </Link>
            <Link to="/repairs" className="at-next">
              Mark as Complete
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
