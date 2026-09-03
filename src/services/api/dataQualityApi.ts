import { apiClient } from './client';

export interface DataQuality {
  project_code: string;
  completeness_score: number;
  freshness_score: number;
  validity_score: number;
  overall_status: string;
  critical_missing_fields: string;
  prediction_reliability: string;
  reliability_reason: string;
  last_validated: string;
}

export const dataQualityApi = {
  getByProject: (projectCode: string): Promise<DataQuality> => apiClient.get(`/data-quality/${projectCode}`),
};
