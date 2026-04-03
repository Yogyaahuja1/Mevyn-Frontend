/**
 * Series dropdown in the Navbar.
 *
 * Desktop: hover/click to open a dropdown showing all series.
 * Each item links to /blogs?series=<slug>.
 * "View All Series" links to /series page.
 *
 * Data source: src/data/series-config.json (static for now).
 */
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import seriesData from '@/data/series-config.json';
import { cn } from '@/utils/cn';

export default function SeriesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  const isActive = location.pathname === ROUTES.SERIES || location.search.includes('series=');

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, [location]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'inline-flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors',
          isActive
            ? 'text-secondary-600 dark:text-secondary-400'
            : 'text-primary-600 hover:text-primary-800 dark:text-dark-muted dark:hover:text-dark-text'
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Series
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 rounded-lg shadow-lg border border-primary-200 dark:border-dark-border bg-white dark:bg-dark-surface2 py-1 z-50">
          {seriesData
            .sort((a, b) => a.order - b.order)
            .map((series) => (
              <Link
                key={series.slug}
                to={`${ROUTES.BLOGS}?series=${series.slug}`}
                className="block px-4 py-2.5 text-sm text-primary-600 hover:bg-primary-50 dark:text-dark-muted dark:hover:bg-dark-surface transition-colors"
              >
                <span className="font-medium text-primary-800 dark:text-dark-text">{series.title}</span>
                <span className="block text-xs text-primary-400 dark:text-dark-muted mt-0.5">
                  {series.description}
                </span>
              </Link>
            ))}
          <hr className="my-1 border-primary-200 dark:border-dark-border" />
          <Link
            to={ROUTES.SERIES}
            className="block px-4 py-2.5 text-sm font-medium text-secondary-600 hover:bg-primary-50 dark:text-secondary-400 dark:hover:bg-dark-surface transition-colors"
          >
            View All Series
          </Link>
        </div>
      )}
    </div>
  );
}
