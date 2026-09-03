export const recommendationRules = [
  {
    driver: "Pending Compensation",
    severity: "CRITICAL",
    action: "Resolve pending compensation cases",
    owner_role: "Compensation Officer",
    default_timeline_days: 7,
    rationale: "Pending compensation is currently the strongest contributor to the project's estimated delay risk. Immediate resolution prevents cascading delays in possession and civil works.",
    triggers: ["unresolved compensation cases", "payment processing delay", "disbursement backlog"],
    steps: ["verify pending beneficiary/payment records", "prioritize unresolved disbursement cases", "escalate blocked cases", "assign responsible compensation officer"]
  },
  {
    driver: "Low R&R Progress",
    severity: "HIGH",
    action: "Review incomplete rehabilitation cases",
    owner_role: "R&R Officer",
    default_timeline_days: 14,
    rationale: "Delays in Rehabilitation and Resettlement block physical possession of the land.",
    triggers: ["pending R&R beneficiaries", "delayed housing allocation"],
    steps: ["identify pending R&R beneficiaries", "review incomplete rehabilitation cases", "escalate unresolved entitlements", "schedule district review"]
  },
  {
    driver: "Stakeholder Responsiveness",
    severity: "HIGH",
    action: "Initiate stakeholder follow-up and grievance review",
    owner_role: "Project Officer",
    default_timeline_days: 10,
    rationale: "Low responsiveness indicates potential opposition or lack of awareness, leading to blockades or litigation.",
    triggers: ["unanswered notices", "low attendance at hearings"],
    steps: ["trigger stakeholder follow-up", "schedule consultation/grievance camp", "escalate unanswered communications", "assign project officer"]
  },
  {
    driver: "Legal Dispute",
    severity: "MEDIUM",
    action: "Review unresolved legal cases",
    owner_role: "Legal Officer",
    default_timeline_days: 21,
    rationale: "Active litigation freezes acquisition proceedings until court clearance.",
    triggers: ["active court stay", "new petition filed"],
    steps: ["review unresolved case status", "prioritize document/legal response", "coordinate with legal cell", "track upcoming hearings/deadlines"]
  },
  {
    driver: "Approval Delays",
    severity: "CRITICAL",
    action: "Escalate overdue administrative approval",
    owner_role: "Nodal Officer",
    default_timeline_days: 5,
    rationale: "File processing delays completely halt the acquisition timeline.",
    triggers: ["file pending > 30 days", "missing signature"],
    steps: ["identify pending approval authority", "escalate overdue approval", "notify responsible department", "set administrative review deadline"]
  }
];

export const summaryData = {
  totalOpen: 96,
  critical: 18,
  highPriority: 31,
  overdue: 12,
  completed: 74
};

export const initialActions = [
  {
    action_id: "ACT-1042",
    project_id: "P-1042",
    district: "Jaipur",
    risk_driver: "Pending Compensation",
    recommendation: "Resolve 18 pending compensation cases",
    priority: "CRITICAL",
    current_risk: 78,
    owner_role: "Compensation Officer",
    assigned_to: "Rajesh Kumar",
    department: "Revenue",
    created_at: "2026-09-03",
    due_date: "2026-09-10",
    status: "Action Required",
    notes: "18 cases blocked due to documentation issues.",
    updated_at: "2026-09-03"
  },
  {
    action_id: "ACT-1187",
    project_id: "P-1187",
    district: "Kota",
    risk_driver: "Low R&R Progress",
    recommendation: "Review 11 pending R&R cases",
    priority: "HIGH",
    current_risk: 71,
    owner_role: "R&R Officer",
    assigned_to: "Sunita Sharma",
    department: "Social Welfare",
    created_at: "2026-08-28",
    due_date: "2026-09-12",
    status: "Assigned",
    notes: "Awaiting site inspection for alternative housing.",
    updated_at: "2026-08-30"
  },
  {
    action_id: "ACT-1314",
    project_id: "P-1314",
    district: "Alwar",
    risk_driver: "Pending Compensation",
    recommendation: "Escalate unresolved compensation disbursement",
    priority: "CRITICAL",
    current_risk: 86,
    owner_role: "District Compensation Officer",
    assigned_to: "Unassigned",
    department: "Revenue",
    created_at: "2026-08-20",
    due_date: "2026-08-27",
    status: "Overdue",
    notes: "Funds not received from state treasury.",
    updated_at: "2026-08-28"
  },
  {
    action_id: "ACT-0921",
    project_id: "P-0921",
    district: "Ajmer",
    risk_driver: "Stakeholder Responsiveness",
    recommendation: "Initiate stakeholder follow-up and grievance review",
    priority: "HIGH",
    current_risk: 64,
    owner_role: "Project Officer",
    assigned_to: "Amit Patel",
    department: "Project Management Unit",
    created_at: "2026-09-01",
    due_date: "2026-09-14",
    status: "In Progress",
    notes: "Grievance camp scheduled for 10 Sep.",
    updated_at: "2026-09-02"
  }
];

export const interventionImpact = {
  project_id: "P-1042",
  beforeRisk: 78,
  afterRisk: 63,
  change: -15,
  driver: "Pending Compensation",
  casesResolved: 14,
  totalCases: 18,
  status: "Improving"
};
