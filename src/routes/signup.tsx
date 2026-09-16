import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Kearly | Create Your Account" },
      {
        name: "description",
        content:
          "Create your Kearly account to automate compliance, safety checks and site operations.",
      },
      { property: "og:title", content: "Kearly | Create Your Account" },
      {
        property: "og:description",
        content:
          "Create your Kearly account to automate compliance, safety checks and site operations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

const trustedBy = ["NHS", "Bupa", "Spire", "UCLH", "Circle"];

function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="su-page">
      <section className="su-panel" aria-label="Kearly">
        <div className="su-panel-decor" aria-hidden="true">
          <span className="su-circle su-circle-one" />
          <span className="su-circle su-circle-two" />
          <span className="su-circle su-circle-three" />
        </div>
        <div className="su-panel-content">
          <h2 className="su-panel-title">Compliance. Automated &amp; Simplified.</h2>
          <p className="su-panel-text">
            Enter your credentials to access your account and streamline your compliance workflows.
          </p>
          <p className="su-trusted-label">Trusted by leading healthcare facilities</p>
          <ul className="su-trusted-list">
            {trustedBy.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="su-form-side">
        <form
          className="su-form"
          onSubmit={(event) => {
            event.preventDefault();
            void navigate({ to: "/verify" });
          }}
        >
          <h1 className="su-title">Create your account</h1>
          <p className="su-subtitle">Welcome! Please fill in your details to get started.</p>

          <label className="su-label" htmlFor="su-email">
            Work Email <span className="su-required">*</span>
          </label>
          <div className="su-field">
            <input
              className="su-input"
              id="su-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="alex@kearly.com"
              required
            />
            <Mail className="su-field-icon" size={16} aria-hidden="true" />
          </div>

          <label className="su-label" htmlFor="su-password">
            Password <span className="su-required">*</span>
          </label>
          <div className="su-field">
            <input
              className="su-input"
              id="su-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="••••••••"
              required
            />
            <button
              className="su-field-button"
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye size={16} aria-hidden="true" /> : <EyeOff size={16} aria-hidden="true" />}
            </button>
          </div>

          <button className="su-submit" type="submit">
            Create Account
          </button>

          <div className="su-divider">
            <span>OR</span>
          </div>

          <Link className="su-google" to="/google-sign-in">
            <span className="su-google-mark" aria-hidden="true">
              G
            </span>
            Sign up with Google
          </Link>

          <p className="su-footer">
            Already have an account?{" "}
            <Link className="su-footer-link" to="/login">
              Log in
            </Link>
          </p>
        </form>
        <p className="su-copyright">© Kearly 2025</p>
      </section>
    </main>
  );
}
