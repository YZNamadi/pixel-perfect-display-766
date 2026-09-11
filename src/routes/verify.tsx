import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Kearly | Verify Your Email Passcode" },
      {
        name: "description",
        content:
          "Enter the 6 digit passcode sent to your email to verify your Kearly account and continue setup.",
      },
      { property: "og:title", content: "Kearly | Verify Your Email Passcode" },
      {
        property: "og:description",
        content:
          "Enter the 6 digit passcode sent to your email to verify your Kearly account and continue setup.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const setDigit = (index: number, value: string) => {
    const clean = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => prev.map((d, i) => (i === index ? clean : d)));
    if (clean && index < 5) inputs.current[index + 1]?.focus();
  };

  return (
    <main className="si-page">
      <div className="si-decor si-decor-phone" aria-hidden="true" />
      <div className="si-decor si-decor-shield" aria-hidden="true" />
      <div className="si-decor si-decor-leaf" aria-hidden="true" />

      <section className="si-card vf-card" aria-labelledby="vf-heading">
        <div className="vf-logo" role="img" aria-label="Kearly logo">
          <span className="si-petal si-petal-one" />
          <span className="si-petal si-petal-two" />
          <span className="si-petal si-petal-three" />
          <span className="si-petal si-petal-four" />
        </div>

        <h1 id="vf-heading" className="vf-heading">
          A 6 digit passcode has been sent to
          <br />
          <span className="vf-email">Janedoe1234@gmail.com</span>
        </h1>

        <form
          className="vf-form"
          onSubmit={(event) => {
            event.preventDefault();
            navigate({ to: "/facility" });
          }}
        >
          <div className="vf-code">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                className="vf-cell"
                inputMode="numeric"
                maxLength={1}
                aria-label={`Digit ${index + 1}`}
                value={digit}
                onChange={(event) => setDigit(index, event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && !digits[index] && index > 0) {
                    inputs.current[index - 1]?.focus();
                  }
                }}
              />
            ))}
          </div>

          <p className="vf-resend">
            Didn&apos;t recieve code?{" "}
            <button type="button" className="vf-resend-link">
              Resend.
            </button>
          </p>

          <button type="submit" className="si-submit">
            Submit
          </button>
        </form>

        <button
          type="button"
          className="vf-back"
          onClick={() => navigate({ to: "/signup" })}
        >
          Back
        </button>
      </section>
    </main>
  );
}
