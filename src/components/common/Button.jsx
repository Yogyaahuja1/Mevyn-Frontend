/**
 * Reusable Button component with multiple visual variants.
 *
 * Variants: primary (blue), secondary (outline), danger (red), ghost (transparent)
 * Sizes: sm, md, lg
 *
 * Used across the entire app — forms, actions, navigation.
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'danger'|'ghost'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.loading]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
import { cn } from '@/utils/cn';

const variants = {
  primary:
    'bg-secondary-600 text-white hover:bg-secondary-700 dark:bg-secondary-500 dark:hover:bg-secondary-600',
  secondary:
    'border border-primary-300 text-primary-700 hover:bg-primary-100 dark:border-dark-border dark:text-dark-text dark:hover:bg-dark-surface2',
  danger:
    'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
  ghost:
    'text-primary-600 hover:bg-primary-100 dark:text-dark-muted dark:hover:bg-dark-surface2',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'min-h-[44px] min-w-[44px]', // Touch-friendly minimum target
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
