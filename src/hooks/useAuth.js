/**
 * Shorthand hook for accessing AuthContext.
 * @returns {{ user, token, isLoading, isAuthenticated, login, logout }}
 */
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
