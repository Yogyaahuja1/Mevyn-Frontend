/**
 * EventCard - Card component for displaying an event in a list.
 *
 * Shows the event title, formatted date/time, location name (if present),
 * a "Virtual" badge when is_virtual is true, and a status badge
 * (green for upcoming, default for past).
 *
 * Used by: EventList, UpcomingEvents sidebar widget.
 *
 * @param {object} props
 * @param {object} props.event
 * @param {string} props.event.uuid        - Unique event identifier
 * @param {string} props.event.title       - Event title
 * @param {string} props.event.slug        - URL-friendly slug
 * @param {string} props.event.date        - Event start date (ISO string)
 * @param {string} [props.event.end_date]  - Event end date (ISO string)
 * @param {object} [props.event.location]  - Location object with name field
 * @param {boolean} props.event.is_virtual - Whether the event is virtual
 * @param {string} props.event.status      - "upcoming" | "past"
 */
import Badge from '@/components/common/Badge';
import { formatDateTime } from '@/utils/formatDate';
import { MapPin, Calendar, Globe } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function EventCard({ event }) {
  const { title, date, end_date: endDate, location, is_virtual: isVirtual, status } = event;

  return (
    <article
      className={cn(
        'flex flex-col gap-3 rounded-xl border p-4 transition-shadow duration-200',
        'border-primary-200 bg-white shadow-sm hover:shadow-md',
        'dark:border-dark-border dark:bg-dark-surface hover:dark:shadow-lg',
        'sm:p-5'
      )}
    >
      {/* Title and badges */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3
          className={cn(
            'text-lg font-semibold leading-snug',
            'text-primary-800 dark:text-dark-text'
          )}
        >
          {title}
        </h3>

        <div className="flex flex-shrink-0 items-center gap-1.5">
          {isVirtual && (
            <Badge variant="blue">
              <Globe className="mr-1 h-3 w-3" />
              Virtual
            </Badge>
          )}
          <Badge variant={status === 'upcoming' ? 'green' : 'default'}>
            {status === 'upcoming' ? 'Upcoming' : 'Past'}
          </Badge>
        </div>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-primary-500 dark:text-dark-muted">
        <Calendar className="h-4 w-4 flex-shrink-0" />
        <time dateTime={date}>
          {formatDateTime(date)}
          {endDate && ` - ${formatDateTime(endDate)}`}
        </time>
      </div>

      {/* Location */}
      {location?.name && (
        <div className="flex items-center gap-2 text-sm text-primary-500 dark:text-dark-muted">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span>{location.name}</span>
        </div>
      )}
    </article>
  );
}
