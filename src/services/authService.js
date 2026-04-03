/**
 * Auth service — authentication and admin account management.
 *
 * Public: login
 * Auth required: getMe, changePassword
 * Admin role required: createAccount, getAccounts, updateAccount, deactivateAccount
 *
 * Security: NEVER log email, password, or token values.
 * Only log operation names and non-sensitive metadata.
 *
 * @see src/contexts/AuthContext.jsx — consumes login and getMe
 * @see src/hooks/useAccounts.js    — consumes account management functions
 */
import api from './api';
import logger from '@/utils/logger';

/**
 * Authenticate with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string }>}
 */
export async function login(email, password) {
  logger.info('AuthService', 'Login request sent');
  return api.post('/admins/login', { email, password });
}

/**
 * Fetch the authenticated user's profile.
 * @returns {Promise<{ uuid, email, name, role }>}
 */
export async function getMe() {
  logger.debug('AuthService', 'Fetching user profile');
  return api.get('/admins/me');
}

/**
 * Change the authenticated user's password.
 * @param {string} currentPassword
 * @param {string} newPassword
 * @returns {Promise<object>}
 */
export async function changePassword(currentPassword, newPassword) {
  logger.info('AuthService', 'Password change requested');
  return api.put('/admins/me/password', {
    current_password: currentPassword,
    new_password: newPassword,
  });
}

/**
 * Create a new admin/editor account (admin role required).
 * @param {{ email: string, password: string, name: string, role: 'admin'|'editor' }} data
 * @returns {Promise<object>}
 */
export async function createAccount(data) {
  logger.info('AuthService', 'Creating new account');
  return api.post('/admins', data);
}

/**
 * List all admin/editor accounts (admin role required).
 * @returns {Promise<object[]>}
 */
export async function getAccounts() {
  logger.debug('AuthService', 'Fetching accounts list');
  return api.get('/admins');
}

/**
 * Update an account's name, email, role, or is_active (admin role required).
 * @param {string} uuid
 * @param {object} data — { name?, email?, role?, is_active? }
 * @returns {Promise<object>}
 */
export async function updateAccount(uuid, data) {
  logger.info('AuthService', `Updating account ${uuid}`);
  return api.put(`/admins/${uuid}`, data);
}

/**
 * Deactivate an account (admin role required). Sets is_active: false.
 * @param {string} uuid
 * @returns {Promise<object>}
 */
export async function deactivateAccount(uuid) {
  logger.info('AuthService', `Deactivating account ${uuid}`);
  return api.delete(`/admins/${uuid}`);
}
