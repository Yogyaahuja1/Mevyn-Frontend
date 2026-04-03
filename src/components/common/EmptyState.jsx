/**
 * Empty state placeholder shown when a list has no results.
 *
 * Used by: BlogListingPage, PostManagementPage, EventManagementPage.
 *
 * @param {object} props
 * @param {string} props.title - Bold heading (e.g., "No posts found")
 * @param {string} [props.description] - Supporting text
 * @param {React.ReactNode} [props.action] - Optional CTA button
 */
import { Inbox } from 'lucide-react';

export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <Inbox className="h-12 w-12 text-primary-300 dark:text-dark-muted" />
      <h3 className="text-lg font-medium text-primary-700 dark:text-dark-text">{title}</h3>
      {description && (
        <p className="text-sm text-primary-500 dark:text-dark-muted max-w-sm">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
