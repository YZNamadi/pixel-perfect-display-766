import { useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { UploadCloud } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { ProductSelect } from "@/components/product-select";

export const Route = createFileRoute("/add-training-record")({
  head: () => ({
    meta: [
      { title: "Kearly | Add Training Record" },
      { name: "description", content: "Add a staff training record with provider, certificate, dates and supporting document." },
      { property: "og:title", content: "Kearly | Add Training Record" },
      { property: "og:description", content: "Add a staff training record with provider, certificate, dates and supporting document." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AddTrainingRecordPage,
});

const staff = ["Alex Rowe", "Sarah Jones", "David Finch", "James Carter", "Emma Watson", "Robert Vance", "Clara Oswald", "Marcus Brody"];
const types = ["Health & Safety", "Clinical", "Facilities", "Governance", "Safeguarding", "Operations", "HR"];

function AddTrainingRecordPage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const pick = (f?: File | null) => { if (f && f.size <= 10 * 1024 * 1024) setFile(f); };

  return (
    <AppShell active="Reports">
      <div className="atr-page">
        <nav className="atr-crumbs" aria-label="Breadcrumb"><Link to="/staff-records">Staff Records</Link><span>/</span><strong>Add Training Record</strong></nav>
        <h1 className="atr-title">Add Training Record</h1>
        <div className="rr-tabs" role="tablist" aria-label="Report sections">
          <Link to="/reports" role="tab" aria-selected={false} className="rr-tab">Reports</Link>
          <Link to="/documents" role="tab" aria-selected={false} className="rr-tab">Documents</Link>
          <Link to="/staff-records" role="tab" aria-selected className="rr-tab is-active">Staff Report</Link>
        </div>
        <form className="atr-card" onSubmit={(e) => { e.preventDefault(); navigate({ to: "/staff-records" }); }}>
          <div className="atr-grid">
            <label>Staff Member <i>*</i><ProductSelect required defaultValue=""><option value="" disabled>Select Staff Member</option>{staff.map((s) => <option key={s}>{s}</option>)}</ProductSelect></label>
            <label>Training Type <i>*</i><ProductSelect required defaultValue=""><option value="" disabled>Select Category / Type</option>{types.map((s) => <option key={s}>{s}</option>)}</ProductSelect></label>
            <label>Training Provider <i>*</i><input required placeholder="e.g. Red Cross Academy" /></label>
            <label>Certificate Number<input placeholder="e.g. CERT-102938" /></label>
            <label>Date Completed <i>*</i><input type="date" required /></label>
            <label>Expiry Date<input type="date" /></label>
          </div>
          <div className="atr-field"><span>Upload Document</span>
            <button type="button" className="atr-drop" onClick={() => fileRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files[0]); }}>
              <UploadCloud size={22} aria-hidden="true" />
              <strong>{file ? file.name : "Click to upload or drag & drop"}</strong>
              <small>PDF, PNG, JPG up to 10MB</small>
            </button>
            <input ref={fileRef} type="file" hidden accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => pick(e.target.files?.[0])} />
          </div>
          <label className="atr-field"><span>Notes</span><textarea rows={4} placeholder="Add any additional details or notes here..." /></label>
          <div className="atr-actions"><Link to="/staff-records" className="atr-cancel">Cancel</Link><button type="submit" className="atr-save">Save Training Record</button></div>
        </form>
      </div>
    </AppShell>
  );
}
