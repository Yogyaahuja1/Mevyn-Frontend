/**
 * Hook for fetching published posts with pagination, tag, and series filters.
 *
 * Used by: HomePage (recent posts), BlogListingPage (all posts with filters).
 *
 * @param {{ page?: number, limit?: number, tag?: string, series?: string }} params
 * @returns {{ posts, pagination, isLoading, error, refetch }}
 */
import { useState, useEffect, useCallback } from 'react';
import * as postService from '@/services/postService';
import { PAGINATION } from '@/config/constants';
import logger from '@/utils/logger';

export function usePosts({ page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT, tag, series } = {}) {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await postService.getPosts({ page, limit, tag, series });
      setPosts(result.data || []);
      setPagination(result.pagination || null);
      logger.debug('usePosts', `Fetched ${result.data?.length || 0} posts`);
    } catch (err) {
      setError(err.message);
      logger.error('usePosts', 'Failed to fetch posts', { message: err.message });
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, tag, series]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  return { posts, pagination, isLoading, error, refetch: fetchPosts };
}
