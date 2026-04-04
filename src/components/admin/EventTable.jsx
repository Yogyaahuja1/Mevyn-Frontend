/**
 * Tabular list of events for admin management.
 *
 * Displays events with columns for Title, Date, Location, Virtual status,
 * and Actions (Edit, Delete/Restore).
 *
 * Mobile: wraps in overflow-x-auto with min-w-[600px] for horizontal scroll.
 *
 * Used by: EventManagementPage.
 *
 * @param {object} props
 * @param {Array} props.events - Array of event objects
 * @param {(uuid: string) => void} props.onDelete - Called when delete is clicked
 * @param {(uuid: string) => void} props.onRestore - Called when restore is clicked
 */
import { Link } from 'react-router-dom';
import { Edit2, Trash2, RotateCcw } from 'lucide-react';
import Badge from '@/components/common/Badge';
import { formatDate } from '@/utils/formatDate';
import { ROUTES } from '@/config/routes';

export default function EventTable({ events, onDelete, onRestore }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-primary-200 dark:border-dark-border">
      <table className="min-w-[600px] w-full text-sm">
        <thead>
          <tr className="border-b border-primary-200 dark:border-dark-border bg-primary-50 dark:bg-dark-surface">
            <th className="px-4 py-3 text-left font-medium text-primary-600 dark:text-dark-muted">Title</th>
            <th className="px-4 py-3 text-left font-medium text-primary-600 dark:text-dark-muted">Date</th>
            <th className="px-4 py-3 text-left font-medium text-primary-600 dark:text-dark-muted">Location</th>
            <th className="px-4 py-3 text-left font-medium text-primary-600 dark:text-dark-muted">Virtual</th>
            <th className="px-4 py-3 text-right font-medium text-primary-600 dark:text-dark-muted">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-100 dark:divide-dark-border">
          {events.map((event) => {
            const isDeleted = event.status === 'deleted';

            return (
              <tr
                key={event.uuid}
                className="bg-white dark:bg-dark-surface2 hover:bg-primary-50 dark:hover:bg-dark-surface transition-colors"
              >
                {/* Title */}
                <td className="px-4 py-3">
                  <Link
                    to={ROUTES.ADMIN_EVENT_EDIT.replace(':uuid', event.uuid)}
                    className="font-medium text-primary-800 dark:text-dark-text hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors"
                  >
                    {event.title}
                  </Link>
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-primary-500 dark:text-dark-muted whitespace-nowrap">
                  {formatDate(event.date)}
                </td>

                {/* Location */}
                <td className="px-4 py-3 text-primary-600 dark:text-dark-muted">
                  {event.location?.name || '-'}
                </td>

                {/* Virtual */}
                <td className="px-4 py-3">
                  {event.is_virtual ? (
                    <Badge variant="blue">Virtual</Badge>
                  ) : (
                    <span className="text-primary-400 dark:text-dark-muted">In-Person</span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {/* Edit */}
                    <Link
                      to={ROUTES.ADMIN_EVENT_EDIT.replace(':uuid', event.uuid)}
                      className="p-2 rounded-lg text-primary-500 hover:text-secondary-600 hover:bg-secondary-50 dark:text-dark-muted dark:hover:text-secondary-400 dark:hover:bg-secondary-900/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label={`Edit ${event.title}`}
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Link>

                    {/* Delete or Restore */}
                    {isDeleted ? (
                      <button
                        onClick={() => onRestore(event.uuid)}
                        className="p-2 rounded-lg text-primary-500 hover:text-green-600 hover:bg-green-50 dark:text-dark-muted dark:hover:text-green-400 dark:hover:bg-green-900/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={`Restore ${event.title}`}
                        title="Restore"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onDelete(event.uuid)}
                        className="p-2 rounded-lg text-primary-500 hover:text-red-600 hover:bg-red-50 dark:text-dark-muted dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={`Delete ${event.title}`}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
