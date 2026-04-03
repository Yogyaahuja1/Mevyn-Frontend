/**
 * Axios instance — the backbone of all API communication.
 *
 * Features:
 *   - Automatic JWT injection via request interceptor
 *   - Response unwrapping (returns response.data directly)
 *   - 401 handling: clears stale token and redirects to /login
 *   - Centralized error normalization
 *
 * Security: NEVER log request/response bodies — they may contain
 * sensitive user data. Only log method, URL path, and status codes.
 */
import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '@/config/constants';
import logger from '@/utils/logger';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

/**
 * Request interceptor: injects JWT token from localStorage.
 * Logs the HTTP method and path (never the token or body).
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    logger.debug('API', `${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    logger.error('API', 'Request setup failed');
    return Promise.reject(error);
  }
);

/**
 * Response interceptor:
 *   - Unwraps axios response to return data directly
 *   - Handles 401 by clearing token and redirecting
 *   - Normalizes error shapes from the backend
 */
api.interceptors.response.use(
  (response) => {
    logger.debug('API', `${response.status} ${response.config.url}`);
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || 'unknown';

    logger.error('API', `${status || 'Network Error'} ${url}`);

    // Token expired or invalid — force logout
    if (status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      // Only redirect if not already on the login page
      if (!window.location.pathname.includes('/login')) {
        logger.info('API', 'Session expired, redirecting to login');
        window.location.href = '/login';
      }
    }

    // Normalize backend error shape for consumers
    const message =
      error.response?.data?.error?.message ||
      error.response?.data?.errors?.join(', ') ||
      error.message ||
      'An unexpected error occurred';

    return Promise.reject(new Error(message));
  }
);

export default api;
