import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { KearlyLogo } from "@/components/kearly-logo";

export const Route = createFileRoute("/contractor-signup")({
  head: () => ({
    meta: [
      { title: "Kearly | Contractor Sign Up" },
      { name: "description", content: "Create your Kearly contractor account to find work, manage certifications, and grow your business." },
      { property: "og:title", content: "Kearly | Contractor Sign Up" },
      { property: "og:description", content: "Create your Kearly contractor account to find work, manage certifications, and grow your business." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContractorSignupPage,
});

const trustedBy = ["NHS", "Bupa", "Spire", "UCLH", "Circle"];
const steps = ["Account", "Profile", "Certificates", "Jobs"];

function ContractorSignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="su-page ct-page">
      <section className="su-panel ct-panel" aria-label="Kearly">
        <div className="su-panel-decor" aria-hidden="true">
          <span className="ct-circle ct-circle-one" />
          <span className="ct-circle ct-circle-two" />
          <span className="ct-circle ct-circle-three" />
        </div>
        <div className="ct-logo">
          <KearlyLogo className="ct-logo-mark" />
          <span className="ct-logo-text">
            <span className="ct-logo-name">KEARLY</span>
            <span className="ct-logo-tag">Compliance. Automated &amp; Simplified.</span>
          </span>
        </div>
        <div className="ct-panel-body">
          <h2 className="ct-panel-title">Your skills. Your schedule. Your growth.</h2>
          <p className="ct-panel-text">Create your contractor account to find work, manage certifications, and grow your business.</p>
        </div>
        <div className="ct-trusted">
          <p className="ct-trusted-label">Trusted by leading healthcare operators</p>
          <ul className="ct-trusted-list">
            {trustedBy.map((name) => <li key={name}>{name}</li>)}
          </ul>
        </div>
      </section>

      <section className="su-form-side ct-form-side">
        <ol className="ct-steps" aria-label="Sign up progress">
          {steps.map((step, i) => (
            <li key={step} className={`ct-step ${i === 0 ? "is-active" : ""}`}>
              <span className="ct-step-num">{i + 1}</span>
              <span>{step}</span>
              {i < steps.length - 1 && <span className="ct-step-line" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        <form
          className="su-form ct-form"
          onSubmit={(event) => {
            event.preventDefault();
            void navigate({ to: "/dashboard" });
          }}
        >
          <h1 className="su-title">Create your account</h1>
          <p className="su-subtitle">Welcome! Please fill in your details to get started.</p>

          <label className="su-label" htmlFor="ct-email">Work Email <span className="su-required">*</span></label>
          <div className="su-field">
            <input className="su-input" id="ct-email" type="email" autoComplete="email" placeholder="alex@kearly.com" required />
          </div>

          <label className="su-label" htmlFor="ct-password">Password <span className="su-required">*</span></label>
          <div className="su-field">
            <input className="su-input" id="ct-password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="••••••••" required />
            <button className="su-field-button" type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <Eye size={16} aria-hidden="true" /> : <EyeOff size={16} aria-hidden="true" />}
            </button>
          </div>

          <button className="su-submit ct-submit" type="submit">Create Account</button>
          <div className="su-divider"><span>OR</span></div>
          <Link className="su-google" to="/google-sign-in">
            <span className="su-google-mark" aria-hidden="true">G</span>
            Sign up with Google
          </Link>
          <p className="su-footer">
            Already have an account? <Link className="su-footer-link ct-link" to="/login">Log In</Link>
          </p>
        </form>
        <p className="su-copyright">© Kearly 2025</p>
      </section>
    </main>
  );
}
