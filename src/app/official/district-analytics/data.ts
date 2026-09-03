// Synthetic data for the District Analytics prototype

export const districtAnalytics = [
  {
    district: "Jaipur",
    state: "Rajasthan",
    projectCount: 12,
    highRiskProjects: 6,
    averageRisk: 71,
    averageStageDelay: 18,
    landArea: 482,
    openActions: 9,
    overdueActions: 3,
    riskTrend: "Increasing",
    trendChange: 13,
    primaryDriver: "Pending Compensation",
    secondaryDriver: "Stakeholder Responsiveness",
    stagePerformance: {
      "Preliminary Notification": "On Track",
      "SIA / Assessment": "Moderate Delay",
      "Declaration": "Moderate Delay",
      "Compensation": "Critical Bottleneck",
      "R&R": "High Risk",
      "Possession": "On Track",
      "Completion": "On Track"
    },
    riskHistory: [
      { month: 'Jan', risk: 45 },
      { month: 'Feb', risk: 48 },
      { month: 'Mar', risk: 52 },
      { month: 'Apr', risk: 58 },
      { month: 'May', risk: 65 },
      { month: 'Jun', risk: 71 }
    ],
    priorityProjects: [
      { id: "P-1042", name: "NH-48 Jaipur–Kishangarh Expansion", risk: 78, level: "HIGH" },
      { id: "P-1038", name: "Jaipur Ring Road Expansion", risk: 84, level: "CRITICAL" },
      { id: "P-1027", name: "Jaipur Metro Phase 3 Depot", risk: 73, level: "HIGH" }
    ],
    alertsCount: 6,
    criticalAlertsCount: 2
  },
  {
    district: "Ajmer",
    state: "Rajasthan",
    projectCount: 8,
    highRiskProjects: 4,
    averageRisk: 64,
    averageStageDelay: 14,
    landArea: 291,
    openActions: 6,
    overdueActions: 2,
    riskTrend: "Increasing",
    trendChange: 7,
    primaryDriver: "Approval Delay",
    secondaryDriver: "Legal Dispute",
    stagePerformance: {
      "Preliminary Notification": "On Track",
      "SIA / Assessment": "On Track",
      "Declaration": "Critical Bottleneck",
      "Compensation": "Moderate Delay",
      "R&R": "On Track",
      "Possession": "On Track",
      "Completion": "On Track"
    },
    riskHistory: [
      { month: 'Jan', risk: 52 },
      { month: 'Feb', risk: 53 },
      { month: 'Mar', risk: 55 },
      { month: 'Apr', risk: 57 },
      { month: 'May', risk: 60 },
      { month: 'Jun', risk: 64 }
    ],
    priorityProjects: [
      { id: "P-1019", name: "Ajmer Bypass Acquisition", risk: 67, level: "HIGH" },
      { id: "P-1190", name: "Ajmer Lake Front Development", risk: 65, level: "HIGH" }
    ],
    alertsCount: 4,
    criticalAlertsCount: 1
  },
  {
    district: "Jodhpur",
    state: "Rajasthan",
    projectCount: 7,
    highRiskProjects: 3,
    averageRisk: 58,
    averageStageDelay: 11,
    landArea: 247,
    openActions: 5,
    overdueActions: 1,
    riskTrend: "Stable",
    trendChange: -2,
    primaryDriver: "Low R&R Progress",
    secondaryDriver: "Stakeholder Responsiveness",
    stagePerformance: {
      "Preliminary Notification": "On Track",
      "SIA / Assessment": "Moderate Delay",
      "Declaration": "On Track",
      "Compensation": "On Track",
      "R&R": "Critical Bottleneck",
      "Possession": "On Track",
      "Completion": "On Track"
    },
    riskHistory: [
      { month: 'Jan', risk: 62 },
      { month: 'Feb', risk: 63 },
      { month: 'Mar', risk: 65 },
      { month: 'Apr', risk: 60 },
      { month: 'May', risk: 59 },
      { month: 'Jun', risk: 58 }
    ],
    priorityProjects: [
      { id: "P-1071", name: "Jodhpur Peripheral Road", risk: 68, level: "HIGH" },
      { id: "P-1205", name: "Jodhpur Logistics Hub", risk: 48, level: "MEDIUM" }
    ],
    alertsCount: 3,
    criticalAlertsCount: 0
  },
  {
    district: "Kota",
    state: "Rajasthan",
    projectCount: 6,
    highRiskProjects: 2,
    averageRisk: 47,
    averageStageDelay: 8,
    landArea: 188,
    openActions: 4,
    overdueActions: 0,
    riskTrend: "Stable",
    trendChange: 1,
    primaryDriver: "Legal Dispute",
    secondaryDriver: "Pending Compensation",
    stagePerformance: {
      "Preliminary Notification": "On Track",
      "SIA / Assessment": "On Track",
      "Declaration": "On Track",
      "Compensation": "Moderate Delay",
      "R&R": "On Track",
      "Possession": "High Risk",
      "Completion": "On Track"
    },
    riskHistory: [
      { month: 'Jan', risk: 46 },
      { month: 'Feb', risk: 46 },
      { month: 'Mar', risk: 47 },
      { month: 'Apr', risk: 47 },
      { month: 'May', risk: 46 },
      { month: 'Jun', risk: 47 }
    ],
    priorityProjects: [
      { id: "P-1092", name: "Kota Industrial Park Setup", risk: 61, level: "HIGH" }
    ],
    alertsCount: 2,
    criticalAlertsCount: 0
  },
  {
    district: "Alwar",
    state: "Rajasthan",
    projectCount: 5,
    highRiskProjects: 2,
    averageRisk: 44,
    averageStageDelay: 7,
    landArea: 176,
    openActions: 3,
    overdueActions: 1,
    riskTrend: "Decreasing",
    trendChange: -6,
    primaryDriver: "Stakeholder Responsiveness",
    secondaryDriver: "Approval Delay",
    stagePerformance: {
      "Preliminary Notification": "On Track",
      "SIA / Assessment": "High Risk",
      "Declaration": "On Track",
      "Compensation": "On Track",
      "R&R": "On Track",
      "Possession": "On Track",
      "Completion": "On Track"
    },
    riskHistory: [
      { month: 'Jan', risk: 55 },
      { month: 'Feb', risk: 54 },
      { month: 'Mar', risk: 52 },
      { month: 'Apr', risk: 50 },
      { month: 'May', risk: 48 },
      { month: 'Jun', risk: 44 }
    ],
    priorityProjects: [
      { id: "P-1104", name: "Alwar Smart City Expansion", risk: 52, level: "MEDIUM" }
    ],
    alertsCount: 1,
    criticalAlertsCount: 0
  }
];

