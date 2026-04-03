/**
 * AccountManagementPage - Admin page for managing user accounts and roles.
 *
 * Route: /admin/accounts
 * Protected route requiring authentication with admin role.
 *
 * Features:
 * - Redirects editors to /admin with an informational message
 * - Header with title and "New Account" button
 * - AccountTable showing all admin/editor accounts
 * - AccountForm modal for creating and editing accounts
 * - Create, edit, and deactivate handlers with refetch
 *
 * Uses useAccounts hook for fetching accounts.
 * Uses useAuth for role-based access control.
 *
 * @returns {JSX.Element}
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useAuth } from '@/hooks/useAuth';
import { useAccounts } from '@/hooks/useAccounts';
import { createAccount, updateAccount, deactivateAccount } from '@/services/authService';
import { ROUTES } from '@/config/routes';
import AccountTable from '@/components/admin/AccountTable';
import AccountForm from '@/components/admin/AccountForm';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import EmptyState from '@/components/common/EmptyState';
import logger from '@/utils/logger';

export default function AccountManagementPage() {
  useDocumentTitle('Manage Accounts');

  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  // Redirect editors away from this page
  useEffect(() => {
    if (user && !isAdmin) {
      logger.info('AccountManagement', 'Non-admin user redirected from accounts page');
      navigate(ROUTES.ADMIN, { replace: true });
    }
  }, [user, isAdmin, navigate]);

  const { accounts, isLoading, error, refetch } = useAccounts();

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  /** Open modal for creating a new account. */
  function handleNewAccount() {
    setEditingAccount(null);
    setIsFormOpen(true);
  }

  /** Open modal for editing an existing account. */
  function handleEdit(account) {
    setEditingAccount(account);
    setIsFormOpen(true);
  }

  /** Close the modal and reset editing state. */
  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingAccount(null);
  }

  /**
   * Handle form submission for both create and edit.
   * @param {object} data - Form data { name, email, password?, role }
   */
  async function handleSave(data) {
    setFormLoading(true);
    try {
      if (editingAccount) {
        await updateAccount(editingAccount.uuid, data);
        logger.info('AccountManagement', `Updated account ${editingAccount.uuid}`);
      } else {
        await createAccount(data);
        logger.info('AccountManagement', 'Created new account');
      }
      handleCloseForm();
      refetch();
    } catch (err) {
      logger.error('AccountManagement', 'Failed to save account', { message: err.message });
    } finally {
      setFormLoading(false);
    }
  }

  /**
   * Deactivate an account and refresh the list.
   * @param {string} uuid
   */
  async function handleDeactivate(uuid) {
    try {
      await deactivateAccount(uuid);
      logger.info('AccountManagement', `Deactivated account ${uuid}`);
      refetch();
    } catch (err) {
      logger.error('AccountManagement', `Failed to deactivate account ${uuid}`, {
        message: err.message,
      });
    }
  }

  // Don't render anything for non-admin users (redirect is in progress)
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-800 dark:text-dark-text">
          Team Accounts
        </h1>
        <Button onClick={handleNewAccount}>
          <Plus className="h-4 w-4" />
          New Account
        </Button>
      </div>

      {/* Content area */}
      {isLoading ? (
        <LoadingSpinner message="Loading accounts..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : accounts.length === 0 ? (
        <EmptyState
          title="No accounts found"
          description="Create the first team account to get started."
          action={
            <Button size="sm" onClick={handleNewAccount}>
              Create Account
            </Button>
          }
        />
      ) : (
        <AccountTable
          accounts={accounts}
          onEdit={handleEdit}
          onDeactivate={handleDeactivate}
        />
      )}

      {/* Account create/edit modal */}
      <AccountForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        account={editingAccount}
        onSave={handleSave}
        loading={formLoading}
      />
    </div>
  );
}
