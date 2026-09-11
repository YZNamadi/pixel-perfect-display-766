import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Kearly | Automate Compliance Workflow" },
      {
        name: "description",
        content:
          "See how Kearly handles recurring tasks, reminders, and evidence capture so nothing falls through the cracks.",
      },
      { property: "og:title", content: "Kearly | Automate Compliance Workflow" },
      {
        property: "og:description",
        content:
          "See how Kearly handles recurring tasks, reminders, and evidence capture so nothing falls through the cracks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnboardingCarousel,
});

const slides = [
  {
    heading: "Automate compliance workflow",
    subtitle:
      "Recurring tasks, reminders, and evidence capture, so nothing falls through the cracks.",
  },
  {
    heading: "Monitor financial risk in real time",
    subtitle:
      "Get instant visibility into over due tasks, expiring certificates, and compliance gaps as they happen.",
  },

  {
    heading: "Work with your contractors",
    subtitle:
      "Raise work orders, track progress, and collect sign-off evidence in one shared place.",
  },
];

function OnboardingCarousel() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const slide = slides[index] ?? slides[0]!;

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      navigate({ to: "/dashboard-welcome" });
    }
  };

  return (
    <main className="ob-page">
      <header className="ob-topnav">
        <div className="ob-brand">
          <div className="ob-nav-logo" role="img" aria-label="Kearly logo">
            <span className="ob-nav-petal ob-petal-one" />
            <span className="ob-nav-petal ob-petal-two" />
            <span className="ob-nav-petal ob-petal-three" />
            <span className="ob-nav-petal ob-petal-four" />
          </div>
          <div>
            <p className="ob-brand-name">Kearly</p>
            <p className="ob-brand-tagline">Compliance. Automated &amp; Simplified.</p>
          </div>
        </div>
        <Link className="ob-skip" to="/dashboard-welcome">
          Skip
        </Link>
      </header>

      <section className="ob-content" aria-labelledby="ob-heading">
        <div className="ob-hero-logo" role="img" aria-label="Kearly emblem">
          <span className="ob-hero-petal ob-petal-one" />
          <span className="ob-hero-petal ob-petal-two" />
          <span className="ob-hero-petal ob-petal-three" />
          <span className="ob-hero-petal ob-petal-four" />
        </div>

        <h1 id="ob-heading" className="ob-heading">
          {slide.heading}
        </h1>
        <p className="ob-subtitle">{slide.subtitle}</p>

        <div className="ob-dots" role="tablist" aria-label="Slides">
          {slides.map((item, dotIndex) => (
            <button
              key={item.heading}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`Slide ${dotIndex + 1}`}
              className={`ob-dot ${dotIndex === index ? "is-active" : ""}`}
              onClick={() => setIndex(dotIndex)}
            />
          ))}
        </div>

        <div className="ob-actions">
          {index > 0 && (
            <button
              type="button"
              className="ob-prev"
              onClick={() => setIndex(index - 1)}
            >
              Previous
            </button>
          )}
          <button type="button" className="ob-next" onClick={next}>
            {index === slides.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>

      </section>
    </main>
  );
}
