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
  { label: "Team", icon: Users, to: "/team-members" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Billing", icon: CreditCard, to: "/settings" as const },
];

const sections = [
  { label: "Profile", icon: User },
  { label: "Notifications", icon: Bell },
  { label: "Billing", icon: CreditCard },
] as const;


type Section = (typeof sections)[number]["label"];

function SettingsPage() {
  const [digest, setDigest] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [sms, setSms] = useState(true);
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
          <p className="po-subtitle">Manage your profile, system notification preferences and billing details</p>
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

            {section === "Billing" && (
              <>
                <h2 className="se-panel-title">Billing &amp; Subscription Plan</h2>
                <p className="se-panel-sub">
                  View current licenses, active add-ons, invoice history, and manage payment methods
                </p>

                <div className="se-plan-card">
                  <div>
                    <p className="se-plan-head">
                      <strong>Professional Plan</strong>
                      <span className="dc-expiry tone-green">Active Plan</span>
                    </p>
                    <p className="se-plan-desc">All-in-one compliance platform for commercial property portfolios.</p>
                    <p className="se-plan-renew">
                      Renews automatically on <strong>Jan 1, 2027</strong>
                    </p>
                  </div>
                  <div className="se-plan-cost">
                    <span className="se-plan-amount">
                      £249 <small>/ month</small>
                    </span>
                    <small>Billed annually (recurring)</small>
                  </div>
                </div>

                <div className="se-pay-card">
                  <span className="se-group-label">PAYMENT METHOD</span>
                  <div className="se-pay-row">
                    <span className="se-pay-brand" aria-hidden="true">
                      VISA
                    </span>
                    <span className="se-pay-text">
                      <strong>Visa Ending in •••• 4242</strong>
                      <small>Expiry 12/28</small>
                    </span>
                    <button type="button" className="cp-modal-cancel se-pay-update">
                      Update Details
                    </button>
                  </div>
                </div>

                <span className="se-group-label se-modules-label">ACTIVE MODULES &amp; SUBSCRIPTIONS</span>
                <div className="cl-table-wrap">
                  <table className="cl-table">
                    <thead>
                      <tr>
                        <th>Module / Add-on</th>
                        <th>Cost Description</th>
                        <th>Billing Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Compliance Core Module", cost: "Included in Professional Plan" },
                        { name: "Repairs Tracking Add-on", cost: "£49 / month" },
                        { name: "Document Vault Storage (Extra 10GB)", cost: "£19 / month" },
                      ].map((mod) => (
                        <tr key={mod.name}>
                          <td className="cl-name">{mod.name}</td>
                          <td className="al-details">{mod.cost}</td>
                          <td className="rp-muted">Jan 1, 2027</td>
                          <td>
                            <span className="dc-expiry tone-green">Active</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="se-billing-foot">
                  <p className="se-plan-renew">
                    Need custom options? <strong>Contact Enterprise Sales</strong>
                  </p>
                  <button type="button" className="se-primary">
                    Upgrade Subscription Plan
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
