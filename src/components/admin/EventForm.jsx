/**
 * EventForm - Form component for creating and editing events.
 *
 * Renders all event fields with proper input types and pre-fills when
 * an existing event is provided for editing.
 *
 * @param {object} props
 * @param {object|null} props.event - Existing event data for edit mode, null for create
 * @param {function} props.onSave - Called with the form data object
 * @param {boolean} props.loading - Shows loading state on the save button
 */
import { useState, useEffect } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { cn } from '@/utils/cn';

/**
 * Format a date string (ISO or other) into the datetime-local input format.
 * Returns empty string if input is falsy.
 */
function toDatetimeLocal(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  // datetime-local expects YYYY-MM-DDTHH:mm
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const INITIAL_STATE = {
  title: '',
  description: '',
  date: '',
  end_date: '',
  location_name: '',
  location_address: '',
  is_virtual: false,
  registration_url: '',
  status: 'upcoming',
};

export default function EventForm({ event = null, onSave, loading = false }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  // Pre-fill form when event prop changes (edit mode)
  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || '',
        description: event.description || '',
        date: toDatetimeLocal(event.date),
        end_date: toDatetimeLocal(event.end_date),
        location_name: event.location?.name || event.location_name || '',
        location_address: event.location?.address || event.location_address || '',
        is_virtual: event.is_virtual || false,
        registration_url: event.registration_url || '',
        status: event.status || 'upcoming',
      });
    }
  }, [event]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required.';
    if (!form.date) newErrors.date = 'Event date is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Build the payload, converting datetime-local strings to ISO
    const payload = {
      title: form.title,
      description: form.description || undefined,
      date: form.date ? new Date(form.date).toISOString() : undefined,
      end_date: form.end_date ? new Date(form.end_date).toISOString() : undefined,
      is_virtual: form.is_virtual,
      registration_url: form.registration_url || undefined,
      status: form.status,
    };

    // Only include location when at least one field has a value
    if (form.location_name || form.location_address) {
      payload.location = {
        name: form.location_name || undefined,
        address: form.location_address || undefined,
      };
    }

    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <Input
        label="Title"
        name="title"
        value={form.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Event title"
        error={errors.title}
        required
      />

      {/* Description */}
      <div className="space-y-1">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-primary-700 dark:text-dark-text"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe the event..."
          className={cn(
            'block w-full rounded-lg border px-3 py-2 text-sm transition-colors',
            'bg-white border-primary-300 text-primary-800 placeholder-primary-400',
            'dark:bg-dark-surface2 dark:border-dark-border dark:text-dark-text dark:placeholder-dark-muted',
            'focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500',
            'resize-y'
          )}
        />
      </div>

      {/* Date fields in a row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Start Date & Time"
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={(e) => handleChange('date', e.target.value)}
          error={errors.date}
          required
        />
        <Input
          label="End Date & Time"
          name="end_date"
          type="datetime-local"
          value={form.end_date}
          onChange={(e) => handleChange('end_date', e.target.value)}
        />
      </div>

      {/* Location fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Location Name"
          name="location_name"
          value={form.location_name}
          onChange={(e) => handleChange('location_name', e.target.value)}
          placeholder="e.g. Conference Hall A"
        />
        <Input
          label="Location Address"
          name="location_address"
          value={form.location_address}
          onChange={(e) => handleChange('location_address', e.target.value)}
          placeholder="e.g. 123 Main St, City"
        />
      </div>

      {/* Virtual checkbox */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is_virtual"
          name="is_virtual"
          checked={form.is_virtual}
          onChange={(e) => handleChange('is_virtual', e.target.checked)}
          className={cn(
            'h-4 w-4 rounded border-primary-300 text-secondary-600',
            'focus:ring-secondary-500',
            'dark:border-dark-border dark:bg-dark-surface2'
          )}
        />
        <label
          htmlFor="is_virtual"
          className="text-sm text-primary-700 dark:text-dark-text"
        >
          This is a virtual event
        </label>
      </div>

      {/* Registration URL */}
      <Input
        label="Registration URL"
        name="registration_url"
        type="url"
        value={form.registration_url}
        onChange={(e) => handleChange('registration_url', e.target.value)}
        placeholder="https://..."
      />

      {/* Status */}
      <div className="space-y-1">
        <label
          htmlFor="event_status"
          className="block text-sm font-medium text-primary-700 dark:text-dark-text"
        >
          Status
        </label>
        <select
          id="event_status"
          name="status"
          value={form.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className={cn(
            'block w-full rounded-lg border px-3 py-2 text-sm transition-colors',
            'bg-white border-primary-300 text-primary-800',
            'dark:bg-dark-surface2 dark:border-dark-border dark:text-dark-text',
            'focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500',
            'min-h-[44px]'
          )}
        >
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Submit */}
      <div className="pt-2">
        <Button type="submit" loading={loading} disabled={loading}>
          {event ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
}
