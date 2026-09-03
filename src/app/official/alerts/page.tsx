"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, Activity, Map as MapIcon, 
  BarChart3, Lightbulb, Bell, Database, Shield, LogOut, User,
  AlertTriangle, CheckCircle2, Search, Filter, AlertOctagon, 
  ChevronDown, ArrowRight, X, Clock, ArrowUpRight, Check,
  AlertCircle, ShieldAlert, History
} from 'lucide-react';

import { initialAlerts, alertSummary, alertTypes } from './data';

export default function AlertsCenter() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State for alerts and selection
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  
  // Filters
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  
  // Notifications Dropdown
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const filteredAlerts = useMemo(() => {
    return alerts.filter(a => {
      const matchSeverity = severityFilter === "All" || a.severity === severityFilter;
      const matchStatus = statusFilter === "All" || a.status === statusFilter;
      const matchType = typeFilter === "All" || a.type === typeFilter;
      return matchSeverity && matchStatus && matchType;
    });
  }, [alerts, severityFilter, statusFilter, typeFilter]);

  const selectedAlert = alerts.find(a => a.alertId === selectedAlertId);

  const resetFilters = () => {
    setSeverityFilter("All");
    setStatusFilter("All");
    setTypeFilter("All");
  };

  const handleAcknowledge = () => {
    if (!selectedAlertId) return;
    setAlerts(alerts.map(a => {
      if (a.alertId === selectedAlertId) {
        return {
          ...a,
          status: "ACKNOWLEDGED",
          acknowledgement: {
            officer: "Guest Administrator",
            timestamp: new Date().toISOString()
          },
          history: [
            ...a.history,
            {
              timestamp: new Date().toISOString(),
              event: "Alert acknowledged",
              details: "Acknowledged by Guest Administrator."
            }
          ]
        };
      }
      return a;
    }));
  };

  const handleStatusUpdate = (newStatus: string) => {
    if (!selectedAlertId) return;
    setAlerts(alerts.map(a => {
      if (a.alertId === selectedAlertId) {
        return {
          ...a,
          status: newStatus,
          history: [
            ...a.history,
            {
              timestamp: new Date().toISOString(),
              event: `Status changed to ${newStatus}`,
              details: "Status updated manually."
            }
          ]
        };
      }
      return a;
    }));
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'CRITICAL') return 'bg-rose-100 text-rose-700 border-rose-200';
    if (severity === 'HIGH') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (severity === 'MEDIUM') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };
  
  const getSeverityIcon = (severity: string) => {
    if (severity === 'CRITICAL') return <AlertOctagon className="w-4 h-4 text-rose-600 mr-1.5" />;
    if (severity === 'HIGH') return <AlertTriangle className="w-4 h-4 text-amber-600 mr-1.5" />;
    if (severity === 'MEDIUM') return <AlertCircle className="w-4 h-4 text-blue-600 mr-1.5" />;
    return <AlertCircle className="w-4 h-4 text-slate-500 mr-1.5" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'NEW') return 'bg-rose-100 text-rose-700';
    if (status === 'ACKNOWLEDGED') return 'bg-blue-100 text-blue-700';
    if (status === 'IN PROGRESS') return 'bg-indigo-100 text-indigo-700';
    if (status === 'RESOLVED') return 'bg-emerald-100 text-emerald-700';
    return 'bg-slate-100 text-slate-700';
  };

  const timeAgo = (dateStr: string) => {
    const hours = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 3600000);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
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
            <li><Link href="/official/risk-monitor" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Activity className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Risk Monitor</span></Link></li>
            <li><Link href="/official/gis" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><MapIcon className="w-5 h-5 mr-3" /><span className="font-medium text-sm">GIS Intelligence</span></Link></li>
            <li><Link href="/official/district-analytics" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><BarChart3 className="w-5 h-5 mr-3" /><span className="font-medium text-sm">District Analytics</span></Link></li>
            <li><Link href="/official/recommendations" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Lightbulb className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Recommendations</span></Link></li>
            <li>
              <Link href="/official/alerts" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md transition-colors">
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
        <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-8 z-30 flex-shrink-0 flex justify-between items-start relative">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Alerts & Early Warning Center</h1>
            <p className="text-sm text-slate-500 flex items-center">
              Operational alerts generated from risk intelligence and stage bottlenecks.
              <span className="ml-3 px-2 py-0.5 text-[9px] bg-amber-100 text-amber-700 rounded uppercase font-bold tracking-wider border border-amber-200">Synthetic Prototype Data</span>
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-4 text-slate-500 text-sm relative">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-2 text-slate-400" />
              <input type="text" placeholder="Search..." className="pl-8 pr-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-500 w-48" />
            </div>
            
            {/* NOTIFICATION CENTER */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
                className={`p-2 rounded-full transition-colors relative ${isNotificationsOpen ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-100 hover:text-slate-900'}`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden">
                  <div className="p-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <span className="font-bold text-sm text-slate-800">Latest Alerts</span>
                    <button onClick={() => setIsNotificationsOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {alerts.slice(0, 3).map(alert => (
                      <div 
                        key={alert.alertId} 
                        className="p-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                        onClick={() => { setSelectedAlertId(alert.alertId); setIsNotificationsOpen(false); }}
                      >
                        <div className="flex items-start">
                          <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
                          <div className="ml-2">
                            <div className="text-xs font-bold text-slate-900">{alert.projectId}: {alertTypes[alert.type as keyof typeof alertTypes]?.label}</div>
                            <div className="text-xs text-slate-600 mt-1 line-clamp-2">{alert.trigger}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{timeAgo(alert.createdAt)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 bg-slate-50 text-center border-t border-slate-100">
                    <button onClick={() => setIsNotificationsOpen(false)} className="text-xs font-bold text-blue-600 hover:text-blue-800">View All Alerts</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-50/50 flex flex-col gap-6">
          
          {/* KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-shrink-0">
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-b-4 border-b-blue-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Active Alerts</div>
              <div className="text-3xl font-bold text-slate-900">{alertSummary.activeAlerts}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-b-4 border-b-rose-600">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Critical Alerts</div>
              <div className="text-3xl font-bold text-rose-600">{alertSummary.critical}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-b-4 border-b-amber-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Unacknowledged</div>
              <div className="text-3xl font-bold text-amber-600">{alertSummary.unacknowledged}</div>
            </div>
            <div className="bg-rose-50 rounded-lg border border-rose-200 p-4 shadow-sm">
              <div className="text-[10px] font-bold text-rose-700 mb-1 uppercase tracking-wider">Overdue Alerts</div>
              <div className="text-3xl font-bold text-rose-700">{alertSummary.overdue}</div>
            </div>
            <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-4 shadow-sm border-b-4 border-b-emerald-500">
              <div className="text-[10px] font-bold text-emerald-700 mb-1 uppercase tracking-wider">Resolved Today</div>
              <div className="text-3xl font-bold text-emerald-700">{alertSummary.resolvedToday}</div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
            
            {/* ALERT QUEUE */}
            <div className={`bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col ${selectedAlertId ? 'lg:w-7/12' : 'w-full'} transition-all duration-300`}>
              
              {/* Filter Bar */}
              <div className="p-3 border-b border-slate-100 bg-slate-50/80 flex flex-wrap gap-2 items-center text-xs">
                <span className="font-bold text-slate-500 uppercase flex items-center mr-1"><Filter className="w-3 h-3 mr-1" /> Filters</span>
                
                <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="border border-slate-300 rounded px-2 py-1 bg-white font-medium text-slate-700 focus:outline-none">
                  <option value="All">Severity: All</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>

                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-slate-300 rounded px-2 py-1 bg-white font-medium text-slate-700 focus:outline-none">
                  <option value="All">Status: All</option>
                  <option value="NEW">New</option>
                  <option value="ACKNOWLEDGED">Acknowledged</option>
                  <option value="IN PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                </select>

                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border border-slate-300 rounded px-2 py-1 bg-white font-medium text-slate-700 focus:outline-none max-w-[150px]">
                  <option value="All">Type: All</option>
                  {Object.entries(alertTypes).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>

                <button onClick={resetFilters} className="font-semibold text-slate-500 hover:text-slate-900 underline ml-auto">Reset</button>
              </div>

              <div className="overflow-x-auto flex-1">
                {filteredAlerts.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    <ShieldAlert className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <p className="font-medium">No alerts match the selected filters.</p>
                    <p className="text-xs mt-1">All monitored projects are currently within configured alert thresholds.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Severity</th>
                        <th className="px-4 py-3">Alert ID / Project</th>
                        <th className="px-4 py-3">Alert Type</th>
                        <th className="px-4 py-3">Risk Change</th>
                        <th className="px-4 py-3">Created</th>
                        <th className="px-4 py-3">Assigned To</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100">
                      {filteredAlerts.map((alert) => {
                        const isSelected = selectedAlertId === alert.alertId;
                        return (
                          <tr 
                            key={alert.alertId} 
                            onClick={() => setSelectedAlertId(isSelected ? null : alert.alertId)}
                            className={`cursor-pointer transition-colors ${isSelected ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}`}
                          >
                            <td className="px-4 py-3.5">
                              <span className={`flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider w-max ${getSeverityColor(alert.severity)}`}>
                                {getSeverityIcon(alert.severity)} {alert.severity}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="font-bold text-blue-600 text-xs">{alert.alertId}</div>
                              <div className="font-semibold text-slate-800 text-xs">{alert.projectId}</div>
                              <div className="text-[10px] text-slate-500">{alert.district} • {alert.stage}</div>
                            </td>
                            <td className="px-4 py-3.5 text-slate-800 text-xs font-semibold">
                              {alertTypes[alert.type as keyof typeof alertTypes]?.label}
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="font-bold text-rose-600 text-xs">{alert.currentRisk}%</span>
                              {alert.riskChange > 0 && <span className="ml-2 text-[10px] font-bold text-rose-500 bg-rose-50 px-1 rounded">+{alert.riskChange} pp</span>}
                              {alert.riskChange < 0 && <span className="ml-2 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1 rounded">{alert.riskChange} pp</span>}
                            </td>
                            <td className="px-4 py-3.5 text-slate-600 text-[11px] font-medium whitespace-nowrap">
                              <div className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {timeAgo(alert.createdAt)}</div>
                            </td>
                            <td className="px-4 py-3.5 text-slate-600 text-[11px] font-medium">{alert.assignedOfficer}</td>
                            <td className="px-4 py-3.5">
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider whitespace-nowrap ${getStatusColor(alert.status)}`}>
                                {alert.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* ALERT DETAIL PANEL */}
            {selectedAlert && (
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col lg:w-5/12 overflow-hidden transition-all duration-300">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
                  <h2 className="text-sm font-bold flex items-center">
                    {selectedAlert.alertId} Detail
                  </h2>
                  <button onClick={() => setSelectedAlertId(null)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  
                  {/* Header & Status */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-lg font-bold text-slate-900 flex items-center">
                        {getSeverityIcon(selectedAlert.severity)} {alertTypes[selectedAlert.type as keyof typeof alertTypes]?.label}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 mt-1">{selectedAlert.escalationLevel}</div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${getStatusColor(selectedAlert.status)}`}>
                      {selectedAlert.status}
                    </span>
                  </div>

                  {/* Project Context */}
                  <div className="bg-slate-50 border border-slate-200 rounded p-4 text-sm relative">
                    <div className="grid grid-cols-2 gap-3 mb-3 pb-3 border-b border-slate-200">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500">Project</div>
                        <div className="font-bold text-blue-600">{selectedAlert.projectId}</div>
                        <div className="text-xs text-slate-700 line-clamp-1" title={selectedAlert.projectName}>{selectedAlert.projectName}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500">Location & Stage</div>
                        <div className="font-semibold text-slate-800">{selectedAlert.district}</div>
                        <div className="text-xs text-slate-700">{selectedAlert.stage}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500">Current Risk</div>
                        <div className="text-xl font-bold text-rose-600">{selectedAlert.currentRisk}%</div>
                      </div>
                      {selectedAlert.riskChange > 0 && (
                        <div className="text-right">
                          <div className="text-[10px] uppercase font-bold text-slate-500">Risk Change</div>
                          <div className="text-sm font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">+{selectedAlert.riskChange} pp</div>
                        </div>
                      )}
                    </div>
                    <Link href={`/official/projects/${selectedAlert.projectId}`} className="absolute top-3 right-3 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center bg-blue-50 px-2 py-1 rounded border border-blue-100">
                      View Project <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>

                  {/* Why generated? */}
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Alert Trigger</div>
                    <div className="text-sm font-bold text-slate-800 bg-amber-50 p-3 rounded border border-amber-200 mb-2">
                      {selectedAlert.trigger}
                    </div>
                    <div className="text-[10px] text-slate-500 flex justify-between px-1">
                      <span>Threshold Rule: <span className="font-semibold text-slate-700">{selectedAlert.threshold}</span></span>
                      <span>Logic: <span className="font-semibold text-slate-700">Deterministic Rule</span></span>
                    </div>
                  </div>

                  {/* SHAP Factors */}
                  {selectedAlert.factors.length > 0 && (
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 mb-2 flex items-center justify-between">
                        <span>Contributing Factors</span>
                        <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">from ML Risk Engine</span>
                      </div>
                      <div className="space-y-1.5 border border-slate-200 rounded p-3">
                        {selectedAlert.factors.map((factor, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="font-medium text-slate-700">{factor.name}</span>
                            <span className={`font-bold ${factor.contribution > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                              {factor.contribution > 0 ? '+' : ''}{factor.contribution} pp
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommended Action */}
                  <div className="bg-indigo-50 border border-indigo-200 rounded p-4">
                    <div className="text-[10px] uppercase font-bold text-indigo-800 mb-1">Recommended Action</div>
                    <div className="text-sm font-semibold text-slate-900 mb-3">{selectedAlert.recommendedAction}</div>
                    <div className="flex justify-between items-center text-xs text-indigo-900 mb-3">
                      <div><span className="opacity-70">Owner:</span> {selectedAlert.assignedOfficer}</div>
                      <div><span className="opacity-70">Target:</span> {selectedAlert.targetDate}</div>
                    </div>
                    {selectedAlert.status !== 'RESOLVED' && (
                      <Link 
                        href="/official/recommendations"
                        className="w-full block text-center py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded shadow-sm transition-colors mb-2"
                      >
                        Create Corrective Action
                      </Link>
                    )}
                    <Link 
                      href={`/official/audit?related=${selectedAlert.id}`}
                      className="w-full block text-center py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded shadow-sm transition-colors"
                    >
                      View Audit History
                    </Link>
                  </div>

                  {/* Intervention Impact */}
                  {selectedAlert.interventionImpact && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded p-4">
                      <div className="text-[10px] uppercase font-bold text-emerald-800 mb-3 flex items-center justify-between">
                        <span>Intervention Impact</span>
                        <span className="bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200 text-[9px]">Simulated Prototype Outcome</span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-center">
                          <div className="text-[10px] text-slate-500 uppercase">Before</div>
                          <div className="text-lg font-bold text-slate-900">{selectedAlert.interventionImpact.beforeRisk}%</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-400" />
                        <div className="text-center">
                          <div className="text-[10px] text-slate-500 uppercase">After</div>
                          <div className="text-lg font-bold text-emerald-700">{selectedAlert.interventionImpact.afterRisk}%</div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-700 border-t border-emerald-200/50 pt-2">
                        <span className="font-bold">Action Taken:</span> {selectedAlert.interventionImpact.actionTaken}
                      </div>
                    </div>
                  )}

                  {/* Alert Workflow */}
                  {selectedAlert.status !== 'RESOLVED' && (
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Alert Action</div>
                      {selectedAlert.status === 'NEW' ? (
                        <button 
                          onClick={handleAcknowledge}
                          className="w-full py-2 bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 text-xs font-bold rounded flex items-center justify-center transition-colors"
                        >
                          <Check className="w-4 h-4 mr-2" /> Acknowledge Alert
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleStatusUpdate('IN PROGRESS')}
                            className={`flex-1 py-1.5 text-xs font-bold rounded border ${selectedAlert.status === 'IN PROGRESS' ? 'bg-indigo-100 text-indigo-700 border-indigo-200 ring-2 ring-indigo-200' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
                          >
                            In Progress
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate('RESOLVED')}
                            className="flex-1 py-1.5 text-xs font-bold rounded border bg-white text-slate-600 border-slate-300 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
                          >
                            Mark Resolved
                          </button>
                        </div>
                      )}
                      
                      {selectedAlert.acknowledgement && (
                        <div className="text-[10px] text-slate-500 mt-2 text-center flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 mr-1" />
                          Acknowledged by {selectedAlert.acknowledgement.officer}
                        </div>
                      )}
                    </div>
                  )}

                  {/* History Timeline */}
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-3 flex items-center"><History className="w-3 h-3 mr-1" /> Alert History</div>
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-1.5 before:w-0.5 before:bg-slate-200">
                      {selectedAlert.history.map((event, idx) => (
                        <div key={idx} className="relative flex items-start pl-5 group">
                          <div className="absolute left-0 mt-1 flex items-center justify-center w-3.5 h-3.5 rounded-full border-2 border-white bg-slate-300 group-last:bg-blue-500 shadow-sm shrink-0"></div>
                          <div className="text-xs">
                            <div className="font-semibold text-slate-800">{event.event}</div>
                            <div className="text-slate-600 mt-0.5">{event.details}</div>
                            <div className="text-[9px] text-slate-400 mt-1">{new Date(event.timestamp).toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

        </main>
      </div>

    </div>
  );
}
