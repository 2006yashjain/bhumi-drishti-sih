"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, Activity, Map as MapIcon, 
  BarChart3, Lightbulb, Bell, Database, Shield, LogOut, User,
  AlertTriangle, Search, ChevronRight, CheckCircle2, ArrowRight,
  Server, Cpu, Network, Layers, FileText, Settings, Key, Code, RefreshCw
} from 'lucide-react';

import { 
  modelStatus, modelFeatures, dataQuality, dataPipeline, 
  modelConfig, stageWiseModels, modelVersions, predictionHistory, datasetVersions 
} from './data';

export default function ModelDataCenter() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>("pipeline");

  const toggleSection = (section: string) => {
    if (expandedSection === section) setExpandedSection(null);
    else setExpandedSection(section);
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
              <Link href="/official/alerts" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Bell className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm flex-1">Alerts</span>
                <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">28</span>
              </Link>
            </li>
            <li><Link href="/official/risk-engine" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Database className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Risk Engine</span></Link></li>
            <li>
              <Link href="/official/model-data" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md transition-colors">
                <Server className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Model & Data</span>
              </Link>
            </li>
            <li><Link href="/official/audit" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Shield className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Audit Trail</span></Link></li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-3"><User className="w-4 h-4" /></div>
              <div className="text-xs"><div className="font-semibold text-white">System Admin</div><div className="text-slate-500">Technical Officer</div></div>
            </div>
            <button onClick={() => { localStorage.removeItem('access_token'); localStorage.removeItem('user'); router.push('/official/login'); }} className="text-slate-500 hover:text-white transition-colors" title="Logout"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden mt-14 md:mt-0 relative">
        
        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-8 z-30 flex-shrink-0">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center">
                Model & Data Center
                <span className="ml-3 px-2 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded uppercase font-bold tracking-wider border border-slate-700">Prototype Infrastructure</span>
              </h1>
              <p className="text-sm text-slate-500">Monitor the risk intelligence pipeline, model configuration, data quality, explainability, and prediction performance.</p>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-2.5 top-2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search architecture..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 w-48" 
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center bg-slate-50 px-2 py-1 rounded border border-slate-200">
              <span className="font-semibold text-slate-500 mr-2">Model:</span>
              <span className="font-bold text-indigo-700">{modelStatus.activeModel}</span>
            </div>
            <div className="flex items-center bg-slate-50 px-2 py-1 rounded border border-slate-200">
              <span className="font-semibold text-slate-500 mr-2">Version:</span>
              <span className="font-bold text-slate-800">{modelStatus.modelVersion}</span>
            </div>
            <div className="flex items-center bg-slate-50 px-2 py-1 rounded border border-slate-200">
              <span className="font-semibold text-slate-500 mr-2">Status:</span>
              <span className="font-bold text-emerald-600 flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></div> {modelStatus.status}</span>
            </div>
            <div className="flex items-center bg-slate-50 px-2 py-1 rounded border border-slate-200">
              <span className="font-semibold text-slate-500 mr-2">Data:</span>
              <span className="font-bold text-amber-700">{modelStatus.data}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-50/50 flex flex-col gap-6">
          
          {/* KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 flex-shrink-0">
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-t-4 border-t-indigo-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Active Model</div>
              <div className="text-sm font-bold text-slate-900 truncate" title={modelStatus.activeModel}>{modelStatus.activeModel}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-t-4 border-t-slate-800">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Model Version</div>
              <div className="text-lg font-bold text-slate-900">{modelStatus.modelVersion}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-t-4 border-t-blue-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Training Records</div>
              <div className="text-xl font-bold text-blue-700">{modelStatus.trainingRecords.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-t-4 border-t-emerald-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Features Used</div>
              <div className="text-xl font-bold text-emerald-700">{modelStatus.featuresUsed}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-t-4 border-t-slate-400">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Last Evaluation</div>
              <div className="text-sm font-bold text-slate-800">{modelStatus.lastEvaluation}</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm border-t-4 border-t-amber-500">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Data Quality</div>
              <div className="text-xl font-bold text-amber-600">{modelStatus.dataQuality}%</div>
            </div>
          </div>

          {/* WARNING PANEL */}
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <span className="font-bold mr-2">READ-ONLY TECHNICAL PREVIEW:</span> 
              This interface visualizes the prototype intelligence architecture. Production deployment requires authorized ML administration service authentication. Controls to retrain, deploy, or modify the active model are disabled.
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            
            {/* MAIN COLUMN */}
            <div className="xl:w-2/3 flex flex-col gap-6">
              
              {/* MODEL PIPELINE / ARCHITECTURE */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div 
                  className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => toggleSection('pipeline')}
                >
                  <h2 className="text-sm font-bold text-slate-800 flex items-center"><Network className="w-4 h-4 mr-2 text-indigo-500" /> Risk Intelligence Architecture</h2>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${expandedSection === 'pipeline' ? 'rotate-90' : ''}`} />
                </div>
                {expandedSection === 'pipeline' && (
                  <div className="p-6 overflow-x-auto bg-slate-900 text-slate-300">
                    <div className="min-w-[800px] flex flex-col space-y-8">
                      {/* Top Track: ML Risk */}
                      <div className="flex items-center">
                        <div className="w-32 p-3 bg-slate-800 border border-slate-700 rounded text-center text-xs shadow-sm">
                          <div className="font-bold text-white mb-1">Project Data</div>
                          <div className="text-[9px] text-slate-400 uppercase">Input</div>
                        </div>
                        <div className="flex-1 h-0.5 bg-slate-700 relative"><ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" /></div>
                        
                        <div className="w-32 p-3 bg-slate-800 border border-slate-700 rounded text-center text-xs shadow-sm">
                          <div className="font-bold text-white mb-1">Feature Eng.</div>
                          <div className="text-[9px] text-blue-400 uppercase">pandas / scikit</div>
                        </div>
                        <div className="flex-1 h-0.5 bg-slate-700 relative"><ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" /></div>

                        <div className="w-32 p-3 bg-indigo-900 border border-indigo-700 rounded text-center text-xs shadow-sm ring-1 ring-indigo-500">
                          <div className="font-bold text-white mb-1">XGBoost</div>
                          <div className="text-[9px] text-indigo-300 uppercase">Classification</div>
                        </div>
                        <div className="flex-1 h-0.5 bg-slate-700 relative"><ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" /></div>

                        <div className="w-32 p-3 bg-slate-800 border border-slate-700 rounded text-center text-xs shadow-sm">
                          <div className="font-bold text-rose-400 mb-1">Delay Risk</div>
                          <div className="text-[9px] text-slate-400 uppercase">Probability</div>
                        </div>
                        <div className="w-8 h-0.5 bg-slate-700 relative"><ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" /></div>
                        
                        <div className="w-32 p-3 bg-slate-800 border border-slate-700 rounded text-center text-xs shadow-sm">
                          <div className="font-bold text-white mb-1">SHAP</div>
                          <div className="text-[9px] text-emerald-400 uppercase">Explainability</div>
                        </div>
                        <div className="w-8 h-0.5 bg-slate-700 relative"></div>
                      </div>

                      {/* Bottom Track: Survival Analysis */}
                      <div className="flex items-center relative">
                        <div className="absolute left-[344px] -top-8 w-0.5 h-8 bg-slate-700 border-l border-dashed border-slate-600"></div>
                        <div className="w-32 p-3 bg-slate-800 border border-slate-700 rounded text-center text-xs shadow-sm opacity-80 ml-[344px]">
                          <div className="font-bold text-white mb-1">Survival Analysis</div>
                          <div className="text-[9px] text-blue-400 uppercase">Time-to-Event</div>
                        </div>
                        <div className="w-[160px] h-0.5 bg-slate-700 relative opacity-80"><ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" /></div>
                        <div className="w-32 p-3 bg-slate-800 border border-slate-700 rounded text-center text-xs shadow-sm opacity-80">
                          <div className="font-bold text-amber-400 mb-1">Time Estimate</div>
                          <div className="text-[9px] text-slate-400 uppercase">Duration</div>
                        </div>
                        <div className="w-8 h-0.5 bg-slate-700 relative"></div>
                      </div>

                      {/* Merged Track */}
                      <div className="flex items-center justify-end relative">
                        <div className="absolute right-[296px] -top-24 w-0.5 h-24 bg-slate-700"></div>
                        <div className="absolute right-[296px] -top-8 w-0.5 h-8 bg-slate-700"></div>
                        <div className="w-6 h-0.5 bg-slate-700 relative"><ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" /></div>
                        
                        <div className="w-36 p-3 bg-emerald-900 border border-emerald-700 rounded text-center text-xs shadow-sm ring-1 ring-emerald-500">
                          <div className="font-bold text-white mb-1">Risk Intelligence</div>
                          <div className="text-[9px] text-emerald-300 uppercase">Unified Output</div>
                        </div>
                        <div className="w-8 h-0.5 bg-slate-700 relative"><ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" /></div>
                        
                        <div className="w-28 p-3 bg-slate-800 border border-slate-700 rounded text-center text-xs shadow-sm">
                          <div className="font-bold text-white mb-1">Alerts / Actions</div>
                          <div className="text-[9px] text-slate-400 uppercase">Operations</div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* DATA LINEAGE */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center"><Layers className="w-4 h-4 mr-2 text-blue-500" /> Prediction Data Lineage</h2>
                  <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded text-slate-500 font-bold">Selected: P-1042</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <div className="flex-1">
                      <div className="w-12 h-12 mx-auto bg-slate-100 border border-slate-300 rounded-full flex items-center justify-center mb-2"><Database className="w-5 h-5 text-slate-600" /></div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">Source</div>
                      <div className="text-xs font-bold text-slate-800">Project Record</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 hidden md:block" />
                    <div className="flex-1">
                      <div className="w-12 h-12 mx-auto bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center mb-2"><Settings className="w-5 h-5 text-blue-600" /></div>
                      <div className="text-[10px] uppercase font-bold text-blue-500">Features</div>
                      <div className="text-xs font-bold text-slate-800">12 Extracted</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 hidden md:block" />
                    <div className="flex-1">
                      <div className="w-12 h-12 mx-auto bg-indigo-50 border border-indigo-200 rounded-full flex items-center justify-center mb-2"><Cpu className="w-5 h-5 text-indigo-600" /></div>
                      <div className="text-[10px] uppercase font-bold text-indigo-500">Inference</div>
                      <div className="text-xs font-bold text-slate-800">78% Delay Risk</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 hidden md:block" />
                    <div className="flex-1">
                      <div className="w-12 h-12 mx-auto bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center mb-2"><AlertTriangle className="w-5 h-5 text-amber-600" /></div>
                      <div className="text-[10px] uppercase font-bold text-amber-500">Decision</div>
                      <div className="text-xs font-bold text-slate-800">Critical Alert</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FEATURE INVENTORY */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="text-sm font-bold text-slate-800">Model Features</h2>
                  <p className="text-xs text-slate-500">Features extracted from records to generate stage-wise predictions.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Feature</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-slate-100">
                      {modelFeatures.map((f, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-semibold text-slate-800 font-mono text-[11px]">{f.name}</td>
                          <td className="px-4 py-3 text-slate-600">{f.category}</td>
                          <td className="px-4 py-3 text-slate-500">{f.type}</td>
                          <td className="px-4 py-3 text-slate-600">{f.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PREDICTION HISTORY */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h2 className="text-sm font-bold text-slate-800">Recent Predictions</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Timestamp</th>
                        <th className="px-4 py-3">Project</th>
                        <th className="px-4 py-3">Stage</th>
                        <th className="px-4 py-3 text-center">New Risk</th>
                        <th className="px-4 py-3 text-center">Change</th>
                        <th className="px-4 py-3">Version</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-slate-100">
                      {predictionHistory.map((p, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-500">{p.timestamp}</td>
                          <td className="px-4 py-3 font-bold text-blue-600"><Link href={`/official/projects/${p.project}`} className="hover:underline">{p.project}</Link></td>
                          <td className="px-4 py-3 font-medium text-slate-700">{p.stage}</td>
                          <td className="px-4 py-3 text-center font-bold text-slate-900">{p.risk}</td>
                          <td className="px-4 py-3 text-center font-bold text-rose-500 bg-rose-50 border border-rose-100">{p.change}</td>
                          <td className="px-4 py-3 text-slate-500 font-mono text-[10px]">{p.version}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* STAGE-WISE MODELS */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="text-sm font-bold text-slate-800">Stage-wise Risk Models</h2>
                  <p className="text-xs text-slate-500">Risk is evaluated independently by lifecycle stage.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Stage Component</th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-4 py-3 text-center">Max Risk Observed</th>
                        <th className="px-4 py-3">Primary Monitoring Feature</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-slate-100">
                      {stageWiseModels.map((s, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-bold text-slate-800">{s.stage}</td>
                          <td className="px-4 py-3 text-center"><span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">{s.status}</span></td>
                          <td className="px-4 py-3 text-center font-semibold text-rose-600">{s.riskOutput}</td>
                          <td className="px-4 py-3 font-medium text-slate-600">{s.primaryFeature}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DATA PIPELINE */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleSection('dataPipeline')}>
                  <h2 className="text-sm font-bold text-slate-800 flex items-center"><Database className="w-4 h-4 mr-2 text-indigo-500" /> Data Processing Pipeline</h2>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${expandedSection === 'dataPipeline' ? 'rotate-90' : ''}`} />
                </div>
                {expandedSection === 'dataPipeline' && (
                  <div className="overflow-x-auto p-4">
                    <div className="flex items-center space-x-2">
                      {dataPipeline.map((s, i) => (
                        <React.Fragment key={i}>
                          <div className="w-40 p-3 bg-white border border-slate-200 rounded text-center text-xs shadow-sm">
                            <div className="font-bold text-slate-800 mb-1">{s.stage}</div>
                            <div className="text-[10px] text-slate-500 mb-1">{s.records.toLocaleString()} Records</div>
                            <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{s.status}</span>
                          </div>
                          {i < dataPipeline.length - 1 && <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* DATASET VERSIONS */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="text-sm font-bold text-slate-800">Dataset Versions</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Version</th>
                        <th className="px-4 py-3">Records</th>
                        <th className="px-4 py-3">Features</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Created</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-slate-100">
                      {datasetVersions.map((d, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-semibold text-slate-800 font-mono text-[11px]">{d.version}</td>
                          <td className="px-4 py-3 text-slate-600">{d.records.toLocaleString()}</td>
                          <td className="px-4 py-3 text-slate-600">{d.features}</td>
                          <td className="px-4 py-3"><span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${d.status === 'Prototype' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{d.status}</span></td>
                          <td className="px-4 py-3 text-slate-500">{d.created}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MODEL VERSIONS & CHANGE LOG */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h2 className="text-sm font-bold text-slate-800">Model Versions & Change Log</h2>
                  <Link href="/official/audit" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center">
                    View Audit History <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Version</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-slate-100">
                      {modelVersions.map((m, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-semibold text-slate-800 font-mono text-[11px]">{m.version}</td>
                          <td className="px-4 py-3 text-slate-600">{m.date}</td>
                          <td className="px-4 py-3"><span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${m.status === 'Current' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{m.status}</span></td>
                          <td className="px-4 py-3 text-slate-600">{m.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* SIDE PANEL */}
            <div className="xl:w-1/3 flex flex-col gap-6">
              
              {/* MODEL CONFIGURATION */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center"><Settings className="w-4 h-4 mr-2 text-slate-500" /> Active Model Configuration</h2>
                </div>
                <div className="p-4 text-xs space-y-3">
                  <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-500 col-span-1">Type</span>
                    <span className="font-bold text-slate-900 col-span-2">{modelConfig.type}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-500 col-span-1">Task</span>
                    <span className="font-semibold text-slate-800 col-span-2">{modelConfig.task}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-500 col-span-1">Output</span>
                    <span className="font-semibold text-slate-800 col-span-2">{modelConfig.output}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block mb-2">Prototype Hyperparameters</span>
                    <div className="bg-slate-900 text-emerald-400 p-3 rounded font-mono text-[10px] leading-relaxed">
                      n_estimators: {modelConfig.parameters.n_estimators}<br/>
                      max_depth: {modelConfig.parameters.max_depth}<br/>
                      learning_rate: {modelConfig.parameters.learning_rate}<br/>
                      subsample: {modelConfig.parameters.subsample}<br/>
                      colsample_bytree: {modelConfig.parameters.colsample_bytree}
                    </div>
                  </div>
                </div>
              </div>

              {/* DATA QUALITY */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Data Quality</h2>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">{dataQuality.status}</span>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Completeness</div>
                    <div className="text-xl font-bold text-slate-900">{dataQuality.completeness}%</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Validity</div>
                    <div className="text-xl font-bold text-emerald-600">{dataQuality.validity}%</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Duplicates</div>
                    <div className="text-xl font-bold text-amber-600">{dataQuality.duplicateRecords}%</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Missing Crit.</div>
                    <div className="text-xl font-bold text-rose-600">{dataQuality.missingCriticalFields}%</div>
                  </div>
                </div>
              </div>

              {/* MODEL EVALUATION & CONFUSION MATRIX */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center"><Activity className="w-4 h-4 mr-2 text-blue-500" /> Model Evaluation</h2>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">Illustrative Prototype Evaluation</p>
                </div>
                <div className="p-4 grid grid-cols-4 gap-2 text-center text-xs">
                  <div><div className="font-bold text-slate-900 text-lg">0.82</div><div className="text-[9px] text-slate-500 uppercase">ROC-AUC</div></div>
                  <div><div className="font-bold text-slate-900 text-lg">0.79</div><div className="text-[9px] text-slate-500 uppercase">Precision</div></div>
                  <div><div className="font-bold text-slate-900 text-lg">0.76</div><div className="text-[9px] text-slate-500 uppercase">Recall</div></div>
                  <div><div className="font-bold text-slate-900 text-lg">0.77</div><div className="text-[9px] text-slate-500 uppercase">F1 Score</div></div>
                </div>
                
                <div className="px-4 pb-4">
                  <div className="border border-slate-200 rounded overflow-hidden">
                    <div className="text-[10px] font-bold text-slate-500 uppercase bg-slate-50 p-2 border-b border-slate-200 text-center">Confusion Matrix (Prototype)</div>
                    <div className="p-3 overflow-x-auto">
                      <table className="w-full text-[10px] text-center border-collapse">
                        <thead>
                          <tr>
                            <th className="font-normal text-slate-400 p-1">Pred \ Act</th>
                            <th className="font-semibold text-slate-600 p-1">Low</th>
                            <th className="font-semibold text-slate-600 p-1">Med</th>
                            <th className="font-semibold text-slate-600 p-1">High</th>
                            <th className="font-semibold text-slate-600 p-1">Crit</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="font-semibold text-slate-600 p-1">Low</td>
                            <td className="bg-emerald-100 text-emerald-800 font-bold p-1">240</td>
                            <td className="bg-slate-50 p-1">12</td>
                            <td className="bg-slate-50 p-1">2</td>
                            <td className="bg-slate-50 p-1">0</td>
                          </tr>
                          <tr>
                            <td className="font-semibold text-slate-600 p-1">Med</td>
                            <td className="bg-slate-50 p-1">18</td>
                            <td className="bg-blue-100 text-blue-800 font-bold p-1">185</td>
                            <td className="bg-slate-50 p-1">14</td>
                            <td className="bg-slate-50 p-1">1</td>
                          </tr>
                          <tr>
                            <td className="font-semibold text-slate-600 p-1">High</td>
                            <td className="bg-slate-50 p-1">3</td>
                            <td className="bg-slate-50 p-1">22</td>
                            <td className="bg-amber-100 text-amber-800 font-bold p-1">140</td>
                            <td className="bg-slate-50 p-1">8</td>
                          </tr>
                          <tr>
                            <td className="font-semibold text-slate-600 p-1">Crit</td>
                            <td className="bg-slate-50 p-1">0</td>
                            <td className="bg-slate-50 p-1">2</td>
                            <td className="bg-slate-50 p-1">11</td>
                            <td className="bg-rose-100 text-rose-800 font-bold p-1">92</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded text-center">Tested on: Synthetic Holdout Dataset (03 Sep 2026)</div>
                </div>
              </div>

              {/* EXPLAINABILITY */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg shadow-sm p-4">
                <h2 className="text-sm font-bold text-indigo-900 flex items-center mb-1"><Lightbulb className="w-4 h-4 mr-2 text-indigo-600" /> Explainability</h2>
                <p className="text-[10px] text-indigo-700 mb-3">Feature attribution (SHAP) identifies factors contributing to predictions.</p>
                <div className="bg-white rounded border border-indigo-100 p-2 space-y-1.5 text-xs">
                  <div className="flex justify-between font-semibold text-slate-800"><span className="text-slate-500">Method</span> <span>SHAP</span></div>
                  <div className="flex justify-between font-semibold text-slate-800"><span className="text-slate-500">Target Demo</span> <span>P-1042</span></div>
                </div>
              </div>

              {/* SURVIVAL / TIME-TO-EVENT */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
                <h2 className="text-sm font-bold text-slate-800 flex items-center mb-1"><Activity className="w-4 h-4 mr-2 text-amber-500" /> Time-to-Event Intelligence</h2>
                <p className="text-[10px] text-slate-500 mb-3">A survival-analysis component is intended to estimate the expected time until completion of a stage.</p>
                <div className="bg-slate-50 rounded border border-slate-200 p-2 space-y-1.5 text-xs">
                  <div className="flex justify-between font-semibold text-slate-800"><span className="text-slate-500">Technology</span> <span>scikit-survival</span></div>
                  <div className="flex justify-between font-semibold text-slate-800 border-t border-slate-200 pt-1.5"><span className="text-slate-500">Current Stage</span> <span>Compensation</span></div>
                  <div className="flex justify-between font-semibold text-slate-800"><span className="text-slate-500">Expected Comp.</span> <span className="text-blue-600">18–26 days</span></div>
                  <div className="flex justify-between font-semibold text-slate-800"><span className="text-slate-500">Status</span> <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1 rounded uppercase">Within modeled range</span></div>
                </div>
                <div className="text-[9px] text-slate-400 mt-2 uppercase font-bold tracking-wider text-center">Prototype Estimate</div>
              </div>

              {/* FUTURE ML ARCHITECTURE */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleSection('mlArchitecture')}>
                  <h2 className="text-sm font-bold text-slate-800 flex items-center"><Layers className="w-4 h-4 mr-2 text-indigo-500" /> Production ML Architecture</h2>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${expandedSection === 'mlArchitecture' ? 'rotate-90' : ''}`} />
                </div>
                {expandedSection === 'mlArchitecture' && (
                  <div className="p-4 text-[10px] bg-slate-900 text-slate-300 font-mono overflow-x-auto">
                    <pre className="whitespace-pre-wrap leading-relaxed text-[10px]">
{`PostgreSQL (Historical Data)
  ↓
FastAPI Data Service
  ↓
Python ML Service
  ├── XGBoost (Classification)
  ├── SHAP (Explainability)
  └── scikit-survival
  ↓
MLflow (Model Registry)
  ↓
Risk API (JSON)
  ↓
React Official Portal`}
                    </pre>
                  </div>
                )}
              </div>

              {/* MLFLOW TRACKING */}
              <div className="bg-slate-900 text-white border border-slate-700 rounded-lg shadow-sm">
                <div className="p-3 border-b border-slate-700 bg-slate-800 flex justify-between items-center">
                  <h2 className="text-xs font-bold text-slate-200 flex items-center"><Code className="w-4 h-4 mr-2 text-emerald-400" /> Experiment Tracking</h2>
                  <span className="text-[9px] font-bold bg-slate-700 px-1.5 py-0.5 rounded text-slate-300">Planned Arch.</span>
                </div>
                <div className="p-3 text-[10px] space-y-2 font-mono text-slate-300">
                  <div className="flex justify-between"><span className="text-slate-500">Framework</span> <span className="text-blue-300">MLflow</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Experiment</span> <span>stage-delay-risk</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Run ID</span> <span>run-001</span></div>
                </div>
              </div>

              {/* KNOWN LIMITATIONS */}
              <div className="bg-rose-50 border border-rose-200 rounded-lg shadow-sm p-4">
                <h2 className="text-sm font-bold text-rose-800 flex items-center mb-3"><AlertTriangle className="w-4 h-4 mr-2 text-rose-600" /> Known Limitations</h2>
                <ul className="text-xs text-rose-900 space-y-2 list-disc pl-4 opacity-90">
                  <li>Prototype currently uses synthetic acquisition data.</li>
                  <li>Real-world performance requires historical government datasets.</li>
                  <li>District-level bias must be evaluated before deployment.</li>
                  <li>Predictions support officers and do not replace administrative decisions.</li>
                </ul>
              </div>

              {/* DATA GOVERNANCE */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleSection('governance')}>
                  <h2 className="text-sm font-bold text-slate-800 flex items-center"><Shield className="w-4 h-4 mr-2 text-indigo-500" /> Data Governance</h2>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${expandedSection === 'governance' ? 'rotate-90' : ''}`} />
                </div>
                {expandedSection === 'governance' && (
                  <div className="p-4 text-xs space-y-3">
                    <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-100">
                      <span className="font-semibold text-slate-500 col-span-1">Classification</span>
                      <span className="font-bold text-slate-900 col-span-2">Government Operational Data</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-100">
                      <span className="font-semibold text-slate-500 col-span-1">Prototype</span>
                      <span className="font-bold text-amber-600 col-span-2">Synthetic Data Only</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500 block mb-2">Production Requirements (Planned)</span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">RBAC</span>
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">Encryption</span>
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">Audit Logging</span>
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">Data Lineage</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* MODEL CARD */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleSection('modelCard')}>
                  <h2 className="text-sm font-bold text-slate-800 flex items-center"><FileText className="w-4 h-4 mr-2 text-indigo-500" /> Model Card</h2>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${expandedSection === 'modelCard' ? 'rotate-90' : ''}`} />
                </div>
                {expandedSection === 'modelCard' && (
                  <div className="p-4 text-xs space-y-3">
                    <div>
                      <span className="font-bold text-slate-800 block">Purpose</span>
                      <span className="text-slate-600 block mt-0.5 leading-relaxed">Estimate stage-specific delay risk in land acquisition projects.</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Prediction Target</span>
                      <span className="text-slate-600 block mt-0.5 leading-relaxed">Probability of delay at lifecycle stage.</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Intended Users</span>
                      <span className="text-slate-600 block mt-0.5 leading-relaxed">Authorized project, district, and state officials.</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Decision Role</span>
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded border border-emerald-100 inline-block mt-1">Decision support only</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
