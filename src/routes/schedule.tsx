import { useEffect, useRef, useState } from "react";
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
  X,
  XCircle,
  UploadCloud,
  CheckSquare,
  FileText,
  Check,
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
  { label: "Team", icon: Users, to: "/team-members" as const },
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

type Cell = { key: string; day: number; muted: boolean; date: Date };

function buildCells(year: number, month: number): Cell[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // Monday-first grid
  const start = new Date(year, month, 1 - offset);
  const out: Cell[] = [];
  for (let i = 0; i < 42; i += 1) {
    const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    out.push({ key: iso(day), day: day.getDate(), muted: day.getMonth() !== month, date: day });
    if (i >= 27 && day.getDay() === 0) {
      const next = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
      if (next.getMonth() !== month) break;
    }
  }
  return out;
}

function buildWeekCells(anchor: Date): Cell[] {
  const offset = (anchor.getDay() + 6) % 7;
  const monday = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() - offset);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + index);
    return { key: iso(date), day: date.getDate(), muted: false, date };
  });
}

type EventStatus = "allocated" | "completed" | "due" | "approaching" | "failed";
type CalendarEvent = { category: Category; status: EventStatus };

const julyEvents: Record<number, CalendarEvent[]> = {
  1: [{ category: categories[0]!, status: "due" }, { category: categories[1]!, status: "approaching" }],
  2: [{ category: { ...categories[0]!, title: "Water Temp Log Check" }, status: "completed" }, { category: { ...categories[1]!, title: "Monthly Emergency Light" }, status: "completed" }],
  3: [{ category: categories[1]!, status: "approaching" }],
  4: [{ category: categories[2]!, status: "failed" }],
  5: [{ category: categories[3]!, status: "due" }],
  6: [{ category: categories[4]!, status: "allocated" }],
  7: [{ category: categories[5]!, status: "allocated" }],
};

const statusCycle: EventStatus[] = ["failed", "approaching", "failed", "due", "allocated", "allocated"];

function eventsForDate(date: Date): CalendarEvent[] {
  if (date.getFullYear() === 2024 && date.getMonth() === 6 && julyEvents[date.getDate()]) {
    return julyEvents[date.getDate()]!;
  }
  const day = date.getDate();
  return [{ category: categoryForDay(day), status: statusCycle[(day - 1) % statusCycle.length]! }];
}

const views = ["Month", "Week", "Day"] as const;

