import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Check, CloudUpload, FileText, HelpCircle, X } from "lucide-react";

import { KearlyLogo } from "@/components/kearly-logo";

export const Route = createFileRoute("/contractor-certificates")({
  head: () => ({
    meta: [
      { title: "Kearly | Contractor Certificates" },
      { name: "description", content: "Upload your qualifications, licenses and insurance documents to get verified on Kearly." },
      { property: "og:title", content: "Kearly | Contractor Certificates" },
      { property: "og:description", content: "Upload your qualifications, licenses and insurance documents to get verified on Kearly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContractorCertificatesPage,
});

const trustedBy = ["NHS", "Bupa", "Spire", "UCLH", "Circle"];
const steps = ["Account", "Profile", "Certificates", "Jobs"];
const current = 2;
const tabs = ["1. Upload", "2. Review", "3. Confirm"];

function ContractorCertificatesPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const ok = Array.from(list).filter((f) => /\.(pdf|jpe?g|png)$/i.test(f.name) && f.size <= 10 * 1024 * 1024);
    setFiles((prev) => [...prev, ...ok]);
  };

  const next = () => (tab < 2 ? setTab(tab + 1) : void navigate({ to: "/contractor-jobs" }));

  return (
    <main className="su-page ct-page">
      <section className="su-panel ct-panel" aria-label="Kearly">
        <div className="su-panel-decor" aria-hidden="true">
          <span className="ct-circle ct-circle-one" />
          <span className="ct-circle ct-circle-two" />
          <span className="ct-circle ct-circle-three" />
        </div>
        <div className="ct-logo">
          <KearlyLogo className="ct-logo-mark" />
          <span className="ct-logo-text"><span className="ct-logo-name">KEARLY</span></span>
        </div>
        <div className="ct-panel-body">
          <h2 className="ct-panel-title ct-panel-title-wide">Showcase your qualifications</h2>
          <p className="ct-panel-text">Upload your certificates and documents for work. This will help other facilities find you faster.</p>
        </div>
        <div className="ct-trusted">
          <p className="ct-trusted-label">Trusted by leading healthcare operators</p>
          <ul className="ct-trusted-list">{trustedBy.map((n) => <li key={n}>{n}</li>)}</ul>
        </div>
      </section>

      <section className="su-form-side ct-form-side ct-form-side-top">
        <ol className="ct-steps" aria-label="Sign up progress">
          {steps.map((step, i) => (
            <li key={step} className={`ct-step ${i === current ? "is-active" : ""} ${i < current ? "is-done" : ""}`}>
              <span className="ct-step-num">{i < current ? <Check size={11} strokeWidth={3} aria-hidden="true" /> : i + 1}</span>
              <span>{step}</span>
              {i < steps.length - 1 && <span className="ct-step-line" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        <div className="ct-profile">
          <h1 className="su-title">Upload certificates &amp; documents</h1>
          <p className="su-subtitle">Upload your qualifications, licenses, and insurance documents to get verified and access high-value commercial jobs.</p>

          <div className="ct-card">
            <div className="ct-tabs" role="tablist">
              {tabs.map((t, i) => (
                <button key={t} type="button" role="tab" aria-selected={tab === i} className={`ct-tab ${tab === i ? "is-active" : ""}`} onClick={() => setTab(i)}>{t}</button>
              ))}
            </div>

            {tab === 0 && (
              <>
                <div
                  className={`ct-drop ${dragging ? "is-dragging" : ""}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => inputRef.current?.click()}
                  onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
                >
                  <CloudUpload size={26} className="ct-drop-icon" aria-hidden="true" />
                  <p className="ct-drop-title">Drag &amp; drop your files here</p>
                  <p className="ct-drop-sub">or click to browse from your computer</p>
                  <p className="ct-drop-hint">Supported formats: PDF, JPG, PNG (Max 10MB per file)</p>
                  <input ref={inputRef} type="file" hidden multiple accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
                </div>
                {files.length > 0 && <FileList files={files} onRemove={(i) => setFiles(files.filter((_, j) => j !== i))} />}
                <p className="ct-note"><HelpCircle size={14} aria-hidden="true" />You can add more documents later from your Profile page.</p>
              </>
            )}
            {tab === 1 && (files.length ? <FileList files={files} onRemove={(i) => setFiles(files.filter((_, j) => j !== i))} /> : <p className="ct-empty">No documents uploaded yet.</p>)}
            {tab === 2 && <p className="ct-empty">{files.length} document{files.length === 1 ? "" : "s"} ready to submit for verification.</p>}

            <div className="ct-actions">
              <button type="button" className="ct-continue" onClick={next}>Continue</button>
              <button type="button" className="ct-skip ct-skip-btn" onClick={() => void navigate({ to: "/contractor-jobs" })}>Continue without uploading</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FileList({ files, onRemove }: { files: File[]; onRemove: (i: number) => void }) {
  return (
    <ul className="ct-files">
      {files.map((f, i) => (
        <li key={`${f.name}-${i}`}>
          <FileText size={15} aria-hidden="true" />
          <span className="ct-file-name">{f.name}</span>
          <span className="ct-file-size">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
          <button type="button" aria-label={`Remove ${f.name}`} onClick={() => onRemove(i)}><X size={14} /></button>
        </li>
      ))}
    </ul>
  );
}
