import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShieldCheck,
  Wrench,
  Building2,
  BarChart3,
  ScrollText,
  Settings,
  ChevronLeft,
} from "lucide-react";

export const Route = createFileRoute("/edit-task")({
  head: () => ({
    meta: [
      { title: "Kearly | Edit PPM Task" },
      {
        name: "description",
        content: "Customise an existing planned preventive maintenance task, its frequency, due date and assigned roles.",
      },
      { property: "og:title", content: "Kearly | Edit PPM Task" },
      {
        property: "og:description",
        content: "Customise an existing planned preventive maintenance task, its frequency, due date and assigned roles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EditTaskPage,
});

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const, active: true },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const },
  { label: "Assets", icon: Building2, to: "/assets" as const },
  { label: "Reports", icon: BarChart3 },
  { label: "Audit Log", icon: ScrollText },
  { label: "Settings", icon: Settings },
];

function EditTaskPage() {
  const navigate = useNavigate();

  return (
    <div className="db-shell">
      <aside className="db-sidebar">
        <Link to="/dashboard" className="db-logo" aria-label="Kearly">
          <svg width="28" height="28" viewBox="0 0 100 100" aria-hidden="true">
            <rect x="5" y="5" width="40" height="40" rx="10" fill="#4A7C6F" />
            <path d="M 55 5 L 95 5 L 95 45 Q 75 45 55 25 Z" fill="#4A7C6F" />
            <rect x="5" y="55" width="40" height="40" rx="10" fill="#4A7C6F" />
            <path d="M 55 55 Q 75 55 95 75 L 95 95 L 55 95 Z" fill="#4A7C6F" />
          </svg>
          <span className="db-logo-text">
            <span className="db-logo-name">KEARLY</span>
            <span className="db-logo-tag">Compliance. Automated &amp; Simplified.</span>
          </span>
        </Link>

        <Link to="/compliance" className="at-back" aria-label="Back to compliance">
          <ChevronLeft size={22} aria-hidden="true" />
        </Link>

        <nav className="db-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon, to, active }) =>
            to ? (
              <Link key={label} to={to} className={`db-nav-item ${active ? "is-active" : ""}`}>
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
                {active && <span className="db-nav-bar" aria-hidden="true" />}
              </Link>
            ) : (
              <button type="button" key={label} className="db-nav-item">
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </button>
            ),
          )}
        </nav>

        <div className="db-user">
          <span className="db-avatar" aria-hidden="true">
            JD
          </span>
          <span className="db-user-meta">
            <strong>Jane Doe</strong>
            <small>Practice Admin</small>
          </span>
        </div>
      </aside>

      <main className="db-main">
        <header className="am-head">
          <h1 className="db-title">Edit PPM Task</h1>
          <p className="db-subtitle">Customise your Planned preventive maintenance (PPM) task.</p>
        </header>

        <form
          className="at-card"
          onSubmit={(event) => {
            event.preventDefault();
            void navigate({ to: "/compliance" });
          }}
        >
          <h2 className="at-card-title">Task Details</h2>

          <div className="at-grid">
            <div className="at-field">
              <label htmlFor="et-title">Title</label>
              <input id="et-title" type="text" placeholder="Enter task title" />
            </div>

            <div className="at-field">
              <label htmlFor="et-category">Category</label>
              <select id="et-category" defaultValue="">
                <option value="" disabled>
                  Select category
                </option>
                <option value="hvac">HVAC</option>
                <option value="fire">Fire Safety</option>
                <option value="mechanical">Mechanical</option>
                <option value="electrical">Electrical</option>
                <option value="plumbing">Plumbing</option>
                <option value="security">Security</option>
              </select>
            </div>

            <div className="at-field">
              <label htmlFor="et-equipment">Specific Equipment</label>
              <select id="et-equipment" defaultValue="">
                <option value="" disabled>
                  Select equipment (Optional)
                </option>
                <option value="hvac-a">HVAC Unit — Building A</option>
                <option value="fire-panel">Fire Alarm Panel — Main Hub</option>
                <option value="elevator">Elevator — East Wing</option>
                <option value="generator">Generator — Backup Power</option>
              </select>
            </div>

            <div className="at-field">
              <label htmlFor="et-note">Note</label>
              <textarea id="et-note" rows={4} placeholder="Enter notes or instructions" />
            </div>

            <div className="at-field">
              <label htmlFor="et-frequency">Frequency</label>
              <select id="et-frequency" defaultValue="">
                <option value="" disabled>
                  Select frequency
                </option>
                <option value="12h">12 hrs</option>
                <option value="3d">3 days</option>
                <option value="7d">7 days</option>
                <option value="14d">14 days</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="at-field">
              <label htmlFor="et-due">Due Date</label>
              <input id="et-due" type="date" placeholder="Select due date" />
            </div>

            <div className="at-field">
              <label htmlFor="et-notice">Notice Days</label>
              <select id="et-notice" defaultValue="">
                <option value="" disabled>
                  Select notice days (1,2,...)
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="7">7</option>
                <option value="14">14</option>
              </select>
            </div>

            <div className="at-field">
              <label htmlFor="et-role">Assign Roles</label>
              <select id="et-role" defaultValue="">
                <option value="" disabled>
                  Select role
                </option>
                <option value="admin">Practice Admin</option>
                <option value="manager">Facility Manager</option>
                <option value="engineer">Maintenance Engineer</option>
                <option value="nurse">Nurse Lead</option>
              </select>
            </div>
          </div>

          <div className="at-actions">
            <Link to="/compliance" className="at-cancel">
              Cancel
            </Link>
            <button type="submit" className="at-next">
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
