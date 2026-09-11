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
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  MoreVertical,
  X,
  Circle,
  Bell,
  UserCircle2,
} from "lucide-react";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Kearly | PPM Schedule" },
      {
        name: "description",
        content: "Calendar view of all scheduled planned preventive maintenance tasks across Kearly facilities.",
      },
      { property: "og:title", content: "Kearly | PPM Schedule" },
      {
        property: "og:description",
        content: "Calendar view of all scheduled planned preventive maintenance tasks across Kearly facilities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SchedulePage,
});

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const, active: true },
  { label: "Repairs", icon: Wrench },
  { label: "Assets", icon: Building2, to: "/assets" as const },
  { label: "Reports", icon: BarChart3 },
  { label: "Audit Log", icon: ScrollText },
  { label: "Settings", icon: Settings },
];

const weekdays = ["SUNDAY", "MON", "TUES", "WED", "THUR", "FRI", "SAT"];

type Ev = { title: string; tone: "active" | "due" | "critical" | "inactive"; reminder: string; owner: string };

type Cell = { key: string; label: string; muted?: boolean; events?: Ev[] };

const ev = (tone: Ev["tone"] = "active"): Ev => ({
  title: "Compliance Check",
  tone,
  reminder: "The day before by 10amm",
  owner: "Jane Doe",
});

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Sample scheduled tasks, keyed by real calendar date
const eventsByDate: Record<string, Ev[]> = {
  "2026-08-03": [ev("active")],
  "2026-08-07": [ev("active")],
  "2026-08-17": [ev("active"), ev("inactive")],
  "2026-08-19": [ev("inactive")],
  "2026-09-04": [ev("due")],
  "2026-09-15": [ev("critical")],
  "2026-09-23": [ev("active")],
  "2026-10-06": [ev("active")],
  "2026-10-20": [ev("due")],
};

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

function buildCells(year: number, month: number): Cell[] {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  const out: Cell[] = [];
  for (let i = 0; i < 42; i += 1) {
    const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const key = iso(day);
    out.push({
      key,
      label: String(day.getDate()),
      muted: day.getMonth() !== month,
      events: eventsByDate[key],
    });
    if (i >= 27 && day.getDay() === 6) {
      const next = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
      if (next.getMonth() !== month) break;
    }
  }
  return out;
}

const legend = [
  { label: "Active/Safe", tone: "active" },
  { label: "Due soon/Attention", tone: "due" },
  { label: "Critical/Overdue", tone: "critical" },
  { label: "Inactive/No data", tone: "inactive" },
];

const views = ["Month", "Week", "List"] as const;

function SchedulePage() {
  const [view, setView] = useState<(typeof views)[number]>("Month");
  const [selected, setSelected] = useState<{ cell: string; event: Ev } | null>(null);
  const today = new Date();
  const todayKey = iso(today);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const cells = buildCells(year, month);
  const monthLabel = `${monthNames[month]} ${year}`;
  const shiftMonth = (delta: number) => setCursor(new Date(year, month + delta, 1));

  return (
    <div className="db-shell">
      <aside className="db-sidebar">
        <Link to="/dashboard" className="db-logo" aria-label="Kearly">
          <svg width="28" height="28" viewBox="0 0 100 100" aria-hidden="true">
            <rect x="5" y="5" width="40" height="40" rx="10" fill="#4A7C6F" />
            <path d="M 55 5 L 95 5 L 95 45 Q 75 45 55 25 Z" fill="#4A7C6F" />
            <rect x="5" y="55" width="40" height="40" rx="10" fill="#4A7C6F" />
            <path d="M 55 55 Q 75 55 95 75 L 95 95 L 55 95 Z" fill="#4A7C6F" />
          </svg>
          <span className="db-logo-text">
            <span className="db-logo-name">KEARLY</span>
            <span className="db-logo-tag">Compliance. Automated &amp; Simplified.</span>
          </span>
        </Link>

        <Link to="/compliance" className="at-back" aria-label="Back to compliance">
          <ChevronLeft size={22} aria-hidden="true" />
        </Link>

        <nav className="db-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon, to, active }) =>
            to ? (
              <Link key={label} to={to} className={`db-nav-item ${active ? "is-active" : ""}`}>
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
                {active && <span className="db-nav-bar" aria-hidden="true" />}
              </Link>
            ) : (
              <button type="button" key={label} className="db-nav-item">
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </button>
            ),
          )}
        </nav>

        <div className="db-user">
          <span className="db-avatar" aria-hidden="true">
            JD
          </span>
          <span className="db-user-meta">
            <strong>Jane Doe</strong>
            <small>Practice Admin</small>
          </span>
        </div>
      </aside>

      <main className="db-main">
        <header className="am-head">
          <h1 className="db-title">PPM Schedule</h1>
          <p className="db-subtitle">Calender view for all scheduled PPM mentainance tasks</p>
        </header>

        <div className="ps-toolbar">
          <button type="button" className="ps-today">
            Today
          </button>
          <div className="ps-month-nav">
            <button type="button" className="ps-arrow" aria-label="Previous month">
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <strong className="ps-month">August 2026</strong>
            <button type="button" className="ps-arrow" aria-label="Next month">
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="ps-views" role="tablist" aria-label="Calendar view">
            {views.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={view === item}
                className={`ps-view ${view === item ? "is-active" : ""}`}
                onClick={() => setView(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <select className="ps-category" aria-label="Filter by category" defaultValue="all">
            <option value="all">All Category</option>
            <option value="hvac">HVAC</option>
            <option value="fire">Fire Safety</option>
            <option value="mechanical">Mechanical</option>
            <option value="electrical">Electrical</option>
            <option value="plumbing">Plumbing</option>
            <option value="security">Security</option>
          </select>
        </div>

        <section className="ps-calendar" aria-label="August 2026 schedule">
          <div className="ps-week-head">
            {weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="ps-grid">
            {cells.map((cell) => (
              <div key={cell.key} className={`ps-cell ${cell.muted ? "is-muted" : ""}`}>
                <span className="ps-date">{cell.label}</span>
                {cell.events?.map((event, index) => (
                  <button
                    type="button"
                    key={`${cell.key}-${index}`}
                    className={`ps-event is-${event.tone}`}
                    onClick={() =>
                      setSelected(
                        selected?.cell === `${cell.key}-${index}` ? null : { cell: `${cell.key}-${index}`, event },
                      )
                    }
                  >
                    {event.title}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </section>

        <div className="ps-legend">
          {legend.map(({ label, tone }) => (
            <span className="ps-legend-item" key={label}>
              <span className={`ps-dot is-${tone}`} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
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
              <Link to="/edit-task" className="ps-pop-btn" aria-label="Edit task">
                <Pencil size={18} aria-hidden="true" />
              </Link>
              <button type="button" className="ps-pop-btn" aria-label="Delete task">
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
                <Circle size={22} aria-hidden="true" className="ps-pop-ring" />
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
    </div>
  );
}
