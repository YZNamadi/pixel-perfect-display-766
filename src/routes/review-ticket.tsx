import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Plus, User } from "lucide-react";

export const Route = createFileRoute("/review-ticket")({
  head: () => ({
    meta: [
      { title: "Review Ticket #4821 | Kearly Repairs" },
      {
        name: "description",
        content:
          "Review repair ticket #4821 — communal heating failure at Riverside Court — with activity history and ticket meta details.",
      },
      { property: "og:title", content: "Review Ticket #4821 | Kearly Repairs" },
      {
        property: "og:description",
        content:
          "Review repair ticket #4821 — communal heating failure at Riverside Court — with activity history and ticket meta details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewTicketPage,
});

const meta = [
  { label: "Site", value: "Riverside Court" },
  { label: "Priority", value: "P1", strong: true },
  { label: "Status", value: "Open", strong: true },
  { label: "Assigned To", value: "Michael Finch", strong: true },
  { label: "Created", value: "Today, 08:30", strong: true },
  { label: "SLA Deadline", value: "3h remaining", strong: true },
];

const activity = [
  { title: "Site visit scheduled", time: "Today, 10:00" },
  { title: "Assigned to Michael Finch", time: "Today, 08:35" },
  { title: "Ticket created by Sarah Jones", time: "Today, 08:30" },
];

function ReviewTicketPage() {
  return (
    <div className="tv-page">
      <header className="tv-topbar">
        <div className="tv-topbar-left">
          <Link to="/repairs" className="tv-back" aria-label="Back to tickets">
            <ArrowLeft size={18} aria-hidden="true" />
          </Link>
          <nav className="tv-crumbs" aria-label="Breadcrumb">
            <Link to="/repairs" className="tv-crumb-link">
              Tickets
            </Link>
            <span className="tv-crumb-sep" aria-hidden="true">
              /
            </span>
            <span className="tv-crumb-current">#4821</span>
          </nav>
        </div>
        <div className="tv-topbar-actions">
          <button type="button" className="tv-btn-secondary">
            <Plus size={14} aria-hidden="true" />Add Note
          </button>
          <button type="button" className="tv-btn-secondary">
            <User size={14} aria-hidden="true" />Reassign
          </button>
          <button type="button" className="tv-btn-reject">Reject</button>
          <button type="button" className="tv-btn-approve">Approve</button>
        </div>
      </header>

      <main className="tv-content">
        <div className="tv-left">
          <section className="tv-card tv-header-card" aria-labelledby="tv-ticket-title">
            <div className="tv-badges-row">
              <span className="tv-ticket-id">#4821</span>
              <span className="tv-badge tv-badge-red">P1 Priority</span>
              <span className="tv-badge tv-badge-green">Open Status</span>
            </div>
            <h1 className="tv-title" id="tv-ticket-title">
              Communal heating failure
            </h1>
            <div className="tv-assignee-row">
              <span className="tv-avatar" aria-hidden="true">
                MF
              </span>
              <span className="tv-assignee-label">Assigned to</span>
              <span className="tv-assignee-name">Michael Finch</span>
            </div>
          </section>

          <section className="tv-card" aria-labelledby="tv-description-title">
            <h2 className="tv-section-label" id="tv-description-title">
              Description
            </h2>
            <p className="tv-description">
              Residents on floors 3&ndash;5 have reported a complete loss of heating since yesterday
              evening. Initial assessment suggests the communal boiler unit may require inspection
              and potential part replacement. Access to the plant room has been arranged with the
              site manager.
            </p>
          </section>

          <section className="tv-card" aria-labelledby="tv-activity-title">
            <h2 className="tv-section-label" id="tv-activity-title">
              Activity
            </h2>
            <div className="tv-timeline">
              {activity.map((item, index) => (
                <article
                  className="tv-timeline-item"
                  key={item.title}
                  data-last={index === activity.length - 1 ? "true" : undefined}
                >
                  <div className="tv-timeline-connector" aria-hidden="true">
                    <span className="tv-timeline-dot" />
                    <span className="tv-timeline-line" />
                  </div>
                  <div className="tv-timeline-content">
                    <p className="tv-timeline-title">{item.title}</p>
                    <p className="tv-timeline-time">{item.time}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="tv-right">
          <section className="tv-card" aria-labelledby="tv-meta-title">
            <h2 className="tv-section-label tv-meta-title" id="tv-meta-title">
              Ticket Meta Details
            </h2>
            <dl className="tv-meta-list">
              {meta.map((row) => (
                <div className="tv-meta-row" key={row.label}>
                  <dt className="tv-meta-label">{row.label}</dt>
                  <dd className={`tv-meta-value ${row.strong ? "is-strong" : ""}`}>{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </main>
    </div>
  );
}
