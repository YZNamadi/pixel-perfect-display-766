import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/site")({
  head: () => ({
    meta: [
      { title: "Kearly | Add Your First Site" },
      {
        name: "description",
        content: "Add your first Kearly site and configure its operating hours and compliance categories.",
      },
      { property: "og:title", content: "Kearly | Add Your First Site" },
      {
        property: "og:description",
        content: "Add your first Kearly site and configure its operating hours and compliance categories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SitePage,
});

const steps = ["Account", "Facility", "Site", "Import", "Team", "Complete"];
const categories = ["Electrical", "Fire", "Gas & Water", "Lifts", "Repairs"];

function SitePage() {
  const [selectedCategories, setSelectedCategories] = useState(["Electrical", "Fire", "Gas & Water"]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category) ? current.filter((item) => item !== category) : [...current, category],
    );
  };

  return (
    <main className="site-page">
      <div className="site-watermark" aria-hidden="true">
        <span className="site-watermark-petal site-wm-one" />
        <span className="site-watermark-petal site-wm-two" />
        <span className="site-watermark-petal site-wm-three" />
        <span className="site-watermark-petal site-wm-four" />
      </div>

      <div className="site-content">
        <nav className="site-stepper" aria-label="Setup progress">
          {steps.map((step, index) => {
            const isCompleted = index < 2;
            const isActive = index === 2;

            return (
              <div className="site-step-wrap" key={step}>
                <div
                  className={`site-step ${isCompleted ? "is-completed" : ""} ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span className="site-step-circle">{isCompleted ? "✓" : index + 1}</span>
                  <span className="site-step-label">{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <span className={`site-step-line ${index < 2 ? "is-completed" : ""}`} />
                )}
              </div>
            );
          })}
        </nav>

        <section className="site-panel" aria-labelledby="site-heading">
          <header className="site-header">
            <h1 id="site-heading">Add your first site</h1>
            <p>Enter details for your primary building or medical site to start tracking specific asset items.</p>
          </header>

          <form className="site-form" onSubmit={(event) => event.preventDefault()}>
            <div className="site-field">
              <label htmlFor="site-name">
                Site Name <span aria-hidden="true">*</span>
              </label>
              <input id="site-name" name="siteName" required placeholder="e.g. Riverside Central Clinic" />
            </div>

            <div className="site-field">
              <label htmlFor="site-address">Address</label>
              <textarea id="site-address" name="address" rows={3} placeholder="e.g. 12 Riverside Road, London, SW1V 4QQ" />
            </div>

            <div className="site-field-grid">
              <div className="site-field">
                <label htmlFor="hours-from">Operating Hours From</label>
                <select id="hours-from" name="hoursFrom" defaultValue="08:00">
                  <option>08:00</option>
                  <option>07:00</option>
                  <option>09:00</option>
                  <option>10:00</option>
                </select>
              </div>
              <div className="site-field">
                <label htmlFor="hours-to">Operating Hours To</label>
                <select id="hours-to" name="hoursTo" defaultValue="18:00">
                  <option>18:00</option>
                  <option>17:00</option>
                  <option>19:00</option>
                  <option>20:00</option>
                </select>
              </div>
            </div>

            <fieldset className="site-categories">
              <legend>Compliance Categories Needed</legend>
              <div className="site-category-list">
                {categories.map((category) => {
                  const isSelected = selectedCategories.includes(category);
                  return (
                    <button
                      type="button"
                      className={`site-category ${isSelected ? "is-selected" : ""}`}
                      aria-pressed={isSelected}
                      key={category}
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <p className="site-notice">
              <span aria-hidden="true">ⓘ</span>
              You can add more sites later from the Buildings page.
            </p>

            <div className="site-actions">
              <button type="submit" className="site-continue">
                Continue
              </button>
              <Link className="site-skip" to="/">
                Skip for now
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}