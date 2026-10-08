import { useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Calendar, CircleCheck, FileText, Trash2, Upload } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { ProductSelect } from "@/components/product-select";
import { CategoryDropdown, StaffDropdown, categoryOptions, staffOptions } from "@/components/report-dropdowns";
import { initialRecords } from "@/lib/staff-records";

export const Route = createFileRoute("/edit-report")({
  validateSearch: (search: Record<string, unknown>) => ({ id: Number(search["id"]) || 0 }),
  head: () => ({
    meta: [
      { title: "Kearly | Edit Report" },
      { name: "description", content: "Update staff report compliance details and verify its attached documentation." },
      { property: "og:title", content: "Kearly | Edit Report" },
      { property: "og:description", content: "Update staff report compliance details and verify its attached documentation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EditReportPage,
});


function EditReportPage() {
  const { id } = Route.useSearch();
  const rec = initialRecords[id] ?? initialRecords[0]!;
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [staff, setStaff] = useState(staffOptions.some((s) => s.name === rec.name) ? rec.name : staffOptions[0]!.name);
  const [category, setCategory] = useState(categoryOptions.some((c) => c.label === rec.category) ? rec.category : categoryOptions[0]!.label);
  const [fileName, setFileName] = useState(`${rec.report.replace(/[^A-Za-z0-9]+/g, "_")}_${rec.filed.slice(-4)}.pdf`);
  const back = () => navigate({ to: "/staff-records" });

  return (
    <AppShell active="Reports">
      <div className="atr-page er-page">
        <Link to="/staff-records" className="er-back"><ArrowLeft size={14} aria-hidden="true" />Back to Staff Records</Link>
        <h1 className="atr-title er-title">Edit Report</h1>
        <p className="er-sub">Update compliance details and verify active documentation for this record</p>
        <form className="atr-card" onSubmit={(e) => { e.preventDefault(); back(); }}>
          <h2 className="er-h">STAFF ASSIGNMENT</h2>
          <div className="atr-grid">
            <div className="atr-field"><span>Staff Member</span><StaffDropdown value={staff} onChange={setStaff} /></div>
            <div className="atr-field"><span>Category</span><CategoryDropdown value={category} onChange={setCategory} /></div>
          </div>
          <hr className="er-rule" />
          <h2 className="er-h">REPORT INFORMATION</h2>
          <label className="atr-field">Report Name<input defaultValue={rec.report} required /></label>
          <div className="er-grid3">
            <label className="atr-field">Date Filed<span className="er-icon-field"><Calendar size={15} aria-hidden="true" /><input defaultValue={rec.filed} /></span></label>
            <label className="atr-field">Due Date<span className="er-icon-field"><Calendar size={15} aria-hidden="true" /><input defaultValue={rec.due} /></span></label>
            <label className="atr-field">Status<span className="er-icon-field"><CircleCheck size={15} aria-hidden="true" /><ProductSelect defaultValue={rec.status}><option>Filed</option><option>In Review</option><option>Closed</option></ProductSelect></span></label>
          </div>
          <hr className="er-rule" />
          <h2 className="er-h">DOCUMENT ATTACHMENT</h2>
          <div className="er-file">
            <span className="er-file-icon"><FileText size={18} aria-hidden="true" /></span>
            <span className="er-file-text"><b>{fileName}</b><small>PDF Document • 2.4 MB • Uploaded on {rec.filed}</small></span>
            <button type="button" className="er-replace" onClick={() => fileRef.current?.click()}><Upload size={14} aria-hidden="true" />Replace File</button>
            <input ref={fileRef} type="file" hidden accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => { const f = e.target.files?.[0]; if (f) setFileName(f.name); }} />
          </div>
          <hr className="er-rule" />
          <div className="er-actions">
            <button type="button" className="er-delete" onClick={() => { if (window.confirm(`Delete ${rec.report}?`)) back(); }}><Trash2 size={14} aria-hidden="true" />Delete Record</button>
            <div className="atr-actions"><Link to="/staff-records" className="atr-cancel">Cancel</Link><button type="submit" className="atr-save">Save Changes</button></div>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
