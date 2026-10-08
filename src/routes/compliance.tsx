import { ProductSelect } from "@/components/product-select";
import { useMemo, useState } from "react";
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
  Calendar,
  Plus,
  Pencil,
  Check,
  Eye,
  X,
  Stethoscope,
} from "lucide-react";

import { KearlyLogo } from "@/components/kearly-logo";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Kearly | Compliance & PPM Tasks" },
      {
        name: "description",
        content:
          "NHS and healthcare clinical compliance schedules: track PPM tasks, due dates, assignees and status across every site.",
      },
      { property: "og:title", content: "Kearly | Compliance & PPM Tasks" },
      {
        property: "og:description",
        content:
          "NHS and healthcare clinical compliance schedules: track PPM tasks, due dates, assignees and status across every site.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompliancePage,
});

const overviewNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const, active: true },
  { label: "Equipment", icon: Stethoscope, to: "/equipment" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const, badge: "2" },
  { label: "Buildings", icon: Building2, to: "/assets" as const },
];

const governanceNav = [
  { label: "Reports", icon: BarChart3, to: "/reports" as const },
  { label: "Team", icon: Users, to: "/team-members" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
];

const tabs = [
  { label: "All Tasks (12)", key: "all" },
  { label: "Due Soon (5)", key: "due" },
  { label: "Overdue (3)", key: "overdue" },
  { label: "Completed (4)", key: "completed" },
];

type Row = {
  name: string;
  category: string;
  site: string;
  frequency: string;
  due: string;
  assignee: string;
  initials: string;
  avatarTone: string;
  status: "Overdue" | "Due Soon" | "On Track" | "Completed";
};

const rows: Row[] = [
  { name: "Fire Risk Assessment", category: "FRA", site: "Riverside Court", frequency: "Annually", due: "15 Jul 2024", assignee: "Sarah Jones", initials: "SJ", avatarTone: "red", status: "Overdue" },
  { name: "Electrical Installation (EICR)", category: "EICR", site: "Victoria Wharf", frequency: "5 Years", due: "18 Jul 2024", assignee: "James Carter", initials: "JC", avatarTone: "blue", status: "Overdue" },
  { name: "Legionella Risk Assessment", category: "WATER", site: "Maple Business Park", frequency: "Bi-Annually", due: "22 Jul 2024", assignee: "Alex Rowe", initials: "AR", avatarTone: "green", status: "Due Soon" },
  { name: "Gas Safety Record (LGSR)", category: "GAS", site: "Kingsway Tower", frequency: "Annually", due: "25 Jul 2024", assignee: "Michael Finch", initials: "MF", avatarTone: "purple", status: "Due Soon" },
  { name: "Fire Alarm Service", category: "ALARM", site: "Riverside Court", frequency: "Quarterly", due: "29 Jul 2024", assignee: "Sarah Jones", initials: "SJ", avatarTone: "red", status: "Due Soon" },
  { name: "Emergency Lighting Test", category: "EM-LT", site: "Northgate House", frequency: "Monthly", due: "02 Aug 2024", assignee: "Alex Rowe", initials: "AR", avatarTone: "green", status: "On Track" },
  { name: "Lift LOLER Inspection", category: "LIFTS", site: "Elmwood Court", frequency: "6 Months", due: "05 Aug 2024", assignee: "David Vance", initials: "DV", avatarTone: "teal", status: "On Track" },
  { name: "Asbestos Re-Inspections", category: "ASB", site: "Maple Business Park", frequency: "Annually", due: "10 Aug 2024", assignee: "James Carter", initials: "JC", avatarTone: "blue", status: "On Track" },
];

const statusTone = (status: Row["status"]) =>
  status === "Overdue" ? "tone-red" : status === "Due Soon" ? "tone-amber" : "tone-green";

function CompliancePage() {
  const [activeTab, setActiveTab] = useState("all");
  const [taskRows, setTaskRows] = useState(rows);
  const [query, setQuery] = useState("");
  const [building, setBuilding] = useState("All buildings");
  const [selectedTask, setSelectedTask] = useState<Row | null>(null);
  const [page, setPage] = useState(1);
  const filteredRows = useMemo(() => taskRows.filter((row) => (activeTab === "all" || (activeTab === "due" && row.status === "Due Soon") || (activeTab === "overdue" && row.status === "Overdue") || (activeTab === "completed" && row.status === "Completed")) && (building === "All buildings" || row.site === building) && (!query.trim() || `${row.name} ${row.category} ${row.site} ${row.assignee}`.toLowerCase().includes(query.toLowerCase()))), [taskRows, activeTab, building, query]);
  const pageRows = filteredRows.slice((page - 1) * 4, page * 4);

  return (
    <div className="po-shell">
      <aside className="po-sidebar">
        <Link to="/dashboard" className="po-logo" aria-label="Kearly">
          <KearlyLogo className="po-logo-mark" />
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
            <h1 className="po-title">Compliance - PPM</h1>
            <p className="po-subtitle">NHS &amp; Healthcare Clinical Compliance Schedules</p>
          </div>
          <div className="po-topbar-actions">
            <div className="po-search">
              <Search size={15} aria-hidden="true" />
               <input type="search" placeholder="Search..." aria-label="Search tasks" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} />
            </div>
            <span className="po-chip">Jul 2024</span>
             <label className="po-chip qa-select-chip">
              <Calendar size={14} aria-hidden="true" />
               <ProductSelect aria-label="Filter compliance by building" value={building} onChange={(event) => { setBuilding(event.target.value); setPage(1); }}><option>All buildings</option>{Array.from(new Set(taskRows.map((row) => row.site))).map((site) => <option key={site}>{site}</option>)}</ProductSelect>
             </label>
             <Link to="/equipment" className="cl-outline">
              Medical Equipment
             </Link>
            <Link to="/schedule" className="cl-outline">
              View Calendar
            </Link>
            <Link to="/add-task" className="po-download">
              <Plus size={15} aria-hidden="true" />
              Add Task
            </Link>
          </div>
        </header>

        <div className="cl-tabs" role="tablist" aria-label="Task filters">
          {tabs.map(({ label, key }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              className={`cl-tab ${activeTab === key ? "is-active" : ""}`}
               onClick={() => { setActiveTab(key); setPage(1); }}
            >
              {label}
            </button>
          ))}
        </div>

        <section className="cl-panel" aria-label="Compliance tasks">
          <div className="cl-table-wrap">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>TASK NAME</th>
                  <th>CATEGORY</th>
                  <th>SITE</th>
                  <th>FREQUENCY</th>
                  <th>NEXT DUE</th>
                  <th>ASSIGNED TO</th>
                  <th>STATUS</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                 {pageRows.map((row) => (
                  <tr key={row.name}>
                    <td className="cl-name">{row.name}</td>
                    <td className="cl-cat">{row.category}</td>
                    <td>{row.site}</td>
                    <td>{row.frequency}</td>
                    <td>{row.due}</td>
                    <td>
                      <span className="cl-assignee">
                        <span className={`cl-avatar tone-${row.avatarTone}`} aria-hidden="true">
                          {row.initials}
                        </span>
                        {row.assignee}
                      </span>
                    </td>
                    <td>
                      <span className={`cl-status ${statusTone(row.status)}`}>{row.status}</span>
                    </td>
                    <td>
                      <span className="cl-row-actions">
                        <Link to="/edit-task" className="cl-icon-btn" aria-label={`Edit ${row.name}`}>
                          <Pencil size={15} aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          className="cl-icon-btn"
                          aria-label={`Mark ${row.name} complete`}
                           disabled={row.status === "Completed"}
                           onClick={() => setTaskRows((current) => current.map((task) => task.name === row.name ? { ...task, status: "Completed" } : task))}
                        >
                          <Check size={15} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="cl-icon-btn"
                          aria-label={`View ${row.name}`}
                           onClick={() => setSelectedTask(row)}
                        >
                          <Eye size={15} aria-hidden="true" />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cl-foot">
             <small>Showing {filteredRows.length ? (page - 1) * 4 + 1 : 0}-{Math.min(page * 4, filteredRows.length)} of {filteredRows.length} compliance tasks</small>
            <div className="cl-pager">
               <button type="button" className="cl-page" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>
                Previous
              </button>
               <button type="button" className="cl-page is-current" disabled={page * 4 >= filteredRows.length} onClick={() => setPage((current) => current + 1)}>
                Next
              </button>
            </div>
          </div>
        </section>
      </main>

       {selectedTask && (
         <div className="cp-overlay" role="presentation" onClick={() => setSelectedTask(null)}>
          <div
            className="cp-modal"
             role="dialog"
            aria-modal="true"
            aria-labelledby="cp-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cp-modal-head">
              <h2 className="cp-modal-title" id="cp-modal-title">
                 {selectedTask.name}
              </h2>
               <button className="cl-icon-btn" type="button" aria-label="Close task details" onClick={() => setSelectedTask(null)}><X size={18} /></button>
            </div>
            <p className="cp-modal-text">
               {selectedTask.category} · {selectedTask.site}<br />Due {selectedTask.due} · {selectedTask.frequency}<br />Assigned to {selectedTask.assignee}
            </p>
            <div className="cp-modal-actions">
               <button type="button" className="cp-modal-cancel" onClick={() => setSelectedTask(null)}>Close</button>
               <Link to="/edit-task" className="at-next">Edit Task</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
