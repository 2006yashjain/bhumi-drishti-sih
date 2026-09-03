"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { 
  Map as MapIcon, Layers, AlertTriangle, Search, MapPin, ChevronRight,
  LayoutDashboard, Briefcase, Activity, BarChart3, Lightbulb, Bell, Database, Shield, LogOut, User, Server
} from 'lucide-react';
import { gisApi, ProjectGISData, ProjectSummary } from '@/services/api/gisApi';

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-medium">Initializing Spatial Engine...</div>
});

export default function GISIntelligence() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projectsList, setProjectsList] = useState<ProjectSummary[]>([]);
  const [projectCode, setProjectCode] = useState('P-1042');
  const [gisData, setGisData] = useState<ProjectGISData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');

  useEffect(() => {
    let mounted = true;
    gisApi.getProjects().then(data => {
      if (mounted) setProjectsList(data);
    }).catch(e => console.error("Failed to load projects", e));
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError('');
    setSelectedParcelId(null);
    gisApi.getProjectGIS(projectCode).then(data => {
      if (mounted) setGisData(data);
    }).catch(err => {
      if (mounted) {
        setError(err instanceof Error ? err.message : 'Unable to load spatial data.');
        setGisData(null);
      }
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, [projectCode]);

  const filteredProjects = useMemo(() => {
    return projectsList.filter(p => {
      const matchSearch = p.project_code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.project_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDistrict = districtFilter === 'All' || p.district === districtFilter;
      return matchSearch && matchDistrict;
    });
  }, [projectsList, searchQuery, districtFilter]);

  const districts = ['All', ...Array.from(new Set(projectsList.map(p => p.district)))];

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
              <Link href="/official/projects" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
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
            <li>
              <Link href="/official/gis" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md">
                <MapIcon className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">GIS Intelligence</span>
              </Link>
            </li>
            <li>
              <Link href="/official/district-analytics" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <BarChart3 className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">District Analytics</span>
              </Link>
            </li>
            <li>
              <Link href="/official/recommendations" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Lightbulb className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Recommendations</span>
              </Link>
            </li>
            <li>
              <Link href="/official/alerts" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Bell className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm flex-1">Alerts</span>
                <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">28</span>
              </Link>
            </li>
            <li>
              <Link href="/official/risk-engine" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Database className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Risk Engine</span>
              </Link>
            </li>
            <li>
              <Link href="/official/model-data" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Server className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Model & Data</span>
              </Link>
            </li>
            <li>
              <Link href="/official/audit" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Shield className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Audit Trail</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs">
              <div className="text-slate-500 font-semibold mb-1">System Status</div>
              <div className="flex items-center text-emerald-400 font-medium">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Operational
              </div>
            </div>
            <div className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
              MODE: DEMO
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-3">
                <User className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Guest Administrator</div>
                <div className="text-slate-500">State Administrator</div>
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
      <div className="flex-1 flex flex-col h-screen overflow-hidden mt-14 md:mt-0 relative bg-slate-50">
        
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center">
              <MapIcon className="w-5 h-5 mr-3 text-blue-600" />
              Spatial Decision Support System
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Parcel Dependency & Corridor Bottleneck Engine
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-xs bg-indigo-50 text-indigo-700 font-bold px-3 py-1.5 rounded-full border border-indigo-100 flex items-center">
              <Layers className="w-3.5 h-3.5 mr-1.5" /> PostGIS Engine Ready
            </div>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 overflow-hidden flex relative">
          
          {/* LEFT PANEL: Project List */}
          <div className="w-80 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-10 shadow-sm">
            <div className="p-4 border-b border-slate-100 space-y-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search projects..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
              <select 
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white"
              >
                {districts.map(d => <option key={d} value={d}>{d === 'All' ? 'All Districts' : d}</option>)}
              </select>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredProjects.map(p => (
                <div 
                  key={p.project_code}
                  onClick={() => setProjectCode(p.project_code)}
                  className={`p-4 border-b border-slate-100 cursor-pointer transition-colors ${projectCode === p.project_code ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-blue-600">{p.project_code}</span>
                    {p.has_bottlenecks && (
                      <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Bottleneck
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-slate-800 line-clamp-1">{p.project_name}</div>
                  <div className="text-xs text-slate-500 flex items-center mt-2">
                    <MapPin className="w-3 h-3 mr-1" /> {p.district}, {p.state}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MIDDLE PANEL: MAP */}
          <div className="flex-1 relative z-0 bg-slate-100">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-20">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <div className="font-bold text-slate-600">Loading spatial intelligence...</div>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 text-rose-600">
                <AlertTriangle className="w-10 h-10 mb-3" />
                <p className="font-bold">{error}</p>
              </div>
            ) : null}
            
            {gisData && <MapComponent gisData={gisData} selectedParcelId={selectedParcelId} onSelectParcel={setSelectedParcelId} />}
          </div>

          {/* RIGHT PANEL: INTELLIGENCE */}
          <div className="w-96 bg-white border-l border-slate-200 flex flex-col flex-shrink-0 z-10 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)]">
            {gisData ? (
              <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
                
                {/* Project Summary */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-1">{gisData.project.project_code}</h3>
                  <p className="text-sm text-slate-600 font-medium mb-4">{gisData.project.project_name}</p>
                  
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500 font-medium">Corridor Length</span>
                      <span className="font-bold text-slate-800">{gisData.corridor.total_length_km} km</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500 font-medium">Acquired</span>
                      <span className="font-bold text-emerald-600">{gisData.corridor.acquired_length_km} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Pending Corridor</span>
                      <span className="font-bold text-rose-600">{gisData.corridor.pending_length_km} km</span>
                    </div>
                  </div>
                  
                  <Link href={`/official/projects/${gisData.project.project_code}`} className="mt-3 w-full flex items-center justify-center py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-colors shadow-sm">
                    View Risk Intelligence <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                {/* Bottlenecks */}
                {gisData.bottlenecks.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Spatial Bottlenecks</h4>
                    {gisData.bottlenecks.map(b => (
                      <div key={b.bottleneck_id} className="bg-rose-50 border border-rose-200 rounded-lg overflow-hidden mb-3">
                        <div className="p-3 border-b border-rose-100 bg-rose-100/50">
                          <h2 className="text-xs font-bold text-rose-800 flex items-center">
                            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" /> CRITICAL BOTTLENECK
                          </h2>
                        </div>
                        <div className="p-4">
                          <div className="grid grid-cols-2 gap-y-3 text-sm">
                            <div>
                              <div className="text-rose-700/80 text-xs font-medium mb-0.5">Blocked Stretch</div>
                              <div className="font-black text-rose-900 text-lg">{b.blocked_length_km} km</div>
                            </div>
                            <div>
                              <div className="text-rose-700/80 text-xs font-medium mb-0.5">Affected Parcels</div>
                              <div className="font-black text-rose-900 text-lg">{b.affected_parcels}</div>
                            </div>
                            <div>
                              <div className="text-rose-700/80 text-xs font-medium mb-0.5">High Risk</div>
                              <div className="font-bold text-rose-900">{b.high_risk_parcels} parcels</div>
                            </div>
                            <div>
                              <div className="text-rose-700/80 text-xs font-medium mb-0.5">Continuity</div>
                              <div className="font-bold text-rose-900">{b.continuity_blocked ? 'Broken' : 'Intact'}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Parcel List */}
                <div className="flex-1 flex flex-col min-h-[300px]">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex justify-between items-center">
                    <span>Unresolved Parcels</span>
                    <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{gisData.parcels.length}</span>
                  </h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-y-auto flex-1 p-0">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 shadow-sm z-10">
                          <tr>
                            <th className="px-3 py-2.5 font-bold text-slate-500">Parcel ID</th>
                            <th className="px-3 py-2.5 font-bold text-slate-500">Risk</th>
                            <th className="px-3 py-2.5 font-bold text-slate-500">Criticality</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {gisData.parcels.map(p => (
                            <tr 
                              key={p.parcel_id} 
                              onClick={() => setSelectedParcelId(p.parcel_id)}
                              className={`cursor-pointer transition-colors ${selectedParcelId === p.parcel_id ? 'bg-blue-50/80' : 'hover:bg-slate-50'}`}
                            >
                              <td className="px-3 py-3 font-medium text-slate-800">
                                <div className="flex items-center">
                                  <div className={`w-1.5 h-1.5 rounded-full mr-2 ${selectedParcelId === p.parcel_id ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                                  {p.parcel_id}
                                </div>
                              </td>
                              <td className="px-3 py-3">
                                <span className={`px-1.5 py-0.5 rounded font-bold ${
                                  p.risk_level === 'CRITICAL' ? 'bg-rose-100 text-rose-700' :
                                  p.risk_level === 'HIGH' ? 'bg-amber-100 text-amber-700' :
                                  'bg-emerald-100 text-emerald-700'
                                }`}>{p.risk_score}%</span>
                              </td>
                              <td className="px-3 py-3">
                                <span className={`font-bold ${p.spatial_criticality === 'CRITICAL' || p.spatial_criticality === 'HIGH' ? 'text-rose-600' : 'text-slate-500'}`}>
                                  {p.spatial_criticality}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 font-medium p-6 text-center">
                Select a project from the left panel to view its spatial intelligence.
              </div>
            )}
          </div>
        </main>
      </div>
      
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: 260px !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
}
