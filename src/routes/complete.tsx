import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";

export const Route = createFileRoute("/complete")({
  head: () => ({
    meta: [
      { title: "Kearly | You Are Almost Ready" },
      {
        name: "description",
        content:
          "Finish the last Kearly setup steps: add contractors, create your first work order, and schedule maintenance.",
      },
      { property: "og:title", content: "Kearly | You Are Almost Ready" },
      {
        property: "og:description",
        content:
          "Finish the last Kearly setup steps: add contractors, create your first work order, and schedule maintenance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompletePage,
});

const doneTasks = ["Profile created", "First site added", "Data imported", "Team invited"];

const pendingTasks = [
  "Add your existing contractors",
  "Create first work order",
  "Schedule first maintenance task",
];

function CompletePage() {
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (task: string) =>
    setChecked((current) =>
      current.includes(task) ? current.filter((item) => item !== task) : [...current, task],
    );

  return (
    <main className="fp-page">
      <section className="fp-panel" aria-label="Kearly onboarding">
        <div className="fp-panel-decor" aria-hidden="true">
          <span className="fp-circle fp-circle-one" />
          <span className="fp-circle fp-circle-two" />
          <span className="fp-circle fp-circle-three" />
        </div>
        <div className="fp-panel-content">
          <h2 className="fp-panel-title">The simplest way to manage your compliance</h2>
          <p className="fp-panel-text">
            Set up your facility profile to unlock smart scheduling, compliance templates, and
            team management tools - all in one place.
          </p>
          <div>
            <p className="fp-trusted-label">Trusted by leading healthcare facilities</p>
            <ul className="fp-badges">
              <li>NHS</li>
              <li>CQC</li>
              <li>GDPR</li>
              <li>ISO 27001</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="fp-main">
        <nav className="fp-steps" aria-label="Progress">
          {["Account", "Facility", "Site", "Import", "Team"].map((label) => (
            <span className="fp-step fp-step-done" key={label}>
              <span className="fp-step-mark fp-step-mark-done">
                <Check size={13} strokeWidth={3} aria-hidden="true" />
              </span>
              {label}
            </span>
          ))}
          <span className="fp-step fp-step-active" aria-current="step">
            <span className="fp-step-mark fp-step-mark-active">6</span>
            Complete
          </span>
        </nav>

        <div className="fp-body cm-body">
          <h1 className="fp-heading cm-heading">You are almost ready!</h1>
          <p className="fp-sub cm-sub">Complete these steps to get the most out of Kearly.</p>

          <div className="fp-card cm-card">
            <ul className="cm-list">
              {doneTasks.map((task) => (
                <li className="cm-item" key={task}>
                  <span className="cm-check" aria-hidden="true">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="cm-label">{task}</span>
                  <span className="cm-badge">DONE</span>
                </li>
              ))}

              {pendingTasks.map((task) => {
                const isChecked = checked.includes(task);
                return (
                  <li className="cm-item" key={task}>
                    <button
                      type="button"
                      className="cm-toggle"
                      aria-pressed={isChecked}
                      onClick={() => toggle(task)}
                    >
                      <span
                        className={`cm-circle ${isChecked ? "is-checked" : ""}`}
                        aria-hidden="true"
                      >
                        {isChecked ? <Check size={12} strokeWidth={3} /> : null}
                      </span>
                      <span className="cm-label cm-label-pending">{task}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <Link className="fp-continue" to="/dashboard">
              Go to Dashboard
            </Link>
            <Link className="fp-skip" to="/dashboard">
              Start guided walkthrough
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
