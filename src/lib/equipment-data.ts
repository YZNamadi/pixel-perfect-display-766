export type EquipmentRow = {
  name: string;
  serial: string;
  category: string;
  site: string;
  initials: string;
  avatarTone: string;
  schedule: string;
  due: string;
  incidents: number;
  status: "Active" | "Under Maintenance" | "Decommissioned";
};

export const equipmentRows: EquipmentRow[] = [
  { name: "Defibrillator AED Plus", serial: "SN-DEF-2024-084", category: "EMERGENCY", site: "Riverside Court", initials: "RC", avatarTone: "red", schedule: "Quarterly", due: "15 Jul 2024", incidents: 0, status: "Active" },
  { name: "Patient Hoist (Ceiling)", serial: "SN-HST-2023-120", category: "PATIENT HANDLING", site: "Victoria Wharf", initials: "VW", avatarTone: "blue", schedule: "6 Months", due: "22 Jul 2024", incidents: 2, status: "Active" },
  { name: "Oxygen Concentrator", serial: "SN-OXY-2024-039", category: "RESPIRATORY", site: "Maple Business Park", initials: "MB", avatarTone: "green", schedule: "Monthly", due: "01 Aug 2024", incidents: 1, status: "Active" },
  { name: "Suction Unit (Portable)", serial: "SN-SUC-2023-075", category: "EMERGENCY", site: "Kingsway Tower", initials: "KT", avatarTone: "purple", schedule: "Quarterly", due: "28 Jul 2024", incidents: 0, status: "Active" },
  { name: "Bed (Profiling Electric)", serial: "SN-BED-2022-158", category: "WARD FURNITURE", site: "Northgate House", initials: "NH", avatarTone: "teal", schedule: "Annually", due: "10 Sep 2024", incidents: 3, status: "Under Maintenance" },
  { name: "Blood Pressure Monitor", serial: "SN-BPM-2024-011", category: "DIAGNOSTICS", site: "Elmwood Court", initials: "EC", avatarTone: "green", schedule: "6 Months", due: "05 Aug 2024", incidents: 0, status: "Active" },
  { name: "Syringe Driver", serial: "SN-SYR-2023-062", category: "INFUSION", site: "Riverside Court", initials: "RC", avatarTone: "red", schedule: "Monthly", due: "18 Jul 2024", incidents: 1, status: "Active" },
  { name: "Examination Couch", serial: "SN-EXC-2021-029", category: "FURNITURE", site: "Victoria Wharf", initials: "VW", avatarTone: "blue", schedule: "Annually", due: "30 Nov 2024", incidents: 0, status: "Decommissioned" },
];


export function findEquipment(id?: string) {
  return equipmentRows.find((row) => row.serial === id) ?? equipmentRows[0];
}

const titleCase = (value: string) => value.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
export const equipmentCategory = (row: EquipmentRow) => titleCase(row.category);
