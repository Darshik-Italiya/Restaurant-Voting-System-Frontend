// Axios instance that auto-injects Bearer token and baseURL from .env
import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, ''), // ensure no trailing slash
  headers: { 'Content-Type': 'application/json' }
});

// Attach token for every request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Optional: simple error pass-through so callers can show messages
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err?.response?.data || err)
);

export default api;