function SchedulePage() {
  const today = new Date();
  const todayKey = iso(today);
  const [view, setView] = useState<(typeof views)[number]>("Month");
  const [cursor, setCursor] = useState(() => new Date(2024, 6, 1));
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [jumpDate, setJumpDate] = useState("2024-07-01");
  const [selectedDayKey, setSelectedDayKey] = useState("2024-07-02");
  const [selected, setSelected] = useState<{ key: string; event: Category } | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("High");
  const [tag, setTag] = useState("Water Safety");
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [editPriority, setEditPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [editTag, setEditTag] = useState("Water Safety");
  const [editNotice, setEditNotice] = useState(7);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closePicker = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) setDatePickerOpen(false);
    };
    document.addEventListener("mousedown", closePicker);
    return () => document.removeEventListener("mousedown", closePicker);
  }, []);


  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const cells = view === "Month" ? buildCells(year, month) : view === "Week" ? buildWeekCells(cursor) : [{ key: iso(cursor), day: cursor.getDate(), muted: false, date: cursor }];
  const monthName = monthNames[month] ?? "January";
  const monthLabel = `${monthName.slice(0, 3)} ${year}`;
  const visibleWeekdays = view === "Month" ? weekdays : cells.map((cell) => weekdays[(cell.date.getDay() + 6) % 7]!);

  const goToDate = () => {
    const [targetYear, targetMonth, targetDay] = jumpDate.split("-").map(Number);
    if (!targetYear || !targetMonth || !targetDay) return;
    const target = new Date(targetYear, targetMonth - 1, targetDay);
    setCursor(target);
    setSelectedDayKey(iso(target));
    setDatePickerOpen(false);
  };

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
          <div className="po-topbar-actions sc-toolbar">
            <div className="po-search">
              <Search size={15} aria-hidden="true" />
              <input type="search" placeholder="Search..." aria-label="Search events" />
            </div>
            <div className="sc-date-picker" ref={datePickerRef}>
              <button
                type="button"
                className="sc-month-button"
                onClick={() => setDatePickerOpen((open) => !open)}
                aria-haspopup="dialog"
                aria-expanded={datePickerOpen}
              >
                <Calendar size={14} aria-hidden="true" />
                {monthLabel}
              </button>
              {datePickerOpen && (
                <div className="sc-date-popover" role="dialog" aria-label="Go to any date">
                  <label htmlFor="sc-jump-date">Go to date</label>
                  <input id="sc-jump-date" type="date" value={jumpDate} onChange={(event) => setJumpDate(event.target.value)} />
                  <div className="sc-date-actions">
                    <button
                      type="button"
                      className="sc-date-today"
                      onClick={() => {
                        setJumpDate(todayKey);
                        setCursor(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
                        setSelectedDayKey(todayKey);
                        setDatePickerOpen(false);
                      }}
                    >
                      Today
                    </button>
                    <button type="button" className="sc-date-go" onClick={goToDate}>Go</button>
                  </div>
                </div>
              )}
            </div>
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

        <div className="sc-legend" aria-label="Event status legend">
          <span className="is-allocated">Allocated</span>
          <span className="is-completed">Completed</span>
          <span className="is-due">Due</span>
          <span className="is-approaching">Approaching</span>
          <span className="is-failed">Failed</span>
        </div>

        <section className={`sc-calendar is-${view.toLowerCase()}`} aria-label={`${monthLabel} schedule`}>
          <div className="sc-week-head">
            {visibleWeekdays.map((day, index) => (
              <span key={`${day}-${index}`}>{day}</span>
            ))}
          </div>
          <div className="sc-grid">
            {cells.map((cell) => {
              const events = cell.muted ? [] : eventsForDate(cell.date);
              return (
                <div
                  key={cell.key}
                  className={`sc-cell ${cell.muted ? "is-muted" : ""} ${cell.key === selectedDayKey ? "is-selected" : ""}`}
                  onClick={() => {
                    if (!cell.muted) setSelectedDayKey(cell.key);
                  }}
                >
                  {!cell.muted && (
                    <>
                      <div className="sc-cell-head"><span className="sc-date">{cell.day}</span></div>
                      {events.map(({ category, status }, eventIndex) => (
                        <button
                          type="button"
                          key={`${cell.key}-${category.title}-${eventIndex}`}
                          className={`sc-event is-${status}`}
                          onClick={() =>
                            setSelected(selected?.key === `${cell.key}-${eventIndex}` ? null : { key: `${cell.key}-${eventIndex}`, event: category })
                          }
                        >
                          {category.title}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {selected && selected.event.tone === "lifts" && (
        <div className="cp-overlay" role="presentation" onClick={() => setSelected(null)}>
          <div
            className="sd-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selected.event.title}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sd-head">
              <div className="sd-badges">
                <span className="sc-tag is-lifts">LIFTS &amp; LOLER</span>
                <span className="sd-chip">INSPECTION</span>
              </div>
              <button type="button" className="sd-close" aria-label="Close" onClick={() => setSelected(null)}>
                <XCircle size={20} aria-hidden="true" />
              </button>
            </div>

            <h2 className="sd-title">Lift LOLER Safety Inspection</h2>
            <p className="sd-meta">Recurrence: Every 6 Months (Regulatory SLA)</p>

            <div className="sd-grid">
              <div className="sd-cell">
                <span className="sd-label">INSPECTOR</span>
                <span className="sd-value sd-person">
                  <span className="cl-avatar" aria-hidden="true">
                    SJ
                  </span>
                  Sarah Jenkins
                </span>
              </div>
              <div className="sd-cell">
                <span className="sd-label">SCHEDULED TIME</span>
                <span className="sd-value">Jul 15, 2024 @ 10:00 AM</span>
              </div>
              <div className="sd-cell">
                <span className="sd-label">LOCATION</span>
                <span className="sd-value">Main Building, Elevator Shaft B</span>
              </div>
              <div className="sd-cell">
                <span className="sd-label">SLA CLASS</span>
                <span className="sd-value sd-sla">LOLER 1998 Regulation 9</span>
              </div>
            </div>

            <div className="sd-checklist">
              <span className="sd-label">PRE-INSPECTION CHECKLIST</span>
              <ul>
                {[
                  { text: "Verify weight limit tags and emergency alarm operability", done: true },
                  { text: "Examine suspension ropes & chains for microscopic wear", done: true },
                  { text: "Test backup battery reserves and emergency lighting", done: false },
                ].map((item) => (
                  <li key={item.text}>
                    <CheckSquare size={16} className={item.done ? "sd-check-on" : "sd-check-off"} aria-hidden="true" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sd-cell sd-block">
              <span className="sd-label">ATTACHED DOCUMENTS</span>
              <div className="sd-doc">
                <FileText size={16} aria-hidden="true" />
                <span>Prior_LOLER_Cert_BlockB_Jan2024.pdf</span>
                <small>1.4 MB</small>
              </div>
            </div>

            <div className="sd-actions">
              <div className="sd-actions-left">
                <button
                  type="button"
                  className="cp-modal-cancel"
                  onClick={() => {
                    setEditTag(tagForTone[selected.event.tone]);
                    setEditPriority("Medium");
                    setEditNotice(7);
                    setEditTarget(selected.event);
                    setSelected(null);
                  }}
                >
                  Edit Event
                </button>
                <button type="button" className="sd-delete" onClick={() => setSelected(null)}>
                  Cancel Event
                </button>
              </div>
              <button type="button" className="sd-dark" onClick={() => setSelected(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {selected && selected.event.tone !== "lifts" && (

        <div className="cp-overlay" role="presentation" onClick={() => setSelected(null)}>
          <div
            className="sd-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selected.event.title}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sd-head">
              <div className="sd-badges">
                <span className={`sc-tag is-${selected.event.tone}`}>{selected.event.tag}</span>
                <span className="sd-overdue">OVERDUE</span>
              </div>
              <button type="button" className="sd-close" aria-label="Close" onClick={() => setSelected(null)}>
                <XCircle size={20} aria-hidden="true" />
              </button>
            </div>

            <h2 className="sd-title">{selected.event.title}</h2>
            <p className="sd-meta">Created by System Automation on Jul 1, 2024</p>

            <div className="sd-grid">
              <div className="sd-cell">
                <span className="sd-label">ASSIGNED TO</span>
                <span className="sd-value sd-person">
                  <span className="cl-avatar" aria-hidden="true">
                    MA
                  </span>
                  {selected.event.owner}
                </span>
              </div>
              <div className="sd-cell">
                <span className="sd-label">DUE DATE</span>
                <span className="sd-value sd-due">Jul 10, 2024 (2 days ago)</span>
              </div>
              <div className="sd-cell">
                <span className="sd-label">PRIORITY</span>
                <span className="sd-value sd-priority">
                  <span className="sd-dot" aria-hidden="true" />
                  High Importance
                </span>
              </div>
              <div className="sd-cell">
                <span className="sd-label">REFERENCE REGULATION</span>
                <span className="sd-value">ACOP L8 / HSG274</span>
              </div>
            </div>

            <div className="sd-notes">
              <span className="sd-notes-title">Notes / Instructions</span>
              <p>
                Please check temperatures at sentinel outlets. Hot water should reach at least 50&deg;C
                (55&deg;C in healthcare) within one minute of running. Cold water should be below 20&deg;C
                within two minutes.
              </p>
            </div>

            <div className="sd-cell sd-block">
              <span className="sd-label">COMPLETION DATE</span>
              <span className="sd-value sd-muted">Not yet completed</span>
            </div>

            <div className="sd-cell sd-block">
              <label className="sd-label" htmlFor="sd-notes-input">
                NOTES
              </label>
              <textarea id="sd-notes-input" className="ct-textarea" placeholder="Add completion notes..." rows={3} />
            </div>

            <div className="sd-cell sd-block">
              <span className="sd-label">UPLOAD EVIDENCE OF COMPLETION</span>
              <div className="sd-upload">
                <UploadCloud size={20} aria-hidden="true" />
                <strong>Upload Evidence of Completion</strong>
                <small>Drag &amp; drop files or click to browse</small>
              </div>
            </div>

            <div className="sd-activity">
              <span className="sd-label">ACTIVITY &amp; COMMENTS</span>
              <div className="sd-comment">
                <span className="cl-avatar" aria-hidden="true">
                  MA
                </span>
                <div>
                  <p>
                    <strong>Marcus Aurelius</strong> left a comment:
                  </p>
                  <p className="sd-quote">
                    &ldquo;Delayed checking today due to water main maintenance on site. Rescheduling for
                    first thing tomorrow.&rdquo;
                  </p>
                  <small>Jul 11, 2024 at 4:32 PM</small>
                </div>
              </div>
            </div>

            <div className="sd-actions">
              <div className="sd-actions-left">
                <button
                  type="button"
                  className="cp-modal-cancel"
                  onClick={() => {
                    setEditTag(tagForTone[selected.event.tone]);
                    setEditPriority("Medium");
                    setEditNotice(7);
                    setEditTarget(selected.event);
                    setSelected(null);
                  }}
                >
                  Edit Task
                </button>
                <button type="button" className="sd-delete" onClick={() => setSelected(null)}>
                  Delete
                </button>
              </div>
              <button type="button" className="sd-complete" onClick={() => setSelected(null)}>
                <Check size={15} aria-hidden="true" />
                Mark Complete
              </button>
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
                Schedule Compliance Event
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
                  Event Name <span className="sa-req">*</span>
                </label>
                <input
                  id="sa-title"
                  className="sa-input"
                  placeholder="e.g., Annual Lift LOLER Certification"
                  required
                />
              </div>

              <div className="sa-row">
                <div className="sa-field">
                  <label className="sa-label" htmlFor="sa-type">
                    Event Type <span className="sa-req">*</span>
                  </label>
                  <select id="sa-type" className="sa-input" defaultValue="Inspection">
                    <option>Inspection</option>
                    <option>Servicing</option>
                    <option>Certification</option>
                    <option>Testing</option>
                    <option>Audit</option>
                  </select>
                </div>
                <div className="sa-field">
                  <label className="sa-label" htmlFor="sa-location">
                    Location / Building <span className="sa-req">*</span>
                  </label>
                  <input id="sa-location" className="sa-input" placeholder="e.g., Block B Lift A" required />
                </div>
              </div>

              <div className="sa-row">
                <div className="sa-field">
                  <label className="sa-label" htmlFor="sa-due">
                    Date <span className="sa-req">*</span>
                  </label>
                  <input id="sa-due" type="date" className="sa-input" required />
                </div>
                <div className="sa-field">
                  <label className="sa-label" htmlFor="sa-time">
                    Time Range
                  </label>
                  <select id="sa-time" className="sa-input" defaultValue="10:00 AM - 12:00 PM">
                    <option>08:00 AM - 10:00 AM</option>
                    <option>10:00 AM - 12:00 PM</option>
                    <option>01:00 PM - 03:00 PM</option>
                    <option>03:00 PM - 05:00 PM</option>
                    <option>All day</option>
                  </select>
                </div>
              </div>

              <div className="sa-row">
                <div className="sa-field">
                  <label className="sa-label" htmlFor="sa-recurrence">
                    Recurrence
                  </label>
                  <select id="sa-recurrence" className="sa-input" defaultValue="Monthly">
                    <option>Does not repeat</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Bi-Annually</option>
                    <option>Annually</option>
                  </select>
                </div>
                <div className="sa-field">
                  <label className="sa-label" htmlFor="sa-assign">
                    Assigned Team Member
                  </label>
                  <select id="sa-assign" className="sa-input" defaultValue="Sarah Jenkins (Senior Inspector)">
                    <option>Sarah Jenkins (Senior Inspector)</option>
                    <option>Alex Rowe</option>
                    <option>James Carter</option>
                    <option>Michael Finch</option>
                  </select>
                </div>
              </div>

              <div className="sa-field">
                <span className="sa-label">Compliance Category</span>
                <div className="sa-tags" role="group" aria-label="Compliance category">
                  {[
                    { name: "Water Safety", dot: "#15803D" },
                    { name: "Fire Safety", dot: "#D97706" },
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
                  Special Instructions / Notes
                </label>
                <textarea
                  id="sa-notes"
                  className="sa-input sa-textarea"
                  rows={2}
                  placeholder="Enter special preparation notes, access codes, or regulatory guidelines..."
                />
              </div>

              <div className="sa-actions">
                <button type="button" className="sa-cancel" onClick={() => setAddOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="sa-save">
                  Schedule Event
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {editTarget && (
        <div className="cp-overlay" role="presentation" onClick={() => setEditTarget(null)}>
          <div
            className="sa-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="se-edit-heading"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sa-head">
              <h2 className="sa-heading" id="se-edit-heading">
                Edit Compliance Task
              </h2>
              <button type="button" className="sa-close" aria-label="Close" onClick={() => setEditTarget(null)}>
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <form
              className="sa-body"
              onSubmit={(event) => {
                event.preventDefault();
                setEditTarget(null);
              }}
            >
              <div className="sa-field">
                <label className="sa-label" htmlFor="ed-title">
                  Task Title <span className="sa-req">*</span>
                </label>
                <input
                  id="ed-title"
                  className="sa-input"
                  defaultValue={`${editTarget.title} Check`}
                  required
                />
              </div>

              <div className="sa-field">
                <label className="sa-label" htmlFor="ed-equipment">
                  Specific Equipment
                </label>
                <input id="ed-equipment" className="sa-input" placeholder="e.g. Boiler Unit 3" />
              </div>

              <div className="sa-row">
                <div className="sa-field">
                  <label className="sa-label" htmlFor="ed-assign">
                    Assign To
                  </label>
                  <select id="ed-assign" className="sa-input" defaultValue="Marcus Aurelius (Lead Technician)">
                    <option>Marcus Aurelius (Lead Technician)</option>
                    <option>Alex Rowe</option>
                    <option>Sarah Jenkins</option>
                    <option>James Carter</option>
                    <option>Michael Finch</option>
                  </select>
                </div>
                <div className="sa-field">
                  <label className="sa-label" htmlFor="ed-due">
                    Due Date <span className="sa-req">*</span>
                  </label>
                  <input id="ed-due" type="date" className="sa-input" required />
                </div>
              </div>

              <div className="sa-field">
                <label className="sa-label" htmlFor="ed-frequency">
                  Frequency
                </label>
                <select id="ed-frequency" className="sa-input" defaultValue="Monthly">
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Every 6 Months</option>
                  <option>Annually</option>
                </select>
              </div>

              <div className="sa-field">
                <span className="sa-label">Notice Days</span>
                <div className="sa-priority" role="group" aria-label="Notice days">
                  {noticeDays.map((day) => (
                    <button
                      key={day}
                      type="button"
                      aria-pressed={editNotice === day}
                      className={`sa-pri ${editNotice === day ? "is-active is-medium" : ""}`}
                      onClick={() => setEditNotice(day)}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sa-field">
                <span className="sa-label">Priority Level</span>
                <div className="sa-priority" role="group" aria-label="Priority level">
                  {(["Low", "Medium", "High"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      aria-pressed={editPriority === level}
                      className={`sa-pri ${editPriority === level ? `is-active is-${level.toLowerCase()}` : ""}`}
                      onClick={() => setEditPriority(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sa-field">
                <span className="sa-label">Category / Tag</span>
                <div className="sa-tags" role="group" aria-label="Category">
                  {tagOptions.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      aria-pressed={editTag === item.name}
                      className={`sa-tag-btn ${editTag === item.name ? "is-active" : ""}`}
                      onClick={() => setEditTag(item.name)}
                    >
                      <span className="sa-dot" style={{ background: item.dot }} aria-hidden="true" />
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sa-field">
                <label className="sa-label" htmlFor="ed-notes">
                  Description / Notes
                </label>
                <textarea
                  id="ed-notes"
                  className="sa-input sa-textarea"
                  rows={3}
                  defaultValue="Routine sentinel outlet water temperature checks. Record values in Celsius for both hot and cold outlets to prevent Legionella proliferation. Report anomalies instantly."
                />
              </div>

              <div className="sa-actions sa-actions-split">
                <button type="button" className="sa-delete" onClick={() => setEditTarget(null)}>
                  Delete Task
                </button>
                <div className="sa-actions-right">
                  <button type="button" className="sa-cancel" onClick={() => setEditTarget(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="sa-save">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
