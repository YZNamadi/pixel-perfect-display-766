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
  ShieldAlert,
  CalendarClock,
  Timer,
  Plus,
  ChevronLeft,
  ChevronRight,
  Menu,
  MapPin,
  Pencil,
  Users,
  History,
  Trash2,
} from "lucide-react";


export const Route = createFileRoute("/assets")({
  head: () => ({
    meta: [
      { title: "Kearly | Asset Management" },
      {
        name: "description",
        content: "Track and manage all facility assets and equipment, service dates and warranties in Kearly.",
      },
      { property: "og:title", content: "Kearly | Asset Management" },
      {
        property: "og:description",
        content: "Track and manage all facility assets and equipment, service dates and warranties in Kearly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssetsPage,
});

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const },
  { label: "Assets", icon: Building2, to: "/assets" as const, active: true },
  { label: "Reports", icon: BarChart3 },
  { label: "Audit Log", icon: ScrollText },
  { label: "Settings", icon: Settings },
];

const stats = [
  { label: "Total Assets", value: "156", note: "Across all facilities", icon: Wrench, tone: "green" },
  { label: "Active", value: "142", note: "91% operational", icon: ShieldAlert, tone: "teal" },
  { label: "Due for Service", value: "18", note: "7 this week", icon: CalendarClock, tone: "amber" },
  { label: "Warranty Expiring", value: "4", note: "Within 30 days", icon: Timer, tone: "orange" },
];

const rows = [
  {
    name: "HVAC Unit — Building A",
    category: "HVAC",
    location: "Maple Court",
    status: "Active",
    last: "12 Jul 2026",
    next: "12 Jan 2027",
  },
  {
    name: "Fire Alarm Panel — Main Hub",
    category: "Fire Safety",
    location: "Main Hub",
    status: "Active",
    last: "3 Aug 2026",
    next: "3 Feb 2027",
  },
  {
    name: "Elevator — East Wing",
    category: "Mechanical",
    location: "Oakfield Tower",
    status: "Due Service",
    last: "15 Mar 2026",
    next: "15 Sep 2026",
  },
  {
    name: "Generator — Backup Power",
    category: "Electrical",
    location: "Main Hub",
    status: "Active",
    last: "20 Jun 2026",
    next: "20 Dec 2026",
  },
  {
    name: "Water Heater — Unit 3C",
    category: "Plumbing",
    location: "Birch Lane",
    status: "Inactive",
    last: "8 May 2026",
    next: "—",
  },
  {
    name: "Security Camera System",
    category: "Security",
    location: "All Sites",
    status: "Active",
    last: "1 Aug 2026",
    next: "1 Feb 2027",
  },
  {
    name: "Boiler — Central Heating",
    category: "HVAC",
    location: "Maple Court",
    status: "Due Service",
    last: "22 Feb 2026",
    next: "22 Aug 2026",
  },
];

const rowActions = [
  { label: "Add Site", icon: MapPin },
  { label: "Edit Details", icon: Pencil },
  { label: "Assign Staff", icon: Users },
  { label: "History", icon: History },
  { label: "Deactivate", icon: Trash2, danger: true },
];

const statusClass = (status: string) =>
  status === "Active" ? "is-active" : status === "Due Service" ? "is-due" : "is-inactive";


function AssetsPage() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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
        <header className="am-head">
          <h1 className="db-title">Asset Management</h1>
          <p className="db-subtitle">Track and manage all facility assets and equipment.</p>
        </header>

        <section className="db-stats" aria-label="Asset overview">
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

        <section className="am-panel" aria-label="Assets">
          <div className="am-toolbar">
            <input className="am-search" type="search" placeholder="Search assets..." aria-label="Search assets" />
            <select className="am-select" aria-label="Filter by category" defaultValue="all">
              <option value="all">All Categories</option>
              <option value="hvac">HVAC</option>
              <option value="fire">Fire Safety</option>
              <option value="mechanical">Mechanical</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="security">Security</option>
            </select>
            <select className="am-select" aria-label="Filter by status" defaultValue="all">
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="due">Due Service</option>
              <option value="inactive">Inactive</option>
            </select>
            <button type="button" className="am-add">
              <Plus size={15} aria-hidden="true" />
              <span>Add Asset</span>
            </button>
          </div>

          <div className="am-table-wrap">
            <table className="am-table">
              <thead>
                <tr>
                  <th>Asset Name</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Last Serviced</th>
                  <th>Next Service</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name}>
                    <td className="am-name">{row.name}</td>
                    <td>{row.category}</td>
                    <td>{row.location}</td>
                    <td>
                      <span className={`am-status ${statusClass(row.status)}`}>{row.status}</span>
                    </td>
                    <td>{row.last}</td>
                    <td className={row.status === "Due Service" ? "am-next-due" : undefined}>{row.next}</td>
                    <td className="am-actions-cell">
                      <div className="am-menu-wrap">
                        <button
                          type="button"
                          className="am-kebab"
                          aria-label={`Actions for ${row.name}`}
                          aria-expanded={openMenu === row.name}
                          onClick={() => setOpenMenu(openMenu === row.name ? null : row.name)}
                        >
                          <Menu size={15} aria-hidden="true" />
                        </button>
                        {openMenu === row.name && (
                          <div className="am-menu" role="menu">
                            {rowActions.map(({ label, icon: Icon, danger }) => (
                              <button
                                type="button"
                                role="menuitem"
                                key={label}
                                className={`am-menu-item ${danger ? "is-danger" : ""}`}
                                onClick={() => setOpenMenu(null)}
                              >
                                <Icon size={14} aria-hidden="true" />
                                <span>{label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="am-foot">
            <small>Showing 1–7 of 156 assets</small>
            <div className="am-pager">
              <button type="button" className="am-page" aria-label="Previous page">
                <ChevronLeft size={15} aria-hidden="true" />
              </button>
              <button type="button" className="am-page is-current" aria-current="page">
                1
              </button>
              <button type="button" className="am-page">
                2
              </button>
              <button type="button" className="am-page">
                3
              </button>
              <span className="am-ellipsis">...</span>
              <button type="button" className="am-page">
                20
              </button>
              <button type="button" className="am-page" aria-label="Next page">
                <ChevronRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
