import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your Kearly account" },
      {
        name: "description",
        content:
          "Sign up for Kearly to automate operations, safety checks, and site compliance reporting.",
      },
      { property: "og:title", content: "Create your Kearly account" },
      {
        property: "og:description",
        content:
          "Sign up for Kearly to automate operations, safety checks, and site compliance reporting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <main className="auth-page">
      <div className="auth-watermark" aria-hidden="true">
        <span className="auth-watermark-petal wm-one" />
        <span className="auth-watermark-petal wm-two" />
        <span className="auth-watermark-petal wm-three" />
        <span className="auth-watermark-petal wm-four" />
      </div>

      <section className="auth-card" aria-labelledby="signup-heading">
        <header className="auth-header">
          <div className="auth-logo" role="img" aria-label="Kearly logo">
            <span className="logo-petal logo-petal-one" />
            <span className="logo-petal logo-petal-two" />
            <span className="logo-petal logo-petal-three" />
            <span className="logo-petal logo-petal-four" />
          </div>
          <h1 id="signup-heading" className="auth-brand">
            KEARLY
          </h1>
          <p className="auth-tagline">Compliance. Automated &amp; Simplified.</p>
        </header>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="auth-field">
            <label htmlFor="email">
              Work Email <span className="auth-required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="alex@kearly.com"
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">
              Password <span className="auth-required">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="auth-submit">
            Create Account
          </button>
        </form>

        <div className="auth-separator">
          <span>OR</span>
        </div>

        <button type="button" className="auth-google">
          <span className="auth-google-mark" aria-hidden="true">
            G
          </span>
          Sign in with Google
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <a className="login-link" href="#log-in">
            Log in
          </a>
        </p>
      </section>
    </main>
  );
}
