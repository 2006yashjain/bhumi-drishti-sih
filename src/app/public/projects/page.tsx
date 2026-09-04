"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Activity, ChevronRight, AlertCircle, Filter } from 'lucide-react';
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

export default function PublicProjectsPage() {
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
      {/* HERO BANNER WITH USER IMAGE */}
      <section 
        className="relative bg-slate-900 text-white py-20 md:py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('/highway-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/75 to-slate-950/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              <span>Public Land Acquisition Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-md">
              Explore Land Acquisition Projects
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed drop-shadow-sm font-medium">
              View official records, lifecycle stages, district updates, and public notices for national and state infrastructure projects across India.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH AND FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-3.5 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by Project Code (e.g., P-1042), Name, Highway, or District..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
              />
            </div>
            <button 
              onClick={() => setSearchQuery("")}
              className="w-full md:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg border border-slate-200 text-sm transition-colors flex items-center justify-center"
            >
              <Filter className="w-4 h-4 mr-2" /> Reset Filters
            </button>
          </div>
        </div>

        {/* PROJECTS GRID / LIST */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Project Directory</h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-full">
              {projects.length} Projects Listed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Project Name & Code</th>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Current Stage</th>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</th>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-3"></div>
                      <p className="text-sm font-medium">Loading project catalog...</p>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-rose-500">
                      <AlertCircle className="w-8 h-8 mx-auto text-rose-400 mb-3" />
                      <p className="text-sm font-medium">{error}</p>
                    </td>
                  </tr>
                ) : projects.length > 0 ? (
                  projects.map((project) => (
                    <tr key={project.project_code} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-indigo-600">{project.project_code}</div>
                        <div className="text-sm font-bold text-slate-900 max-w-md">{project.project_name}</div>
                        <div className="text-xs text-slate-500 mt-0.5 font-medium">{project.project_type || 'Infrastructure'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-slate-800">
                          <MapPin className="w-4 h-4 mr-1.5 text-indigo-500 flex-shrink-0" />
                          {project.district || 'N/A'}, {project.state || 'Maharashtra'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs font-bold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {project.current_stage || 'Planning'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-36 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${project.public_progress || 0}%` }}></div>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 font-bold">{project.public_progress || 0}% Completed</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/public/projects/${project.project_code}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-900 font-bold bg-indigo-50 hover:bg-indigo-100 px-3.5 py-1.5 rounded-md transition-colors">
                          View Details <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                      <Search className="w-8 h-8 mx-auto text-slate-300 mb-3" />
                      <p className="text-sm font-medium">No matching projects found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
