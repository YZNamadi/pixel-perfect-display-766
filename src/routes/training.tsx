import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Building,
  Building2,
  ChevronDown,
  CreditCard,
  FileText,
  LayoutDashboard,
  Pencil,
  ScrollText,
  Settings,
  ShieldCheck,
  Stethoscope,
  Trash2,
  Users,
  Wrench,
  X,
} from "lucide-react";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Kearly | Staff Records" },
      { name: "description", content: "Review staff reports, filing dates, due dates, documents and statuses across the Kearly portfolio." },
      { property: "og:title", content: "Kearly | Staff Records" },
      { property: "og:description", content: "Review staff reports, filing dates, due dates, documents and statuses across the Kearly portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StaffRecordsPage,
});

const overviewNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Equipment", icon: Stethoscope, to: "/equipment" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const, badge: "2" },
  { label: "Buildings", icon: Building2, to: "/assets" as const },
];

const governanceNav = [
  { label: "Reports", icon: BarChart3, to: "/reports" as const, active: true },
  { label: "Team", icon: Users, to: "/team-members" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Billing", icon: CreditCard, to: "/settings" as const },
];

type StaffReport = {
  name: string;
  role: string;
  initials: string;
  tone: "red" | "blue" | "green" | "purple" | "teal";
  report: string;
  category: string;
  filed: string;
  due: string;
  status: "Filed" | "Closed" | "In Review";
};

const initialRecords: StaffReport[] = [
  { name: "Alex Rowe", role: "Facility Lead", initials: "AR", tone: "green", report: "Monthly Fire Safety Report", category: "Health & Safety", filed: "15 Jan 2024", due: "15 Jan 2025", status: "Filed" },
  { name: "Sarah Jones", role: "Care Administrator", initials: "SJ", tone: "blue", report: "Incident Report - Resident Fall", category: "Clinical", filed: "22 Mar 2024", due: "22 Mar 2027", status: "Filed" },
  { name: "David Finch", role: "Maintenance Engineer", initials: "DF", tone: "purple", report: "Water Hygiene Monitoring Report", category: "Facilities", filed: "10 Jun 2024", due: "10 Jun 2026", status: "Filed" },
  { name: "James Carter", role: "Compliance Officer", initials: "JC", tone: "teal", report: "CQC Readiness Audit Report", category: "Governance", filed: "02 Feb 2024", due: "02 Feb 2025", status: "Filed" },
  { name: "Emma Watson", role: "Support Worker", initials: "EW", tone: "red", report: "Safeguarding Concern Report", category: "Safeguarding", filed: "14 Jul 2022", due: "14 Jul 2024", status: "Closed" },
  { name: "Robert Vance", role: "Facilities Team", initials: "RV", tone: "blue", report: "Equipment Maintenance Log", category: "Operations", filed: "05 Sep 2023", due: "05 Sep 2024", status: "In Review" },
  { name: "Clara Oswald", role: "Site Supervisor", initials: "CO", tone: "purple", report: "COSHH Chemical Register", category: "Health & Safety", filed: "18 Nov 2023", due: "18 Nov 2024", status: "Filed" },
  { name: "Marcus Brody", role: "Operations Admin", initials: "MB", tone: "green", report: "Staff Incident Report", category: "HR", filed: "30 Jan 2024", due: "30 Jan 2025", status: "Filed" },
];

const statusTone: Record<StaffReport["status"], string> = {
  Filed: "tone-green",
  Closed: "tone-red",
  "In Review": "tone-amber",
};

function StaffRecordsPage() {
  const [records, setRecords] = useState(initialRecords);
  const [staff, setStaff] = useState("All Staff");
  const [category, setCategory] = useState("All Types");
  const [status, setStatus] = useState("All");
  const [pendingDelete, setPendingDelete] = useState<StaffReport | null>(null);
  const [editing, setEditing] = useState<StaffReport | null>(null);
  const [adding, setAdding] = useState(false);

  const visibleRecords = useMemo(
    () => records.filter((row) =>
      (staff === "All Staff" || row.name === staff) &&
      (category === "All Types" || row.category === category) &&
      (status === "All" || row.status === status)),
    [records, staff, category, status],
  );

  const categories = Array.from(new Set(records.map((row) => row.category)));

  return (
    <div className="po-shell tr-page">
      <aside className="po-sidebar">
        <Link to="/dashboard" className="po-logo" aria-label="Kearly">
          <svg width="26" height="26" viewBox="0 0 100 100" aria-hidden="true">
            <rect x="5" y="5" width="40" height="40" rx="10" fill="#15803D" />
            <path d="M 55 5 L 95 5 L 95 45 Q 75 45 55 25 Z" fill="#15803D" />
            <rect x="5" y="55" width="40" height="40" rx="10" fill="#15803D" />
            <path d="M 55 55 Q 75 55 95 75 L 95 95 L 55 95 Z" fill="#15803D" />
          </svg>
          <span className="po-logo-text"><span className="po-logo-name">KEARLY</span><span className="po-logo-tag">Compliance. Automated &amp; Simplified.</span></span>
        </Link>

        <nav className="po-nav" aria-label="Main navigation">
          <p className="po-nav-label">OVERVIEW</p>
          {overviewNav.map(({ label, icon: Icon, to, badge }) => (
            <Link key={label} to={to} className="po-nav-item">
              <Icon size={17} aria-hidden="true" /><span>{label}</span>{badge ? <span className="po-nav-badge">{badge}</span> : null}
            </Link>
          ))}
          <p className="po-nav-label po-nav-label-gap">GOVERNANCE</p>
          {governanceNav.map(({ label, icon: Icon, to, active }) => (
            <Link key={label} to={to} className={`po-nav-item ${active ? "is-active" : ""}`}>
              <Icon size={17} aria-hidden="true" /><span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="po-sidebar-foot">
          <Link to="/settings" className="po-nav-item"><Settings size={17} aria-hidden="true" /><span>Settings</span></Link>
          <div className="po-user"><span className="po-user-avatar" aria-hidden="true">AR</span><span className="po-user-text"><span className="po-user-name">Alex Rowe</span><span className="po-user-role">Portfolio admin</span></span></div>
        </div>
      </aside>

      <main className="po-main">
        <header className="po-topbar">
          <div><h1 className="po-title">Staff Records</h1><p className="po-subtitle">Track staff training and certifications</p></div>
          <div className="po-topbar-actions">
            <button type="button" className="po-chip tr-building"><Building size={14} aria-hidden="true" />All buildings<ChevronDown size={13} aria-hidden="true" /></button>
            <button type="button" className="po-download" onClick={() => setAdding(true)}>Add Training Record</button>
          </div>
        </header>

        <div className="rr-tabs" role="tablist" aria-label="Report sections">
          <Link to="/reports" role="tab" aria-selected={false} className="rr-tab">Reports</Link>
          <Link to="/documents" role="tab" aria-selected={false} className="rr-tab">Documents</Link>
          <Link to="/training" role="tab" aria-selected className="rr-tab is-active">Staff Report</Link>
        </div>

        <div className="dc-filters tr-filters">
          <label className="tr-filter"><span>Staff:</span><select aria-label="Filter by staff" value={staff} onChange={(event) => setStaff(event.target.value)}><option>All Staff</option>{records.map((row) => <option key={row.name}>{row.name}</option>)}</select><ChevronDown size={13} aria-hidden="true" /></label>
          <label className="tr-filter"><span>Report Type:</span><select aria-label="Filter by report type" value={category} onChange={(event) => setCategory(event.target.value)}><option>All Types</option>{categories.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={13} aria-hidden="true" /></label>
          <label className="tr-filter"><span>Status:</span><select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option><option>Filed</option><option>Closed</option><option>In Review</option></select><ChevronDown size={13} aria-hidden="true" /></label>
        </div>

        <section className="cl-panel tr-panel" aria-label="Staff reports">
          <div className="cl-table-wrap">
            <table className="cl-table tr-table">
              <thead><tr><th>STAFF MEMBER</th><th>REPORT NAME</th><th>CATEGORY</th><th>DATE FILED</th><th>DUE DATE</th><th>DOCUMENT</th><th>STATUS</th><th>ACTIONS</th></tr></thead>
              <tbody>
                {visibleRecords.map((row) => (
                  <tr key={`${row.name}-${row.report}`}>
                    <td><span className="cl-assignee"><span className={`cl-avatar tr-avatar tone-${row.tone}`} aria-hidden="true">{row.initials}</span><span className="tr-staff"><span className="tr-staff-name">{row.name}</span><span className="tr-staff-role">{row.role}</span></span></span></td>
                    <td className="cl-name tr-report-name">{row.report}</td>
                    <td className="al-details">{row.category}</td>
                    <td className="rp-created">{row.filed}</td>
                    <td className="rp-created">{row.due}</td>
                    <td><button type="button" className="tr-cert" aria-label={`Open ${row.report} PDF`}><span className="tr-file-icon"><FileText size={13} aria-hidden="true" /></span>PDF</button></td>
                    <td><span className={`dc-expiry ${statusTone[row.status]}`}>{row.status}</span></td>
                    <td><div className="cl-row-actions"><button type="button" className="cl-icon-btn tr-action" aria-label={`Edit ${row.report}`} onClick={() => setEditing(row)}><Pencil size={14} aria-hidden="true" /></button><button type="button" className="cl-icon-btn tr-action dc-del" aria-label={`Delete ${row.report}`} onClick={() => setPendingDelete(row)}><Trash2 size={14} aria-hidden="true" /></button></div></td>
                  </tr>
                ))}
                {visibleRecords.length === 0 ? <tr><td colSpan={8} className="tr-empty">No staff reports match these filters.</td></tr> : null}
              </tbody>
            </table>
          </div>
          <div className="cl-foot"><small>Showing 1-{visibleRecords.length} of 48 staff reports</small><div className="cl-pager"><button type="button" className="cl-page">Previous</button><button type="button" className="cl-page is-current">Next</button></div></div>
        </section>
      </main>

      {(adding || editing) ? (
        <div className="cp-overlay" role="presentation" onClick={() => { setAdding(false); setEditing(null); }}>
          <form className="tr-modal" onSubmit={(event) => { event.preventDefault(); setAdding(false); setEditing(null); }} onClick={(event) => event.stopPropagation()}>
            <div className="tr-modal-head"><div><h2>{editing ? "Edit Training Record" : "Add Training Record"}</h2><p>{editing ? editing.name : "Create a new staff report"}</p></div><button type="button" className="cl-icon-btn" aria-label="Close" onClick={() => { setAdding(false); setEditing(null); }}><X size={18} /></button></div>
            <label>Report name<input required defaultValue={editing?.report ?? ""} placeholder="Enter report name" /></label>
            <label>Category<select defaultValue={editing?.category ?? "Health & Safety"}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
            <div className="tr-modal-actions"><button type="button" className="cl-page" onClick={() => { setAdding(false); setEditing(null); }}>Cancel</button><button type="submit" className="po-download">Save Record</button></div>
          </form>
        </div>
      ) : null}

      {pendingDelete ? (
        <div className="cp-overlay" role="presentation" onClick={() => setPendingDelete(null)}>
          <div className="cp-modal" role="alertdialog" aria-modal="true" aria-labelledby="tr-delete-title" onClick={(event) => event.stopPropagation()}>
            <h2 className="cp-modal-title" id="tr-delete-title">Delete Staff Report</h2><p className="cp-modal-text">Are you sure you want to delete {pendingDelete.report}?</p>
            <div className="cp-modal-actions"><button type="button" className="cp-modal-cancel" onClick={() => setPendingDelete(null)}>Cancel</button><button type="button" className="cp-modal-delete" onClick={() => { setRecords((current) => current.filter((row) => row !== pendingDelete)); setPendingDelete(null); }}>Delete</button></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}