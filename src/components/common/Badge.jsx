/**
 * Badge component for tags and status indicators.
 *
 * Variants:
 *   default  — neutral gray
 *   blue     — informational / tag
 *   green    — published / success
 *   yellow   — draft / warning
 *   red      — deleted / error
 *
 * Used by: PostCard (tags), PostTable (status), EventTable (status)
 *
 * @param {object} props
 * @param {'default'|'blue'|'green'|'yellow'|'red'} [props.variant='default']
 * @param {React.ReactNode} props.children
 */
import { cn } from '@/utils/cn';

const variants = {
  default: 'bg-primary-100 text-primary-700 dark:bg-dark-surface2 dark:text-dark-muted',
  blue: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function Badge({ variant = 'default', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
