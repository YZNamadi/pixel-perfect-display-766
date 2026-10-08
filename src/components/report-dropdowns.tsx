import { useEffect, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, Check, ChevronUp, Cog, FileText, Flame, Leaf, Search, Shield, XCircle } from "lucide-react";

export const staffOptions = [
  { name: "Alex Rowe", role: "Facility Lead" },
  { name: "Maria Chen", role: "Safety Officer" },
  { name: "James Okafor", role: "Maintenance Supervisor" },
  { name: "Sarah Kim", role: "Operations Manager" },
  { name: "David Patel", role: "Site Inspector" },
  { name: "Lisa Thompson", role: "Compliance Coordinator" },
];

export const categoryOptions: { label: string; icon: ReactNode }[] = [
  { label: "Health & Safety", icon: <Shield size={16} /> },
  { label: "Environmental", icon: <Leaf size={16} /> },
  { label: "Fire Safety", icon: <Flame size={16} /> },
  { label: "Equipment Maintenance", icon: <Cog size={16} /> },
  { label: "Incident Report", icon: <AlertTriangle size={16} /> },
  { label: "Compliance Audit", icon: <FileText size={16} /> },
];

function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) close(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open, close]);
  return ref;
}

const initialsOf = (n: string) => n.split(" ").map((p) => p[0]).join("");

export function StaffDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useDismiss(open, () => setOpen(false));
  const current = staffOptions.find((s) => s.name === value) ?? { name: value, role: "" };
  const list = staffOptions.filter((s) => `${s.name} ${s.role}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="rdd" ref={ref}>
      <button type="button" className={`rdd-trigger rdd-tall${open ? " is-open" : ""}`} aria-haspopup="listbox" aria-expanded={open} aria-label="Staff member" onClick={() => setOpen((o) => !o)}>
        <span className="rdd-avatar" aria-hidden="true">{initialsOf(current.name)}</span>
        <span className="rdd-two"><b>{current.name}</b><small>{current.role}</small></span>
        <ChevronUp size={16} className="rdd-chev" aria-hidden="true" />
      </button>
      {open && (
        <div className="rdd-menu">
          <div className="rdd-search">
            <Search size={15} aria-hidden="true" />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search staff" aria-label="Search staff" />
            {q && <button type="button" aria-label="Clear search" onClick={() => setQ("")}><XCircle size={15} /></button>}
          </div>
          <ul role="listbox" className="rdd-list">
            {list.map((s) => (
              <li key={s.name} role="option" aria-selected={s.name === value}>
                <button type="button" className="rdd-opt rdd-opt-tall" onClick={() => { onChange(s.name); setOpen(false); setQ(""); }}>
                  <span className="rdd-avatar" aria-hidden="true">{initialsOf(s.name)}</span>
                  <span className="rdd-two"><b>{s.name}</b><small>{s.role}</small></span>
                  {s.name === value && <Check size={16} className="rdd-check" aria-hidden="true" />}
                </button>
              </li>
            ))}
            {list.length === 0 && <li className="rdd-empty">No staff found</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

export function CategoryDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const current = categoryOptions.find((c) => c.label === value) ?? categoryOptions[0]!;
  return (
    <div className="rdd" ref={ref}>
      <button type="button" className={`rdd-trigger${open ? " is-open" : ""}`} aria-haspopup="listbox" aria-expanded={open} aria-label="Category" onClick={() => setOpen((o) => !o)}>
        <span className="rdd-ico" aria-hidden="true">{current.icon}</span>
        <span className="rdd-label">{current.label}</span>
        <ChevronUp size={16} className="rdd-chev" aria-hidden="true" />
      </button>
      {open && (
        <ul role="listbox" className="rdd-menu rdd-list">
          {categoryOptions.map((c) => (
            <li key={c.label} role="option" aria-selected={c.label === value}>
              <button type="button" className={`rdd-opt${c.label === value ? " is-sel" : ""}`} onClick={() => { onChange(c.label); setOpen(false); }}>
                <span className="rdd-ico" aria-hidden="true">{c.icon}</span>
                <span className="rdd-label">{c.label}</span>
                {c.label === value && <Check size={16} className="rdd-check" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
