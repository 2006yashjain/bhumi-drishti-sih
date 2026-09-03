import { apiClient } from './client';

export const publicApi = {
  getProjects: async (search?: string) => {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    const response = await apiClient.get(`/public/projects${query}`);
    return response;
  },
  submitGrievance: async (data: unknown) => {
    const response = await apiClient.post('/public/grievances', data);
    return response;
  },
  trackGrievance: async (refCode: string) => {
    const response = await apiClient.get(`/public/grievances/${refCode}`);
    return response;
  }
};
