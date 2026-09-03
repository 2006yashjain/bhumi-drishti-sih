// Synthetic data for the Model & Data Center

export const modelStatus = {
  activeModel: "XGBoost Classifier",
  modelVersion: "prototype-v1",
  trainingRecords: 5000,
  featuresUsed: 12,
  lastEvaluation: "03 Sep 2026",
  dataQuality: 96,
  status: "ACTIVE • PROTOTYPE",
  data: "Synthetic Training Dataset"
};

export const modelFeatures = [
  { name: "project_type", category: "Project", type: "Categorical", description: "Type of acquisition project", source: "Project Record", usedFor: "Risk Prediction" },
  { name: "land_area", category: "Project", type: "Numeric", description: "Total affected land area", source: "Project Record", usedFor: "Risk Prediction" },
  { name: "affected_families", category: "Stakeholder", type: "Numeric", description: "Number of affected families", source: "Project Record", usedFor: "Risk Prediction" },
  { name: "current_stage", category: "Lifecycle", type: "Categorical", description: "Current acquisition stage", source: "Project Timeline", usedFor: "Stage Prediction" },
  { name: "compensation_status", category: "Financial", type: "Categorical", description: "Current compensation state", source: "Project Record", usedFor: "Risk Prediction" },
  { name: "approval_timeline", category: "Administrative", type: "Numeric", description: "Approval processing duration", source: "Project Timeline", usedFor: "Delay Prediction" },
  { name: "legal_disputes", category: "Legal", type: "Numeric", description: "Active legal dispute count", source: "Legal Record", usedFor: "Risk Prediction" },
  { name: "possession_status", category: "Lifecycle", type: "Categorical", description: "Current possession state", source: "Project Record", usedFor: "Risk Prediction" },
  { name: "rr_progress", category: "Rehabilitation", type: "Numeric", description: "R&R completion percentage", source: "R&R Records", usedFor: "Risk Prediction" },
  { name: "stakeholder_responsiveness", category: "Stakeholder", type: "Numeric", description: "Responsiveness indicator", source: "Stakeholder Records", usedFor: "Risk Prediction" },
  { name: "past_district_performance", category: "Historical", type: "Numeric", description: "Historical district delay indicator", source: "Historical Records", usedFor: "Risk Prediction" },
  { name: "compensation_processing_rate", category: "Financial", type: "Numeric", description: "Compensation processing velocity", source: "Compensation Records", usedFor: "Risk Prediction" }
];

export const dataQuality = {
  completeness: 96,
  validity: 98,
  duplicateRecords: 1.2,
  missingCriticalFields: 2.1,
  lastValidation: "03 Sep 2026",
  status: "GOOD"
};

export const dataPipeline = [
  { stage: "Raw Records", records: 5200, status: "Validated", lastUpdated: "03 Sep 2026" },
  { stage: "Validated", records: 5000, status: "Cleaned", lastUpdated: "03 Sep 2026" },
  { stage: "Training Dataset", records: 4800, status: "Engineered", lastUpdated: "03 Sep 2026" },
  { stage: "Validation Dataset", records: 1000, status: "Ready", lastUpdated: "03 Sep 2026" }
];

export const modelConfig = {
  type: "XGBoost Classifier",
  task: "Stage-wise delay risk classification",
  output: "Delay probability",
  classes: ["Low", "Medium", "High", "Critical"],
  objective: "Predict probability of delay at each acquisition stage",
  parameters: {
    n_estimators: 300,
    max_depth: 6,
    learning_rate: 0.05,
    subsample: 0.8,
    colsample_bytree: 0.8
  }
};

export const stageWiseModels = [
  { stage: "Preliminary Notification", status: "ACTIVE", riskOutput: "12%", primaryFeature: "Approval Timeline" },
  { stage: "SIA / Assessment", status: "ACTIVE", riskOutput: "34%", primaryFeature: "Stakeholder Responsiveness" },
  { stage: "Declaration", status: "ACTIVE", riskOutput: "18%", primaryFeature: "Legal Disputes" },
  { stage: "Compensation", status: "ACTIVE", riskOutput: "78%", primaryFeature: "Compensation Processing Rate" },
  { stage: "R&R", status: "ACTIVE", riskOutput: "72%", primaryFeature: "R&R Progress" },
  { stage: "Possession", status: "ACTIVE", riskOutput: "45%", primaryFeature: "Possession Status" },
  { stage: "Completion", status: "ACTIVE", riskOutput: "5%", primaryFeature: "Project Type" }
];

export const modelVersions = [
  { version: "prototype-v1", date: "03 Sep 2026", model: "XGBoost", status: "Current", notes: "Updated feature pipeline" },
  { version: "prototype-v0.9", date: "25 Aug 2026", model: "XGBoost", status: "Archived", notes: "Changed stage-risk thresholds" },
  { version: "prototype-v0.8", date: "15 Aug 2026", model: "Random Forest", status: "Archived", notes: "Initial prototype" }
];

export const predictionHistory = [
  { timestamp: "03 Sep 2026", project: "P-1042", stage: "Compensation", risk: "78%", prevRisk: "61%", change: "+17 pp", version: "prototype-v1" },
  { timestamp: "03 Sep 2026", project: "P-1038", stage: "R&R", risk: "84%", prevRisk: "75%", change: "+9 pp", version: "prototype-v1" },
  { timestamp: "02 Sep 2026", project: "P-1092", stage: "SIA / Assessment", risk: "52%", prevRisk: "52%", change: "0 pp", version: "prototype-v1" }
];

export const datasetVersions = [
  { version: "synthetic-acquisition-v1", records: 5000, features: 12, status: "Prototype", created: "03 Sep 2026" },
  { version: "synthetic-acquisition-v0.9", records: 4500, features: 10, status: "Archived", created: "20 Aug 2026" }
];
