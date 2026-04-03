/**
 * Application-wide constants.
 *
 * Centralized configuration values used across services, hooks, and components.
 * Import from '@/config/constants' wherever needed.
 */

/** Base URL for the backend API (set in .env) */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/** Default pagination settings */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  ADMIN_LIMIT: 20,
  MAX_LIMIT: 100,
};

/** localStorage key names */
export const STORAGE_KEYS = {
  TOKEN: 'mevyn_token',
  THEME: 'mevyn_theme',
};

/** Debounce delay for search input (milliseconds) */
export const SEARCH_DEBOUNCE_MS = 300;

/** Fallback author name when a post has anonymous: true */
export const ANONYMOUS_AUTHOR = 'Mevyn Editorial Team';
