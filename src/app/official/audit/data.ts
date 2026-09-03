// Synthetic data for the Audit Trail & Accountability prototype

export const eventTypes = {
  RISK_PREDICTION: { label: "Risk Prediction", category: "System", severity: "Informational" },
  ALERT_CREATED: { label: "Alert", category: "System", severity: "High" },
  ALERT_ACKNOWLEDGED: { label: "Alert Acknowledged", category: "Administrative", severity: "Medium" },
  ALERT_ASSIGNED: { label: "Alert Assigned", category: "Administrative", severity: "Medium" },
  ALERT_RESOLVED: { label: "Alert Resolved", category: "Administrative", severity: "Low" },
  ACTION_CREATED: { label: "Corrective Action", category: "Administrative", severity: "High" },
  ACTION_ASSIGNED: { label: "Action Assigned", category: "Administrative", severity: "Medium" },
  ACTION_STATUS_CHANGED: { label: "Status Change", category: "Administrative", severity: "Low" },
  ACTION_COMPLETED: { label: "Action Completed", category: "Administrative", severity: "Low" },
  PROJECT_UPDATED: { label: "Project Update", category: "Administrative", severity: "Low" },
  RECOMMENDATION_CREATED: { label: "Recommendation", category: "System", severity: "Medium" },
  ESCALATION_CREATED: { label: "Escalation", category: "System", severity: "Critical" },
  LOGIN_EVENT: { label: "Login / Authentication", category: "Security", severity: "Informational" },
  SYSTEM_EVENT: { label: "System Event", category: "System", severity: "Informational" }
};

