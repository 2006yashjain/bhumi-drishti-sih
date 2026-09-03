// Synthetic data for the Risk Engine / Prediction Center prototype

export const modelMetadata = {
  status: "Operational",
  modelType: "XGBoost Classifier",
  predictionMode: "Stage-wise",
  explainability: "SHAP",
  timeToEvent: "Survival Model",
  trainingData: "Synthetic Historical Acquisition Records",
  modelVersion: "prototype-v1",
  experimentTracking: "MLflow",
  featureStore: "Structured project features",
  predictionFrequency: "Stage update"
};

export const demoProjectInput = {
  projectId: "P-1042",
  projectType: "National Highway",
  landArea: "486 ha",
  affectedFamilies: "312",
  currentStage: "Compensation",
  compensationStatus: "18 pending cases",
  approvalTimeline: "Delayed",
  legalDisputes: "3 active",
  possessionStatus: "Not Started",
  rrProgress: "46%",
  stakeholderResponsiveness: "61%",
  districtHistoricalPerformance: "Average"
};

export const stageWisePredictions = [
  { stage: "Preliminary Notification", risk: 34, isCurrent: false },
  { stage: "SIA / Assessment", risk: 41, isCurrent: false },
  { stage: "Declaration", risk: 51, isCurrent: false },
  { stage: "Compensation", risk: 78, isCurrent: true, category: "HIGH" },
  { stage: "R&R", risk: 72, isCurrent: false },
  { stage: "Possession", risk: 48, isCurrent: false },
  { stage: "Completion", risk: 31, isCurrent: false }
];

export const riskTrajectory = [
  { step: '34%', stage: 'Notification', val: 34 },
  { step: '41%', stage: 'SIA', val: 41 },
  { step: '51%', stage: 'Declaration', val: 51 },
  { step: '78%', stage: 'Compensation (Current)', val: 78 },
  { step: '72%', stage: 'R&R', val: 72 },
  { step: '48%', stage: 'Possession', val: 48 },
  { step: '31%', stage: 'Completion', val: 31 },
];

export const currentPrediction = {
  riskProbability: 78,
  category: "HIGH",
  stage: "Compensation",
  timestamp: "03 Sep 2026",
  status: "Available",
  previousRisk: 51,
  change: 27,
  trend: "Increasing"
};

export const predictionDrivers = [
  { feature: "Pending Compensation", contribution: 21, direction: "positive", rank: 1 },
  { feature: "Stakeholder Responsiveness", contribution: 12, direction: "positive", rank: 2 },
  { feature: "R&R Progress", contribution: 8, direction: "positive", rank: 3 },
  { feature: "Legal Dispute", contribution: 4, direction: "positive", rank: 4 },
  { feature: "Past District Performance", contribution: 3, direction: "positive", rank: 5 },
  { feature: "Compensation Processing Rate", contribution: -6, direction: "negative", rank: 6 }
];

export const explanation = {
  text: "The model identifies pending compensation as the strongest current contributor to estimated delay risk. Stakeholder responsiveness and R&R progress are additional contributors. The active legal dispute has a smaller relative contribution in the current prediction.",
  primaryDriver: "Pending Compensation",
  primaryContribution: 21
};

export const timeToEvent = {
  window: "18–26 days",
  risk: "Elevated",
  model: "Survival Analysis",
  status: "Prototype output"
};

export const predictionHistory = [
  { timestamp: "03 Sep", stage: "Compensation", risk: 78, change: "+27 pp", driver: "Pending Compensation", version: "prototype-v1" },
  { timestamp: "28 Aug", stage: "Declaration", risk: 51, change: "+11 pp", driver: "Approval Timeline", version: "prototype-v1" },
  { timestamp: "20 Aug", stage: "SIA", risk: 41, change: "+5 pp", driver: "Stakeholder Responsiveness", version: "prototype-v1" },
];
