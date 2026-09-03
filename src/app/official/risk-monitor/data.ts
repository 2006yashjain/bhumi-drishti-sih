// Synthetic data for the Risk Monitor prototype

export const summaryData = {
  projectsAssessed: 2847,
  criticalRisk: 184,
  highRisk: 531,
  riskIncreasing: 427,
  immediateAttention: 96
};

export const portfolioRiskDistribution = [
  { name: 'LOW', value: 1389, color: '#10b981' },
  { name: 'MEDIUM', value: 743, color: '#3b82f6' },
  { name: 'HIGH', value: 531, color: '#f59e0b' },
  { name: 'CRITICAL', value: 184, color: '#f43f5e' }
];

export const stageWiseRisk = [
  { stage: 'Preliminary Notification', projects: 312, avgRisk: 32, highCritical: 18, trend: 'Stable' },
  { stage: 'SIA / Assessment', projects: 428, avgRisk: 41, highCritical: 39, trend: 'Increasing' },
  { stage: 'Declaration', projects: 516, avgRisk: 47, highCritical: 64, trend: 'Increasing' },
  { stage: 'Compensation', projects: 621, avgRisk: 68, highCritical: 173, trend: 'Strongly Increasing' },
  { stage: 'R&R', projects: 487, avgRisk: 61, highCritical: 121, trend: 'Increasing' },
  { stage: 'Possession', projects: 326, avgRisk: 43, highCritical: 41, trend: 'Stable' },
  { stage: 'Completion', projects: 157, avgRisk: 27, highCritical: 9, trend: 'Declining' },
];

export const trajectoryDistribution = [
  { name: 'Increasing', value: 427, fill: '#f43f5e' },
  { name: 'Stable', value: 1986, fill: '#3b82f6' },
  { name: 'Decreasing', value: 434, fill: '#10b981' }
];

export const topRiskDrivers = [
  { driver: 'Pending Compensation', frequency: 38 },
  { driver: 'Low R&R Progress', frequency: 24 },
  { driver: 'Stakeholder Responsiveness', frequency: 16 },
  { driver: 'Legal Disputes', frequency: 11 },
  { driver: 'Approval Delays', frequency: 7 },
  { driver: 'District Historical Performance', frequency: 4 },
];

export const allProjects = [
  {
    project_id: "P-1042",
    project_name: "NH-48 Jaipur–Kishangarh Expansion",
    state: "Rajasthan",
    district: "Jaipur",
    project_type: "National Highway",
    current_stage: "Compensation",
    risk_probability: 78,
    previous_risk_probability: 61,
    risk_change: 17,
    risk_category: "HIGH",
    risk_trend: "INCREASING",
    primary_driver: "Pending Compensation",
    land_area: 486,
    affected_families: 312,
    updated_at: "2026-09-03"
  },
  {
    project_id: "P-1187",
    project_name: "Kota Industrial Corridor",
    state: "Rajasthan",
    district: "Kota",
    project_type: "Industrial",
    current_stage: "R&R",
    risk_probability: 71,
    previous_risk_probability: 58,
    risk_change: 13,
    risk_category: "HIGH",
    risk_trend: "INCREASING",
    primary_driver: "Low R&R Progress",
    land_area: 210,
    affected_families: 185,
    updated_at: "2026-09-03"
  },
  {
    project_id: "P-1314",
    project_name: "Alwar Rail Link",
    state: "Rajasthan",
    district: "Alwar",
    project_type: "Railway",
    current_stage: "Possession",
    risk_probability: 86,
    previous_risk_probability: 69,
    risk_change: 17,
    risk_category: "CRITICAL",
    risk_trend: "INCREASING",
    primary_driver: "Pending Compensation",
    land_area: 120,
    affected_families: 45,
    updated_at: "2026-09-02"
  },
  {
    project_id: "P-0921",
    project_name: "Ajmer Ring Road",
    state: "Rajasthan",
    district: "Ajmer",
    project_type: "Highway",
    current_stage: "Legal / Dispute",
    risk_probability: 64,
    previous_risk_probability: 62,
    risk_change: 2,
    risk_category: "HIGH",
    risk_trend: "STABLE",
    primary_driver: "Stakeholder Responsiveness",
    land_area: 315,
    affected_families: 240,
    updated_at: "2026-09-01"
  },
  {
    project_id: "P-1502",
    project_name: "Udaipur Smart City Expansion",
    state: "Rajasthan",
    district: "Udaipur",
    project_type: "Urban Development",
    current_stage: "Declaration",
    risk_probability: 45,
    previous_risk_probability: 50,
    risk_change: -5,
    risk_category: "MEDIUM",
    risk_trend: "DECREASING",
    primary_driver: "Approval Delays",
    land_area: 85,
    affected_families: 120,
    updated_at: "2026-09-03"
  }
];
