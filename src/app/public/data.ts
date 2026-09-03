export const publicProjects = [
  {
    projectId: "P-1042",
    projectName: "NH-48 Jaipur–Kishangarh Expansion",
    state: "Rajasthan",
    district: "Jaipur",
    village: "Kishangarh Area",
    projectType: "Highway Expansion",
    landArea: "320 ha",
    affectedFamilies: 27,
    currentStage: "Compensation",
    publicProgress: 68,
    publicStatus: "Active",
    acquisitionStart: "01 Aug 2026",
    lastPublicUpdate: "03 Sep 2026",
    latitude: 26.85,
    longitude: 75.8,
    timeline: [
      { stage: "Preliminary Notification", status: "Completed", date: "15 Aug 2026" },
      { stage: "SIA / Assessment", status: "Completed", date: "22 Aug 2026" },
      { stage: "Declaration", status: "Completed", date: "28 Aug 2026" },
      { stage: "Compensation", status: "In Progress", date: "Ongoing" },
      { stage: "R&R", status: "Upcoming", date: "Pending" },
      { stage: "Possession", status: "Upcoming", date: "Pending" },
      { stage: "Completion", status: "Upcoming", date: "Pending" }
    ],
    documents: [
      { title: "Public Hearing Notification", type: "Public Hearing", published: "22 Aug 2026", status: "Available" },
      { title: "Declaration of Land Acquisition", type: "Acquisition Notice", published: "28 Aug 2026", status: "Available" }
    ]
  },
  {
    projectId: "P-1038",
    projectName: "Jaipur Ring Road Expansion",
    state: "Rajasthan",
    district: "Jaipur",
    village: "Ring Road Area",
    projectType: "Infrastructure",
    landArea: "150 ha",
    affectedFamilies: 45,
    currentStage: "R&R",
    publicProgress: 84,
    publicStatus: "Active",
    acquisitionStart: "10 Jul 2026",
    lastPublicUpdate: "03 Sep 2026",
    latitude: 26.75,
    longitude: 75.7,
    timeline: [
      { stage: "Preliminary Notification", status: "Completed", date: "15 Jul 2026" },
      { stage: "SIA / Assessment", status: "Completed", date: "22 Jul 2026" },
      { stage: "Declaration", status: "Completed", date: "01 Aug 2026" },
      { stage: "Compensation", status: "Completed", date: "20 Aug 2026" },
      { stage: "R&R", status: "In Progress", date: "Ongoing" },
      { stage: "Possession", status: "Upcoming", date: "Pending" },
      { stage: "Completion", status: "Upcoming", date: "Pending" }
    ],
    documents: [
      { title: "Initial Notification", type: "Acquisition Notice", published: "15 Jul 2026", status: "Available" }
    ]
  },
  {
    projectId: "P-1092",
    projectName: "Pune Metro Line 3 Ext",
    state: "Maharashtra",
    district: "Pune",
    village: "Hinjawadi",
    projectType: "Urban Transit",
    landArea: "45 ha",
    affectedFamilies: 120,
    currentStage: "SIA / Assessment",
    publicProgress: 25,
    publicStatus: "Active",
    acquisitionStart: "20 Aug 2026",
    lastPublicUpdate: "02 Sep 2026",
    latitude: 18.59,
    longitude: 73.73,
    timeline: [
      { stage: "Preliminary Notification", status: "Completed", date: "25 Aug 2026" },
      { stage: "SIA / Assessment", status: "In Progress", date: "Ongoing" },
      { stage: "Declaration", status: "Upcoming", date: "Pending" },
      { stage: "Compensation", status: "Upcoming", date: "Pending" },
      { stage: "R&R", status: "Upcoming", date: "Pending" },
      { stage: "Possession", status: "Upcoming", date: "Pending" },
      { stage: "Completion", status: "Upcoming", date: "Pending" }
    ],
    documents: [
      { title: "SIA Initiation Notice", type: "Project Notice", published: "25 Aug 2026", status: "Available" }
    ]
  }
];

export const publicNotices = [
  {
    noticeId: "NOTICE-1042-03",
    title: "Public Hearing Information",
    projectId: "P-1042",
    project: "NH-48 Jaipur–Kishangarh Expansion",
    district: "Jaipur",
    publishedDate: "03 Sep 2026",
    category: "Public Hearing",
    summary: "Notice regarding the upcoming public hearing for stakeholders affected by the NH-48 expansion project. Hearing to discuss compensation valuation procedures."
  },
  {
    noticeId: "NOTICE-1038-08",
    title: "Rehabilitation Draft Plan Published",
    projectId: "P-1038",
    project: "Jaipur Ring Road Expansion",
    district: "Jaipur",
    publishedDate: "01 Sep 2026",
    category: "R&R",
    summary: "The draft R&R plan has been published for public review. Affected families are requested to submit feedback by 15 Sep 2026."
  },
  {
    noticeId: "NOTICE-1092-01",
    title: "Preliminary Land Survey Notification",
    projectId: "P-1092",
    project: "Pune Metro Line 3 Ext",
    district: "Pune",
    publishedDate: "28 Aug 2026",
    category: "Acquisition Notice",
    summary: "Notification of preliminary land survey initiation in Hinjawadi area for the Pune Metro extension."
  }
];

export const publicStats = {
  projectsPublished: 48,
  projectsActive: 31,
  projectsCompleted: 7,
  districtsCovered: 8,
  recentNotices: 24
};
