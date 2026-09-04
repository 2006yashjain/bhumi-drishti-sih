/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, Activity, Map as MapIcon, 
  BarChart3, Lightbulb, Bell, Database, Shield, LogOut, User,
  AlertTriangle, CheckCircle2, TrendingUp, Info, ChevronRight,
  Server, Cpu, Database as DatabaseIcon, Network, Clock, Settings
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';

import { 
  modelMetadata, demoProjectInput, stageWisePredictions, riskTrajectory, 
  currentPrediction, predictionDrivers, explanation, timeToEvent, predictionHistory 
} from './data';

export default function RiskEngine() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
            <li><Link href="/official/dashboard" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><LayoutDashboard className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Overview</span></Link></li>
            <li><Link href="/official/projects" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Briefcase className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Project Portfolio</span></Link></li>
            <li><Link href="/official/project-comparison" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Activity className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Compare Projects</span></Link></li>
            <li><Link href="/official/risk-monitor" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Activity className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Risk Monitor</span></Link></li>
            <li><Link href="/official/gis" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><MapIcon className="w-5 h-5 mr-3" /><span className="font-medium text-sm">GIS Intelligence</span></Link></li>
            <li><Link href="/official/district-analytics" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><BarChart3 className="w-5 h-5 mr-3" /><span className="font-medium text-sm">District Analytics</span></Link></li>
            <li><Link href="/official/recommendations" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Lightbulb className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Recommendations</span></Link></li>
            <li><Link href="/official/alerts" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Bell className="w-5 h-5 mr-3" /><span className="font-medium text-sm flex-1">Alerts</span><span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">28</span></Link></li>
            <li>
              <Link href="/official/risk-engine" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md transition-colors">
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
            <li><Link href="/official/audit" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Shield className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Audit Trail</span></Link></li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-800 bg-slate-900 mt-auto">
          <Link href="/" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden mt-14 md:mt-0">
        
        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-200 py-6 px-6 md:px-8 z-30">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Delay Risk Engine</h1>
            <p className="text-sm text-slate-500">Stage-wise prediction and model intelligence for land acquisition projects</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-50/50 space-y-6">
          
          {/* MODEL STATUS */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="text-xs font-semibold text-amber-600 mb-1 tracking-wider uppercase flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1.5" /> PROTOTYPE MODEL
              </div>
              <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-indigo-600" />
                Bhumi Drishti Risk Engine <span className="ml-3 px-2 py-0.5 text-xs bg-emerald-100 text-emerald-700 rounded-full font-bold border border-emerald-200">Operational</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 w-full lg:w-auto text-sm">
              <div>
                <span className="block text-xs text-slate-500 mb-1 uppercase font-semibold">Model Type</span>
                <span className="font-semibold text-slate-800">{modelMetadata.modelType}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-500 mb-1 uppercase font-semibold">Explainability</span>
                <span className="font-semibold text-slate-800">{modelMetadata.explainability}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-500 mb-1 uppercase font-semibold">Prediction Mode</span>
                <span className="font-semibold text-slate-800">{modelMetadata.predictionMode}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* LEFT COLUMN */}
            <div className="xl:col-span-1 space-y-6">
              
              {/* PREDICTION INPUT */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-lg">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center">
                    <DatabaseIcon className="w-4 h-4 mr-2 text-slate-500" /> Prediction Input Features
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-500">Project ID</span>
                    <span className="text-sm font-bold text-blue-600">{demoProjectInput.projectId}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-500">Current Stage</span>
                    <span className="text-sm font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{demoProjectInput.currentStage}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Project Type</label>
                      <div className="text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded px-2 py-1.5">{demoProjectInput.projectType}</div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Land Area</label>
                      <div className="text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded px-2 py-1.5">{demoProjectInput.landArea}</div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Affected Families</label>
                      <div className="text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded px-2 py-1.5">{demoProjectInput.affectedFamilies}</div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Legal Disputes</label>
                      <div className="text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded px-2 py-1.5">{demoProjectInput.legalDisputes}</div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Compensation Status</label>
                      <div className="text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded px-2 py-1.5 border-l-2 border-l-rose-500">{demoProjectInput.compensationStatus}</div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">R&R Progress</label>
                      <div className="text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded px-2 py-1.5">{demoProjectInput.rrProgress}</div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Stakeholder Resp.</label>
                      <div className="text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded px-2 py-1.5">{demoProjectInput.stakeholderResponsiveness}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MODEL OUTPUT CARD */}
              <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-sm p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Model-Estimated Delay Probability</h3>
                <div className="flex items-end mb-4">
                  <span className="text-6xl font-bold text-white leading-none">{currentPrediction.riskProbability}%</span>
                </div>
                <div className="inline-block bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
                  {currentPrediction.category}
                </div>
                
                <div className="space-y-3 pt-5 border-t border-slate-700">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Current Stage:</span>
                    <span className="font-semibold text-slate-200">{currentPrediction.stage}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Prediction Timestamp:</span>
                    <span className="font-semibold text-slate-200">{currentPrediction.timestamp}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Prediction Status:</span>
                    <span className="font-semibold text-emerald-400 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> {currentPrediction.status}</span>
                  </div>
                </div>
              </div>
              
              {/* TIME TO EVENT */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-indigo-500" /> Estimated Time-to-Event
                  </h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Prototype Output</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Expected stage completion window:</div>
                    <div className="text-lg font-bold text-slate-900">{timeToEvent.window}</div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex justify-between">
                    <div>
                      <div className="text-xs text-slate-500">Risk of exceeding timeline:</div>
                      <div className="text-sm font-bold text-rose-600">{timeToEvent.risk}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Model:</div>
                      <div className="text-sm font-medium text-slate-800">{timeToEvent.model}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* STAGE-WISE PREDICTION & TRAJECTORY */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
                {/* Stages List */}
                <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 p-5 bg-slate-50/50">
                  <h3 className="text-sm font-bold text-slate-800 mb-4">Stage-wise Delay Risk</h3>
                  <div className="space-y-3">
                    {stageWisePredictions.map((stage, idx) => (
                      <div key={idx} className={`flex justify-between items-center p-2 rounded ${stage.isCurrent ? 'bg-rose-50 border border-rose-100' : ''}`}>
                        <div className={`text-xs font-semibold ${stage.isCurrent ? 'text-rose-700' : 'text-slate-600'}`}>
                          {stage.stage} {stage.isCurrent && <span className="ml-1 text-[9px] uppercase tracking-wider bg-rose-200 text-rose-800 px-1 py-0.5 rounded">Current</span>}
                        </div>
                        <div className={`text-sm font-bold ${stage.isCurrent ? 'text-rose-700' : 'text-slate-900'}`}>
                          {stage.risk}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Trajectory Chart */}
                <div className="md:w-2/3 p-5 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-rose-500" /> Risk Trajectory
                    </h3>
                    <div className="text-xs font-bold text-rose-600 flex items-center bg-rose-50 px-2 py-1 rounded">
                      Change: +{currentPrediction.change} pp <TrendingUp className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                  <div className="flex-1 min-h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={riskTrajectory} margin={{ top: 10, right: 20, left: -20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="stage" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fill: '#64748b' }} 
                          dy={10} 
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 11, fill: '#64748b' }} 
                          domain={[0, 100]}
                        />
                        <RechartsTooltip 
                          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                          labelStyle={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}
                          formatter={(value: any) => [`${value}%`, `Risk`]}
                        />
                        <ReferenceLine x="Compensation (Current)" stroke="#e11d48" strokeDasharray="3 3" />
                        <Line 
                          type="monotone" 
                          dataKey="val" 
                          stroke="#e11d48" 
                          strokeWidth={3} 
                          dot={{ r: 4, fill: "#e11d48", stroke: "#fff", strokeWidth: 2 }}
                          activeDot={{ r: 6, fill: "#e11d48", stroke: "#fff", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* SHAP EXPLANATION */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-lg">
                  <h3 className="text-sm font-bold text-slate-800">Prediction Drivers</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">SHAP Attribution</span>
                </div>
                
                <div className="p-5 flex flex-col md:flex-row gap-8">
                  {/* Explanation text */}
                  <div className="md:w-1/3 flex flex-col">
                    <h4 className="text-sm font-bold text-slate-900 mb-2">Why is the current risk HIGH?</h4>
                    <p className="text-xs text-slate-600 mb-6 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
                      "{explanation.text}"
                    </p>
                    <div className="mt-auto">
                      <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Primary Driver</div>
                      <div className="text-sm font-bold text-rose-700 bg-rose-50 px-3 py-2 border border-rose-100 rounded">
                        {explanation.primaryDriver}
                        <div className="text-xs font-semibold mt-0.5 text-rose-600">Contribution: +{explanation.primaryContribution} pp</div>
                      </div>
                    </div>
                  </div>

                  {/* SHAP Chart */}
                  <div className="md:w-2/3 flex flex-col justify-center">
                    <div className="text-[10px] text-slate-500 mb-4 flex gap-4">
                      <span className="flex items-center"><div className="w-2 h-2 bg-rose-500 mr-1.5 rounded-full"></div> Positive: increases risk</span>
                      <span className="flex items-center"><div className="w-2 h-2 bg-emerald-500 mr-1.5 rounded-full"></div> Negative: decreases risk</span>
                    </div>
                    
                    <div className="space-y-3">
                      {predictionDrivers.map((driver, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-2/5 pr-3 text-right text-xs font-semibold text-slate-700 truncate">
                            {driver.feature}
                          </div>
                          <div className="w-3/5 flex items-center relative py-1">
                            {/* 0 center line */}
                            <div className="h-full w-px bg-slate-300 absolute left-1/4"></div>
                            
                            {driver.direction === 'positive' ? (
                              <div className="flex items-center w-full relative z-10 ml-[25%]">
                                <div className="bg-rose-500 h-5 rounded-r shadow-sm" style={{ width: `${(driver.contribution / 30) * 100}%`, minWidth: '4px' }}></div>
                                <span className="ml-2 text-[10px] font-bold text-rose-600">+{driver.contribution} pp</span>
                              </div>
                            ) : (
                              <div className="flex items-center w-full relative z-10">
                                <div className="absolute right-[75%] flex items-center justify-end">
                                  <span className="mr-2 text-[10px] font-bold text-emerald-600">{driver.contribution} pp</span>
                                  <div className="bg-emerald-500 h-5 rounded-l shadow-sm" style={{ width: `${(Math.abs(driver.contribution) / 30) * 100}%`, minWidth: '4px' }}></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* MODEL PIPELINE & METADATA ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* TECHNICAL PIPELINE */}
            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-lg shadow-sm p-5">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
                <Network className="w-4 h-4 mr-2 text-indigo-600" /> Model Architecture Pipeline
              </h3>
              
              <div className="flex items-center justify-between overflow-x-auto pb-4 pt-2 px-2">
                <div className="flex flex-col items-center flex-shrink-0 w-24">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-300 text-slate-600 mb-2 shadow-sm"><DatabaseIcon className="w-5 h-5"/></div>
                  <div className="text-[9px] font-bold text-center uppercase tracking-wider text-slate-600 leading-tight">Historical<br/>Records</div>
                </div>
                <div className="w-8 h-px bg-slate-300 mx-2 flex-shrink-0 relative"><div className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-slate-300 transform rotate-45"></div></div>
                
                <div className="flex flex-col items-center flex-shrink-0 w-24">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-300 text-slate-600 mb-2 shadow-sm"><Settings className="w-5 h-5"/></div>
                  <div className="text-[9px] font-bold text-center uppercase tracking-wider text-slate-600 leading-tight">Feature<br/>Engineering</div>
                </div>
                <div className="w-8 h-px bg-slate-300 mx-2 flex-shrink-0 relative"><div className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-slate-300 transform rotate-45"></div></div>
                
                <div className="flex flex-col items-center flex-shrink-0 w-28">
                  <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center border-2 border-indigo-200 text-indigo-600 mb-2 shadow-sm"><Cpu className="w-6 h-6"/></div>
                  <div className="text-[10px] font-bold text-center uppercase tracking-wider text-indigo-700 leading-tight">XGBoost<br/>Risk Model</div>
                </div>
                <div className="w-8 h-px bg-slate-300 mx-2 flex-shrink-0 relative"><div className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-slate-300 transform rotate-45"></div></div>
                
                <div className="flex flex-col items-center flex-shrink-0 w-24">
                  <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center border border-rose-200 text-rose-600 mb-2 shadow-sm"><Activity className="w-5 h-5"/></div>
                  <div className="text-[9px] font-bold text-center uppercase tracking-wider text-rose-700 leading-tight">Stage-wise<br/>Risk Prob</div>
                </div>
                <div className="w-8 h-px bg-slate-300 mx-2 flex-shrink-0 relative"><div className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-slate-300 transform rotate-45"></div></div>
                
                <div className="flex flex-col items-center flex-shrink-0 w-24">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-200 text-blue-600 mb-2 shadow-sm"><Server className="w-5 h-5"/></div>
                  <div className="text-[9px] font-bold text-center uppercase tracking-wider text-blue-700 leading-tight">SHAP<br/>Explanation</div>
                </div>
                <div className="w-8 h-px bg-slate-300 mx-2 flex-shrink-0 relative"><div className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-slate-300 transform rotate-45"></div></div>
                
                <div className="flex flex-col items-center flex-shrink-0 w-24">
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-200 text-amber-600 mb-2 shadow-sm"><Clock className="w-5 h-5"/></div>
                  <div className="text-[9px] font-bold text-center uppercase tracking-wider text-amber-700 leading-tight">Survival<br/>Model</div>
                </div>
                <div className="w-8 h-px bg-slate-300 mx-2 flex-shrink-0 relative"><div className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-slate-300 transform rotate-45"></div></div>
                
                <div className="flex flex-col items-center flex-shrink-0 w-24">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-200 text-emerald-600 mb-2 shadow-sm"><Lightbulb className="w-5 h-5"/></div>
                  <div className="text-[9px] font-bold text-center uppercase tracking-wider text-emerald-700 leading-tight">Corrective<br/>Action</div>
                </div>
              </div>
            </div>

            {/* MODEL METADATA & MANAGEMENT */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-sm p-5 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Model Management</h3>
                <ul className="space-y-3 text-xs mb-6">
                  <li className="flex justify-between"><span className="text-slate-500">Training Data:</span> <span className="font-semibold text-slate-300 text-right">Synthetic Records</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Exp Tracking:</span> <span className="font-semibold text-slate-300">{modelMetadata.experimentTracking}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Survival Analys:</span> <span className="font-semibold text-slate-300">scikit-survival</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Current Ver:</span> <span className="font-mono text-emerald-400">{modelMetadata.modelVersion}</span></li>
                </ul>
              </div>
              <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 text-xs font-semibold rounded transition-colors flex justify-center items-center">
                Model Management <ChevronRight className="w-3 h-3 ml-1" />
              </button>
            </div>
            
          </div>

          {/* PREDICTION HISTORY */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-800">Prediction History</h3>
              <div className="text-xs text-slate-500">Filtered by: Project P-1042</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-5 py-3">Timestamp</th>
                    <th className="px-5 py-3">Stage</th>
                    <th className="px-5 py-3 text-center">Risk</th>
                    <th className="px-5 py-3 text-center">Change</th>
                    <th className="px-5 py-3">Primary Driver</th>
                    <th className="px-5 py-3">Model Version</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {predictionHistory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3 text-slate-600 text-xs font-medium">{item.timestamp}</td>
                      <td className="px-5 py-3 text-slate-800 font-semibold">{item.stage}</td>
                      <td className="px-5 py-3 text-center font-bold text-rose-600">{item.risk}%</td>
                      <td className="px-5 py-3 text-center text-xs font-bold text-rose-500">{item.change}</td>
                      <td className="px-5 py-3 text-slate-600 text-xs">{item.driver}</td>
                      <td className="px-5 py-3 text-slate-500 font-mono text-[10px]">{item.version}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
