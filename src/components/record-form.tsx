import { ProductSelect } from "@/components/product-select";
import { useNavigate } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";

type Kind = "equipment" | "repair" | "site";

const configs = {
  equipment: { title: "Add Equipment", subtitle: "Register a medical asset and its maintenance schedule", active: "Equipment", back: "/equipment" as const },
  repair: { title: "New Repair Ticket", subtitle: "Log a reactive maintenance issue", active: "Repairs", back: "/repairs" as const },
  site: { title: "Edit Site", subtitle: "Update Northgate House details", active: "Buildings", back: "/building" as const },
};

export function RecordForm({ kind, editing = false }: { kind: Kind; editing?: boolean }) {
  const navigate = useNavigate();
  const config = configs[kind];
  const title = editing && kind === "equipment" ? "Edit Equipment" : config.title;
  return <AppShell active={config.active}>
    <nav className="et-crumbs" aria-label="Breadcrumb"><button type="button" className="qa-link-button" onClick={() => navigate({ to: config.back })}>Back</button><span>/</span><span className="et-crumb-current">{title}</span></nav>
    <header className="qa-page-head"><h1 className="po-title">{title}</h1><p className="po-subtitle">{config.subtitle}</p></header>
    <form className="at-card qa-form" onSubmit={(event) => { event.preventDefault(); navigate({ to: config.back }); }}>
      {kind === "equipment" ? <>
        <div className="qa-form-grid"><label className="at-field"><span className="at-label">Equipment name</span><input className="at-input" required defaultValue={editing ? "Defibrillator AED Plus" : ""} /></label><label className="at-field"><span className="at-label">Serial number / barcode</span><input className="at-input" required defaultValue={editing ? "SN-DEF-2024-084" : ""} /></label></div>
        <div className="qa-form-grid"><label className="at-field"><span className="at-label">Category</span><ProductSelect className="at-input" defaultValue="Emergency"><option>Emergency</option><option>Patient Handling</option><option>Respiratory</option><option>Diagnostics</option><option>Infusion</option></ProductSelect></label><label className="at-field"><span className="at-label">Building location</span><ProductSelect className="at-input" defaultValue="Riverside Court"><option>Riverside Court</option><option>Victoria Wharf</option><option>Maple Business Park</option><option>Kingsway Tower</option><option>Northgate House</option><option>Elmwood Court</option></ProductSelect></label></div>
        <label className="at-field"><span className="at-label">Specifications</span><textarea className="at-input at-textarea" required defaultValue={editing ? "AED Plus with adult electrode pads and wall cabinet." : ""} /></label>
        <div className="qa-form-grid"><label className="at-field"><span className="at-label">PPM schedule</span><ProductSelect className="at-input"><option>Monthly</option><option>Quarterly</option><option>6 Months</option><option>Annually</option></ProductSelect></label><label className="at-field"><span className="at-label">Next due date</span><input className="at-input" type="date" required /></label></div>
      </> : kind === "repair" ? <>
        <label className="at-field"><span className="at-label">Ticket title</span><input className="at-input" required placeholder="Describe the repair" /></label>
        <div className="qa-form-grid"><label className="at-field"><span className="at-label">Building</span><ProductSelect className="at-input"><option>Northgate House</option><option>Riverside Court</option><option>Victoria Wharf</option><option>Elmwood Court</option></ProductSelect></label><label className="at-field"><span className="at-label">Priority</span><ProductSelect className="at-input"><option>P1 - Urgent</option><option>P2 - High</option><option>P3 - Routine</option></ProductSelect></label></div>
        <label className="at-field"><span className="at-label">Description</span><textarea className="at-input at-textarea" required /></label><label className="at-field"><span className="at-label">Assign to</span><ProductSelect className="at-input"><option>Michael Finch</option><option>James Carter</option><option>Sarah Jones</option><option>David Vance</option></ProductSelect></label>
      </> : <>
        <label className="at-field"><span className="at-label">Site name</span><input className="at-input" required defaultValue="Northgate House" /></label><label className="at-field"><span className="at-label">Full address</span><input className="at-input" required defaultValue="15-17 Tottenham Court Rd, London W1T 1BJ" /></label>
        <div className="qa-form-grid"><label className="at-field"><span className="at-label">Site manager</span><ProductSelect className="at-input"><option>Alex Rowe</option><option>Maya Patel</option></ProductSelect></label><label className="at-field"><span className="at-label">Primary use</span><ProductSelect className="at-input"><option>Clinical / NHS Rehabilitation</option><option>Administrative Office</option></ProductSelect></label></div>
        <div className="qa-form-grid"><label className="at-field"><span className="at-label">Contact phone</span><input className="at-input" type="tel" defaultValue="+44 (0) 20 7946 0192" /></label><label className="at-field"><span className="at-label">Gross internal area</span><input className="at-input" defaultValue="4,250 m²" /></label></div>
      </>}
      <div className="at-actions"><button type="button" className="at-cancel" onClick={() => navigate({ to: config.back })}>Cancel</button><button type="submit" className="at-next">{editing ? "Save Changes" : kind === "repair" ? "Create Ticket" : "Add Equipment"}</button></div>
    </form>
  </AppShell>;
}