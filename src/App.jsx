/**
 * Root application component.
 *
 * Wrapping order:
 *   ThemeProvider  (outermost — affects entire DOM)
 *     ToastProvider (renders toast UI, needs theme classes)
 *       AuthProvider (needs themed loading states)
 *         RouterProvider (renders all pages)
 *
 * @see src/contexts/ThemeContext.jsx — dark/light toggle
 * @see src/contexts/ToastContext.jsx — toast notifications
 * @see src/contexts/AuthContext.jsx  — JWT auth state
 */
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { router } from '@/config/router';
import logger from '@/utils/logger';

logger.info('App', 'Mevyn frontend initializing');

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
