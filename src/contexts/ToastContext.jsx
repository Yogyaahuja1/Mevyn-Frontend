/**
 * ToastContext — manages a queue of toast notifications.
 *
 * State:
 *   toasts: Array<{ id: number, message: string, type: 'success'|'error'|'info' }>
 *
 * Actions:
 *   addToast(message, type='success') — adds a toast, auto-removes after 4 seconds
 *   removeToast(id)                   — manually dismisses a toast
 *
 * The provider renders a fixed bottom-right container that displays
 * all active toasts. Each toast shows a type-appropriate icon, the
 * message text, and an X close button. Toasts animate in from the
 * right and stack vertically.
 *
 * Used by: any admin action that needs user feedback
 * @see src/hooks/useToast.js — shorthand hook
 */
import { createContext, useState, useCallback, useRef } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import logger from '@/utils/logger';

export const ToastContext = createContext(null);

/* ---------- helpers ---------- */

let nextId = 1;

const ICON_MAP = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const COLOR_MAP = {
  success:
    'bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800',
  error:
    'bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800',
  info:
    'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800',
};

const ICON_COLOR_MAP = {
  success: 'text-green-500 dark:text-green-400',
  error: 'text-red-500 dark:text-red-400',
  info: 'text-blue-500 dark:text-blue-400',
};

const AUTO_DISMISS_MS = 4000;

/* ---------- provider ---------- */

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const removeToast = useCallback((id) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = 'success') => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, message, type }]);
      logger.debug('Toast', `${type}: ${message}`);

      // Auto-dismiss after 4 seconds
      timersRef.current[id] = setTimeout(() => {
        removeToast(id);
      }, AUTO_DISMISS_MS);

      return id;
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}

      {/* ---- toast container (fixed bottom-right) ---- */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((toast) => {
          const Icon = ICON_MAP[toast.type] || Info;
          return (
            <div
              key={toast.id}
              className={`
                pointer-events-auto flex items-center gap-3 rounded-lg border
                px-4 py-3 shadow-lg
                animate-[slideInRight_0.3s_ease-out]
                ${COLOR_MAP[toast.type] || COLOR_MAP.info}
              `}
            >
              <Icon size={18} className={`shrink-0 ${ICON_COLOR_MAP[toast.type] || ICON_COLOR_MAP.info}`} />
              <span className="text-sm font-medium">{toast.message}</span>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="ml-2 shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
