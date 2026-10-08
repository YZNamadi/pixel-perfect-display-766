import { ProductSelect } from "@/components/product-select";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";

export type SiteDetails = {
  name: string;
  type: string;
  address: string;
  phone: string;
  area: string;
  use: string;
  year: string;
  manager: string;
};

export function BuildingDetailsDialog({ open, onOpenChange, details, onSave }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: SiteDetails;
  onSave: (details: SiteDetails) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bt-overlay" />
        <Dialog.Content className="bt-dialog bs-dialog" aria-describedby={undefined}>
          <header className="bt-header">
            <Dialog.Title className="bt-title">Edit Site Details</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" className="bt-close" aria-label="Close edit site details"><CircleX /></Button>
            </Dialog.Close>
          </header>
          <form className="bt-form bs-form" onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const value = (key: string) => String(data.get(key) ?? "").trim();
            onSave({ name: value("name"), type: value("type"), address: value("address"), phone: value("phone"), area: value("area"), use: value("use"), year: value("year"), manager: value("manager") });
            onOpenChange(false);
          }}>
            <label className="bt-field bt-full"><span>Facility Name <em>*</em></span><input name="name" required defaultValue={details.name} /></label>
            <label className="bt-field bt-full"><span>Facility Type <em>*</em></span><div className="bt-select"><ProductSelect name="type" required defaultValue={details.type}>
              <option>{details.type}</option>
              {["Hospital", "Medical Center", "Residential Care Facility", "Commercial Building"].filter((type) => type !== details.type).map((type) => <option key={type}>{type}</option>)}
            </ProductSelect><ChevronDown size={14} /></div></label>
            <label className="bt-field bt-full"><span>Full Address <em>*</em></span><input name="address" required defaultValue={details.address} /></label>
            <label className="bt-field"><span>Contact Phone <em>*</em></span><input name="phone" type="tel" required defaultValue={details.phone} /></label>
            <label className="bt-field"><span>Gross Internal Area <em>*</em></span><input name="area" required defaultValue={details.area} /></label>
            <label className="bt-field"><span>Primary Use Type <em>*</em></span><input name="use" required defaultValue={details.use} /></label>
            <label className="bt-field"><span>Year Constructed <em>*</em></span><input name="year" required defaultValue={details.year} /></label>
            <label className="bt-field bt-full"><span>Site Manager <em>*</em></span><div className="bt-select"><ProductSelect name="manager" required defaultValue={details.manager}>
              {[details.manager, "Alex Rowe (Portfolio Admin)", "Sarah Jenkins", "James Carter", "Clara Oswald"].filter((manager, index, all) => all.indexOf(manager) === index).map((manager) => <option key={manager}>{manager}</option>)}
            </ProductSelect><ChevronDown size={14} /></div></label>
            <footer className="bt-actions bt-full">
              <Dialog.Close asChild><Button type="button" variant="outline" className="bt-cancel">Cancel</Button></Dialog.Close>
              <Button type="submit" className="bt-save">Save Changes</Button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}