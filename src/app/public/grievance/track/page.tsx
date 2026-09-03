"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronRight, Search, FileText, CheckCircle2, Circle, AlertCircle, Clock, Upload, ArrowRight } from 'lucide-react';
import { prototypeGrievances, PublicGrievance } from '../data';

function TrackingContent() {
  const searchParams = useSearchParams();
  const prefillRef = searchParams?.get('ref');

  const [reference, setReference] = useState(prefillRef || "");
  const [searched, setSearched] = useState(!!prefillRef);
  const [grievance, setGrievance] = useState<PublicGrievance | null>(null);
  const [addInfo, setAddInfo] = useState("");
  const [infoSubmitted, setInfoSubmitted] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    if (prefillRef) {
      handleSearch(prefillRef);
    }
  }, [prefillRef]);

  function handleSearch(refId: string) {
    setSearched(true);
    const found = prototypeGrievances.find(g => g.referenceId.toUpperCase() === refId.toUpperCase());
    setGrievance(found || null);
    setInfoSubmitted(false);
    setFeedbackSubmitted(false);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (reference.trim()) {
      handleSearch(reference.trim());
    }
  };

  const handleProvideInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setInfoSubmitted(true);
  };

  const handleFeedback = (helpful: boolean) => {
    setFeedbackSubmitted(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
      case 'ACKNOWLEDGED': return <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full">ACKNOWLEDGED</span>;
      case 'UNDER_REVIEW': return <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-full">UNDER REVIEW</span>;
      case 'ACTION_REQUIRED': return <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">ACTION REQUIRED</span>;
      case 'RESOLVED': return <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">RESOLVED</span>;
      case 'CLOSED': return <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">CLOSED</span>;
      default: return null;
    }
  };

  return (
    <>
      {/* SEARCH BAR */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 mb-8">
        <form onSubmit={submitSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              required
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Enter Grievance Reference Number (e.g., BD-GRV-10482)"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
            />
          </div>
          <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md shadow-sm transition-colors whitespace-nowrap">
            Track Status
          </button>
        </form>
      </div>

      {searched && !grievance && (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-12 text-center">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">No grievance found</h3>
          <p className="text-slate-600">No public grievance was found with reference number <strong className="font-mono">{reference}</strong>.</p>
          <p className="text-sm text-slate-500 mt-2">Please check the number and try again.</p>
        </div>
      )}

      {searched && grievance && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* MAIN COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* OVERVIEW CARD */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Reference Number</div>
                  <h2 className="text-2xl font-extrabold font-mono text-indigo-700">{grievance.referenceId}</h2>
                </div>
                <div className="flex flex-col sm:items-end">
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Current Status</div>
                  {getStatusBadge(grievance.status)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">{grievance.subject}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Category</div>
                    <div className="text-sm font-semibold text-slate-800">{grievance.category}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Project</div>
                    <div className="text-sm font-bold text-blue-600">
                      <Link href={`/public/projects/${grievance.projectId}`} className="hover:underline">{grievance.projectId}</Link>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">District</div>
                    <div className="text-sm font-semibold text-slate-800">{grievance.district}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Submitted</div>
                    <div className="text-sm font-semibold text-slate-800">{grievance.submittedAt}</div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Description</div>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">{grievance.description}</p>
                </div>
              </div>
            </div>

            {/* ACTION REQUIRED PANEL */}
            {grievance.status === 'ACTION_REQUIRED' && !infoSubmitted && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" /> Additional Information Required
                </h3>
                <p className="text-sm text-amber-800 mb-6">
                  Additional project-related information is required to continue reviewing this grievance. Please provide the requested details below.
                </p>
                <form onSubmit={handleProvideInfo} className="bg-white p-5 rounded border border-amber-100">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Your Response <span className="text-rose-500">*</span></label>
                  <textarea 
                    required 
                    rows={4} 
                    value={addInfo}
                    onChange={(e) => setAddInfo(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4"
                  ></textarea>
                  
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Attachment (Optional)</label>
                  <div className="border border-dashed border-slate-300 rounded-md p-4 text-center hover:bg-slate-50 transition-colors mb-4 cursor-pointer flex items-center justify-center">
                    <Upload className="w-4 h-4 text-slate-400 mr-2" />
                    <span className="text-sm font-bold text-indigo-600">Browse files</span>
                  </div>
                  
                  <div className="flex justify-end">
                    <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 text-sm font-bold rounded-md shadow-sm transition-colors">
                      Submit Information
                    </button>
                  </div>
                </form>
              </div>
            )}

            {infoSubmitted && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm p-6 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-emerald-900 mb-1">Information Received</h3>
                <p className="text-sm text-emerald-800">Thank you. Your response has been added to the grievance record and it will now continue under review.</p>
              </div>
            )}

            {/* RESOLUTION PANEL */}
            {(grievance.status === 'RESOLVED' || grievance.status === 'CLOSED') && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Resolution Summary
                </h3>
                <div className="bg-white p-4 rounded border border-emerald-100 text-sm text-slate-800 leading-relaxed mb-6">
                  {grievance.resolutionSummary}
                </div>
                
                {!feedbackSubmitted ? (
                  <div className="border-t border-emerald-200/50 pt-4">
                    <p className="text-sm font-bold text-emerald-900 mb-3 text-center">Was this response helpful?</p>
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleFeedback(true)} className="px-6 py-2 bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 font-bold text-sm rounded shadow-sm transition-colors">Yes</button>
                      <button onClick={() => handleFeedback(false)} className="px-6 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-sm rounded shadow-sm transition-colors">No</button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-emerald-200/50 pt-4 text-center">
                    <p className="text-sm font-bold text-emerald-700">Thank you for your feedback.</p>
                  </div>
                )}
              </div>
            )}

            {/* NEXT STEP */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg shadow-sm p-6 flex items-start">
              <ArrowRight className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Expected Next Step</h3>
                <p className="text-sm text-slate-600">
                  {grievance.status === 'SUBMITTED' || grievance.status === 'ACKNOWLEDGED' ? 'Your grievance will be assigned to a reviewing officer shortly.' :
                   grievance.status === 'UNDER_REVIEW' ? 'Your grievance is currently under review. Additional information may be requested if required.' :
                   grievance.status === 'ACTION_REQUIRED' ? 'Waiting for your response to continue the review process.' :
                   grievance.status === 'RESOLVED' ? 'The issue has been resolved. The ticket will automatically close.' :
                   'This grievance is closed. No further action is expected.'}
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            
            {/* TIMELINE */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center uppercase tracking-wider">
                <Clock className="w-4 h-4 mr-2 text-indigo-600" /> Status Timeline
              </h3>
              
              <div className="relative">
                <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-slate-200 z-0"></div>
                
                <div className="space-y-5 relative z-10">
                  {grievance.timeline.map((event, i) => {
                    const isCompleted = event.active && event.date;
                    const isCurrent = event.active && !event.date;
                    
                    let iconColor = "text-slate-300";
                    let bgColor = "bg-slate-100 border-slate-300";
                    let textColor = "text-slate-400";
                    let dateColor = "text-slate-400";
                    
                    if (isCompleted) {
                      iconColor = "text-emerald-500";
                      bgColor = "bg-white border-white";
                      textColor = "text-slate-900";
                      dateColor = "text-slate-500";
                    } else if (isCurrent) {
                      iconColor = "text-indigo-600";
                      bgColor = "bg-indigo-50 border-indigo-200";
                      textColor = "text-indigo-700 font-bold";
                      dateColor = "text-indigo-500";
                    }

                    return (
                      <div key={i} className="flex gap-4">
                        <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${bgColor} bg-white relative z-10`}>
                          {isCompleted ? <CheckCircle2 className={`w-4 h-4 ${iconColor} bg-white rounded-full`} /> : <Circle className={`w-3 h-3 ${iconColor} fill-current`} />}
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold ${textColor}`}>{event.status.replace('_', ' ')}</h4>
                          <div className={`text-xs ${dateColor} mt-0.5`}>
                            {event.date ? event.date : isCurrent ? 'Current Phase' : 'Pending'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* PUBLIC UPDATES */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center uppercase tracking-wider">
                <FileText className="w-4 h-4 mr-2 text-indigo-600" /> Public Updates
              </h3>
              
              <div className="space-y-4 divide-y divide-slate-100">
                {grievance.publicUpdates.map((update, idx) => (
                  <div key={idx} className={idx > 0 ? "pt-4" : ""}>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">{update.date}</div>
                    <div className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                      {update.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default function GrievanceTrackingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/public" className="text-sm font-medium text-slate-500 hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/public/grievance" className="text-sm font-medium text-slate-500 hover:text-indigo-600">Grievance</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sm font-bold text-slate-800">Track</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Track Your Grievance</h1>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading tracking module...</div>}>
        <TrackingContent />
      </Suspense>
    </div>
  );
}
