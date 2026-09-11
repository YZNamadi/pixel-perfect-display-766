import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Kearly | Invite Your Team" },
      {
        name: "description",
        content: "Invite contractors, engineers, and facility staff to collaborate in Kearly.",
      },
      { property: "og:title", content: "Kearly | Invite Your Team" },
      {
        property: "og:description",
        content: "Invite contractors, engineers, and facility staff to collaborate in Kearly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamPage,
});

const steps = ["Account", "Facility", "Site", "Import", "Team", "Complete"];
const roles = ["Facility Manager", "Viewer", "Admin", "Engineer"];

type TeamMember = { email: string; role: string };

const initialMembers: TeamMember[] = [
  { email: "sarah.jones@riverside.nhs.uk", role: "Facility Manager" },
  { email: "james.carter@riverside.nhs.uk", role: "Viewer" },
  { email: "", role: "" },
];

function TeamPage() {
  const [members, setMembers] = useState(initialMembers);

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    setMembers((current) =>
      current.map((member, memberIndex) =>
        memberIndex === index ? { ...member, [field]: value } : member,
      ),
    );
  };

  return (
    <main className="team-page">
      <div className="team-watermark" aria-hidden="true">
        <span className="team-watermark-petal team-wm-one" />
        <span className="team-watermark-petal team-wm-two" />
        <span className="team-watermark-petal team-wm-three" />
        <span className="team-watermark-petal team-wm-four" />
      </div>

      <div className="team-content">
        <nav className="team-stepper" aria-label="Setup progress">
          {steps.map((step, index) => {
            const isCompleted = index < 4;
            const isActive = index === 4;

            return (
              <div className="team-step-wrap" key={step}>
                <div
                  className={`team-step ${isCompleted ? "is-completed" : ""} ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span className="team-step-circle">{isCompleted ? "✓" : index + 1}</span>
                  <span className="team-step-label">{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <span className={`team-step-line ${index < 4 ? "is-completed" : ""}`} />
                )}
              </div>
            );
          })}
        </nav>

        <section className="team-panel" aria-labelledby="team-heading">
          <header className="team-header">
            <h1 id="team-heading">Invite your team</h1>
            <p>Add contractors, engineers, and facility staff so they can track tasks and keep logs up to date.</p>
          </header>

          <form className="team-form" onSubmit={(event) => event.preventDefault()}>
            <div className="team-member-header" aria-hidden="true">
              <span>Email Address</span>
              <span>Role</span>
            </div>

            <div className="team-member-list">
              {members.map((member, index) => (
                <div className="team-member-row" key={index}>
                  <div className="team-field">
                    <label className="team-row-label team-sr-only" htmlFor={`team-email-${index}`}>
                      Email Address
                    </label>
                    <input
                      id={`team-email-${index}`}
                      type="email"
                      value={member.email}
                      placeholder={index === 2 ? "colleague@example.com" : undefined}
                      onChange={(event) => updateMember(index, "email", event.target.value)}
                    />
                  </div>
                  <div className="team-field">
                    <label className="team-row-label team-sr-only" htmlFor={`team-role-${index}`}>
                      Role
                    </label>
                    <select
                      id={`team-role-${index}`}
                      value={member.role}
                      onChange={(event) => updateMember(index, "role", event.target.value)}
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      {roles.map((role) => (
                        <option value={role} key={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="team-add-member"
              onClick={() => setMembers((current) => [...current, { email: "", role: "" }])}
            >
              <span aria-hidden="true">+</span>
              Add another team member
            </button>

            <div className="team-actions">
              <button type="submit" className="team-continue">
                Send Invites &amp; Continue
              </button>
              <Link className="team-skip" to="/">
                Skip for now
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}