/**
 * Event service — all API calls related to events.
 *
 * Public endpoints: getEvents, getEvent
 * Protected endpoints: createEvent, updateEvent, deleteEvent, restoreEvent
 *
 * @see src/hooks/useEvents.js       — public event listing hook
 * @see src/hooks/useAdminEvents.js  — admin event listing hook
 */
import api from './api';
import logger from '@/utils/logger';

/**
 * Fetch events with optional pagination and status filter.
 * @param {{ page?: number, limit?: number, status?: string }} params
 * @returns {Promise<{ data: object[], pagination: object }>}
 */
export async function getEvents({ page, limit, status } = {}) {
  const params = {};
  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (status) params.status = status;

  logger.debug('EventService', 'Fetching events', { status });
  return api.get('/events', { params });
}

/**
 * Fetch a single event by slug or uuid.
 * @param {string} identifier
 * @returns {Promise<object>}
 */
export async function getEvent(identifier) {
  logger.debug('EventService', `Fetching event: ${identifier}`);
  return api.get(`/events/${identifier}`);
}

/**
 * Create a new event (auth required).
 * @param {object} data — { title, description?, date, end_date?, location?, registration_url?, is_virtual?, status? }
 * @returns {Promise<object>}
 */
export async function createEvent(data) {
  logger.info('EventService', 'Creating new event');
  return api.post('/events', data);
}

/**
 * Update an existing event (auth required).
 * @param {string} uuid
 * @param {object} data — partial event fields
 * @returns {Promise<object>}
 */
export async function updateEvent(uuid, data) {
  logger.info('EventService', `Updating event ${uuid}`);
  return api.put(`/events/${uuid}`, data);
}

/**
 * Soft-delete an event (auth required).
 * @param {string} uuid
 * @returns {Promise<object>}
 */
export async function deleteEvent(uuid) {
  logger.info('EventService', `Soft-deleting event ${uuid}`);
  return api.delete(`/events/${uuid}`);
}

/**
 * Restore a soft-deleted event (auth required).
 * @param {string} uuid
 * @returns {Promise<object>}
 */
export async function restoreEvent(uuid) {
  logger.info('EventService', `Restoring event ${uuid}`);
  return api.patch(`/events/${uuid}/restore`);
}
