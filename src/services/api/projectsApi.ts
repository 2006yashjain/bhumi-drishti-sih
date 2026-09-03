import { apiClient } from './client';

export const projectsApi = {
  getProjects: async (params?: { search?: string, state?: string, district?: string, stage?: string }) => {
    let query = '';
    if (params) {
      const searchParams = new URLSearchParams();
      if (params.search) searchParams.append('search', params.search);
      if (params.state) searchParams.append('state', params.state);
      if (params.district) searchParams.append('district', params.district);
      if (params.stage) searchParams.append('stage', params.stage);
      query = `?${searchParams.toString()}`;
    }
    const response = await apiClient.get(`/projects${query}`);
    return response;
  },
  getProject: async (projectCode: string) => {
    const response = await apiClient.get(`/projects/${projectCode}`);
    return response;
  },
  getProjectRisk: async (projectCode: string) => {
    const response = await apiClient.get(`/projects/${projectCode}/risk`);
    return response;
  },
  getRiskTrajectory: async (projectCode: string) => {
    const response = await apiClient.get(`/projects/${projectCode}/trajectory`);
    return response;
  },
  getRiskDimensions: async (projectCode: string) => {
    const response = await apiClient.get(`/projects/${projectCode}/dimensions`);
    return response;
  }
};
