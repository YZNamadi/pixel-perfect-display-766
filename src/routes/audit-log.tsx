import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShieldCheck,
  Wrench,
  Building2,
  BarChart3,
  ScrollText,
  Settings,
  Activity,
  UserCheck,
  ShieldAlert,
  Download,
} from "lucide-react";

export const Route = createFileRoute("/audit-log")({
  head: () => ({
    meta: [
      { title: "Kearly | Audit Log" },
      {
        name: "description",
        content: "Tamper-evident record of every compliance action, edit and login across your Kearly account.",
      },
      { property: "og:title", content: "Kearly | Audit Log" },
      {
        property: "og:description",
        content: "Tamper-evident record of every compliance action, edit and login across your Kearly account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuditLogPage,
});

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const },
  { label: "Assets", icon: Building2, to: "/assets" as const },
  { label: "Reports", icon: BarChart3, to: "/reports" as const },
  { label: "Audit Log", icon: ScrollText, to: "/audit-log" as const, active: true },
  { label: "Settings", icon: Settings, to: "/settings" as const },
];

const stats = [
  { label: "Events Today", value: "42", note: "All users", icon: Activity, tone: "green" },
  { label: "Active Users", value: "8", note: "Last 24 hours", icon: UserCheck, tone: "teal" },
  { label: "Record Changes", value: "17", note: "Last 24 hours", icon: ScrollText, tone: "amber" },
  { label: "Security Events", value: "2", note: "Needs review", icon: ShieldAlert, tone: "red" },
];

const rows = [
  {
    time: "11 Sep 2026, 09:42",
    user: "Jane Doe",
    action: "Updated PPM task",
    target: "Boiler — Central Heating",
    type: "Change",
  },
  {
    time: "11 Sep 2026, 09:15",
    user: "Michael Osei",
    action: "Marked task complete",
    target: "Fire Alarm Test — Oakfield",
    type: "Change",
  },
  {
    time: "11 Sep 2026, 08:58",
    user: "Jane Doe",
    action: "Signed in",
    target: "Web app",
    type: "Access",
  },
  {
    time: "10 Sep 2026, 17:31",
    user: "Amara Bello",
    action: "Uploaded certificate",
    target: "Gas Safety — Birch Lane",
    type: "Change",
  },
  {
    time: "10 Sep 2026, 16:04",
    user: "System",
    action: "Failed sign-in attempt",
    target: "admin@kearly.co",
    type: "Security",
  },
  {
    time: "10 Sep 2026, 12:20",
    user: "Jane Doe",
    action: "Deactivated asset",
    target: "Water Heater — Unit 3C",
    type: "Change",
  },
];

const typeClass = (type: string) => (type === "Access" ? "is-active" : type === "Change" ? "is-due" : "is-inactive");

function AuditLogPage() {
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
          {navItems.map(({ label, icon: Icon, to, active }) => (
            <Link key={label} to={to} className={`db-nav-item ${active ? "is-active" : ""}`}>
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
              {active && <span className="db-nav-bar" aria-hidden="true" />}
            </Link>
          ))}
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
          <h1 className="db-title">Audit Log</h1>
          <p className="db-subtitle">A tamper-evident trail of every action in your account</p>
        </header>

        <section className="db-stats" aria-label="Audit overview">
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

        <section className="am-panel" aria-label="Audit events">
          <div className="am-toolbar">
            <input className="am-search" type="search" placeholder="Search Events..." aria-label="Search audit events" />
            <select className="am-select" aria-label="Filter by event type" defaultValue="all">
              <option value="all">All Events</option>
              <option value="change">Changes</option>
              <option value="access">Access</option>
              <option value="security">Security</option>
            </select>
            <select className="am-select" aria-label="Filter by user" defaultValue="all">
              <option value="all">All Users</option>
              <option value="jane">Jane Doe</option>
              <option value="michael">Michael Osei</option>
              <option value="amara">Amara Bello</option>
            </select>
            <button type="button" className="am-add">
              <Download size={15} aria-hidden="true" />
              <span>Export Log</span>
            </button>
          </div>

          <h2 className="cp-table-title">Recent Activity</h2>

          <div className="am-table-wrap">
            <table className="am-table">
              <thead>
                <tr>
                  <th>Date &amp; Time</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Record</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={`${row.time}-${row.action}`}>
                    <td className="am-name">{row.time}</td>
                    <td>{row.user}</td>
                    <td>{row.action}</td>
                    <td>{row.target}</td>
                    <td>
                      <span className={`am-status ${typeClass(row.type)}`}>{row.type}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
