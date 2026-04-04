/**
 * Public site navigation bar — editorial glassmorphic pill design.
 *
 * Desktop: Brand lockup | glassmorphic pill (Home, Stories, Series dropdown, About) | ThemeToggle | CTA
 * Mobile: Brand lockup | ThemeToggle | Hamburger → full-screen overlay menu
 *
 * The nav uses position:fixed via the .site-nav class (defined in index.css).
 * Scroll detection adds .is-scrolled for glassmorphic backdrop on scroll.
 *
 * The mobile menu is rendered as a sibling to the nav content so it is never
 * trapped inside a backdrop-filter containing block.
 */
import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from './ThemeToggle';
import SeriesDropdown from '@/components/series/SeriesDropdown';

/** Returns editorial nav-link class with active state */
const navLinkClass = ({ isActive }) =>
  `nav-link${isActive ? ' active' : ''}`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Scroll detection — add .is-scrolled after 40px
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll(); // check initial position
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMobile = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <nav className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nav-shell">
          {/* Brand lockup */}
          <Link to={ROUTES.HOME} className="brand-lockup" aria-label="Mevyn home">
            <span
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                color: 'var(--accent)',
              }}
            >
              MEVYN
            </span>
            <span
              className="brand-subtitle"
              style={{
                fontSize: '9px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginTop: 1,
              }}
            >
              IIT Dharwad
            </span>
          </Link>

          {/* Desktop glassmorphic pill nav */}
          <div className="desktop-nav">
            <div className="nav-group">
              <NavLink to={ROUTES.HOME} className={navLinkClass} end>
                Home
              </NavLink>
              <NavLink to={ROUTES.BLOGS} className={navLinkClass}>
                Stories
              </NavLink>
              <SeriesDropdown />
              <NavLink to={ROUTES.ABOUT} className={navLinkClass}>
                About
              </NavLink>
            </div>
            <ThemeToggle />
            {isAuthenticated ? (
              <Link to={ROUTES.ADMIN} className="nav-cta">
                Dashboard
              </Link>
            ) : (
              <Link to={ROUTES.LOGIN} className="nav-cta">
                Login
              </Link>
            )}
          </div>

          {/* Mobile controls — visible only on mobile (hamburger hidden via CSS on desktop) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="hamburger"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                style={{
                  display: 'block',
                  width: 22,
                  height: 2,
                  background: 'var(--text)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  transform: menuOpen
                    ? 'rotate(45deg) translate(5px, 5px)'
                    : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 22,
                  height: 2,
                  background: 'var(--text)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 22,
                  height: 2,
                  background: 'var(--text)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  transform: menuOpen
                    ? 'rotate(-45deg) translate(5px, -5px)'
                    : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay menu — rendered outside nav to avoid backdrop-filter issues */}
      {menuOpen && (
        <div className="mobile-nav-menu">
          {/* Header with close */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 32,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                color: 'var(--accent)',
              }}
            >
              MEVYN
            </span>
            <button
              onClick={closeMobile}
              aria-label="Close menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
                minWidth: 44,
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text)',
                fontSize: 24,
              }}
            >
              &times;
            </button>
          </div>

          <div className="mobile-nav-label">Navigate</div>
          <NavLink to={ROUTES.HOME} className="mobile-nav-link" onClick={closeMobile} end>
            Home
          </NavLink>
          <NavLink to={ROUTES.BLOGS} className="mobile-nav-link" onClick={closeMobile}>
            Stories
          </NavLink>
          <NavLink to={ROUTES.SERIES} className="mobile-nav-link" onClick={closeMobile}>
            Series
          </NavLink>
          <NavLink to={ROUTES.ABOUT} className="mobile-nav-link" onClick={closeMobile}>
            About
          </NavLink>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />

          <NavLink
            to={isAuthenticated ? ROUTES.ADMIN : ROUTES.LOGIN}
            className="mobile-nav-link mobile-nav-link-cta"
            onClick={closeMobile}
          >
            {isAuthenticated ? 'Dashboard' : 'Login'}
          </NavLink>
        </div>
      )}
    </>
  );
}
