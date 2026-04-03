/**
 * AuthContext — manages JWT authentication state for admin/editor users.
 *
 * State:
 *   user: { uuid, email, name, role } | null
 *   token: string | null
 *   isLoading: boolean (true during initial auth check on mount)
 *   isAuthenticated: boolean (derived from token + user)
 *
 * Actions:
 *   login(email, password)  — authenticates and stores JWT
 *   logout()                — clears token and user state
 *
 * Flow:
 *   1. On mount, checks localStorage for existing token
 *   2. If token found, validates by calling GET /api/admins/me
 *   3. If valid, sets user state. If 401, clears stale token.
 *   4. ProtectedRoute waits for isLoading=false before redirecting.
 *
 * Security notes:
 *   - Token stored in localStorage under 'mevyn_token'
 *   - NEVER log the token value — only log auth state transitions
 *   - 401 responses from API interceptor trigger automatic logout
 */
import { createContext, useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '@/config/constants';
import * as authService from '@/services/authService';
import logger from '@/utils/logger';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.TOKEN));
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token && !!user;

  /**
   * Validate an existing token on mount by fetching the user's profile.
   * Clears stale tokens that the backend no longer accepts.
   */
  useEffect(() => {
    async function checkAuth() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const profile = await authService.getMe();
        setUser(profile);
        logger.info('Auth', 'Session restored');
      } catch {
        // Token is invalid or expired — clean up
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        setToken(null);
        setUser(null);
        logger.info('Auth', 'Stale token cleared');
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Authenticate a user with email and password.
   * On success, stores the JWT and fetches the user profile.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} The user profile
   */
  const login = useCallback(async (email, password) => {
    logger.info('Auth', 'Login attempt initiated');
    const { token: newToken } = await authService.login(email, password);

    localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
    setToken(newToken);

    const profile = await authService.getMe();
    setUser(profile);
    logger.info('Auth', 'Login successful');

    return profile;
  }, []);

  /**
   * Log out the current user by clearing all auth state.
   */
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    setToken(null);
    setUser(null);
    logger.info('Auth', 'User logged out');
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
