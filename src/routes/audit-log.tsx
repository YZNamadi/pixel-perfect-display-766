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
  Calendar,
  ChevronDown,
  Eye,
  BadgeCheck,
  X,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";

export const Route = createFileRoute("/audit-log")({
  head: () => ({
    meta: [
      { title: "Kearly | System Audit Log" },
      {
        name: "description",
        content:
          "Comprehensive platform compliance history: every task, status change, contractor assignment and security escalation across your portfolio.",
      },
      { property: "og:title", content: "Kearly | System Audit Log" },
      {
        property: "og:description",
        content:
          "Comprehensive platform compliance history: every task, status change, contractor assignment and security escalation across your portfolio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuditLogPage,
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
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const, active: true },
  { label: "Billing", icon: CreditCard, to: "/settings" as const },
];

type Event = {
  id: string;
  time: string;
  user: string;
  action: string;
  details: string;
  entity: string;
  pending?: boolean;
};

const events: Event[] = [
  {
    id: "e1",
    time: "02 Jul 2024, 09:12",
    user: "Sarah Jones",
    action: "Task Created",
    details: "Compliance task Fire Risk Assessment",
    entity: "",
    pending: true,
  },
  {
    id: "e2",
    time: "02 Jul 2024, 08:32",
    user: "Alex Rowe",
    action: "Status Updated",
    details: "Repair ticket #4821 from Open to In Progress",
    entity: "Riverside Court",
  },
  {
    id: "e3",
    time: "01 Jul 2024, 16:45",
    user: "Alex Rowe",
    action: "Site Added",
    details: "Riverside Court facility added",
    entity: "Riverside Court",
  },
  {
    id: "e4",
    time: "01 Jul 2024, 12:00",
    user: "System",
    action: "Report Generated",
    details: "Monthly compliance report generated",
    entity: "Portfolio Overview",
  },
  {
    id: "e5",
    time: "30 Jun 2024, 15:21",
    user: "Michael Finch",
    action: "Contractor Assigned",
    details: "Lift inspection assigned to contractor David Vance",
    entity: "Elmwood Court",
  },
  {
    id: "e6",
    time: "29 Jun 2024, 10:30",
    user: "Sarah Jones",
    action: "Task Completed",
    details: "Monthly Emergency Lighting Test approved",
    entity: "Northgate House",
  },
  {
    id: "e7",
    time: "28 Jun 2024, 09:15",
    user: "System",
    action: "SLA Escalation",
    details: "Breach escalation alert dispatched for electrical EICR",
    entity: "Victoria Wharf",
  },
  {
    id: "e8",
    time: "27 Jun 2024, 14:02",
    user: "Alex Rowe",
    action: "User Invited",
    details: "Teammate James Carter added",
    entity: "Victoria Wharf",
  },
];

function AuditLogPage() {
  const [deleteEvent, setDeleteEvent] = useState<string | null>(null);

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
            <h1 className="po-title">System Audit Log</h1>
            <p className="po-subtitle">Comprehensive platform compliance history</p>
          </div>
          <div className="po-topbar-actions">
            <div className="po-search">
              <Search size={15} aria-hidden="true" />
              <input type="search" placeholder="Search..." aria-label="Search audit events" />
            </div>
            <span className="po-chip">Jul 2024</span>
            <span className="po-chip">
              <Calendar size={14} aria-hidden="true" />
              All buildings
              <ChevronDown size={13} aria-hidden="true" />
            </span>
            <button type="button" className="po-download">
              Export CSV
            </button>
          </div>
        </header>

        <div className="rp-filters">
          <button type="button" className="rp-filter">
            User: All Users
            <ChevronDown size={13} aria-hidden="true" />
          </button>
          <button type="button" className="rp-filter">
            Action Type: All Actions
            <ChevronDown size={13} aria-hidden="true" />
          </button>
        </div>

        <section className="cl-panel" aria-label="Audit events">
          <div className="cl-table-wrap">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>TIMESTAMP</th>
                  <th>USER</th>
                  <th>ACTION</th>
                  <th>DETAILS</th>
                  <th>ENTITY AFFECTED</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e.id}>
                    <td className="rp-created">{e.time}</td>
                    <td className="cl-name">{e.user}</td>
                    <td className="cl-name">{e.action}</td>
                    <td className="al-details">{e.details}</td>
                    <td className="cl-name">{e.entity}</td>
                    <td>
                      {e.pending ? (
                        <button type="button" className="rp-btn tone-blue">
                          <BadgeCheck size={13} aria-hidden="true" />
                          Review
                        </button>
                      ) : (
                        <button type="button" className="rp-btn">
                          <Eye size={13} aria-hidden="true" />
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cl-foot">
            <small>Showing 1-8 of 142 events</small>
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

      {deleteEvent && (
        <div className="cp-overlay" role="presentation" onClick={() => setDeleteEvent(null)}>
          <div
            className="cp-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="al-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cp-modal-head">
              <span className="cp-modal-icon" aria-hidden="true">
                <AlertTriangle size={26} />
              </span>
              <h2 className="cp-modal-title" id="al-modal-title">
                Delete Event
              </h2>
            </div>
            <p className="cp-modal-text">
              Are you sure you want to delete the audit event from {deleteEvent}?
              <br />
              This action cannot be undone.
            </p>
            <div className="cp-modal-actions">
              <button type="button" className="cp-modal-cancel" onClick={() => setDeleteEvent(null)}>
                Cancel
              </button>
              <button type="button" className="cp-modal-delete" onClick={() => setDeleteEvent(null)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
