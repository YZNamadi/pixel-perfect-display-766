import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [
      { title: "Kearly | Data Preview" },
      {
        name: "description",
        content: "Review the first few rows of your mapped compliance data before importing into Kearly.",
      },
      { property: "og:title", content: "Kearly | Data Preview" },
      {
        property: "og:description",
        content: "Review the first few rows of your mapped compliance data before importing into Kearly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PreviewPage,
});

const steps = ["Upload Sheet", "Data Mapping", "Data  Preview"];

const columns = ["Company Name", "SAAS ID", "Order ID", "Order Date", "Company Email"];

const rows = [
  ["Acme Corp", "SAS-4821", "ORD-10234", "2024-08-15", "info@acmecorp.c..."],
  ["Globex IT", "SAS-9921", "ORD-10235", "2024-08-16", "support@globex...."],
  ["Initech", "SAS-1044", "ORD-10236", "2024-08-16", "contact@initech...."],
  ["Umbrella Co", "SAS-7721", "ORD-10237", "2024-08-17", "hr@umbrella.org"],
  ["Hooli", "SAS-0412", "ORD-10238", "2024-08-18", "admin@hooli.xyz"],
];

function PreviewPage() {
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

      <section className="ud-card dp-card" aria-labelledby="dp-heading">
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
          <Link to="/mapping" className="ud-back">
            Back
          </Link>
        </header>

        <nav className="ud-stepper" aria-label="Import progress">
          {steps.map((step, index) => (
            <div className="ud-step-wrap" key={step}>
              <div className={`ud-step ${index < 2 ? "is-done" : ""} ${index === 2 ? "is-active" : ""}`}>
                <span className="ud-step-circle">{index < 2 ? "✓" : index + 1}</span>
                <span className="ud-step-label">{step}</span>
              </div>
              {index < steps.length - 1 && <span className="ud-step-line" />}
            </div>
          ))}
        </nav>

        <h1 id="dp-heading" className="ud-heading">
          Data Preview
        </h1>
        <p className="ud-sub">Review the first few rows of your mapped data before importing.</p>

        <div className="dp-table-wrap">
          <table className="dp-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[1]}>
                  {row.map((cell, index) => (
                    <td key={`${row[1]}-${index}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link className="ud-continue dp-done" to="/team">
          Done
        </Link>
      </section>
    </main>
  );
}
