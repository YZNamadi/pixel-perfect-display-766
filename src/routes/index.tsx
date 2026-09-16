import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kearly | Welcome" },
      {
        name: "description",
        content: "Automate operations, safety checks, and site compliance reporting with Kearly.",
      },
      { property: "og:title", content: "Kearly | Welcome" },
      {
        property: "og:description",
        content: "Automate operations, safety checks, and site compliance reporting with Kearly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Shape = {
  className: string;
  style: CSSProperties;
};

const shapes: Shape[] = [
  // Top-left cluster
  { className: "hp-circle hp-mint-soft", style: { top: "-80px", left: "-60px", width: 280, height: 280 } },
  { className: "hp-ring", style: { top: "180px", left: "60px", width: 140, height: 140 } },
  { className: "hp-pill hp-mint", style: { top: "245px", left: "175px", width: 120, height: 34, transform: "rotate(-8deg)" } },
  { className: "hp-circle hp-mint", style: { top: "100px", left: "285px", width: 26, height: 26 } },
  { className: "hp-circle hp-dark", style: { top: "118px", left: "100px", width: 14, height: 14 } },
  { className: "hp-circle hp-mint", style: { top: "78px", left: "310px", width: 12, height: 12 } },
  { className: "hp-circle hp-dark-soft", style: { top: "134px", left: "82px", width: 9, height: 9 } },
  { className: "hp-circle hp-mint", style: { top: "36px", left: "580px", width: 14, height: 14 } },
  { className: "hp-circle hp-mint", style: { top: "22px", left: "608px", width: 9, height: 9 } },
  { className: "hp-circle hp-mint", style: { top: "48px", left: "596px", width: 7, height: 7 } },

  // Left mid / lower
  { className: "hp-pill hp-mint", style: { top: "285px", left: "-40px", width: 90, height: 200 } },
  { className: "hp-circle hp-mint-strong", style: { top: "352px", left: "70px", width: 42, height: 42 } },
  { className: "hp-pill hp-mint", style: { top: "400px", left: "55px", width: 148, height: 46 } },
  { className: "hp-ring", style: { top: "512px", left: "28px", width: 84, height: 84 } },
  { className: "hp-circle hp-mint-strong", style: { top: "572px", left: "88px", width: 22, height: 22 } },
  { className: "hp-blob hp-mint-soft", style: { top: "588px", left: "-30px", width: 190, height: 190 } },
  { className: "hp-circle hp-mint", style: { top: "672px", left: "36px", width: 80, height: 80 } },
  { className: "hp-circle hp-mint-strong", style: { top: "690px", left: "152px", width: 14, height: 14 } },
  { className: "hp-circle hp-mint", style: { top: "712px", left: "136px", width: 8, height: 8 } },
  { className: "hp-circle hp-mint", style: { top: "706px", left: "180px", width: 7, height: 7 } },

  // Top-right cluster
  { className: "hp-circle hp-mint-soft", style: { top: "-60px", right: "20px", width: 200, height: 200 } },
  { className: "hp-pill hp-mint-strong", style: { top: "88px", right: "32px", width: 118, height: 40 } },
  { className: "hp-circle hp-mint-strong", style: { top: "58px", right: "306px", width: 62, height: 62 } },
  { className: "hp-circle hp-mint", style: { top: "88px", right: "242px", width: 24, height: 24 } },

  // Right mid
  { className: "hp-ring", style: { top: "238px", right: "34px", width: 168, height: 168 } },
  { className: "hp-circle hp-mint-strong", style: { top: "306px", right: "36px", width: 58, height: 58 } },
  { className: "hp-circle hp-mint-strong", style: { top: "248px", right: "56px", width: 10, height: 10 } },
  { className: "hp-circle hp-mint", style: { top: "264px", right: "40px", width: 8, height: 8 } },
  { className: "hp-blob hp-mint", style: { top: "452px", right: "76px", width: 140, height: 78 } },
  { className: "hp-ring", style: { top: "532px", right: "18px", width: 118, height: 118 } },
  { className: "hp-circle hp-mint-strong", style: { top: "574px", right: "56px", width: 30, height: 30 } },
  { className: "hp-blob hp-mint", style: { top: "676px", right: "128px", width: 130, height: 110 } },
  { className: "hp-circle hp-mint-strong", style: { top: "700px", right: "96px", width: 12, height: 12 } },
  { className: "hp-circle hp-mint", style: { top: "722px", right: "72px", width: 8, height: 8 } },

  // Bottom center
  { className: "hp-pill hp-mint", style: { bottom: "94px", left: "364px", width: 74, height: 30, transform: "rotate(-14deg)" } },
  { className: "hp-pill hp-mint", style: { bottom: "58px", left: "468px", width: 160, height: 34 } },
  { className: "hp-pill hp-mint", style: { bottom: "108px", left: "718px", width: 84, height: 32, transform: "rotate(-12deg)" } },
  { className: "hp-circle hp-mint", style: { bottom: "56px", left: "276px", width: 18, height: 18 } },
  { className: "hp-circle hp-mint-strong", style: { bottom: "40px", left: "884px", width: 14, height: 14 } },
  { className: "hp-ring", style: { bottom: "-30px", left: "664px", width: 70, height: 70 } },
  { className: "hp-circle hp-mint-strong", style: { bottom: "34px", left: "634px", width: 8, height: 8 } },
  { className: "hp-circle hp-mint", style: { bottom: "24px", left: "756px", width: 8, height: 8 } },
];

function Index() {
  return (
    <main className="hp-page">
      <div className="hp-decor" aria-hidden="true">
        {shapes.map((shape, index) => (
          <span key={index} className={shape.className} style={shape.style} />
        ))}
      </div>

      <header className="hp-brand">
        <span className="hp-logo" role="img" aria-label="Kearly logo">
          <span className="hp-petal hp-petal-one" />
          <span className="hp-petal hp-petal-two" />
          <span className="hp-petal hp-petal-three" />
          <span className="hp-petal hp-petal-four" />
        </span>
        <span className="hp-brand-name">Kearly</span>
      </header>

      <section className="hp-hero" aria-labelledby="welcome-heading">
        <h1 id="welcome-heading" className="hp-title">
          Welcome to Kearly
        </h1>
        <p className="hp-subtitle">
          Automate operations, schedule safety checks, and simplify site compliance reports in
          real-time.
        </p>
        <div className="hp-actions">
          <Link className="hp-primary" to="/signup">
            Get Started
          </Link>
          <Link className="hp-secondary" to="/login">
            Learn more
          </Link>
        </div>
      </section>
    </main>
  );
}
