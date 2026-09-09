import { createFileRoute } from "@tanstack/react-router";

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
    <main className="welcome-page">
      <div className="welcome-shape welcome-shape-one" aria-hidden="true" />
      <div className="welcome-shape welcome-shape-two" aria-hidden="true" />
      <div className="welcome-shape welcome-shape-three" aria-hidden="true" />

      <section className="welcome-content" aria-labelledby="welcome-heading">
        <header className="brand-header">
          <div className="logo-mark" role="img" aria-label="Kearly logo">
            <span className="logo-petal logo-petal-one" />
            <span className="logo-petal logo-petal-two" />
            <span className="logo-petal logo-petal-three" />
            <span className="logo-petal logo-petal-four" />
          </div>
          <p className="brand-name">Kearly</p>
          <p className="brand-tagline">Compliance automated &amp; simplified.</p>
        </header>

        <div className="welcome-card">
          <h1 id="welcome-heading">Welcome to Kearly</h1>
          <p className="welcome-description">
            Automate operations, schedule safety checks, and simplify site compliance reports in real-time.
          </p>
          <a className="welcome-action" href="#get-started">
            Get Started
          </a>
          <div className="welcome-divider" />
          <p className="login-prompt">
            Already have an account?{" "}
            <a className="login-link" href="#log-in">
              Log in
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
