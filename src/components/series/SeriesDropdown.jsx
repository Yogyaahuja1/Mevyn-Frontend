/**
 * Series dropdown in the editorial pill Navbar.
 *
 * Desktop: click to open a dropdown panel showing all series.
 * Each item links to /series/<slug>.
 * "View All Series" links to the series listing page.
 *
 * Styled with editorial CSS variables (--bg2, --border, --text, --accent).
 * Trigger button uses the nav-link class to match the pill nav.
 *
 * Data source: src/data/series-config.json (static).
 */
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import seriesData from '@/data/series-config.json';

export default function SeriesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  const isActive =
    location.pathname === ROUTES.SERIES ||
    location.pathname.startsWith('/series/');

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        className={`nav-link${isActive ? ' active' : ''}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          cursor: 'pointer',
          border: 'none',
          background: 'none',
        }}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Series
        <ChevronDown
          style={{
            width: 14,
            height: 14,
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: 8,
            width: 260,
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            background: 'var(--bg2)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
            padding: '6px 0',
            zIndex: 50,
          }}
        >
          {seriesData
            .sort((a, b) => a.order - b.order)
            .map((series) => (
              <Link
                key={series.slug}
                to={`/series/${series.slug}`}
                style={{
                  display: 'block',
                  padding: '10px 16px',
                  textDecoration: 'none',
                  transition: 'background 0.15s, color 0.15s',
                  color: 'var(--text)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent-dim2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    display: 'block',
                    color: 'var(--text)',
                  }}
                >
                  {series.title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.6875rem',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginTop: 2,
                  }}
                >
                  {series.description}
                </span>
              </Link>
            ))}

          <div
            style={{
              height: 1,
              background: 'var(--border)',
              margin: '4px 0',
            }}
          />

          <Link
            to={ROUTES.SERIES}
            style={{
              display: 'block',
              padding: '10px 16px',
              textDecoration: 'none',
              fontFamily: 'var(--sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-dim2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            View All Series
          </Link>
        </div>
      )}
    </div>
  );
}
