/**
 * SeriesCard - Displays a blog series with title, description, and a link.
 *
 * Links to the blog listing page filtered by the series slug
 * (e.g. /blogs?series=explainer-series). Includes a subtle hover
 * elevation and border accent for interactivity feedback.
 *
 * Used by: SeriesListingPage
 *
 * @param {object} props
 * @param {object} props.series
 * @param {string} props.series.slug        - URL-safe series identifier
 * @param {string} props.series.title       - Display title
 * @param {string} props.series.description - Short summary of the series
 */
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { cn } from '@/utils/cn';

export default function SeriesCard({ series }) {
  const { slug, title, description } = series;

  return (
    <Link
      to={`${ROUTES.BLOGS}?series=${slug}`}
      className={cn(
        'group block rounded-xl p-6',
        'border border-primary-200 bg-white shadow-sm',
        'dark:border-dark-border dark:bg-dark-surface',
        'transition-all duration-200',
        'hover:shadow-md hover:border-secondary-400',
        'dark:hover:border-secondary-500 dark:hover:shadow-lg'
      )}
    >
      {/* Title */}
      <h3 className="text-xl font-bold text-primary-800 dark:text-dark-text">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-relaxed text-primary-500 dark:text-dark-muted">
        {description}
      </p>

      {/* "Read series" indicator */}
      <span
        className={cn(
          'mt-4 inline-flex items-center gap-1 text-sm font-medium',
          'text-secondary-600 dark:text-secondary-400',
          'group-hover:gap-2 transition-all duration-150'
        )}
      >
        Browse series
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
