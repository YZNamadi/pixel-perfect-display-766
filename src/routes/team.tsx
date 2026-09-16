import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plus } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Kearly | Invite Your Team" },
      {
        name: "description",
        content:
          "Invite contractors, engineers, and facility staff to Kearly and assign roles so everyone can track tasks and logs.",
      },
      { property: "og:title", content: "Kearly | Invite Your Team" },
      {
        property: "og:description",
        content:
          "Invite contractors, engineers, and facility staff to Kearly and assign roles so everyone can track tasks and logs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamPage,
});

const roles = [
  "Facility Manager",
  "Engineer",
  "Contractor",
  "Compliance Officer",
  "Viewer",
];

type Member = { email: string; role: string };

function TeamPage() {
  const [members, setMembers] = useState<Member[]>([
    { email: "sarah.jones@riverside.nhs.uk", role: "Facility Manager" },
    { email: "james.carter@riverside.nhs.uk", role: "Viewer" },
    { email: "", role: "" },
  ]);

  const update = (index: number, patch: Partial<Member>) =>
    setMembers((current) =>
      current.map((member, i) => (i === index ? { ...member, ...patch } : member)),
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
          <h2 className="fp-panel-title">The simplest way to manage your team</h2>
          <p className="fp-panel-text">
            Invite colleagues, assign roles, and keep everyone aligned with smart access
            controls and compliance-ready team management tools - all in one place.
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
          {["Account", "Facility", "Site", "Import"].map((label) => (
            <span className="fp-step fp-step-done" key={label}>
              <span className="fp-step-mark fp-step-mark-done">
                <Check size={13} strokeWidth={3} aria-hidden="true" />
              </span>
              {label}
            </span>
          ))}
          <span className="fp-step fp-step-active" aria-current="step">
            <span className="fp-step-mark fp-step-mark-active">5</span>
            Team
          </span>
          <span className="fp-step">
            <span className="fp-step-mark">6</span>
            Complete
          </span>
        </nav>

        <div className="fp-body">
          <h1 className="fp-heading">Invite your team</h1>
          <p className="fp-sub">
            Add contractors, engineers, and facility staff so they can track tasks and keep
            logs up to date.
          </p>

          <form className="fp-card" onSubmit={(event) => event.preventDefault()}>
            <div className="tm-head">
              <span className="fp-label">Email Address</span>
              <span className="fp-label">Role</span>
            </div>

            {members.map((member, index) => (
              <div className="tm-row" key={index}>
                <input
                  className="fp-input"
                  type="email"
                  aria-label={`Team member ${index + 1} email`}
                  placeholder="colleague@example.com"
                  value={member.email}
                  onChange={(event) => update(index, { email: event.target.value })}
                />
                <select
                  className="fp-input fp-select"
                  aria-label={`Team member ${index + 1} role`}
                  value={member.role}
                  onChange={(event) => update(index, { role: event.target.value })}
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button
              type="button"
              className="tm-add"
              onClick={() => setMembers((current) => [...current, { email: "", role: "" }])}
            >
              <Plus size={15} strokeWidth={3} aria-hidden="true" />
              Add another team member
            </button>

            <div className="tm-actions">
              <Link to="/complete" className="fp-continue">
                Send Invites &amp; Continue
              </Link>
              <Link to="/complete" className="fp-skip">
                Skip for now
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
