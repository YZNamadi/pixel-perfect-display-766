import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Check, UploadCloud } from "lucide-react";

export const Route = createFileRoute("/import")({
  head: () => ({
    meta: [
      { title: "Kearly | Import Existing Data" },
      {
        name: "description",
        content:
          "Upload your asset, asbestos, or equipment spreadsheets and let Kearly map the fields automatically.",
      },
      { property: "og:title", content: "Kearly | Import Existing Data" },
      {
        property: "og:description",
        content:
          "Upload your asset, asbestos, or equipment spreadsheets and let Kearly map the fields automatically.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImportPage,
});

function ImportPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | undefined) => {
    if (file) setSelectedFile(file);
  };

  return (
    <main className="fp-page">
      <section className="fp-panel" aria-label="Kearly onboarding">
        <div className="fp-panel-decor" aria-hidden="true">
          <span className="fp-circle fp-circle-one" />
          <span className="fp-circle fp-circle-two" />
          <span className="fp-circle fp-circle-three" />
        </div>
        <div className="fp-panel-content">
          <h2 className="fp-panel-title">The simplest way to manage your assets</h2>
          <p className="fp-panel-text">
            Import your existing data and let Kearly automatically map fields, detect
            anomalies, and get your team up and running in minutes.
          </p>
          <div>
            <p className="fp-trusted-label">Trusted by leading healthcare facilities</p>
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
          {["Account", "Facility", "Site"].map((label) => (
            <span className="fp-step fp-step-done" key={label}>
              <span className="fp-step-mark fp-step-mark-done">
                <Check size={13} strokeWidth={3} aria-hidden="true" />
              </span>
              {label}
            </span>
          ))}
          <span className="fp-step fp-step-active" aria-current="step">
            <span className="fp-step-mark fp-step-mark-active">4</span>
            Import
          </span>
          {["Team", "Complete"].map((label, index) => (
            <span className="fp-step" key={label}>
              <span className="fp-step-mark">{index + 5}</span>
              {label}
            </span>
          ))}
        </nav>

        <div className="fp-body">
          <h1 className="fp-heading">Import existing data</h1>
          <p className="fp-sub">
            Upload active asset logs, current asbestos logs, or equipment logs to map
            automatically.
          </p>

          <div className="fp-card im-card">
            <nav className="im-tabs" aria-label="Import steps">
              <span className="im-tab im-tab-on" aria-current="step">
                1. Upload
              </span>
              <span className="im-tab">2. Map Fields</span>
              <span className="im-tab">3. Preview</span>
            </nav>

            <input
              ref={inputRef}
              className="im-file-input"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />

            <button
              type="button"
              className={`im-drop${isDragging ? " is-dragging" : ""}`}
              onClick={() => inputRef.current?.click()}
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
              <UploadCloud size={34} strokeWidth={1.5} aria-hidden="true" />
              <strong>
                {selectedFile ? selectedFile.name : "Drag & drop your spreadsheet here"}
              </strong>
              <span>
                {selectedFile
                  ? "Ready to import"
                  : "or click to browse from your computer"}
              </span>
              <small>Supported formats: .xlsx, .csv, Google Sheets export</small>
            </button>

            <div className="im-actions">
              <Link to="/mapping" className="fp-continue">
                Continue
              </Link>
              <Link to="/team" className="fp-skip">
                Continue without importing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
