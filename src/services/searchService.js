/**
 * Search service — client-side post filtering for MVP.
 *
 * Phase 1 (current): Filters an array of already-fetched posts by matching
 * the query string against title, excerpt, and tags (case-insensitive).
 *
 * Phase 2 (future): When the backend adds GET /api/posts/search?q=<query>,
 * this file will be updated to call that endpoint instead.
 *
 * @see src/pages/public/BlogListingPage.jsx — uses this for search
 */
import logger from '@/utils/logger';

/**
 * Filter posts by a search query (client-side).
 * Matches against title, excerpt, and tags array.
 *
 * @param {string} query - Search term (case-insensitive)
 * @param {object[]} posts - Array of post objects to filter
 * @returns {object[]} Matching posts
 */
export function searchPosts(query, posts) {
  if (!query || !query.trim()) return posts;

  const q = query.toLowerCase().trim();
  logger.debug('Search', `Filtering ${posts.length} posts for "${q}"`);

  return posts.filter((post) => {
    const title = (post.title || '').toLowerCase();
    const excerpt = (post.excerpt || '').toLowerCase();
    const tags = (post.tags || []).map((t) => t.toLowerCase());

    return (
      title.includes(q) ||
      excerpt.includes(q) ||
      tags.some((tag) => tag.includes(q))
    );
  });
}
