import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com/',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
