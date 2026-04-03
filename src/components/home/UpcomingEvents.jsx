/**
 * UpcomingEvents - Sidebar widget showing the next 5 upcoming events.
 *
 * Self-contained data-fetching component: calls the useEvents hook with
 * limit=5 and status='upcoming'. Displays a LoadingSpinner while loading,
 * an EmptyState when no upcoming events exist, and a stacked list of
 * EventCards otherwise. Includes a subtle top border to visually separate
 * it from adjacent content.
 *
 * Used by: HomePage sidebar.
 */
import { useEvents } from '@/hooks/useEvents';
import EventCard from '@/components/events/EventCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';

export default function UpcomingEvents() {
  const { events, isLoading } = useEvents({ limit: 5, status: 'upcoming' });

  return (
    <section className="border-t-2 border-secondary-200 pt-6 dark:border-secondary-800">
      <h2 className="mb-4 text-xl font-bold text-primary-800 dark:text-dark-text sm:text-2xl">
        Upcoming Events
      </h2>

      {isLoading && <LoadingSpinner message="Loading events..." />}

      {!isLoading && !events?.length && (
        <EmptyState
          title="No upcoming events"
          description="Check back soon for new events."
        />
      )}

      {!isLoading && events?.length > 0 && (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <EventCard key={event.uuid} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
