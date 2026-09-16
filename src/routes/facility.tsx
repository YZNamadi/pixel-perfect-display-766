import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/facility")({
  head: () => ({
    meta: [
      { title: "Kearly | Create Your Facility Profile" },
      {
        name: "description",
        content:
          "Set up your Kearly facility profile with practice details, region, size, and contact information.",
      },
      { property: "og:title", content: "Kearly | Create Your Facility Profile" },
      {
        property: "og:description",
        content:
          "Set up your Kearly facility profile with practice details, region, size, and contact information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FacilityPage,
});

const steps = [
  { label: "Site" },
  { label: "Import" },
  { label: "Team" },
  { label: "Complete" },
];

function FacilityPage() {
  return (
    <main className="fp-page">
      <section className="fp-panel" aria-label="Kearly onboarding">
        <div className="fp-panel-decor" aria-hidden="true">
          <span className="fp-circle fp-circle-one" />
          <span className="fp-circle fp-circle-two" />
          <span className="fp-circle fp-circle-three" />
        </div>
        <div className="fp-panel-content">
          <h2 className="fp-panel-title">
            The simplest way to manage your facility
          </h2>
          <p className="fp-panel-text">
            Set up your facility profile to unlock smart scheduling, compliance
            templates, and team management tools - all in one place.
          </p>
          <ul className="fp-badges">
            <li>NHS</li>
            <li>CQC</li>
            <li>GDPR</li>
            <li>ISO 27001</li>
          </ul>
        </div>
      </section>

      <section className="fp-main">
        <nav className="fp-steps" aria-label="Progress">
          <span className="fp-step fp-step-done">
            <span className="fp-step-mark fp-step-mark-done">
              <Check size={13} strokeWidth={3} aria-hidden="true" />
            </span>
            Account
          </span>
          <span className="fp-step fp-step-active" aria-current="step">
            <span className="fp-step-mark fp-step-mark-active">2</span>
            Facility
          </span>
          {steps.map((step, index) => (
            <span className="fp-step" key={step.label}>
              <span className="fp-step-mark">{index + 3}</span>
              {step.label}
            </span>
          ))}
        </nav>

        <div className="fp-body">
          <h1 className="fp-heading">Create your facility profile</h1>
          <p className="fp-sub">
            Provide basic information about your medical practice, clinic, or
            facility setup to configure templates.
          </p>

          <form className="fp-card" onSubmit={(event) => event.preventDefault()}>
            <div className="fp-field">
              <label className="fp-label" htmlFor="practice-name">
                Practice Name <span className="fp-req">*</span>
              </label>
              <input
                id="practice-name"
                name="practiceName"
                className="fp-input"
                placeholder="e.g. Riverside Medical Centre"
              />
            </div>

            <div className="fp-field">
              <label className="fp-label" htmlFor="nhs-code">
                NHS Practice Code (If applicable)
              </label>
              <input
                id="nhs-code"
                name="nhsCode"
                className="fp-input"
                placeholder="e.g. Y01234"
              />
            </div>

            <div className="fp-field">
              <label className="fp-label" htmlFor="region">
                Region
              </label>
              <select
                id="region"
                name="region"
                className="fp-input fp-select"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your region
                </option>
                <option value="england">England</option>
                <option value="scotland">Scotland</option>
                <option value="wales">Wales</option>
                <option value="northern-ireland">Northern Ireland</option>
              </select>
            </div>

            <div className="fp-grid">
              <div className="fp-field">
                <label className="fp-label" htmlFor="staff-count">
                  Operating Size / Staff Count
                </label>
                <input
                  id="staff-count"
                  name="staffCount"
                  type="number"
                  min="0"
                  className="fp-input"
                  placeholder="e.g. 24"
                />
              </div>
              <div className="fp-field">
                <label className="fp-label" htmlFor="facility-size">
                  Facility Size (sqm)
                </label>
                <input
                  id="facility-size"
                  name="facilitySize"
                  type="number"
                  min="0"
                  className="fp-input"
                  placeholder="e.g. 450"
                />
              </div>
            </div>

            <div className="fp-grid">
              <div className="fp-field">
                <label className="fp-label" htmlFor="contact-email">
                  Contact Email <span className="fp-req">*</span>
                </label>
                <input
                  id="contact-email"
                  name="contactEmail"
                  type="email"
                  className="fp-input"
                  placeholder="contact@practice.com"
                />
              </div>
              <div className="fp-field">
                <label className="fp-label" htmlFor="contact-phone">
                  Contact Phone <span className="fp-req">*</span>
                </label>
                <input
                  id="contact-phone"
                  name="contactPhone"
                  type="tel"
                  className="fp-input"
                  placeholder="+44 20 7946 0192"
                />
              </div>
            </div>

            <div className="fp-actions">
              <Link to="/site" className="fp-continue">
                Continue
              </Link>
              <Link to="/site" className="fp-skip">
                Skip for now
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
