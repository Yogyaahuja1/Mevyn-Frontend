/**
 * EventCard - Editorial card for displaying an event.
 *
 * Uses the .card editorial CSS class along with .card-body, .card-meta,
 * .card-title, and .pill for consistent styling with the design system.
 *
 * Shows the event title, formatted date/time, location name (if present),
 * a "Virtual" pill when is_virtual is true, and a status pill.
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
import { formatDateTime } from '@/utils/formatDate';
import { MapPin } from 'lucide-react';

export default function EventCard({ event }) {
  return (
    <div className="card" style={{ cursor: 'default' }}>
      <div className="card-body">
        <div className="card-meta">
          {event.is_virtual && <span className="pill">Virtual</span>}
          {event.status && <span className="pill">{event.status}</span>}
          <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{formatDateTime(event.date)}</span>
        </div>
        <h3 className="card-title" style={{ fontSize: '1.05rem' }}>{event.title}</h3>
        {event.location?.name && (
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin style={{ width: 14, height: 14 }} />
            {event.location.name}
          </div>
        )}
      </div>
    </div>
  );
}
