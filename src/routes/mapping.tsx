import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/mapping")({
  head: () => ({
    meta: [
      { title: "Kearly | Data Mapping" },
      {
        name: "description",
        content: "Match the columns from your uploaded spreadsheet to the matching Kearly fields.",
      },
      { property: "og:title", content: "Kearly | Data Mapping" },
      {
        property: "og:description",
        content: "Match the columns from your uploaded spreadsheet to the matching Kearly fields.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MappingPage,
});

const steps = ["Upload Sheet", "Data Mapping", "Data  Preview"];

const fields = ["Company Name", "SAAS ID", "Order ID", "Order Date", "Company Email"];

const chevronBg =
  "url(\"data:image/svg+xml;utf8,<svg fill='none' stroke='%234A5568' stroke-width='2' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M6 9l6 6 6-6'/></svg>\")";

function MappingPage() {
  return (
    <main className="ud-page">
      <div className="ud-deco ud-deco-phone" aria-hidden="true">
        📱
      </div>
      <div className="ud-deco ud-deco-shield" aria-hidden="true">
        🛡️
      </div>
      <div className="ud-deco ud-deco-leaf" aria-hidden="true">
        🌿
      </div>

      <section className="ud-card dm-card" aria-labelledby="dm-heading">
        <header className="ud-card-head">
          <div className="ud-logo" aria-label="Kearly">
            <svg width="22" height="22" viewBox="0 0 100 100" aria-hidden="true">
              <rect x="5" y="5" width="40" height="40" rx="10" fill="#4A7C6F" />
              <path d="M 55 5 L 95 5 L 95 45 Q 75 45 55 25 Z" fill="#4A7C6F" />
              <rect x="5" y="55" width="40" height="40" rx="10" fill="#4A7C6F" />
              <path d="M 55 55 Q 75 55 95 75 L 95 95 L 55 95 Z" fill="#4A7C6F" />
            </svg>
            <span className="ud-logo-text">
              <span className="ud-logo-name">KEARLY</span>
              <span className="ud-logo-tag">Compliance. Automated &amp; Simplified.</span>
            </span>
          </div>
          <Link to="/import" className="ud-back">
            Back
          </Link>
        </header>

        <nav className="ud-stepper" aria-label="Import progress">
          {steps.map((step, index) => (
            <div className="ud-step-wrap" key={step}>
              <div className={`ud-step ${index === 0 ? "is-done" : ""} ${index === 1 ? "is-active" : ""}`}>
                <span className="ud-step-circle">{index === 0 ? "✓" : index + 1}</span>
                <span className="ud-step-label">{step}</span>
              </div>
              {index < steps.length - 1 && <span className="ud-step-line" />}
            </div>
          ))}
        </nav>

        <h1 id="dm-heading" className="ud-heading">
          Data Mapping
        </h1>
        <p className="ud-sub">Match the columns from your uploaded file to the corresponding fields.</p>

        <div className="dm-table">
          <div className="dm-file">
            <span className="dm-file-icon" aria-hidden="true">
              <svg width="22" height="24" viewBox="0 0 22 24">
                <rect x="0" y="2" width="22" height="20" rx="3" fill="#1D7044" />
                <text x="11" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
                  X
                </text>
              </svg>
            </span>
            <span className="dm-file-meta">
              <strong>Conpliance_Data_August_2026.xlsx</strong>
              <small>18.4MB &nbsp;·&nbsp; 24 Sheets</small>
            </span>
          </div>

          {fields.map((field) => (
            <div className="dm-row" key={field}>
              <span className="dm-row-label">{field}</span>
              <select
                className="dm-select"
                defaultValue={field}
                aria-label={`Map ${field}`}
                style={{ backgroundImage: chevronBg }}
              >
                <option value={field}>{field}</option>
                {fields
                  .filter((option) => option !== field)
                  .map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                <option value="ignore">Do not import</option>
              </select>
            </div>
          ))}
        </div>

        <Link className="ud-continue" to="/preview">
          Continue
        </Link>

      </section>
    </main>
  );
}
