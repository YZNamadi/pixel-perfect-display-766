import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, ChevronDown } from "lucide-react";

import { KearlyLogo } from "@/components/kearly-logo";

export const Route = createFileRoute("/contractor-profile")({
  head: () => ({
    meta: [
      { title: "Kearly | Contractor Profile" },
      { name: "description", content: "Build your professional contractor profile so medical facilities can find and hire you." },
      { property: "og:title", content: "Kearly | Contractor Profile" },
      { property: "og:description", content: "Build your professional contractor profile so medical facilities can find and hire you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContractorProfilePage,
});

const trustedBy = ["NHS", "Bupa", "Spire", "UCLH", "Circle"];
const steps = ["Account", "Profile", "Certificates", "Jobs"];
const current = 1;

function ContractorProfilePage() {
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
          <h2 className="ct-panel-title ct-panel-title-wide">Build your professional profile</h2>
          <p className="ct-panel-text">Complete your profile so facilities can find and hire you for the right jobs.</p>
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
          <h1 className="su-title">Create your contractor profile</h1>
          <p className="su-subtitle">Provide your trade information, experience, and contact details to begin matching with medical facility works.</p>

          <form
            className="ct-card"
            onSubmit={(e) => { e.preventDefault(); void navigate({ to: "/dashboard" }); }}
          >
            <div className="ct-grid">
              <label className="ct-field">
                <span>Full Name <span className="su-required">*</span></span>
                <input className="su-input" placeholder="e.g. John Smith" required />
              </label>
              <label className="ct-field">
                <span>Years of Experience <span className="su-required">*</span></span>
                <input className="su-input" type="number" min={0} placeholder="e.g. 5" required />
              </label>
              <label className="ct-field">
                <span>Trade / Specialty <span className="su-required">*</span></span>
                <span className="ct-select-wrap">
                  <select className="su-input ct-select" required defaultValue="">
                    <option value="" disabled>Select your trade</option>
                    <option>Gas &amp; Heating Engineer</option>
                    <option>Water Hygiene Specialist</option>
                    <option>Electrical PAT Tester</option>
                    <option>General Maintenance Technician</option>
                    <option>Fire Safety Inspector</option>
                  </select>
                  <ChevronDown size={16} className="ct-select-icon" aria-hidden="true" />
                </span>
              </label>
              <label className="ct-field">
                <span>Phone Number <span className="su-required">*</span></span>
                <input className="su-input" type="tel" placeholder="+44 (0) 7946 0958" required />
              </label>
              <label className="ct-field ct-field-full">
                <span>Short Bio / Description</span>
                <textarea className="su-input ct-textarea" placeholder="Briefly describe your expertise, certifications, and specialties" />
              </label>
            </div>
            <div className="ct-actions">
              <button type="submit" className="ct-continue">Continue</button>
              <Link to="/dashboard" className="ct-skip">Skip for now</Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
