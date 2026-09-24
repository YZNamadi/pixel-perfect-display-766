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
  Plus,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/building")({
  head: () => ({
    meta: [
      { title: "Kearly | Northgate House Site Overview" },
      {
        name: "description",
        content:
          "Northgate House compliance breakdown, statutory scores, scheduled PPM tasks, active repairs, site specifications and assigned team.",
      },
      { property: "og:title", content: "Kearly | Northgate House Site Overview" },
      {
        property: "og:description",
        content:
          "Northgate House compliance breakdown, statutory scores, scheduled PPM tasks, active repairs, site specifications and assigned team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BuildingPage,
});

const overviewNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Equipment", icon: Stethoscope, to: "/equipment" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const, badge: "2" },
  { label: "Buildings", icon: Building2, to: "/assets" as const, active: true },
];

const governanceNav = [
  { label: "Reports", icon: BarChart3, to: "/reports" as const },
  { label: "Team", icon: Users, to: "/team-members" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Billing", icon: CreditCard, to: "/settings" as const },
];

const breakdown = [
  { label: "Fire Safety", state: "Compliant", score: "100%" },
  { label: "Water Hygiene", state: "Compliant", score: "100%" },
  { label: "Electrical (MH & LVD)", state: "Action Required", score: "92%" },
  { label: "Gas Safety Services", state: "Compliant", score: "100%" },
  { label: "Lifts & Lifting Gear", state: "Compliant", score: "100%" },
];

const tasks = [
  { name: "Emergency Light testing & verific...", system: "Electrical", due: "Jul 18, 2024", priority: "Medium", assignee: "James Carter", initials: "JC", tone: "blue" },
  { name: "TMV Temperature checks (Legio...", system: "Water Hygiene", due: "Jul 22, 2024", priority: "Low", assignee: "Alex Rowe", initials: "AR", tone: "green" },
  { name: "Fire alarm panel quarterly service...", system: "Fire Safety", due: "Aug 02, 2024", priority: "High", assignee: "Sarah Jenkins", initials: "SJ", tone: "red" },
];

const priorityTone = (p: string) =>
  p === "High" ? "bd-pri-high" : p === "Medium" ? "bd-pri-med" : "bd-pri-low";

const specs = [
  { label: "FULL ADDRESS", value: "Northgate House, 15-17 Tottenham Court Rd, London W1T 1BJ" },
  { label: "SITE MANAGER", value: "Alex Rowe (Portfolio Admin)" },
  { label: "CONTACT PHONE", value: "+44 (0) 20 7946 0192" },
  { label: "GROSS INTERNAL AREA", value: "4,250 m²" },
  { label: "PRIMARY USE TYPE", value: "Clinical / NHS Rehabilitation" },
  { label: "YEAR CONSTRUCTED", value: "1998 (Refurbished 2019)" },
];

const team = [
  { name: "Alex Rowe", role: "Portfolio Lead Admin", initials: "AR", tone: "green" },
  { name: "Sarah Jenkins", role: "On-site Compliance Manager", initials: "SJ", tone: "red" },
  { name: "James Carter", role: "Lead Facilities Engineer", initials: "JC", tone: "blue" },
  { name: "Clara Oswald", role: "General Operations Admin", initials: "CO", tone: "purple" },
];

function BuildingPage() {
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
        <nav className="et-crumbs" aria-label="Breadcrumb">
          <Link to="/assets">Buildings &amp; Sites</Link>
          <span aria-hidden="true">/</span>
          <span className="et-crumb-current">Northgate House</span>
        </nav>

        <header className="bd-head">
          <div>
            <div className="bd-title-row">
              <h1 className="po-title">Northgate House</h1>
              <span className="bd-pill">96% Compliant</span>
            </div>
            <p className="po-subtitle">NHS Outpatient &amp; Rehabilitation Center • London</p>
          </div>
          <div className="bd-head-actions">
            <Link to="/site" className="cl-outline">
              Edit Details
            </Link>
            <Link to="/add-task" className="po-download">
              <Plus size={15} aria-hidden="true" />
              New Task
            </Link>
          </div>
        </header>

        <div className="bd-grid">
          <div className="bd-col">
            <section className="bd-card" aria-label="Compliance breakdown">
              <h2 className="bd-card-title">Compliance Breakdown</h2>
              <p className="bd-card-sub">Asset-level legal testing &amp; routine maintenance scores</p>

              <div className="bd-overall">
                <span className="bd-overall-label">Overall Statutory Score</span>
                <span className="bd-overall-value">96%</span>
              </div>
              <div className="bd-bar">
                <span style={{ width: "96%" }} />
              </div>

              <div className="bd-break-grid">
                {breakdown.map((item) => (
                  <div key={item.label} className="bd-break">
                    <div>
                      <p className="bd-break-label">{item.label}</p>
                      <p className={item.state === "Compliant" ? "bd-break-state" : "bd-break-state is-warn"}>
                        {item.state}
                      </p>
                    </div>
                    <span className="bd-break-score">{item.score}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bd-card" aria-label="PPM tasks and scheduled maintenance">
              <div className="bd-card-head">
                <div>
                  <h2 className="bd-card-title">PPM Tasks &amp; Scheduled Maintenance</h2>
                  <p className="bd-card-sub">Next 30 days scheduled preventative maintenance</p>
                </div>
                <span className="bd-pill">0 Overdue</span>
              </div>

              <div className="cl-table-wrap">
                <table className="cl-table bd-table">
                  <thead>
                    <tr>
                      <th>TASK DESCRIPTION</th>
                      <th>SYSTEM</th>
                      <th>DUE DATE</th>
                      <th>PRIORITY</th>
                      <th>ASSIGNEE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.name}>
                        <td className="cl-name">{task.name}</td>
                        <td>{task.system}</td>
                        <td>{task.due}</td>
                        <td>
                          <span className={priorityTone(task.priority)}>{task.priority}</span>
                        </td>
                        <td>
                          <span className="cl-assignee">
                            <span className={`cl-avatar tone-${task.tone}`} aria-hidden="true">
                              {task.initials}
                            </span>
                            {task.assignee}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bd-card" aria-label="Active repairs">
              <div className="bd-card-head">
                <div>
                  <h2 className="bd-card-title">Active Repairs</h2>
                  <p className="bd-card-sub">Unscheduled reactive repair items logged on-site</p>
                </div>
                <span className="bd-pill">0 Active Repairs</span>
              </div>

              <div className="bd-empty">
                <span className="bd-empty-icon" aria-hidden="true">
                  <CheckCircle2 size={22} />
                </span>
                <p className="bd-empty-title">All Systems Operational</p>
                <p className="bd-empty-text">
                  No active repairs or structural hazards reported for Northgate House.
                </p>
                <Link to="/add-task" className="cl-outline">
                  Log Repair Item
                </Link>
              </div>
            </section>
          </div>

          <div className="bd-col">
            <section className="bd-card" aria-label="Site specifications">
              <h2 className="bd-card-title">Site Specifications</h2>
              <dl className="bd-specs">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="bd-card" aria-label="Assigned team">
              <div className="bd-card-head">
                <h2 className="bd-card-title">Assigned Team</h2>
                <Link to="/settings" className="bd-manage">
                  Manage
                </Link>
              </div>
              <ul className="bd-team">
                {team.map((member) => (
                  <li key={member.name}>
                    <span className={`cl-avatar tone-${member.tone}`} aria-hidden="true">
                      {member.initials}
                    </span>
                    <span>
                      <span className="bd-team-name">{member.name}</span>
                      <span className="bd-team-role">{member.role}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
