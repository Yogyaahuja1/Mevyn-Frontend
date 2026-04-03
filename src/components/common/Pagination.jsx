/**
 * Pagination controls — previous/next buttons with page numbers.
 *
 * Adapts to mobile (prev/next only) and desktop (numbered pages).
 * Used by BlogListingPage, PostManagementPage, EventManagementPage.
 *
 * @param {object} props
 * @param {number} props.page - Current page (1-indexed)
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Called with new page number
 */
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Generate page numbers to display (show up to 5 pages around current)
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  const buttonBase =
    'flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-sm font-medium transition-colors';

  return (
    <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Pagination">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={cn(buttonBase, 'px-3 text-primary-600 hover:bg-primary-100 dark:text-dark-muted dark:hover:bg-dark-surface2 disabled:opacity-30 disabled:cursor-not-allowed')}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline ml-1">Prev</span>
      </button>

      {/* Page numbers — hidden on very small screens */}
      <div className="hidden sm:flex items-center gap-1">
        {start > 1 && (
          <>
            <PageButton page={1} current={page} onClick={onPageChange} base={buttonBase} />
            {start > 2 && <span className="px-2 text-primary-400 dark:text-dark-muted">...</span>}
          </>
        )}
        {pages.map((p) => (
          <PageButton key={p} page={p} current={page} onClick={onPageChange} base={buttonBase} />
        ))}
        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="px-2 text-primary-400 dark:text-dark-muted">...</span>}
            <PageButton page={totalPages} current={page} onClick={onPageChange} base={buttonBase} />
          </>
        )}
      </div>

      {/* Mobile page indicator */}
      <span className="sm:hidden text-sm text-primary-500 dark:text-dark-muted px-3">
        {page} / {totalPages}
      </span>

      {/* Next button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={cn(buttonBase, 'px-3 text-primary-600 hover:bg-primary-100 dark:text-dark-muted dark:hover:bg-dark-surface2 disabled:opacity-30 disabled:cursor-not-allowed')}
        aria-label="Next page"
      >
        <span className="hidden sm:inline mr-1">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

/** Individual page number button */
function PageButton({ page, current, onClick, base }) {
  const isActive = page === current;
  return (
    <button
      onClick={() => onClick(page)}
      className={cn(
        base,
        isActive
          ? 'bg-secondary-600 text-white dark:bg-secondary-500'
          : 'text-primary-600 hover:bg-primary-100 dark:text-dark-muted dark:hover:bg-dark-surface2'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {page}
    </button>
  );
}
