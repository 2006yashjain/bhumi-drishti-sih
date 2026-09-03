import { apiClient } from './client';

export const authApi = {
  login: async (official_id: string, password: string) => {
    const response = await apiClient.post('/auth/login', { official_id, password });
    return response;
  },
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response;
  }
};
