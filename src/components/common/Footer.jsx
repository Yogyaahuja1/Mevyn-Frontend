/**
 * Editorial site footer — 4-column layout with brand, series, navigation, and contact.
 *
 * Layout:
 *   Desktop: Brand (2fr) | Series (1fr) | Navigate (1fr) | Contact (1fr)
 *   Tablet (<=900px): 2-column grid
 *   Mobile (<=640px): single-column stack
 *
 * Uses editorial CSS classes and variables from index.css.
 * Series data loaded from series-config.json.
 */
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import seriesData from '@/data/series-config.json';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
      {/* Accent top-line */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
          opacity: 0.5,
        }}
      />

      <div className="container-editorial" style={{ paddingTop: 64, paddingBottom: 40 }}>
        {/* Responsive inline styles for the footer grid */}
        <style>{`
          .footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 48px;
          }
          @media (max-width: 900px) {
            .footer-grid {
              grid-template-columns: 1fr 1fr;
              gap: 36px;
            }
          }
          @media (max-width: 640px) {
            .footer-grid {
              grid-template-columns: 1fr;
              gap: 32px;
            }
          }
        `}</style>

        <div className="footer-grid">
          {/* Brand column */}
          <div>
            <Link to={ROUTES.HOME} style={{ textDecoration: 'none' }}>
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
            </Link>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginTop: 16,
                maxWidth: '32ch',
              }}
            >
              The official media body of IIT Dharwad. Documenting campus life,
              amplifying student voices, and covering the stories that matter.
            </p>
          </div>

          {/* Series column */}
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>
              Series
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {seriesData
                .sort((a, b) => a.order - b.order)
                .map((series) => (
                  <li key={series.slug}>
                    <Link
                      to={`/series/${series.slug}`}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                    >
                      {series.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Navigate column */}
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>
              Navigate
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Home', to: ROUTES.HOME },
                { label: 'Stories', to: ROUTES.BLOGS },
                { label: 'About', to: ROUTES.ABOUT },
                { label: 'Series', to: ROUTES.SERIES },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>
              Contact
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <a
                  href="mailto:mevyn@iitdh.ac.in"
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  mevyn@iitdh.ac.in
                </a>
              </li>
              <li
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                }}
              >
                IIT Dharwad, Karnataka
              </li>
              <li>
                <a
                  href="https://instagram.com/mevyn_iitdh"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  @mevyn_iitdh
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-dim)',
              fontFamily: 'var(--sans)',
            }}
          >
            &copy; {year} MEVYN &mdash; IIT Dharwad. All rights reserved.
          </span>
          <span
            style={{
              fontSize: '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-dim)',
              fontFamily: 'var(--sans)',
              fontWeight: 500,
            }}
          >
            DOCUMENT APPRISE AND REASON
          </span>
        </div>
      </div>
    </footer>
  );
}
