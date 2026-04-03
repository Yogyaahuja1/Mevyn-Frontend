/**
 * Route guard component — protects admin routes from unauthenticated access.
 *
 * Behavior:
 *   - While auth check is loading → shows spinner (prevents flash redirect)
 *   - If not authenticated → redirects to /login
 *   - If authenticated → renders child routes via <Outlet />
 *
 * Used in the router definition to wrap all /admin/* routes.
 *
 * @see src/config/router.jsx — route tree
 * @see src/contexts/AuthContext.jsx — provides isAuthenticated and isLoading
 */
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/config/routes';
import LoadingSpinner from './LoadingSpinner';
import logger from '@/utils/logger';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  // Wait for initial auth check to complete before deciding
  if (isLoading) {
    return <LoadingSpinner fullPage message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    logger.info('ProtectedRoute', 'Unauthenticated access attempt, redirecting to login');
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
