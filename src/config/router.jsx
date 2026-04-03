/**
 * Application router — defines all routes and their layout wrappers.
 *
 * Admin pages are lazy-loaded to keep the initial bundle small.
 * TipTap (the blog editor) is ~400KB — lazy loading ensures public
 * visitors never download it.
 *
 * Route tree:
 *   / (PublicLayout)
 *     ├── /               → HomePage
 *     ├── /blogs           → BlogListingPage
 *     ├── /blogs/:slug     → BlogPostPage
 *     ├── /series          → SeriesListingPage
 *     ├── /about           → AboutPage
 *     └── /login           → LoginPage
 *
 *   /admin (ProtectedRoute → AdminLayout) [lazy-loaded]
 *     ├── /admin            → DashboardPage
 *     ├── /admin/posts      → PostManagementPage
 *     ├── /admin/posts/new  → PostEditorPage
 *     ├── /admin/posts/:uuid/edit → PostEditorPage
 *     ├── /admin/events     → EventManagementPage
 *     ├── /admin/events/new → EventEditorPage
 *     ├── /admin/events/:uuid/edit → EventEditorPage
 *     └── /admin/accounts   → AccountManagementPage
 *
 *   * → NotFoundPage
 *
 * @see src/components/common/ProtectedRoute.jsx — auth guard for /admin/*
 */
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PublicLayout from '@/layouts/PublicLayout';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Public pages — eagerly loaded (small, every visitor sees these)
import HomePage from '@/pages/public/HomePage';
import BlogListingPage from '@/pages/public/BlogListingPage';
import BlogPostPage from '@/pages/public/BlogPostPage';
import SeriesListingPage from '@/pages/public/SeriesListingPage';
import AboutPage from '@/pages/public/AboutPage';
import LoginPage from '@/pages/public/LoginPage';

// Catch-all
import NotFoundPage from '@/pages/NotFoundPage';

// Admin pages — lazy-loaded (only downloaded when admin navigates here)
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'));
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage'));
const PostManagementPage = lazy(() => import('@/pages/admin/PostManagementPage'));
const PostEditorPage = lazy(() => import('@/pages/admin/PostEditorPage'));
const EventManagementPage = lazy(() => import('@/pages/admin/EventManagementPage'));
const EventEditorPage = lazy(() => import('@/pages/admin/EventEditorPage'));
const AccountManagementPage = lazy(() => import('@/pages/admin/AccountManagementPage'));

/** Suspense wrapper for lazy-loaded admin pages */
function LazyWrapper({ children }) {
  return <Suspense fallback={<LoadingSpinner fullPage message="Loading..." />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    /* Public pages — wrapped in PublicLayout (Navbar + Footer) */
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'blogs', element: <BlogListingPage /> },
      { path: 'blogs/:slug', element: <BlogPostPage /> },
      { path: 'series', element: <SeriesListingPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
  {
    /* Admin pages — auth-guarded, lazy-loaded */
    path: 'admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: (
          <LazyWrapper>
            <AdminLayout />
          </LazyWrapper>
        ),
        children: [
          { index: true, element: <LazyWrapper><DashboardPage /></LazyWrapper> },
          { path: 'posts', element: <LazyWrapper><PostManagementPage /></LazyWrapper> },
          { path: 'posts/new', element: <LazyWrapper><PostEditorPage /></LazyWrapper> },
          { path: 'posts/:uuid/edit', element: <LazyWrapper><PostEditorPage /></LazyWrapper> },
          { path: 'events', element: <LazyWrapper><EventManagementPage /></LazyWrapper> },
          { path: 'events/new', element: <LazyWrapper><EventEditorPage /></LazyWrapper> },
          { path: 'events/:uuid/edit', element: <LazyWrapper><EventEditorPage /></LazyWrapper> },
          { path: 'accounts', element: <LazyWrapper><AccountManagementPage /></LazyWrapper> },
        ],
      },
    ],
  },
  {
    /* 404 catch-all */
    path: '*',
    element: <NotFoundPage />,
  },
]);
