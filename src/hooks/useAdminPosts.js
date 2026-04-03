/**
 * Hook for fetching all posts (including drafts and deleted) — admin view.
 *
 * Used by: PostManagementPage, DashboardPage (stats).
 *
 * @param {{ status?: string, deleted?: string, page?: number, limit?: number }} params
 * @returns {{ posts, pagination, isLoading, error, refetch }}
 */
import { useState, useEffect, useCallback } from 'react';
import * as postService from '@/services/postService';
import { PAGINATION } from '@/config/constants';
import logger from '@/utils/logger';

export function useAdminPosts({ status, deleted, page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.ADMIN_LIMIT } = {}) {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await postService.getDrafts({ status, deleted, page, limit });
      setPosts(result.data || []);
      setPagination(result.pagination || null);
      logger.debug('useAdminPosts', `Fetched ${result.data?.length || 0} admin posts`);
    } catch (err) {
      setError(err.message);
      logger.error('useAdminPosts', 'Failed to fetch admin posts');
    } finally {
      setIsLoading(false);
    }
  }, [status, deleted, page, limit]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  return { posts, pagination, isLoading, error, refetch: fetchPosts };
}
