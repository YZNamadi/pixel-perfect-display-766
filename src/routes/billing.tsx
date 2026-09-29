import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { downloadCsv } from "@/lib/download";

const invoices = [
  ["INV-2026-009", "1 Sep 2026", "£2,988.00", "Paid"],
  ["INV-2025-009", "1 Sep 2025", "£2,988.00", "Paid"],
  ["INV-2024-009", "1 Sep 2024", "£2,988.00", "Paid"],
];

export const Route = createFileRoute("/billing")({
  head: () => ({ meta: [
    { title: "Billing & Subscription | Kearly" },
    { name: "description", content: "Manage Kearly subscriptions, payment methods and invoices." },
    { property: "og:title", content: "Billing & Subscription | Kearly" },
    { property: "og:description", content: "Manage Kearly subscriptions, payment methods and invoices." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: BillingPage,
});

function BillingPage() {
  return <AppShell active="Billing">
    <header className="qa-page-head"><h1 className="po-title">Billing &amp; Subscription</h1><p className="po-subtitle">Manage your plan, payment method and invoices</p></header>
    <div className="qa-two-columns">
      <section className="bd-card"><div className="bd-card-head"><div><h2 className="bd-card-title">Professional Plan</h2><p className="bd-card-sub">All-in-one compliance management for your portfolio</p></div><span className="dc-expiry tone-green">Active</span></div><p className="qa-price">£249 <small>/ month</small></p><p className="se-plan-renew">Billed annually · renews 1 January 2027</p><button type="button" className="cl-outline">Manage subscription</button></section>
      <section className="bd-card"><h2 className="bd-card-title">Payment method</h2><div className="se-pay-row"><span className="se-pay-brand">VISA</span><span className="se-pay-text"><strong>Visa ending in •••• 4242</strong><small>Expires 12/28</small></span><button type="button" className="cl-outline">Update</button></div></section>
    </div>
    <section className="cl-panel qa-section"><div className="bd-card-head"><div><h2 className="bd-card-title">Invoices</h2><p className="bd-card-sub">Your billing history and receipts</p></div><button type="button" className="po-download" onClick={() => downloadCsv("kearly-invoices.csv", [["Invoice", "Date", "Amount", "Status"], ...invoices])}><Download size={15} />Export</button></div><div className="cl-table-wrap"><table className="cl-table"><thead><tr><th>INVOICE</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{invoices.map((invoice) => <tr key={invoice[0]}><td className="cl-name">{invoice[0]}</td><td>{invoice[1]}</td><td>{invoice[2]}</td><td><span className="dc-expiry tone-green">{invoice[3]}</span></td><td><button type="button" className="rr-dl" onClick={() => downloadCsv(`${invoice[0]}.csv`, [["Invoice", "Date", "Amount", "Status"], invoice])} aria-label={`Download ${invoice[0]}`}><Download size={15} /></button></td></tr>)}</tbody></table></div></section>
  </AppShell>;
}