import { createFileRoute, Link } from "@tanstack/react-router";
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
  Stethoscope,
  Plus,
  Pencil,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/team-members")({
  head: () => ({
    meta: [
      { title: "Kearly | Team" },
      { name: "description", content: "Manage your internal team members and external contractors and their credentials." },
      { property: "og:title", content: "Kearly | Team" },
      { property: "og:description", content: "Manage your internal team members and external contractors and their credentials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamPage,
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

const contractors = [
  { name: "John Davis", company: "Apex Gas & Heating Ltd", active: true, tickets: 4, documents: 3 },
  { name: "Sarah Jenkins", company: "Metro Electrical Services", active: true, tickets: 2, documents: 4 },
  { name: "Robert Vance", company: "Vance Refrigeration", active: false, tickets: 0, documents: 2 },
  { name: "Clara Oswald", company: "L8 Water Safety Pros", active: true, tickets: 5, documents: 3 },
  { name: "Liam Neeson", company: "Guardian Security Systems", active: true, tickets: 1, documents: 0 },
  { name: "Michael Scott", company: "Scranton Paper Fire Alarms", active: false, tickets: 0, documents: 1 },
];

const internalTeam = [
  { name: "Alex Rowe", email: "alex.rowe@kearlycompliance.com", role: "Portfolio Compliance Administrator", active: true },
  { name: "Sarah Connor", email: "s.connor@kearlycompliance.com", role: "Repairs Manager", active: true },
  { name: "Marcus Wright", email: "m.wright@kearlycompliance.com", role: "Contractor Coordinator", active: true },
  { name: "Kyle Reese", email: "k.reese@kearlycompliance.com", role: "Site Inspector", active: true },
  { name: "John Connor", email: "j.connor@kearlycompliance.com", role: "Viewer / Auditor", active: false },
];

const initials = (n: string) => n.split(" ").map((p) => p[0]).join("");

function Person({ name }: { name: string }) {
  return (
    <span className="tr-staff">
      <span className="cl-avatar" aria-hidden="true">{initials(name)}</span>
      <span className="tr-staff-name">{name}</span>
    </span>
  );
}

function TeamPage() {
  const [tab, setTab] = useState<"External Labour" | "Internal">("External Labour");

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
            <span className="po-user-avatar" aria-hidden="true">AR</span>
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
            <h1 className="po-title">Team</h1>
            <p className="po-subtitle">Manage your team members and their credentials.</p>
          </div>
        </header>

        <div className="se-team-head">
          <div className="se-team-tabs" role="tablist" aria-label="Team type">
            {(["External Labour", "Internal"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                className={`se-team-tab ${tab === t ? "is-active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          {tab === "External Labour" ? (
            <button type="button" className="se-primary se-team-add">
              <Plus size={15} aria-hidden="true" />
              Add Contractor
            </button>
          ) : (
            <Link to="/team" className="se-primary se-team-add">
              <Plus size={15} aria-hidden="true" />
              Send Invite
            </Link>
          )}
        </div>

        <div className="cl-table-wrap">
          {tab === "External Labour" ? (
            <table className="cl-table">
              <thead>
                <tr>
                  <th>NAME</th><th>COMPANY</th><th>STATUS</th><th>ASSIGNED TICKETS</th><th>DOCUMENTS</th><th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {contractors.map((c) => (
                  <tr key={c.name}>
                    <td><Person name={c.name} /></td>
                    <td className="al-details">{c.company}</td>
                    <td>
                      <span className={`dc-expiry ${c.active ? "tone-green" : "tone-muted"}`}>{c.active ? "Active" : "Inactive"}</span>
                    </td>
                    <td className="al-details">{c.tickets} active tickets</td>
                    <td>
                      <span className="tr-cert"><FileText size={14} aria-hidden="true" />{c.documents} Verified</span>
                    </td>
                    <td>
                      <div className="cl-row-actions">
                        <button type="button" className="cl-icon-btn" aria-label={`Edit ${c.name}`}>
                          <Pencil size={15} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="cl-table">
              <thead>
                <tr>
                  <th>NAME</th><th>EMAIL</th><th>ROLE / PERMISSIONS</th><th>STATUS</th><th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {internalTeam.map((m) => (
                  <tr key={m.email}>
                    <td><Person name={m.name} /></td>
                    <td className="al-details">{m.email}</td>
                    <td className="al-details">{m.role}</td>
                    <td>
                      <span className={`dc-expiry ${m.active ? "tone-green" : "tone-muted"}`}>{m.active ? "Active" : "Inactive"}</span>
                    </td>
                    <td>
                      <div className="cl-row-actions">
                        <button type="button" className="cl-icon-btn" aria-label={`Edit ${m.name}`}>
                          <Pencil size={15} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
