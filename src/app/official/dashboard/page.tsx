"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { casesApi, Case } from '@/services/api/casesApi';
import { 
  LayoutDashboard, 
  Briefcase, 
  Activity, 
  Map as MapIcon, 
  BarChart3, 
  Lightbulb, 
  Bell, 
  Database, Server, 
  Shield, 
  LogOut,
  Search,
  User,
  Download,
  RefreshCw,
  AlertTriangle,
  Clock,
  ChevronRight,
  ChevronDown,
  Info,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

import { 
  kpiData, 
  trendData, 
  projectsRequiringAttention, 
  quickIntelligence, 
  priorityActions,
  getRiskCategory
} from './data';

export default function OfficialDashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [cases, setCases] = useState<Case[]>([]);
  useEffect(() => {
    casesApi.getAll().then(data => setCases(data)).catch(console.error);
  }, []);


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
              <Link href="#" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md">
                <LayoutDashboard className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Overview</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
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
              <Link href="/official/gis" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
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
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden mt-14 md:mt-0">
        
        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center h-full">
            <div className="hidden lg:flex items-center space-x-4 border-r border-slate-200 pr-6 mr-6 h-full">
              <span className="font-bold text-slate-800 text-lg">Land Acquisition Intelligence</span>
            </div>
            
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900">
                <span className="font-medium mr-1">State:</span> All <ChevronDown className="w-3 h-3 ml-1" />
              </div>
              <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900">
                <span className="font-medium mr-1">District:</span> All <ChevronDown className="w-3 h-3 ml-1" />
              </div>
              <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900">
                <span className="font-medium mr-1">Date:</span> YTD <ChevronDown className="w-3 h-3 ml-1" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-xs text-slate-500">Last synchronized:</span>
              <span className="font-medium text-slate-700">03 Sep 2026, 18:45 IST</span>
            </div>
            <div className="hidden md:flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></div>
              DATA OPERATIONAL
            </div>
            
            <div className="flex items-center space-x-4 border-l border-slate-200 pl-6 h-8">
              <button className="text-slate-400 hover:text-slate-600"><Search className="w-5 h-5" /></button>
              <Link href="/official/alerts" className="text-slate-400 hover:text-slate-600 relative inline-block">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </Link>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-50/50">
          
          {/* PROTOTYPE NOTICE */}
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <span className="font-bold mr-2">PROTOTYPE DATA:</span> 
              Synthetic project histories generated from the documented land acquisition process structure. Prototype results must not be interpreted as real-world government performance.
            </div>
          </div>

          {/* PAGE HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Land Acquisition Command Center</h1>
              <p className="text-sm text-slate-500 mt-1">Portfolio overview across active land acquisition proceedings</p>
            </div>
            <div className="flex space-x-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center px-3 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded text-slate-700 bg-white hover:bg-slate-50">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-slate-900 hover:bg-slate-800">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </button>
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
              <div className="text-sm font-medium text-slate-500 mb-2">Projects Monitored</div>
              <div className="text-3xl font-bold text-slate-900 mb-2">{kpiData.projectsMonitored.toLocaleString()}</div>
              <div className="text-xs text-slate-500 flex flex-wrap gap-1">
                <span className="text-rose-600 font-semibold">{kpiData.critical}</span> Critical &middot; 
                <span className="text-amber-600 font-semibold">{kpiData.high}</span> High &middot; 
                <span className="text-blue-600 font-semibold">{kpiData.medium}</span> Medium &middot; 
                <span className="text-emerald-600 font-semibold">{kpiData.low}</span> Low
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
              <div className="text-sm font-medium text-slate-500 mb-2">At-Risk Land Area</div>
              <div className="text-3xl font-bold text-slate-900 mb-2">{kpiData.atRiskLandArea.toLocaleString()} <span className="text-lg font-normal text-slate-500">ha</span></div>
              <div className="text-xs font-medium text-rose-600 bg-rose-50 inline-flex items-center px-2 py-0.5 rounded">
                <Activity className="w-3 h-3 mr-1" />
                +{kpiData.atRiskLandAreaTrend}% over 90 days
              </div>
            </div>

            <div className="bg-white rounded-lg border border-rose-200 p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
              <div className="text-sm font-medium text-slate-500 mb-2">Section 24(2) Lapse Exposure</div>
              <div className="text-3xl font-bold text-rose-600 mb-2">{kpiData.lapseExposure}</div>
              <div className="text-xs text-slate-500">
                Projects approaching statutory lapse threshold
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
              <div className="text-sm font-medium text-slate-500 mb-2">Average Stage Delay</div>
              <div className="text-3xl font-bold text-slate-900 mb-2">{kpiData.averageStageDelay} <span className="text-lg font-normal text-slate-500">days</span></div>
              <div className="text-xs text-slate-500">
                Highest bottleneck: <span className="font-semibold text-amber-600">{kpiData.highestBottleneck}</span>
              </div>
            </div>
          </div>

          {/* MIDDLE ROW: CHART & DISTRIBUTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* TREND CHART */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm lg:col-span-2 flex flex-col">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-base font-bold text-slate-800">Portfolio Risk Trend</h2>
                <div className="flex space-x-1 bg-slate-100 p-0.5 rounded">
                  <button className="px-2.5 py-1 text-xs font-medium bg-white shadow-sm rounded text-slate-900">30D</button>
                  <button className="px-2.5 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 rounded">90D</button>
                  <button className="px-2.5 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 rounded">1Y</button>
                </div>
              </div>
              <div className="p-5 flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                      labelStyle={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}
                    />
                    <Area type="monotone" dataKey="critical" stroke="#e11d48" strokeWidth={2} fillOpacity={1} fill="url(#colorCritical)" />
                    <Area type="monotone" dataKey="high" stroke="#d97706" strokeWidth={2} fillOpacity={1} fill="url(#colorHigh)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 rounded-b-lg text-xs text-slate-600 flex items-center">
                <Info className="w-4 h-4 mr-2 text-slate-400" />
                Critical-risk projects increased during this prototype period.
              </div>
            </div>

            {/* DISTRIBUTION */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-800">Risk Distribution</h2>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center space-y-6">
                
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-slate-700">CRITICAL</span>
                    <span className="text-sm font-bold text-slate-900">{kpiData.critical} <span className="text-xs font-normal text-slate-500">(6%)</span></span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-rose-500 h-2 rounded-full" style={{ width: '6%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-slate-700">HIGH</span>
                    <span className="text-sm font-bold text-slate-900">{kpiData.high} <span className="text-xs font-normal text-slate-500">(19%)</span></span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '19%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-slate-700">MEDIUM</span>
                    <span className="text-sm font-bold text-slate-900">{kpiData.medium} <span className="text-xs font-normal text-slate-500">(26%)</span></span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '26%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-slate-700">LOW</span>
                    <span className="text-sm font-bold text-slate-900">{kpiData.low} <span className="text-xs font-normal text-slate-500">(49%)</span></span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '49%' }}></div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* BOTTOM ROW: TABLE & PANELS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* PROJECTS TABLE */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm lg:col-span-2 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-base font-bold text-slate-800">Projects Requiring Attention</h2>
                <div className="flex space-x-3 text-sm">
                  <div className="flex items-center text-slate-600 border border-slate-200 rounded px-2.5 py-1">
                    Risk: All <ChevronDown className="w-3 h-3 ml-1" />
                  </div>
                  <div className="flex items-center text-slate-600 border border-slate-200 rounded px-2.5 py-1">
                    Stage: All <ChevronDown className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="px-5 py-3">Project</th>
                      <th className="px-5 py-3">Location</th>
                      <th className="px-5 py-3">Current Stage</th>
                      <th className="px-5 py-3">Risk Score</th>
                      <th className="px-5 py-3">Primary Contributor</th>
                      <th className="px-5 py-3 text-right">Lapse Exposure</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    {projectsRequiringAttention.map((project) => {
                      const risk = getRiskCategory(project.riskScore);
                      return (
                        <tr key={project.id} className="hover:bg-slate-50 cursor-pointer transition-colors group">
                          <td className="px-5 py-4 font-semibold text-blue-600 group-hover:text-blue-800">
                            <Link href={`/official/projects/${project.id}`}>{project.id}</Link>
                          </td>
                          <td className="px-5 py-4 text-slate-600">{project.location}</td>
                          <td className="px-5 py-4 text-slate-700 font-medium">{project.stage}</td>
                          <td className="px-5 py-4">
                            <div className={`inline-flex flex-col items-center justify-center border ${risk.bg} ${risk.border} ${risk.color} px-2 py-1 rounded w-full max-w-[80px]`}>
                              <span className="font-bold text-lg leading-none mb-0.5">{project.riskScore}%</span>
                              <span className="text-[9px] font-bold tracking-wider leading-none">{risk.label}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-slate-600 text-xs font-medium">{project.contributor}</td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end text-rose-600 font-semibold text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {project.lapseExposure} days
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SIDE PANELS */}
            <div className="space-y-6">
              
              {/* CURRENT INTELLIGENCE */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-amber-500" />
                    Current Intelligence
                  </h2>
                </div>
                <div className="p-4">
                  <ul className="space-y-3">
                    {quickIntelligence.map((item, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ACTION PRIORITY */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-blue-500" />
                    Priority Actions
                  </h2>
                </div>
                <div className="p-0">
                  <div className="divide-y divide-slate-100">
                    {cases.length > 0 ? cases.map((c, idx) => (
                      <div key={c.case_id} className="p-4 flex flex-col hover:bg-slate-50 transition-colors">
                        <div className="text-xs font-semibold text-slate-800 mb-1 leading-tight flex justify-between">
                          <span>{c.project_code}: {c.issue_type}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[11px] text-slate-500 font-medium">{c.escalation_level}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${c.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                            {c.severity}
                          </span>
                        </div>
                      </div>
                    )) : (
                      <div className="p-4 text-center text-slate-400 text-xs font-medium">No open cases assigned to you.</div>
                    )}
                  </div>
                  <div className="p-4 border-t border-slate-100">
                    <Link href="/official/recommendations" className="flex items-center justify-center w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded border border-slate-200 transition-colors">
                      View Recommendations
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* RECENT ACTIVITY */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-indigo-500" />
                    Recent Activity
                  </h2>
                </div>
                <div className="p-0">
                  <div className="divide-y divide-slate-100">
                    <Link href="/official/audit?project=P-1042" className="block p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-slate-800">Action Completed</span>
                        <span className="text-[10px] text-slate-500">Just now</span>
                      </div>
                      <div className="text-[11px] text-slate-600">P-1042 • Compensation Officer</div>
                    </Link>
                    <Link href="/official/audit?project=P-1042" className="block p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-slate-800">Risk Prediction Update</span>
                        <span className="text-[10px] text-slate-500">2h ago</span>
                      </div>
                      <div className="text-[11px] text-slate-600">P-1042 • Risk Engine</div>
                    </Link>
                    <Link href="/official/audit?project=P-1042" className="block p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-slate-800">Action Status Changed</span>
                        <span className="text-[10px] text-slate-500">1d ago</span>
                      </div>
                      <div className="text-[11px] text-slate-600">P-1042 • Compensation Officer</div>
                    </Link>
                  </div>
                  <div className="p-4 border-t border-slate-100">
                    <Link href="/official/audit" className="flex items-center justify-center w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded border border-indigo-200 transition-colors">
                      View Full Audit Trail
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
