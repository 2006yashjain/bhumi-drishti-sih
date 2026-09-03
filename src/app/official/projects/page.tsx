"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, Activity, Map as MapIcon, 
  BarChart3, Lightbulb, Bell, Database, Shield, LogOut, User,
  Search, RefreshCw, AlertTriangle, ChevronRight, 
  MapPin
} from 'lucide-react';
import { projectsApi } from '@/services/api/projectsApi';

interface Project {
  project_code: string;
  project_name: string;
  district?: string;
  state?: string;
  project_type?: string;
  current_stage?: string;
  public_progress?: number;
  project_status?: string;
}

export default function ProjectPortfolio() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await projectsApi.getProjects({
        search: searchQuery,
        state: stateFilter,
        district: districtFilter,
        stage: stageFilter
      });
      const data = await response.json();
      setProjects(data);
    } catch (err: unknown) {
      console.error("Failed to fetch projects:", err);
      setError("Unable to load project data.");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, stateFilter, districtFilter, stageFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjects();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchProjects]);

  const resetFilters = () => {
    setSearchQuery("");
    setStateFilter("");
    setDistrictFilter("");
    setStageFilter("");
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Active') return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    if (status === 'Pending') return 'bg-amber-100 text-amber-800 border border-amber-200';
    if (status === 'Completed') return 'bg-blue-100 text-blue-800 border border-blue-200';
    return 'bg-slate-100 text-slate-800 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center z-50 fixed top-0 w-full">
        <div className="font-bold">BHUMI DRISHTI</div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transform md:translate-x-0 transition-transform duration-200 fixed md:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col z-40 border-r border-slate-800`}>
        <div className="p-6 pb-2 border-b border-slate-800 mt-12 md:mt-0">
          <h1 className="text-xl font-bold text-white tracking-tight">BHUMI DRISHTI</h1>
          <h2 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mt-1">
            Land Acquisition<br/>Intelligence
          </h2>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <Link href="/official/dashboard" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <LayoutDashboard className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Overview</span>
              </Link>
            </li>
            <li>
              <Link href="/official/projects" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md transition-colors">
                <Briefcase className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Project Portfolio</span>
              </Link>
            </li>
            <li>
              <Link href="/official/risk-monitor" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Activity className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Risk Monitor</span>
              </Link>
            </li>
            <li><Link href="/official/gis" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><MapIcon className="w-5 h-5 mr-3" /><span className="font-medium text-sm">GIS Intelligence</span></Link></li>
            <li><Link href="/official/district-analytics" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><BarChart3 className="w-5 h-5 mr-3" /><span className="font-medium text-sm">District Analytics</span></Link></li>
            <li><Link href="/official/recommendations" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Lightbulb className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Recommendations</span></Link></li>
            <li>
              <Link href="/official/alerts" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Bell className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm flex-1">Alerts</span>
                <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">28</span>
              </Link>
            </li>
            <li><Link href="/official/risk-engine" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Database className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Risk Engine</span></Link></li>
            <li><Link href="/official/model-data" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Database className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Model & Data</span></Link></li>
            <li><Link href="/official/audit" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Shield className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Audit Trail</span></Link></li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs">
              <div className="text-slate-500 font-semibold mb-1">System Status</div>
              <div className="flex items-center text-emerald-400 font-medium">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div> Operational
              </div>
            </div>
            <div className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">MODE: DEMO</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold border border-slate-600">
                <User className="w-4 h-4" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-semibold text-white">Official User</div>
                <div className="text-[10px] text-slate-400">ID: OFF-9482-Z</div>
              </div>
            </div>
            <button 
              onClick={() => { localStorage.removeItem('access_token'); localStorage.removeItem('user'); router.push('/official/login'); }}
              className="text-slate-500 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 bg-slate-50 pt-16 md:pt-0">
        
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30">
          <div>
            <div className="flex items-center text-xs text-slate-500 mb-1">
              <Link href="/official/dashboard" className="hover:text-indigo-600">Dashboard</Link>
              <span className="mx-2">/</span>
              <span className="font-semibold text-slate-700">Project Portfolio</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800">Project Portfolio</h2>
            <p className="text-sm text-slate-500 mt-1">Manage and monitor all land acquisition projects</p>
          </div>
          <div className="flex gap-2">
            <button onClick={fetchProjects} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Refresh">
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto space-y-6">
          
          {/* SEARCH & FILTERS */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search by ID, Name, or District..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <select 
                  value={stateFilter} 
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">All States</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Gujarat">Gujarat</option>
                </select>
                <select 
                  value={districtFilter} 
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">All Districts</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Pune">Pune</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                </select>
                <select 
                  value={stageFilter} 
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">All Stages</option>
                  <option value="Preliminary Notification">Preliminary Notification</option>
                  <option value="SIA / Assessment">SIA / Assessment</option>
                  <option value="Declaration">Declaration</option>
                  <option value="Compensation">Compensation</option>
                  <option value="R&R">R&R</option>
                  <option value="Possession">Possession</option>
                  <option value="Completion">Completion</option>
                </select>
                <button 
                  onClick={resetFilters}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-md transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* PROJECT LIST */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Project ID & Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location & Type</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Current Stage</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-3"></div>
                        <p className="text-sm font-medium text-slate-600">Loading projects...</p>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-rose-600">
                        <AlertTriangle className="w-8 h-8 mx-auto text-rose-500 mb-3" />
                        <p className="text-sm font-bold">{error}</p>
                        <button onClick={fetchProjects} className="mt-4 px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 text-sm font-bold rounded-md">Retry</button>
                      </td>
                    </tr>
                  ) : projects.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                        <Search className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                        <p className="text-sm font-medium text-slate-600">No projects found matching the criteria.</p>
                        <button onClick={resetFilters} className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-md">Clear Filters</button>
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
                      <tr key={project.project_code} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => router.push(`/official/projects/${project.project_code}`)}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-blue-600 group-hover:text-blue-800">{project.project_code}</div>
                          <div className="text-sm text-slate-900 font-medium max-w-xs truncate">{project.project_name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-800 font-medium flex items-center">
                            <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                            {project.district}, {project.state}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">{project.project_type || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-slate-700">{project.current_stage || 'Unknown'}</div>
                          <div className="w-full max-w-[120px] h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${project.public_progress || 0}%` }}></div>
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1 font-medium">{project.public_progress || 0}% Progress</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${getStatusBadge(project.project_status || '')}`}>
                            {project.project_status || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 ml-auto transition-colors" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {!isLoading && !error && projects.length > 0 && (
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-sm text-slate-500">Showing {projects.length} projects</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                  <button className="px-3 py-1 border border-slate-300 rounded text-sm text-white bg-emerald-600 hover:bg-emerald-700">1</button>
                  <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
