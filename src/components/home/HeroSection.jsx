/**
 * HeroSection - Full-viewport editorial hero for the Mevyn homepage.
 *
 * Displays a large serif heading, tagline, and two CTA buttons over a
 * subtle radial-gradient background. Includes a "Welcome" section label
 * and an "Active Coverage" live badge. Adapts to light/dark via CSS
 * variables and the hero-overlay class.
 *
 * Used by: HomePage.
 */
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 86,
      }}
    >
      {/* Gradient background (no image) */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 30% 20%, var(--accent-dim) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(59,130,246,0.05) 0%, transparent 50%)',
          }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-panel">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 18,
              flexWrap: 'wrap',
            }}
          >
            <span className="section-label">IIT Dharwad</span>
            <span style={{ width: 1, height: 12, background: 'var(--border)' }} />
            <span className="live-badge">
              <span className="live-dot" />
              Student Media Body
            </span>
          </div>

          <h1 className="hero-title">
            Document,
            <br />
            Apprise, and <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Reason</em>
          </h1>

          <p className="hero-subtitle">
            The official media body of IIT Dharwad &mdash; covering campus events,
            amplifying student voices, and documenting the stories that shape our community.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <Link to={ROUTES.BLOGS} className="btn-accent">
              Explore Stories &rarr;
            </Link>
            <Link to={ROUTES.ABOUT} className="btn-ghost">
              Meet the Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
