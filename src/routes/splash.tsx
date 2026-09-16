import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/splash")({
  head: () => ({
    meta: [
      { title: "Kearly | Loading Your Compliance Workspace" },
      {
        name: "description",
        content:
          "Kearly is preparing your compliance workspace. Automated tasks, reminders and audit evidence in one place.",
      },
      { property: "og:title", content: "Kearly | Loading Your Compliance Workspace" },
      {
        property: "og:description",
        content:
          "Kearly is preparing your compliance workspace. Automated tasks, reminders and audit evidence in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SplashScreen,
});

function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((value) => (value >= 100 ? 100 : value + 2));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const timeout = setTimeout(() => navigate({ to: "/" }), 400);
    return () => clearTimeout(timeout);
  }, [progress, navigate]);

  return (
    <main className="sp-page">
      <div className="sp-inner">
        <div className="sp-row">
          <div className="sp-logo" role="img" aria-label="Kearly logo">
            <span className="sp-petal sp-petal-one" />
            <span className="sp-petal sp-petal-two" />
            <span className="sp-petal sp-petal-three" />
            <span className="sp-petal sp-petal-four" />
          </div>
          <div className="sp-brand">
            <h1 className="sp-wordmark">KEARLY</h1>
            <p className="sp-tagline">Compliance. Automated &amp; Simplified.</p>
          </div>
        </div>

        <div
          className="sp-progress"
          role="progressbar"
          aria-label="Loading Kearly"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span className="sp-dot" />
          <span className="sp-track">
            <span className="sp-fill" style={{ width: `${progress}%` }} />
          </span>
        </div>
      </div>
    </main>
  );
}
