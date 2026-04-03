/**
 * RecentPosts - Displays the latest 6 published posts in a responsive grid.
 *
 * Self-contained data-fetching component: calls the usePosts hook with
 * limit=6, shows a LoadingSpinner while loading, an ErrorMessage on failure,
 * and a PostGrid with results. Includes a section title with a "View All"
 * link to the blogs listing page.
 *
 * Used by: HomePage.
 */
import { Link } from 'react-router-dom';
import { usePosts } from '@/hooks/usePosts';
import PostGrid from '@/components/posts/PostGrid';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { ROUTES } from '@/config/routes';
import { cn } from '@/utils/cn';

export default function RecentPosts() {
  const { posts, isLoading, error, refetch } = usePosts({ limit: 6 });

  return (
    <section>
      {/* Section header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary-800 dark:text-dark-text sm:text-2xl">
          Recent Posts
        </h2>
        <Link
          to={ROUTES.BLOGS}
          className={cn(
            'text-sm font-medium transition-colors',
            'text-secondary-600 hover:text-secondary-700',
            'dark:text-secondary-400 dark:hover:text-secondary-300'
          )}
        >
          View All &rarr;
        </Link>
      </div>

      {/* Content states */}
      {isLoading && <LoadingSpinner message="Loading recent posts..." />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!isLoading && !error && <PostGrid posts={posts} />}
    </section>
  );
}
