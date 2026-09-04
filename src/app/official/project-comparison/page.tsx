"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, LayoutDashboard, Briefcase, Activity, Map as MapIcon, 
  BarChart3, Lightbulb, Bell, Database, Shield, Server,
  AlertTriangle, TrendingUp, CheckCircle2, ChevronDown, CheckSquare, Clock
} from 'lucide-react';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip as RechartsTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

// Mock data for comparison
const compareData = [
  {
    id: "P-1042",
    name: "NH-48 Expansion",
    risk: 78,
    trend: "RAPIDLY INCREASING",
    stage: "Compensation",
    bottlenecks: 1,
    cases: 3,
    land: 42,
    legal: 58,
    compensation: 91,
    rr: 74,
    admin: 63,
    financial: 47,
    spatial: 69
  },
  {
    id: "P-2089",
    name: "Delhi-Mumbai Corridor (Sec 4)",
    risk: 42,
    trend: "STABLE",
    stage: "Land Records",
    bottlenecks: 0,
    cases: 1,
    land: 82,
    legal: 41,
    compensation: 33,
    rr: 21,
    admin: 55,
    financial: 39,
    spatial: 42
  }
];

const radarData = [
  { subject: 'Land Record', P1042: 42, P2089: 82 },
  { subject: 'Legal/Dispute', P1042: 58, P2089: 41 },
  { subject: 'Compensation', P1042: 91, P2089: 33 },
  { subject: 'R&R', P1042: 74, P2089: 21 },
  { subject: 'Admin/Process', P1042: 63, P2089: 55 },
  { subject: 'Financial', P1042: 47, P2089: 39 },
  { subject: 'Spatial/Impact', P1042: 69, P2089: 42 },
];

export default function ProjectComparison() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
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
            <li><Link href="/official/project-comparison" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md transition-colors"><Activity className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Compare Projects</span></Link></li>
            <li><Link href="/official/gis" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><MapIcon className="w-5 h-5 mr-3" /><span className="font-medium text-sm">GIS Intelligence</span></Link></li>
            <li><Link href="/official/district-analytics" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><BarChart3 className="w-5 h-5 mr-3" /><span className="font-medium text-sm">District Analytics</span></Link></li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto mt-14 md:mt-0 relative bg-slate-50">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6 sticky top-0 z-30">
          <h2 className="text-lg font-bold text-slate-800">Project Comparison (Phase 11)</h2>
        </header>

        <main className="p-6 max-w-7xl mx-auto w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {compareData.map(p => (
              <div key={p.id} className={`bg-white rounded-xl shadow-sm border p-6 ${p.risk > 70 ? 'border-rose-200 bg-rose-50/30' : 'border-slate-200'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{p.id}</h3>
                    <p className="text-xs text-slate-500">{p.name}</p>
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-semibold border border-slate-200">{p.stage}</span>
                </div>
                
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Delay Risk</div>
                    <div className={`text-4xl font-black ${p.risk > 70 ? 'text-rose-600' : 'text-slate-700'}`}>{p.risk}%</div>
                  </div>
                  <div className={`text-xs font-bold px-2 py-1 rounded ${p.trend === 'RAPIDLY INCREASING' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    <TrendingUp className="w-3 h-3 inline mr-1" /> {p.trend}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div>
                    <div className="text-xs text-slate-500 font-semibold mb-1">Critical Bottlenecks</div>
                    <div className={`text-lg font-bold ${p.bottlenecks > 0 ? 'text-rose-600' : 'text-slate-700'}`}>{p.bottlenecks}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold mb-1">Open Cases</div>
                    <div className="text-lg font-bold text-slate-700">{p.cases}</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <Link href={`/official/projects/${p.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                    View Project Detail &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h3 className="text-sm font-bold text-slate-800 mb-6">7-DIMENSIONAL RISK COMPARISON</h3>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
                  <Radar name="P-1042 (NH-48)" dataKey="P1042" stroke="#ef4444" strokeWidth={2} fill="#ef4444" fillOpacity={0.4} />
                  <Radar name="P-2089 (Delhi-Mumbai)" dataKey="P2089" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.4} />
                  <Legend />
                  <RechartsTooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
}
