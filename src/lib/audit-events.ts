export type AuditEvent = {
  id: string;
  time: string;
  user: string;
  action: string;
  details: string;
  entity: string;
  pending?: boolean;
  ip?: string;
  session?: string;
};

export const auditEvents: AuditEvent[] = [
  {
    id: "e1",
    time: "02 Jul 2024, 09:12",
    user: "Sarah Jones",
    action: "Task Created",
    details: "Compliance task Fire Risk Assessment created",
    ip: "192.168.1.45",
    session: "sess_a8f3k2m1",
    entity: "",
    pending: true,
  },
  {
    id: "e2",
    time: "02 Jul 2024, 08:32",
    user: "Alex Rowe",
    action: "Status Updated",
    details: "Repair ticket #4821 from Open to In Progress",
    entity: "Riverside Court",
  },
  {
    id: "e3",
    time: "01 Jul 2024, 16:45",
    user: "Alex Rowe",
    action: "Site Added",
    details: "Riverside Court facility added",
    entity: "Riverside Court",
  },
  {
    id: "e4",
    time: "01 Jul 2024, 12:00",
    user: "System",
    action: "Report Generated",
    details: "Monthly compliance report generated",
    entity: "Portfolio Overview",
  },
  {
    id: "e5",
    time: "30 Jun 2024, 15:21",
    user: "Michael Finch",
    action: "Contractor Assigned",
    details: "Lift inspection assigned to contractor David Vance",
    entity: "Elmwood Court",
  },
  {
    id: "e6",
    time: "29 Jun 2024, 10:30",
    user: "Sarah Jones",
    action: "Task Completed",
    details: "Monthly Emergency Lighting Test approved",
    entity: "Northgate House",
  },
  {
    id: "e7",
    time: "28 Jun 2024, 09:15",
    user: "System",
    action: "SLA Escalation",
    details: "Breach escalation alert dispatched for electrical EICR",
    entity: "Victoria Wharf",
  },
  {
    id: "e8",
    time: "27 Jun 2024, 14:02",
    user: "Alex Rowe",
    action: "User Invited",
    details: "Teammate James Carter added",
    entity: "Victoria Wharf",
  },
];
