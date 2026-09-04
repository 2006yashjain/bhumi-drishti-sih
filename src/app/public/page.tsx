"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Activity, Calendar, FileText, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { publicNotices, publicStats } from './data';
import { publicApi } from '@/services/api/publicApi';

interface PublicProject {
  project_code: string;
  project_name: string;
  district?: string;
  state?: string;
  project_type?: string;
  current_stage?: string;
  public_progress?: number;
  project_status?: string;
}

export default function PublicPortalHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      async function loadProjects() {
        setIsLoading(true);
        setError(null);
        try {
          const data = await publicApi.getProjects(searchQuery) as any;
          setProjects(data);
        } catch (err) {
          console.error("Failed to fetch public projects:", err);
          setError("Unable to load project data.");
        } finally {
          setIsLoading(false);
        }
      }
      loadProjects();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Transparent Land Acquisition Information
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Track project progress, understand acquisition stages, access public notices, and stay informed about land acquisition activities in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#search" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors">
                Search Projects
              </a>
              <Link href="/public/process" className="inline-flex justify-center items-center px-6 py-3 border border-slate-600 text-base font-medium rounded-md text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors">
                Understand the Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-x divide-slate-100 text-center">
            <div className="px-4">
              <div className="text-2xl font-bold text-slate-900">{publicStats.projectsPublished}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Projects Published</div>
            </div>
            <div className="px-4">
              <div className="text-2xl font-bold text-indigo-600">{publicStats.projectsActive}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Projects Active</div>
            </div>
            <div className="px-4">
              <div className="text-2xl font-bold text-emerald-600">{publicStats.projectsCompleted}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Projects Completed</div>
            </div>
            <div className="px-4">
              <div className="text-2xl font-bold text-slate-900">{publicStats.districtsCovered}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Districts Covered</div>
            </div>
            <div className="px-4">
              <div className="text-2xl font-bold text-amber-600">{publicStats.recentNotices}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Recent Notices</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH PROJECTS SECTION */}
      <section id="search" className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Search Land Acquisition Projects</h2>
          <p className="text-slate-600">Find publicly available information about ongoing and completed projects.</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by Project ID (e.g., P-1042), Name, or District..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          <button 
            onClick={() => setSearchQuery("")}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-md border border-slate-200 text-sm transition-colors"
          >
            Reset
          </button>
        </div>

        {/* PROJECT LIST */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Project</th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Stage & Progress</th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-3"></div>
                      <p className="text-sm font-medium">Loading projects...</p>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-rose-500">
                      <AlertCircle className="w-8 h-8 mx-auto text-rose-400 mb-3" />
                      <p className="text-sm font-medium">{error}</p>
                      <button onClick={() => window.location.reload()} className="text-xs mt-2 text-indigo-600 font-medium">Retry</button>
                    </td>
                  </tr>
                ) : projects.length > 0 ? (
                  projects.map((project) => (
                    <tr key={project.project_code} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-indigo-600">{project.project_code}</div>
                        <div className="text-sm text-slate-900 font-medium truncate max-w-xs">{project.project_name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{project.project_type || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-slate-900">
                          <MapPin className="w-4 h-4 mr-1 text-slate-400 flex-shrink-0" />
                          {project.district || 'N/A'}, {project.state || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-slate-800">{project.current_stage || 'Unknown'}</div>
                        <div className="w-32 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden border border-slate-200">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${project.public_progress || 0}%` }}></div>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 font-medium">{project.public_progress || 0}% Complete</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full uppercase tracking-wider ${
                          project.project_status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {project.project_status || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/public/projects/${project.project_code}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-900 font-bold bg-indigo-50 px-3 py-1.5 rounded transition-colors">
                          View Details <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      <Search className="w-8 h-8 mx-auto text-slate-300 mb-3" />
                      <p className="text-sm font-medium">No public projects match your search.</p>
                      <p className="text-xs mt-1">Try adjusting your search terms.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* LATEST NOTICES */}
      <section id="notices" className="bg-slate-50 py-12 md:py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Latest Public Notices</h2>
              <p className="text-slate-600">Official notifications regarding land acquisition activities.</p>
            </div>
            <Link href="#" className="hidden sm:inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800">
              View All Notices <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publicNotices.map((notice) => (
              <div key={notice.noticeId} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                    {notice.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {notice.publishedDate}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight">{notice.title}</h3>
                <div className="text-xs font-semibold text-slate-500 mb-3 flex items-center">
                  <Activity className="w-3.5 h-3.5 mr-1.5" />
                  {notice.project} ({notice.district})
                </div>
                <p className="text-sm text-slate-600 mb-6 flex-1 line-clamp-3">
                  {notice.summary}
                </p>
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100 mb-3">
                  <span className="text-xs font-mono text-slate-400">{notice.noticeId}</span>
                  <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center">
                    Read <ChevronRight className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
                <Link href={`/public/grievance?project=${notice.projectId}&category=Public%20Notice`} className="block text-center text-[10px] font-bold text-slate-500 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 border border-slate-200 rounded py-1.5 transition-colors">
                  Report an issue with this information
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="#" className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800">
              View All Notices <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* TRANSPARENCY EXPLANATION */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-900 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row">
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center text-white">
            <h2 className="text-2xl font-bold mb-4">Transparency at Every Stage</h2>
            <p className="text-indigo-200 mb-6 leading-relaxed">
              Bhumi Drishti provides a public view for citizens while keeping restricted administrative intelligence inside the official portal. This dual-architecture ensures transparency without compromising operational security.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Citizens access project status, timelines, and public notices.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Officials securely access delay-risk predictions, alerts, and corrective actions.</span>
              </li>
            </ul>
          </div>
          <div className="bg-indigo-800 p-8 md:w-1/2 flex items-center justify-center border-t md:border-t-0 md:border-l border-indigo-700/50">
            <div className="space-y-4 w-full max-w-sm">
              <div className="bg-white/10 border border-white/20 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-indigo-300 mr-3" />
                  <span className="text-white font-medium">Public Information</span>
                </div>
                <span className="text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">Open Access</span>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-6 bg-white/20"></div>
              </div>
              <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg flex items-center justify-between shadow-inner opacity-75">
                <div className="flex items-center">
                  <Activity className="w-5 h-5 text-slate-400 mr-3" />
                  <span className="text-slate-300 font-medium">Official Intelligence</span>
                </div>
                <span className="text-[10px] uppercase font-bold bg-rose-500/20 text-rose-300 px-2 py-1 rounded">Restricted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRIEVANCE SECTION */}
      <section id="grievance" className="bg-slate-50 py-12 md:py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Context */}
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Grievance & Feedback</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                If you are a stakeholder affected by a land acquisition project, you can submit inquiries, feedback, or formal grievances directly through the portal.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" /> Track Existing Grievance
                </h3>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Reference Number (e.g., BD-GRV-10482)" 
                    className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-l-md focus:outline-none focus:border-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-bold rounded-r-md transition-colors">
                    Track
                  </button>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="lg:w-2/3 flex flex-col sm:flex-row gap-6 items-start">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8 flex-1 w-full text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Submit a Grievance</h3>
                <p className="text-slate-600 mb-6 text-sm">
                  Report issues, seek clarifications, or submit formal feedback regarding any published land acquisition project.
                </p>
                <Link href="/public/grievance" className="inline-block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md shadow-sm transition-colors">
                  Submit Grievance
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8 flex-1 w-full text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Track Grievance</h3>
                <p className="text-slate-600 mb-6 text-sm">
                  Check the current status and latest public updates of an already submitted grievance or inquiry.
                </p>
                <Link href="/public/grievance/track" className="inline-block w-full bg-white border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50 font-bold py-2.5 px-6 rounded-md shadow-sm transition-colors">
                  Track Status
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
