import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { User } from "lucide-react";

export const Route = createFileRoute("/google-sign-in")({
  head: () => ({
    meta: [
      { title: "Kearly | Choose an Account" },
      {
        name: "description",
        content:
          "Choose a Google account to continue to Kearly Compliance and access your workspace, templates and team tools.",
      },
      { property: "og:title", content: "Kearly | Choose an Account" },
      {
        property: "og:description",
        content:
          "Choose a Google account to continue to Kearly Compliance and access your workspace, templates and team tools.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GoogleSignInPage,
});

const trustedBy = ["NHS", "Bupa", "Spire", "UCLH", "Circle"];

const accounts = [
  { initials: "AR", name: "Alex Rowe", email: "alex@kearly.com", color: "#1D3A8A" },
  { initials: "DK", name: "Dev Team (Kearly)", email: "dev@kearly.com", color: "#0E7C42" },
  { initials: "SM", name: "Sarah Myers", email: "sarah.m@gmail.com", color: "#9333EA" },
];

function GoogleSignInPage() {
  const navigate = useNavigate();
  const go = () => void navigate({ to: "/dashboard" });

  return (
    <main className="gs-page">
      <section className="gs-panel" aria-label="Kearly">
        <div className="gs-panel-decor" aria-hidden="true">
          <span className="su-circle su-circle-one" />
          <span className="su-circle su-circle-two" />
          <span className="su-circle su-circle-three" />
        </div>
        <div className="su-panel-content">
          <h2 className="su-panel-title">The simplest way to manage your compliance</h2>
          <p className="su-panel-text">
            Sign in to access your workspace, compliance templates, and team tools in one secure
            place.
          </p>
          <p className="su-trusted-label">Trusted by leading healthcare facilities</p>
          <ul className="su-trusted-list">
            {trustedBy.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gs-side">
        <div className="gs-brand">
          <span className="lg-logo" role="img" aria-label="Kearly logo">
            <span className="lg-petal lg-petal-one" />
            <span className="lg-petal lg-petal-two" />
            <span className="lg-petal lg-petal-three" />
            <span className="lg-petal lg-petal-four" />
          </span>
          <span className="gs-brand-text">
            <span className="gs-brand-name">KEARLY</span>
            <span className="gs-brand-tag">Compliance. Automated &amp; Simplified.</span>
          </span>
        </div>

        <div className="gs-card">
          <h1 className="gs-title">Choose an account</h1>
          <p className="gs-sub">
            to continue to <strong>Kearly Compliance</strong>
          </p>

          <ul className="gs-list">
            {accounts.map((account) => (
              <li key={account.email}>
                <button type="button" className="gs-account" onClick={go}>
                  <span className="gs-avatar" style={{ background: account.color }}>
                    {account.initials}
                  </span>
                  <span className="gs-account-text">
                    <span className="gs-account-name">{account.name}</span>
                    <span className="gs-account-email">{account.email}</span>
                  </span>
                </button>
              </li>
            ))}
            <li>
              <button type="button" className="gs-account gs-account-other" onClick={go}>
                <span className="gs-avatar gs-avatar-other">
                  <User size={16} aria-hidden="true" />
                </span>
                <span className="gs-account-name">Use another account</span>
              </button>
            </li>
          </ul>

          <p className="gs-legal">
            To continue, Google will share your name, email address, language preference, and
            profile picture with Kearly. See our <a href="/login">Privacy Policy</a> and{" "}
            <a href="/login">Terms of Service</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
