"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, MapPin, Calendar, Clock, Download, FileText, CheckCircle2, Circle, HelpCircle, Activity, AlertCircle } from 'lucide-react';
import { publicProjects } from '../../data';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function PublicProjectDetail({ params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = use(params);
  const project = publicProjects.find(p => p.projectId === resolvedParams.projectId);

  if (!project) {
    return notFound();
  }

  // Create standard leaflet icon for the map marker
  const icon = typeof window !== 'undefined' ? new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* BREADCRUMB & BACK */}
      <div className="mb-6">
        <Link href="/public#search" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Search
        </Link>
      </div>

      {/* HEADER */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 md:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider px-3 py-1 border-b border-l border-slate-200 rounded-bl">
          Public Information Prototype
        </div>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded border border-indigo-200">{project.projectId}</span>
              <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                project.publicStatus === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
              }`}>
                {project.publicStatus}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">{project.projectName}</h1>
            <div className="flex items-center text-slate-600 font-medium">
              <MapPin className="w-4 h-4 mr-1.5" />
              {project.village && `${project.village}, `}{project.district}, {project.state}
            </div>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 md:w-64 shrink-0">
            <div className="text-sm font-bold text-slate-700 mb-1">Overall Progress</div>
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-bold text-indigo-700 leading-none">{project.publicProgress}%</span>
              <span className="text-xs font-medium text-slate-500">Last Update: {project.lastPublicUpdate}</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${project.publicProgress}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Project Type</div>
            <div className="font-medium text-slate-900">{project.projectType}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Land Area</div>
            <div className="font-medium text-slate-900">{project.landArea}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Affected Families</div>
            <div className="font-medium text-slate-900">{project.affectedFamilies}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Acquisition Start</div>
            <div className="font-medium text-slate-900">{project.acquisitionStart}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* CURRENT STATUS */}
          <section className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-indigo-600" /> Current Project Status
            </h2>
            <div className="bg-indigo-50 border border-indigo-100 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-indigo-900">Current Stage:</span>
                <span className="font-bold text-indigo-700 bg-white px-2 py-1 rounded border border-indigo-200 text-sm">{project.currentStage}</span>
              </div>
              <p className="text-sm text-indigo-800 leading-relaxed">
                The project is currently in the <strong>{project.currentStage}</strong> stage. Activities corresponding to this phase are underway. Please refer to the latest public notices or the project timeline for more details.
              </p>
            </div>
          </section>

          {/* TIMELINE */}
          <section className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-indigo-600" /> Public Acquisition Timeline
            </h2>
            <div className="relative">
              {/* Vertical line connecting nodes */}
              <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-200 z-0"></div>
              
              <div className="space-y-6 relative z-10">
                {project.timeline.map((item, index) => {
                  let Icon = HelpCircle;
                  let iconColor = "text-slate-400";
                  let bgColor = "bg-white border-slate-300";
                  let textColor = "text-slate-500";
                  
                  if (item.status === 'Completed') {
                    Icon = CheckCircle2;
                    iconColor = "text-emerald-500";
                    bgColor = "bg-white border-white";
                    textColor = "text-slate-800";
                  } else if (item.status === 'In Progress') {
                    Icon = Clock;
                    iconColor = "text-indigo-600";
                    bgColor = "bg-indigo-50 border-indigo-200";
                    textColor = "text-indigo-900";
                  } else if (item.status === 'Upcoming') {
                    Icon = Circle;
                    iconColor = "text-slate-300";
                    bgColor = "bg-white border-slate-200";
                    textColor = "text-slate-500";
                  }

                  return (
                    <div key={index} className="flex gap-4">
                      <div className={`mt-1 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${bgColor} bg-white relative z-10`}>
                        <Icon className={`w-5 h-5 ${iconColor} bg-white rounded-full`} />
                      </div>
                      <div className={`flex-1 border rounded-lg p-4 ${item.status === 'In Progress' ? 'border-indigo-200 bg-indigo-50' : 'border-slate-200 bg-white shadow-sm'}`}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                          <h3 className={`font-bold ${textColor}`}>{item.stage}</h3>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mt-2 sm:mt-0 ${
                            item.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                            item.status === 'In Progress' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-slate-100 text-slate-500'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        {item.date && item.date !== 'Pending' && item.date !== 'Ongoing' && (
                          <div className="text-xs font-medium text-slate-500 mt-1">Date: {item.date}</div>
                        )}
                        {item.status === 'In Progress' && (
                          <div className="text-xs text-indigo-700 mt-2 font-medium">Currently active phase. Information is being processed.</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* PUBLIC GIS */}
          <section className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-indigo-600" /> Project Location (Public GIS)
              </h2>
            </div>
            <div className="h-[400px] w-full bg-slate-100 relative z-0">
              <MapContainer 
                center={[project.latitude, project.longitude]} 
                zoom={12} 
                scrollWheelZoom={false} 
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {icon && (
                  <Marker position={[project.latitude, project.longitude]} icon={icon}>
                    <Popup>
                      <div className="font-bold text-sm">{project.projectName}</div>
                      <div className="text-xs text-slate-600">{project.district}, {project.state}</div>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 text-center font-medium">
              Map illustrates approximate public project area. Detailed alignment plans are available in official notifications.
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          
          {/* DOCUMENTS */}
          <section className="bg-white border border-slate-200 rounded-lg shadow-sm">
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" /> Public Documents
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              {project.documents.length > 0 ? (
                project.documents.map((doc, i) => (
                  <div key={i} className="p-5 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{doc.type}</span>
                      <span className="text-xs font-medium text-slate-400">{doc.published}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 mb-3 leading-snug">{doc.title}</h3>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold py-1.5 px-3 rounded flex justify-center items-center transition-colors">
                        View
                      </button>
                      <button className="flex-1 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 text-xs font-bold py-1.5 px-3 rounded flex justify-center items-center transition-colors">
                        <Download className="w-3.5 h-3.5 mr-1.5" /> Download
                      </button>
                    </div>
                    <div className="text-[9px] text-center text-slate-400 mt-2 font-medium italic">Prototype Document</div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500 text-sm font-medium">
                  No public documents are currently available for this project.
                </div>
              )}
            </div>
          </section>

          {/* HELP WIDGET */}
          <section className="bg-indigo-900 text-white rounded-lg shadow-sm p-6 text-center">
            <AlertCircle className="w-8 h-8 mx-auto text-indigo-300 mb-3" />
            <h3 className="font-bold mb-2">Have a question or grievance?</h3>
            <p className="text-indigo-200 text-sm mb-4">
              If you are affected by this project and need assistance, you can file a formal grievance through our portal.
            </p>
            <Link href={`/public/grievance?project=${project.projectId}`} className="inline-block bg-white text-indigo-900 font-bold text-sm px-6 py-2.5 rounded hover:bg-slate-100 transition-colors shadow-sm">
              Raise a Grievance
            </Link>
          </section>

        </div>
      </div>
    </div>
  );
}
