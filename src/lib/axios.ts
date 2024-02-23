import axios from 'axios';

const instanceApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

instanceApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

export { instanceApi };
