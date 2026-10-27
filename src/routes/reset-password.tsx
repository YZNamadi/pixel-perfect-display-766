import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { KearlyLogo } from "@/components/kearly-logo";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Kearly | Reset Password" },
      { name: "description", content: "Set a new password for your Kearly account." },
      { property: "og:title", content: "Kearly | Reset Password" },
      { property: "og:description", content: "Set a new password for your Kearly account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    if (hash.get("type") !== "recovery") {
      setBusy(false);
      toast.error("Open this page from the link in your reset email.");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated. Please log in.");
    navigate({ to: "/login" });
  }

  return (
    <main className="su-page">
      <section className="su-form-side su-form-side-solo">
        <form className="su-form" onSubmit={submit}>
          <div className="lg-brand">
            <KearlyLogo className="lg-logo" />
            <span className="lg-brand-name">Kearly</span>
          </div>
          <h1 className="su-title">Set a new password</h1>
          <p className="su-subtitle">Choose a strong password for your account.</p>

          <label className="su-label" htmlFor="rp-password">
            New password <span className="su-required">*</span>
          </label>
          <div className="su-field">
            <input
              className="su-input"
              id="rp-password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
            />
          </div>

          <button className="su-submit" type="submit" disabled={busy}>
            {busy ? "Saving..." : "Update password"}
          </button>
        </form>
        <p className="su-copyright">© Kearly 2025</p>
      </section>
    </main>
  );
}
