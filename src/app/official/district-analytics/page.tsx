"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, Activity, Map as MapIcon, 
  BarChart3, Lightbulb, Bell, Database, Shield, LogOut, User,
  AlertTriangle, Search, Filter, Download, ArrowUpRight,
  TrendingUp, TrendingDown, Minus, ChevronRight, CheckCircle2, ArrowRight,
  AlertOctagon, AlertCircle, X, MapPin, ShieldAlert, Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, BarChart, Bar, Cell } from 'recharts';

import { districtAnalytics, stateOverview, interventionOutcomes, calculateHealthScore } from './data';

export default function DistrictAnalytics() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Filters
  const [stateFilter, setStateFilter] = useState("Rajasthan");
  const [districtFilter, setDistrictFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("Last 6 Months");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Selected District Drawer
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);

  const filteredDistricts = useMemo(() => {
    return districtAnalytics.filter(d => {
      const matchState = stateFilter === "All" || d.state === stateFilter;
      const matchDistrict = districtFilter === "All" || d.district === districtFilter;
      const matchSearch = d.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchState && matchDistrict && matchSearch;
    });
  }, [stateFilter, districtFilter, searchQuery]);

  const selectedDistrict = districtAnalytics.find(d => d.district === selectedDistrictId);
  const selectedHealth = selectedDistrict ? calculateHealthScore(selectedDistrict) : null;

  // KPIs
  const kpiMonitored = filteredDistricts.length;
  const kpiProjects = filteredDistricts.reduce((acc, d) => acc + d.projectCount, 0);
  const kpiHighRisk = filteredDistricts.reduce((acc, d) => acc + d.highRiskProjects, 0);
  const kpiAvgRisk = filteredDistricts.length > 0 ? Math.round(filteredDistricts.reduce((acc, d) => acc + d.averageRisk, 0) / filteredDistricts.length) : 0;
  const kpiIncreasing = filteredDistricts.filter(d => d.riskTrend === 'Increasing').length;
  const kpiOpenActions = filteredDistricts.reduce((acc, d) => acc + d.openActions, 0);

  const getTrendIcon = (trend: string) => {
    if (trend === 'Increasing') return <TrendingUp className="w-4 h-4 text-rose-500 mr-1" />;
    if (trend === 'Decreasing') return <TrendingDown className="w-4 h-4 text-emerald-500 mr-1" />;
    return <Minus className="w-4 h-4 text-slate-400 mr-1" />;
  };

  const getPerformanceBadge = (trend: string, risk: number) => {
    if (risk >= 65) return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 uppercase tracking-wider">High Attention</span>;
    if (risk >= 55) return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">Attention</span>;
    if (trend === 'Decreasing') return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">Improving</span>;
    return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">Stable</span>;
  };

  const getHeatmapColor = (status: string) => {
    switch(status) {
      case 'Critical Bottleneck': return 'bg-rose-500 text-white border-rose-600';
      case 'High Risk': return 'bg-rose-300 text-rose-900 border-rose-400';
      case 'Moderate Delay': return 'bg-amber-200 text-amber-800 border-amber-300';
      case 'On Track': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  // Export functionality
  const handleExport = () => {
    const headers = ["District", "Projects", "Average Risk", "High/Critical Projects", "Average Delay (days)", "Open Actions", "Overdue Actions", "Dominant Driver", "Risk Trend"];
    const rows = filteredDistricts.map(d => [
      d.district, d.projectCount, d.averageRisk, d.highRiskProjects, d.averageStageDelay, d.openActions, d.overdueActions, d.primaryDriver, d.riskTrend
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "district_analytics_report.csv");
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
            <li><Link href="/official/risk-monitor" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Activity className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Risk Monitor</span></Link></li>
            <li><Link href="/official/gis" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><MapIcon className="w-5 h-5 mr-3" /><span className="font-medium text-sm">GIS Intelligence</span></Link></li>
            <li>
              <Link href="/official/district-analytics" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md transition-colors">
                <BarChart3 className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">District Analytics</span>
              </Link>
            </li>
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
                District Analytics 
                <span className="ml-3 px-2 py-0.5 text-[10px] bg-amber-100 text-amber-700 rounded uppercase font-bold tracking-wider border border-amber-200">Synthetic Prototype Data</span>
              </h1>
              <p className="text-sm text-slate-500">Compare acquisition performance, risk patterns, stage bottlenecks, and intervention outcomes across districts.</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-2.5 top-2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search districts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 lg:w-64" 
                />
              </div>
              <button onClick={handleExport} className="flex items-center justify-center px-3 py-1.5 border border-slate-300 shadow-sm text-sm font-semibold rounded text-slate-700 bg-white hover:bg-slate-50">
                <Download className="w-4 h-4 mr-2" /> Export Report
              </button>
              <Link href="/official/alerts" className="text-slate-400 hover:text-slate-600 relative inline-block p-1">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-bold text-slate-500 uppercase flex items-center mr-1"><Filter className="w-3 h-3 mr-1" /> Filters:</span>
            <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} className="border border-slate-300 rounded px-2 py-1 bg-white font-medium text-slate-700">
              <option value="All">State: All</option>
              <option value="Rajasthan">Rajasthan</option>
            </select>
            <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)} className="border border-slate-300 rounded px-2 py-1 bg-white font-medium text-slate-700">
              <option value="All">District: All</option>
              {districtAnalytics.map(d => <option key={d.district} value={d.district}>{d.district}</option>)}
            </select>
            <select value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="border border-slate-300 rounded px-2 py-1 bg-white font-medium text-slate-700">
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="Last 6 Months">Last 6 Months</option>
            </select>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-50/50 flex flex-col gap-6">
          
          {/* EXECUTIVE KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 flex-shrink-0">
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Districts Monitored</div>
              <div className="text-2xl font-bold text-slate-900">{kpiMonitored}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Projects Monitored</div>
              <div className="text-2xl font-bold text-slate-900">{kpiProjects}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-b-4 border-b-rose-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">High/Critical Projects</div>
              <div className="text-2xl font-bold text-rose-600">{kpiHighRisk}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-b-4 border-b-blue-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Average Delay Risk</div>
              <div className="text-2xl font-bold text-slate-900">{kpiAvgRisk}%</div>
              <div className="text-[10px] text-slate-500 mt-1 flex items-center">*Prototype Calculation</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-b-4 border-b-amber-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Risk Increasing</div>
              <div className="text-2xl font-bold text-amber-600">{kpiIncreasing} <span className="text-sm font-medium text-slate-500">districts</span></div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Open Actions</div>
              <div className="text-2xl font-bold text-slate-900">{kpiOpenActions}</div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            
            {/* MAIN COLUMN */}
            <div className="xl:w-2/3 flex flex-col gap-6">
              
              {/* DISTRICT PERFORMANCE TABLE */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center">District Performance</h2>
                  <span className="text-xs text-slate-500 italic">Click row for details</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-4 py-3">District</th>
                        <th className="px-4 py-3 text-center">Projects</th>
                        <th className="px-4 py-3 text-center">High/Critical</th>
                        <th className="px-4 py-3 text-center">Average Risk</th>
                        <th className="px-4 py-3 text-center">Avg Stage Delay</th>
                        <th className="px-4 py-3 text-right">At-Risk Land</th>
                        <th className="px-4 py-3 text-center">Open Actions</th>
                        <th className="px-4 py-3 text-center">Risk Trend</th>
                        <th className="px-4 py-3">Performance</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100">
                      {filteredDistricts.map((d) => (
                        <tr 
                          key={d.district} 
                          onClick={() => setSelectedDistrictId(d.district)}
                          className={`cursor-pointer transition-colors ${selectedDistrictId === d.district ? 'bg-indigo-50/80 border-l-4 border-l-indigo-500' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}`}
                        >
                          <td className="px-4 py-3.5 font-bold text-blue-600">{d.district}</td>
                          <td className="px-4 py-3.5 text-center font-medium text-slate-600">{d.projectCount}</td>
                          <td className="px-4 py-3.5 text-center font-bold text-rose-600">{d.highRiskProjects}</td>
                          <td className="px-4 py-3.5 text-center font-bold text-slate-800">{d.averageRisk}%</td>
                          <td className="px-4 py-3.5 text-center text-slate-600">{d.averageStageDelay} days</td>
                          <td className="px-4 py-3.5 text-right font-medium text-slate-600">{d.landArea} ha</td>
                          <td className="px-4 py-3.5 text-center">
                            <span className="font-semibold text-slate-700">{d.openActions}</span>
                            {d.overdueActions > 0 && <span className="ml-1 text-[10px] text-rose-600 font-bold bg-rose-50 px-1 rounded">({d.overdueActions})</span>}
                          </td>
                          <td className="px-4 py-3.5 flex justify-center items-center">
                            {getTrendIcon(d.riskTrend)}
                          </td>
                          <td className="px-4 py-3.5">
                            {getPerformanceBadge(d.riskTrend, d.averageRisk)}
                          </td>
                        </tr>
                      ))}
                      {filteredDistricts.length === 0 && (
                        <tr>
                          <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                            No districts match the selected criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DISTRICT RISK TREND CHART */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
                <h2 className="text-sm font-bold text-slate-800 mb-4">District Risk Trend</h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={districtAnalytics[0]?.riskHistory || []} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 100]} />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                      {filteredDistricts.slice(0, 4).map((d, i) => {
                        const colors = ['#e11d48', '#d97706', '#2563eb', '#059669'];
                        // Map the district's history onto the chart
                        // In a real app we'd restructure the data, but for prototype we'll mock the lines based on the first item's X axis
                        return (
                          <Line 
                            key={d.district} 
                            type="monotone" 
                            data={d.riskHistory}
                            dataKey="risk" 
                            name={d.district} 
                            stroke={colors[i % colors.length]} 
                            strokeWidth={2} 
                            dot={{ r: 4, strokeWidth: 2 }} 
                            activeDot={{ r: 6 }} 
                          />
                        );
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* STAGE BOTTLENECKS MATRIX */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
                <h2 className="text-sm font-bold text-slate-800 mb-1">Stage Bottlenecks by District</h2>
                <p className="text-xs text-slate-500 mb-4">Identifies which acquisition stages are causing the largest delays.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase">District</th>
                        {Object.keys(districtAnalytics[0]?.stagePerformance || {}).map(stage => (
                          <th key={stage} className="px-2 py-2 text-[10px] font-bold text-slate-500 uppercase text-center w-24">{stage.replace(' / ', '/\n')}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {filteredDistricts.map(d => (
                        <tr key={d.district} className="border-t border-slate-100">
                          <td className="px-3 py-3 font-semibold text-slate-800">{d.district}</td>
                          {Object.entries(d.stagePerformance).map(([stage, status], idx) => (
                            <td key={idx} className="p-1 text-center">
                              <div className={`text-[9px] font-bold py-1.5 px-1 rounded border leading-tight ${getHeatmapColor(status as string)}`} title={status as string}>
                                {status === 'Critical Bottleneck' ? 'CRITICAL' : status === 'High Risk' ? 'HIGH' : status === 'Moderate Delay' ? 'MODERATE' : 'TRACK'}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* SIDE PANEL */}
            <div className="xl:w-1/3 flex flex-col gap-6">
              
              {/* DISTRICT DETAIL DRAWER / PANEL */}
              {selectedDistrict ? (
                <div className="bg-white border-2 border-blue-200 rounded-lg shadow-md flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300 relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                  <div className="p-4 border-b border-slate-100 flex justify-between items-start bg-slate-50/80">
                    <div>
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Selected District</div>
                      <h2 className="text-xl font-bold text-slate-900 flex items-center">{selectedDistrict.district} <span className="ml-2 text-xs font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Rajasthan</span></h2>
                    </div>
                    <button onClick={() => setSelectedDistrictId(null)} className="text-slate-400 hover:text-slate-600 bg-white rounded-full p-1 border border-slate-200">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-5 flex-1 overflow-y-auto space-y-6">
                    
                    {/* Overview */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Average Risk</div>
                        <div className="text-2xl font-bold text-rose-600 flex items-center">
                          {selectedDistrict.averageRisk}% 
                          <span className="ml-2 text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded uppercase font-bold flex items-center">
                            {selectedDistrict.riskTrend === 'Increasing' ? '↑' : selectedDistrict.riskTrend === 'Decreasing' ? '↓' : ''} {Math.abs(selectedDistrict.trendChange)} pp
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Health Score</div>
                        <div className="text-2xl font-bold text-slate-800">{selectedHealth?.score} <span className="text-xs text-slate-500 font-medium">/100</span></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
                      <div className="bg-slate-50 p-2 rounded">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Projects</div>
                        <div className="text-lg font-bold text-slate-900">{selectedDistrict.projectCount}</div>
                      </div>
                      <div className="bg-rose-50 p-2 rounded">
                        <div className="text-[10px] font-bold text-rose-700 uppercase">High/Critical</div>
                        <div className="text-lg font-bold text-rose-700">{selectedDistrict.highRiskProjects}</div>
                      </div>
                      <div className="bg-amber-50 p-2 rounded">
                        <div className="text-[10px] font-bold text-amber-700 uppercase">Open Actions</div>
                        <div className="text-lg font-bold text-amber-700">{selectedDistrict.openActions}</div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col gap-2 pt-2">
                      <Link href={`/official/gis?district=${selectedDistrict.district}`} className="flex items-center justify-between p-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded text-sm font-semibold text-indigo-700 transition-colors">
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> View District on GIS</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <Link href={`/official/alerts?district=${selectedDistrict.district}`} className="flex items-center justify-center p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 transition-colors">
                          <ShieldAlert className="w-4 h-4 mr-1.5 text-rose-500" /> {selectedDistrict.alertsCount} Active Alerts
                        </Link>
                        <Link href={`/official/recommendations?district=${selectedDistrict.district}`} className="flex items-center justify-center p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 transition-colors">
                          <Zap className="w-4 h-4 mr-1.5 text-amber-500" /> {selectedDistrict.openActions} Actions
                        </Link>
                      </div>
                    </div>

                    {/* Risk Drivers */}
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 mb-2 border-b border-slate-100 pb-1">Primary Risk Drivers</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-semibold text-slate-800 flex items-center"><div className="w-2 h-2 rounded-full bg-rose-500 mr-2"></div> {selectedDistrict.primaryDriver}</span>
                          <span className="text-xs text-slate-500">Dominant</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-semibold text-slate-700 flex items-center"><div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div> {selectedDistrict.secondaryDriver}</span>
                          <span className="text-xs text-slate-500">Secondary</span>
                        </div>
                      </div>
                    </div>

                    {/* Priority Projects */}
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 mb-2 border-b border-slate-100 pb-1">Priority Projects</div>
                      <div className="space-y-2">
                        {selectedDistrict.priorityProjects.map(p => (
                          <Link key={p.id} href={`/official/projects/${p.id}`} className="block p-3 border border-slate-200 rounded hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-blue-600 text-sm group-hover:underline">{p.id}</span>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${p.level === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : p.level === 'HIGH' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{p.level}</span>
                            </div>
                            <div className="text-xs font-medium text-slate-700 line-clamp-1">{p.name}</div>
                            <div className="text-xs text-rose-600 font-bold mt-1">Risk: {p.risk}%</div>
                          </Link>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                <>
                  {/* PRIORITY DISTRICTS */}
                  <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                      <h2 className="text-sm font-bold text-slate-800 flex items-center"><AlertTriangle className="w-4 h-4 mr-2 text-rose-500" /> Districts Requiring Attention</h2>
                    </div>
                    <div className="p-4 space-y-4">
                      {/* Ranked by health score (lowest first) */}
                      {districtAnalytics.map(d => ({ ...d, health: calculateHealthScore(d).score })).sort((a,b) => a.health - b.health).slice(0,3).map((d, i) => (
                        <div key={d.district} className="border border-slate-100 rounded p-3 hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedDistrictId(d.district)}>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center mr-2">{i+1}</div>
                              <div className="text-sm font-bold text-slate-900">{d.district}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Risk: {d.averageRisk}% {d.riskTrend==='Increasing' ? '↑' : ''}</div>
                            </div>
                          </div>
                          <div className="text-xs text-slate-600 mb-2">
                            <span className="font-semibold text-slate-800">Reason:</span> High concentration of {d.primaryDriver.toLowerCase()} issues.
                          </div>
                          <button className="text-[10px] font-bold text-blue-600 uppercase hover:underline flex items-center">Open District Detail <ChevronRight className="w-3 h-3 ml-1" /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DISTRICT TREND INSIGHTS */}
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-lg shadow-sm p-5">
                    <h2 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-3 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" /> Analytical Insights
                    </h2>
                    <ul className="text-xs text-slate-700 space-y-3 relative z-10 bg-white/60 p-3 rounded border border-indigo-100/50">
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 mr-2 flex-shrink-0"></div> <span className="font-medium">Jaipur shows the highest concentration of high-risk projects in the current prototype dataset.</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 mr-2 flex-shrink-0"></div> <span className="font-medium">Compensation is the dominant bottleneck across Jaipur and Kota projects.</span></li>
                      <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 mr-2 flex-shrink-0"></div> <span className="font-medium">Alwar's average risk has decreased during the selected period due to resolved stakeholder issues.</span></li>
                    </ul>
                  </div>

                  {/* INTERVENTION OUTCOME */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-wider flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Intervention Outcome
                      </h2>
                      <span className="bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200 text-[9px] text-emerald-800 font-bold uppercase tracking-wider">Simulated Prototype</span>
                    </div>
                    {interventionOutcomes.map(outcome => (
                      <div key={outcome.district} className="bg-white rounded border border-emerald-100 p-3">
                        <div className="text-xs font-bold text-slate-800 mb-2">{outcome.interventionName}</div>
                        <div className="flex justify-between items-center mb-3 text-center">
                          <div>
                            <div className="text-[9px] text-slate-500 uppercase font-bold">Risk Before</div>
                            <div className="text-base font-bold text-slate-900">{outcome.riskBefore}%</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-emerald-400" />
                          <div>
                            <div className="text-[9px] text-slate-500 uppercase font-bold">Risk After</div>
                            <div className="text-base font-bold text-emerald-700">{outcome.riskAfter}%</div>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-600 border-t border-emerald-50 pt-2">
                          <span className="font-bold text-emerald-700">Action:</span> {outcome.actionTaken}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* STATE OVERVIEW */}
                  <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 text-center">
                    <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">State-Level Overview</h2>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50 p-2 rounded">
                        <div className="text-slate-500 font-medium">Total Land Area</div>
                        <div className="font-bold text-slate-900">{stateOverview.totalLandArea} ha</div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded">
                        <div className="text-slate-500 font-medium">High/Critical</div>
                        <div className="font-bold text-rose-600">{stateOverview.highCriticalProjects}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs bg-slate-50 p-2 rounded text-left">
                      <div className="flex justify-between mb-1"><span className="text-slate-500 font-medium">Top Driver:</span> <span className="font-bold text-slate-800">{stateOverview.mostCommonDriver}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500 font-medium">Top Bottleneck:</span> <span className="font-bold text-slate-800">{stateOverview.mostDelayedStage}</span></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
