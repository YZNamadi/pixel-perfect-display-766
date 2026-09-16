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
  Calendar,
  ChevronDown,
  Download,
} from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Kearly | Compliance Reports" },
      {
        name: "description",
        content:
          "Generate and export CQC-ready compliance reports covering fire safety, water hygiene, gas, electrical and asbestos audits.",
      },
      { property: "og:title", content: "Kearly | Compliance Reports" },
      {
        property: "og:description",
        content:
          "Generate and export CQC-ready compliance reports covering fire safety, water hygiene, gas, electrical and asbestos audits.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});

const overviewNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const, badge: "2" },
  { label: "Buildings", icon: Building2, to: "/assets" as const },
];

const governanceNav = [
  { label: "Reports", icon: BarChart3, to: "/reports" as const, active: true },
  { label: "Team", icon: Users, to: "/team" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Billing", icon: CreditCard, to: "/settings" as const },
];

const tabs = ["Reports", "Documents", "Training"] as const;

const stats = [
  { label: "Total Reports Generated", value: "142", tone: "" },
  { label: "Pending Reviews", value: "5", tone: "tone-amber" },
  { label: "Overdue Actions", value: "2", tone: "tone-red" },
  { label: "Compliance Score", value: "98.4%", tone: "tone-green" },
];

type Report = {
  date: string;
  name: string;
  type: string;
  period: string;
  status: "Complete" | "Pending Review" | "Failed";
};

const reports: Report[] = [
  { date: "24 Jul 2024", name: "Riverside Q2 Comprehensive Fire Risk Audit", type: "Fire Safety", period: "Apr - Jun 2024", status: "Complete" },
  { date: "18 Jul 2024", name: "Annual Water Hygiene & Legionella L8 Assessment", type: "Water Safety", period: "Jul 2023 - Jul 2024", status: "Complete" },
  { date: "11 Jul 2024", name: "Portfolio Gas Safety Compliance Summary (CP12)", type: "Gas Safety", period: "Jun 2024", status: "Pending Review" },
  { date: "05 Jul 2024", name: "Electrical Installation Audit (EICR) - Riverside Court", type: "Electrical", period: "Full Portfolio", status: "Complete" },
  { date: "28 Jun 2024", name: "Asbestos Re-Inspection Report - Elmwood Court", type: "Asbestos", period: "Annual 2024", status: "Failed" },
  { date: "15 Jun 2024", name: "LOLER Passenger Lift Safety Audit - Northgate House", type: "Passenger Lift", period: "Bi-Annual", status: "Complete" },
  { date: "02 Jun 2024", name: "Pre-CQC Mock Inspection Compliance Output", type: "CQC Audit", period: "Full Portfolio", status: "Complete" },
  { date: "24 May 2024", name: "Annual Portable Appliance Testing (PAT) Audit", type: "Electrical", period: "Yearly 2024", status: "Complete" },
];

const statusTone = (s: Report["status"]) =>
  s === "Complete" ? "tone-green" : s === "Pending Review" ? "tone-amber" : "tone-red";

function ReportsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Reports");

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
          {overviewNav.map(({ label, icon: Icon, to, badge }) => (
            <Link key={label} to={to} className="po-nav-item">
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
              {badge ? <span className="po-nav-badge">{badge}</span> : null}
            </Link>
          ))}

          <p className="po-nav-label po-nav-label-gap">GOVERNANCE</p>
          {governanceNav.map(({ label, icon: Icon, to, active }) => (
            <Link key={label} to={to} className={`po-nav-item ${active ? "is-active" : ""}`}>
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
            <h1 className="po-title">Reports</h1>
            <p className="po-subtitle">Generate and export compliance reports</p>
          </div>
          <div className="po-topbar-actions">
            <span className="rr-range">
              <label htmlFor="rr-from">From:</label>
              <input id="rr-from" type="text" defaultValue="01 Jan 2024" />
            </span>
            <span className="rr-range">
              <label htmlFor="rr-to">To:</label>
              <input id="rr-to" type="text" defaultValue="31 Dec 2024" />
            </span>
            <span className="po-chip">
              <Calendar size={14} aria-hidden="true" />
              All buildings
              <ChevronDown size={13} aria-hidden="true" />
            </span>
            <button type="button" className="po-download">
              Export CQC Report
            </button>
          </div>
        </header>

        <div className="rr-tabs" role="tablist" aria-label="Report sections">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              className={`rr-tab ${tab === item ? "is-active" : ""}`}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="rr-stats">
          {stats.map(({ label, value, tone }) => (
            <div className="rr-stat" key={label}>
              <p className="rr-stat-label">{label}</p>
              <p className={`rr-stat-value ${tone}`}>{value}</p>
            </div>
          ))}
        </div>

        <section className="cl-panel" aria-label="Generated reports">
          <div className="cl-table-wrap">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>DATE GENERATED</th>
                  <th>REPORT NAME</th>
                  <th>TYPE</th>
                  <th>PERIOD COVERED</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.name}>
                    <td className="rp-created">{r.date}</td>
                    <td className="cl-name">{r.name}</td>
                    <td className="al-details">{r.type}</td>
                    <td className="al-details">{r.period}</td>
                    <td>
                      <span className={`rp-status ${statusTone(r.status)}`}>{r.status}</span>
                    </td>
                    <td>
                      <button type="button" className="rr-dl" aria-label={`Download ${r.name}`}>
                        <Download size={15} aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cl-foot">
            <small>Showing 1-8 of 142 reports</small>
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
    </div>
  );
}
