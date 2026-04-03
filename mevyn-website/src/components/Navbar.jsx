import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PRIMARY_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/about', label: 'About' },
  { to: '/queries', label: 'Queries' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-shell">
        {/* Logo */}
        <Link to="/" className="brand-lockup">
          <span style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--gold)' }}>
            MEVYN
          </span>
          <span className="brand-subtitle" style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: 1 }}>
            Campus Media Club • Est. 2024
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="desktop-nav">
          <div className="nav-group">
            {PRIMARY_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link to="/dashboard" className="btn-gold nav-cta">
            Suggest
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(o => !o)} className="hamburger">
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: 22, height: 1.5, background: menuOpen && i===1 ? 'transparent' : 'var(--text)', transition: 'all 0.25s', transform: menuOpen && i===0 ? 'rotate(45deg) translate(4px,4px)' : menuOpen && i===2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-nav-menu">
          <div className="mobile-nav-label">Navigate</div>
          {PRIMARY_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="mobile-nav-link">
              {l.label}
            </Link>
          ))}

          <Link to="/dashboard" className="mobile-nav-link mobile-nav-link-cta">
            Open Coverage Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}