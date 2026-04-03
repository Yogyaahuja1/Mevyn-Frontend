/**
 * PostManagementPage - Admin table for managing all blog posts.
 *
 * Route: /admin/posts
 * Protected route requiring authentication.
 *
 * Features:
 * - Header with title and "New Post" button
 * - Filters: status select (All, Published, Draft, Deleted), search bar
 * - PostTable showing filtered posts
 * - Pagination controls
 * - Delete handler (soft-delete) and Restore handler with refetch
 *
 * Uses useAdminPosts hook with status/deleted/page state.
 * Uses useDebounce + searchPosts for client-side search filtering.
 *
 * @returns {JSX.Element}
 */
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useAdminPosts } from '@/hooks/useAdminPosts';
import { useDebounce } from '@/hooks/useDebounce';
import { deletePost, restorePost } from '@/services/postService';
import { searchPosts } from '@/services/searchService';
import { ROUTES } from '@/config/routes';
import PostTable from '@/components/admin/PostTable';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import EmptyState from '@/components/common/EmptyState';
import logger from '@/utils/logger';

/** Status filter options for the select dropdown. */
const STATUS_OPTIONS = [
  { value: 'all', label: 'All Posts' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'deleted', label: 'Deleted' },
];

export default function PostManagementPage() {
  useDocumentTitle('Manage Posts');

  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  // Derive API params from the status filter
  const isDeletedFilter = statusFilter === 'deleted';
  const apiStatus = statusFilter === 'all' || statusFilter === 'deleted' ? undefined : statusFilter;
  const apiDeleted = isDeletedFilter ? 'true' : undefined;

  const { posts, pagination, isLoading, error, refetch } = useAdminPosts({
    status: apiStatus,
    deleted: apiDeleted,
    page,
  });

  // Client-side search filtering on top of already-fetched posts
  const filteredPosts = useMemo(
    () => searchPosts(debouncedSearch, posts),
    [debouncedSearch, posts]
  );

  /**
   * Soft-delete a post and refresh the list.
   * @param {string} uuid
   */
  async function handleDelete(uuid) {
    try {
      await deletePost(uuid);
      refetch();
    } catch (err) {
      logger.error('PostManagement', `Failed to delete post ${uuid}`, { message: err.message });
    }
  }

  /**
   * Restore a soft-deleted post and refresh the list.
   * @param {string} uuid
   */
  async function handleRestore(uuid) {
    try {
      await restorePost(uuid);
      refetch();
    } catch (err) {
      logger.error('PostManagement', `Failed to restore post ${uuid}`, { message: err.message });
    }
  }

  /** Reset page to 1 when changing the status filter. */
  function handleStatusChange(e) {
    setStatusFilter(e.target.value);
    setPage(1);
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-800 dark:text-dark-text">
          Posts
        </h1>
        <Link to={ROUTES.ADMIN_POST_NEW}>
          <Button>
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Status select */}
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          aria-label="Filter by status"
          className="rounded-lg border px-3 py-2 text-sm transition-colors bg-white border-primary-300 text-primary-800 dark:bg-dark-surface2 dark:border-dark-border dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 min-h-[44px] sm:w-48"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Search bar */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search posts..."
          className="sm:flex-1 sm:max-w-sm"
        />
      </div>

      {/* Content area */}
      {isLoading ? (
        <LoadingSpinner message="Loading posts..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : filteredPosts.length === 0 ? (
        <EmptyState
          title="No posts found"
          description={
            search
              ? 'Try a different search term.'
              : 'Get started by creating your first post.'
          }
          action={
            !search && (
              <Link to={ROUTES.ADMIN_POST_NEW}>
                <Button size="sm">Create Post</Button>
              </Link>
            )
          }
        />
      ) : (
        <>
          <PostTable
            posts={filteredPosts}
            onDelete={handleDelete}
            onRestore={handleRestore}
          />

          {/* Pagination */}
          {pagination && (
            <Pagination
              page={page}
              totalPages={pagination.totalPages || 1}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
