/**
 * localStorage wrapper with JSON serialization and error handling.
 *
 * Provides safe get/set/remove operations. Never stores sensitive data
 * like raw passwords — only tokens and preferences.
 *
 * Keys used in the app:
 *   - 'mevyn_token'  — JWT auth token (AuthContext)
 *   - 'mevyn_theme'  — 'light' or 'dark' (ThemeContext)
 */

import logger from './logger';

/**
 * Read a value from localStorage, parsing JSON automatically.
 * @param {string} key
 * @returns {*} Parsed value or null if not found/invalid
 */
export function getItem(key) {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return null;
    return JSON.parse(value);
  } catch {
    // Value might be a plain string (e.g., JWT token)
    return localStorage.getItem(key);
  }
}

/**
 * Write a value to localStorage, serializing to JSON automatically.
 * @param {string} key
 * @param {*} value
 */
export function setItem(key, value) {
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (err) {
    logger.warn('Storage', 'Failed to write to localStorage', { key });
  }
}

/**
 * Remove a key from localStorage.
 * @param {string} key
 */
export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    logger.warn('Storage', 'Failed to remove from localStorage', { key });
  }
}
