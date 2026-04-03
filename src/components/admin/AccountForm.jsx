/**
 * Create/edit account modal form.
 *
 * When `account` is null, renders a "Create Account" form with name, email,
 * password, and role fields. When editing an existing account, the password
 * field is hidden and the form title changes to "Edit Account".
 *
 * Uses Modal, Input, and Button from common components.
 * Validates required fields and shows inline error messages.
 *
 * Used by: AccountManagementPage.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Called to close the modal
 * @param {object|null} [props.account=null] - Existing account for editing, null for create
 * @param {(data: object) => void} props.onSave - Called with form data on submit
 */
import { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { cn } from '@/utils/cn';

const INITIAL_FORM = { name: '', email: '', password: '', role: 'editor' };

export default function AccountForm({ isOpen, onClose, account = null, onSave }) {
  const isEdit = Boolean(account);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  // Populate form when editing, reset when creating
  useEffect(() => {
    if (isOpen) {
      if (account) {
        setForm({
          name: account.name || '',
          email: account.email || '',
          password: '',
          role: account.role || 'editor',
        });
      } else {
        setForm(INITIAL_FORM);
      }
      setErrors({});
    }
  }, [isOpen, account]);

  /** Update a single form field. */
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  /** Validate fields and call onSave. */
  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!isEdit && !form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!isEdit && form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Build payload — omit password when editing
    const data = { name: form.name.trim(), email: form.email.trim(), role: form.role };
    if (!isEdit) {
      data.password = form.password;
    }
    onSave(data);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Account' : 'Create Account'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Full name"
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="user@example.com"
        />

        {/* Password field — only shown when creating a new account */}
        {!isEdit && (
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Minimum 8 characters"
          />
        )}

        {/* Role select */}
        <div className="space-y-1">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-primary-700 dark:text-dark-text"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className={cn(
              'block w-full rounded-lg border px-3 py-2 text-sm transition-colors',
              'bg-white border-primary-300 text-primary-800',
              'dark:bg-dark-surface2 dark:border-dark-border dark:text-dark-text',
              'focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500',
              'min-h-[44px]'
            )}
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {isEdit ? 'Save Changes' : 'Create Account'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
