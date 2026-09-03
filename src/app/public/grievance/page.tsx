"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, CheckCircle2, AlertCircle, Search, Upload, Info } from 'lucide-react';
import { publicProjects } from '../data';

function GrievanceFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillProject = searchParams?.get('project');
  const prefillCategory = searchParams?.get('category');

  const [projectId, setProjectId] = useState(prefillProject || "");
  const [categoryId, setCategoryId] = useState(prefillCategory || "");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const selectedProject = projectId ? publicProjects.find(pr => pr.projectId === projectId) : null;
  const projectName = selectedProject?.projectName || "";
  const district = selectedProject?.district || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Deterministic duplicate check simulation
    if (description.includes("test duplicate")) {
      alert("Possible duplicate grievance detected. For this prototype, we will proceed.");
    }
    
    // Generate deterministic-looking ID
    const newRef = `BD-GRV-${Math.floor(10000 + Math.random() * 90000)}`;
    setReferenceId(newRef);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Grievance Submitted</h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Your grievance has been successfully recorded in the prototype system. Please save this reference number to track its progress.
        </p>
        
        <div className="inline-block bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8 w-full max-w-sm">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Reference Number</div>
          <div className="text-3xl font-mono font-extrabold text-indigo-700 tracking-tight">{referenceId}</div>
          <div className="flex justify-between items-center mt-6 text-sm">
            <span className="font-semibold text-slate-500">Status</span>
            <span className="font-bold text-slate-800">SUBMITTED</span>
          </div>
          <div className="flex justify-between items-center mt-2 text-sm">
            <span className="font-semibold text-slate-500">Date</span>
            <span className="font-bold text-slate-800">03 Sep 2026</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href={`/public/grievance/track?ref=${referenceId}`} className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors">
            Track Grievance
          </Link>
          <Link href="/public" className="inline-flex justify-center items-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-colors">
            Back to Public Portal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-200 bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Submit a Grievance</h2>
        <p className="text-slate-600">Please provide detailed information to help us address your issue efficiently.</p>
        <div className="mt-4 inline-flex items-center text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-md">
          <Info className="w-4 h-4 mr-2" /> Prototype System: submissions are not connected to a live government system.
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-10">
        
        {/* SECTION A: Project Info */}
        <section>
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">A. Project Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Select Project <span className="text-rose-500">*</span></label>
              <select 
                required
                value={projectId} 
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">Select a project...</option>
                {publicProjects.map(p => <option key={p.projectId} value={p.projectId}>{p.projectId} - {p.projectName}</option>)}
              </select>
            </div>
            {projectId && (
              <div className="bg-slate-50 border border-slate-200 rounded p-3 text-sm">
                <div className="font-bold text-slate-800">{projectName}</div>
                <div className="text-slate-600 mt-1">{district} District</div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION B: Grievance Details */}
        <section>
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">B. Grievance Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Category <span className="text-rose-500">*</span></label>
              <select 
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">Select category...</option>
                <option value="Compensation">Compensation</option>
                <option value="R&R">Rehabilitation & Resettlement</option>
                <option value="Project Information">Project Information</option>
                <option value="Public Notice">Public Notice Inquiry</option>
                <option value="Acquisition Process">Acquisition Process</option>
                <option value="Possession">Possession</option>
                <option value="Document Request">Document / Information Request</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Subject <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                required 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of the issue"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Description <span className="text-rose-500">*</span></label>
            <p className="text-xs text-slate-500 mb-2">Please describe the issue clearly. Do not include sensitive personal information unless necessary.</p>
            <textarea 
              required 
              rows={5} 
              minLength={20}
              maxLength={1000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <div className="text-right text-xs text-slate-500 font-medium mt-1">{description.length} / 1000</div>
          </div>
        </section>

        {/* SECTION C: Contact */}
        <section>
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">C. Contact Information</h3>
          <p className="text-xs text-slate-500 mb-4">This information will be kept confidential and is required to contact you regarding updates.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Mobile Number <span className="text-rose-500">*</span></label>
              <input 
                type="tel" 
                required 
                pattern="[0-9]{10}"
                placeholder="10 digit number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address (Optional)</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-1/2" 
              />
            </div>
          </div>
        </section>

        {/* SECTION D: Attachment */}
        <section>
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">D. Attachment (Optional)</h3>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-indigo-600 cursor-pointer">Click to browse</div>
            <div className="text-xs text-slate-500 mt-1">Accepted prototype types: PDF, JPG, PNG (Max: 5 MB)</div>
            <div className="text-[10px] bg-slate-100 text-slate-600 inline-block px-2 py-1 rounded mt-3 font-medium">Prototype attachment handling only</div>
          </div>
        </section>

        {/* CONSENT & SUBMIT */}
        <section className="pt-4 border-t border-slate-200">
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input 
                id="consent" 
                type="checkbox" 
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 rounded focus:ring-indigo-500" 
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="consent" className="font-bold text-slate-700">I confirm that the information provided is accurate to the best of my knowledge.</label>
              <p className="text-slate-500 mt-1">Do not submit passwords, financial credentials, or unnecessary sensitive personal information. In a production deployment, appropriate privacy, retention, and access controls apply.</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-bold rounded-md shadow-sm transition-colors"
            >
              Submit Grievance
            </button>
          </div>
        </section>

      </form>
    </div>
  );
}

export default function GrievanceSubmissionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/public" className="text-sm font-medium text-slate-500 hover:text-indigo-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sm font-bold text-slate-800">Grievance & Citizen Support</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Grievance & Citizen Support</h1>
          <p className="text-slate-600 max-w-2xl">
            Submit an issue related to a published land acquisition project and track its progress using your grievance reference number.
          </p>
        </div>
        <Link href="/public/grievance/track" className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50 font-bold rounded-md transition-colors">
          <Search className="w-4 h-4 mr-2" /> Track Grievance
        </Link>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading form...</div>}>
        <GrievanceFormContent />
      </Suspense>
    </div>
  );
}
