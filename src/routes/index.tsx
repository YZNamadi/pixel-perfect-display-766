import { createFileRoute, Link } from "@tanstack/react-router";

import { KearlyLogo } from "@/components/kearly-logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kearly | Welcome" },
      {
        name: "description",
        content: "Automate operations, safety checks, and site compliance reporting with Kearly.",
      },
      { property: "og:title", content: "Kearly | Welcome" },
      {
        property: "og:description",
        content: "Automate operations, safety checks, and site compliance reporting with Kearly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="hp-page">
      <header className="hp-brand">
        <KearlyLogo className="hp-logo" />
        <span className="hp-brand-name">Kearly</span>
      </header>

      <section className="hp-hero" aria-labelledby="welcome-heading">
        <h1 id="welcome-heading" className="hp-title">
          Welcome to Kearly
        </h1>
        <p className="hp-subtitle">
          Automate operations, schedule safety checks, and simplify site compliance reports in
          real-time.
        </p>
        <div className="hp-actions">
          <Link className="hp-primary" to="/signup">
            Get Started
          </Link>
          <Link className="hp-secondary" to="/login">
            Learn more
          </Link>
        </div>
      </section>
    </main>
  );
}
