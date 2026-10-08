import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { BarChart3, Building2, LayoutDashboard, ScrollText, Settings, ShieldCheck, Stethoscope, Users, Wrench } from "lucide-react";

import { KearlyLogo } from "@/components/kearly-logo";

const overview = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" as const },
  { label: "Compliance", icon: ShieldCheck, to: "/compliance" as const },
  { label: "Equipment", icon: Stethoscope, to: "/equipment" as const },
  { label: "Repairs", icon: Wrench, to: "/repairs" as const, badge: "2" },
  { label: "Buildings", icon: Building2, to: "/assets" as const },
];

const governance = [
  { label: "Reports", icon: BarChart3, to: "/reports" as const },
  { label: "Team", icon: Users, to: "/team-members" as const },
  { label: "Audit log", icon: ScrollText, to: "/audit-log" as const },
];

function NavLink({ label, icon: Icon, to, active, badge }: { label: string; icon: LucideIcon; to: "/dashboard" | "/compliance" | "/equipment" | "/repairs" | "/assets" | "/reports" | "/team-members" | "/audit-log"; active?: boolean; badge?: string }) {
  return <Link to={to} className={`po-nav-item ${active ? "is-active" : ""}`}><Icon size={17} aria-hidden="true" /><span>{label}</span>{badge ? <span className="po-nav-badge">{badge}</span> : null}</Link>;
}

export function AppShell({ active, children }: { active: string; children: ReactNode }) {
  return <div className="po-shell">
    <aside className="po-sidebar">
      <Link to="/dashboard" className="po-logo" aria-label="Kearly"><KearlyLogo className="po-logo-mark" /><span className="po-logo-text"><span className="po-logo-name">KEARLY</span><span className="po-logo-tag">Compliance. Automated &amp; Simplified.</span></span></Link>
      <nav className="po-nav" aria-label="Main navigation">
        <p className="po-nav-label">OVERVIEW</p>
        {overview.map((item) => <NavLink key={item.label} {...item} active={active === item.label} />)}
        <p className="po-nav-label po-nav-label-gap">GOVERNANCE</p>
        {governance.map((item) => <NavLink key={item.label} {...item} active={active === item.label} />)}
      </nav>
      <div className="po-sidebar-foot"><Link to="/settings" className={`po-nav-item ${active === "Settings" ? "is-active" : ""}`}><Settings size={17} aria-hidden="true" /><span>Settings</span></Link><div className="po-user"><span className="po-user-avatar" aria-hidden="true">AR</span><span className="po-user-text"><span className="po-user-name">Alex Rowe</span><span className="po-user-role">Portfolio admin</span></span></div></div>
    </aside>
    <main className="po-main">{children}</main>
  </div>;
}