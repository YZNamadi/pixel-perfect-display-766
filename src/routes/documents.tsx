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
  Building,
  ChevronDown,
  UploadCloud,
  Eye,
  Download,
  Trash2,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Kearly | Compliance Documents" },
      {
        name: "description",
        content:
          "Manage compliance documents and certificates: gas, electrical, fire risk, asbestos and water hygiene records with expiry tracking.",
      },
      { property: "og:title", content: "Kearly | Compliance Documents" },
      {
        property: "og:description",
        content:
          "Manage compliance documents and certificates: gas, electrical, fire risk, asbestos and water hygiene records with expiry tracking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DocumentsPage,
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

type Doc = {
  name: string;
  property: string;
  type: string;
  uploaded: string;
  expiry: string;
  expiryTone: "tone-green" | "tone-amber" | "tone-red";
  ppm: string;
  tag: string;
};

const documents: Doc[] = [
  {
    name: "Riverside_CP12_GasSafety_2024.pdf",
    property: "Riverside Court",
    type: "Gas Certificate",
    uploaded: "02 Jul 2024",
    expiry: "02 Jul 2025",
    expiryTone: "tone-green",
    ppm: "PPM-1240",
    tag: "CQC",
  },
  {
    name: "Electrical_EICR_Block_A_Final.pdf",
    property: "Elmwood Court",
    type: "Electrical Cert",
    uploaded: "28 Jun 2024",
    expiry: "28 Jun 2029",
    expiryTone: "tone-green",
    ppm: "PPM-8821",
    tag: "EICR",
  },
  {
    name: "FireRiskAssessment_Elmwood_v2.pdf",
    property: "Elmwood Court",
    type: "Fire Risk Ass.",
    uploaded: "14 Jun 2024",
    expiry: "14 Jul 2024",
    expiryTone: "tone-amber",
    ppm: "PPM-0982",
    tag: "Fire Safety",
  },
  {
    name: "EPC_VictoriaWharf_Unit12_Signed.pdf",
    property: "Victoria Wharf",
    type: "EPC",
    uploaded: "12 May 2024",
    expiry: "12 May 2034",
    expiryTone: "tone-green",
    ppm: "PPM-4450",
    tag: "CQC",
  },
  {
    name: "Water_Hygiene_L8_Riverside_Report.pdf",
    property: "Riverside Court",
    type: "Water Hygiene L8",
    uploaded: "05 May 2024",
    expiry: "05 May 2025",
    expiryTone: "tone-green",
    ppm: "PPM-7729",
    tag: "Legionella",
  },
  {
    name: "LOLER_PassengerLift_Northgate_Q2.pdf",
    property: "Northgate House",
    type: "Passenger Lift Cert",
    uploaded: "22 Apr 2024",
    expiry: "22 Oct 2024",
    expiryTone: "tone-amber",
    ppm: "PPM-1120",
    tag: "LOLER",
  },
  {
    name: "Asbestos_Survey_VictoriaWharf.pdf",
    property: "Victoria Wharf",
    type: "Asbestos Survey",
    uploaded: "10 Jan 2024",
    expiry: "10 Jan 2024",
    expiryTone: "tone-red",
    ppm: "PPM-3401",
    tag: "Asbestos",
  },
  {
    name: "Commercial_Building_Insurance_2024.pdf",
    property: "Northgate House",
    type: "Insurance Cert",
    uploaded: "01 Jan 2024",
    expiry: "01 Jan 2025",
    expiryTone: "tone-green",
    ppm: "PPM-2291",
    tag: "CQC",
  },
];

const filters = ["Doc Type: All Types", "Property: All Properties", "Expiry Status: All"];

function DocumentsPage() {
  const [pending, setPending] = useState<Doc | null>(null);

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
            <h1 className="po-title">Documents</h1>
            <p className="po-subtitle">Manage compliance documents and certificates</p>
          </div>
        </header>

        <div className="rr-tabs" role="tablist" aria-label="Report sections">
          <Link to="/reports" role="tab" aria-selected={false} className="rr-tab">
            Reports
          </Link>
          <Link to="/documents" role="tab" aria-selected className="rr-tab is-active">
            Documents
          </Link>
          <Link to="/staff-records" role="tab" aria-selected={false} className="rr-tab">
            Staff Report
          </Link>
        </div>

        <div className="dc-toolbar">
          <div className="po-search dc-search">
            <Search size={15} aria-hidden="true" />
            <input type="search" placeholder="Search documents..." aria-label="Search documents" />
          </div>
          <span className="po-chip">
            <Building size={14} aria-hidden="true" />
            All buildings
            <ChevronDown size={13} aria-hidden="true" />
          </span>
          <button type="button" className="po-download">
            Upload Document
          </button>
        </div>

        <div className="dc-drop">
          <UploadCloud size={22} aria-hidden="true" />
          <p className="dc-drop-text">
            Drag and drop compliance certificates here, or{" "}
            <button type="button" className="dc-browse">
              browse files
            </button>
          </p>
          <small className="dc-drop-hint">Supports PDF, PNG, JPG up to 15MB each</small>
        </div>

        <div className="dc-filters">
          {filters.map((f) => (
            <button type="button" className="dc-filter" key={f}>
              {f}
              <ChevronDown size={13} aria-hidden="true" />
            </button>
          ))}
        </div>

        <section className="cl-panel" aria-label="Compliance documents">
          <div className="cl-table-wrap">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>DOCUMENT NAME</th>
                  <th>PROPERTY</th>
                  <th>TYPE</th>
                  <th>UPLOAD DATE</th>
                  <th>EXPIRY DATE</th>
                  <th>LINKED PPM</th>
                  <th>TAGS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.name}>
                    <td className="cl-name dc-doc-name">{doc.name}</td>
                    <td className="al-details">{doc.property}</td>
                    <td className="al-details">{doc.type}</td>
                    <td className="rp-created">{doc.uploaded}</td>
                    <td>
                      <span className={`dc-expiry ${doc.expiryTone}`}>{doc.expiry}</span>
                    </td>
                    <td className="al-details">{doc.ppm}</td>
                    <td>
                      <span className="eq-cat">{doc.tag}</span>
                    </td>
                    <td>
                      <div className="cl-row-actions">
                        <button type="button" className="cl-icon-btn" aria-label={`View ${doc.name}`}>
                          <Eye size={15} aria-hidden="true" />
                        </button>
                        <button type="button" className="cl-icon-btn" aria-label={`Download ${doc.name}`}>
                          <Download size={15} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="cl-icon-btn dc-del"
                          aria-label={`Delete ${doc.name}`}
                          onClick={() => setPending(doc)}
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
            <small>Showing 1-8 of 64 documents</small>
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
            aria-labelledby="dc-del-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cp-modal-head">
              <span className="cp-modal-icon" aria-hidden="true">
                <AlertTriangle size={26} />
              </span>
              <h2 className="cp-modal-title" id="dc-del-title">
                Delete Document
              </h2>
            </div>
            <p className="cp-modal-text">
              Are you sure you want to delete {pending.name}?
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
