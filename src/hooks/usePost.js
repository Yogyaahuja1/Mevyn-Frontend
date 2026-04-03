/**
 * Hook for fetching a single post by slug or uuid.
 *
 * Used by: BlogPostPage to display full post content.
 *
 * @param {string} identifier - Post slug or uuid
 * @returns {{ post, isLoading, error }}
 */
import { useState, useEffect } from 'react';
import * as postService from '@/services/postService';
import logger from '@/utils/logger';

export function usePost(identifier) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!identifier) return;

    let cancelled = false;

    async function fetchPost() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await postService.getPost(identifier);
        if (!cancelled) {
          setPost(result);
          logger.debug('usePost', `Fetched post: ${identifier}`);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          logger.error('usePost', `Failed to fetch post: ${identifier}`);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchPost();
    return () => { cancelled = true; };
  }, [identifier]);

  return { post, isLoading, error };
}
