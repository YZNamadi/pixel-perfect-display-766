import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/import")({
  head: () => ({
    meta: [
      { title: "Kearly | Import Existing Data" },
      {
        name: "description",
        content: "Import existing asset, asbestos, or equipment logs into Kearly.",
      },
      { property: "og:title", content: "Kearly | Import Existing Data" },
      {
        property: "og:description",
        content: "Import existing asset, asbestos, or equipment logs into Kearly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImportPage,
});

const steps = ["Account", "Facility", "Site", "Import", "Team", "Complete"];

function ImportPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | undefined) => {
    if (file) setSelectedFile(file);
  };

  return (
    <main className="import-page">
      <div className="import-watermark" aria-hidden="true">
        <span className="import-watermark-petal import-wm-one" />
        <span className="import-watermark-petal import-wm-two" />
        <span className="import-watermark-petal import-wm-three" />
        <span className="import-watermark-petal import-wm-four" />
      </div>

      <div className="import-content">
        <nav className="import-stepper" aria-label="Setup progress">
          {steps.map((step, index) => {
            const isCompleted = index < 3;
            const isActive = index === 3;

            return (
              <div className="import-step-wrap" key={step}>
                <div
                  className={`import-step ${isCompleted ? "is-completed" : ""} ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span className="import-step-circle">{isCompleted ? "✓" : index + 1}</span>
                  <span className="import-step-label">{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <span className={`import-step-line ${index < 3 ? "is-completed" : ""}`} />
                )}
              </div>
            );
          })}
        </nav>

        <section className="import-panel" aria-labelledby="import-heading">
          <header className="import-header">
            <h1 id="import-heading">Import existing data</h1>
            <p>Upload active asset logs, current asbestos logs, or equipment logs to map automatically.</p>
          </header>

          <div className="import-card">
            <div className="import-tabs" role="tablist" aria-label="Import progress">
              <span className="import-tab is-active" role="tab" aria-selected="true">
                1. Upload
              </span>
              <span className="import-tab" role="tab" aria-selected="false">
                2. Map Fields
              </span>
              <span className="import-tab" role="tab" aria-selected="false">
                3. Preview
              </span>
            </div>

            <input
              ref={inputRef}
              className="import-file-input"
              type="file"
              accept=".xlsx,.csv"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
            <button
              type="button"
              className={`import-upload-zone ${isDragging ? "is-dragging" : ""}`}
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
              <span className="import-upload-icon" aria-hidden="true">
                ⇧
              </span>
              <strong>{selectedFile ? selectedFile.name : "Drag & drop your spreadsheet here"}</strong>
              <span>{selectedFile ? "Ready to import" : "or click to browse from your computer"}</span>
              <small>Supported formats: .xlsx, .csv, Google Sheets export</small>
            </button>

            <div className="import-actions">
              <button type="button" className="import-continue" disabled={!selectedFile}>
                Continue
              </button>
              <Link className="import-skip" to="/">
                Continue without importing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}