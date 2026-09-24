import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
  Download,
  Calendar,
  Check,
  ChevronRight,
  Stethoscope,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Kearly | Portfolio Overview" },
      {
        name: "description",
        content:
          "Track portfolio compliance, overdue items, upcoming PPM and open repairs across every building in Kearly.",
      },
      { property: "og:title", content: "Kearly | Portfolio Overview" },
      {
        property: "og:description",
        content:
          "Track portfolio compliance, overdue items, upcoming PPM and open repairs across every building in Kearly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const overviewNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const, active: true },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Equipment", icon: Stethoscope, to: "/equipment" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const, badge: "2" },
  { label: "Buildings", icon: Building2, to: "/assets" as const },
];

const governanceNav = [
  { label: "Reports", icon: BarChart3, to: "/reports" as const },
  { label: "Team", icon: Users, to: "/team-members" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Billing", icon: CreditCard, to: "/settings" as const },
];

const stats = [
  { label: "PORTFOLIO COMPLIANCE", value: "86%", note: "▲ 2 pts vs last month", tone: "green" },
  { label: "OVERDUE ITEMS", value: "3", note: "Action required", tone: "red" },
  { label: "DUE THIS WEEK", value: "5", note: "PPM scheduled", tone: "dark" },
  { label: "OPEN REPAIRS", value: "12", note: "2 P1 priority", tone: "dark" },
  { label: "SLA AT RISK", value: "2", note: "Next breach in 4h", tone: "amber" },
];

const filters = ["All", "Fire", "Electrical", "Gas & Water", "Lifts", "Repairs"];

const attention = [
  { dot: "red", tag: "FRA", title: "Fire Risk Assessment", site: "Riverside Court", status: "Overdue 6d", tone: "red" },
  { dot: "red", tag: "EICR", title: "Electrical Installation (EICR)", site: "Victoria Wharf", status: "Overdue 2d", tone: "red" },
  { dot: "red", tag: "WATER", title: "Legionella Risk Assessment", site: "Maple Business Park", status: "Overdue 1d", tone: "red" },
  { dot: "amber", tag: "GAS", title: "Gas Safety Record (LGSR)", site: "Kingsway Tower", status: "Due in 3d", tone: "amber" },
  { dot: "amber", tag: "ALARM", title: "Fire Alarm Service", site: "Riverside Court", status: "Due in 4d", tone: "amber" },
  { dot: "amber", tag: "EM-LT", title: "Emergency Lighting Test", site: "Northgate House", status: "Due in 5d", tone: "amber" },
  { dot: "amber", tag: "LIFTS", title: "Lift LOLER Inspection", site: "Elmwood Court", status: "Due in 6d", tone: "amber" },
  { dot: "amber", tag: "ASB", title: "Asbestos Re-inspection", site: "Maple Business Park", status: "Due in 8d", tone: "amber" },
  { dot: "red", tag: "P1", title: "Communal heating failure", site: "Riverside Court", status: "P1 · SLA 4h", tone: "red" },
];

const buildings = [
  { name: "Northgate House", city: "London", score: 96, units: 12 },
  { name: "Kingsway Tower", city: "Manchester", score: 88, units: 8 },
  { name: "Riverside Court", city: "Leeds", score: 72, units: 14 },
  { name: "Elmwood Court", city: "Bristol", score: 91, units: 4 },
  { name: "Maple Business Park", city: "Birmingham", score: 84, units: 9 },
  { name: "Victoria Wharf", city: "Liverpool", score: 79, units: 6 },
];

const upcoming = [
  { tag: "GAS", title: "Gas Safety Record (LGSR)", site: "Kingsway Tower", day: "Thu 3 Jul" },
  { tag: "ALARM", title: "Fire Alarm Service", site: "Riverside Court", day: "Fri 4 Jul" },
  { tag: "EM-LT", title: "Emergency Lighting Test", site: "Northgate House", day: "Sat 5 Jul" },
  { tag: "LIFTS", title: "Lift LOLER Inspection", site: "Elmwood Court", day: "Sun 6 Jul" },
];

const activity = [
  "Gas safety cert uploaded for Northgate House by MB · 38 min ago",
  "Repair job #4821 raised for communal heating at Riverside Court · 1h ago",
  "EICR overdue escalation sent to Victoria Wharf team · 2h ago",
  "Asbestos report approved for Elmwood Court by JG · 3h ago",
];

function scoreTone(score: number) {
  if (score >= 90) return "green";
  if (score >= 80) return "amber";
  return "red";
}

function DashboardPage() {
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
            <h1 className="po-title">Portfolio overview</h1>
            <p className="po-subtitle">6 buildings · updated 2 min ago</p>
          </div>
          <div className="po-topbar-actions">
            <div className="po-search">
              <Search size={15} aria-hidden="true" />
              <input type="search" placeholder="Search buildings, jobs..." aria-label="Search" />
            </div>
            <span className="po-chip">Wed 2 Jul</span>
            <span className="po-chip">
              <Calendar size={14} aria-hidden="true" />
              All buildings
            </span>
            <button type="button" className="po-download">
              <Download size={15} aria-hidden="true" />
              Download pack
            </button>
          </div>
        </header>

        <section className="po-stats" aria-label="Portfolio statistics">
          {stats.map((stat) => (
            <article className="po-stat" key={stat.label}>
              <p className="po-stat-label">{stat.label}</p>
              <p className={`po-stat-value tone-${stat.tone}`}>{stat.value}</p>
              <p className={`po-stat-note tone-${stat.tone}`}>{stat.note}</p>
            </article>
          ))}
        </section>

        <div className="po-columns">
          <section className="po-panel" aria-label="Needs attention">
            <header className="po-panel-head">
              <h2 className="po-panel-title">
                <span className="po-dot tone-red" aria-hidden="true" />
                Needs attention
              </h2>
              <div className="po-tabs">
                <span className="po-tab is-active">All 12</span>
                <span className="po-tab">Overdue 3</span>
                <span className="po-tab">Due soon 5</span>
                <span className="po-tab">Repairs 4</span>
              </div>
            </header>

            <div className="po-filters">
              {filters.map((filter, index) => (
                <button
                  type="button"
                  key={filter}
                  className={`po-filter ${index === 0 ? "is-active" : ""}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <ul className="po-list">
              {attention.map((item) => (
                <li className="po-row" key={item.title + item.site}>
                  <span className={`po-dot tone-${item.dot}`} aria-hidden="true" />
                  <span className="po-tag">{item.tag}</span>
                  <span className="po-row-text">
                    <span className="po-row-title">{item.title}</span>
                    <span className="po-row-site">{item.site}</span>
                  </span>
                  <span className={`po-status tone-${item.tone}`}>{item.status}</span>
                  <ChevronRight size={16} className="po-row-chevron" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </section>

          <div className="po-side">
            <section className="po-panel" aria-label="Compliance by building">
              <header className="po-panel-head">
                <h2 className="po-panel-title">Compliance by building</h2>
                <Link to="/assets" className="po-link">
                  All →
                </Link>
              </header>
              <ul className="po-buildings">
                {buildings.map((building) => (
                  <li key={building.name}>
                    <div className="po-building-top">
                      <span className="po-building-name">
                        {building.name} <span className="po-building-city">{building.city}</span>
                      </span>
                      <span className={`po-building-score tone-${scoreTone(building.score)}`}>
                        {building.score}%
                      </span>
                    </div>
                    <div className="po-bar">
                      <span
                        className={`po-bar-fill tone-${scoreTone(building.score)}`}
                        style={{ width: `${building.score}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="po-panel" aria-label="Upcoming PPM">
              <header className="po-panel-head">
                <h2 className="po-panel-title">Upcoming PPM</h2>
                <span className="po-panel-note">NEXT 7 DAYS</span>
              </header>
              <ul className="po-upcoming">
                {upcoming.map((item) => (
                  <li key={item.title}>
                    <span className="po-tag">{item.tag}</span>
                    <span className="po-row-text">
                      <span className="po-row-title">{item.title}</span>
                      <span className="po-row-site">{item.site}</span>
                    </span>
                    <span className="po-upcoming-day">{item.day}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="po-panel" aria-label="Recent activity">
              <header className="po-panel-head">
                <h2 className="po-panel-title">Recent activity</h2>
              </header>
              <ul className="po-activity">
                {activity.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
