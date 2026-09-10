import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/facility")({
  head: () => ({
    meta: [
      { title: "Kearly | Create Facility Profile" },
      {
        name: "description",
        content:
          "Create your Kearly facility profile with the details needed to configure your compliance templates.",
      },
      { property: "og:title", content: "Kearly | Create Facility Profile" },
      {
        property: "og:description",
        content:
          "Create your Kearly facility profile with the details needed to configure your compliance templates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FacilityPage,
});

const steps = ["Account", "Facility", "Site", "Import", "Team", "Complete"];

function FacilityPage() {
  return (
    <main className="facility-page">
      <div className="facility-watermark" aria-hidden="true">
        <span className="facility-watermark-petal facility-wm-one" />
        <span className="facility-watermark-petal facility-wm-two" />
        <span className="facility-watermark-petal facility-wm-three" />
        <span className="facility-watermark-petal facility-wm-four" />
      </div>

      <div className="facility-content">
        <nav className="facility-stepper" aria-label="Setup progress">
          {steps.map((step, index) => {
            const isCompleted = index === 0;
            const isActive = index === 1;

            return (
              <div className="facility-step-wrap" key={step}>
                <div
                  className={`facility-step ${isCompleted ? "is-completed" : ""} ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span className="facility-step-circle">
                    {isCompleted ? "✓" : index + 1}
                  </span>
                  <span className="facility-step-label">{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <span className={`facility-step-line ${index === 0 ? "is-completed" : ""}`} />
                )}
              </div>
            );
          })}
        </nav>

        <section className="facility-panel" aria-labelledby="facility-heading">
          <header className="facility-header">
            <h1 id="facility-heading">Create your facility profile</h1>
            <p>
              Provide basic information about your medical practice, clinic, or facility setup to configure templates.
            </p>
          </header>

          <form className="facility-form" onSubmit={(event) => event.preventDefault()}>
            <div className="facility-field">
              <label htmlFor="practice-name">
                Practice Name <span aria-hidden="true">*</span>
              </label>
              <input id="practice-name" name="practiceName" required placeholder="e.g. Riverside Medical Centre" />
            </div>

            <div className="facility-field">
              <label htmlFor="nhs-code">NHS Practice Code (If applicable)</label>
              <input id="nhs-code" name="nhsCode" placeholder="e.g. Y01234" />
            </div>

            <div className="facility-field">
              <label htmlFor="region">Region</label>
              <select id="region" name="region" defaultValue="">
                <option value="" disabled>
                  Select your region
                </option>
                <option value="england">England</option>
                <option value="scotland">Scotland</option>
                <option value="wales">Wales</option>
                <option value="northern-ireland">Northern Ireland</option>
              </select>
            </div>

            <div className="facility-field-grid">
              <div className="facility-field">
                <label htmlFor="staff-count">Operating Size / Staff Count</label>
                <input id="staff-count" name="staffCount" type="number" min="0" placeholder="e.g. 24" />
              </div>
              <div className="facility-field">
                <label htmlFor="facility-size">Facility Size (sqm)</label>
                <input id="facility-size" name="facilitySize" type="number" min="0" placeholder="e.g. 450" />
              </div>
            </div>

            <div className="facility-field-grid">
              <div className="facility-field">
                <label htmlFor="contact-email">
                  Contact Email <span aria-hidden="true">*</span>
                </label>
                <input id="contact-email" name="contactEmail" type="email" required placeholder="contact@practice.com" />
              </div>
              <div className="facility-field">
                <label htmlFor="contact-phone">
                  Contact Phone <span aria-hidden="true">*</span>
                </label>
                <input id="contact-phone" name="contactPhone" type="tel" required placeholder="+44 20 7946 0192" />
              </div>
            </div>

            <div className="facility-actions">
              <Link to="/site" className="facility-continue">
                Continue
              </Link>
              <Link className="facility-skip" to="/">
                Skip for now
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}