/**
 * DashboardPage - Admin overview showing site statistics and quick actions.
 *
 * Route: /admin
 * Protected route requiring authentication.
 *
 * Displays a responsive grid of StatsCards (Total Posts, Published, Drafts,
 * Upcoming Events). If the authenticated user has the "admin" role, an
 * additional Team Accounts card is shown.
 *
 * Below the stats, a Quick Actions section provides shortcut buttons to
 * create a new post or new event.
 *
 * @returns {JSX.Element}
 */
import { Link } from 'react-router-dom';
import { FileText, Eye, FilePen, Calendar, Users } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useAuth } from '@/hooks/useAuth';
import { useAdminPosts } from '@/hooks/useAdminPosts';
import { useEvents } from '@/hooks/useEvents';
import { useAccounts } from '@/hooks/useAccounts';
import { ROUTES } from '@/config/routes';
import StatsCard from '@/components/admin/StatsCard';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

export default function DashboardPage() {
  useDocumentTitle('Dashboard');

  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Fetch all posts (large limit to get totals) for counting
  const {
    posts,
    isLoading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useAdminPosts({ limit: 1000 });

  // Fetch upcoming events for count
  const {
    events,
    isLoading: eventsLoading,
    error: eventsError,
    refetch: refetchEvents,
  } = useEvents({ status: 'upcoming', limit: 1000 });

  // Fetch accounts only if user is admin
  const {
    accounts,
    isLoading: accountsLoading,
    error: accountsError,
    refetch: refetchAccounts,
  } = useAccounts();

  const isLoading = postsLoading || eventsLoading || (isAdmin && accountsLoading);
  const error = postsError || eventsError || (isAdmin && accountsError);

  // Derive counts from fetched data
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.status === 'published').length;
  const draftPosts = posts.filter((p) => p.status === 'draft').length;
  const upcomingEvents = events.length;
  const teamAccounts = accounts.length;

  /** Retry all failed fetches. */
  function handleRetry() {
    refetchPosts();
    refetchEvents();
    if (isAdmin) refetchAccounts();
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-800 dark:text-dark-text">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-primary-500 dark:text-dark-muted">
          Welcome back, {user?.name || 'Admin'}
        </p>
      </div>

      {/* Stats grid */}
      <section aria-label="Site statistics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard icon={FileText} label="Total Posts" value={totalPosts} color="blue" />
          <StatsCard icon={Eye} label="Published" value={publishedPosts} color="green" />
          <StatsCard icon={FilePen} label="Drafts" value={draftPosts} color="yellow" />
          <StatsCard icon={Calendar} label="Upcoming Events" value={upcomingEvents} color="blue" />
          {isAdmin && (
            <StatsCard icon={Users} label="Team Accounts" value={teamAccounts} color="green" />
          )}
        </div>
      </section>

      {/* Quick actions */}
      <section aria-label="Quick actions">
        <h2 className="text-lg font-semibold text-primary-800 dark:text-dark-text mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link to={ROUTES.ADMIN_POST_NEW}>
            <Button>
              <FilePen className="h-4 w-4" />
              New Post
            </Button>
          </Link>
          <Link to={ROUTES.ADMIN_EVENT_NEW}>
            <Button variant="secondary">
              <Calendar className="h-4 w-4" />
              New Event
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
