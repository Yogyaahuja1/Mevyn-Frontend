/**
 * Error display component with optional retry button.
 *
 * Used by pages and data-fetching components when an API call fails.
 *
 * @param {object} props
 * @param {string} props.message - The error message to display
 * @param {Function} [props.onRetry] - If provided, shows a "Try Again" button
 */
import { AlertCircle } from 'lucide-react';
import Button from './Button';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center" role="alert">
      <AlertCircle className="h-10 w-10 text-red-500 dark:text-red-400" />
      <p className="text-primary-600 dark:text-dark-muted max-w-md">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
