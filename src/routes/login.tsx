import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { KearlyLogo } from "@/components/kearly-logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Kearly | Log In" },
      {
        name: "description",
        content:
          "Log in to Kearly to manage compliance workflows, safety checks and site operations in one place.",
      },
      { property: "og:title", content: "Kearly | Log In" },
      {
        property: "og:description",
        content:
          "Log in to Kearly to manage compliance workflows, safety checks and site operations in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

const trustedBy = ["SOC 2", "ISO 27001", "GDPR", "HIPAA", "PCI DSS"];

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/dashboard" });
  }

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
            Enter your credentials to access your account and manage compliance workflows with
            ease.
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
        <form className="su-form" onSubmit={submit}>
          <div className="lg-brand">
            <KearlyLogo className="lg-logo" />
            <span className="lg-brand-name">Kearly</span>
          </div>

          <h1 className="su-title">Log in</h1>
          <p className="su-subtitle">Welcome back. Please enter your email.</p>

          <label className="su-label" htmlFor="lg-email">
            Email <span className="su-required">*</span>
          </label>
          <div className="su-field">
            <input
              className="su-input"
              id="lg-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="alex@kearly.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="lg-label-row">
            <label className="su-label" htmlFor="lg-password">
              Password <span className="su-required">*</span>
            </label>
            <Link className="lg-forgot" to="/reset-password">
              Forgot password?
            </Link>
          </div>
          <div className="su-field">
            <input
              className="su-input"
              id="lg-password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="su-submit lg-submit" type="submit" disabled={busy}>
            {busy ? "Logging in..." : "LOGIN"}
          </button>

          <div className="su-divider">
            <span>OR</span>
          </div>

          <Link className="su-google" to="/google-sign-in">
            <span className="su-google-mark" aria-hidden="true">
              G
            </span>
            Sign in with Google
          </Link>

          <p className="su-footer">
            Don&apos;t have an account?{" "}
            <Link className="su-footer-link" to="/signup">
              Sign up
            </Link>
          </p>
        </form>
        <p className="su-copyright">© Kearly 2025</p>
      </section>
    </main>
  );
}
