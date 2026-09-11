import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/facility")({
  head: () => ({
    meta: [
      { title: "Kearly | Set Up Facility Profile" },
      {
        name: "description",
        content:
          "Set up your Kearly facility profile with practice details, region, and contact information.",
      },
      { property: "og:title", content: "Kearly | Set Up Facility Profile" },
      {
        property: "og:description",
        content:
          "Set up your Kearly facility profile with practice details, region, and contact information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FacilityPage,
});

function KearlyLogo() {
  return (
    <div className="fp-logo" aria-label="Kearly">
      <svg width="24" height="24" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="5" y="5" width="40" height="40" rx="10" fill="#4A7C6F" />
        <path d="M 55 5 L 95 5 L 95 45 Q 75 45 55 25 Z" fill="#4A7C6F" />
        <rect x="5" y="55" width="40" height="40" rx="10" fill="#4A7C6F" />
        <path d="M 55 55 Q 75 55 95 75 L 95 95 L 55 95 Z" fill="#4A7C6F" />
      </svg>
      <div className="fp-logo-text">
        <span className="fp-logo-name">KEARLY</span>
        <span className="fp-logo-tag">Compliance. Automated &amp; Simplified.</span>
      </div>
    </div>
  );
}

const chevronBg =
  "url(\"data:image/svg+xml;utf8,<svg fill='%23718096' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\")";

function FacilityPage() {
  return (
    <main className="fp-page">
      <div className="fp-deco fp-deco-phone" aria-hidden="true">
        🌿
      </div>
      <div className="fp-deco fp-deco-shield" aria-hidden="true">
        🛡️
      </div>
      <div className="fp-deco fp-deco-leaf" aria-hidden="true">
        🍃
      </div>

      <section className="fp-card" aria-labelledby="fp-heading">
        <KearlyLogo />
        <h1 id="fp-heading" className="fp-heading">
          Let&apos;s set up your facility profile
        </h1>

        <form className="fp-form" onSubmit={(event) => event.preventDefault()}>
          <input id="practice-name" name="practiceName" className="fp-input" placeholder="Enter Practice Name" aria-label="Practice Name" />
          <input id="nhs-code" name="nhsCode" className="fp-input" placeholder="Enter NHS Practice Code" aria-label="NHS Practice Code" />

          <div className="fp-row">
            <select
              id="region-select"
              name="region"
              className="fp-input fp-select"
              defaultValue=""
              aria-label="Region"
              style={{ backgroundImage: chevronBg }}
            >
              <option value="" disabled>
                Region
              </option>
              <option value="england">England</option>
              <option value="scotland">Scotland</option>
              <option value="wales">Wales</option>
              <option value="northern-ireland">Northern Ireland</option>
            </select>
            <select
              id="staff-size-select"
              name="staffSize"
              className="fp-input fp-select"
              defaultValue=""
              aria-label="Staff Size"
              style={{ backgroundImage: chevronBg }}
            >
              <option value="" disabled>
                Select Staff Size
              </option>
              <option value="1-10">1–10</option>
              <option value="11-25">11–25</option>
              <option value="26-50">26–50</option>
              <option value="51-100">51–100</option>
              <option value="100+">100+</option>
            </select>
          </div>

          <span className="fp-section-label">Contact</span>

          <div className="fp-row">
            <input id="address-line" name="addressLine" className="fp-input" placeholder="Address Line" aria-label="Address Line" />
            <input id="phone-number" name="phoneNumber" type="tel" className="fp-input" placeholder="Phone Number" aria-label="Phone Number" />
          </div>

          <div className="fp-size-group">
            <input id="facility-size" name="facilitySize" type="number" min="0" className="fp-size-input" placeholder="Facility Size (sqm)" aria-label="Facility Size in square meters" />
            <span className="fp-size-suffix">SQM</span>
          </div>

          <Link to="/site" className="fp-save">
            Save
          </Link>
        </form>
      </section>
    </main>
  );
}
