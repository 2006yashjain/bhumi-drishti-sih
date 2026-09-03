"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, Activity, Map as MapIcon, 
  BarChart3, Lightbulb, Bell, Database, Shield, LogOut, User,
  AlertTriangle, CheckCircle2, Search, RefreshCw, Download, 
  ChevronDown, ArrowRight, X, Plus, Calendar, Clock, ArrowUpRight, TrendingDown, Info
} from 'lucide-react';

import { 
  summaryData, recommendationRules, initialActions, interventionImpact
} from './data';

export default function Recommendations() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State for actions table and selection
  const [actions, setActions] = useState(initialActions);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  
  // Create Action Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);

  // Form State for Create Action
  const [formData, setFormData] = useState({
    project: 'P-1042',
    driver: 'Pending Compensation',
    action: 'Prioritize resolution of pending compensation cases',
    priority: 'CRITICAL',
    officer: 'Compensation Officer',
    department: 'Revenue',
    date: '2026-09-10',
    notes: ''
  });

  const selectedAction = actions.find(a => a.action_id === selectedActionId);
  const ruleForSelected = selectedAction ? recommendationRules.find(r => r.driver === selectedAction.risk_driver) : null;

  const handleCreateAction = (e: React.FormEvent) => {
    e.preventDefault();
    setCreationSuccess(true);
    setTimeout(() => {
      setIsCreateModalOpen(false);
      setCreationSuccess(false);
      // add to top of actions
      setActions([{
        action_id: `ACT-${Math.floor(Math.random()*9000)+1000}`,
        project_id: formData.project,
        district: "Jaipur",
        risk_driver: formData.driver,
        recommendation: formData.action,
        priority: formData.priority,
        current_risk: 78,
        owner_role: formData.officer,
        assigned_to: "Unassigned",
        department: formData.department,
        created_at: new Date().toISOString().split('T')[0],
        due_date: formData.date,
        status: "Assigned",
        notes: formData.notes,
        updated_at: new Date().toISOString().split('T')[0]
      }, ...actions]);
    }, 1500);
  };

  const handleStatusUpdate = (newStatus: string) => {
    if (!selectedActionId) return;
    setActions(actions.map(a => 
      a.action_id === selectedActionId ? { ...a, status: newStatus, updated_at: new Date().toISOString().split('T')[0] } : a
    ));
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'CRITICAL') return 'bg-rose-100 text-rose-700 border-rose-200';
    if (priority === 'HIGH') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (priority === 'MEDIUM') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Overdue') return 'bg-rose-100 text-rose-700';
    if (status === 'Action Required') return 'bg-amber-100 text-amber-700';
    if (status === 'Assigned') return 'bg-blue-100 text-blue-700';
    if (status === 'In Progress') return 'bg-indigo-100 text-indigo-700';
    if (status === 'Completed' || status === 'Closed') return 'bg-emerald-100 text-emerald-700';
    return 'bg-slate-100 text-slate-700';
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
            <li>
              <Link href="/official/recommendations" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md transition-colors">
                <Lightbulb className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Recommendations</span>
              </Link>
            </li>
            <li><Link href="/official/alerts" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Bell className="w-5 h-5 mr-3" /><span className="font-medium text-sm flex-1">Alerts</span><span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">28</span></Link></li>
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
        <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-8 z-30 flex-shrink-0">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Recommendations & Corrective Actions</h1>
              <p className="text-sm text-slate-500">Prioritized administrative interventions generated from identified project risk drivers</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center justify-center px-3 py-1.5 border border-slate-300 shadow-sm text-xs font-semibold rounded text-slate-700 bg-white hover:bg-slate-50">
                <Download className="w-3 h-3 mr-1.5" /> Export Actions
              </button>
              <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center justify-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-semibold rounded text-white bg-slate-900 hover:bg-slate-800">
                <Plus className="w-3 h-3 mr-1.5" /> Create Action
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900 bg-slate-100 px-2 py-1 rounded border border-slate-200">
              <span className="font-semibold mr-1">State:</span> All <ChevronDown className="w-3 h-3 ml-1" />
            </div>
            <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900 bg-slate-100 px-2 py-1 rounded border border-slate-200">
              <span className="font-semibold mr-1">District:</span> All <ChevronDown className="w-3 h-3 ml-1" />
            </div>
            <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900 bg-slate-100 px-2 py-1 rounded border border-slate-200">
              <span className="font-semibold mr-1">Project:</span> All <ChevronDown className="w-3 h-3 ml-1" />
            </div>
            <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900 bg-slate-100 px-2 py-1 rounded border border-slate-200">
              <span className="font-semibold mr-1">Driver:</span> All <ChevronDown className="w-3 h-3 ml-1" />
            </div>
            <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900 bg-slate-100 px-2 py-1 rounded border border-slate-200">
              <span className="font-semibold mr-1">Status:</span> All <ChevronDown className="w-3 h-3 ml-1" />
            </div>
            <div className="flex items-center space-x-2 ml-auto">
              <div className="relative">
                <Search className="w-3 h-3 absolute left-2 top-1.5 text-slate-400" />
                <input type="text" placeholder="Search..." className="pl-7 pr-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-500 w-48" />
              </div>
              <button className="text-slate-400 hover:text-slate-600 p-1 border border-slate-300 rounded"><RefreshCw className="w-3 h-3" /></button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-50/50 flex flex-col gap-6">
          
          {/* PROTOTYPE NOTICE */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-md p-3 flex items-start flex-shrink-0">
            <Info className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-indigo-800">
              <span className="font-bold mr-2">PROTOTYPE RECOMMENDATIONS:</span> 
              Recommendations shown here are generated from predefined administrative action mappings using synthetic project-risk outputs. They are not real government directives.
            </div>
          </div>

          {/* ACTION SUMMARY CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-shrink-0">
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Total Open Actions</div>
              <div className="text-3xl font-bold text-slate-900">{summaryData.totalOpen}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-b-4 border-b-rose-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Critical</div>
              <div className="text-3xl font-bold text-rose-600">{summaryData.critical}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-b-4 border-b-amber-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">High Priority</div>
              <div className="text-3xl font-bold text-amber-600">{summaryData.highPriority}</div>
            </div>
            <div className="bg-white rounded-lg border border-rose-200 p-4 shadow-sm bg-rose-50">
              <div className="text-[10px] font-bold text-rose-700 mb-1 uppercase tracking-wider">Overdue</div>
              <div className="text-3xl font-bold text-rose-700">{summaryData.overdue}</div>
            </div>
            <div className="bg-white rounded-lg border border-emerald-200 p-4 shadow-sm bg-emerald-50 border-b-4 border-b-emerald-500">
              <div className="text-[10px] font-bold text-emerald-700 mb-1 uppercase tracking-wider">Completed</div>
              <div className="text-3xl font-bold text-emerald-700">{summaryData.completed}</div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
            
            {/* PRIORITY QUEUE (Left Side) */}
            <div className={`bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col ${selectedActionId ? 'lg:w-2/3' : 'w-full'} transition-all duration-300`}>
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-base font-bold text-slate-800">Priority Intervention Queue</h2>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-4 py-3">Project</th>
                      <th className="px-4 py-3">District</th>
                      <th className="px-4 py-3">Primary Driver</th>
                      <th className="px-4 py-3 text-center">Risk</th>
                      <th className="px-4 py-3">Priority</th>
                      <th className="px-4 py-3">Recommended Action</th>
                      <th className="px-4 py-3">Owner</th>
                      <th className="px-4 py-3">Due Date</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    {actions.map((action) => {
                      const isSelected = selectedActionId === action.action_id;
                      return (
                        <tr 
                          key={action.action_id} 
                          onClick={() => setSelectedActionId(isSelected ? null : action.action_id)}
                          className={`cursor-pointer transition-colors ${isSelected ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}`}
                        >
                          <td className="px-4 py-3.5 font-bold text-blue-600">{action.project_id}</td>
                          <td className="px-4 py-3.5 text-slate-600 text-xs font-medium">{action.district}</td>
                          <td className="px-4 py-3.5 text-slate-800 text-xs font-semibold">{action.risk_driver}</td>
                          <td className="px-4 py-3.5 text-center font-bold text-rose-600">{action.current_risk}%</td>
                          <td className="px-4 py-3.5">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getPriorityColor(action.priority)}`}>
                              {action.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-slate-700 text-xs max-w-xs truncate" title={action.recommendation}>{action.recommendation}</td>
                          <td className="px-4 py-3.5 text-slate-600 text-[11px] font-medium">{action.owner_role}</td>
                          <td className="px-4 py-3.5 text-slate-600 text-[11px] font-medium whitespace-nowrap">{action.due_date}</td>
                          <td className="px-4 py-3.5">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider whitespace-nowrap ${getStatusColor(action.status)}`}>
                              {action.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ACTION DETAIL PANEL (Right Side) */}
            {selectedAction && (
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col lg:w-1/3 overflow-hidden transition-all duration-300">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
                  <h2 className="text-sm font-bold flex items-center">
                    Action Detail: {selectedAction.project_id}
                  </h2>
                  <button onClick={() => setSelectedActionId(null)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  
                  {/* Context */}
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Current Risk</div>
                      <div className="text-xl font-bold text-rose-600 flex items-center">
                        {selectedAction.current_risk}% <span className="ml-2 text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded uppercase tracking-wider">High</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Primary Driver</div>
                      <div className="text-sm font-bold text-slate-800">{selectedAction.risk_driver}</div>
                      <div className="text-[10px] font-semibold text-rose-500">+21 pp contribution</div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Recommended Action</div>
                    <div className="text-base font-bold text-slate-900 bg-blue-50 p-3 border border-blue-100 rounded">
                      {selectedAction.recommendation}
                    </div>
                    <p className="text-xs text-slate-600 mt-3 italic leading-relaxed">
                      {ruleForSelected?.rationale || selectedAction.notes}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase">Priority</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getPriorityColor(selectedAction.priority)}`}>
                        {selectedAction.priority}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase">Suggested Owner</span>
                      <span className="text-sm font-semibold text-slate-900">{selectedAction.owner_role}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase">Target Timeline</span>
                      <span className="text-sm font-semibold text-slate-900 flex items-center"><Calendar className="w-3 h-3 mr-1 text-slate-400"/> {selectedAction.due_date}</span>
                    </div>
                  </div>

                  {/* Status Workflow */}
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Action Status</div>
                    <div className="flex flex-wrap gap-2">
                      {['Action Required', 'Assigned', 'In Progress', 'Completed'].map(status => (
                        <button
                          key={status}
                          onClick={() => handleStatusUpdate(status)}
                          className={`px-3 py-1.5 text-xs font-bold rounded border transition-colors ${
                            selectedAction.status === status 
                              ? getStatusColor(status) + ' ring-2 ring-offset-1 ring-slate-300' 
                              : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action History */}
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-3">Activity History</div>
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-1.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                        <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] text-xs p-2 bg-slate-50 rounded border border-slate-100">
                          <div className="font-semibold text-slate-900">Current Status: {selectedAction.status}</div>
                          <div className="text-[9px] text-slate-500 mt-0.5">{selectedAction.updated_at}</div>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-white bg-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                        <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] text-xs p-2 bg-slate-50 rounded border border-slate-100">
                          <div className="font-semibold text-slate-900">Recommendation generated</div>
                          <div className="text-[9px] text-slate-500 mt-0.5">{selectedAction.created_at}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50">
                  <button 
                    onClick={() => router.push(`/official/projects/${selectedAction.project_id}`)}
                    className="w-full py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-sm font-semibold rounded flex items-center justify-center transition-colors mb-2"
                  >
                    View Full Project Detail <ArrowUpRight className="w-4 h-4 ml-1.5" />
                  </button>
                  <Link 
                    href={`/official/audit?project=${selectedAction.project_id}`}
                    className="w-full py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-sm font-semibold rounded flex items-center justify-center transition-colors"
                  >
                    View Audit History
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* INTERVENTION IMPACT & ADMIN MAPPING */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-shrink-0 pb-6">
            
            {/* INTERVENTION IMPACT */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm p-5 relative overflow-hidden">
              <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-4 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2" /> Intervention Impact
              </h2>
              <div className="text-[10px] text-emerald-700/70 font-semibold mb-4 italic">
                *Observed prototype risk change after action update
              </div>
              
              <div className="bg-white p-4 rounded border border-emerald-100 shadow-sm relative z-10 mb-2">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-slate-900">Project {interventionImpact.project_id}</span>
                  <span className="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">{interventionImpact.status}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="bg-slate-50 p-2 rounded">
                    <div className="text-[10px] font-semibold text-slate-500 uppercase">Before</div>
                    <div className="text-lg font-bold text-slate-900">{interventionImpact.beforeRisk}%</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="bg-emerald-50 p-2 rounded">
                    <div className="text-[10px] font-semibold text-slate-500 uppercase">After Update</div>
                    <div className="text-lg font-bold text-emerald-700">{interventionImpact.afterRisk}%</div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-3 border-t border-slate-100">
                  <span className="font-semibold text-slate-600">Change:</span>
                  <span className="font-bold text-emerald-600 flex items-center"><TrendingDown className="w-3 h-3 mr-1"/> {interventionImpact.change} pp</span>
                </div>
                <div className="flex justify-between items-center text-xs mt-2">
                  <span className="font-semibold text-slate-600">Driver Addressed:</span>
                  <span className="font-semibold text-slate-800">{interventionImpact.driver} ({interventionImpact.casesResolved}/{interventionImpact.totalCases} resolved)</span>
                </div>
              </div>
            </div>

            {/* ACTION MAPPING */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-sm font-bold text-slate-800">Administrative Action Mapping</h2>
                <p className="text-xs text-slate-500 mt-0.5">Deterministic rule-based mappings from risk drivers to interventions</p>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-4 py-3">Risk Driver</th>
                      <th className="px-4 py-3">Trigger Conditions</th>
                      <th className="px-4 py-3">Recommended Actions</th>
                      <th className="px-4 py-3">Suggested Owner</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-slate-100">
                    {recommendationRules.slice(0, 3).map((rule, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors align-top">
                        <td className="px-4 py-3 font-bold text-slate-800 w-1/4">{rule.driver}</td>
                        <td className="px-4 py-3 text-slate-600 w-1/4">
                          <ul className="list-disc pl-3 space-y-1">
                            {rule.triggers.map((t, i) => <li key={i}>{t}</li>)}
                          </ul>
                        </td>
                        <td className="px-4 py-3 text-slate-700 w-1/3">
                          <ul className="list-disc pl-3 space-y-1">
                            {rule.steps.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-600">{rule.owner_role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>

        </main>
      </div>

      {/* CREATE ACTION MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">Create Corrective Action</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
            </div>
            
            {!creationSuccess ? (
              <form onSubmit={handleCreateAction} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Project ID</label>
                    <input type="text" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                    <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white">
                      <option value="CRITICAL">CRITICAL</option>
                      <option value="HIGH">HIGH</option>
                      <option value="MEDIUM">MEDIUM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Risk Driver</label>
                  <input type="text" value={formData.driver} onChange={e => setFormData({...formData, driver: e.target.value})} className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-slate-50" readOnly />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Recommended Action</label>
                  <textarea value={formData.action} onChange={e => setFormData({...formData, action: e.target.value})} className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none" rows={2}></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Officer / Role</label>
                    <input type="text" value={formData.officer} onChange={e => setFormData({...formData, officer: e.target.value})} className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Date</label>
                    <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Additional Notes</label>
                  <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full text-sm border border-slate-300 rounded px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none" rows={2}></textarea>
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                  <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 border border-slate-300 rounded">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm">Create Action</button>
                </div>
              </form>
            ) : (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Action Created Successfully</h3>
                <p className="text-sm text-slate-500">The corrective action has been assigned and added to the intervention queue.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
