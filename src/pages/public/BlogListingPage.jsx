/**
 * BlogListingPage - Editorial listing of all published blog posts.
 *
 * Features:
 *   - Search input (debounced, client-side filter)
 *   - Tag filter pills (editorial .pill classes)
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
    <div className="page-enter">
      {/* Header section */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBottom: 48,
          paddingTop: 56,
        }}
      >
        <div className="container-editorial">
          <span className="section-label">All Stories</span>
          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 600,
              lineHeight: 1.0,
              marginTop: 12,
              color: 'var(--text)',
            }}
          >
            {selectedSeries ? (
              <>
                Series:
                <br />
                <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
                  {selectedSeries.replace(/-/g, ' ')}
                </em>
              </>
            ) : (
              <>
                Stories &amp;
                <br />
                <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
                  Coverage
                </em>
              </>
            )}
          </h1>
          <p
            style={{
              color: 'var(--text-muted)',
              marginTop: 16,
              maxWidth: 480,
            }}
          >
            Every story we&apos;ve told, every event we&apos;ve covered.
          </p>

          {/* Search bar */}
          <div style={{ marginTop: 24, maxWidth: 400 }}>
            <input
              className="form-input"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tag pills */}
          {allTags.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <TagFilter
                tags={allTags}
                selectedTag={selectedTag}
                onTagSelect={handleTagSelect}
              />
            </div>
          )}
        </div>
      </div>

      {/* Articles grid */}
      <section className="section">
        <div className="container-editorial">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={refetch} />
          ) : filteredPosts.length === 0 ? (
            <EmptyState title="No stories found" />
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
      </section>
    </div>
  );
}
