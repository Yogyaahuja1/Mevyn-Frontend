/**
 * Route path constants — single source of truth for all navigation URLs.
 *
 * Use these instead of hardcoding paths in <Link to="..."> or navigate() calls.
 * This makes route changes a single-file edit and prevents typos.
 *
 * @example
 *   import { ROUTES } from '@/config/routes';
 *   <Link to={ROUTES.BLOGS}>All Posts</Link>
 *   navigate(ROUTES.ADMIN_POST_EDIT.replace(':uuid', post.uuid));
 */

export const ROUTES = {
  // --- Public pages ---
  HOME: '/',
  BLOGS: '/blogs',
  BLOG_POST: '/blogs/:slug',
  SERIES: '/series',
  ABOUT: '/about',
  LOGIN: '/login',

  // --- Admin pages (auth required) ---
  ADMIN: '/admin',
  ADMIN_POSTS: '/admin/posts',
  ADMIN_POST_NEW: '/admin/posts/new',
  ADMIN_POST_EDIT: '/admin/posts/:uuid/edit',
  ADMIN_EVENTS: '/admin/events',
  ADMIN_EVENT_NEW: '/admin/events/new',
  ADMIN_EVENT_EDIT: '/admin/events/:uuid/edit',
  ADMIN_ACCOUNTS: '/admin/accounts',
};
