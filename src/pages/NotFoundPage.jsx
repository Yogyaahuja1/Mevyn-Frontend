/**
 * NotFoundPage - Displayed when no route matches the current URL.
 *
 * Route: * (catch-all)
 * Shows a 404 message and provides a link back to the home page.
 */
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('404 - Page Not Found');

  return (
    <div className="p-8 text-gray-900 dark:text-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
