import axios from 'axios';

const instanceApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

instanceApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// eslint-disable-next-line import/prefer-default-export
export { instanceApi };
