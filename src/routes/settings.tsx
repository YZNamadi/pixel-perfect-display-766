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
} from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Kearly | Account Settings" },
      {
        name: "description",
        content: "Manage your Kearly profile, notification preferences and account security in one place.",
      },
      { property: "og:title", content: "Kearly | Account Settings" },
      {
        property: "og:description",
        content: "Manage your Kearly profile, notification preferences and account security in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const },
  { label: "Assets", icon: Building2, to: "/assets" as const },
  { label: "Reports", icon: BarChart3, to: "/reports" as const },
  { label: "Audit Log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Settings", icon: SettingsIcon, to: "/settings" as const, active: true },
];

const tabs = ["Profile", "Notifications", "Security"] as const;

function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Profile");

  return (
    <div className="db-shell">
      <aside className="db-sidebar">
        <Link to="/dashboard" className="db-logo" aria-label="Kearly">
          <svg width="28" height="28" viewBox="0 0 100 100" aria-hidden="true">
            <rect x="5" y="5" width="40" height="40" rx="10" fill="#4A7C6F" />
            <path d="M 55 5 L 95 5 L 95 45 Q 75 45 55 25 Z" fill="#4A7C6F" />
            <rect x="5" y="55" width="40" height="40" rx="10" fill="#4A7C6F" />
            <path d="M 55 55 Q 75 55 95 75 L 95 95 L 55 95 Z" fill="#4A7C6F" />
          </svg>
          <span className="db-logo-text">
            <span className="db-logo-name">KEARLY</span>
            <span className="db-logo-tag">Compliance. Automated &amp; Simplified.</span>
          </span>
        </Link>

        <nav className="db-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon, to, active }) => (
            <Link key={label} to={to} className={`db-nav-item ${active ? "is-active" : ""}`}>
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
              {active && <span className="db-nav-bar" aria-hidden="true" />}
            </Link>
          ))}
        </nav>

        <div className="db-user">
          <span className="db-avatar" aria-hidden="true">
            JD
          </span>
          <span className="db-user-meta">
            <strong>Jane Doe</strong>
            <small>Practice Admin</small>
          </span>
        </div>
      </aside>

      <main className="db-main">
        <header className="am-head">
          <h1 className="db-title">Settings</h1>
          <p className="db-subtitle">Manage your profile, alerts and account security</p>
        </header>

        <div className="cp-tabs" role="tablist" aria-label="Settings sections">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              className={`cp-tab ${tab === item ? "is-active" : ""}`}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {tab === "Profile" && (
          <section className="at-card" aria-label="Profile settings">
            <h2 className="at-card-title">Profile Details</h2>
            <div className="at-grid">
              <div className="at-field">
                <label htmlFor="st-name">Full Name</label>
                <input id="st-name" type="text" defaultValue="Jane Doe" />
              </div>
              <div className="at-field">
                <label htmlFor="st-email">Work Email</label>
                <input id="st-email" type="email" defaultValue="jane.doe@kearly.co" />
              </div>
              <div className="at-field">
                <label htmlFor="st-phone">Phone Number</label>
                <input id="st-phone" type="tel" defaultValue="+44 20 7946 0812" />
              </div>
              <div className="at-field">
                <label htmlFor="st-role">Role</label>
                <select id="st-role" defaultValue="admin">
                  <option value="admin">Practice Admin</option>
                  <option value="manager">Facility Manager</option>
                  <option value="engineer">Engineer</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div className="at-field">
                <label htmlFor="st-practice">Practice Name</label>
                <input id="st-practice" type="text" defaultValue="Oakfield Medical Group" />
              </div>
              <div className="at-field">
                <label htmlFor="st-timezone">Time Zone</label>
                <select id="st-timezone" defaultValue="london">
                  <option value="london">Europe/London</option>
                  <option value="dublin">Europe/Dublin</option>
                  <option value="utc">UTC</option>
                </select>
              </div>
            </div>
            <div className="at-actions">
              <Link to="/dashboard" className="at-cancel">
                Cancel
              </Link>
              <button type="button" className="at-next">
                Save Changes
              </button>
            </div>
          </section>
        )}

        {tab === "Notifications" && (
          <section className="at-card" aria-label="Notification settings">
            <h2 className="at-card-title">Notification Preferences</h2>
            <div className="at-grid">
              <div className="at-field">
                <label htmlFor="st-task-alerts">Task Reminders</label>
                <select id="st-task-alerts" defaultValue="email">
                  <option value="email">Email</option>
                  <option value="inapp">In-app only</option>
                  <option value="both">Email and in-app</option>
                  <option value="off">Turn off</option>
                </select>
              </div>
              <div className="at-field">
                <label htmlFor="st-notice">Advance Notice</label>
                <select id="st-notice" defaultValue="7">
                  <option value="1">1 day before</option>
                  <option value="3">3 days before</option>
                  <option value="7">7 days before</option>
                  <option value="14">14 days before</option>
                </select>
              </div>
              <div className="at-field">
                <label htmlFor="st-digest">Weekly Digest</label>
                <select id="st-digest" defaultValue="monday">
                  <option value="monday">Every Monday</option>
                  <option value="friday">Every Friday</option>
                  <option value="off">Turn off</option>
                </select>
              </div>
              <div className="at-field">
                <label htmlFor="st-overdue">Overdue Escalation</label>
                <select id="st-overdue" defaultValue="manager">
                  <option value="manager">Notify facility manager</option>
                  <option value="admin">Notify practice admin</option>
                  <option value="off">No escalation</option>
                </select>
              </div>
            </div>
            <div className="at-actions">
              <button type="button" className="at-next">
                Save Preferences
              </button>
            </div>
          </section>
        )}

        {tab === "Security" && (
          <section className="at-card" aria-label="Security settings">
            <h2 className="at-card-title">Account Security</h2>
            <div className="at-grid">
              <div className="at-field">
                <label htmlFor="st-current">Current Password</label>
                <input id="st-current" type="password" placeholder="Enter current password" />
              </div>
              <div className="at-field">
                <label htmlFor="st-new">New Password</label>
                <input id="st-new" type="password" placeholder="Enter new password" />
              </div>
              <div className="at-field">
                <label htmlFor="st-confirm">Confirm New Password</label>
                <input id="st-confirm" type="password" placeholder="Re-enter new password" />
              </div>
              <div className="at-field">
                <label htmlFor="st-2fa">Two-Factor Authentication</label>
                <select id="st-2fa" defaultValue="app">
                  <option value="app">Authenticator app</option>
                  <option value="sms">Text message</option>
                  <option value="off">Turn off</option>
                </select>
              </div>
              <div className="at-field">
                <label htmlFor="st-session">Session Timeout</label>
                <select id="st-session" defaultValue="30">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>
            </div>
            <div className="at-actions">
              <Link to="/audit-log" className="at-cancel">
                View Audit Log
              </Link>
              <button type="button" className="at-next">
                Update Security
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
