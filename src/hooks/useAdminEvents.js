/**
 * Hook for fetching all events — admin view.
 *
 * Used by: EventManagementPage, DashboardPage (stats).
 *
 * @param {{ page?: number, limit?: number, status?: string }} params
 * @returns {{ events, pagination, isLoading, error, refetch }}
 */
import { useState, useEffect, useCallback } from 'react';
import * as eventService from '@/services/eventService';
import { PAGINATION } from '@/config/constants';
import logger from '@/utils/logger';

export function useAdminEvents({ page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.ADMIN_LIMIT, status } = {}) {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await eventService.getEvents({ page, limit, status });
      setEvents(result.data || []);
      setPagination(result.pagination || null);
      logger.debug('useAdminEvents', `Fetched ${result.data?.length || 0} admin events`);
    } catch (err) {
      setError(err.message);
      logger.error('useAdminEvents', 'Failed to fetch admin events');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, status]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  return { events, pagination, isLoading, error, refetch: fetchEvents };
}
