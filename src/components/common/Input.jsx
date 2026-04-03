/**
 * Styled Input component with label and error state.
 *
 * Used in: LoginPage, PostMetadataPanel, EventForm, AccountForm.
 *
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} [props.error] - Error message to display below input
 * @param {string} [props.className]
 */
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(function Input({ label, error, className, id, ...props }, ref) {
  const inputId = id || props.name;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-primary-700 dark:text-dark-text">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          'block w-full rounded-lg border px-3 py-2 text-sm transition-colors',
          'bg-white border-primary-300 text-primary-800 placeholder-primary-400',
          'dark:bg-dark-surface2 dark:border-dark-border dark:text-dark-text dark:placeholder-dark-muted',
          'focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500',
          'min-h-[44px]', // Touch-friendly
          error && 'border-red-500 dark:border-red-400',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
});

export default Input;
