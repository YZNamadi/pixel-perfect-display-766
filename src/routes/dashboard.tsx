import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  Download,
  LayoutDashboard,
  ShieldCheck,
  Wrench,
  Building2,
  BarChart3,
  ScrollText,
  Settings,
  Clock,
  FilePlus2,
  BadgePlus,
  Plug,
  Home,
  FileCheck2,
  CircleSlash2,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Kearly | Facilities Dashboard" },
      {
        name: "description",
        content: "See open repairs, compliance tasks, assets and pending actions across your facilities in Kearly.",
      },
      { property: "og:title", content: "Kearly | Facilities Dashboard" },
      {
        property: "og:description",
        content: "See open repairs, compliance tasks, assets and pending actions across your facilities in Kearly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const, active: true },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const },
  { label: "Assets", icon: Building2, to: "/assets" as const },
  { label: "Reports", icon: BarChart3 },
  { label: "Audit Log", icon: ScrollText },
  { label: "Settings", icon: Settings },
];


const stats = [
  { label: "Open Repairs", value: "12", note: "+3 this week", icon: Wrench, tone: "green" },
  { label: "Compliance Tasks", value: "8", note: "2 due tomorrow", icon: ShieldCheck, tone: "amber" },
  { label: "Assets", value: "24", note: "All sites active", icon: Building2, tone: "teal" },
  { label: "Pending Actions", value: "5", note: "-2 since yesterday", icon: Clock, tone: "red" },
];

const activity = [
  {
    icon: Plug,
    title: "Repair request created — Unit 4B",
    detail: "Electrical fault reported by on-site staff",
    time: "2 hours ago",
  },
  {
    icon: FileCheck2,
    title: "Compliance task completed — Fire safety inspection",
    detail: "Passed with zero outstanding issues at Main Hub",
    time: "5 hours ago",
  },
  {
    icon: Home,
    title: "Building information updated — Maple Court",
    detail: "Updated floor space specs and keyholder contacts",
    time: "Yesterday",
  },
  {
    icon: CircleSlash2,
    title: "Document uploaded — Gas safety certificate",
    detail: "Successfully validated by auditor team",
    time: "Yesterday",
  },
];

const pending = [
  { title: "Review fire risk assessment", due: "Due tomorrow", priority: "High" },
  { title: "Approve contractor access", due: "Due in 3 days", priority: "Medium" },
  { title: "Submit quarterly compliance report", due: "Due next week", priority: "High" },
];

const quickActions = [
  { label: "Add Repair", icon: FilePlus2 },
  { label: "Add Building", icon: Building2 },
  { label: "Create Report", icon: BarChart3 },
  { label: "Add Compliance", icon: BadgePlus },
];

function DashboardPage() {
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
        <header className="db-head">
          <div>
            <h1 className="db-title">Good morning, Jane</h1>
            <p className="db-subtitle">Here&apos;s an overview of your facilities today.</p>
          </div>
          <div className="db-head-actions">
            <button type="button" className="db-icon-btn" aria-label="Download report">
              <Download size={18} aria-hidden="true" />
            </button>
            <button type="button" className="db-icon-btn" aria-label="Notifications">
              <Bell size={18} aria-hidden="true" />
            </button>
          </div>
        </header>

        <section className="db-stats" aria-label="Overview">
          {stats.map(({ label, value, note, icon: Icon, tone }) => (
            <article className={`db-stat is-${tone}`} key={label}>
              <div className="db-stat-top">
                <span className="db-stat-label">{label}</span>
                <span className="db-stat-icon">
                  <Icon size={16} aria-hidden="true" />
                </span>
              </div>
              <strong className="db-stat-value">{value}</strong>
              <small className="db-stat-note">{note}</small>
            </article>
          ))}
        </section>

        <div className="db-grid">
          <section className="db-panel" aria-labelledby="db-activity">
            <h2 id="db-activity" className="db-panel-title">
              Recent Activity
            </h2>
            <ul className="db-activity">
              {activity.map(({ icon: Icon, title, detail, time }) => (
                <li className="db-activity-row" key={title}>
                  <span className="db-activity-icon">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className="db-activity-meta">
                    <strong>{title}</strong>
                    <small>{detail}</small>
                  </span>
                  <span className="db-activity-time">{time}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="db-side">
            <section className="db-panel" aria-labelledby="db-pending">
              <h2 id="db-pending" className="db-panel-title">
                Pending Actions
              </h2>
              <ul className="db-pending">
                {pending.map(({ title, due, priority }) => (
                  <li className="db-pending-row" key={title}>
                    <span className="db-pending-meta">
                      <strong>{title}</strong>
                      <small>{due}</small>
                    </span>
                    <span className={`db-chip is-${priority.toLowerCase()}`}>{priority}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="db-panel db-quick" aria-labelledby="db-quick-title">
              <h2 id="db-quick-title" className="db-panel-title">
                Quick Actions
              </h2>
              <div className="db-quick-grid">
                {quickActions.map(({ label, icon: Icon }) => (
                  <button type="button" className="db-quick-btn" key={label}>
                    <Icon size={16} aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
