import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/site")({
  head: () => ({
    meta: [
      { title: "Kearly | Continue With Site Details" },
      {
        name: "description",
        content: "Add your Kearly site details including name, address, categories and operating hours.",
      },
      { property: "og:title", content: "Kearly | Continue With Site Details" },
      {
        property: "og:description",
        content: "Add your Kearly site details including name, address, categories and operating hours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SitePage,
});

const chevronBg =
  "url(\"data:image/svg+xml;utf8,<svg fill='%234A7C6F' height='22' viewBox='0 0 24 24' width='22' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\")";

function SitePage() {
  return (
    <main className="sd-page">
      <div className="sd-deco sd-deco-phone" aria-hidden="true">
        📱
      </div>
      <div className="sd-deco sd-deco-shield" aria-hidden="true">
        🛡️
      </div>
      <div className="sd-deco sd-deco-leaf" aria-hidden="true">
        🌿
      </div>

      <section className="sd-card" aria-labelledby="sd-heading">
        <header className="sd-card-head">
          <div className="sd-logo" aria-label="Kearly">
            <svg width="22" height="22" viewBox="0 0 100 100" aria-hidden="true">
              <rect x="5" y="5" width="40" height="40" rx="10" fill="#4A7C6F" />
              <path d="M 55 5 L 95 5 L 95 45 Q 75 45 55 25 Z" fill="#4A7C6F" />
              <rect x="5" y="55" width="40" height="40" rx="10" fill="#4A7C6F" />
              <path d="M 55 55 Q 75 55 95 75 L 95 95 L 55 95 Z" fill="#4A7C6F" />
            </svg>
            <span className="sd-logo-text">
              <span className="sd-logo-name">KEARLY</span>
              <span className="sd-logo-tag">Compliance. Automated &amp; Simplified.</span>
            </span>
          </div>
          <Link to="/facility" className="sd-back">
            Back
          </Link>
        </header>

        <h1 id="sd-heading" className="sd-heading">
          Continue with site details
        </h1>

        <form className="sd-form" onSubmit={(event) => event.preventDefault()}>
          <input className="sd-input" name="siteName" placeholder="Site Name" aria-label="Site Name" />
          <input className="sd-input" name="address" placeholder="Address" aria-label="Address" />
          <input className="sd-input" name="siteCategories" placeholder="Site Categories" aria-label="Site Categories" />
          <select
            className="sd-input sd-select"
            name="operatingHours"
            defaultValue=""
            aria-label="Operating Hours"
            style={{ backgroundImage: chevronBg }}
          >
            <option value="" disabled>
              Operating Hours
            </option>
            <option value="08-18">08:00 – 18:00</option>
            <option value="09-17">09:00 – 17:00</option>
            <option value="24-7">Open 24/7</option>
          </select>

          <div className="sd-actions">
            <Link to="/import" className="sd-save">
              Save
            </Link>
            <Link to="/import" className="sd-import">
              Import Data
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
