import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";

export type BuildingTask = {
  name: string;
  system: string;
  due: string;
  priority: string;
  assignee: string;
  initials: string;
  tone: string;
  frequency?: string;
  category?: string;
  notes?: string;
};

const categories = [
  { label: "Water Safety", tone: "water" },
  { label: "Fire & Emergency", tone: "fire" },
  { label: "Gas Compliance", tone: "gas" },
  { label: "Lifts & LOLER", tone: "lifts" },
];

export function BuildingTaskDialog({ open, onOpenChange, onSave }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: BuildingTask) => void;
}) {
  const [priority, setPriority] = useState("High");
  const [category, setCategory] = useState("Water Safety");

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bt-overlay" />
        <Dialog.Content className="bt-dialog" aria-describedby={undefined}>
          <header className="bt-header">
            <Dialog.Title className="bt-title">Add New Task</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" className="bt-close" aria-label="Close add new task"><CircleX /></Button>
            </Dialog.Close>
          </header>
          <form className="bt-form" onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const assignee = String(data.get("assignee") ?? "");
            const due = String(data.get("due") ?? "");
            onSave({
              name: String(data.get("title") ?? "").trim(),
              system: String(data.get("system") ?? ""),
              due: new Date(`${due}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
              assignee,
              initials: assignee.split(" ").map((name) => name[0]).join(""),
              priority,
              tone: "green",
              frequency: String(data.get("frequency") ?? ""),
              category,
              notes: String(data.get("notes") ?? ""),
            });
            onOpenChange(false);
          }}>
            <label className="bt-field bt-full">
              <span>Task Title <em>*</em></span>
              <input name="title" required placeholder="e.g., Monthly Water Temp Log" />
            </label>
            <label className="bt-field">
              <span>System <em>*</em></span>
              <div className="bt-select"><select name="system" defaultValue="Electrical" required>
                <option>Electrical</option><option>Water Hygiene</option><option>Fire Safety</option><option>Gas Safety</option><option>Lifts & Lifting Gear</option>
              </select><ChevronDown size={14} /></div>
            </label>
            <label className="bt-field">
              <span>Assign To <em>*</em></span>
              <div className="bt-select"><select name="assignee" defaultValue="" required>
                <option value="" disabled>Select team member</option>
                <option>Alex Rowe</option><option>Sarah Jenkins</option><option>James Carter</option><option>Clara Oswald</option>
              </select><ChevronDown size={14} /></div>
            </label>
            <label className="bt-field">
              <span>Due Date <em>*</em></span>
              <input type="date" name="due" required aria-label="Due Date" />
            </label>
            <label className="bt-field">
              <span>Frequency <em>*</em></span>
              <div className="bt-select"><select name="frequency" defaultValue="Monthly" required>
                <option>Monthly</option><option>Weekly</option><option>Quarterly</option><option>Annually</option><option>One-off</option>
              </select><ChevronDown size={14} /></div>
            </label>
            <fieldset className="bt-full bt-options">
              <legend>Priority Level</legend>
              <div className="bt-priorities">
                {["Low", "Medium", "High"].map((value) => <Button key={value} type="button" variant="outline" className={`bt-priority ${priority === value ? `is-selected bt-${value.toLowerCase()}` : ""}`} aria-pressed={priority === value} onClick={() => setPriority(value)}>{value}</Button>)}
              </div>
            </fieldset>
            <fieldset className="bt-full bt-options">
              <legend>Category / Tag</legend>
              <div className="bt-tags">
                {categories.map(({ label, tone }) => <Button key={label} type="button" variant="outline" className={`bt-tag bt-tag-${tone} ${category === label ? "is-selected" : ""}`} aria-pressed={category === label} onClick={() => setCategory(label)}><span className="bt-dot" />{label}</Button>)}
              </div>
            </fieldset>
            <label className="bt-field bt-full">
              <span>Description / Notes</span>
              <textarea name="notes" placeholder="Add detailed instructions, reference standards, or compliance protocols here..." />
            </label>
            <footer className="bt-actions bt-full">
              <Dialog.Close asChild><Button type="button" variant="outline" className="bt-cancel">Cancel</Button></Dialog.Close>
              <Button type="submit" className="bt-save">Save Task</Button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}