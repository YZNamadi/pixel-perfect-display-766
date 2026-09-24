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
  ArrowRight,
  Stethoscope,
} from "lucide-react";

export const Route = createFileRoute("/assets")({
  head: () => ({
    meta: [
      { title: "Kearly | Buildings & Sites" },
      {
        name: "description",
        content:
          "Overview of every NHS portfolio location with compliance scores, outstanding PPM tasks and active repairs.",
      },
      { property: "og:title", content: "Kearly | Buildings & Sites" },
      {
        property: "og:description",
        content:
          "Overview of every NHS portfolio location with compliance scores, outstanding PPM tasks and active repairs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BuildingsPage,
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

const buildings = [
  { name: "Northgate House", city: "London", score: 96, ppm: 0, repairs: 0 },
  { name: "Kingsway Tower", city: "Manchester", score: 88, ppm: 2, repairs: 1 },
  { name: "Riverside Court", city: "Leeds", score: 72, ppm: 4, repairs: 2 },
  { name: "Elmwood Court", city: "Bristol", score: 91, ppm: 1, repairs: 1 },
  { name: "Maple Business Park", city: "Birmingham", score: 84, ppm: 3, repairs: 2 },
  { name: "Victoria Wharf", city: "Liverpool", score: 79, ppm: 2, repairs: 3 },
];

const teamInitials = ["SJ", "JC", "AR"];

const scoreTone = (score: number) => (score >= 90 ? "tone-green" : score >= 80 ? "tone-amber" : "tone-red");

function BuildingsPage() {
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
            <h1 className="po-title">Buildings &amp; Sites</h1>
            <p className="po-subtitle">Overview of NHS portfolio locations</p>
          </div>
          <div className="po-topbar-actions">
            <div className="po-search">
              <Search size={15} aria-hidden="true" />
              <input type="search" placeholder="Search..." aria-label="Search buildings" />
            </div>
            <span className="po-chip">Jul 2024</span>
            <Link to="/add-site" className="po-download">
              Add Site
            </Link>
          </div>
        </header>

        <section className="bs-grid" aria-label="Buildings">
          {buildings.map((b) => (
            <article className="bs-card" key={b.name}>
              <h2 className="bs-name">{b.name}</h2>
              <p className="bs-city">{b.city}</p>

              <div className="bs-score-row">
                <span className="bs-score-label">Portfolio Compliance</span>
                <strong className={`bs-score ${scoreTone(b.score)}`}>{b.score}%</strong>
              </div>
              <div className="bs-bar">
                <span className={`bs-bar-fill ${scoreTone(b.score)}`} style={{ width: `${b.score}%` }} />
              </div>

              <div className="bs-metrics">
                <div className="bs-metric">
                  <span className="bs-metric-label">PPM TASKS</span>
                  <strong className={`bs-metric-value ${b.ppm > 0 ? "" : "is-zero"}`}>{b.ppm} Outstanding</strong>
                </div>
                <div className="bs-metric">
                  <span className="bs-metric-label">ACTIVE REPAIRS</span>
                  <strong className={`bs-metric-value ${b.repairs > 0 ? "tone-red" : "is-zero"}`}>
                    {b.repairs} Open
                  </strong>
                </div>
              </div>

              <div className="bs-foot">
                <span className="bs-avatars" aria-hidden="true">
                  {teamInitials.map((i) => (
                    <span className="bs-avatar" key={i}>
                      {i}
                    </span>
                  ))}
                </span>
                <Link to="/building" className="bs-manage">
                  Manage Site
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
