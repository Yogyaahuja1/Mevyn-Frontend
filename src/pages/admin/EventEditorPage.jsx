/**
 * EventEditorPage - Form for creating and editing events.
 *
 * Route: /admin/events/new      (create mode)
 * Route: /admin/events/:uuid    (edit mode)
 * Protected route requiring authentication.
 *
 * Wraps EventForm and handles fetching, saving, and navigation.
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import EventForm from '@/components/admin/EventForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { createEvent, updateEvent, getEvent } from '@/services/eventService';
import { ROUTES } from '@/config/routes';
import logger from '@/utils/logger';

export default function EventEditorPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(uuid);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useDocumentTitle(isEditMode ? `Edit: ${event?.title || 'Event'}` : 'New Event');

  // Fetch existing event data when in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    let cancelled = false;

    async function fetchEvent() {
      try {
        setLoading(true);
        const res = await getEvent(uuid);
        const data = res.data || res;

        if (!cancelled) setEvent(data);
      } catch (err) {
        logger.error('EventEditorPage', 'Failed to fetch event', err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchEvent();
    return () => { cancelled = true; };
  }, [uuid, isEditMode]);

  /**
   * Save event — delegates to create or update based on mode.
   */
  const handleSave = async (formData) => {
    try {
      setSaving(true);
      setError(null);

      if (isEditMode) {
        await updateEvent(uuid, formData);
        logger.info('EventEditorPage', `Event ${uuid} updated`);
      } else {
        await createEvent(formData);
        logger.info('EventEditorPage', 'New event created');
      }

      navigate(ROUTES.ADMIN_EVENTS);
    } catch (err) {
      logger.error('EventEditorPage', 'Failed to save event', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading event..." />;
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-primary-900 dark:text-dark-text mb-6">
        {isEditMode ? `Edit: ${event?.title || 'Untitled'}` : 'New Event'}
      </h1>

      {/* Error banner */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Event form */}
      <div className="rounded-lg border bg-white p-6 dark:bg-dark-surface dark:border-dark-border">
        <EventForm event={event} onSave={handleSave} loading={saving} />
      </div>
    </div>
  );
}
