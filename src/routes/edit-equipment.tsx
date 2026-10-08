import { ProductSelect } from "@/components/product-select";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Barcode, ChevronDown } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export const Route = createFileRoute("/edit-equipment")({
  head: () => ({ meta: [
    { title: "Edit Equipment | Kearly" },
    { name: "description", content: "Update Defibrillator AED Plus equipment details, location, technician assignment and preventative maintenance schedule." },
    { property: "og:title", content: "Edit Equipment | Kearly" },
    { property: "og:description", content: "Edit medical equipment asset information and its PPM schedule in Kearly." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: EditEquipmentPage,
});

function EditEquipmentPage() {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  return <AppShell active="Equipment"><div className="ee-page">
    <Link to="/equipment-detail" className="ed-back"><ArrowLeft size={15} aria-hidden="true" />Back to Equipment Detail</Link>
    <header className="ee-header"><h1>Edit Equipment</h1><p>Update details for Defibrillator AED Plus</p></header>
    <form className="ee-form" onSubmit={(event) => { event.preventDefault(); navigate({ to: "/equipment-detail" }); }}>
      <div className="ee-form-body">
        <section aria-labelledby="ee-details"><h2 id="ee-details">Equipment Details</h2><div className="ee-grid">
          <label className="ee-field"><span>Equipment Name <em>*</em></span><input name="name" required defaultValue="Defibrillator AED Plus" /></label>
          <label className="ee-field"><span>Serial Number <em>*</em></span><input name="serial" required defaultValue="SN-DEF-2024-0847" /></label>
          <label className="ee-field"><span>Barcode</span><div className="ee-input-icon"><Barcode size={18} aria-hidden="true" /><input name="barcode" defaultValue="BC-DEF-0847-RC" /></div></label>
          <label className="ee-field"><span>Category <em>*</em></span><div className="ee-select"><ProductSelect name="category" required defaultValue="Emergency"><option>Emergency</option><option>Patient Handling</option><option>Respiratory</option><option>Diagnostics</option><option>Infusion</option><option>Ward Furniture</option><option>Furniture</option></ProductSelect><ChevronDown size={17} aria-hidden="true" /></div></label>
          <label className="ee-field"><span>Manufacturer</span><input name="manufacturer" defaultValue="Zoll Medical" /></label>
          <label className="ee-field"><span>Model</span><input name="model" defaultValue="AED Plus" /></label>
        </div></section>
        <section aria-labelledby="ee-location"><h2 id="ee-location">Location &amp; Assignment</h2><div className="ee-grid ee-grid-three">
          <label className="ee-field"><span>Site <em>*</em></span><div className="ee-select"><ProductSelect name="site" required defaultValue="Riverside Court">{["Riverside Court", "Victoria Wharf", "Maple Business Park", "Kingsway Tower", "Northgate House", "Elmwood Court"].map((site) => <option key={site}>{site}</option>)}</ProductSelect><ChevronDown size={17} aria-hidden="true" /></div></label>
          <label className="ee-field"><span>Floor / Ward</span><input name="floor" defaultValue="Ground Floor - Reception" /></label>
          <label className="ee-field"><span>Assigned Technician</span><div className="ee-select"><ProductSelect name="technician" defaultValue="Sarah Jones"><option>Sarah Jones</option><option>James Carter</option><option>David Vance</option><option>Michael Finch</option></ProductSelect><ChevronDown size={17} aria-hidden="true" /></div></label>
        </div></section>
        <section aria-labelledby="ee-ppm"><h2 id="ee-ppm">PPM Schedule</h2><div className="ee-grid">
          <label className="ee-field"><span>PPM Frequency <em>*</em></span><div className="ee-select"><ProductSelect name="frequency" required defaultValue="Quarterly"><option>Monthly</option><option>Quarterly</option><option>6 Months</option><option>Annually</option></ProductSelect><ChevronDown size={17} aria-hidden="true" /></div></label>
          <label className="ee-field"><span>Next Due Date <em>*</em></span><input name="nextDue" required type="date" defaultValue="2024-07-15" /></label>
          <label className="ee-field ee-full"><span>Notes / Special Instructions</span><textarea name="notes" defaultValue="Wall-mounted unit near main entrance. Check pads expiry and battery level during each service." /></label>
        </div></section>
      </div>
      <footer className="ee-footer"><Button type="button" variant="destructive" className="ee-delete" onClick={() => setDeleteOpen(true)}>Delete Equipment</Button><div className="ee-footer-right"><Button asChild variant="outline" className="ee-cancel"><Link to="/equipment-detail">Cancel</Link></Button><Button type="submit" className="ee-save">Save Changes</Button></div></footer>
    </form>
    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}><DialogContent><DialogTitle>Delete Equipment</DialogTitle><DialogDescription>Delete Defibrillator AED Plus? This action cannot be undone.</DialogDescription><DialogFooter><Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button><Button variant="destructive" onClick={() => { setDeleteOpen(false); navigate({ to: "/equipment" }); }}>Delete Equipment</Button></DialogFooter></DialogContent></Dialog>
  </div></AppShell>;
}