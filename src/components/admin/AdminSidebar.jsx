/**
 * Admin sidebar navigation.
 *
 * Desktop: fixed 256px sidebar, always visible.
 * Mobile: hidden by default, shown as a drawer overlay via isOpen prop.
 *
 * Navigation items: Dashboard, Posts, Events, Accounts (admin role only).
 * "View Site" link at the bottom opens the public homepage in a new tab.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Controls mobile drawer visibility
 * @param {Function} props.onClose - Called to close mobile drawer
 */
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Calendar, Users, ExternalLink, X } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/utils/cn';

const navItems = [
  { to: ROUTES.ADMIN, icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: ROUTES.ADMIN_POSTS, icon: FileText, label: 'Posts' },
  { to: ROUTES.ADMIN_EVENTS, icon: Calendar, label: 'Events' },
  { to: ROUTES.ADMIN_ACCOUNTS, icon: Users, label: 'Accounts', adminOnly: true },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo / brand */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-primary-200 dark:border-dark-border flex-shrink-0">
        <span className="font-bold text-lg text-primary-800 dark:text-dark-text">Mevyn Admin</span>
        {/* Close button — only visible on mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg text-primary-600 dark:text-dark-muted min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems
          .filter((item) => !item.adminOnly || isAdmin)
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px]',
                  isActive
                    ? 'bg-secondary-50 text-secondary-700 dark:bg-secondary-900/20 dark:text-secondary-400'
                    : 'text-primary-600 hover:bg-primary-100 dark:text-dark-muted dark:hover:bg-dark-surface2'
                )
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
      </nav>

      {/* View site link */}
      <div className="p-3 border-t border-primary-200 dark:border-dark-border flex-shrink-0">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-500 hover:bg-primary-100 dark:text-dark-muted dark:hover:bg-dark-surface2 transition-colors min-h-[44px]"
        >
          <ExternalLink className="h-5 w-5" />
          View Site
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — always visible on lg+ */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white dark:bg-dark-surface border-r border-primary-200 dark:border-dark-border">
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={onClose} />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-surface shadow-xl lg:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
