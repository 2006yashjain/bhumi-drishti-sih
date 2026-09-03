// Synthetic data for the Alerts Intelligence prototype

export const alertTypes = {
  RISK_INCREASE: {
    label: "Risk Escalation",
    description: "Project risk score increased significantly.",
    defaultSeverity: "HIGH",
    triggerCondition: "Risk increase >= 10 percentage points within monitoring period",
    recommendedResponse: "Review SHAP attribution and address dominant risk drivers immediately."
  },
  STAGE_DELAY: {
    label: "Stage Delay",
    description: "Project is delayed beyond expected timeline for current stage.",
    defaultSeverity: "HIGH",
    triggerCondition: "Stage duration > 1.5x expected SLA timeline",
    recommendedResponse: "Escalate to Nodal Officer and identify specific stage bottlenecks."
  },
  COMPENSATION_DELAY: {
    label: "Compensation Delay",
    description: "Unresolved compensation cases blocking progress.",
    defaultSeverity: "CRITICAL",
    triggerCondition: "Compensation pending > 30 days post-award",
    recommendedResponse: "Prioritize pending compensation cases and assign additional processing capacity."
  },
  RR_DELAY: {
    label: "R&R Delay",
    description: "Rehabilitation and Resettlement progress is stalled.",
    defaultSeverity: "CRITICAL",
    triggerCondition: "R&R clearance rate < 10% per month",
    recommendedResponse: "Conduct immediate on-ground R&R review with district administration."
  },
  LEGAL_RISK: {
    label: "Legal Dispute",
    description: "New legal petition or active stay order detected.",
    defaultSeverity: "HIGH",
    triggerCondition: "Court stay order received or new petition filed",
    recommendedResponse: "Review unresolved case status and coordinate with legal cell."
  },
  APPROVAL_DELAY: {
    label: "Approval Bottleneck",
    description: "Administrative file pending approval beyond SLA.",
    defaultSeverity: "MEDIUM",
    triggerCondition: "File pending at desk > 15 days",
    recommendedResponse: "Identify pending approval authority and notify responsible department."
  },
  STAKEHOLDER_RISK: {
    label: "Stakeholder Opposition",
    description: "Low responsiveness or active opposition detected.",
    defaultSeverity: "HIGH",
    triggerCondition: "Consultation attendance < 30% or active protest reported",
    recommendedResponse: "Trigger stakeholder follow-up and schedule grievance camp."
  }
};

