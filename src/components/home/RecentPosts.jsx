/**
 * RecentPosts - Editorial section displaying the latest 6 published posts.
 *
 * Uses a featured layout: the first post spans a large card, posts 2-3
 * stack in a side column, and posts 4-6 fill a 3-column grid below.
 * Includes a section header with label and a "View All Stories" link.
 *
 * Used by: HomePage.
 */
import { Link } from 'react-router-dom';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/posts/PostCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { ROUTES } from '@/config/routes';

export default function RecentPosts() {
  const { posts, isLoading, error, refetch } = usePosts({ limit: 6 });

  return (
    <section className="section section-divider">
      <div className="container-editorial">
        <div className="section-header">
          <span className="section-label">Latest from MEVYN</span>
          <h2>Recent Stories</h2>
        </div>

        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} onRetry={refetch} />}

        {!isLoading && !error && posts.length > 0 && (
          <>
            {/* Featured + side layout */}
            <div
              className="editorial-grid-featured"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.6fr 1fr',
                gap: 24,
                marginBottom: 24,
              }}
            >
              <PostCard post={posts[0]} size="large" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {posts[1] && <PostCard post={posts[1]} />}
                {posts[2] && <PostCard post={posts[2]} />}
              </div>
            </div>

            {/* 3-column grid for remaining */}
            {posts.length > 3 && (
              <div
                className="editorial-grid-3"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 24,
                }}
              >
                {posts.slice(3, 6).map((p) => (
                  <PostCard key={p.uuid || p.slug} post={p} />
                ))}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link to={ROUTES.BLOGS} className="btn-ghost">
                View All Stories &rarr;
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
