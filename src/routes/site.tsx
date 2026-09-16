import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Info } from "lucide-react";

export const Route = createFileRoute("/site")({
  head: () => ({
    meta: [
      { title: "Kearly | Add Your First Site" },
      {
        name: "description",
        content:
          "Add your primary building or medical site in Kearly with address, operating hours, and compliance categories.",
      },
      { property: "og:title", content: "Kearly | Add Your First Site" },
      {
        property: "og:description",
        content:
          "Add your primary building or medical site in Kearly with address, operating hours, and compliance categories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SitePage,
});

const hours = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "12:00",
  "16:00",
  "17:00",
  "18:00",
  "20:00",
  "22:00",
  "00:00",
];

const categories = ["Electrical", "Fire", "Gas & Water", "Lifts", "Repairs"];

function SitePage() {
  const [selected, setSelected] = useState<string[]>([
    "Electrical",
    "Fire",
    "Gas & Water",
  ]);

  const toggle = (name: string) =>
    setSelected((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
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
          <h2 className="fp-panel-title">
            The simplest way to manage your facilities
          </h2>
          <p className="fp-panel-text">
            Set up your sites, track compliance, and manage assets - all from one
            place. Kearly keeps your team organised and your buildings compliant.
          </p>
          <div>
            <p className="fp-trusted-label">
              Trusted by leading healthcare facilities
            </p>
            <ul className="fp-badges">
              <li>NHS</li>
              <li>Bupa</li>
              <li>Spire</li>
              <li>UCLH</li>
              <li>Circle</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="fp-main">
        <nav className="fp-steps" aria-label="Progress">
          <span className="fp-step fp-step-done">
            <span className="fp-step-mark fp-step-mark-done">
              <Check size={13} strokeWidth={3} aria-hidden="true" />
            </span>
            Account
          </span>
          <span className="fp-step fp-step-done">
            <span className="fp-step-mark fp-step-mark-done">
              <Check size={13} strokeWidth={3} aria-hidden="true" />
            </span>
            Facility
          </span>
          <span className="fp-step fp-step-active" aria-current="step">
            <span className="fp-step-mark fp-step-mark-active">3</span>
            Site
          </span>
          {["Import", "Team", "Complete"].map((label, index) => (
            <span className="fp-step" key={label}>
              <span className="fp-step-mark">{index + 4}</span>
              {label}
            </span>
          ))}
        </nav>

        <div className="fp-body">
          <h1 className="fp-heading">Add your first site</h1>
          <p className="fp-sub">
            Enter details for your primary building or medical site to start
            tracking specific asset items.
          </p>

          <form className="fp-card" onSubmit={(event) => event.preventDefault()}>
            <div className="fp-field">
              <label className="fp-label" htmlFor="site-name">
                Site Name <span className="fp-req">*</span>
              </label>
              <input
                id="site-name"
                name="siteName"
                className="fp-input"
                placeholder="e.g. Riverside Central Clinic"
              />
            </div>

            <div className="fp-field">
              <label className="fp-label" htmlFor="site-address">
                Address
              </label>
              <textarea
                id="site-address"
                name="address"
                className="fp-input fp-textarea"
                rows={3}
                placeholder="e.g. 12 Riverside Road, London, SW1V 4QQ"
              />
            </div>

            <div className="fp-grid">
              <div className="fp-field">
                <label className="fp-label" htmlFor="hours-from">
                  Operating Hours From
                </label>
                <select
                  id="hours-from"
                  name="hoursFrom"
                  className="fp-input fp-select"
                  defaultValue="08:00"
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
              <div className="fp-field">
                <label className="fp-label" htmlFor="hours-to">
                  Operating Hours To
                </label>
                <select
                  id="hours-to"
                  name="hoursTo"
                  className="fp-input fp-select"
                  defaultValue="18:00"
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="fp-field">
              <span className="fp-label">Compliance Categories Needed</span>
              <div className="fp-chips">
                {categories.map((name) => {
                  const active = selected.includes(name);
                  return (
                    <button
                      type="button"
                      key={name}
                      className={`fp-chip${active ? " fp-chip-on" : ""}`}
                      aria-pressed={active}
                      onClick={() => toggle(name)}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="fp-note">
              <Info size={16} aria-hidden="true" />
              You can add more sites later from the Buildings page.
            </p>

            <div className="fp-actions">
              <Link to="/import" className="fp-continue">
                Continue
              </Link>
              <Link to="/import" className="fp-skip">
                Skip for now
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
