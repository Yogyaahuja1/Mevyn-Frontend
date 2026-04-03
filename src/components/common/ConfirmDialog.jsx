/**
 * Confirmation dialog for destructive actions.
 *
 * Wraps Modal with a standardized "Are you sure?" pattern.
 * Used before deleting posts, deactivating accounts, etc.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {Function} props.onConfirm - Called when user clicks the confirm button
 * @param {string} [props.title='Confirm Action']
 * @param {string} [props.message]
 * @param {string} [props.confirmText='Confirm']
 * @param {'primary'|'danger'} [props.variant='danger']
 */
import Modal from './Modal';
import Button from './Button';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Confirm',
  variant = 'danger',
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-primary-600 dark:text-dark-muted mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant={variant} onClick={() => { onConfirm(); onClose(); }}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
