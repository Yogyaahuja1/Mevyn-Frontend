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
import BorderGlow from '@/components/common/BorderGlow';

export default function SeriesCard({ series }) {
  return (
    <BorderGlow
      glowColor="201 168 76"
      borderRadius={8}
      glowIntensity={0.62}
      glowRadius={24}
      colors={['rgba(226, 196, 120, 0.6)', 'rgba(160, 120, 48, 0.18)', 'rgba(160, 120, 48, 0.04)']}
      style={{ height: '100%' }}
    >
      <Link to={`/series/${series.slug}`} className="dashboard-card" style={{ height: '100%' }}>
        <div className="series-title" style={{ color: series.accent || 'var(--accent)' }}>{series.title}</div>
        <div className="series-desc" style={{ marginBottom: 16 }}>{series.description}</div>
        <div className="dashboard-cta">Explore Series →</div>
      </Link>
    </BorderGlow>
  );
}
