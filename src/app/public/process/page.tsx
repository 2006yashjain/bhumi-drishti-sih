import React from 'react';
import Link from 'next/link';
import { ChevronRight, FileText, Users, Building, Scale, MapPin, Handshake, CheckCircle } from 'lucide-react';

export default function AcquisitionProcessPage() {
  const steps = [
    {
      title: "1. Preliminary Notification",
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      purpose: "To officially inform the public that land in a specific area is needed for a public purpose.",
      whatHappens: "The government publishes a notification in the Official Gazette and local newspapers. It includes details of the land and the public purpose.",
      expectations: "Citizens can expect survey teams to visit the land to assess its suitability.",
      published: "Preliminary Notification Document, Survey Notices."
    },
    {
      title: "2. Social Impact Assessment (SIA)",
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      purpose: "To evaluate the social costs and benefits of the project and its impact on affected families.",
      whatHappens: "An independent body conducts a study, consults with the community, and prepares an SIA report and a Social Impact Management Plan.",
      expectations: "Citizens can expect to participate in public hearings and consultations.",
      published: "SIA Report, Public Hearing Notices."
    },
    {
      title: "3. Declaration",
      icon: <Building className="w-6 h-6 text-indigo-600" />,
      purpose: "To formally declare that the specified land is required for the project.",
      whatHappens: "Following the approval of the SIA report, the government issues a declaration within a stipulated timeframe, identifying the exact parcels of land to be acquired.",
      expectations: "Landowners will receive formal notices (under Section 21) inviting claims for compensation.",
      published: "Declaration Notification, Section 21 Notices."
    },
    {
      title: "4. Compensation",
      icon: <Scale className="w-6 h-6 text-indigo-600" />,
      purpose: "To determine and disburse fair compensation to landowners and affected families.",
      whatHappens: "The Collector holds an inquiry into the claims, determines the market value of the land, calculates the total compensation (including solatium), and makes an award.",
      expectations: "Affected persons submit their claims, participate in the inquiry, and receive the awarded compensation.",
      published: "Compensation Award Details (Public Summary)."
    },
    {
      title: "5. Rehabilitation & Resettlement (R&R)",
      icon: <Handshake className="w-6 h-6 text-indigo-600" />,
      purpose: "To ensure that affected families are adequately rehabilitated and resettled.",
      whatHappens: "An R&R award is prepared detailing the entitlements (housing, employment, annuities, etc.) for each affected family, followed by the implementation of the R&R plan.",
      expectations: "Eligible families receive their R&R entitlements as per the approved plan.",
      published: "R&R Draft Plan, R&R Final Award."
    },
    {
      title: "6. Possession",
      icon: <MapPin className="w-6 h-6 text-indigo-600" />,
      purpose: "To take physical control of the acquired land.",
      whatHappens: "After the full payment of compensation and provision of R&R entitlements, the Collector takes possession of the land, which then vests absolutely in the government free from all encumbrances.",
      expectations: "Landowners vacate the property and hand it over to the authorities.",
      published: "Possession Notices."
    },
    {
      title: "7. Completion",
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      purpose: "To formally close the acquisition process and transfer the land to the requiring body.",
      whatHappens: "All acquisition formalities are completed, records are updated, and the land is handed over for project execution.",
      expectations: "The acquisition process concludes, and project construction/implementation begins.",
      published: "Project Completion Notification."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      
      <div className="mb-6">
        <Link href="/public" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
          Home <ChevronRight className="w-4 h-4 mx-1" /> Process
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">How Land Acquisition Works</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Understanding the standard lifecycle of a public land acquisition project from initial notification to final completion.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-10 text-center">
        <p className="text-sm font-medium text-amber-800">
          <strong>Disclaimer:</strong> Information provided here is for general understanding. Applicable laws, official notifications, and specific state rules govern individual cases. This is a prototype demonstration.
        </p>
      </div>

      <div className="space-y-12 relative">
        {/* Connecting Line */}
        <div className="hidden md:block absolute left-8 top-10 bottom-10 w-0.5 bg-indigo-100 z-0"></div>

        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="hidden md:flex flex-col items-center shrink-0">
              <div className="w-16 h-16 bg-white border-2 border-indigo-100 rounded-full flex items-center justify-center shadow-sm">
                {step.icon}
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm flex-1 hover:shadow-md transition-shadow">
              <div className="md:hidden w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Purpose</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{step.purpose}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">What Happens</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{step.whatHappens}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">What Citizens Can Expect</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{step.expectations}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Information Typically Published</h3>
                  <p className="text-sm text-indigo-700 font-medium">{step.published}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/public" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors">
          Return to Public Portal
        </Link>
      </div>

    </div>
  );
}
