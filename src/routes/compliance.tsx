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
  AlertCircle,
  CalendarCheck,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Menu,
  MapPin,
  Pencil,
  Users,
  History,
  Trash2,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Kearly | Compliance & PPM Tasks" },
      {
        name: "description",
        content:
          "Planned preventive maintenance overview and compliance task management across all Kearly facilities.",
      },
      { property: "og:title", content: "Kearly | Compliance & PPM Tasks" },
      {
        property: "og:description",
        content:
          "Planned preventive maintenance overview and compliance task management across all Kearly facilities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompliancePage,
});

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const, active: true },
  { label: "Repairs", icon: Wrench },
  { label: "Assets", icon: Building2, to: "/assets" as const },
  { label: "Reports", icon: BarChart3 },
  { label: "Audit Log", icon: ScrollText },
  { label: "Settings", icon: Settings },
];

const stats = [
  { label: "Total PPM Tasks", value: "64", note: "Across all facilities", icon: Wrench, tone: "green" },
  { label: "Due This Week", value: "12", note: "Tasks", icon: AlertCircle, tone: "amber" },
  { label: "Completed", value: "45", note: "Tasks", icon: CalendarCheck, tone: "teal" },
  { label: "Overdue", value: "4", note: "Tasks", icon: Clock, tone: "red" },
];

const rows = [
  {
    title: "HVAC Unit — Building A",
    category: "HVAC",
    frequency: "12 hrs",
    status: "Completed",
    due: "12 Jul 2026",
    next: "12 Jan 2027",
  },
  {
    title: "Fire Alarm Panel — Main Hub",
    category: "Fire Safety",
    frequency: "7 days",
    status: "Completed",
    due: "3 Aug 2026",
    next: "3 Feb 2027",
  },
  {
    title: "Elevator — East Wing",
    category: "Mechanical",
    frequency: "14 days",
    status: "Due Soon",
    due: "15 Mar 2026",
    next: "15 Sep 2026",
  },
  {
    title: "Generator — Backup Power",
    category: "Electrical",
    frequency: "3 days",
    status: "Completed",
    due: "20 Jun 2026",
    next: "20 Dec 2026",
  },
  {
    title: "Water Heater — Unit 3C",
    category: "Plumbing",
    frequency: "14 days",
    status: "Overdue",
    due: "8 May 2026",
    next: "—",
  },
  {
    title: "Security Camera System",
    category: "Security",
    frequency: "4 days",
    status: "Completed",
    due: "1 Aug 2026",
    next: "1 Feb 2027",
  },
  {
    title: "Boiler — Central Heating",
    category: "HVAC",
    frequency: "14 days",
    status: "Due Soon",
    due: "22 Feb 2026",
    next: "22 Aug 2026",
  },
];

const rowActions = [
  { label: "Add Site", icon: MapPin },
  { label: "Edit Details", icon: Pencil, to: "/edit-task" as const },
  { label: "Assign Staff", icon: Users },
  { label: "History", icon: History },
  { label: "Deactivate", icon: Trash2, danger: true },
];

const statusClass = (status: string) =>
  status === "Completed" ? "is-active" : status === "Due Soon" ? "is-due" : "is-inactive";

function CompliancePage() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [deleteTask, setDeleteTask] = useState<string | null>(null);

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
          <h1 className="db-title">Compliance</h1>
          <p className="db-subtitle">Planned preventive maintenance (PPM) overview and task management</p>
        </header>

        <section className="db-stats" aria-label="Compliance overview">
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

        <div className="cp-tabs" role="tablist" aria-label="Compliance views">
          <button type="button" role="tab" aria-selected="true" className="cp-tab is-active">
            PPM Overview
          </button>
        </div>

        <section className="am-panel" aria-label="PPM tasks">
          <div className="am-toolbar">
            <input className="am-search" type="search" placeholder="Search Tasks..." aria-label="Search tasks" />
            <select className="am-select" aria-label="Filter by category" defaultValue="all">
              <option value="all">All Categories</option>
              <option value="hvac">HVAC</option>
              <option value="fire">Fire Safety</option>
              <option value="mechanical">Mechanical</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="security">Security</option>
            </select>
            <select className="am-select" aria-label="Filter by site" defaultValue="all">
              <option value="all">All Sites</option>
              <option value="maple">Maple Court</option>
              <option value="hub">Main Hub</option>
              <option value="oakfield">Oakfield Tower</option>
              <option value="birch">Birch Lane</option>
            </select>
            <Link to="/add-task" className="am-add">
              <Plus size={15} aria-hidden="true" />
              <span>Add Task</span>
            </Link>
          </div>

          <h2 className="cp-table-title">Tasks</h2>

          <div className="am-table-wrap">
            <table className="am-table">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Category</th>
                  <th>Frequency</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Next Service</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.title}>
                    <td className="am-name">{row.title}</td>
                    <td>{row.category}</td>
                    <td>{row.frequency}</td>
                    <td>
                      <span className={`am-status ${statusClass(row.status)}`}>{row.status}</span>
                    </td>
                    <td>{row.due}</td>
                    <td className={row.status === "Due Soon" ? "am-next-due" : undefined}>{row.next}</td>
                    <td className="am-actions-cell">
                      <div className="am-menu-wrap">
                        <button
                          type="button"
                          className="am-kebab"
                          aria-label={`Actions for ${row.title}`}
                          aria-expanded={openMenu === row.title}
                          onClick={() => setOpenMenu(openMenu === row.title ? null : row.title)}
                        >
                          <Menu size={15} aria-hidden="true" />
                        </button>
                        {openMenu === row.title && (
                          <div className="am-menu" role="menu">
                            {rowActions.map(({ label, icon: Icon, danger, to }) =>
                              to ? (
                                <Link
                                  role="menuitem"
                                  key={label}
                                  to={to}
                                  className="am-menu-item"
                                  onClick={() => setOpenMenu(null)}
                                >
                                  <Icon size={14} aria-hidden="true" />
                                  <span>{label}</span>
                                </Link>
                              ) : (
                                <button
                                  type="button"
                                  role="menuitem"
                                  key={label}
                                  className={`am-menu-item ${danger ? "is-danger" : ""}`}
                                  onClick={() => {
                                    setOpenMenu(null);
                                    if (danger) setDeleteTask(row.title);
                                  }}
                                >
                                  <Icon size={14} aria-hidden="true" />
                                  <span>{label}</span>
                                </button>
                              ),
                            )}
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
            <small>Showing 1–7 of 64 Tasks</small>
            <Link to="/schedule" className="cp-schedule">
              See Schedule
            </Link>

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

      {deleteTask && (
        <div className="cp-overlay" role="presentation" onClick={() => setDeleteTask(null)}>
          <div
            className="cp-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="cp-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cp-modal-head">
              <span className="cp-modal-icon" aria-hidden="true">
                <AlertTriangle size={26} />
              </span>
              <h2 className="cp-modal-title" id="cp-modal-title">
                Deactivate Task
              </h2>
            </div>
            <p className="cp-modal-text">
              Are you sure you want to deactivate this task?
              <br />
              This action cannot be undone.
            </p>
            <div className="cp-modal-actions">
              <button type="button" className="cp-modal-cancel" onClick={() => setDeleteTask(null)}>
                Cancel
              </button>
              <button type="button" className="cp-modal-delete" onClick={() => setDeleteTask(null)}>
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
