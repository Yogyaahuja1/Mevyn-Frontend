/**
 * UpcomingEvents - Editorial timeline section showing the next upcoming events.
 *
 * Displays a 2-column layout: left side with heading and description,
 * right side with a vertical timeline of event cards. Uses the timeline
 * CSS classes for the dotted vertical connector and date/title/location
 * formatting.
 *
 * Falls back to an EmptyState when no upcoming events exist.
 *
 * Used by: HomePage.
 */
import { useEvents } from '@/hooks/useEvents';
import { formatDateTime } from '@/utils/formatDate';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';

export default function UpcomingEvents() {
  const { events, isLoading } = useEvents({ limit: 5, status: 'upcoming' });

  return (
    <section
      className="section home-contrast-section"
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="container-editorial">
        <div
          className="editorial-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 80,
            alignItems: 'start',
          }}
        >
          {/* Left: heading + description */}
          <div>
            <span className="section-label">What&apos;s Coming Up</span>
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                marginTop: 12,
                marginBottom: 20,
                color: 'var(--text)',
              }}
            >
              Upcoming Events
            </h2>
            <p
              style={{
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: 28,
              }}
            >
              Stay updated with events we&apos;re covering and upcoming campus
              happenings.
            </p>
          </div>

          {/* Right: timeline */}
          <div>
            {isLoading && <LoadingSpinner />}

            {!isLoading && !events?.length && (
              <EmptyState
                title="No upcoming events"
                description="Check back soon for new events."
              />
            )}

            {!isLoading && events?.length > 0 && (
              <div className="timeline">
                {events.map((ev) => (
                  <div key={ev.uuid} className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-date">
                      {formatDateTime(ev.date)}
                    </div>
                    <div className="timeline-title">{ev.title}</div>
                    {ev.location?.name && (
                      <div className="timeline-desc">{ev.location.name}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
