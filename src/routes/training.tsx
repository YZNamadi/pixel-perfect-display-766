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
  Building,
  ChevronDown,
  FileText,
  Pencil,
  Trash2,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Kearly | Staff Training Records" },
      {
        name: "description",
        content:
          "Track staff training and certifications: fire safety, first aid, legionella, safeguarding and CQC prep with expiry status.",
      },
      { property: "og:title", content: "Kearly | Staff Training Records" },
      {
        property: "og:description",
        content:
          "Track staff training and certifications: fire safety, first aid, legionella, safeguarding and CQC prep with expiry status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrainingPage,
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

type Record_ = {
  name: string;
  role: string;
  initials: string;
  tone: "red" | "blue" | "green" | "purple" | "teal";
  training: string;
  provider: string;
  completed: string;
  expiry: string;
  status: "Valid" | "Expiring" | "Expired";
};

const records: Record_[] = [
  {
    name: "Alex Rowe",
    role: "Facility Lead",
    initials: "AR",
    tone: "green",
    training: "Fire Safety Marshall Training",
    provider: "UK Fire Safety Academy",
    completed: "15 Jan 2024",
    expiry: "15 Jan 2025",
    status: "Valid",
  },
  {
    name: "Sarah Jones",
    role: "Care Administrator",
    initials: "SJ",
    tone: "blue",
    training: "First Aid at Work (Level 3)",
    provider: "St John Ambulance",
    completed: "22 Mar 2024",
    expiry: "22 Mar 2027",
    status: "Valid",
  },
  {
    name: "David Finch",
    role: "Maintenance Engineer",
    initials: "DF",
    tone: "purple",
    training: "Legionella Control & Water Safety L8",
    provider: "CIBSE Training",
    completed: "10 Jun 2024",
    expiry: "10 Jun 2026",
    status: "Valid",
  },
  {
    name: "James Carter",
    role: "Compliance Officer",
    initials: "JC",
    tone: "teal",
    training: "CQC Inspection Prep Course",
    provider: "Care Quality Experts",
    completed: "02 Feb 2024",
    expiry: "02 Feb 2025",
    status: "Valid",
  },
  {
    name: "Emma Watson",
    role: "Support Worker",
    initials: "EW",
    tone: "red",
    training: "Safeguarding Adults (Level 2)",
    provider: "Social Care Institute",
    completed: "14 Jul 2022",
    expiry: "14 Jul 2024",
    status: "Expired",
  },
  {
    name: "Robert Vance",
    role: "Facilities Team",
    initials: "RV",
    tone: "blue",
    training: "Manual Handling & Risk Assessment",
    provider: "Safety First Ltd",
    completed: "05 Sep 2023",
    expiry: "05 Sep 2024",
    status: "Expiring",
  },
  {
    name: "Clara Oswald",
    role: "Site Supervisor",
    initials: "CO",
    tone: "purple",
    training: "COSHH Awareness Certification",
    provider: "British Safety Council",
    completed: "18 Nov 2023",
    expiry: "18 Nov 2024",
    status: "Valid",
  },
  {
    name: "Marcus Brody",
    role: "Operations Admin",
    initials: "MB",
    tone: "green",
    training: "Health & Safety in Care Homes",
    provider: "Care Assured Training",
    completed: "30 Jan 2024",
    expiry: "30 Jan 2025",
    status: "Valid",
  },
];

const statusTone: Record<Record_["status"], string> = {
  Valid: "tone-green",
  Expiring: "tone-amber",
  Expired: "tone-red",
};

const filters = ["Staff Member: All Staff", "Training Type: All Types", "Status: All"];

function TrainingPage() {
  const [pending, setPending] = useState<Record_ | null>(null);

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
            <h1 className="po-title">Training Records</h1>
            <p className="po-subtitle">Track staff training and certifications</p>
          </div>
          <div className="po-topbar-actions">
            <span className="po-chip">
              <Building size={14} aria-hidden="true" />
              All buildings
              <ChevronDown size={13} aria-hidden="true" />
            </span>
            <button type="button" className="po-download">
              Add Training Record
            </button>
          </div>
        </header>

        <div className="rr-tabs" role="tablist" aria-label="Report sections">
          <Link to="/reports" role="tab" aria-selected={false} className="rr-tab">
            Reports
          </Link>
          <Link to="/documents" role="tab" aria-selected={false} className="rr-tab">
            Documents
          </Link>
          <Link to="/training" role="tab" aria-selected className="rr-tab is-active">
            Training
          </Link>
        </div>

        <div className="dc-filters">
          {filters.map((f) => (
            <button type="button" className="dc-filter" key={f}>
              {f}
              <ChevronDown size={13} aria-hidden="true" />
            </button>
          ))}
        </div>

        <section className="cl-panel" aria-label="Staff training records">
          <div className="cl-table-wrap">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>STAFF MEMBER</th>
                  <th>TRAINING NAME</th>
                  <th>PROVIDER</th>
                  <th>DATE COMPLETED</th>
                  <th>EXPIRY DATE</th>
                  <th>CERTIFICATE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {records.map((row) => (
                  <tr key={`${row.name}-${row.training}`}>
                    <td>
                      <span className="cl-assignee">
                        <span className={`cl-avatar tone-${row.tone}`} aria-hidden="true">
                          {row.initials}
                        </span>
                        <span className="tr-staff">
                          <span className="tr-staff-name">{row.name}</span>
                          <span className="tr-staff-role">{row.role}</span>
                        </span>
                      </span>
                    </td>
                    <td className="cl-name">{row.training}</td>
                    <td className="al-details">{row.provider}</td>
                    <td className="rp-created">{row.completed}</td>
                    <td className="rp-created">{row.expiry}</td>
                    <td>
                      <span className="tr-cert">
                        <FileText size={14} aria-hidden="true" />
                        PDF
                      </span>
                    </td>
                    <td>
                      <span className={`dc-expiry ${statusTone[row.status]}`}>{row.status}</span>
                    </td>
                    <td>
                      <div className="cl-row-actions">
                        <Link
                          to="/settings"
                          className="cl-icon-btn"
                          aria-label={`Edit ${row.training} for ${row.name}`}
                        >
                          <Pencil size={15} aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          className="cl-icon-btn dc-del"
                          aria-label={`Delete ${row.training} for ${row.name}`}
                          onClick={() => setPending(row)}
                        >
                          <Trash2 size={15} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cl-foot">
            <small>Showing 1-8 of 48 staff records</small>
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

      {pending && (
        <div className="cp-overlay" role="presentation" onClick={() => setPending(null)}>
          <div
            className="cp-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="tr-del-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cp-modal-head">
              <span className="cp-modal-icon" aria-hidden="true">
                <AlertTriangle size={26} />
              </span>
              <h2 className="cp-modal-title" id="tr-del-title">
                Delete Training Record
              </h2>
            </div>
            <p className="cp-modal-text">
              Are you sure you want to delete {pending.training} for {pending.name}?
              <br />
              This action cannot be undone.
            </p>
            <div className="cp-modal-actions">
              <button type="button" className="cp-modal-cancel" onClick={() => setPending(null)}>
                Cancel
              </button>
              <button type="button" className="cp-modal-delete" onClick={() => setPending(null)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
