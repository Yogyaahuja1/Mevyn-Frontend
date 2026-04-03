/**
 * Dashboard metric card for displaying a single stat.
 *
 * Renders a Lucide icon, a text label, and a large value number inside
 * a card with light/dark variants and an optional accent color.
 *
 * Used by: AdminDashboardPage.
 *
 * @param {object} props
 * @param {import('lucide-react').LucideIcon} props.icon - Lucide icon component
 * @param {string} props.label - Metric label (e.g., "Total Posts")
 * @param {string|number} props.value - Metric value
 * @param {'blue'|'green'|'yellow'} [props.color='blue'] - Accent color for the icon background
 */
import { cn } from '@/utils/cn';

const iconColors = {
  blue: 'bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400',
  green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
};

export default function StatsCard({ icon: Icon, label, value, color = 'blue' }) {
  return (
    <div
      className={cn(
        'rounded-xl border p-5',
        'bg-white border-primary-200 dark:bg-dark-surface2 dark:border-dark-border'
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg',
            iconColors[color]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-primary-500 dark:text-dark-muted truncate">{label}</p>
          <p className="text-2xl font-bold text-primary-800 dark:text-dark-text">{value}</p>
        </div>
      </div>
    </div>
  );
}
