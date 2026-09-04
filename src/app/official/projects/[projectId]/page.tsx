/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, LayoutDashboard, Briefcase, Activity, Map as MapIcon, 
  BarChart3, Lightbulb, Bell, Database, Shield, LogOut, User, Server,
  Download, RefreshCw, AlertTriangle, ChevronRight, CheckCircle2,
  TrendingUp, CheckSquare, Clock, AlertOctagon, Info
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Cell
} from 'recharts';

import { projectsApi } from '@/services/api/projectsApi';
import { gisApi } from '@/services/api/gisApi';
import { casesApi, Case } from '@/services/api/casesApi';
import { dataQualityApi, DataQuality } from '@/services/api/dataQualityApi';
import { interventionsApi } from '@/services/api/interventionsApi';

export default function ProjectDetail() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [project, setProject] = useState<any>(null);
  const [risk, setRisk] = useState<any>(null);
  const [trajectory, setTrajectory] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState<any>(null);
  const [gisData, setGisData] = useState<any>(null);
  const [dq, setDq] = useState<DataQuality | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [interventions, setInterventions] = useState<any[]>([]);

  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedRisk, setSimulatedRisk] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadAll = async () => {
      try {
        setLoading(true);
        const [projRes, riskRes, trajRes, dimRes, dqRes, casesRes, interRes] = await Promise.all([
          projectsApi.getProject(projectId).catch(() => null),
          projectsApi.getProjectRisk(projectId).catch(() => null),
          projectsApi.getRiskTrajectory(projectId).catch(() => []),
          projectsApi.getRiskDimensions(projectId).catch(() => null),
          dataQualityApi.getByProject(projectId).catch(() => null),
          casesApi.getByProject(projectId).catch(() => []),
          interventionsApi.getByProject(projectId).catch(() => [])
        ]);
        
        if (mounted) {
          setProject(projRes);
          setRisk(riskRes);
          setTrajectory(trajRes);
          setDimensions(dimRes);
          setDq(dqRes);
          setCases(casesRes);
          setInterventions(interRes);
          
          // Lazy load GIS
          gisApi.getProjectGIS(projectId).then(g => {
            if (mounted) setGisData(g);
          }).catch(e => console.error(e));
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadAll();
    return () => { mounted = false; };
  }, [projectId]);

  const handleSimulateIntervention = async (c: Case) => {
    setIsSimulating(true);
    try {
      // Create intervention
      await interventionsApi.create({
        project_code: projectId,
        case_id: c.case_id,
        action_taken: "Prioritized 18 unresolved compensation cases",
        officer: "State Administrator",
        risk_before: risk.risk_probability,
        risk_after: 64.0,
        status: "Completed"
      });
      // Re-fetch
      const interRes = await interventionsApi.getByProject(projectId);
      setInterventions(interRes);
      setSimulatedRisk(64.0);
    } catch(e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col">
        <AlertTriangle className="w-12 h-12 text-rose-500 mb-4" />
        <h2 className="text-xl font-bold">Project Not Found</h2>
        <Link href="/official/dashboard" className="mt-4 text-blue-600 underline">Return to Dashboard</Link>
      </div>
    );
  }

  // Formatting 7D radar data
  const radarData = dimensions ? [
    { subject: 'Land Record', A: dimensions.land_record_risk },
    { subject: 'Legal/Dispute', A: dimensions.legal_dispute_risk },
    { subject: 'Compensation', A: dimensions.compensation_risk },
    { subject: 'R&R', A: dimensions.rr_risk },
    { subject: 'Admin/Process', A: dimensions.admin_process_risk },
    { subject: 'Financial', A: dimensions.financial_risk },
    { subject: 'Spatial/Impact', A: dimensions.spatial_project_impact_risk },
  ] : [];

  // Formatting trajectory
  const trajData = trajectory.map(t => ({
    name: new Date(t.assessment_date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'}),
    Risk: t.overall_risk
  }));

  const currentRisk = simulatedRisk !== null ? simulatedRisk : (risk ? risk.risk_probability : 0);
  const isCritical = currentRisk > 70;

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
              <Link href="/official/projects" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md">
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
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto mt-14 md:mt-0 relative bg-slate-50">
        
        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center h-full">
            <Link href="/official/projects" className="mr-4 text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-4 border-r border-slate-200 pr-6 mr-6 h-full">
              <span className="font-bold text-slate-800 text-lg">{project.project_code}</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-semibold border border-slate-200">
                {project.current_stage}
              </span>
            </div>
            <span className="text-sm font-medium text-slate-500 hidden md:block">{project.project_name}</span>
          </div>
          
          <div className="flex items-center space-x-3">
             <Link href="/official/gis" className="text-xs bg-indigo-50 text-indigo-700 font-bold px-3 py-1.5 rounded-full border border-indigo-100 flex items-center hover:bg-indigo-100 transition-colors">
               <MapIcon className="w-3.5 h-3.5 mr-1.5" /> View in SDSS
             </Link>
          </div>
        </header>

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          
          {/* SIMULATED IMPACT BANNER */}
          {simulatedRisk !== null && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-emerald-800">Simulated Intervention Impact</h3>
                <p className="text-xs text-emerald-600 mt-1">
                  Based on resolving the 18 compensation cases, the projected delay risk has dropped from <span className="font-bold line-through">{risk.risk_probability}%</span> to <span className="font-bold text-emerald-700">{simulatedRisk}%</span>.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* OVERALL RISK CARD */}
            <div className={`col-span-1 rounded-xl shadow-sm border p-6 flex flex-col justify-between ${isCritical ? 'bg-rose-50 border-rose-200' : 'bg-white border-slate-200'}`}>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-sm font-bold ${isCritical ? 'text-rose-800' : 'text-slate-600'}`}>STAGE-WISE DELAY RISK</h3>
                  {isCritical && <AlertOctagon className="w-5 h-5 text-rose-600 animate-pulse" />}
                </div>
                <div className="flex items-baseline mb-1">
                  <span className={`text-5xl font-black tracking-tighter ${isCritical ? 'text-rose-600' : 'text-slate-800'}`}>
                    {currentRisk}%
                  </span>
                </div>
                
                {trajectory.length > 0 && (
                  <div className={`text-xs font-bold px-2 py-1 rounded inline-block mt-2 ${
                    trajectory[trajectory.length-1].trend_classification.includes('INCREASING') ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    <TrendingUp className="w-3 h-3 inline mr-1" /> {trajectory[trajectory.length-1].trend_classification}
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t border-rose-100/50">
                <div className="text-xs font-semibold text-rose-700/80 mb-1 uppercase tracking-wider">Primary Driver</div>
                <div className="text-sm font-bold text-rose-900">{risk ? risk.primary_driver : 'Unknown'}</div>
              </div>
            </div>

            {/* TRAJECTORY CHART */}
            <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-slate-800">RISK TRAJECTORY</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium border border-slate-200">90 Days</span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trajData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} domain={[0, 100]} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}
                    />
                    <Area type="monotone" dataKey="Risk" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            
            {/* 7D RISK DIMENSIONS */}
            <div className="col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center">
                <Activity className="w-4 h-4 mr-2 text-indigo-500" />
                7-DIMENSIONAL RISK FRAMEWORK
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontWeight: 600 }} />
                    <Radar name="Risk Score" dataKey="A" stroke="#4f46e5" strokeWidth={2} fill="#4f46e5" fillOpacity={0.3} />
                    <RechartsTooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              {dimensions && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg text-sm text-indigo-900">
                  Dominant Dimension: <strong>Compensation ({dimensions.compensation_risk}%)</strong>
                </div>
              )}
            </div>

            {/* DATA QUALITY & RELIABILITY */}
            <div className="col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
              <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center">
                <Database className="w-4 h-4 mr-2 text-blue-500" />
                DATA QUALITY & RELIABILITY
              </h3>
              
              {dq ? (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-600">Data Completeness</span>
                        <span className="font-bold text-slate-800">{dq.completeness_score}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${dq.completeness_score}%` }}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-600">Data Freshness</span>
                        <span className="font-bold text-slate-800">{dq.freshness_score}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${dq.freshness_score}%` }}></div></div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase">Prediction Reliability</div>
                        <div className="text-lg font-black text-emerald-700">{dq.prediction_reliability}</div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {dq.reliability_reason}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                 <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">No data quality record found.</div>
              )}
            </div>

            {/* SPATIAL BOTTLENECK SUMMARY */}
            <div className="col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
               <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center">
                <MapIcon className="w-4 h-4 mr-2 text-rose-500" />
                SPATIAL CRITICALITY
              </h3>
              {gisData && gisData.bottlenecks.length > 0 ? (
                <div className="flex-1 flex flex-col">
                  <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-4">
                    <div className="text-xs font-bold text-rose-700 mb-1">CRITICAL BOTTLENECK DETECTED</div>
                    <div className="text-2xl font-black text-rose-900">{gisData.bottlenecks[0].blocked_length_km} km</div>
                    <div className="text-xs text-rose-800 mt-1">Contiguous blocked stretch</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500 font-semibold mb-1">Unresolved Parcels</div>
                      <div className="text-xl font-bold text-slate-800">{gisData.bottlenecks[0].affected_parcels}</div>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500 font-semibold mb-1">High Risk Parcels</div>
                      <div className="text-xl font-bold text-rose-600">{gisData.bottlenecks[0].high_risk_parcels}</div>
                    </div>
                  </div>
                  
                  <Link href="/official/gis" className="mt-4 text-center py-2 bg-slate-900 text-white rounded-lg text-sm font-bold w-full hover:bg-slate-800 transition-colors shadow-sm">
                    Open in SDSS
                  </Link>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3" />
                  <p className="font-semibold text-sm">No spatial bottlenecks detected.</p>
                </div>
              )}
            </div>
          </div>

          {/* CASES & SLA ENGINE */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-slate-500" />
                  CASE MANAGEMENT & SLA ENGINE
                </h3>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Case ID</th>
                    <th className="px-6 py-3 font-semibold">Issue Type</th>
                    <th className="px-6 py-3 font-semibold">Severity</th>
                    <th className="px-6 py-3 font-semibold">Owner</th>
                    <th className="px-6 py-3 font-semibold">SLA Status</th>
                    <th className="px-6 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cases.length > 0 ? cases.map(c => (
                    <tr key={c.case_id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-blue-600">{c.case_id}</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">{c.issue_type}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          c.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>{c.severity}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{c.owner}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-rose-600 font-bold text-xs">
                          <Clock className="w-3.5 h-3.5 mr-1.5" />
                          {c.escalation_level}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleSimulateIntervention(c)}
                          disabled={isSimulating || simulatedRisk !== null}
                          className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 disabled:opacity-50 transition-colors"
                        >
                          Simulate Intervention
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-medium">No open cases.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
                    {/* PHASE 36: RAG SIMILAR CASE ARCHITECTURE */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="p-6 border-b border-slate-200">
               <h3 className="text-sm font-bold text-slate-800 flex items-center">
                <Database className="w-4 h-4 mr-2 text-indigo-500" />
                SIMILAR HISTORICAL CASES (RAG RETRIEVAL)
              </h3>
            </div>
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
               <span className="text-xs text-slate-500 font-semibold uppercase">Querying vector database for similar compensation delays...</span>
               <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded">PROTOTYPE</span>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-slate-100">
                <li className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900 text-sm">P-0822 (Mumbai-Pune Expressway)</h4>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">94% Match</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    <strong>Context:</strong> Similar 2.5km spatial bottleneck caused by 14 pending compensation cases due to record mismatch.
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Historical Resolution:</strong> A dedicated camp was set up at the Tehsil office, clearing 100% of cases in 12 days.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          
          {/* INTERVENTIONS / AUDIT TRAIL PREVIEW */}
          {interventions.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 bg-slate-50">
                 <h3 className="text-sm font-bold text-slate-800 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-emerald-600" />
                  INTERVENTION IMPACT & AUDIT TRAIL
                </h3>
              </div>
              <div className="p-0">
                <ul className="divide-y divide-slate-100">
                  {interventions.map((inv, idx) => (
                    <li key={idx} className="p-6 flex items-start">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-4 shrink-0 mt-1">
                        <CheckSquare className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-slate-900">{inv.action_taken}</h4>
                          <span className="text-xs text-slate-500 font-medium">{new Date(inv.timestamp || '').toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">Executed by: {inv.officer} (Case: {inv.case_id})</p>
                        
                        <div className="flex items-center space-x-3 text-sm font-bold">
                          <span className="bg-rose-50 text-rose-700 px-2 py-1 rounded border border-rose-100">Risk Before: {inv.risk_before}%</span>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                          <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">Risk After: {inv.risk_after}%</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
