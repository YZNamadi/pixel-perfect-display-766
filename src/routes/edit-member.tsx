import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutDashboard, ShieldCheck, Wrench, Building2, BarChart3, ScrollText, Settings, CreditCard, Users, Stethoscope, FileText } from "lucide-react";

export const Route = createFileRoute("/edit-member")({
  head: () => ({
    meta: [
      { title: "Kearly | Edit Team Member" },
      { name: "description", content: "Update contractor details, verify compliance status, and manage task assignments." },
      { property: "og:title", content: "Kearly | Edit Team Member" },
      { property: "og:description", content: "Update contractor details, verify compliance status, and manage task assignments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EditMemberPage,
});

const overviewNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Equipment", icon: Stethoscope, to: "/equipment" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const, badge: "2" },
  { label: "Buildings", icon: Building2, to: "/assets" as const },
];
const governanceNav = [
  { label: "Reports", icon: BarChart3, to: "/reports" as const },
  { label: "Team", icon: Users, to: "/team-members" as const, active: true },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Billing", icon: CreditCard, to: "/settings" as const },
];
const taskList = [
  "Gas Safety Inspections & Annual Certification",
  "Water Hygiene & L8 Legionella Temperature checks",
  "Electrical Safety Testing (Fixed Wire PAT Testing)",
];

function EditMemberPage() {
  const [tasks, setTasks] = useState([true, true, false]);
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
              <Icon size={17} aria-hidden="true" /><span>{label}</span>
              {badge ? <span className="po-nav-badge">{badge}</span> : null}
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
          <div className="po-user">
            <span className="po-user-avatar" aria-hidden="true">AR</span>
            <span className="po-user-text"><span className="po-user-name">Alex Rowe</span><span className="po-user-role">Portfolio admin</span></span>
          </div>
        </div>
      </aside>

      <main className="po-main">
        <nav className="em-crumbs" aria-label="Breadcrumb">
          <Link to="/team-members">Team</Link><span>/</span><span className="em-crumb-current">Edit Team Member</span>
        </nav>
        <h1 className="po-title">Edit Team Member</h1>
        <p className="po-subtitle">Update contractor details, verify compliance status, and manage active task assignments.</p>

        <div className="em-layout">
          <div className="em-col">
            <section className="em-card">
              <div className="em-person">
                <span className="em-avatar" aria-hidden="true">JD</span>
                <div><p className="em-name">John Davis</p><p className="em-muted">Apex Gas &amp; Heating Ltd</p></div>
              </div>
              <p className="em-group">Personal Details</p>
              <p className="em-muted em-group-sub">Read-only member information</p>
              <div className="em-grid">
                <label className="em-field">Full Name<input className="em-input" readOnly value="John Davis" /></label>
                <label className="em-field">Company<input className="em-input" readOnly value="Apex Gas & Heating Ltd" /></label>
                <label className="em-field">Contact Phone<input className="em-input" readOnly value="+44 7911 123456" /></label>
                <label className="em-field">Email Address<input className="em-input" readOnly value="j.davis@apexgas.co.uk" /></label>
              </div>
              <p className="em-group">Member Management Settings</p>
              <p className="em-muted em-group-sub">Editable settings for this team member</p>
              <div className="em-grid">
                <label className="em-field">Primary Service Role
                  <select className="em-input em-edit" defaultValue="gas">
                    <option value="gas">Gas &amp; Heating Engineer</option>
                    <option value="elec">Electrical Engineer</option>
                    <option value="water">Water Hygiene Specialist</option>
                    <option value="fire">Fire Safety Technician</option>
                  </select>
                </label>
                <label className="em-field">Work Zone Authorization
                  <select className="em-input em-edit" defaultValue="clinical">
                    <option value="clinical">Outpatient &amp; Clinical Areas</option>
                    <option value="plant">Plant Rooms Only</option>
                    <option value="all">All Areas</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="em-card">
              <h2 className="em-h2">Authorized Compliance Tasks</h2>
              <p className="em-muted em-group-sub">Safety categories this team member is certified to execute and log</p>
              {taskList.map((t, i) => (
                <label key={t} className="em-check">
                  <input type="checkbox" checked={tasks[i]} onChange={() => setTasks(tasks.map((v, j) => (j === i ? !v : v)))} />
                  {t}
                </label>
              ))}
            </section>
          </div>

          <div className="em-col">
            <section className="em-card">
              <h2 className="em-h2">Account &amp; Safety Status</h2>
              <label className="em-field">Operational Status
                <select className="em-input em-edit em-status" defaultValue="active">
                  <option value="active">Active Contractor</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </label>
              <label className="em-field">Active Tickets Limit<input className="em-input em-edit" defaultValue="4 Active Tickets Assigned" /></label>
              <div className="em-field">Verified Safety Documents
                <span className="em-input em-edit em-docs"><FileText size={14} aria-hidden="true" />3 Verified / Up to date</span>
              </div>
            </section>
            <section className="em-card">
              <h2 className="em-h2">System Metadata</h2>
              <div className="em-meta"><span>Last login:</span><span>Today at 08:14</span></div>
              <div className="em-meta"><span>Contract joined:</span><span>12 May 2024</span></div>
            </section>
            <Link to="/team-members" className="em-save">Save Changes</Link>
            <Link to="/team-members" className="em-cancel">Cancel</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
