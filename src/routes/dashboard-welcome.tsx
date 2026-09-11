import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard-welcome")({
  head: () => ({
    meta: [
      { title: "Kearly | Welcome To Kearly" },
      {
        name: "description",
        content:
          "Your centralized platform to manage estates, compliance, contractors and operations - all in one place.",
      },
      { property: "og:title", content: "Kearly | Welcome To Kearly" },
      {
        property: "og:description",
        content:
          "Your centralized platform to manage estates, compliance, contractors and operations - all in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardWelcomePage,
});

function DashboardWelcomePage() {
  return (
    <main className="dw-page">
      <header className="dw-topnav">
        <div className="dw-nav-logo" role="img" aria-label="Kearly logo">
          <span className="dw-nav-petal dw-petal-one" />
          <span className="dw-nav-petal dw-petal-two" />
          <span className="dw-nav-petal dw-petal-three" />
          <span className="dw-nav-petal dw-petal-four" />
        </div>
        <div className="dw-brand-text">
          <p className="dw-brand-name">Kearly</p>
          <p className="dw-brand-tagline">Compliance. Automated &amp; Simplified.</p>
        </div>
      </header>

      <section className="dw-content" aria-labelledby="dw-heading">
        <div className="dw-hero-card">
          <div className="dw-hero-logo" role="img" aria-label="Kearly emblem">
            <span className="dw-hero-petal dw-petal-one" />
            <span className="dw-hero-petal dw-petal-two" />
            <span className="dw-hero-petal dw-petal-three" />
            <span className="dw-hero-petal dw-petal-four" />
          </div>
        </div>

        <h1 id="dw-heading" className="dw-heading">
          Welcome To Kearly
        </h1>
        <p className="dw-subtitle">
          Your centralized platform to manage Estates, compliance, contractors and operations - all in
          one place.
        </p>

        <div className="dw-actions">
          <Link className="dw-secondary" to="/">
            <span className="dw-icon" aria-hidden="true">
              📖
            </span>
            View Quick Guide
          </Link>
          <Link className="dw-primary" to="/">
            <span className="dw-icon" aria-hidden="true">
              ↗
            </span>
            Continue
          </Link>
        </div>
      </section>
    </main>
  );
}
