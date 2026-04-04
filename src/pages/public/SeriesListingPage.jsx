/**
 * SeriesListingPage — dashboard-grid style listing of all content series.
 *
 * Data source: src/data/series-config.json (static).
 * Each series card links to /series/:slug.
 *
 * Route: /series
 */
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import seriesData from '@/data/series-config.json';

export default function SeriesListingPage() {
  useDocumentTitle('Series');

  const sorted = [...seriesData].sort((a, b) => a.order - b.order);

  return (
    <div className="page-enter">
      <div style={{ padding: '56px 0 48px', borderBottom: '1px solid var(--border)' }}>
        <div className="container-editorial">
          <span className="section-label">Curated Collections</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.0, marginTop: 12, color: 'var(--text)' }}>
            Our<br /><em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Series</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 16, maxWidth: 520, lineHeight: 1.7 }}>
            Dive deep into curated collections of related stories.
          </p>
        </div>
      </div>
      <section className="section">
        <div className="container-editorial">
          <div className="dashboard-grid">
            {sorted.map(series => (
              <Link key={series.slug} to={`/series/${series.slug}`} className="dashboard-card">
                <div className="series-title" style={{ color: series.accent || 'var(--accent)' }}>{series.title}</div>
                <div className="series-desc" style={{ marginBottom: 16 }}>{series.description}</div>
                <div className="dashboard-cta">Explore Series →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
