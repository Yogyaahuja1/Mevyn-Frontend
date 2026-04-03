/**
 * EventList - Stacked vertical list of EventCard components with a header.
 *
 * Renders an optional section title and a vertical stack of event cards.
 * Shows an EmptyState when the events array is empty or absent.
 *
 * Used by: UpcomingEvents, potential future EventsPage.
 *
 * @param {object} props
 * @param {object[]} props.events                - Array of event objects passed to EventCard
 * @param {string}   [props.title]               - Optional section heading
 * @param {string}   [props.emptyMessage='No events to show.'] - Text shown when list is empty
 */
import EventCard from '@/components/events/EventCard';
import EmptyState from '@/components/common/EmptyState';

export default function EventList({ events, title, emptyMessage = 'No events to show.' }) {
  return (
    <section>
      {title && (
        <h2 className="mb-4 text-xl font-bold text-primary-800 dark:text-dark-text sm:text-2xl">
          {title}
        </h2>
      )}

      {!events?.length ? (
        <EmptyState title={emptyMessage} />
      ) : (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <EventCard key={event.uuid} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