export const initialAlerts = [
  {
    alertId: "ALT-2048",
    projectId: "P-1042",
    projectName: "NH-48 Jaipur–Kishangarh Expansion",
    state: "Rajasthan",
    district: "Jaipur",
    stage: "Compensation",
    type: "RISK_INCREASE",
    severity: "CRITICAL",
    currentRisk: 78,
    previousRisk: 61,
    riskChange: 17,
    primaryDriver: "Pending Compensation",
    trigger: "Risk score increased by 17 percentage points within the monitoring period.",
    threshold: "+10 pp",
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
    assignedOfficer: "Compensation Officer",
    department: "Revenue",
    targetDate: "2026-09-10",
    status: "NEW",
    recommendedAction: "Prioritize the 18 unresolved compensation cases and assign additional processing capacity.",
    acknowledgement: null,
    escalationLevel: "Level 1: Project Officer",
    factors: [
      { name: "Pending Compensation", contribution: 21 },
      { name: "Stakeholder Responsiveness", contribution: 12 },
      { name: "R&R Progress", contribution: 8 },
      { name: "Legal Dispute", contribution: 4 },
      { name: "Past District Performance", contribution: 3 },
      { name: "Compensation Processing Rate", contribution: -6 }
    ],
    history: [
      {
        timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
        event: "Alert generated",
        details: "Risk increased from 61% to 78%."
      }
    ]
  },
  {
    alertId: "ALT-2043",
    projectId: "P-1038",
    projectName: "Jaipur Ring Road Expansion",
    state: "Rajasthan",
    district: "Jaipur",
    stage: "R&R",
    type: "RR_DELAY",
    severity: "CRITICAL",
    currentRisk: 84,
    previousRisk: 75,
    riskChange: 9,
    primaryDriver: "Low R&R Progress",
    trigger: "R&R clearance rate below configured threshold for critical infrastructure.",
    threshold: "10% per month",
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    assignedOfficer: "R&R Officer",
    department: "Social Welfare",
    targetDate: "2026-09-08",
    status: "ACKNOWLEDGED",
    recommendedAction: "Review 11 pending R&R cases and coordinate alternative housing.",
    acknowledgement: {
      officer: "R&R Officer",
      timestamp: new Date(Date.now() - 4 * 3600000).toISOString()
    },
    escalationLevel: "Level 2: District Officer",
    factors: [
      { name: "Low R&R Progress", contribution: 15 },
      { name: "Budget Availability", contribution: 8 }
    ],
    history: [
      {
        timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
        event: "Alert generated",
        details: "R&R delay detected."
      },
      {
        timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
        event: "Alert acknowledged",
        details: "Acknowledged by R&R Officer."
      }
    ]
  },
  {
    alertId: "ALT-2021",
    projectId: "P-1019",
    projectName: "Ajmer Bypass Acquisition",
    state: "Rajasthan",
    district: "Ajmer",
    stage: "Declaration",
    type: "APPROVAL_DELAY",
    severity: "HIGH",
    currentRisk: 67,
    previousRisk: 62,
    riskChange: 5,
    primaryDriver: "Approval Delay",
    trigger: "Administrative file pending approval > 15 days.",
    threshold: "15 days",
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), // 1 day ago
    assignedOfficer: "Nodal Officer",
    department: "Project Administration",
    targetDate: "2026-09-05",
    status: "IN PROGRESS",
    recommendedAction: "Escalate overdue administrative approval to responsible department.",
    acknowledgement: {
      officer: "Nodal Officer",
      timestamp: new Date(Date.now() - 23 * 3600000).toISOString()
    },
    escalationLevel: "Level 1: Project Officer",
    factors: [
      { name: "Approval Delay", contribution: 12 },
      { name: "Department Coordination", contribution: 5 }
    ],
    history: [
      {
        timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
        event: "Alert generated",
        details: "Approval bottleneck detected."
      },
      {
        timestamp: new Date(Date.now() - 23 * 3600000).toISOString(),
        event: "Alert acknowledged",
        details: "Acknowledged by Nodal Officer."
      },
      {
        timestamp: new Date(Date.now() - 20 * 3600000).toISOString(),
        event: "Corrective action created",
        details: "Assigned to department head."
      }
    ]
  },
  {
    alertId: "ALT-1995",
    projectId: "P-1071",
    projectName: "Jodhpur Peripheral Road",
    state: "Rajasthan",
    district: "Jodhpur",
    stage: "SIA / Assessment",
    type: "STAKEHOLDER_RISK",
    severity: "MEDIUM",
    currentRisk: 43,
    previousRisk: 39,
    riskChange: 4,
    primaryDriver: "Stakeholder Responsiveness",
    trigger: "Consultation attendance below expectation.",
    threshold: "< 30%",
    createdAt: new Date(Date.now() - 48 * 3600000).toISOString(),
    assignedOfficer: "Project Officer",
    department: "Land Acquisition",
    targetDate: "2026-09-15",
    status: "NEW",
    recommendedAction: "Initiate stakeholder follow-up and schedule additional consultation camp.",
    acknowledgement: null,
    escalationLevel: "Level 1: Project Officer",
    factors: [
      { name: "Stakeholder Responsiveness", contribution: 10 }
    ],
    history: [
      {
        timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
        event: "Alert generated",
        details: "Low engagement detected in SIA."
      }
    ]
  },
  {
    alertId: "ALT-1950",
    projectId: "P-0988",
    projectName: "Kota Industrial Expansion",
    state: "Rajasthan",
    district: "Kota",
    stage: "Compensation",
    type: "COMPENSATION_DELAY",
    severity: "HIGH",
    currentRisk: 55,
    previousRisk: 69,
    riskChange: -14,
    primaryDriver: "Pending Compensation",
    trigger: "Action target date resolved.",
    threshold: "Resolution of backlog",
    createdAt: new Date(Date.now() - 120 * 3600000).toISOString(),
    assignedOfficer: "Compensation Officer",
    department: "Revenue",
    targetDate: "2026-09-01",
    status: "RESOLVED",
    recommendedAction: "Action complete.",
    acknowledgement: {
      officer: "Compensation Officer",
      timestamp: new Date(Date.now() - 119 * 3600000).toISOString()
    },
    escalationLevel: "Level 1: Project Officer",
    interventionImpact: {
      beforeRisk: 69,
      afterRisk: 55,
      change: -14,
      resolvedDriver: "Pending Compensation",
      actionTaken: "12 compensation cases prioritized and cleared."
    },
    factors: [],
    history: [
      {
        timestamp: new Date(Date.now() - 120 * 3600000).toISOString(),
        event: "Alert generated",
        details: "Compensation delay detected."
      },
      {
        timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
        event: "Alert resolved",
        details: "Backlog cleared successfully."
      }
    ]
  }
];

export const alertSummary = {
  activeAlerts: 28,
  critical: 6,
  unacknowledged: 11,
  overdue: 4,
  resolvedToday: 9
};
