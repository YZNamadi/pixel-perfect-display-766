import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/import")({
  head: () => ({
    meta: [
      { title: "Kearly | Upload Data" },
      {
        name: "description",
        content: "Upload your asset, asbestos, or equipment spreadsheets securely into Kearly.",
      },
      { property: "og:title", content: "Kearly | Upload Data" },
      {
        property: "og:description",
        content: "Upload your asset, asbestos, or equipment spreadsheets securely into Kearly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImportPage,
});

const steps = ["Upload Sheet", "Data Mapping", "Data  Preview"];

function ImportPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | undefined) => {
    if (file) setSelectedFile(file);
  };

  return (
    <main className="ud-page">
      <div className="ud-deco ud-deco-phone" aria-hidden="true">
        📱
      </div>
      <div className="ud-deco ud-deco-shield" aria-hidden="true">
        🛡️
      </div>
      <div className="ud-deco ud-deco-leaf" aria-hidden="true">
        🌿
      </div>

      <section className="ud-card" aria-labelledby="ud-heading">
        <header className="ud-card-head">
          <div className="ud-logo" aria-label="Kearly">
            <svg width="22" height="22" viewBox="0 0 100 100" aria-hidden="true">
              <rect x="5" y="5" width="40" height="40" rx="10" fill="#4A7C6F" />
              <path d="M 55 5 L 95 5 L 95 45 Q 75 45 55 25 Z" fill="#4A7C6F" />
              <rect x="5" y="55" width="40" height="40" rx="10" fill="#4A7C6F" />
              <path d="M 55 55 Q 75 55 95 75 L 95 95 L 55 95 Z" fill="#4A7C6F" />
            </svg>
            <span className="ud-logo-text">
              <span className="ud-logo-name">KEARLY</span>
              <span className="ud-logo-tag">Compliance. Automated &amp; Simplified.</span>
            </span>
          </div>
          <Link to="/site" className="ud-back">
            Back
          </Link>
        </header>

        <nav className="ud-stepper" aria-label="Import progress">
          {steps.map((step, index) => (
            <div className="ud-step-wrap" key={step}>
              <div className={`ud-step ${index === 0 ? "is-active" : ""}`}>
                <span className="ud-step-circle">{index + 1}</span>
                <span className="ud-step-label">{step}</span>
              </div>
              {index < steps.length - 1 && <span className="ud-step-line" />}
            </div>
          ))}
        </nav>

        <h1 id="ud-heading" className="ud-heading">
          Upload Data
        </h1>
        <p className="ud-sub">Import your data securely to continue</p>

        <input
          ref={inputRef}
          className="ud-file-input"
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />

        <div
          className={`ud-drop ${isDragging ? "is-dragging" : ""}`}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            handleFile(event.dataTransfer.files[0]);
          }}
        >
          <span className="ud-drop-icon" aria-hidden="true">
            <svg width="86" height="66" viewBox="0 0 86 66" fill="none">
              <path
                d="M22 56C11.5 56 3 47.7 3 37.5S11.5 19 22 19c1 0 2 .1 3 .2C27.6 9.6 36.5 2.5 47 2.5c12.7 0 23 10.2 23 22.8 0 .6 0 1.2-.1 1.8 8 1.6 13.1 8 13.1 15.4 0 8.6-7 13.5-15.6 13.5H22Z"
                fill="#9AA5A1"
              />
              <path d="M43 52V27" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
              <path d="M31 38l12-12 12 12" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <strong>{selectedFile ? selectedFile.name : "Drag and drop your files here"}</strong>
          <span className="ud-or">{selectedFile ? "Ready to import" : "Or"}</span>
          <button type="button" className="ud-browse" onClick={() => inputRef.current?.click()}>
            Browse Files
          </button>
          <small>Supported format: xlsx, xls, csv, Google sheet</small>
        </div>

        <Link
          className="ud-continue"
          to="/mapping"
          data-disabled={!selectedFile}
          onClick={(event) => {
            if (!selectedFile) event.preventDefault();
          }}
        >
          Continue
        </Link>
      </section>
    </main>
  );
}
