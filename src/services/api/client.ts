const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {})
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'API request failed');
  }

  return response.json();
}

export const apiClient = {
  get: (endpoint: string) => fetchWithAuth(endpoint),
  post: (endpoint: string, data: unknown) => fetchWithAuth(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  patch: (endpoint: string, data: unknown) => fetchWithAuth(endpoint, { method: 'PATCH', body: JSON.stringify(data) })
};
