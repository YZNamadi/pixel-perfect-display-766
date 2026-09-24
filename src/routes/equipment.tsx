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
  Search,
  Calendar,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  AlertTriangle,
  Stethoscope,
  Barcode,
} from "lucide-react";

export const Route = createFileRoute("/equipment")({
  head: () => ({
    meta: [
      { title: "Kearly | Medical Equipment Registry" },
      {
        name: "description",
        content:
          "Medical equipment asset registry with serial tracking, PPM schedules, breakdown history and status across every site.",
      },
      { property: "og:title", content: "Kearly | Medical Equipment Registry" },
      {
        property: "og:description",
        content:
          "Medical equipment asset registry with serial tracking, PPM schedules, breakdown history and status across every site.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EquipmentPage,
});

const overviewNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Equipment", icon: Stethoscope, to: "/equipment" as const, active: true },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const, badge: "2" },
  { label: "Buildings", icon: Building2, to: "/assets" as const },
];

const governanceNav = [
  { label: "Reports", icon: BarChart3, to: "/reports" as const },
  { label: "Team", icon: Users, to: "/team-members" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Billing", icon: CreditCard, to: "/settings" as const },
];

const tabs = [
  { label: "All Equipment (48)", key: "all" },
  { label: "Active (42)", key: "active" },
  { label: "Under Maintenance (4)", key: "maintenance" },
  { label: "Decommissioned (2)", key: "decommissioned" },
];

type Row = {
  name: string;
  serial: string;
  category: string;
  site: string;
  initials: string;
  avatarTone: string;
  schedule: string;
  due: string;
  incidents: number;
  status: "Active" | "Under Maintenance" | "Decommissioned";
};

const rows: Row[] = [
  { name: "Defibrillator AED Plus", serial: "SN-DEF-2024-084", category: "EMERGENCY", site: "Riverside Court", initials: "RC", avatarTone: "red", schedule: "Quarterly", due: "15 Jul 2024", incidents: 0, status: "Active" },
  { name: "Patient Hoist (Ceiling)", serial: "SN-HST-2023-120", category: "PATIENT HANDLING", site: "Victoria Wharf", initials: "VW", avatarTone: "blue", schedule: "6 Months", due: "22 Jul 2024", incidents: 2, status: "Active" },
  { name: "Oxygen Concentrator", serial: "SN-OXY-2024-039", category: "RESPIRATORY", site: "Maple Business Park", initials: "MB", avatarTone: "green", schedule: "Monthly", due: "01 Aug 2024", incidents: 1, status: "Active" },
  { name: "Suction Unit (Portable)", serial: "SN-SUC-2023-075", category: "EMERGENCY", site: "Kingsway Tower", initials: "KT", avatarTone: "purple", schedule: "Quarterly", due: "28 Jul 2024", incidents: 0, status: "Active" },
  { name: "Bed (Profiling Electric)", serial: "SN-BED-2022-158", category: "WARD FURNITURE", site: "Northgate House", initials: "NH", avatarTone: "teal", schedule: "Annually", due: "10 Sep 2024", incidents: 3, status: "Under Maintenance" },
  { name: "Blood Pressure Monitor", serial: "SN-BPM-2024-011", category: "DIAGNOSTICS", site: "Elmwood Court", initials: "EC", avatarTone: "green", schedule: "6 Months", due: "05 Aug 2024", incidents: 0, status: "Active" },
  { name: "Syringe Driver", serial: "SN-SYR-2023-062", category: "INFUSION", site: "Riverside Court", initials: "RC", avatarTone: "red", schedule: "Monthly", due: "18 Jul 2024", incidents: 1, status: "Active" },
  { name: "Examination Couch", serial: "SN-EXC-2021-029", category: "FURNITURE", site: "Victoria Wharf", initials: "VW", avatarTone: "blue", schedule: "Annually", due: "30 Nov 2024", incidents: 0, status: "Decommissioned" },
];

const statusTone = (status: Row["status"]) =>
  status === "Active" ? "tone-green" : status === "Under Maintenance" ? "tone-amber" : "tone-muted";

function EquipmentPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

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
            <Link to="/compliance" className="eq-back" aria-label="Back to compliance">
              <ChevronLeft size={20} aria-hidden="true" />
            </Link>
            <h1 className="po-title">Medical Equipment</h1>
            <p className="po-subtitle">Asset registry with serial tracking &amp; PPM schedules</p>
          </div>
          <div className="po-topbar-actions">
            <div className="po-search">
              <Search size={15} aria-hidden="true" />
              <input type="search" placeholder="Search serial or name..." aria-label="Search equipment" />
            </div>
            <span className="po-chip">
              Jul 2024
              <Calendar size={14} aria-hidden="true" />
            </span>
            <span className="po-chip">
              <Building2 size={14} aria-hidden="true" />
              All buildings
            </span>
            <Link to="/add-task" className="po-download">
              <Plus size={15} aria-hidden="true" />
              Add Equipment
            </Link>
          </div>
        </header>

        <div className="cl-tabs" role="tablist" aria-label="Equipment filters">
          {tabs.map(({ label, key }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              className={`cl-tab ${activeTab === key ? "is-active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <section className="cl-panel" aria-label="Medical equipment registry">
          <div className="cl-table-wrap">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>EQUIPMENT NAME</th>
                  <th>SERIAL / BARCODE</th>
                  <th>CATEGORY</th>
                  <th>SITE</th>
                  <th>PPM SCHEDULE</th>
                  <th>NEXT DUE</th>
                  <th>BREAKDOWN HISTORY</th>
                  <th>STATUS</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.serial}>
                    <td className="cl-name">{row.name}</td>
                    <td>
                      <span className="eq-serial">
                        <Barcode size={15} aria-hidden="true" />
                        {row.serial}
                      </span>
                    </td>
                    <td>
                      <span className="eq-cat">{row.category}</span>
                    </td>
                    <td>
                      <span className="cl-assignee">
                        <span className={`cl-avatar tone-${row.avatarTone}`} aria-hidden="true">
                          {row.initials}
                        </span>
                        {row.site}
                      </span>
                    </td>
                    <td>{row.schedule}</td>
                    <td>{row.due}</td>
                    <td>
                      <span className={row.incidents > 0 ? "eq-incidents is-warn" : "eq-incidents"}>
                        {row.incidents} {row.incidents === 1 ? "incident" : "incidents"}
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
                          aria-label={`Delete ${row.name}`}
                          onClick={() => setPendingDelete(row.name)}
                        >
                          <Trash2 size={15} aria-hidden="true" />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cl-foot">
            <small>Showing 1-8 of 48 active medical assets</small>
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

      {pendingDelete && (
        <div className="cp-overlay" role="presentation" onClick={() => setPendingDelete(null)}>
          <div
            className="cp-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="eq-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cp-modal-head">
              <span className="cp-modal-icon" aria-hidden="true">
                <AlertTriangle size={26} />
              </span>
              <h2 className="cp-modal-title" id="eq-modal-title">
                Delete Equipment
              </h2>
            </div>
            <p className="cp-modal-text">
              Are you sure you want to delete {pendingDelete}?
              <br />
              This action cannot be undone.
            </p>
            <div className="cp-modal-actions">
              <button type="button" className="cp-modal-cancel" onClick={() => setPendingDelete(null)}>
                Cancel
              </button>
              <button type="button" className="cp-modal-delete" onClick={() => setPendingDelete(null)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
