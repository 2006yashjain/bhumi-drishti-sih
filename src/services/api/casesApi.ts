import { apiClient } from './client';

export interface Case {
  case_id: string;
  project_code: string;
  parcel_id: string | null;
  issue_type: string;
  severity: string;
  owner: string;
  status: string;
  escalation_level: string;
  notes: string | null;
  resolution: string | null;
  due_date: string;
  created_at: string;
}

export const casesApi = {
  getAll: (): Promise<Case[]> => apiClient.get('/cases/'),
  getByProject: (projectCode: string): Promise<Case[]> => apiClient.get(`/cases/project/${projectCode}`),
};
