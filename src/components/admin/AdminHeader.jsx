/**
 * Admin top header bar.
 *
 * Shows: sidebar toggle (mobile), user info, theme toggle, logout button.
 *
 * @param {object} props
 * @param {Function} props.onMenuToggle - Opens the mobile sidebar drawer
 */
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/config/routes';
import ThemeToggle from '@/components/common/ThemeToggle';
import Badge from '@/components/common/Badge';
import logger from '@/utils/logger';

export default function AdminHeader({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    logger.info('AdminHeader', 'User initiated logout');
    navigate(ROUTES.LOGIN);
  }

  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-primary-200 dark:border-dark-border bg-white dark:bg-dark-surface flex-shrink-0">
      {/* Left: mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg text-primary-600 dark:text-dark-muted min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Spacer on desktop */}
      <div className="hidden lg:block" />

      {/* Right: user info, theme toggle, logout */}
      <div className="flex items-center gap-3">
        {user && (
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm font-medium text-primary-700 dark:text-dark-text">{user.name}</span>
            <Badge variant={user.role === 'admin' ? 'blue' : 'default'}>
              {user.role}
            </Badge>
          </div>
        )}
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg text-primary-500 hover:text-red-600 hover:bg-red-50 dark:text-dark-muted dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
