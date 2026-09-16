import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShieldCheck,
  Wrench,
  Building2,
  BarChart3,
  ScrollText,
  Settings as SettingsIcon,
  CreditCard,
  Users,
  User,
  Bell,
  Stethoscope,
  Plus,
  Pencil,
  FileText,

} from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Kearly | Settings" },
      {
        name: "description",
        content: "Manage your Kearly profile, system notification preferences, team credentials and billing details.",
      },
      { property: "og:title", content: "Kearly | Settings" },
      {
        property: "og:description",
        content: "Manage your Kearly profile, system notification preferences, team credentials and billing details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
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
  { label: "Team", icon: Users, to: "/team" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Billing", icon: CreditCard, to: "/settings" as const },
];

const sections = [
  { label: "Profile", icon: User },
  { label: "Notifications", icon: Bell },
  { label: "Teams", icon: Users },
  { label: "Billing", icon: CreditCard },
] as const;

type Section = (typeof sections)[number]["label"];

const contractors = [
  { name: "John Davis", company: "Apex Gas & Heating Ltd", active: true, tickets: 4, documents: 3 },
  { name: "Sarah Jenkins", company: "Metro Electrical Services", active: true, tickets: 2, documents: 4 },
  { name: "Robert Vance", company: "Vance Refrigeration", active: false, tickets: 0, documents: 2 },
  { name: "Clara Oswald", company: "L8 Water Safety Pros", active: true, tickets: 5, documents: 3 },
  { name: "Liam Neeson", company: "Guardian Security Systems", active: true, tickets: 1, documents: 5 },
  { name: "Michael Scott", company: "Scranton Paper Fire Alarms", active: false, tickets: 0, documents: 1 },
];

function SettingsPage() {
  const [digest, setDigest] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [sms, setSms] = useState(true);
  const [section, setSection] = useState<Section>("Profile");
  const [teamTab, setTeamTab] = useState<"External Labour" | "Internal">("External Labour");


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
          {governanceNav.map(({ label, icon: Icon, to }) => (
            <Link key={label} to={to} className="po-nav-item">
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="po-sidebar-foot">
          <Link to="/settings" className="po-nav-item se-settings-active">
            <SettingsIcon size={17} aria-hidden="true" />
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
        <header className="se-head">
          <h1 className="po-title">Settings</h1>
          <p className="po-subtitle">Manage your profile, system notification preferences, and team credentials</p>
        </header>

        <div className="se-layout">
          <nav className="se-side" role="tablist" aria-label="Settings sections">
            {sections.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={section === label}
                className={`se-side-item ${section === label ? "is-active" : ""}`}
                onClick={() => setSection(label)}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <section className="se-panel" aria-label={`${section} settings`}>
            {section === "Profile" && (
              <>
                <h2 className="se-panel-title">Profile Information</h2>
                <p className="se-panel-sub">Update your personal details and system-wide visibility settings</p>

                <div className="se-photo-row">
                  <span className="se-photo" aria-hidden="true">
                    AR
                  </span>
                  <div className="se-photo-actions">
                    <div className="se-photo-buttons">
                      <button type="button" className="se-primary">
                        Upload New Photo
                      </button>
                      <button type="button" className="se-ghost">
                        Remove
                      </button>
                    </div>
                    <small className="se-hint">JPG, GIF or PNG. Max size of 800K</small>
                  </div>
                </div>

                <div className="se-fields">
                  <div className="se-field">
                    <label htmlFor="se-name">Full Name</label>
                    <input id="se-name" type="text" defaultValue="Alex Rowe" />
                  </div>
                  <div className="se-field">
                    <label htmlFor="se-email">Email Address</label>
                    <input id="se-email" type="email" defaultValue="alex.rowe@kearlycompliance.com" />
                  </div>
                  <div className="se-field">
                    <label htmlFor="se-phone">Phone Number</label>
                    <input id="se-phone" type="tel" defaultValue="+44 7700 900077" />
                  </div>
                  <div className="se-field">
                    <label htmlFor="se-role">Job Title / Role</label>
                    <input id="se-role" type="text" defaultValue="Portfolio Compliance Administrator" />
                  </div>
                </div>

                <div className="se-foot">
                  <button type="button" className="se-primary">
                    Save Global Changes
                  </button>
                </div>
              </>
            )}

            {section === "Notifications" && (
              <>
                <h2 className="se-panel-title">Notification Preferences</h2>
                <p className="se-panel-sub">
                  Configure how and when you receive compliance alerts and system reports
                </p>

                <p className="se-group-label">SYSTEM ALERT PREFERENCES</p>
                <div className="se-toggle-row">
                  <div className="se-toggle-text">
                    <p className="se-toggle-title">Weekly Compliance Digest</p>
                    <p className="se-toggle-sub">
                      Receive a summary of all pending audits and complete tasks every Monday morning
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={digest}
                    aria-label="Weekly Compliance Digest"
                    className={`se-switch ${digest ? "is-on" : ""}`}
                    onClick={() => setDigest(!digest)}
                  >
                    <span className="se-switch-knob" aria-hidden="true" />
                  </button>
                </div>
                <div className="se-toggle-row">
                  <div className="se-toggle-text">
                    <p className="se-toggle-title">Upcoming Audits &amp; PPM Reminders</p>
                    <p className="se-toggle-sub">
                      Get notified 30 days prior to a scheduled compliance event expiration
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={reminders}
                    aria-label="Upcoming Audits and PPM Reminders"
                    className={`se-switch ${reminders ? "is-on" : ""}`}
                    onClick={() => setReminders(!reminders)}
                  >
                    <span className="se-switch-knob" aria-hidden="true" />
                  </button>
                </div>

                <p className="se-group-label">EMERGENCY ALERTS &amp; CRITICAL FAILURES</p>
                <div className="se-toggle-row">
                  <div className="se-toggle-text">
                    <p className="se-toggle-title">Direct SMS Alerts</p>
                    <p className="se-toggle-sub">
                      Send high-priority SMS messages immediately upon a failed safety inspection
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={sms}
                    aria-label="Direct SMS Alerts"
                    className={`se-switch ${sms ? "is-on" : ""}`}
                    onClick={() => setSms(!sms)}
                  >
                    <span className="se-switch-knob" aria-hidden="true" />
                  </button>
                </div>

                <p className="se-group-label">DELIVERY FREQUENCY</p>
                <div className="se-field se-field-wide">
                  <label htmlFor="se-frequency">Customize Email Frequency</label>
                  <select id="se-frequency" defaultValue="daily">
                    <option value="instant">Instant</option>
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Digest</option>
                    <option value="monthly">Monthly Summary</option>
                  </select>
                </div>

                <div className="se-foot se-foot-divided">
                  <button type="button" className="se-primary">
                    Save Global Changes
                  </button>
                </div>
              </>
            )}

            {section === "Teams" && (
              <>
                <div className="se-team-head">
                  <div className="se-team-tabs" role="tablist" aria-label="Team type">
                    {(["External Labour", "Internal"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={teamTab === tab}
                        className={`se-team-tab ${teamTab === tab ? "is-active" : ""}`}
                        onClick={() => setTeamTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {teamTab === "External Labour" ? (
                    <button type="button" className="se-primary se-team-add">
                      <Plus size={15} aria-hidden="true" />
                      Add Contractor
                    </button>
                  ) : (
                    <div className="se-team-right">
                      <span className="se-team-count-title">Internal Team</span>
                      <span className="se-team-count">{internalTeam.length} members</span>
                      <Link to="/team" className="se-primary se-team-add">
                        <Plus size={15} aria-hidden="true" />
                        Send Invite
                      </Link>
                    </div>
                  )}

                </div>

                {teamTab === "External Labour" ? (
                  <div className="cl-table-wrap">
                    <table className="cl-table">
                      <thead>
                        <tr>
                          <th>NAME</th>
                          <th>COMPANY</th>
                          <th>STATUS</th>
                          <th>ASSIGNED TICKETS</th>
                          <th>DOCUMENTS</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contractors.map((c) => (
                          <tr key={c.name}>
                            <td className="cl-name">{c.name}</td>
                            <td className="al-details">{c.company}</td>
                            <td>
                              <span className={`dc-expiry ${c.active ? "tone-green" : "tone-muted"}`}>
                                {c.active ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="al-details">{c.tickets} active tickets</td>
                            <td>
                              <span className="tr-cert">
                                <FileText size={14} aria-hidden="true" />
                                {c.documents} Verified
                              </span>
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
                  </div>
                ) : (
                  <div className="cl-table-wrap">
                    <table className="cl-table">
                      <thead>
                        <tr>
                          <th>NAME</th>
                          <th>EMAIL</th>
                          <th>ROLE / PERMISSIONS</th>
                          <th>STATUS</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {internalTeam.map((member) => (
                          <tr key={member.email}>
                            <td className="cl-name">{member.name}</td>
                            <td className="al-details se-team-email">{member.email}</td>
                            <td className="al-details">{member.role}</td>
                            <td>
                              <span className={`dc-expiry ${member.active ? "tone-green" : "tone-muted"}`}>
                                {member.active ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td>
                              <div className="cl-row-actions">
                                <button type="button" className="cl-icon-btn" aria-label={`Edit ${member.name}`}>
                                  <Pencil size={15} aria-hidden="true" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                )}
              </>
            )}


            {section === "Billing" && (
              <>
                <h2 className="se-panel-title">Billing</h2>
                <p className="se-panel-sub">Your current plan, payment method and invoice history</p>

                <div className="se-plan">
                  <div>
                    <strong>Portfolio Plan</strong>
                    <small>6 buildings · billed annually · renews 01 Jan 2025</small>
                  </div>
                  <span className="se-plan-price">£249 / mo</span>
                </div>

                <div className="se-fields">
                  <div className="se-field">
                    <label htmlFor="se-card">Card on File</label>
                    <input id="se-card" type="text" defaultValue="Visa ending 4242" />
                  </div>
                  <div className="se-field">
                    <label htmlFor="se-billing-email">Billing Email</label>
                    <input id="se-billing-email" type="email" defaultValue="finance@kearlycompliance.com" />
                  </div>
                </div>

                <div className="se-foot">
                  <button type="button" className="se-primary">
                    Update Billing
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
