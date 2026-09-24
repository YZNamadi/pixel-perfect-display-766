import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
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
  ChevronLeft,
  ChevronDown,
  Check,
  Stethoscope,
} from "lucide-react";

export const Route = createFileRoute("/add-site")({
  head: () => ({
    meta: [
      { title: "Kearly | Add New Site" },
      { name: "description", content: "Register a new healthcare facility or outpatient centre in your Kearly compliance portfolio." },
      { property: "og:title", content: "Kearly | Add New Site" },
      { property: "og:description", content: "Register a new healthcare facility or outpatient centre in your Kearly compliance portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AddSitePage,
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

const scopeOptions = [
  "Fire Safety & Warden Drills (Statutory Requirement)",
  "Water Hygiene & Legionella Control checks",
  "Electrical Safety Regulations (MH & LVD Testing)",
  "Gas Safety Services & Annual Certificate",
  "Lifts & Lifting Gear Inspections (LOLER Regulations)",
];

const managers = ["Alex Rowe", "Maya Patel", "Daniel Kim", "Priya Nair", "Ethan Brooks", "Sofia Martinez"];
const useTypes = ["Clinical – Outpatient", "Clinical – Inpatient", "Diagnostic / Imaging", "Administrative Office", "Mixed Use"];

function AddSitePage() {
  const navigate = useNavigate();
  const [scope, setScope] = useState<boolean[]>([true, true, true, false, false]);

  return (
    <div className="po-shell">
      <aside className="po-sidebar">
        <div className="ns-logo-row">
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
          <Link to="/assets" className="ns-back" aria-label="Back to buildings">
            <ChevronLeft size={16} />
          </Link>
        </div>

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
            <span className="po-user-avatar" aria-hidden="true">AR</span>
            <span className="po-user-text">
              <span className="po-user-name">Alex Rowe</span>
              <span className="po-user-role">Portfolio admin</span>
            </span>
          </div>
        </div>
      </aside>

      <main className="po-main">
        <nav className="ns-crumbs" aria-label="Breadcrumb">
          <Link to="/assets">Buildings &amp; Sites</Link>
          <span>/</span>
          <strong>Add New Site</strong>
        </nav>
        <h1 className="ns-title">Add New Site</h1>
        <p className="ns-sub">Register a new healthcare facility or outpatient center in your compliance portfolio</p>

        <form
          className="ns-grid"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/assets" });
          }}
        >
          <div className="ns-col">
            <section className="ns-card">
              <h2 className="ns-card-title">Site Specifications</h2>
              <label className="ns-field">
                <span>Site Name</span>
                <input placeholder="e.g. St. Jude Outpatient Wing" />
              </label>
              <label className="ns-field">
                <span>Full Address</span>
                <input placeholder="Street name, suite or building number" />
              </label>
              <div className="ns-two">
                <label className="ns-field">
                  <span>City</span>
                  <input placeholder="e.g. London" />
                </label>
                <label className="ns-field">
                  <span>Postcode</span>
                  <input placeholder="e.g. W1T 1BJ" />
                </label>
              </div>
              <div className="ns-two">
                <label className="ns-field">
                  <span>Primary Use Type</span>
                  <div className="ns-select">
                    <select defaultValue="">
                      <option value="" disabled>Select clinical or office use</option>
                      {useTypes.map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <ChevronDown size={14} aria-hidden="true" />
                  </div>
                </label>
                <label className="ns-field">
                  <span>Gross Internal Area (GIA)</span>
                  <input placeholder="e.g. 4,500 m²" />
                </label>
              </div>
            </section>

            <section className="ns-card">
              <h2 className="ns-card-title">Compliance &amp; Statutory Scope</h2>
              <p className="ns-card-sub">Select all mandatory statutory safety requirements that apply to this property</p>
              <div className="ns-checks">
                {scopeOptions.map((opt, i) => (
                  <button
                    type="button"
                    key={opt}
                    className="ns-check"
                    role="checkbox"
                    aria-checked={scope[i]}
                    onClick={() => setScope((s) => s.map((v, j) => (j === i ? !v : v)))}
                  >
                    <span className={`ns-box ${scope[i] ? "is-on" : ""}`}>{scope[i] && <Check size={12} strokeWidth={3} />}</span>
                    {opt}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="ns-col">
            <section className="ns-card">
              <h2 className="ns-card-title">Responsible Contacts</h2>
              <label className="ns-field">
                <span>Assigned Site Manager</span>
                <div className="ns-select">
                  <select defaultValue="">
                    <option value="" disabled>Select from team members</option>
                    {managers.map((m) => <option key={m}>{m}</option>)}
                  </select>
                  <ChevronDown size={14} aria-hidden="true" />
                </div>
              </label>
              <label className="ns-field">
                <span>Contact Phone</span>
                <input type="tel" placeholder="e.g. +44 20 7946 0192" />
              </label>
              <label className="ns-field">
                <span>Contact Email</span>
                <input type="email" placeholder="e.g. manager@nhs.net" />
              </label>
            </section>

            <section className="ns-card">
              <h2 className="ns-card-title">Asset Lifecycle</h2>
              <label className="ns-field">
                <span>Year Constructed</span>
                <input inputMode="numeric" placeholder="e.g. 1998" />
              </label>
              <label className="ns-field">
                <span>Last Major Refurbishment</span>
                <input inputMode="numeric" placeholder="e.g. 2019 (Optional)" />
              </label>
            </section>

            <button type="submit" className="ns-primary">Register &amp; Add Site</button>
            <Link to="/assets" className="ns-cancel">Cancel</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
