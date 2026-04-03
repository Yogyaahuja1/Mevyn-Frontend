/**
 * Hook for fetching admin/editor accounts (admin role required).
 *
 * Used by: AccountManagementPage, DashboardPage (account count).
 *
 * @returns {{ accounts, isLoading, error, refetch }}
 */
import { useState, useEffect, useCallback } from 'react';
import * as authService from '@/services/authService';
import logger from '@/utils/logger';

export function useAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAccounts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authService.getAccounts();
      // The backend may return an array directly or wrapped in { data: [...] }
      setAccounts(Array.isArray(result) ? result : result.data || []);
      logger.debug('useAccounts', `Fetched ${accounts.length} accounts`);
    } catch (err) {
      setError(err.message);
      logger.error('useAccounts', 'Failed to fetch accounts');
    } finally {
      setIsLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetchAccounts(); }, [fetchAccounts]);

  return { accounts, isLoading, error, refetch: fetchAccounts };
}
