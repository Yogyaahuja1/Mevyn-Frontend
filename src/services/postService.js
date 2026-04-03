/**
 * Post service — all API calls related to blog posts.
 *
 * Public endpoints (no auth): getPosts, getPost
 * Protected endpoints (auth): getDrafts, createPost, updatePost, deletePost, restorePost
 *
 * @see src/hooks/usePosts.js      — public post listing hook
 * @see src/hooks/usePost.js       — single post hook
 * @see src/hooks/useAdminPosts.js — admin post listing hook
 */
import api from './api';
import logger from '@/utils/logger';

/**
 * Fetch published posts with optional pagination, tag, and series filters.
 * @param {{ page?: number, limit?: number, tag?: string, series?: string }} params
 * @returns {Promise<{ data: object[], pagination: object }>}
 */
export async function getPosts({ page, limit, tag, series } = {}) {
  const params = {};
  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (tag) params.tag = tag;
  if (series) params.series = series;

  logger.debug('PostService', 'Fetching published posts', { page, tag, series });
  return api.get('/posts', { params });
}

/**
 * Fetch a single post by slug or uuid (public).
 * @param {string} identifier — slug or uuid
 * @returns {Promise<object>} Post object
 */
export async function getPost(identifier) {
  logger.debug('PostService', `Fetching post: ${identifier}`);
  return api.get(`/posts/${identifier}`);
}

/**
 * Fetch all posts including drafts, deleted — admin view (auth required).
 * @param {{ status?: string, deleted?: string, page?: number, limit?: number }} params
 * @returns {Promise<{ data: object[], pagination: object }>}
 */
export async function getDrafts({ status, deleted, page, limit } = {}) {
  const params = {};
  if (status) params.status = status;
  if (deleted) params.deleted = deleted;
  if (page) params.page = page;
  if (limit) params.limit = limit;

  logger.debug('PostService', 'Fetching admin posts view', { status, deleted });
  return api.get('/posts/drafts/all', { params });
}

/**
 * Create a new post (auth required).
 * @param {object} data — { title, body_html, authors?, anonymous?, excerpt?, tags?, series?, content_blocks?, status? }
 * @returns {Promise<object>} Created post
 */
export async function createPost(data) {
  logger.info('PostService', 'Creating new post');
  return api.post('/posts', data);
}

/**
 * Update an existing post (auth required). Send only changed fields.
 * @param {string} uuid
 * @param {object} data — partial post fields
 * @returns {Promise<object>} Updated post
 */
export async function updatePost(uuid, data) {
  logger.info('PostService', `Updating post ${uuid}`);
  return api.put(`/posts/${uuid}`, data);
}

/**
 * Soft-delete a post (auth required). Sets deleted_at timestamp.
 * @param {string} uuid
 * @returns {Promise<object>}
 */
export async function deletePost(uuid) {
  logger.info('PostService', `Soft-deleting post ${uuid}`);
  return api.delete(`/posts/${uuid}`);
}

/**
 * Restore a soft-deleted post (auth required). Clears deleted_at.
 * @param {string} uuid
 * @returns {Promise<object>}
 */
export async function restorePost(uuid) {
  logger.info('PostService', `Restoring post ${uuid}`);
  return api.patch(`/posts/${uuid}/restore`);
}
