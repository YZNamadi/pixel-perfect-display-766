import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Kearly | Sign In to Manage Your Compliance" },
      {
        name: "description",
        content:
          "Sign in to Kearly to manage compliance tasks, site certificates, and audit evidence for your facilities.",
      },
      { property: "og:title", content: "Kearly | Sign In to Manage Your Compliance" },
      {
        property: "og:description",
        content:
          "Sign in to Kearly to manage compliance tasks, site certificates, and audit evidence for your facilities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <main className="si-page">
      <div className="si-decor si-decor-phone" aria-hidden="true" />
      <div className="si-decor si-decor-shield" aria-hidden="true" />
      <div className="si-decor si-decor-leaf" aria-hidden="true" />

      <section className="si-card" aria-labelledby="si-heading">
        <div className="si-card-logo">
          <div className="si-logo" role="img" aria-label="Kearly logo">
            <span className="si-petal si-petal-one" />
            <span className="si-petal si-petal-two" />
            <span className="si-petal si-petal-three" />
            <span className="si-petal si-petal-four" />
          </div>
          <div className="si-brand">
            <p className="si-wordmark">KEARLY</p>
            <p className="si-tagline">Compliance. Automated &amp; Simplified.</p>
          </div>
        </div>

        <div className="si-tabs" role="tablist" aria-label="Authentication">
          <span className="si-tab is-active" role="tab" aria-selected={true}>
            Sign In
          </span>
          <Link className="si-tab" role="tab" aria-selected={false} to="/signup">
            Sign Up
          </Link>
        </div>

        <h1 id="si-heading" className="si-heading">
          Sign in to manage your <strong>compliance</strong>
        </h1>

        <form
          className="si-form"
          onSubmit={(event) => {
            event.preventDefault();
            navigate({ to: "/dashboard-welcome" });
          }}
        >
          <label className="si-visually-hidden" htmlFor="si-email">
            Work email
          </label>
          <input
            id="si-email"
            className="si-input"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label className="si-visually-hidden" htmlFor="si-password">
            Password
          </label>
          <input
            id="si-password"
            className="si-input"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <div className="si-row">
            <label className="si-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              Keep me logged in
            </label>
            <a className="si-forgot" href="#forgot-password">
              Forgot Password
            </a>
          </div>

          <button type="submit" className="si-submit">
            Sign In
          </button>
        </form>

        <div className="si-or">
          <span>Or</span>
        </div>

        <button type="button" className="si-google">
          Sign in with Google
          <span className="si-google-mark" aria-hidden="true">
            G
          </span>
        </button>
      </section>
    </main>
  );
}
