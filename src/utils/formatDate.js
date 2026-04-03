/**
 * Date formatting helpers.
 *
 * Used by PostMeta, PostCard, EventCard to display human-readable dates.
 *
 * @example
 *   formatDate('2026-04-04T00:00:00Z') // "Apr 4, 2026"
 *   formatDateTime('2026-04-04T14:30:00Z') // "Apr 4, 2026 at 2:30 PM"
 *   formatRelative('2026-04-03T00:00:00Z') // "1 day ago"
 */

/**
 * Format a date string as "Mon D, YYYY".
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a date string as "Mon D, YYYY at H:MM AM/PM".
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDateTime(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/**
 * Format a date as a relative time string (e.g., "3 hours ago", "2 days ago").
 * Falls back to formatDate() for dates older than 30 days.
 * @param {string|Date} date
 * @returns {string}
 */
export function formatRelative(date) {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return formatDate(date);
}
