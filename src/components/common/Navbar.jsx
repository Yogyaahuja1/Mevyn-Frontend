/**
 * Public site navigation bar.
 *
 * Desktop: Logo | Blogs | Series (dropdown) | About Us | [ThemeToggle] [Login link]
 * Mobile: Logo | [ThemeToggle] [Hamburger] → slide-out drawer with all links
 *
 * The Login link is subtle (not a prominent CTA) — it's for admin/editor members only.
 * If the user is already authenticated, shows "Dashboard" link instead of "Login".
 *
 * @see src/components/series/SeriesDropdown.jsx — dropdown content
 */
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, LogIn, LayoutDashboard } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from './ThemeToggle';
import SeriesDropdown from '@/components/series/SeriesDropdown';
import { cn } from '@/utils/cn';

/** Styling for active nav links */
const linkClass = ({ isActive }) =>
  cn(
    'text-sm font-medium transition-colors px-3 py-2 rounded-lg',
    isActive
      ? 'text-secondary-600 dark:text-secondary-400'
      : 'text-primary-600 hover:text-primary-800 dark:text-dark-muted dark:hover:text-dark-text'
  );

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-primary-200 dark:border-dark-border bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex-shrink-0" aria-label="Mevyn home">
            <img src="/mevyn-logo.svg" alt="Mevyn" className="h-8" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to={ROUTES.BLOGS} className={linkClass}>Blogs</NavLink>
            <SeriesDropdown />
            <NavLink to={ROUTES.ABOUT} className={linkClass}>About Us</NavLink>
          </div>

          {/* Desktop right section */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link
                to={ROUTES.ADMIN}
                className="inline-flex items-center gap-1.5 text-sm text-primary-500 hover:text-primary-700 dark:text-dark-muted dark:hover:text-dark-text px-3 py-2 rounded-lg transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="inline-flex items-center gap-1.5 text-sm text-primary-500 hover:text-primary-700 dark:text-dark-muted dark:hover:text-dark-text px-3 py-2 rounded-lg transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile right section */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg text-primary-600 dark:text-dark-muted min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/*
       * Mobile slide-out drawer — rendered OUTSIDE <header> so that
       * backdrop-blur-md doesn't create a containing block that traps
       * the fixed-position drawer inside the 64px header height.
       */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 z-50 w-72 bg-white dark:bg-dark-surface shadow-xl md:hidden flex flex-col">
            <div className="flex items-center justify-between px-4 h-16 border-b border-primary-200 dark:border-dark-border">
              <span className="font-semibold text-primary-800 dark:text-dark-text">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-primary-600 dark:text-dark-muted min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1">
              <NavLink to={ROUTES.BLOGS} className={linkClass} onClick={() => setMobileOpen(false)}>
                Blogs
              </NavLink>
              <NavLink to={ROUTES.SERIES} className={linkClass} onClick={() => setMobileOpen(false)}>
                Series
              </NavLink>
              <NavLink to={ROUTES.ABOUT} className={linkClass} onClick={() => setMobileOpen(false)}>
                About Us
              </NavLink>
              <hr className="my-3 border-primary-200 dark:border-dark-border" />
              {isAuthenticated ? (
                <NavLink to={ROUTES.ADMIN} className={linkClass} onClick={() => setMobileOpen(false)}>
                  <span className="inline-flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </span>
                </NavLink>
              ) : (
                <NavLink to={ROUTES.LOGIN} className={linkClass} onClick={() => setMobileOpen(false)}>
                  <span className="inline-flex items-center gap-2">
                    <LogIn className="h-4 w-4" /> Login
                  </span>
                </NavLink>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
