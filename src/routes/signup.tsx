import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Kearly | Create Your Compliance Account" },
      {
        name: "description",
        content:
          "Create a Kearly account to automate compliance tasks, site certificates, and audit evidence for your facilities.",
      },
      { property: "og:title", content: "Kearly | Create Your Compliance Account" },
      {
        property: "og:description",
        content:
          "Create a Kearly account to automate compliance tasks, site certificates, and audit evidence for your facilities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <main className="si-page">
      <div className="si-decor si-decor-phone" aria-hidden="true" />
      <div className="si-decor si-decor-shield" aria-hidden="true" />
      <div className="si-decor si-decor-leaf" aria-hidden="true" />

      <section className="si-card" aria-labelledby="su-heading">
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
          <Link className="si-tab" role="tab" aria-selected={false} to="/login">
            Sign In
          </Link>
          <span className="si-tab is-active" role="tab" aria-selected={true}>
            Sign Up
          </span>
        </div>

        <h1 id="su-heading" className="si-heading">
          Get started with smarter <strong>compliance</strong> management
        </h1>

        <form
          className="si-form"
          onSubmit={(event) => {
            event.preventDefault();
            navigate({ to: "/verify" });
          }}
        >
          <div className="si-name-row">
            <div>
              <label className="si-visually-hidden" htmlFor="su-first">
                First name
              </label>
              <input
                id="su-first"
                className="si-input"
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
            </div>
            <div>
              <label className="si-visually-hidden" htmlFor="su-last">
                Last name
              </label>
              <input
                id="su-last"
                className="si-input"
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
              />
            </div>
          </div>

          <label className="si-visually-hidden" htmlFor="su-email">
            Work email
          </label>
          <input
            id="su-email"
            className="si-input"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label className="si-visually-hidden" htmlFor="su-password">
            Password
          </label>
          <input
            id="su-password"
            className="si-input"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <label className="si-visually-hidden" htmlFor="su-confirm">
            Confirm password
          </label>
          <input
            id="su-confirm"
            className="si-input"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />

          <button type="submit" className="si-submit">
            Create Account
          </button>
        </form>

        <div className="si-or">
          <span>Or</span>
        </div>

        <button type="button" className="si-google">
          Sign up with Google
          <span className="si-google-mark" aria-hidden="true">
            G
          </span>
        </button>
      </section>
    </main>
  );
}
