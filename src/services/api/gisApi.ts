import { apiClient } from './client';

export interface Corridor {
  total_length_km: number;
  acquired_length_km: number;
  pending_length_km: number;
  geometry: string;
}

export interface Parcel {
  parcel_id: string;
  area_hectares: number;
  acquisition_status: string;
  compensation_status: string;
  legal_status: string;
  acquisition_duration_months: number;
  affected_parties: number;
  risk_score: number;
  risk_level: string;
  spatial_criticality: string;
  geometry: string;
}

export interface Bottleneck {
  bottleneck_id: string;
  blocked_length_km: number;
  affected_parcels: number;
  high_risk_parcels: number;
  spatial_criticality: string;
  continuity_blocked: boolean;
  status: string;
  geometry: string;
}

export interface ProjectGISData {
  project: {
    project_code: string;
    project_name: string;
    current_stage: string;
    district: string;
    state: string;
  };
  corridor: Corridor;
  parcels: Parcel[];
  bottlenecks: Bottleneck[];
}

export interface ProjectSummary {
  project_code: string;
  project_name: string;
  current_stage: string;
  district: string;
  state: string;
  has_bottlenecks: boolean;
  bottleneck_count: number;
}

export const gisApi = {
  getProjects: (): Promise<ProjectSummary[]> => apiClient.get('/gis/projects'),
  getProjectGIS: (projectCode: string): Promise<ProjectGISData> => 
    apiClient.get(`/gis/projects/${projectCode}`)
};
