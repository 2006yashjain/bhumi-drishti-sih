/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, Activity, Map as MapIcon, 
  BarChart3, Lightbulb, Bell, Database, Shield, LogOut, User,
  Search, RefreshCw, AlertTriangle, ChevronDown, TrendingUp, TrendingDown, Minus, ArrowRight
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip
} from 'recharts';

import { 
  summaryData, portfolioRiskDistribution, stageWiseRisk, 
  trajectoryDistribution, topRiskDrivers, allProjects 
} from './data';

export default function RiskMonitor() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stageFilter, setStageFilter] = useState("All");
  const [driverFilter, setDriverFilter] = useState("All");

  const handleStageClick = (stage: string) => {
    setStageFilter(stageFilter === stage ? "All" : stage);
    setDriverFilter("All");
  };

  const handleDriverClick = (driver: string) => {
    setDriverFilter(driverFilter === driver ? "All" : driver);
    setStageFilter("All");
  };

  let filteredProjects = allProjects;
  if (stageFilter !== "All") {
    filteredProjects = filteredProjects.filter(p => p.current_stage === stageFilter);
  }
  if (driverFilter !== "All") {
    filteredProjects = filteredProjects.filter(p => p.primary_driver === driverFilter);
  }

  const getActionStatus = (project: any) => {
    if (project.risk_probability >= 80 || project.risk_change >= 15) {
      return { label: "Requires Immediate Attention", color: "text-rose-700 bg-rose-100" };
    }
    if (project.risk_probability >= 60) {
      return { label: "Action Required", color: "text-amber-700 bg-amber-100" };
    }
    return { label: "Monitoring", color: "text-blue-700 bg-blue-100" };
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
              <Link href="/official/alerts" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Briefcase className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Project Portfolio</span>
              </Link>
            </li>
            <li>
              <Link href="/official/risk-monitor" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md transition-colors">
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
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden mt-14 md:mt-0">
        
        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center h-full">
            <div className="hidden lg:flex items-center space-x-4 border-r border-slate-200 pr-6 mr-6 h-full">
              <span className="font-bold text-slate-800 text-lg">Risk Monitor</span>
            </div>
            
            <div className="flex space-x-4 text-sm overflow-x-auto no-scrollbar">
              <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900 whitespace-nowrap">
                <span className="font-medium mr-1">State:</span> All <ChevronDown className="w-3 h-3 ml-1" />
              </div>
              <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900 whitespace-nowrap">
                <span className="font-medium mr-1">District:</span> All <ChevronDown className="w-3 h-3 ml-1" />
              </div>
              <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900 whitespace-nowrap">
                <span className="font-medium mr-1">Stage:</span> {stageFilter} <ChevronDown className="w-3 h-3 ml-1" />
              </div>
              <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900 whitespace-nowrap">
                <span className="font-medium mr-1">Risk:</span> All <ChevronDown className="w-3 h-3 ml-1" />
              </div>
              <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900 whitespace-nowrap">
                <span className="font-medium mr-1">Date:</span> YTD <ChevronDown className="w-3 h-3 ml-1" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-xs text-slate-500">Last synchronized:</span>
              <span className="font-medium text-slate-700">03 Sep 2026, 18:45 IST</span>
            </div>
            
            <div className="flex items-center space-x-4 border-l border-slate-200 pl-6 h-8">
              <button className="text-slate-400 hover:text-slate-600"><Search className="w-5 h-5" /></button>
              <button className="text-slate-400 hover:text-slate-600"><RefreshCw className="w-4 h-4" /></button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-50/50 space-y-6">
          
          {/* PROTOTYPE NOTICE */}
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <span className="font-bold mr-2">PROTOTYPE DATA:</span> 
              Synthetic project histories generated from the documented land acquisition process structure. Prototype risk outputs must not be interpreted as real-world government predictions.
            </div>
          </div>

          <div className="mb-2">
            <h1 className="text-2xl font-bold text-slate-900">Risk Monitor</h1>
            <p className="text-sm text-slate-500 mt-1">Stage-wise delay risk across active acquisition projects</p>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Projects Assessed</div>
              <div className="text-2xl font-bold text-slate-900">{summaryData.projectsAssessed.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-b-4 border-b-rose-500">
              <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Critical Risk</div>
              <div className="text-2xl font-bold text-rose-600">{summaryData.criticalRisk}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-b-4 border-b-amber-500">
              <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">High Risk</div>
              <div className="text-2xl font-bold text-amber-600">{summaryData.highRisk}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Risk Increasing</div>
              <div className="text-2xl font-bold text-slate-900 flex items-center">
                {summaryData.riskIncreasing} <TrendingUp className="w-4 h-4 ml-2 text-rose-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm bg-rose-50 border-rose-200">
              <div className="text-xs font-semibold text-rose-700 mb-1 uppercase tracking-wider">Immediate Attention</div>
              <div className="text-2xl font-bold text-rose-700 flex items-center">
                {summaryData.immediateAttention} <AlertTriangle className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>

          {/* TOP CHARTS ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* PORTFOLIO RISK OVERVIEW */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-base font-bold text-slate-800">Portfolio Risk Overview</h2>
                <div className="flex space-x-1 bg-slate-100 p-0.5 rounded">
                  <button className="px-2.5 py-1 text-xs font-medium bg-white shadow-sm rounded text-slate-900">Project Count</button>
                  <button className="px-2.5 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 rounded">Land Area</button>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col sm:flex-row items-center justify-center">
                <div className="h-48 w-full sm:w-1/2 min-w-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioRiskDistribution}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {portfolioRiskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontSize: '13px', fontWeight: 500, color: '#0f172a' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 pl-0 sm:pl-4 space-y-3 mt-4 sm:mt-0">
                  {portfolioRiskDistribution.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                        <span className="font-medium text-slate-600">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-900">{item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RISK TRAJECTORY DISTRIBUTION */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-base font-bold text-slate-800">Projects With Increasing Risk</h2>
                <div className="flex space-x-1 bg-slate-100 p-0.5 rounded">
                  <button className="px-2.5 py-1 text-xs font-medium bg-white shadow-sm rounded text-slate-900">30D</button>
                  <button className="px-2.5 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 rounded">90D</button>
                  <button className="px-2.5 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 rounded">1Y</button>
                </div>
              </div>
              <div className="p-5 flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trajectoryDistribution} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }} width={80} />
                    <BarTooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                      {trajectoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* STAGE-WISE RISK & HEATMAP */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-slate-800">Risk by Acquisition Stage</h2>
                <p className="text-xs text-slate-500 mt-1">Select a stage to filter the projects table below.</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="px-5 py-3">Stage</th>
                    <th className="px-5 py-3 text-right">Projects</th>
                    <th className="px-5 py-3 text-center">Average Risk</th>
                    <th className="px-5 py-3 text-center">High/Critical</th>
                    <th className="px-5 py-3">Trend</th>
                    <th className="px-5 py-3 text-center border-l border-slate-200" colSpan={4}>Risk Heatmap (L / M / H / C)</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {stageWiseRisk.map((stage, idx) => {
                    const isSelected = stageFilter === stage.stage;
                    
                    // Synthetic heatmap intensities (0-100% opacity based on some math for demo)
                    const lowOp = 100;
                    const medOp = Math.min(100, (stage.avgRisk / 30) * 100);
                    const highOp = Math.min(100, (stage.highCritical / 80) * 100);
                    const critOp = Math.min(100, (stage.highCritical / 120) * 100);

                    return (
                      <tr 
                        key={idx} 
                        onClick={() => handleStageClick(stage.stage)}
                        className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                      >
                        <td className="px-5 py-3 font-semibold text-slate-800 flex items-center">
                          {isSelected && <ArrowRight className="w-4 h-4 mr-2 text-blue-600" />}
                          {stage.stage}
                        </td>
                        <td className="px-5 py-3 text-right font-medium">{stage.projects}</td>
                        <td className="px-5 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded font-bold ${stage.avgRisk >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                            {stage.avgRisk}%
                          </span>
                        </td>
                        <td className="px-5 py-3 text-center font-bold text-rose-600">{stage.highCritical}</td>
                        <td className="px-5 py-3 text-slate-600 text-xs font-medium flex items-center">
                          {stage.trend.includes('Increasing') && <TrendingUp className="w-3 h-3 mr-1 text-rose-500" />}
                          {stage.trend === 'Stable' && <Minus className="w-3 h-3 mr-1 text-slate-400" />}
                          {stage.trend === 'Declining' && <TrendingDown className="w-3 h-3 mr-1 text-emerald-500" />}
                          {stage.trend}
                        </td>
                        <td className="px-1 py-2 border-l border-slate-200">
                          <div className="w-full h-6 bg-emerald-500 rounded-sm" style={{ opacity: lowOp / 100 }}></div>
                        </td>
                        <td className="px-1 py-2">
                          <div className="w-full h-6 bg-blue-500 rounded-sm" style={{ opacity: medOp / 100 }}></div>
                        </td>
                        <td className="px-1 py-2">
                          <div className="w-full h-6 bg-amber-500 rounded-sm" style={{ opacity: highOp / 100 }}></div>
                        </td>
                        <td className="px-1 py-2 pr-5">
                          <div className="w-full h-6 bg-rose-500 rounded-sm" style={{ opacity: critOp / 100 }}></div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* INSIGHT & DRIVERS ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* INSIGHT CARD */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg shadow-sm p-6 text-white relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <Lightbulb className="w-32 h-32 text-amber-400" />
              </div>
              <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 relative z-10 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" /> Current Portfolio Insight
              </h2>
              <p className="text-base text-slate-200 font-medium leading-relaxed relative z-10 italic mb-6">
                "Compensation-stage projects currently show the strongest increase in estimated delay risk within this prototype dataset."
              </p>
              
              <div className="bg-slate-800/80 p-4 rounded border border-slate-600 relative z-10 grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold">Stage</div>
                  <div className="text-sm font-bold text-white">Compensation</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold">Risk</div>
                  <div className="text-sm font-bold text-rose-400">68%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold">Trend</div>
                  <div className="text-sm font-bold text-rose-400 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> Increasing</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold">High/Critical</div>
                  <div className="text-sm font-bold text-white">173 projects</div>
                </div>
              </div>

              <button 
                onClick={() => handleStageClick("Compensation")}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold uppercase tracking-wide rounded shadow transition-colors relative z-10"
              >
                View Compensation Projects
              </button>
            </div>

            {/* TOP RISK DRIVERS */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-800">Top Portfolio Risk Drivers</h2>
                <p className="text-xs text-slate-500 mt-1">Select a driver to filter the projects table.</p>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  {topRiskDrivers.map((item, idx) => {
                    const isSelected = driverFilter === item.driver;
                    return (
                      <div 
                        key={idx} 
                        className={`flex flex-col sm:flex-row sm:items-center cursor-pointer p-2 rounded transition-colors ${isSelected ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50 border border-transparent'}`}
                        onClick={() => handleDriverClick(item.driver)}
                      >
                        <div className="w-full sm:w-1/3 pr-4 mb-1 sm:mb-0 text-sm font-semibold text-slate-700 flex items-center">
                          {isSelected && <ArrowRight className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />}
                          <span className="truncate">{item.driver}</span>
                        </div>
                        <div className="w-full sm:w-2/3 flex items-center">
                          <div className="w-full bg-slate-100 rounded-full h-3 flex-1 overflow-hidden mr-3">
                            <div className="bg-slate-700 h-full rounded-full" style={{ width: `${item.frequency}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-slate-900 w-8 text-right">{item.frequency}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* PROJECT TABLE */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-base font-bold text-slate-800">
                Projects Requiring Intervention
                {stageFilter !== "All" && <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">Stage: {stageFilter}</span>}
                {driverFilter !== "All" && <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">Driver: {driverFilter}</span>}
              </h2>
              {filteredProjects.length > 0 && <div className="text-sm text-slate-500 font-medium">Showing {filteredProjects.length} projects</div>}
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="px-5 py-3">Project</th>
                    <th className="px-5 py-3">District</th>
                    <th className="px-5 py-3">Current Stage</th>
                    <th className="px-5 py-3 text-center">Current Risk</th>
                    <th className="px-5 py-3 text-center">Previous</th>
                    <th className="px-5 py-3 text-center">Change</th>
                    <th className="px-5 py-3">Primary Driver</th>
                    <th className="px-5 py-3">Action Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-8 text-center text-slate-500">No projects match the selected filters.</td>
                    </tr>
                  ) : (
                    filteredProjects.map((project) => {
                      const actionStatus = getActionStatus(project);
                      const isIncreasing = project.risk_change > 0;
                      const isDecreasing = project.risk_change < 0;
                      
                      return (
                        <tr key={project.project_id} className="hover:bg-slate-50 cursor-pointer transition-colors group" onClick={() => router.push(`/official/projects/${project.project_id}`)}>
                          <td className="px-5 py-4 font-semibold text-blue-600 group-hover:text-blue-800">
                            {project.project_id}
                          </td>
                          <td className="px-5 py-4 text-slate-600">{project.district}</td>
                          <td className="px-5 py-4 text-slate-700 font-medium">{project.current_stage}</td>
                          <td className="px-5 py-4 text-center">
                            <span className="font-bold text-lg">{project.risk_probability}%</span>
                          </td>
                          <td className="px-5 py-4 text-center text-slate-500">{project.previous_risk_probability}%</td>
                          <td className="px-5 py-4 text-center font-bold">
                            {isIncreasing ? (
                              <span className="text-rose-600 flex items-center justify-center"><TrendingUp className="w-3 h-3 mr-1"/>+{project.risk_change} pp</span>
                            ) : isDecreasing ? (
                              <span className="text-emerald-600 flex items-center justify-center"><TrendingDown className="w-3 h-3 mr-1"/>{project.risk_change} pp</span>
                            ) : (
                              <span className="text-slate-400 flex items-center justify-center"><Minus className="w-3 h-3 mr-1"/>0 pp</span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-slate-600 text-xs font-medium">{project.primary_driver}</td>
                          <td className="px-5 py-4">
                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${actionStatus.color}`}>
                              {actionStatus.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
