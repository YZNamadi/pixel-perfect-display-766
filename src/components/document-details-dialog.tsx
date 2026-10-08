import { useEffect } from "react";
import { Check, CircleCheck, AlertTriangle, Plus } from "lucide-react";

export type DocumentDetails = {
  name: string;
  property: string;
  type: string;
  uploaded: string;
  expiry: string;
  expiryTone: "tone-green" | "tone-amber" | "tone-red";
  ppm: string;
  tag: string;
};

const certTitle = (type: string) =>
  type === "Gas Certificate" ? "GAS SAFETY RECORD" : `${type.toUpperCase()} RECORD`;

export function DocumentDetailsDialog({ doc, onClose }: { doc: DocumentDetails; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const tags = Array.from(new Set([doc.tag, doc.type === "Gas Certificate" ? "Gas Safety" : doc.type, "Annual Review"]));
  const status =
    doc.expiryTone === "tone-green"
      ? { label: `Active (Expires ${doc.expiry})`, note: "This certificate is currently compliant." }
      : doc.expiryTone === "tone-amber"
        ? { label: `Expiring Soon (${doc.expiry})`, note: "Renewal is approaching — schedule a new inspection." }
        : { label: `Expired (${doc.expiry})`, note: "This certificate is no longer compliant." };

  const download = () => {
    const blob = new Blob([`${doc.name}\nProperty: ${doc.property}\nType: ${doc.type}\nExpiry: ${doc.expiry}`], { type: "application/pdf" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = doc.name;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="cp-overlay" role="presentation" onClick={onClose}>
      <div className="dd-modal" role="dialog" aria-modal="true" aria-labelledby="dd-title" onClick={(e) => e.stopPropagation()}>
        <header className="dd-head">
          <div>
            <h2 id="dd-title">Compliance Document Details</h2>
            <p>Review, download or manage compliance metadata</p>
          </div>
          <button type="button" className="dd-head-btn" aria-label="Close details" onClick={onClose}>
            <Plus size={16} aria-hidden="true" />
          </button>
        </header>
        <div className="dd-body">
          <div className="dd-preview">
            <div className="dd-paper">
              <div className="dd-paper-top">
                <div>
                  <strong>{certTitle(doc.type)}</strong>
                  <small>COMPLIANCE CERTIFICATE</small>
                </div>
                <span className="dd-seal"><CircleCheck size={18} aria-hidden="true" /></span>
              </div>
              <p className="dd-sec">1. JOB ADDRESS &amp; LANDLORD DETAILS</p>
              <div className="dd-box">
                <b>{doc.property}, Flat 12B</b>
                <small>London, Greater London SE1 7PB</small>
              </div>
              <p className="dd-sec">2. INSPECTION DETAILS</p>
              <div className="dd-box dd-box-row">
                <div><small>INSPECTED BY</small><b>Gas Safe Register Ltd.</b></div>
                <div className="dd-right"><small>LICENSE NUMBER</small><b>REG# 890123</b></div>
              </div>
              <p className="dd-sec">3. APPLIANCE CHECKS</p>
              <table className="dd-table">
                <thead><tr><th>Appliance</th><th>Safe to Use</th><th>Defects</th></tr></thead>
                <tbody><tr><td>Gas Boiler (Kitchen)</td><td className="dd-yes">Yes</td><td className="dd-none">None</td></tr></tbody>
              </table>
              <div className="dd-paper-foot">
                <div><small>DATE OF ISSUE</small><b>{doc.uploaded}</b></div>
                <div className="dd-right"><small>SIGNATURE</small><b className="dd-sign">J. Safev</b></div>
              </div>
            </div>
          </div>
          <div className="dd-info">
            <div className="dd-field"><small>DOCUMENT NAME</small><b>{doc.name}</b></div>
            <hr />
            <div className="dd-grid">
              <div className="dd-field"><small>PROPERTY</small><span>{doc.property}</span></div>
              <div className="dd-field"><small>TYPE</small><span>{doc.type}</span></div>
              <div className="dd-field"><small>UPLOAD DATE</small><span>{doc.uploaded}</span></div>
              <div className="dd-field"><small>LINKED PPM</small><span className="dd-ppm">{doc.ppm}</span></div>
            </div>
            <hr />
            <div className="dd-field"><small>EXPIRY STATUS</small></div>
            <div className={`dd-status ${doc.expiryTone}`}>
              {doc.expiryTone === "tone-green" ? <Check size={16} aria-hidden="true" /> : <AlertTriangle size={16} aria-hidden="true" />}
              <div><b>{status.label}</b><small>{status.note}</small></div>
            </div>
            <div className="dd-field"><small>TAGS</small></div>
            <div className="dd-tags">{tags.map((t) => <span key={t}>{t}</span>)}</div>
            <div className="dd-actions">
              <button type="button" className="dd-close" onClick={onClose}>Close Detail</button>
              <button type="button" className="dd-download" onClick={download}>Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
