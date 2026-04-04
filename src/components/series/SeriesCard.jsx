/**
 * SeriesCard — dashboard-card style series card.
 *
 * Links to /series/:slug for the series detail page.
 *
 * Used by: SeriesListingPage
 *
 * @param {object} props
 * @param {object} props.series
 * @param {string} props.series.slug        - URL-safe series identifier
 * @param {string} props.series.title       - Display title
 * @param {string} props.series.description - Short summary of the series
 * @param {string} [props.series.accent]    - Accent color for the series
 */
import { Link } from 'react-router-dom';

export default function SeriesCard({ series }) {
  return (
    <Link to={`/series/${series.slug}`} className="dashboard-card">
      <div className="series-title" style={{ color: series.accent || 'var(--accent)' }}>{series.title}</div>
      <div className="series-desc" style={{ marginBottom: 16 }}>{series.description}</div>
      <div className="dashboard-cta">Explore Series →</div>
    </Link>
  );
}
