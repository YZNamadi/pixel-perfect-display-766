import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShieldCheck,
  Wrench,
  Building2,
  BarChart3,
  ScrollText,
  Settings,
  FileText,
  Download,
  TrendingUp,
  CalendarCheck,
} from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Kearly | Compliance Reports" },
      {
        name: "description",
        content: "Generate and download compliance, repair and asset reports across all Kearly facilities.",
      },
      { property: "og:title", content: "Kearly | Compliance Reports" },
      {
        property: "og:description",
        content: "Generate and download compliance, repair and asset reports across all Kearly facilities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const },
  { label: "Assets", icon: Building2, to: "/assets" as const },
  { label: "Reports", icon: BarChart3, to: "/reports" as const, active: true },
  { label: "Audit Log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Settings", icon: Settings, to: "/settings" as const },
];

const stats = [
  { label: "Reports Generated", value: "38", note: "Last 30 days", icon: FileText, tone: "green" },
  { label: "Compliance Rate", value: "94%", note: "All facilities", icon: TrendingUp, tone: "teal" },
  { label: "Scheduled Reports", value: "6", note: "Recurring", icon: CalendarCheck, tone: "amber" },
  { label: "Awaiting Review", value: "3", note: "Reports", icon: ScrollText, tone: "red" },
];

const rows = [
  {
    name: "Monthly Compliance Summary",
    type: "Compliance",
    site: "All Facilities",
    period: "Aug 2026",
    status: "Ready",
    created: "1 Sep 2026",
  },
  {
    name: "PPM Completion Report",
    type: "Maintenance",
    site: "Oakfield Tower",
    period: "Q3 2026",
    status: "Ready",
    created: "28 Aug 2026",
  },
  {
    name: "Repairs & Costs Breakdown",
    type: "Repairs",
    site: "Birch Lane",
    period: "Aug 2026",
    status: "In Review",
    created: "26 Aug 2026",
  },
  {
    name: "Asset Register Export",
    type: "Assets",
    site: "Maple Court",
    period: "Full history",
    status: "Ready",
    created: "19 Aug 2026",
  },
  {
    name: "Audit Evidence Pack",
    type: "Compliance",
    site: "All Facilities",
    period: "Jul 2026",
    status: "Pending",
    created: "2 Aug 2026",
  },
];

const statusClass = (status: string) =>
  status === "Ready" ? "is-active" : status === "In Review" ? "is-due" : "is-inactive";

function ReportsPage() {
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
          <h1 className="db-title">Reports</h1>
          <p className="db-subtitle">Generate, review and export compliance reports</p>
        </header>

        <section className="db-stats" aria-label="Reports overview">
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

        <section className="am-panel" aria-label="Generated reports">
          <div className="am-toolbar">
            <input className="am-search" type="search" placeholder="Search Reports..." aria-label="Search reports" />
            <select className="am-select" aria-label="Filter by report type" defaultValue="all">
              <option value="all">All Types</option>
              <option value="compliance">Compliance</option>
              <option value="maintenance">Maintenance</option>
              <option value="repairs">Repairs</option>
              <option value="assets">Assets</option>
            </select>
            <select className="am-select" aria-label="Filter by period" defaultValue="30">
              <option value="30">Last 30 days</option>
              <option value="90">Last quarter</option>
              <option value="365">Last year</option>
            </select>
            <button type="button" className="am-add">
              <Download size={15} aria-hidden="true" />
              <span>Export All</span>
            </button>
          </div>

          <h2 className="cp-table-title">Generated Reports</h2>

          <div className="am-table-wrap">
            <table className="am-table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Type</th>
                  <th>Site</th>
                  <th>Period</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name}>
                    <td className="am-name">{row.name}</td>
                    <td>{row.type}</td>
                    <td>{row.site}</td>
                    <td>{row.period}</td>
                    <td>
                      <span className={`am-status ${statusClass(row.status)}`}>{row.status}</span>
                    </td>
                    <td>{row.created}</td>
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
