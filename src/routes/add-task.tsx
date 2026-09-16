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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/add-task")({
  head: () => ({
    meta: [
      { title: "Kearly | Add PPM Task" },
      {
        name: "description",
        content:
          "Create a scheduled recurring compliance task with category, equipment location and compliance notes.",
      },
      { property: "og:title", content: "Kearly | Add PPM Task" },
      {
        property: "og:description",
        content:
          "Create a scheduled recurring compliance task with category, equipment location and compliance notes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AddTaskPage,
});

const overviewNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const, active: true },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const, badge: "2" },
  { label: "Buildings", icon: Building2, to: "/assets" as const },
];

const governanceNav = [
  { label: "Reports", icon: BarChart3, to: "/reports" as const },
  { label: "Team", icon: Users, to: "/team" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Billing", icon: CreditCard, to: "/settings" as const },
];

const steps = [
  { n: 1, label: "Task Details", active: true },
  { n: 2, label: "Schedule" },
  { n: 3, label: "Assignment" },
];

function AddTaskPage() {
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
            <Link to="/compliance" className="at-back" aria-label="Back to compliance">
              <ChevronLeft size={20} aria-hidden="true" />
            </Link>
            <h1 className="po-title">Add PPM Task</h1>
            <p className="po-subtitle">Create a scheduled recurring compliance task</p>
          </div>
          <div className="po-topbar-actions">
            <div className="po-search">
              <Search size={15} aria-hidden="true" />
              <input type="search" placeholder="Search..." aria-label="Search" />
            </div>
            <span className="po-chip">Jul 2024</span>
          </div>
        </header>

        <ol className="at-steps">
          {steps.map(({ n, label, active }, index) => (
            <li key={label} className={`at-step ${active ? "is-active" : ""}`}>
              <span className="at-step-num">{n}</span>
              <span className="at-step-label">{label}</span>
              {index < steps.length - 1 && <ChevronRight size={14} className="at-step-sep" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        <form
          className="at-card"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h2 className="at-card-title">Add New PPM Task</h2>

          <label className="at-field">
            <span className="at-label">Task Title</span>
            <input className="at-input" type="text" placeholder="e.g. Annual Fire Risk Assessment" />
          </label>

          <label className="at-field">
            <span className="at-label">Category</span>
            <select className="at-input" defaultValue="fire">
              <option value="fire">Fire &amp; General Safety</option>
              <option value="electrical">Electrical</option>
              <option value="gas">Gas &amp; Water</option>
              <option value="lifts">Lifts</option>
              <option value="medical">Medical Equipment</option>
              <option value="asbestos">Asbestos</option>
            </select>
          </label>

          <label className="at-field">
            <span className="at-label">Specific Equipment / Location (Optional)</span>
            <input className="at-input" type="text" placeholder="e.g. Main Plant Room, Block B Boiler" />
          </label>

          <label className="at-field">
            <span className="at-label">Compliance Notes</span>
            <textarea
              className="at-input at-textarea"
              rows={4}
              placeholder="Please record any observations or recommended remedial actions from prior tests..."
            />
          </label>

          <div className="at-actions">
            <Link to="/compliance" className="at-cancel">
              Cancel
            </Link>
            <Link to="/compliance" className="at-next">
              Next Step
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
