/**
 * SeriesListingPage — grid of all available content series.
 *
 * Data source: src/data/series-config.json (static).
 * Each series card links to /blogs?series=<slug>.
 *
 * Route: /series
 */
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import SeriesCard from '@/components/series/SeriesCard';
import seriesData from '@/data/series-config.json';

export default function SeriesListingPage() {
  useDocumentTitle('Series');

  const sorted = [...seriesData].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-900 dark:text-dark-text">Series</h1>
        <p className="mt-2 text-primary-500 dark:text-dark-muted">
          Curated collections of related posts — dive deep into topics that matter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((series) => (
          <SeriesCard key={series.slug} series={series} />
        ))}
      </div>
    </div>
  );
}
