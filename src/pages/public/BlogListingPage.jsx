/**
 * BlogListingPage — paginated list of all published blog posts.
 *
 * Features:
 *   - Search bar (debounced, client-side filter for MVP)
 *   - Tag filter chips (horizontal scroll)
 *   - Series filter (via URL query param ?series=)
 *   - Paginated PostGrid
 *   - Empty state when no posts match
 *
 * Route: /blogs
 * Query params: ?tag=, ?series=, ?page=
 */
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { usePosts } from '@/hooks/usePosts';
import { useDebounce } from '@/hooks/useDebounce';
import { searchPosts } from '@/services/searchService';
import PostGrid from '@/components/posts/PostGrid';
import TagFilter from '@/components/posts/TagFilter';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import EmptyState from '@/components/common/EmptyState';

export default function BlogListingPage() {
  useDocumentTitle('All Posts');

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const selectedTag = searchParams.get('tag') || null;
  const selectedSeries = searchParams.get('series') || null;

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);

  const { posts, pagination, isLoading, error, refetch } = usePosts({
    page: currentPage,
    limit: 12,
    tag: selectedTag,
    series: selectedSeries,
  });

  // Client-side search filter applied on top of API results
  const filteredPosts = useMemo(
    () => (debouncedSearch ? searchPosts(debouncedSearch, posts) : posts),
    [debouncedSearch, posts]
  );

  // Collect unique tags from current results for the filter chips
  const allTags = useMemo(() => {
    const tagSet = new Set();
    posts.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [posts]);

  /** Update URL query params for tag filtering */
  function handleTagSelect(tag) {
    const params = new URLSearchParams(searchParams);
    if (tag) {
      params.set('tag', tag);
    } else {
      params.delete('tag');
    }
    params.delete('page');
    setSearchParams(params);
  }

  /** Update URL query params for pagination */
  function handlePageChange(page) {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set('page', String(page));
    } else {
      params.delete('page');
    }
    setSearchParams(params);
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-900 dark:text-dark-text">
          {selectedSeries ? `Series: ${selectedSeries.replace(/-/g, ' ')}` : 'All Posts'}
        </h1>
        {selectedSeries && (
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete('series');
              setSearchParams(params);
            }}
            className="text-sm text-secondary-600 dark:text-secondary-400 hover:underline mt-1"
          >
            Clear series filter
          </button>
        )}
      </div>

      {/* Search + Tag filter */}
      <div className="space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search posts by title, excerpt, or tag..."
          className="max-w-md"
        />
        {allTags.length > 0 && (
          <TagFilter tags={allTags} selectedTag={selectedTag} onTagSelect={handleTagSelect} />
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner message="Loading posts..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : filteredPosts.length === 0 ? (
        <EmptyState
          title="No posts found"
          description={searchQuery ? 'Try a different search term.' : 'Check back later for new content.'}
        />
      ) : (
        <>
          <PostGrid posts={filteredPosts} />
          {pagination && !debouncedSearch && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
