import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShieldCheck,
  Wrench,
  Building2,
  BarChart3,
  ScrollText,
  Settings,
  CreditCard,
  Users,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  MoreVertical,
  X,
  Bell,
  UserCircle2,
  Stethoscope,
} from "lucide-react";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Kearly | Compliance Event Schedule" },
      {
        name: "description",
        content:
          "Monthly compliance event planner: water temperature logs, gas safety records, fire alarm services, lift inspections and asbestos re-inspections.",
      },
      { property: "og:title", content: "Kearly | Compliance Event Schedule" },
      {
        property: "og:description",
        content:
          "Monthly compliance event planner: water temperature logs, gas safety records, fire alarm services, lift inspections and asbestos re-inspections.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SchedulePage,
});

const overviewNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const, active: true },
  { label: "Equipment", icon: Stethoscope, to: "/equipment" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const, badge: "2" },
  { label: "Buildings", icon: Building2, to: "/assets" as const },
];

const governanceNav = [
  { label: "Reports", icon: BarChart3, to: "/reports" as const },
  { label: "Team", icon: Users, to: "/team" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
  { label: "Billing", icon: CreditCard, to: "/settings" as const },
];

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Category = {
  tag: string;
  title: string;
  tone: "water" | "emlt" | "gas" | "alarm" | "lifts" | "asb";
  reminder: string;
  owner: string;
};

const categories: Category[] = [
  { tag: "WATER", title: "Water Temp Log", tone: "water", reminder: "The day before by 10am", owner: "Sarah Jones" },
  { tag: "EM-LT", title: "Emergency Light", tone: "emlt", reminder: "The day before by 9am", owner: "James Carter" },
  { tag: "GAS", title: "Gas Safety Record", tone: "gas", reminder: "Two days before by 8am", owner: "Michael Finch" },
  { tag: "ALARM", title: "Fire Alarm Service", tone: "alarm", reminder: "The day before by 10am", owner: "David Vance" },
  { tag: "LIFTS", title: "Lift LOLER Inspection", tone: "lifts", reminder: "Three days before", owner: "James Carter" },
  { tag: "ASB", title: "Asbestos Re-inspection", tone: "asb", reminder: "A week before", owner: "Sarah Jones" },
];

const tagOptions = [
  { name: "Water Safety", dot: "#15803D" },
  { name: "Fire & Emergency", dot: "#D97706" },
  { name: "Gas Compliance", dot: "#DC2626" },
  { name: "Lifts & LOLER", dot: "#7C3AED" },
  { name: "Asbestos", dot: "#0D9488" },
];

const noticeDays = [1, 3, 5, 7, 21];

const tagForTone: Record<Category["tone"], string> = {
  water: "Water Safety",
  emlt: "Fire & Emergency",
  gas: "Gas Compliance",
  alarm: "Fire & Emergency",
  lifts: "Lifts & LOLER",
  asb: "Asbestos",
};


const categoryForDay = (day: number): Category => categories[(day - 1) % categories.length]!;

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

type Cell = { key: string; day: number; muted: boolean };

function buildCells(year: number, month: number): Cell[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // Monday-first grid
  const start = new Date(year, month, 1 - offset);
  const out: Cell[] = [];
  for (let i = 0; i < 42; i += 1) {
    const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    out.push({ key: iso(day), day: day.getDate(), muted: day.getMonth() !== month });
    if (i >= 27 && day.getDay() === 0) {
      const next = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
      if (next.getMonth() !== month) break;
    }
  }
  return out;
}

const views = ["Month", "Week", "Day"] as const;

function SchedulePage() {
  const today = new Date();
  const todayKey = iso(today);
  const [view, setView] = useState<(typeof views)[number]>("Month");
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<{ key: string; event: Category } | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("High");
  const [tag, setTag] = useState("Water Safety");
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [editPriority, setEditPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [editTag, setEditTag] = useState("Water Safety");
  const [editNotice, setEditNotice] = useState(7);


  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const cells = buildCells(year, month);
  const monthLabel = `${monthNames[month]} ${year}`;
  const shiftMonth = (delta: number) => setCursor(new Date(year, month + delta, 1));

  return (
    <div className="po-shell">
      <aside className="po-sidebar">
        <Link to="/dashboard" className="po-logo" aria-label="Kearly">
          <svg width="26" height="26" viewBox="0 0 100 100" aria-hidden="true">
            <rect x="5" y="5" width="40" height="40" rx="10" fill="#15803D" />
            <path d="M 55 5 L 95 5 L 95 45 Q 75 45 55 25 Z" fill="#15803D" />
            <rect x="5" y="55" width="40" height="40" rx="10" fill="#15803D" />
            <path d="M 55 55 Q 75 55 95 75 L 95 95 L 55 95 Z" fill="#15803D" />
          </svg>
          <span className="po-logo-text">
            <span className="po-logo-name">KEARLY</span>
            <span className="po-logo-tag">Compliance. Automated &amp; Simplified.</span>
          </span>
        </Link>

        <nav className="po-nav" aria-label="Main navigation">
          <p className="po-nav-label">OVERVIEW</p>
          {overviewNav.map(({ label, icon: Icon, to, active, badge }) => (
            <Link key={label} to={to} className={`po-nav-item ${active ? "is-active" : ""}`}>
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
              {badge ? <span className="po-nav-badge">{badge}</span> : null}
            </Link>
          ))}

          <p className="po-nav-label po-nav-label-gap">GOVERNANCE</p>
          {governanceNav.map(({ label, icon: Icon, to }) => (
            <Link key={label} to={to} className="po-nav-item">
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="po-sidebar-foot">
          <Link to="/settings" className="po-nav-item">
            <Settings size={17} aria-hidden="true" />
            <span>Settings</span>
          </Link>
          <div className="po-user">
            <span className="po-user-avatar" aria-hidden="true">
              AR
            </span>
            <span className="po-user-text">
              <span className="po-user-name">Alex Rowe</span>
              <span className="po-user-role">Portfolio admin</span>
            </span>
          </div>
        </div>
      </aside>

      <main className="po-main">
        <header className="po-topbar">
          <div>
            <h1 className="po-title">Schedule</h1>
            <p className="po-subtitle">Monthly Compliance Event Planner</p>
          </div>
          <div className="po-topbar-actions">
            <div className="po-search">
              <Search size={15} aria-hidden="true" />
              <input type="search" placeholder="Search..." aria-label="Search events" />
            </div>
            <span className="sc-month-chip">
              <button type="button" className="sc-arrow" aria-label="Previous month" onClick={() => shiftMonth(-1)}>
                <ChevronLeft size={14} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="sc-month-label"
                onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}
                title="Jump to today"
              >
                {monthLabel}
              </button>
              <button type="button" className="sc-arrow" aria-label="Next month" onClick={() => shiftMonth(1)}>
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            </span>
            <span className="po-chip">
              <Calendar size={14} aria-hidden="true" />
              All buildings
            </span>
            <div className="sc-views" role="tablist" aria-label="Calendar view">
              {views.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={view === item}
                  className={`sc-view ${view === item ? "is-active" : ""}`}
                  onClick={() => setView(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button type="button" className="po-download" onClick={() => setAddOpen(true)}>
              Add Event
            </button>
          </div>
        </header>

        <section className="sc-calendar" aria-label={`${monthLabel} schedule`}>
          <div className="sc-week-head">
            {weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="sc-grid">
            {cells.map((cell) => {
              const category = cell.muted ? null : categoryForDay(cell.day);
              return (
                <div
                  key={cell.key}
                  className={`sc-cell ${cell.muted ? "is-muted" : ""} ${cell.key === todayKey ? "is-today" : ""}`}
                >
                  {!cell.muted && (
                    <>
                      <div className="sc-cell-head">
                        <span className="sc-date">{cell.day}</span>
                        {category && <span className={`sc-tag is-${category.tone}`}>{category.tag}</span>}
                      </div>
                      {category && (
                        <button
                          type="button"
                          className={`sc-event is-${category.tone}`}
                          onClick={() =>
                            setSelected(selected?.key === cell.key ? null : { key: cell.key, event: category })
                          }
                        >
                          {category.title}
                        </button>
                      )}
                      {cell.day % 7 === 2 && category && (
                        <button
                          type="button"
                          className={`sc-event is-${categoryForDay(cell.day + 1).tone}`}
                          onClick={() =>
                            setSelected(
                              selected?.key === `${cell.key}-b`
                                ? null
                                : { key: `${cell.key}-b`, event: categoryForDay(cell.day + 1) },
                            )
                          }
                        >
                          {categoryForDay(cell.day + 1).title}
                        </button>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {selected && (
        <div className="ps-overlay" role="presentation" onClick={() => setSelected(null)}>
          <div
            className="ps-popover"
            role="dialog"
            aria-modal="true"
            aria-label={selected.event.title}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="ps-pop-actions">
              <Link to="/edit-task" className="ps-pop-btn" aria-label="Edit event">
                <Pencil size={18} aria-hidden="true" />
              </Link>
              <button type="button" className="ps-pop-btn" aria-label="Delete event">
                <Trash2 size={18} aria-hidden="true" />
              </button>
              <button type="button" className="ps-pop-btn" aria-label="More options">
                <MoreVertical size={18} aria-hidden="true" />
              </button>
              <button type="button" className="ps-pop-close" aria-label="Close" onClick={() => setSelected(null)}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="ps-pop-body">
              <p className="ps-pop-row">
                <span className={`sc-tag is-${selected.event.tone}`}>{selected.event.tag}</span>
                <span className="ps-pop-title">{selected.event.title}</span>
              </p>
              <p className="ps-pop-row">
                <Bell size={22} aria-hidden="true" />
                <span>{selected.event.reminder}</span>
              </p>
              <p className="ps-pop-row">
                <UserCircle2 size={22} aria-hidden="true" />
                <span>{selected.event.owner}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {addOpen && (
        <div className="cp-overlay" role="presentation" onClick={() => setAddOpen(false)}>
          <div
            className="sa-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sa-heading"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sa-head">
              <h2 className="sa-heading" id="sa-heading">
                Add Compliance Task
              </h2>
              <button type="button" className="sa-close" aria-label="Close" onClick={() => setAddOpen(false)}>
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <form
              className="sa-body"
              onSubmit={(event) => {
                event.preventDefault();
                setAddOpen(false);
              }}
            >
              <div className="sa-field">
                <label className="sa-label" htmlFor="sa-title">
                  Task Title <span className="sa-req">*</span>
                </label>
                <input id="sa-title" className="sa-input" placeholder="e.g., Monthly Water Temp Log" required />
              </div>

              <div className="sa-row">
                <div className="sa-field">
                  <label className="sa-label" htmlFor="sa-assign">
                    Assign To
                  </label>
                  <select id="sa-assign" className="sa-input" defaultValue="">
                    <option value="">Select team member</option>
                    <option>Alex Rowe</option>
                    <option>Sarah Jenkins</option>
                    <option>James Carter</option>
                    <option>Michael Finch</option>
                  </select>
                </div>
                <div className="sa-field">
                  <label className="sa-label" htmlFor="sa-due">
                    Due Date <span className="sa-req">*</span>
                  </label>
                  <input id="sa-due" type="date" className="sa-input" required />
                </div>
              </div>

              <div className="sa-field">
                <span className="sa-label">Priority Level</span>
                <div className="sa-priority" role="group" aria-label="Priority level">
                  {(["Low", "Medium", "High"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      aria-pressed={priority === level}
                      className={`sa-pri ${priority === level ? `is-active is-${level.toLowerCase()}` : ""}`}
                      onClick={() => setPriority(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sa-field">
                <span className="sa-label">Category / Tag</span>
                <div className="sa-tags" role="group" aria-label="Category">
                  {[
                    { name: "Water Safety", dot: "#15803D" },
                    { name: "Fire & Emergency", dot: "#D97706" },
                    { name: "Gas Compliance", dot: "#DC2626" },
                    { name: "Lifts & LOLER", dot: "#7C3AED" },
                    { name: "Asbestos", dot: "#0D9488" },
                  ].map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      aria-pressed={tag === item.name}
                      className={`sa-tag-btn ${tag === item.name ? "is-active" : ""}`}
                      onClick={() => setTag(item.name)}
                    >
                      <span className="sa-dot" style={{ background: item.dot }} aria-hidden="true" />
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sa-field">
                <label className="sa-label" htmlFor="sa-notes">
                  Description / Notes
                </label>
                <textarea
                  id="sa-notes"
                  className="sa-input sa-textarea"
                  rows={3}
                  placeholder="Add detailed instructions, reference standards, or compliance protocols here..."
                />
              </div>

              <div className="sa-actions">
                <button type="button" className="sa-cancel" onClick={() => setAddOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="sa-save">
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
