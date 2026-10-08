import { ProductSelect } from "@/components/product-select";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutDashboard,
  ShieldCheck,
  Wrench,
  Building2,
  BarChart3,
  ScrollText,
  Settings,
  Users,
  Search,
  Calendar,
  ChevronDown,
  Eye,
  BadgeCheck,
  MoreVertical,
  Stethoscope,
} from "lucide-react";

import { KearlyLogo } from "@/components/kearly-logo";
import { downloadCsv } from "@/lib/download";
import { auditEvents, type AuditEvent } from "@/lib/audit-events";

export const Route = createFileRoute("/audit-log")({
  head: () => ({
    meta: [
      { title: "Kearly | System Audit Log" },
      {
        name: "description",
        content:
          "Comprehensive platform compliance history: every task, status change, contractor assignment and security escalation across your portfolio.",
      },
      { property: "og:title", content: "Kearly | System Audit Log" },
      {
        property: "og:description",
        content:
          "Comprehensive platform compliance history: every task, status change, contractor assignment and security escalation across your portfolio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuditLogPage,
});

const overviewNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Equipment", icon: Stethoscope, to: "/equipment" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const, badge: "2" },
  { label: "Buildings", icon: Building2, to: "/assets" as const },
];

const governanceNav = [
  { label: "Reports", icon: BarChart3, to: "/reports" as const },
  { label: "Team", icon: Users, to: "/team-members" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const, active: true },
];

type Event = AuditEvent;
const events = auditEvents;

function AuditLogPage() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState("All Users");
  const [action, setAction] = useState("All Actions");
  const [building, setBuilding] = useState("All buildings");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Event | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!openMenu) return;
    const onDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openMenu]);
  const filtered = useMemo(() => events.filter((event) => (user === "All Users" || event.user === user) && (action === "All Actions" || event.action === action) && (building === "All buildings" || event.entity === building) && (!query.trim() || `${event.user} ${event.action} ${event.details} ${event.entity}`.toLowerCase().includes(query.toLowerCase()))), [query, user, action, building]);
  const pageRows = filtered.slice((page - 1) * 4, page * 4);

  return (
    <div className="po-shell">
      <aside className="po-sidebar">
        <Link to="/dashboard" className="po-logo" aria-label="Kearly">
          <KearlyLogo className="po-logo-mark" />
          <span className="po-logo-text">
            <span className="po-logo-name">KEARLY</span>
            <span className="po-logo-tag">Compliance. Automated &amp; Simplified.</span>
          </span>
        </Link>

        <nav className="po-nav" aria-label="Main navigation">
          <p className="po-nav-label">OVERVIEW</p>
          {overviewNav.map(({ label, icon: Icon, to, badge }) => (
            <Link key={label} to={to} className="po-nav-item">
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
              {badge ? <span className="po-nav-badge">{badge}</span> : null}
            </Link>
          ))}

          <p className="po-nav-label po-nav-label-gap">GOVERNANCE</p>
          {governanceNav.map(({ label, icon: Icon, to, active }) => (
            <Link key={label} to={to} className={`po-nav-item ${active ? "is-active" : ""}`}>
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
            <h1 className="po-title">System Audit Log</h1>
            <p className="po-subtitle">Comprehensive platform compliance history</p>
          </div>
          <div className="po-topbar-actions">
            <div className="po-search">
              <Search size={15} aria-hidden="true" />
               <input type="search" placeholder="Search..." aria-label="Search audit events" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} />
            </div>
            <span className="po-chip">Jul 2024</span>
             <label className="po-chip qa-select-chip">
              <Calendar size={14} aria-hidden="true" />
               <ProductSelect aria-label="Filter audit log by building" value={building} onChange={(event) => { setBuilding(event.target.value); setPage(1); }}><option>All buildings</option>{Array.from(new Set(events.map((event) => event.entity).filter(Boolean))).map((item) => <option key={item}>{item}</option>)}</ProductSelect>
              <ChevronDown size={13} aria-hidden="true" />
             </label>
             <button type="button" className="po-download" onClick={() => downloadCsv("kearly-audit-log.csv", [["Timestamp", "User", "Action", "Details", "Entity"], ...filtered.map((event) => [event.time, event.user, event.action, event.details, event.entity])])}>
              Export CSV
            </button>
          </div>
        </header>

        <div className="rp-filters">
           <label className="rp-filter qa-filter-select">User: <ProductSelect aria-label="Filter audit log by user" value={user} onChange={(event) => { setUser(event.target.value); setPage(1); }}><option>All Users</option>{Array.from(new Set(events.map((event) => event.user))).map((item) => <option key={item}>{item}</option>)}</ProductSelect>
            <ChevronDown size={13} aria-hidden="true" />
           </label>
           <label className="rp-filter qa-filter-select">Action Type: <ProductSelect aria-label="Filter audit log by action" value={action} onChange={(event) => { setAction(event.target.value); setPage(1); }}><option>All Actions</option>{Array.from(new Set(events.map((event) => event.action))).map((item) => <option key={item}>{item}</option>)}</ProductSelect>
            <ChevronDown size={13} aria-hidden="true" />
           </label>
        </div>

        <section className="cl-panel" aria-label="Audit events">
          <div className="cl-table-wrap">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>TIMESTAMP</th>
                  <th>USER</th>
                  <th>ACTION</th>
                  <th>DETAILS</th>
                  <th>ENTITY AFFECTED</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                 {pageRows.map((e) => (
                  <tr key={e.id}>
                    <td className="rp-created">{e.time}</td>
                    <td className="cl-name">{e.user}</td>
                    <td className="cl-name">{e.action}</td>
                    <td className="al-details">{e.details}</td>
                    <td className="cl-name">{e.entity}</td>
                    <td>
                      <div
                        className="rp-actions-wrap"
                        ref={openMenu === e.id ? menuRef : undefined}
                      >
                        <button
                          type="button"
                          className="rp-kebab"
                          aria-label={`Actions for log entry ${e.id}`}
                          aria-expanded={openMenu === e.id}
                          onClick={(event) => {
                            event.stopPropagation();
                            setOpenMenu((value) => (value === e.id ? null : e.id));
                          }}
                        >
                          <MoreVertical size={16} aria-hidden="true" />
                        </button>
                        {openMenu === e.id && (
                          <div className="rp-menu" role="menu" aria-label={`Log entry ${e.id} actions`}>
                            <Link
                              to="/audit-view"
                              search={{ id: e.id }}
                              role="menuitem"
                              className="rp-menu-item"
                              onClick={() => setOpenMenu(null)}
                            >
                              <Eye size={13} aria-hidden="true" />View
                            </Link>
                            <Link
                              to="/audit-review"
                              search={{ id: e.id }}
                              role="menuitem"
                              className="rp-menu-item tone-blue"
                              onClick={() => setOpenMenu(null)}
                            >
                              <BadgeCheck size={13} aria-hidden="true" />Review
                            </Link>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cl-foot">
             <small>Showing {filtered.length ? (page - 1) * 4 + 1 : 0}-{Math.min(page * 4, filtered.length)} of {filtered.length} events</small>
            <div className="cl-pager">
               <button type="button" className="cl-page" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
                Previous
              </button>
               <button type="button" className="cl-page is-current" disabled={page * 4 >= filtered.length} onClick={() => setPage((value) => value + 1)}>
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
      {selected && <div className="cp-overlay" role="presentation" onClick={() => setSelected(null)}><div className="cp-modal" role="dialog" aria-modal="true" aria-labelledby="audit-detail-title" onClick={(event) => event.stopPropagation()}><h2 className="cp-modal-title" id="audit-detail-title">{selected.action}</h2><p className="cp-modal-text">{selected.details}<br />{selected.entity || "Portfolio-wide"}<br />{selected.user} · {selected.time}</p><div className="cp-modal-actions"><button type="button" className="cp-modal-cancel" onClick={() => setSelected(null)}>{selected.pending ? "Mark reviewed" : "Close"}</button></div></div></div>}
    </div>
  );
}
