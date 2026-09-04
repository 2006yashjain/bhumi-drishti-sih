"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, Activity, Map as MapIcon, 
  BarChart3, Lightbulb, Bell, Database, Shield, LogOut, User,
  Search, Filter, Download, ArrowUpRight, X, Clock, AlertTriangle, 
  CheckCircle2, ArrowRight, ShieldCheck, ShieldAlert, FileText, History
} from 'lucide-react';

import { auditEvents, eventTypes, auditSummary, openAccountabilityItems, overdueActions } from './data';

export default function AuditTrail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Filters
  const [typeFilter, setTypeFilter] = useState("All");
  const [actorFilter, setActorFilter] = useState("All");
  const [districtFilter, setDistrictFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("Last 7 Days");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Drawer state
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    const proj = searchParams.get('project');
    const related = searchParams.get('related');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (proj) setSearchQuery(proj);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (related) setSearchQuery(related);
  }, [searchParams]);

  const filteredEvents = useMemo(() => {
    return auditEvents.filter(e => {
      const matchType = typeFilter === "All" || e.eventType === typeFilter;
      const matchActor = actorFilter === "All" || e.actorRole.includes(actorFilter) || e.actorName.includes(actorFilter);
      const matchDistrict = districtFilter === "All" || e.district === districtFilter;
      const matchSeverity = severityFilter === "All" || e.severity.toUpperCase() === severityFilter.toUpperCase();
      const searchStr = searchQuery.toLowerCase();
      const matchSearch = e.projectId.toLowerCase().includes(searchStr) || 
                          e.projectName.toLowerCase().includes(searchStr) || 
                          e.eventId.toLowerCase().includes(searchStr) || 
                          e.action.toLowerCase().includes(searchStr) ||
                          e.relatedRecordId?.toLowerCase().includes(searchStr);
                          
      return matchType && matchActor && matchDistrict && matchSeverity && matchSearch;
    });
  }, [typeFilter, actorFilter, districtFilter, severityFilter, searchQuery]);

  const selectedEvent = auditEvents.find(e => e.eventId === selectedEventId);
  const selectedProjectHistory = selectedEvent ? auditEvents.filter(e => e.projectId === selectedEvent.projectId).sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) : [];

  const resetFilters = () => {
    setTypeFilter("All");
    setActorFilter("All");
    setDistrictFilter("All");
    setSeverityFilter("All");
    setSearchQuery("");
  };

  const getSeverityColor = (severity: string) => {
    const s = severity.toUpperCase();
    if (s === 'CRITICAL') return 'bg-rose-100 text-rose-700 border-rose-200';
    if (s === 'HIGH') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (s === 'MEDIUM') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (s === 'INFORMATIONAL') return 'bg-slate-100 text-slate-700 border-slate-200';
    return 'bg-emerald-100 text-emerald-700 border-emerald-200'; // Low
  };

  const timeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const hours = Math.floor((new Date().getTime() - date.getTime()) / 3600000);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours} hours ago`;
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Export functionality
  const handleExport = () => {
    const headers = ["Event ID", "Timestamp", "Event Type", "Project ID", "Project Name", "Actor", "Role", "Action", "Severity", "Previous State", "New State"];
    const rows = filteredEvents.map(e => [
      e.eventId, e.timestamp, eventTypes[e.eventType as keyof typeof eventTypes]?.label || e.eventType, e.projectId, `"${e.projectName}"`, e.actorName, e.actorRole, `"${e.action}"`, e.severity, `"${e.previousState}"`, `"${e.newState}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "audit_trail.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900 overflow-hidden">
      
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
            <li><Link href="/official/dashboard" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><LayoutDashboard className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Overview</span></Link></li>
            <li><Link href="/official/projects" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Briefcase className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Project Portfolio</span></Link></li>
            <li><Link href="/official/project-comparison" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Activity className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Compare Projects</span></Link></li>
            <li><Link href="/official/risk-monitor" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Activity className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Risk Monitor</span></Link></li>
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
            <li>
              <Link href="/official/audit" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md transition-colors">
                <Shield className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Audit Trail</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-3"><User className="w-4 h-4" /></div>
              <div className="text-xs"><div className="font-semibold text-white">Guest Administrator</div><div className="text-slate-500">State Administrator</div></div>
            </div>
            <button onClick={() => { localStorage.removeItem('access_token'); localStorage.removeItem('user'); router.push('/official/login'); }} className="text-slate-500 hover:text-white transition-colors" title="Logout"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden mt-14 md:mt-0 relative">
        
        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-8 z-30 flex-shrink-0">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center">
                Audit Trail & Accountability
                <span className="ml-3 px-2 py-0.5 text-[10px] bg-amber-100 text-amber-700 rounded uppercase font-bold tracking-wider border border-amber-200">Synthetic Prototype Data</span>
              </h1>
              <p className="text-sm text-slate-500">Trace project decisions, risk events, corrective actions, and administrative changes.</p>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="text-slate-500 text-xs hidden lg:flex items-center mr-2"><Clock className="w-3 h-3 mr-1" /> Last synced: Just now</div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-2.5 top-2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search project, actor, ID..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 lg:w-64" 
                />
              </div>
              <button onClick={handleExport} className="flex items-center justify-center px-3 py-1.5 border border-slate-300 shadow-sm text-xs font-semibold rounded text-slate-700 bg-white hover:bg-slate-50">
                <Download className="w-3 h-3 mr-1.5" /> Export
              </button>
              <Link href="/official/alerts" className="text-slate-400 hover:text-slate-600 relative inline-block p-1">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-500 uppercase flex items-center mr-1"><Filter className="w-3 h-3 mr-1" /> Filters:</span>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border border-slate-300 rounded px-2 py-1 bg-white font-medium text-slate-700 focus:outline-none">
              <option value="All">Event Type: All</option>
              {Object.entries(eventTypes).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <select value={actorFilter} onChange={e => setActorFilter(e.target.value)} className="border border-slate-300 rounded px-2 py-1 bg-white font-medium text-slate-700 focus:outline-none">
              <option value="All">Actor: All</option>
              <option value="System">System</option>
              <option value="Project Officer">Project Officer</option>
              <option value="District Officer">District Officer</option>
            </select>
            <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)} className="border border-slate-300 rounded px-2 py-1 bg-white font-medium text-slate-700 focus:outline-none">
              <option value="All">District: All</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Ajmer">Ajmer</option>
              <option value="Jodhpur">Jodhpur</option>
            </select>
            <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="border border-slate-300 rounded px-2 py-1 bg-white font-medium text-slate-700 focus:outline-none">
              <option value="All">Severity: All</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="Informational">Informational</option>
            </select>
            <button onClick={resetFilters} className="font-semibold text-slate-500 hover:text-slate-900 underline ml-2">Reset</button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-50/50 flex flex-col gap-6">
          
          {/* EXECUTIVE KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-shrink-0">
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-l-4 border-l-slate-400">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Total Events</div>
              <div className="text-2xl font-bold text-slate-900">{auditSummary.totalEvents}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-l-4 border-l-blue-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Today&apos;s Events</div>
              <div className="text-2xl font-bold text-blue-600">{auditSummary.todaysEvents}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-l-4 border-l-rose-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Critical Events</div>
              <div className="text-2xl font-bold text-rose-600">{auditSummary.criticalEvents}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-l-4 border-l-indigo-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Administrative Actions</div>
              <div className="text-2xl font-bold text-indigo-700">{auditSummary.administrativeActions}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-l-4 border-l-slate-800">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">System Events</div>
              <div className="text-2xl font-bold text-slate-800">{auditSummary.systemEvents}</div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 min-h-0 flex-1">
            
            {/* MAIN COLUMN */}
            <div className={`flex flex-col gap-6 ${selectedEventId ? 'xl:w-2/3' : 'w-full'} transition-all duration-300`}>
              
              {/* AUDIT EVENT TABLE */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col flex-1">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center"><History className="w-4 h-4 mr-2" /> Audit Ledger</h2>
                  <span className="text-xs text-slate-500 italic">Click row to view accountability details</span>
                </div>
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Timestamp</th>
                        <th className="px-4 py-3">Event ID</th>
                        <th className="px-4 py-3">Event Type</th>
                        <th className="px-4 py-3">Project</th>
                        <th className="px-4 py-3">Actor</th>
                        <th className="px-4 py-3">Action</th>
                        <th className="px-4 py-3 text-center">Severity</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100">
                      {filteredEvents.map((e) => (
                        <tr 
                          key={e.eventId} 
                          onClick={() => setSelectedEventId(e.eventId)}
                          className={`cursor-pointer transition-colors ${selectedEventId === e.eventId ? 'bg-indigo-50/80 border-l-4 border-l-indigo-500' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}`}
                        >
                          <td className="px-4 py-3 font-medium text-slate-600 text-xs whitespace-nowrap">
                            {timeAgo(e.timestamp)}
                          </td>
                          <td className="px-4 py-3 text-xs font-bold text-slate-800">{e.eventId}</td>
                          <td className="px-4 py-3 text-xs font-semibold text-slate-700">
                            {eventTypes[e.eventType as keyof typeof eventTypes]?.label || e.eventType}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <div className="font-bold text-blue-600">{e.projectId}</div>
                            <div className="text-[10px] text-slate-500 truncate w-32" title={e.projectName}>{e.projectName}</div>
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <div className="font-semibold text-slate-800">{e.actorName}</div>
                            <div className="text-[10px] text-slate-500">{e.actorRole}</div>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-700 truncate max-w-xs" title={e.action}>
                            {e.action}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${getSeverityColor(e.severity)}`}>
                              {e.severity}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredEvents.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                            <Shield className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                            <p className="font-medium">No matching audit events found.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* SIDE PANEL / EVENT DETAIL */}
            {selectedEvent ? (
              <div className="xl:w-1/3 flex flex-col gap-6">
                <div className="bg-white border-2 border-slate-200 rounded-lg shadow-md flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-start bg-slate-900 text-white">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Event Detail</div>
                      <h2 className="text-lg font-bold flex items-center">{selectedEvent.eventId}</h2>
                    </div>
                    <button onClick={() => setSelectedEventId(null)} className="text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-5 flex-1 overflow-y-auto space-y-6">
                    
                    {/* Header Info */}
                    <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                      <div>
                        <div className="text-sm font-bold text-slate-900">{eventTypes[selectedEvent.eventType as keyof typeof eventTypes]?.label}</div>
                        <div className="text-xs text-slate-500 mt-1">{new Date(selectedEvent.timestamp).toLocaleString()}</div>
                      </div>
                      <span className={`px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider ${getSeverityColor(selectedEvent.severity)}`}>
                        {selectedEvent.severity}
                      </span>
                    </div>

                    {/* Action Context */}
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Action</div>
                      <div className="text-sm font-bold text-slate-800">{selectedEvent.action}</div>
                      <div className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded border border-slate-100 italic">
                        &quot;{selectedEvent.reason}&quot;
                      </div>
                    </div>

                    {/* Actors & Entities */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Actor</div>
                        <div className="font-semibold text-slate-800 text-sm flex items-center"><User className="w-3 h-3 mr-1 text-slate-400" /> {selectedEvent.actorName}</div>
                        <div className="text-xs text-slate-500">{selectedEvent.actorRole}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Project Affected</div>
                        <Link href={`/official/projects/${selectedEvent.projectId}`} className="font-bold text-blue-600 text-sm hover:underline flex items-center">
                          {selectedEvent.projectId} <ArrowUpRight className="w-3 h-3 ml-1" />
                        </Link>
                        <div className="text-xs text-slate-500 line-clamp-1" title={selectedEvent.projectName}>{selectedEvent.projectName}</div>
                      </div>
                    </div>

                    {/* Before / After Changes */}
                    {selectedEvent.changes && selectedEvent.changes.length > 0 && (
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Change Details</div>
                        <div className="space-y-3">
                          {selectedEvent.changes.map((c, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded p-3 shadow-sm">
                              <div className="text-xs font-bold text-slate-700 mb-2">{c.field}</div>
                              <div className="flex items-center justify-between text-xs">
                                <div className="bg-rose-50 text-rose-700 px-2 py-1 rounded border border-rose-100 font-medium flex-1 truncate text-center line-through opacity-70" title={c.before}>{c.before}</div>
                                <ArrowRight className="w-4 h-4 text-slate-400 mx-2 flex-shrink-0" />
                                <div className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100 font-bold flex-1 truncate text-center" title={c.after}>{c.after}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* System Links */}
                    <div className="border-t border-slate-100 pt-4">
                      <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">System Trace</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-slate-50 rounded">
                          <span className="text-slate-500 block mb-1">Source Module</span>
                          <span className="font-medium text-slate-800">{selectedEvent.sourceModule}</span>
                        </div>
                        <div className="p-2 bg-slate-50 rounded">
                          <span className="text-slate-500 block mb-1">Related Record</span>
                          {selectedEvent.relatedRecordId?.startsWith('ALT') ? (
                            <Link href="/official/alerts" className="font-medium text-blue-600 hover:underline">{selectedEvent.relatedRecordId}</Link>
                          ) : selectedEvent.relatedRecordId?.startsWith('ACT') ? (
                            <Link href="/official/recommendations" className="font-medium text-blue-600 hover:underline">{selectedEvent.relatedRecordId}</Link>
                          ) : (
                            <span className="font-medium text-slate-800">{selectedEvent.relatedRecordId || 'N/A'}</span>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* PROJECT AUDIT HISTORY COMPACT TIMELINE */}
                {selectedProjectHistory.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-3 flex items-center justify-between">
                      <span>Project Activity: {selectedEvent.projectId}</span>
                      <Link href={`/official/projects/${selectedEvent.projectId}`} className="text-blue-600 hover:underline">View Project</Link>
                    </div>
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-1.5 before:w-0.5 before:bg-slate-200 pl-4 mt-2 h-48 overflow-y-auto">
                      {selectedProjectHistory.map((h, i) => (
                        <div key={h.eventId} className="relative flex items-start pl-2 group">
                          <div className={`absolute -left-4 mt-1 flex items-center justify-center w-3 h-3 rounded-full border-2 border-white shadow-sm shrink-0 ${h.eventId === selectedEvent.eventId ? 'bg-blue-500 ring-2 ring-blue-200' : 'bg-slate-300'}`}></div>
                          <div className="text-xs -mt-0.5">
                            <div className="font-semibold text-slate-800">{h.action}</div>
                            <div className="text-[9px] text-slate-500">{new Date(h.timestamp).toLocaleString()} • {h.actorName}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="xl:w-1/3 flex flex-col gap-6">
                
                {/* ACCOUNTABILITY CHAIN */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-lg shadow-sm p-5 border border-slate-700">
                  <h2 className="text-sm font-bold mb-4 flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-emerald-400" /> Accountability Chain Example</h2>
                  <div className="space-y-3 relative before:absolute before:inset-0 before:ml-3.5 before:w-0.5 before:bg-slate-700 text-xs pl-8">
                    <div className="relative">
                      <div className="absolute -left-8 mt-0.5 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center"><Database className="w-3 h-3 text-slate-400" /></div>
                      <div className="font-bold text-emerald-400">Risk Engine</div>
                      <div className="text-slate-400">Generated risk escalation based on data</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 mt-0.5 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center"><Bell className="w-3 h-3 text-slate-400" /></div>
                      <div className="font-bold text-blue-400">System</div>
                      <div className="text-slate-400">Created critical alert for officials</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 mt-0.5 w-6 h-6 rounded-full bg-blue-900 border border-blue-500 flex items-center justify-center"><User className="w-3 h-3 text-blue-300" /></div>
                      <div className="font-bold text-white">District Officer</div>
                      <div className="text-slate-300">Reviewed alert and assigned action</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 mt-0.5 w-6 h-6 rounded-full bg-indigo-900 border border-indigo-500 flex items-center justify-center"><User className="w-3 h-3 text-indigo-300" /></div>
                      <div className="font-bold text-white">Compensation Officer</div>
                      <div className="text-slate-300">Accepted responsibility for follow-up</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-700 text-[10px] text-slate-400">
                    AI provides intelligence. Officials make and execute administrative decisions.
                  </div>
                </div>

                {/* OVERDUE ACCOUNTABILITY */}
                {overdueActions.length > 0 && (
                  <div className="bg-rose-50 border border-rose-200 rounded-lg shadow-sm p-4">
                    <h2 className="text-sm font-bold text-rose-800 mb-3 flex items-center"><AlertTriangle className="w-4 h-4 mr-2" /> Overdue Actions</h2>
                    <div className="space-y-3">
                      {overdueActions.map((oa, i) => (
                        <div key={i} className="bg-white border border-rose-100 rounded p-3">
                          <div className="flex justify-between items-start mb-1">
                            <Link href={`/official/projects/${oa.projectId}`} className="text-xs font-bold text-blue-600 hover:underline">{oa.projectId}</Link>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded uppercase">{oa.escalationLevel}</span>
                          </div>
                          <div className="text-sm font-semibold text-slate-800 mb-1">{oa.action}</div>
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-600 flex items-center"><User className="w-3 h-3 mr-1" /> {oa.owner}</span>
                            <span className="font-bold text-rose-600">{oa.daysOverdue} days overdue</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link href="/official/recommendations" className="block mt-3 text-center text-xs font-bold text-rose-700 hover:underline">View All Actions</Link>
                  </div>
                )}

                {/* OPEN ITEMS */}
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex-1">
                  <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center"><FileText className="w-4 h-4 mr-2 text-slate-500" /> Open Accountability Items</h2>
                  <div className="space-y-3">
                    {openAccountabilityItems.map((oa, i) => (
                      <div key={i} className="border border-slate-100 rounded p-3 hover:bg-slate-50">
                        <div className="flex justify-between items-start mb-1">
                          <Link href={`/official/projects/${oa.projectId}`} className="text-xs font-bold text-blue-600 hover:underline">{oa.projectId}</Link>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${oa.status === 'IN PROGRESS' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'}`}>{oa.status}</span>
                        </div>
                        <div className="text-xs font-semibold text-slate-800 mb-2">{oa.action}</div>
                        <div className="flex justify-between items-center text-[10px] text-slate-500">
                          <span>{oa.owner}</span>
                          <span>Due in {oa.daysRemaining} days</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AUDIT INTEGRITY STATUS */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[10px] text-slate-500">
                  <div className="font-bold text-slate-700 mb-1 uppercase tracking-wider flex items-center"><Shield className="w-3 h-3 mr-1" /> Audit Integrity</div>
                  Audit records are designed as append-only events. Production deployment should store immutable audit records with controlled write permissions and retention policies. <span className="font-semibold text-emerald-600">Event sequence consistent.</span>
                </div>

              </div>
            )}
          </div>

        </main>
      </div>

    </div>
  );
}
