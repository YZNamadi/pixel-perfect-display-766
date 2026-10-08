import { ProductSelect } from "@/components/product-select";
import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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
  Pencil,
  Check,
  X,
  AlertTriangle,
  Stethoscope,
  MoreVertical,
  Eye,
} from "lucide-react";

import { KearlyLogo } from "@/components/kearly-logo";

export const Route = createFileRoute("/repairs")({
  head: () => ({
    meta: [
      { title: "Kearly | Repairs & Maintenance Tickets" },
      {
        name: "description",
        content:
          "Track active maintenance tickets and repairs with priority, status, assignee and SLA across every Kearly site.",
      },
      { property: "og:title", content: "Kearly | Repairs & Maintenance Tickets" },
      {
        property: "og:description",
        content:
          "Track active maintenance tickets and repairs with priority, status, assignee and SLA across every Kearly site.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RepairsPage,
});

const overviewNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Equipment", icon: Stethoscope, to: "/equipment" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const, active: true, badge: "2" },
  { label: "Buildings", icon: Building2, to: "/assets" as const },
];

const governanceNav = [
  { label: "Reports", icon: BarChart3, to: "/reports" as const },
  { label: "Team", icon: Users, to: "/team-members" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
];

const tabs = [
  { key: "all", label: "All Tickets (12)" },
  { key: "open", label: "Open (2)" },
  { key: "progress", label: "In Progress (6)" },
  { key: "closed", label: "Closed (4)" },
];

type Ticket = {
  id: string;
  title: string;
  site: string;
  priority: "P1" | "P2" | "P3";
  status: "Open" | "In Progress" | "Closed";
  assignee: string;
  created: string;
  sla: string;
  slaTone?: "red" | "muted";
};

const tickets: Ticket[] = [
  { id: "#4821", title: "Communal heating failure", site: "Riverside Court", priority: "P1", status: "Open", assignee: "Michael Fin", created: "", sla: "" },
  { id: "#4819", title: "Broken window latch - Ward A", site: "Victoria Wharf", priority: "P2", status: "In Progress", assignee: "James Carter", created: "Yesterday", sla: "24h remaining" },
  { id: "#4815", title: "Lift door sensor malfunction", site: "Elmwood Court", priority: "P1", status: "In Progress", assignee: "David Vance", created: "2 days ago", sla: "Overdue 12h", slaTone: "red" },
  { id: "#4812", title: "Leaking pipe ground floor", site: "Maple Business Park", priority: "P2", status: "In Progress", assignee: "James Carter", created: "3 days ago", sla: "On Track" },
  { id: "#4809", title: "Emergency exit light replacement", site: "Northgate House", priority: "P3", status: "Closed", assignee: "Sarah Jones", created: "5 days ago", sla: "Met SLA" },
  { id: "#4806", title: "HVAC filter periodic swap", site: "Kingsway Tower", priority: "P3", status: "Closed", assignee: "Michael Finch", created: "1 week ago", sla: "Met SLA" },
];

const priorityTone = (p: Ticket["priority"]) => (p === "P1" ? "tone-red" : p === "P2" ? "tone-amber" : "tone-muted");

const statusTone = (s: Ticket["status"]) =>
  s === "Open" ? "tone-blue" : s === "In Progress" ? "tone-amber" : "tone-muted";

function RepairsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [deleteTicket, setDeleteTicket] = useState<Ticket | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!openMenu) return;
    const onDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openMenu]);
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("All");
  const [site, setSite] = useState("All");
  const [assignee, setAssignee] = useState("All");
  const [page, setPage] = useState(1);
  const filteredTickets = useMemo(() => tickets.filter((ticket) => (activeTab === "all" || ticket.status.toLowerCase().replace(" ", "") === activeTab) && (priority === "All" || ticket.priority === priority) && (site === "All" || ticket.site === site) && (assignee === "All" || ticket.assignee === assignee) && (!query.trim() || `${ticket.id} ${ticket.title} ${ticket.site} ${ticket.assignee}`.toLowerCase().includes(query.toLowerCase()))), [activeTab, priority, site, assignee, query]);
  const pageRows = filteredTickets.slice((page - 1) * 3, page * 3);

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
            <h1 className="po-title">Repairs</h1>
            <p className="po-subtitle">Active maintenance tickets &amp; repairs</p>
          </div>
          <div className="po-topbar-actions">
            <div className="po-search">
              <Search size={15} aria-hidden="true" />
               <input type="search" placeholder="Search..." aria-label="Search tickets" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} />
            </div>
            <span className="po-chip">Jul 2024</span>
             <label className="po-chip qa-select-chip">
              <Calendar size={14} aria-hidden="true" />
               <ProductSelect aria-label="Filter repair tickets by building" value={site} onChange={(event) => { setSite(event.target.value); setPage(1); }}><option>All</option>{Array.from(new Set(tickets.map((ticket) => ticket.site))).map((item) => <option key={item}>{item}</option>)}</ProductSelect>
             </label>
             <Link to="/new-ticket" className="po-download">
              New Ticket
            </Link>
          </div>
        </header>

        <div className="cl-tabs" role="tablist" aria-label="Ticket filters">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              className={`cl-tab ${activeTab === key ? "is-active" : ""}`}
               onClick={() => { setActiveTab(key); setPage(1); }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="rp-filters">
           <label className="rp-filter qa-filter-select">Priority: <ProductSelect aria-label="Filter by priority" value={priority} onChange={(event) => { setPriority(event.target.value); setPage(1); }}><option>All</option><option>P1</option><option>P2</option><option>P3</option></ProductSelect></label>
           <label className="rp-filter qa-filter-select">Site: <ProductSelect aria-label="Filter by site" value={site} onChange={(event) => { setSite(event.target.value); setPage(1); }}><option>All</option>{Array.from(new Set(tickets.map((ticket) => ticket.site))).map((item) => <option key={item}>{item}</option>)}</ProductSelect></label>
           <label className="rp-filter qa-filter-select">Assignee: <ProductSelect aria-label="Filter by assignee" value={assignee} onChange={(event) => { setAssignee(event.target.value); setPage(1); }}><option>All</option>{Array.from(new Set(tickets.map((ticket) => ticket.assignee))).map((item) => <option key={item}>{item}</option>)}</ProductSelect></label>
        </div>

        <section className="cl-panel" aria-label="Repair tickets">
          <div className="cl-table-wrap">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TITLE</th>
                  <th>SITE</th>
                  <th>PRIORITY</th>
                  <th>STATUS</th>
                  <th>ASSIGNED TO</th>
                  <th>CREATED</th>
                  <th>SLA</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                 {pageRows.map((t) => (
                  <tr key={t.id}>
                    <td className="rp-id">{t.id}</td>
                    <td className="cl-name">{t.title}</td>
                    <td>{t.site}</td>
                    <td>
                      <span className={`rp-priority ${priorityTone(t.priority)}`}>{t.priority}</span>
                    </td>
                    <td>
                      <span className={`rp-status ${statusTone(t.status)}`}>{t.status}</span>
                    </td>
                    <td>{t.assignee}</td>
                    <td className="rp-created">{t.created}</td>
                    <td className={t.slaTone === "red" ? "rp-sla-red" : undefined}>{t.sla}</td>
                    <td>
                      {t.status !== "Closed" && (
                        <div
                          className="rp-actions-wrap"
                          ref={openMenu === t.id ? menuRef : undefined}
                        >
                          <button
                          type="button"
                          className="rp-kebab"
                          aria-label={`Actions for ticket ${t.id}`}
                          aria-expanded={openMenu === t.id}
                          onClick={(event) => {
                            event.stopPropagation();
                            setOpenMenu((value) => (value === t.id ? null : t.id));
                          }}
                        >
                          <MoreVertical size={16} aria-hidden="true" />
                        </button>
                        {openMenu === t.id && (
                          <div className="rp-menu" role="menu" aria-label={`Ticket ${t.id} actions`}>
                            <Link to="/edit-task" role="menuitem" className="rp-menu-item" onClick={() => setOpenMenu(null)}>
                              <Pencil size={13} aria-hidden="true" />Edit
                            </Link>
                            <Link to="/complete-ticket" role="menuitem" className="rp-menu-item tone-green" onClick={() => setOpenMenu(null)}>
                              <Check size={13} aria-hidden="true" />Complete
                            </Link>
                            <Link to="/review-ticket" role="menuitem" className="rp-menu-item" onClick={() => setOpenMenu(null)}>
                              <Eye size={13} aria-hidden="true" />Review
                            </Link>
                            <button
                              type="button"
                              role="menuitem"
                              className="rp-menu-item tone-red"
                              onClick={() => { setOpenMenu(null); setDeleteTicket(t); }}
                            >
                              <X size={13} aria-hidden="true" />Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cl-foot">
             <small>Showing {filteredTickets.length ? (page - 1) * 3 + 1 : 0}-{Math.min(page * 3, filteredTickets.length)} of {filteredTickets.length} tickets</small>
            <div className="cl-pager">
               <button type="button" className="cl-page" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
                Previous
              </button>
               <button type="button" className="cl-page is-current" disabled={page * 3 >= filteredTickets.length} onClick={() => setPage((value) => value + 1)}>
                Next
              </button>
            </div>
          </div>
        </section>
      </main>

      {deleteTicket && (
        <div className="cp-overlay" role="presentation" onClick={() => setDeleteTicket(null)}>
          <div
            className="cp-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="rp-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cp-modal-head">
              <span className="cp-modal-icon" aria-hidden="true">
                <AlertTriangle size={22} />
              </span>
              <span className="rp-modal-heads">
                <h2 className="cp-modal-title" id="rp-modal-title">
                  Close Repair Ticket
                </h2>
                <small className="rp-modal-sub">Ticket ID {deleteTicket.id}</small>
              </span>
            </div>
            <p className="rp-modal-question">
              Are you sure you want to close &lsquo;{deleteTicket.title}&rsquo;?
            </p>
            <p className="cp-modal-text">
              This action will close the ticket and archive the associated history and assignment log in
              the KEARLY systems.
            </p>
            <div className="cp-modal-actions rp-modal-actions">
              <button type="button" className="cp-modal-cancel" onClick={() => setDeleteTicket(null)}>
                Cancel
              </button>
              <button type="button" className="cp-modal-delete" onClick={() => setDeleteTicket(null)}>
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
