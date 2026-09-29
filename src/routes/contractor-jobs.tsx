import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Building2, Check, Clock, Info, MapPin } from "lucide-react";

import { KearlyLogo } from "@/components/kearly-logo";

export const Route = createFileRoute("/contractor-jobs")({
  head: () => ({
    meta: [
      { title: "Kearly | Available Job Offers" },
      { name: "description", content: "Browse job offers from healthcare facilities that match your trade on Kearly." },
      { property: "og:title", content: "Kearly | Available Job Offers" },
      { property: "og:description", content: "Browse job offers from healthcare facilities that match your trade on Kearly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContractorJobsPage,
});

const trustedBy = ["NHS", "Bupa", "Spire", "UCLH", "Circle"];
const steps = ["Account", "Profile", "Certificates", "Jobs"];
const current = 3;
const jobs = [
  { title: "Emergency Lighting Check — Riverside Medical Centre", site: "Riverside Medical Centre (London)", desc: "Annual regulatory testing of emergency exit path lighting, backup batteries, and signage across all floors.", tags: ["Electrical", "PAT Testing"], loc: "London, SW1A 1AA", time: "2-3 days" },
  { title: "Fire Alarm Inspection & Test", site: "St. Jude Family Practice (Kent)", desc: "Routine quarterly inspection, panel validation, and smoke sensor check across the practice.", tags: ["Fire Safety", "Commercial"], loc: "Kent, ME14 1XX", time: "1 day" },
];

function ContractorJobsPage() {
  const navigate = useNavigate();
  return (
    <main className="su-page ct-page">
      <section className="su-panel ct-panel" aria-label="Kearly">
        <div className="su-panel-decor" aria-hidden="true">
          <span className="ct-circle ct-circle-one" />
          <span className="ct-circle ct-circle-two" />
          <span className="ct-circle ct-circle-three" />
        </div>
        <div className="ct-logo">
          <KearlyLogo className="ct-logo-mark" />
          <span className="ct-logo-text"><span className="ct-logo-name">KEARLY</span></span>
        </div>
        <div className="ct-panel-body">
          <h2 className="ct-panel-title ct-panel-title-wide">Find work that fits your skills</h2>
          <p className="ct-panel-text">Browse job offers from facilities near you. Review details, submit quotes, and start earning.</p>
        </div>
        <div className="ct-trusted">
          <p className="ct-trusted-label">Trusted by leading healthcare operators</p>
          <ul className="ct-trusted-list">{trustedBy.map((n) => <li key={n}>{n}</li>)}</ul>
        </div>
      </section>

      <section className="su-form-side ct-form-side ct-form-side-top">
        <ol className="ct-steps" aria-label="Sign up progress">
          {steps.map((step, i) => (
            <li key={step} className={`ct-step ${i === current ? "is-active" : ""} ${i < current ? "is-done" : ""}`}>
              <span className="ct-step-num">{i < current ? <Check size={11} strokeWidth={3} aria-hidden="true" /> : i + 1}</span>
              <span>{step}</span>
              {i < steps.length - 1 && <span className="ct-step-line" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        <div className="ct-profile">
          <h1 className="su-title">Available job offers</h1>
          <p className="su-subtitle">Here are jobs offered from practices that match your trade.</p>

          <div className="ct-card">
            <ul className="cj-list">
              {jobs.map((j) => (
                <li key={j.title} className="cj-job">
                  <span className="cj-icon"><Building2 size={20} aria-hidden="true" /></span>
                  <div className="cj-body">
                    <p className="cj-title">{j.title}</p>
                    <p className="cj-site">{j.site}</p>
                    <p className="cj-desc">{j.desc}</p>
                    <div className="cj-meta">
                      {j.tags.map((t) => <span key={t} className="cj-tag">{t}</span>)}
                      <span className="cj-mi"><MapPin size={13} aria-hidden="true" />{j.loc}</span>
                      <span className="cj-mi"><Clock size={13} aria-hidden="true" />{j.time}</span>
                    </div>
                  </div>
                  <button type="button" className="cj-view">View Details</button>
                </li>
              ))}
            </ul>
            <p className="cj-info"><Info size={14} aria-hidden="true" />New jobs will appear here as facilities post them. If no jobs are available yet, you'll see them here once facilities post new work.</p>
            <div className="ct-actions">
              <button type="button" className="ct-continue" onClick={() => void navigate({ to: "/dashboard" })}>Continue to Dashboard</button>
              <Link to="/dashboard" className="ct-skip">Skip for now</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
