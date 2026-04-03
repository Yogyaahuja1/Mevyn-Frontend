/**
 * Tabular list of posts for admin management.
 *
 * Displays posts with columns for Title, Status, Author, Date, and Actions.
 * Title links to the edit page. Status uses color-coded badges.
 * Anonymous posts show the ANONYMOUS_AUTHOR constant as the author name.
 *
 * Mobile: wraps in overflow-x-auto with min-w-[600px] for horizontal scroll.
 *
 * Used by: PostManagementPage.
 *
 * @param {object} props
 * @param {Array} props.posts - Array of post objects
 * @param {(uuid: string) => void} props.onDelete - Called when delete is clicked
 * @param {(uuid: string) => void} props.onRestore - Called when restore is clicked
 */
import { Link } from 'react-router-dom';
import { Edit2, Trash2, RotateCcw } from 'lucide-react';
import Badge from '@/components/common/Badge';
import { formatDate } from '@/utils/formatDate';
import { ROUTES } from '@/config/routes';
import { ANONYMOUS_AUTHOR } from '@/config/constants';

const statusMap = {
  published: { label: 'Published', variant: 'green' },
  draft: { label: 'Draft', variant: 'yellow' },
  deleted: { label: 'Deleted', variant: 'red' },
};

export default function PostTable({ posts, onDelete, onRestore }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-primary-200 dark:border-dark-border">
      <table className="min-w-[600px] w-full text-sm">
        <thead>
          <tr className="border-b border-primary-200 dark:border-dark-border bg-primary-50 dark:bg-dark-surface">
            <th className="px-4 py-3 text-left font-medium text-primary-600 dark:text-dark-muted">Title</th>
            <th className="px-4 py-3 text-left font-medium text-primary-600 dark:text-dark-muted">Status</th>
            <th className="px-4 py-3 text-left font-medium text-primary-600 dark:text-dark-muted">Author</th>
            <th className="px-4 py-3 text-left font-medium text-primary-600 dark:text-dark-muted">Date</th>
            <th className="px-4 py-3 text-right font-medium text-primary-600 dark:text-dark-muted">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-100 dark:divide-dark-border">
          {posts.map((post) => {
            const status = statusMap[post.status] || statusMap.draft;
            const isDeleted = post.status === 'deleted';
            const author = post.anonymous ? ANONYMOUS_AUTHOR : post.author?.name || 'Unknown';

            return (
              <tr
                key={post.uuid}
                className="bg-white dark:bg-dark-surface2 hover:bg-primary-50 dark:hover:bg-dark-surface transition-colors"
              >
                {/* Title */}
                <td className="px-4 py-3">
                  <Link
                    to={ROUTES.ADMIN_POST_EDIT.replace(':uuid', post.uuid)}
                    className="font-medium text-primary-800 dark:text-dark-text hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <Badge variant={status.variant}>{status.label}</Badge>
                </td>

                {/* Author */}
                <td className="px-4 py-3 text-primary-600 dark:text-dark-muted">{author}</td>

                {/* Date */}
                <td className="px-4 py-3 text-primary-500 dark:text-dark-muted whitespace-nowrap">
                  {formatDate(post.createdAt)}
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {/* Edit */}
                    <Link
                      to={ROUTES.ADMIN_POST_EDIT.replace(':uuid', post.uuid)}
                      className="p-2 rounded-lg text-primary-500 hover:text-secondary-600 hover:bg-secondary-50 dark:text-dark-muted dark:hover:text-secondary-400 dark:hover:bg-secondary-900/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label={`Edit ${post.title}`}
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Link>

                    {/* Delete or Restore */}
                    {isDeleted ? (
                      <button
                        onClick={() => onRestore(post.uuid)}
                        className="p-2 rounded-lg text-primary-500 hover:text-green-600 hover:bg-green-50 dark:text-dark-muted dark:hover:text-green-400 dark:hover:bg-green-900/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={`Restore ${post.title}`}
                        title="Restore"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onDelete(post.uuid)}
                        className="p-2 rounded-lg text-primary-500 hover:text-red-600 hover:bg-red-50 dark:text-dark-muted dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={`Delete ${post.title}`}
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