export const auditEvents = [
  {
    eventId: "AUD-7827",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    eventType: "ACTION_COMPLETED",
    projectId: "P-1042",
    projectName: "NH-48 Jaipur–Kishangarh Expansion",
    district: "Jaipur",
    actorId: "OFF-339",
    actorName: "Compensation Officer",
    actorRole: "Project Officer",
    action: "Intervention completed",
    severity: "Low",
    previousState: "IN PROGRESS",
    newState: "RESOLVED",
    reason: "18 compensation cases prioritized and cleared.",
    sourceModule: "Recommendations & Corrective Actions",
    relatedRecordId: "ACT-841",
    changes: [
      { field: "Status", before: "IN PROGRESS", after: "RESOLVED" }
    ]
  },
  {
    eventId: "AUD-7826",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    eventType: "RISK_PREDICTION",
    projectId: "P-1042",
    projectName: "NH-48 Jaipur–Kishangarh Expansion",
    district: "Jaipur",
    actorId: "SYS-001",
    actorName: "Risk Engine",
    actorRole: "System",
    action: "Risk reassessed after intervention",
    severity: "Informational",
    previousState: "78%",
    newState: "64%",
    reason: "Pending compensation bottleneck resolved.",
    sourceModule: "Risk Engine",
    relatedRecordId: "PRED-992",
    changes: [
      { field: "Risk Score", before: "78%", after: "64%" }
    ]
  },
  {
    eventId: "AUD-7825",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    eventType: "ACTION_STATUS_CHANGED",
    projectId: "P-1042",
    projectName: "NH-48 Jaipur–Kishangarh Expansion",
    district: "Jaipur",
    actorId: "OFF-339",
    actorName: "Compensation Officer",
    actorRole: "Project Officer",
    action: "Status moved to IN PROGRESS",
    severity: "Low",
    previousState: "NEW",
    newState: "IN PROGRESS",
    reason: "Began processing targeted compensation case files.",
    sourceModule: "Recommendations",
    relatedRecordId: "ACT-841",
    changes: [
      { field: "Status", before: "NEW", after: "IN PROGRESS" }
    ]
  },
  {
    eventId: "AUD-7824",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    eventType: "ACTION_CREATED",
    projectId: "P-1042",
    projectName: "NH-48 Jaipur–Kishangarh Expansion",
    district: "Jaipur",
    actorId: "OFF-339",
    actorName: "Compensation Officer",
    actorRole: "Project Officer",
    action: "Action created",
    severity: "High",
    previousState: "None",
    newState: "NEW",
    reason: "Assigned additional processing capacity for 18 pending cases.",
    sourceModule: "Recommendations",
    relatedRecordId: "ACT-841",
    changes: [
      { field: "Assigned Officer", before: "Unassigned", after: "Compensation Officer" },
      { field: "Target Date", before: "None", after: "7 Days" }
    ]
  },
  {
    eventId: "AUD-7823",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 - 1000 * 60 * 20).toISOString(),
    eventType: "ALERT_ACKNOWLEDGED",
    projectId: "P-1042",
    projectName: "NH-48 Jaipur–Kishangarh Expansion",
    district: "Jaipur",
    actorId: "OFF-339",
    actorName: "Compensation Officer",
    actorRole: "Project Officer",
    action: "Alert acknowledged",
    severity: "Medium",
    previousState: "NEW",
    newState: "ACKNOWLEDGED",
    reason: "Officer reviewed the risk escalation and accepted responsibility for follow-up.",
    sourceModule: "Alerts & Early Warning",
    relatedRecordId: "ALT-2048",
    changes: [
      { field: "Status", before: "NEW", after: "ACKNOWLEDGED" }
    ]
  },
  {
    eventId: "AUD-7822",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 - 1000 * 60 * 45).toISOString(),
    eventType: "ALERT_CREATED",
    projectId: "P-1042",
    projectName: "NH-48 Jaipur–Kishangarh Expansion",
    district: "Jaipur",
    actorId: "SYS-002",
    actorName: "Alert Engine",
    actorRole: "System",
    action: "Critical risk escalation alert generated",
    severity: "Critical",
    previousState: "None",
    newState: "NEW",
    reason: "Stage-wise delay probability increased by 17 percentage points.",
    sourceModule: "Alerts & Early Warning",
    relatedRecordId: "ALT-2048",
    changes: []
  },
  {
    eventId: "AUD-7821",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 - 1000 * 60 * 60).toISOString(),
    eventType: "RISK_PREDICTION",
    projectId: "P-1042",
    projectName: "NH-48 Jaipur–Kishangarh Expansion",
    district: "Jaipur",
    actorId: "SYS-001",
    actorName: "Risk Engine",
    actorRole: "System",
    action: "Risk increased from 61% to 78%",
    severity: "High",
    previousState: "61%",
    newState: "78%",
    reason: "Pending compensation bottleneck detected.",
    sourceModule: "Risk Engine",
    relatedRecordId: "PRED-991",
    changes: [
      { field: "Risk Score", before: "61%", after: "78%" },
      { field: "Primary Driver", before: "None", after: "Pending Compensation" }
    ]
  },
  {
    eventId: "AUD-7750",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    eventType: "ESCALATION_CREATED",
    projectId: "P-1038",
    projectName: "Jaipur Ring Road Expansion",
    district: "Jaipur",
    actorId: "SYS-002",
    actorName: "Alert Engine",
    actorRole: "System",
    action: "Action escalated to District Officer",
    severity: "Critical",
    previousState: "Level 1",
    newState: "Level 2",
    reason: "Action overdue by 5 days.",
    sourceModule: "Alerts & Early Warning",
    relatedRecordId: "ACT-802",
    changes: [
      { field: "Escalation Level", before: "Project Officer", after: "District Officer" }
    ]
  }
];

export const openAccountabilityItems = [
  {
    action: "Resolve pending compensation cases",
    projectId: "P-1042",
    owner: "Compensation Officer",
    created: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    daysRemaining: 5,
    status: "IN PROGRESS"
  },
  {
    action: "Review stakeholder consultation strategy",
    projectId: "P-1071",
    owner: "Project Officer",
    created: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6).toISOString(),
    daysRemaining: 6,
    status: "NEW"
  }
];

export const overdueActions = [
  {
    projectId: "P-1038",
    action: "Complete R&R verification",
    owner: "R&R Officer",
    targetDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    daysOverdue: 5,
    escalationLevel: "Level 2"
  }
];

export const auditSummary = {
  totalEvents: 1284,
  todaysEvents: 47,
  criticalEvents: 8,
  administrativeActions: 19,
  systemEvents: 20
};
