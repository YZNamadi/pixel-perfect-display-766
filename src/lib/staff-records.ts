export type StaffReport = {
  name: string;
  role: string;
  initials: string;
  tone: "red" | "blue" | "green" | "purple" | "teal";
  report: string;
  category: string;
  filed: string;
  due: string;
  status: "Filed" | "Closed" | "In Review";
};

export const initialRecords: StaffReport[] = [
  { name: "Alex Rowe", role: "Facility Lead", initials: "AR", tone: "green", report: "Monthly Fire Safety Report", category: "Health & Safety", filed: "15 Jan 2024", due: "15 Jan 2025", status: "Filed" },
  { name: "Sarah Jones", role: "Care Administrator", initials: "SJ", tone: "blue", report: "Incident Report - Resident Fall", category: "Clinical", filed: "22 Mar 2024", due: "22 Mar 2027", status: "Filed" },
  { name: "David Finch", role: "Maintenance Engineer", initials: "DF", tone: "purple", report: "Water Hygiene Monitoring Report", category: "Facilities", filed: "10 Jun 2024", due: "10 Jun 2026", status: "Filed" },
  { name: "James Carter", role: "Compliance Officer", initials: "JC", tone: "teal", report: "CQC Readiness Audit Report", category: "Governance", filed: "02 Feb 2024", due: "02 Feb 2025", status: "Filed" },
  { name: "Emma Watson", role: "Support Worker", initials: "EW", tone: "red", report: "Safeguarding Concern Report", category: "Safeguarding", filed: "14 Jul 2022", due: "14 Jul 2024", status: "Closed" },
  { name: "Robert Vance", role: "Facilities Team", initials: "RV", tone: "blue", report: "Equipment Maintenance Log", category: "Operations", filed: "05 Sep 2023", due: "05 Sep 2024", status: "In Review" },
  { name: "Clara Oswald", role: "Site Supervisor", initials: "CO", tone: "purple", report: "COSHH Chemical Register", category: "Health & Safety", filed: "18 Nov 2023", due: "18 Nov 2024", status: "Filed" },
  { name: "Marcus Brody", role: "Operations Admin", initials: "MB", tone: "green", report: "Staff Incident Report", category: "HR", filed: "30 Jan 2024", due: "30 Jan 2025", status: "Filed" },
];

