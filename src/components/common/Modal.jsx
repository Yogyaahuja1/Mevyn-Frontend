/**
 * Overlay modal component with backdrop.
 *
 * Renders children in a centered card over a dark backdrop.
 * Closes on Escape key and backdrop click.
 *
 * Used by: AccountForm, ConfirmDialog, and other overlays.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {string} [props.title] - Modal heading
 * @param {React.ReactNode} props.children
 */
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function Modal({ isOpen, onClose, title, className, children }) {
  const overlayRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={cn(
          'w-full max-w-lg rounded-xl shadow-xl',
          'bg-white dark:bg-dark-surface2',
          'border border-primary-200 dark:border-dark-border',
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-primary-200 dark:border-dark-border">
            <h2 className="text-lg font-semibold text-primary-800 dark:text-dark-text">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-primary-400 hover:text-primary-600 dark:text-dark-muted dark:hover:text-dark-text min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
