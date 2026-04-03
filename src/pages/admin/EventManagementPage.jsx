/**
 * EventManagementPage - Admin table for managing all events.
 *
 * Route: /admin/events
 * Protected route requiring authentication.
 *
 * Features:
 * - Header with title and "New Event" button
 * - EventTable with edit, delete, and restore actions
 * - Pagination controls
 * - Delete handler (soft-delete) and Restore handler with refetch
 *
 * Uses useAdminEvents hook with page state.
 *
 * @returns {JSX.Element}
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useAdminEvents } from '@/hooks/useAdminEvents';
import { deleteEvent, restoreEvent } from '@/services/eventService';
import { ROUTES } from '@/config/routes';
import EventTable from '@/components/admin/EventTable';
import Pagination from '@/components/common/Pagination';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import EmptyState from '@/components/common/EmptyState';
import logger from '@/utils/logger';

export default function EventManagementPage() {
  useDocumentTitle('Manage Events');

  const [page, setPage] = useState(1);

  const { events, pagination, isLoading, error, refetch } = useAdminEvents({ page });

  /**
   * Soft-delete an event and refresh the list.
   * @param {string} uuid
   */
  async function handleDelete(uuid) {
    try {
      await deleteEvent(uuid);
      refetch();
    } catch (err) {
      logger.error('EventManagement', `Failed to delete event ${uuid}`, { message: err.message });
    }
  }

  /**
   * Restore a soft-deleted event and refresh the list.
   * @param {string} uuid
   */
  async function handleRestore(uuid) {
    try {
      await restoreEvent(uuid);
      refetch();
    } catch (err) {
      logger.error('EventManagement', `Failed to restore event ${uuid}`, { message: err.message });
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-800 dark:text-dark-text">
          Events
        </h1>
        <Link to={ROUTES.ADMIN_EVENT_NEW}>
          <Button>
            <Plus className="h-4 w-4" />
            New Event
          </Button>
        </Link>
      </div>

      {/* Content area */}
      {isLoading ? (
        <LoadingSpinner message="Loading events..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : events.length === 0 ? (
        <EmptyState
          title="No events found"
          description="Get started by creating your first event."
          action={
            <Link to={ROUTES.ADMIN_EVENT_NEW}>
              <Button size="sm">Create Event</Button>
            </Link>
          }
        />
      ) : (
        <>
          <EventTable
            events={events}
            onDelete={handleDelete}
            onRestore={handleRestore}
          />

          {/* Pagination */}
          {pagination && (
            <Pagination
              page={page}
              totalPages={pagination.totalPages || 1}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
