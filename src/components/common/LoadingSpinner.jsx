/**
 * Centered loading spinner.
 *
 * Displayed during data fetches, auth checks, and page transitions.
 * Renders at full container height by default.
 *
 * @param {object} props
 * @param {string} [props.message] - Optional text below the spinner
 * @param {boolean} [props.fullPage] - If true, takes full viewport height
 */
import { cn } from '@/utils/cn';

export default function LoadingSpinner({ message, fullPage = false }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3',
        fullPage ? 'min-h-screen' : 'min-h-[200px]'
      )}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="animate-spin h-8 w-8 text-secondary-600 dark:text-secondary-400"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      {message && (
        <p className="text-sm text-primary-500 dark:text-dark-muted">{message}</p>
      )}
    </div>
  );
}
