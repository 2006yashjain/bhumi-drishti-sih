export type GrievanceStatus = 
  | 'SUBMITTED'
  | 'ACKNOWLEDGED'
  | 'UNDER_REVIEW'
  | 'ACTION_REQUIRED'
  | 'RESOLVED'
  | 'CLOSED';

export interface TimelineEvent {
  status: GrievanceStatus;
  date: string | null;
  active: boolean;
}

export interface PublicGrievance {
  referenceId: string;
  projectId: string;
  category: string;
  subject: string;
  description: string;
  district: string;
  submittedAt: string;
  status: GrievanceStatus;
  lastUpdated: string;
  publicUpdates: { date: string; message: string }[];
  resolutionSummary?: string;
  timeline: TimelineEvent[];
}

export const prototypeGrievances: PublicGrievance[] = [
  {
    referenceId: "BD-GRV-10482",
    projectId: "P-1042",
    category: "Compensation",
    subject: "Delay in compensation disbursement",
    description: "My land is part of the highway expansion project but I haven't received the second tranche of compensation yet.",
    district: "Jaipur",
    submittedAt: "01 Sep 2026",
    status: "UNDER_REVIEW",
    lastUpdated: "03 Sep 2026",
    publicUpdates: [
      { date: "01 Sep 2026", message: "Grievance received and acknowledged." },
      { date: "03 Sep 2026", message: "Your grievance is currently under review by the district administration." }
    ],
    timeline: [
      { status: 'SUBMITTED', date: '01 Sep 2026', active: true },
      { status: 'ACKNOWLEDGED', date: '01 Sep 2026', active: true },
      { status: 'UNDER_REVIEW', date: '03 Sep 2026', active: true },
      { status: 'ACTION_REQUIRED', date: null, active: false },
      { status: 'RESOLVED', date: null, active: false },
      { status: 'CLOSED', date: null, active: false }
    ]
  },
  {
    referenceId: "BD-GRV-10476",
    projectId: "P-1038",
    category: "R&R",
    subject: "Missing name in R&R beneficiary list",
    description: "My family resides in the affected zone but our name is missing from the recently published draft list.",
    district: "Jaipur",
    submittedAt: "28 Aug 2026",
    status: "ACTION_REQUIRED",
    lastUpdated: "02 Sep 2026",
    publicUpdates: [
      { date: "28 Aug 2026", message: "Grievance received and acknowledged." },
      { date: "30 Aug 2026", message: "Your grievance is currently under review." },
      { date: "02 Sep 2026", message: "Additional project-related information is required to continue reviewing this grievance. Please provide proof of residence." }
    ],
    timeline: [
      { status: 'SUBMITTED', date: '28 Aug 2026', active: true },
      { status: 'ACKNOWLEDGED', date: '28 Aug 2026', active: true },
      { status: 'UNDER_REVIEW', date: '30 Aug 2026', active: true },
      { status: 'ACTION_REQUIRED', date: '02 Sep 2026', active: true },
      { status: 'RESOLVED', date: null, active: false },
      { status: 'CLOSED', date: null, active: false }
    ]
  },
  {
    referenceId: "BD-GRV-10431",
    projectId: "P-1092",
    category: "Project Information",
    subject: "Clarification on land boundaries",
    description: "I need to know if survey number 45/2 is completely or partially acquired.",
    district: "Pune",
    submittedAt: "15 Aug 2026",
    status: "RESOLVED",
    lastUpdated: "25 Aug 2026",
    resolutionSummary: "Published project information was reviewed and the requested boundary clarification for survey 45/2 has been added to the project portal.",
    publicUpdates: [
      { date: "15 Aug 2026", message: "Grievance received and acknowledged." },
      { date: "18 Aug 2026", message: "Under review by the survey department." },
      { date: "25 Aug 2026", message: "Grievance has been resolved. Please check the resolution summary." }
    ],
    timeline: [
      { status: 'SUBMITTED', date: '15 Aug 2026', active: true },
      { status: 'ACKNOWLEDGED', date: '15 Aug 2026', active: true },
      { status: 'UNDER_REVIEW', date: '18 Aug 2026', active: true },
      { status: 'ACTION_REQUIRED', date: null, active: false },
      { status: 'RESOLVED', date: '25 Aug 2026', active: true },
      { status: 'CLOSED', date: null, active: false }
    ]
  },
  {
    referenceId: "BD-GRV-10398",
    projectId: "P-1042",
    category: "Public Notice",
    subject: "Public hearing venue not accessible",
    description: "The venue mentioned in notice NOTICE-1042-03 is not accessible by public transport.",
    district: "Jaipur",
    submittedAt: "10 Aug 2026",
    status: "CLOSED",
    lastUpdated: "14 Aug 2026",
    resolutionSummary: "Feedback acknowledged. An alternative venue was arranged and an updated notice (NOTICE-1042-04) was published.",
    publicUpdates: [
      { date: "10 Aug 2026", message: "Grievance received and acknowledged." },
      { date: "12 Aug 2026", message: "Under review by administration." },
      { date: "14 Aug 2026", message: "Issue resolved and closed." }
    ],
    timeline: [
      { status: 'SUBMITTED', date: '10 Aug 2026', active: true },
      { status: 'ACKNOWLEDGED', date: '10 Aug 2026', active: true },
      { status: 'UNDER_REVIEW', date: '12 Aug 2026', active: true },
      { status: 'ACTION_REQUIRED', date: null, active: false },
      { status: 'RESOLVED', date: '14 Aug 2026', active: true },
      { status: 'CLOSED', date: '14 Aug 2026', active: true }
    ]
  }
];