// Helper to calculate Health Score deterministically
export const calculateHealthScore = (district: any) => {
  // Base 100
  let score = 100;
  
  // Risk penalty (max 40)
  const riskPenalty = Math.min(40, Math.floor(district.averageRisk * 0.4));
  score -= riskPenalty;
  
  // Delay penalty (max 30)
  const delayPenalty = Math.min(30, Math.floor(district.averageStageDelay * 1.5));
  score -= delayPenalty;
  
  // Action penalty (max 15)
  const actionPenalty = Math.min(15, (district.openActions * 0.5) + (district.overdueActions * 1.5));
  score -= actionPenalty;
  
  // Trend modifier (can increase or decrease)
  let trendMod = 0;
  if (district.riskTrend === 'Increasing') trendMod = -Math.min(10, district.trendChange);
  else if (district.riskTrend === 'Decreasing') trendMod = Math.min(10, Math.abs(district.trendChange));
  
  score += trendMod;
  
  return {
    score: Math.max(0, Math.round(score)),
    breakdown: {
      risk: -Math.round(riskPenalty),
      delay: -Math.round(delayPenalty),
      actions: -Math.round(actionPenalty),
      trend: Math.round(trendMod)
    }
  };
};

export const stateOverview = {
  totalProjects: 48,
  totalLandArea: 1384,
  averageRisk: 54,
  highCriticalProjects: 17,
  mostCommonDriver: "Pending Compensation",
  mostDelayedStage: "Compensation"
};

export const interventionOutcomes = [
  {
    district: "Jaipur",
    interventionName: "Jaipur Compensation Intervention",
    riskBefore: 78,
    riskAfter: 64,
    change: -14,
    resolvedDriver: "Pending Compensation",
    actionTaken: "18 compensation cases prioritized and cleared."
  }
];
