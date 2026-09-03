/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Polygon, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ProjectGISData } from '@/services/api/gisApi';

// Fix for default marker icon in leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper to update map view based on GeoJSON bounds
function MapUpdater({ gisData, selectedParcelId }: { gisData: ProjectGISData, selectedParcelId: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedParcelId) {
      const parcel = gisData.parcels.find(p => p.parcel_id === selectedParcelId);
      if (parcel && parcel.geometry) {
        try {
          const geojson = JSON.parse(parcel.geometry);
          const layer = L.geoJSON(geojson);
          map.fitBounds(layer.getBounds(), { padding: [20, 20], maxZoom: 16 });
        } catch (e) {}
      }
    } else if (gisData.corridor && gisData.corridor.geometry) {
      try {
        const geojson = JSON.parse(gisData.corridor.geometry);
        const layer = L.geoJSON(geojson);
        map.fitBounds(layer.getBounds(), { padding: [50, 50], maxZoom: 14 });
      } catch (e) {
        console.error("Invalid geometry", e);
      }
    }
  }, [gisData, selectedParcelId, map]);
  return null;
}

export default function MapComponent({ 
  gisData, 
  selectedParcelId, 
  onSelectParcel 
}: { 
  gisData: ProjectGISData; 
  selectedParcelId: string | null; 
  onSelectParcel: (id: string | null) => void;
}) {
  
  const getParcelColor = (status: string) => {
    switch(status) {
      case 'ACQUIRED': return '#10b981'; // emerald-500
      case 'UNDER PROCESS': return '#f59e0b'; // amber-500
      case 'COMPENSATION PENDING': return '#f97316'; // orange-500
      case 'LEGAL / OWNERSHIP ISSUE': return '#e11d48'; // rose-600
      case 'NOT ACQUIRED': return '#64748b'; // slate-500
      default: return '#3b82f6';
    }
  };

  const parseGeometry = (geomString: string) => {
    try {
      const parsed = JSON.parse(geomString);
      // Leaflet uses [lat, lng], GeoJSON uses [lng, lat]
      // We must swap coordinates for Polyline/Polygon rendering
      
      const swapCoords = (coords: any[]): any[] => {
        if (typeof coords[0] === 'number') {
          return [coords[1], coords[0]]; // [lat, lng]
        }
        return coords.map(c => swapCoords(c as any[]));
      };

      return swapCoords(parsed.coordinates);
    } catch {
      return null;
    }
  };

  const corridorCoords = gisData.corridor?.geometry ? parseGeometry(gisData.corridor.geometry) : null;
  
  return (
    <MapContainer 
      center={[26.9, 75.7]} 
      zoom={10} 
      style={{ height: '100%', width: '100%', zIndex: 10 }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater gisData={gisData} selectedParcelId={selectedParcelId} />
      
      {/* 1. Project Corridor */}
      {corridorCoords && (
        <Polyline 
          positions={corridorCoords}
          pathOptions={{ color: '#3b82f6', weight: 6, opacity: 0.5, dashArray: '10, 10' }}
        />
      )}

      {/* 2. Bottlenecks */}
      {gisData.bottlenecks.map(b => {
        const coords = parseGeometry(b.geometry);
        if (!coords) return null;
        return (
          <Polyline 
            key={b.bottleneck_id}
            positions={coords}
            pathOptions={{ color: '#e11d48', weight: 8, opacity: 0.8 }}
          />
        );
      })}

      {/* 3. Parcels */}
      {gisData.parcels.map(p => {
        const coords = parseGeometry(p.geometry);
        if (!coords) return null;
        const isSelected = selectedParcelId === p.parcel_id;
        return (
          <Polygon 
            key={p.parcel_id}
            positions={coords}
            eventHandlers={{
              click: () => onSelectParcel(p.parcel_id)
            }}
            pathOptions={{ 
              color: isSelected ? '#3b82f6' : getParcelColor(p.acquisition_status),
              fillColor: getParcelColor(p.acquisition_status),
              fillOpacity: isSelected ? 0.8 : 0.6,
              weight: isSelected ? 4 : 2
            }}
          >
            <Popup className="custom-popup">
              <div className="bg-white">
                <div className="bg-slate-50 border-b border-slate-100 p-3">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Parcel</div>
                  <div className="font-bold text-slate-900 text-sm">{p.parcel_id}</div>
                </div>
                <div className="p-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status</span>
                    <span className="font-bold" style={{ color: getParcelColor(p.acquisition_status) }}>{p.acquisition_status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Area</span>
                    <span className="font-medium text-slate-800">{p.area_hectares} ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Risk Score</span>
                    <span className={`font-bold ${p.risk_level === 'CRITICAL' ? 'text-rose-600' : 'text-slate-800'}`}>{p.risk_score}% ({p.risk_level})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Spatial Criticality</span>
                    <span className="font-bold text-slate-800">{p.spatial_criticality}</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border-t border-slate-100">
                  <button className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-1.5 rounded transition-colors text-xs">
                    Why Risky? (Prototype)
                  </button>
                </div>
              </div>
            </Popup>
          </Polygon>
        );
      })}

    </MapContainer>
  );
}
