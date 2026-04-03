/**
 * Tabular list of admin/editor accounts.
 *
 * Displays accounts with columns for Name, Email, Role, Status, and Actions.
 * Inactive accounts render with muted/dimmed styling.
 * Role uses color-coded badges (admin = blue, editor = default).
 *
 * Mobile: wraps in overflow-x-auto with min-w-[600px] for horizontal scroll.
 *
 * Used by: AccountManagementPage.
 *
 * @param {object} props
 * @param {Array} props.accounts - Array of account objects
 * @param {(account: object) => void} props.onEdit - Called with the account to edit
 * @param {(uuid: string) => void} props.onDeactivate - Called when deactivate is clicked
 */
import { Edit2, UserX } from 'lucide-react';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/cn';

export default function AccountTable({ accounts, onEdit, onDeactivate }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-primary-200 dark:border-dark-border">
      <table className="min-w-[600px] w-full text-sm">
        <thead>
          <tr className="border-b border-primary-200 dark:border-dark-border bg-primary-50 dark:bg-dark-surface">
            <th className="px-4 py-3 text-left font-medium text-primary-600 dark:text-dark-muted">Name</th>
            <th className="px-4 py-3 text-left font-medium text-primary-600 dark:text-dark-muted">Email</th>
            <th className="px-4 py-3 text-left font-medium text-primary-600 dark:text-dark-muted">Role</th>
            <th className="px-4 py-3 text-left font-medium text-primary-600 dark:text-dark-muted">Status</th>
            <th className="px-4 py-3 text-right font-medium text-primary-600 dark:text-dark-muted">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-100 dark:divide-dark-border">
          {accounts.map((account) => {
            const isInactive = account.status === 'inactive';

            return (
              <tr
                key={account.uuid}
                className={cn(
                  'bg-white dark:bg-dark-surface2 transition-colors',
                  isInactive
                    ? 'opacity-60'
                    : 'hover:bg-primary-50 dark:hover:bg-dark-surface'
                )}
              >
                {/* Name */}
                <td className="px-4 py-3 font-medium text-primary-800 dark:text-dark-text">
                  {account.name}
                </td>

                {/* Email */}
                <td className="px-4 py-3 text-primary-600 dark:text-dark-muted">
                  {account.email}
                </td>

                {/* Role */}
                <td className="px-4 py-3">
                  <Badge variant={account.role === 'admin' ? 'blue' : 'default'}>
                    {account.role}
                  </Badge>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <Badge variant={isInactive ? 'red' : 'green'}>
                    {isInactive ? 'Inactive' : 'Active'}
                  </Badge>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {/* Edit */}
                    <button
                      onClick={() => onEdit(account)}
                      className="p-2 rounded-lg text-primary-500 hover:text-secondary-600 hover:bg-secondary-50 dark:text-dark-muted dark:hover:text-secondary-400 dark:hover:bg-secondary-900/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label={`Edit ${account.name}`}
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>

                    {/* Deactivate (only for active accounts) */}
                    {!isInactive && (
                      <button
                        onClick={() => onDeactivate(account.uuid)}
                        className="p-2 rounded-lg text-primary-500 hover:text-red-600 hover:bg-red-50 dark:text-dark-muted dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={`Deactivate ${account.name}`}
                        title="Deactivate"
                      >
                        <UserX className="h-4 w-4" />
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
