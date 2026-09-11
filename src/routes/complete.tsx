import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

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

const steps = ["Account", "Facility", "Site", "Import", "Team", "Complete"];

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
    <main className="complete-page">
      <div className="complete-watermark" aria-hidden="true">
        <span className="complete-watermark-petal complete-wm-one" />
        <span className="complete-watermark-petal complete-wm-two" />
        <span className="complete-watermark-petal complete-wm-three" />
        <span className="complete-watermark-petal complete-wm-four" />
      </div>

      <nav className="complete-stepper" aria-label="Setup progress">
        {steps.map((step, index) => {
          const isCompleted = index < 5;
          const isActive = index === 5;

          return (
            <div className="complete-step-wrap" key={step}>
              <div
                className={`complete-step ${isCompleted ? "is-completed" : ""} ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "step" : undefined}
              >
                <span className="complete-step-circle">{isCompleted ? "✓" : index + 1}</span>
                <span className="complete-step-label">{step}</span>
              </div>
              {index < steps.length - 1 && <span className="complete-step-line is-completed" />}
            </div>
          );
        })}
      </nav>

      <div className="complete-content">
        <header className="complete-header">
          <h1>You are almost ready!</h1>
          <p>Complete these steps to get the most out of Kearly.</p>
        </header>

        <section className="complete-card" aria-label="Setup checklist">
          <ul className="complete-list">
            {doneTasks.map((task) => (
              <li className="complete-item is-done" key={task}>
                <span className="complete-check" aria-hidden="true">
                  ✓
                </span>
                <span className="complete-item-label">{task}</span>
                <span className="complete-badge">Done</span>
              </li>
            ))}

            {pendingTasks.map((task) => (
              <li className="complete-item" key={task}>
                <button
                  type="button"
                  className={`complete-toggle ${checked.includes(task) ? "is-checked" : ""}`}
                  aria-pressed={checked.includes(task)}
                  onClick={() => toggle(task)}
                >
                  <span className="complete-circle" aria-hidden="true">
                    {checked.includes(task) ? "✓" : ""}
                  </span>
                  <span className="complete-item-label is-pending">{task}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="complete-actions">
            <Link className="complete-primary" to="/">
              Go to Dashboard
            </Link>
            <Link className="complete-secondary" to="/">
              Start guided walkthrough
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
