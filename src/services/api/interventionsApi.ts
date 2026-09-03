import { apiClient } from './client';

export interface Intervention {
  project_code: string;
  case_id: string | null;
  action_taken: string;
  officer: string;
  risk_before: number;
  risk_after: number;
  status: string;
  timestamp?: string;
}

export const interventionsApi = {
  create: (data: Partial<Intervention>): Promise<Intervention> => apiClient.post('/interventions/', data),
  getByProject: (projectCode: string): Promise<Intervention[]> => apiClient.get(`/interventions/project/${projectCode}`),
};
