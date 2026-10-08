import { ProductSelect } from "@/components/product-select";
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
  Users,
  Stethoscope,
  Plus,
  Pencil,
  FileText,
  X,
} from "lucide-react";

import { KearlyLogo } from "@/components/kearly-logo";

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
  { name: "Alex Rowe", company: "Kearly Operations", active: true, tickets: 12, documents: 5 },
  { name: "Maya Patel", company: "Kearly Operations", active: true, tickets: 8, documents: 4 },
  { name: "Daniel Kim", company: "Kearly Operations", active: false, tickets: 0, documents: 3 },
  { name: "Priya Nair", company: "Kearly Operations", active: true, tickets: 6, documents: 4 },
  { name: "Ethan Brooks", company: "Kearly Operations", active: true, tickets: 3, documents: 2 },
  { name: "Sofia Martinez", company: "Kearly Operations", active: false, tickets: 0, documents: 1 },
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
  const [adding, setAdding] = useState<"contractor" | "member" | null>(null);

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
             <button type="button" className="se-primary se-team-add" onClick={() => setAdding("contractor")}>
              <Plus size={15} aria-hidden="true" />
              Add Contractor
            </button>
          ) : (
             <button type="button" className="se-primary se-team-add" onClick={() => setAdding("member")}>
              <Plus size={15} aria-hidden="true" />
              Add Team Member
             </button>
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
                        <Link to="/edit-member" className="cl-icon-btn" aria-label={`Edit ${c.name}`}>
                          <Pencil size={15} aria-hidden="true" />
                        </Link>
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
                  <th>NAME</th><th>COMPANY</th><th>STATUS</th><th>ASSIGNED TICKETS</th><th>DOCUMENTS</th><th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {internalTeam.map((m) => (
                  <tr key={m.name}>
                    <td><Person name={m.name} /></td>
                    <td className="al-details">{m.company}</td>
                    <td>
                      <span className={`dc-expiry ${m.active ? "tone-green" : "tone-muted"}`}>{m.active ? "Active" : "Inactive"}</span>
                    </td>
                    <td className="al-details">{m.tickets} active tickets</td>
                    <td>
                      <span className="tr-cert"><FileText size={14} aria-hidden="true" />{m.documents} Verified</span>
                    </td>
                    <td>
                      <div className="cl-row-actions">
                        <Link to="/edit-member" className="cl-icon-btn" aria-label={`Edit ${m.name}`}>
                          <Pencil size={15} aria-hidden="true" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      {adding && <div className="cp-overlay" role="presentation" onClick={() => setAdding(null)}><form className="tr-modal" onSubmit={(event) => { event.preventDefault(); setAdding(null); }} onClick={(event) => event.stopPropagation()}><div className="tr-modal-head"><div><h2>{adding === "contractor" ? "Add Contractor" : "Add Team Member"}</h2><p>Add this person to the operational team</p></div><button type="button" className="cl-icon-btn" aria-label="Close" onClick={() => setAdding(null)}><X size={18} /></button></div><label>Full name<input required /></label><label>Email address<input type="email" required /></label>{adding === "contractor" && <label>Company<input required /></label>}<label>Primary role<ProductSelect><option>Facility Manager</option><option>Compliance Officer</option><option>Maintenance Engineer</option><option>External Contractor</option></ProductSelect></label><label>Work zone<ProductSelect><option>All buildings</option><option>Northgate House</option><option>Riverside Court</option></ProductSelect></label><div className="tr-modal-actions"><button type="button" className="cl-page" onClick={() => setAdding(null)}>Cancel</button><button type="submit" className="po-download">Add {adding === "contractor" ? "Contractor" : "Team Member"}</button></div></form></div>}
    </div>
  );
}
