import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Building2, Check, Clock, Info, Lightbulb, MapPin } from "lucide-react";

import { KearlyLogo } from "@/components/kearly-logo";
import { toast } from "sonner";

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
  { title: "Emergency Lighting Check — Riverside Medical Centre", site: "Riverside Medical Centre (London)", desc: "Annual regulatory testing of emergency exit path lighting, backup batteries, and signage across all floors.", tags: ["Electrical", "PAT Testing"], loc: "London, SW1A 1AA", time: "2-3 days", name: "Emergency Lighting Check", full: "Comprehensive regulatory inspection of emergency backup power systems, exit lighting luminaire testing, panel checks, and safety certificate filing. Task will cover the complete clinic, first-floor wards, and secondary emergency pathways.", equip: ["PAT Tester", "Ladder", "PPE"], posted: "12 May 2025", deadline: "24 May 2025", duration: "2-3 Days", address: "Riverside Clinic, 12 Parkside Road, London SW1A 1AA" },
  { title: "Fire Alarm Inspection & Test", site: "St. Jude Family Practice (Kent)", desc: "Routine quarterly inspection, panel validation, and smoke sensor check across the practice.", tags: ["Fire Safety", "Commercial"], loc: "Kent, ME14 1XX", time: "1 day", name: "Fire Alarm Inspection & Test", full: "Routine quarterly inspection of the fire alarm panel, call points and smoke sensors, with full logbook update and certificate filing for the practice.", equip: ["Test Smoke Kit", "Ladder", "PPE"], posted: "14 May 2025", deadline: "28 May 2025", duration: "1 Day", address: "St. Jude Family Practice, 4 Week Street, Maidstone ME14 1XX" },
];

function ContractorJobsPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<(typeof jobs)[number] | null>(null);
  const [quote, setQuote] = useState<(typeof jobs)[number] | null>(null);
  useEffect(() => {
    if (!open && !quote) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setQuote(null); } };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, quote]);
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
                  <button type="button" className="cj-view" onClick={() => setOpen(j)}>View Details</button>
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

      {open && (
        <div className="jm-overlay" onClick={() => setOpen(null)}>
          <div className="jm-card" role="dialog" aria-modal="true" aria-labelledby="jm-title" onClick={(e) => e.stopPropagation()}>
            <div className="jm-band"><Lightbulb size={26} strokeWidth={1.6} aria-hidden="true" /></div>
            <div className="jm-body">
              <h2 id="jm-title" className="jm-title">{open.name}</h2>
              <p className="jm-site">{open.site}</p>
              <p className="jm-desc">{open.full}</p>
              <p className="jm-label">Equipment needed</p>
              <div className="jm-tags">{open.equip.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="jm-info">
                <div className="jm-row">
                  <div><span>Date posted</span><strong>{open.posted}</strong></div>
                  <div className="jm-mid"><span>Deadline</span><strong>{open.deadline}</strong></div>
                  <div className="jm-end"><span>Duration</span><strong>{open.duration}</strong></div>
                </div>
                <div className="jm-loc"><span>Location</span><strong>{open.address}</strong></div>
              </div>
              <div className="jm-actions">
                <button type="button" className="jm-close" onClick={() => setOpen(null)}>Close</button>
                <button type="button" className="jm-submit" onClick={() => { setQuote(open); setOpen(null); }}>Submit Quote</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {quote && (
        <div className="jm-overlay" onClick={() => setQuote(null)}>
          <form className="qm-card" role="dialog" aria-modal="true" aria-labelledby="qm-title" onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => { e.preventDefault(); toast.success("Quotation submitted"); setQuote(null); }}>
            <div className="qm-head">
              <h2 id="qm-title">Submit Your Quote</h2>
              <p>For: {quote.title}</p>
            </div>
            <div className="qm-body">
              <label className="qm-label" htmlFor="qm-amount">Your Quote (£) <span>*</span></label>
              <div className="qm-money">
                <input id="qm-amount" required inputMode="decimal" pattern="[0-9,]+(\.[0-9]{1,2})?" placeholder="e.g. 1,250.00" />
                <span>GBP</span>
              </div>
              <label className="qm-label" htmlFor="qm-time">Estimated Timeline <span>*</span></label>
              <select id="qm-time" required defaultValue="" className="qm-input">
                <option value="" disabled>Select estimated timeframe</option>
                <option>Within 1 day</option>
                <option>2-3 days</option>
                <option>Within 1 week</option>
                <option>1-2 weeks</option>
                <option>More than 2 weeks</option>
              </select>
              <label className="qm-label" htmlFor="qm-notes">Notes (Optional)</label>
              <textarea id="qm-notes" className="qm-input qm-text" placeholder="Add any notes about your quote, availability, or approach..." />
              <div className="qm-actions">
                <button type="button" className="qm-cancel" onClick={() => setQuote(null)}>Cancel</button>
                <button type="submit" className="qm-submit">Submit Quotation</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
