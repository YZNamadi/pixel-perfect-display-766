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

function SettingsPage() {
  const [section, setSection] = useState<Section>("Profile");

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
                <p className="se-panel-sub">Choose how and when Kearly alerts you about compliance activity</p>

                <div className="se-fields">
                  <div className="se-field">
                    <label htmlFor="se-task-alerts">Task Reminders</label>
                    <select id="se-task-alerts" defaultValue="both">
                      <option value="email">Email</option>
                      <option value="inapp">In-app only</option>
                      <option value="both">Email and in-app</option>
                      <option value="off">Turn off</option>
                    </select>
                  </div>
                  <div className="se-field">
                    <label htmlFor="se-notice">Advance Notice</label>
                    <select id="se-notice" defaultValue="7">
                      <option value="1">1 day before</option>
                      <option value="3">3 days before</option>
                      <option value="7">7 days before</option>
                      <option value="14">14 days before</option>
                    </select>
                  </div>
                  <div className="se-field">
                    <label htmlFor="se-digest">Weekly Digest</label>
                    <select id="se-digest" defaultValue="monday">
                      <option value="monday">Every Monday</option>
                      <option value="friday">Every Friday</option>
                      <option value="off">Turn off</option>
                    </select>
                  </div>
                  <div className="se-field">
                    <label htmlFor="se-overdue">Overdue Escalation</label>
                    <select id="se-overdue" defaultValue="manager">
                      <option value="manager">Notify facility manager</option>
                      <option value="admin">Notify portfolio admin</option>
                      <option value="off">No escalation</option>
                    </select>
                  </div>
                </div>

                <div className="se-foot">
                  <button type="button" className="se-primary">
                    Save Preferences
                  </button>
                </div>
              </>
            )}

            {section === "Teams" && (
              <>
                <h2 className="se-panel-title">Team Credentials</h2>
                <p className="se-panel-sub">Review who has access to your portfolio and their permission level</p>

                <ul className="se-team">
                  {[
                    { name: "Alex Rowe", email: "alex.rowe@kearlycompliance.com", role: "Portfolio admin" },
                    { name: "Sarah Jones", email: "sarah.jones@riverside.nhs.uk", role: "Facility Manager" },
                    { name: "Michael Finch", email: "michael.finch@riverside.nhs.uk", role: "Engineer" },
                    { name: "James Carter", email: "james.carter@riverside.nhs.uk", role: "Viewer" },
                  ].map((member) => (
                    <li key={member.email} className="se-team-row">
                      <span className="se-team-avatar" aria-hidden="true">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </span>
                      <span className="se-team-text">
                        <strong>{member.name}</strong>
                        <small>{member.email}</small>
                      </span>
                      <span className="se-team-role">{member.role}</span>
                    </li>
                  ))}
                </ul>

                <div className="se-foot">
                  <Link to="/team" className="se-primary">
                    Invite Team Member
                  </Link>
                </div>
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
