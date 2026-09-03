// Synthetic data for the Project Detail prototype

export const projectData = {
  project_id: "P-1042",
  project_name: "NH-48 Jaipur–Kishangarh Expansion",
  project_type: "National Highway",
  state: "Rajasthan",
  district: "Jaipur District",
  land_area: 486, // ha
  affected_families: 312,
  acquisition_start: "05 June 2026",
  current_stage: "Compensation",
  overall_progress: 63, // %
  compensation_progress: 58, // %
  rr_progress: 46, // %
  legal_disputes: 3,
  stakeholder_responsiveness: 61, // %
  possession_status: "Not Started",
  risk_probability: 78,
  previous_risk_probability: 61,
  risk_category: "HIGH",
  risk_trend: "Increasing",
  last_updated: "03 Sep 2026"
};

export const lifecycleStages = [
  { id: 1, name: "Preliminary Notification", status: "Completed", date: "Jan 2026" },
  { id: 2, name: "SIA / Assessment", status: "Completed", date: "Feb 2026" },
  { id: 3, name: "Declaration", status: "Completed", date: "Apr 2026" },
  { id: 4, name: "Compensation", status: "Current", date: "Ongoing" },
  { id: 5, name: "R&R", status: "Upcoming", date: "Pending" },
  { id: 6, name: "Possession", status: "Upcoming", date: "Pending" },
  { id: 7, name: "Completion", status: "Upcoming", date: "Pending" },
];

export const riskTrajectory = [
  { month: 'Month 1', stage: 'Declaration', risk: 34 },
  { month: 'Month 2', stage: 'Compensation', risk: 51 },
  { month: 'Month 3', stage: 'Current assessment', risk: 78 },
];

export const shapDrivers = [
  { feature: "Pending Compensation", contribution: 21, type: "positive" },
  { feature: "Low Stakeholder Responsiveness", contribution: 12, type: "positive" },
  { feature: "R&R Progress", contribution: 8, type: "positive" },
  { feature: "Legal Dispute", contribution: 4, type: "positive" },
  { feature: "Past District Performance", contribution: 3, type: "positive" },
  { feature: "Project Type", contribution: 1, type: "positive" },
  { feature: "Compensation Processing Rate", contribution: -6, type: "negative" },
];

export const driverActions = [
  { driver: "Pending Compensation", severity: "Critical", action: "Resolve pending compensation cases", owner: "Compensation Officer" },
  { driver: "Low Stakeholder Responsiveness", severity: "High", action: "Initiate stakeholder follow-up", owner: "Project Officer" },
  { driver: "Low R&R Progress", severity: "High", action: "Review pending R&R cases", owner: "R&R Officer" },
  { driver: "Legal Dispute", severity: "Medium", action: "Review unresolved legal cases", owner: "Legal Officer" },
  { driver: "Past District Performance", severity: "Medium", action: "Increase monitoring frequency", owner: "District Administrator" },
];
