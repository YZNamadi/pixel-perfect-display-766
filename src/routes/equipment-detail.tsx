import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/equipment-detail")({
  head: () => ({ meta: [
    { title: "Defibrillator AED Plus | Kearly Equipment" },
    { name: "description", content: "Review the Riverside Court defibrillator, maintenance history and fault records." },
    { property: "og:title", content: "Defibrillator AED Plus | Kearly Equipment" },
    { property: "og:description", content: "Asset information, preventative maintenance history and breakdown records for Defibrillator AED Plus." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: EquipmentDetailPage,
});

const information = [
  ["CATEGORY", "Emergency"], ["SITE", "Riverside Court"],
  ["PPM SCHEDULE", "Quarterly"], ["NEXT DUE", "15 Jul 2024"],
  ["LAST SERVICED", "12 Apr 2024"], ["ASSIGNED TECHNICIAN", "Sarah Jones"],
  ["MANUFACTURER", "Zoll Medical"], ["MODEL", "AED Plus"],
  ["PURCHASE DATE", "15 Mar 2022"], ["WARRANTY EXPIRY", "15 Mar 2025"],
];
const history = [
  { date: "12 Apr 2024", type: "Planned Maintenance", technician: "Sarah Jones", result: "Pass", notes: "Calibrated successfully. Electrodes checked and repla..." },
  { date: "15 Jan 2024", type: "Safety Inspection", technician: "Sarah Jones", result: "Pass", notes: "Passed basic electrical safety test." },
  { date: "10 Oct 2023", type: "Battery Assessment", technician: "James Carter", result: "Partial", notes: "Backup cell degraded. Scheduled replacement for next..." },
  { date: "12 Jul 2023", type: "Planned Maintenance", technician: "Sarah Jones", result: "Pass", notes: "Routine check, firmware updated to v2.4.1." },
];
const faults = [
  { date: "05 Nov 2023", status: "Resolved", title: "AED low-charge warning buzzer active", reporter: "Alex Rowe", action: "Battery swapped and tested" },
  { date: "14 Jun 2024", status: "In Progress", title: "Status light blinking red on start", reporter: "David Vance", action: "Technician dispatched" },
];

function EquipmentDetailPage() {
  return <AppShell active="Equipment"><div className="ed-page">
    <Link to="/equipment" className="ed-back"><ArrowLeft size={14} aria-hidden="true" />Back to Medical Equipment</Link>
    <header className="ed-header"><div><div className="ed-heading"><h1>Defibrillator AED Plus</h1><span className="ed-badge ed-success">Active</span></div><p className="ed-serial">SN-DEF-2024-0847</p></div><div className="ed-actions"><Button asChild variant="outline" className="ed-edit"><Link to="/edit-equipment">Edit Equipment</Link></Button><Button asChild className="ed-report"><Link to="/new-ticket">Report Fault</Link></Button></div></header>
    <div className="ed-layout"><div className="ed-left">
      <section className="ed-panel ed-information" aria-labelledby="ed-information-title"><h2 id="ed-information-title">Asset Information</h2><dl className="ed-info-grid">{information.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
      <section className="ed-panel ed-history" aria-labelledby="ed-history-title"><h2 id="ed-history-title">Planned Preventative Maintenance (PPM) History</h2><div className="ed-table-wrap"><table><colgroup><col className="ed-date-col" /><col className="ed-type-col" /><col className="ed-technician-col" /><col className="ed-result-col" /><col /></colgroup><thead><tr>{["DATE", "TYPE", "TECHNICIAN", "RESULT", "NOTES"].map((label) => <th key={label} scope="col">{label}</th>)}</tr></thead><tbody>{history.map((entry) => <tr key={entry.date}><td>{entry.date}</td><td>{entry.type}</td><td>{entry.technician}</td><td><span className={`ed-badge ${entry.result === "Pass" ? "ed-success" : "ed-warning"}`}>{entry.result}</span></td><td className="ed-notes" title={entry.notes}>{entry.notes}</td></tr>)}</tbody></table></div></section>
    </div><section className="ed-panel ed-faults" aria-labelledby="ed-fault-title"><h2 id="ed-fault-title">Breakdown &amp; Fault Log</h2><div className="ed-fault-list">{faults.map((fault) => <article className="ed-fault" key={fault.date}><div className="ed-fault-header"><h3>{fault.date}</h3><span className={`ed-badge ${fault.status === "Resolved" ? "ed-success" : "ed-progress"}`}>{fault.status}</span></div><p className="ed-fault-description">{fault.title}</p><p className="ed-reporter">Reported By: <strong>{fault.reporter}</strong></p><div className="ed-resolution"><span>RESOLUTION/ACTION</span><p>{fault.action}</p></div></article>)}</div></section></div>
  </div></AppShell>;
}