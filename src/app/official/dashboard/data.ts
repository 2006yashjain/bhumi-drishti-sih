// Synthetic data for the dashboard prototype

export const kpiData = {
  projectsMonitored: 2847,
  critical: 184,
  high: 531,
  medium: 743,
  low: 1389,
  atRiskLandArea: 42590, // ha
  atRiskLandAreaTrend: 12, // %
  lapseExposure: 42,
  averageStageDelay: 24, // days
  highestBottleneck: "Compensation"
};

export const trendData = [
  { name: 'Jan', critical: 110, high: 320, medium: 450, low: 1000 },
  { name: 'Feb', critical: 125, high: 350, medium: 480, low: 1050 },
  { name: 'Mar', critical: 132, high: 380, medium: 520, low: 1100 },
  { name: 'Apr', critical: 145, high: 410, medium: 580, low: 1150 },
  { name: 'May', critical: 160, high: 480, medium: 650, low: 1250 },
  { name: 'Jun', critical: 184, high: 531, medium: 743, low: 1389 },
];

export const projectsRequiringAttention = [
  {
    id: "P-1042",
    location: "Jaipur, Rajasthan",
    stage: "Compensation",
    riskScore: 86,
    contributor: "Pending Compensation",
    lapseExposure: 12,
  },
  {
    id: "P-1187",
    location: "Kota, Rajasthan",
    stage: "R&R",
    riskScore: 78,
    contributor: "Low R&R Progress",
    lapseExposure: 23,
  },
  {
    id: "P-0921",
    location: "Ajmer, Rajasthan",
    stage: "Legal/Dispute",
    riskScore: 71,
    contributor: "Stakeholder Responsiveness",
    lapseExposure: 31,
  },
  {
    id: "P-1314",
    location: "Alwar, Rajasthan",
    stage: "Possession",
    riskScore: 64,
    contributor: "Pending Compensation",
    lapseExposure: 18,
  },
];

export const quickIntelligence = [
  "Compensation is the most frequent bottleneck.",
  "Several projects are approaching critical risk.",
  "R&R progress is lagging in selected districts.",
  "Some projects show increasing risk across lifecycle stages."
];

export const priorityActions = [
  {
    title: "Review pending compensation cases",
    affected: 18,
    priority: "Critical"
  },
  {
    title: "Review delayed R&R cases",
    affected: 11,
    priority: "High"
  },
  {
    title: "Review projects approaching statutory thresholds",
    affected: 7,
    priority: "High"
  }
];

export const getRiskCategory = (score: number) => {
  if (score >= 80) return { label: "CRITICAL", color: "text-rose-600", bg: "bg-rose-100", border: "border-rose-200" };
  if (score >= 60) return { label: "HIGH", color: "text-amber-600", bg: "bg-amber-100", border: "border-amber-200" };
  if (score >= 40) return { label: "MEDIUM", color: "text-blue-600", bg: "bg-blue-100", border: "border-blue-200" };
  return { label: "LOW", color: "text-emerald-600", bg: "bg-emerald-100", border: "border-emerald-200" };
};
