import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', marginTop: 80 }}>
      {/* Gold top bar */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.5 }} />

      <div className="container" style={{ padding: '56px 40px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', marginBottom: 12 }}>MEVYN</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 280 }}>
              The official media club of campus. We cover events, amplify student voices, and document the stories that matter.
            </p>
          </div>

          {/* Series */}
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>Series</div>
            {[
              ['/events', 'Events'],
              ['/diaries', 'Intern Diaries'],
              ['/voice', 'Campus Voice'],
              ['/events', 'Soapbox'],
              ['/gallery', 'Gallery'],
            ].map(([to, label]) => (
              <div key={label} style={{ marginBottom: 8 }}>
                <Link to={to} style={{ fontSize: '0.875rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                >{label}</Link>
              </div>
            ))}
          </div>

          {/* Pages */}
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>Navigate</div>
            {[['/', 'Home'], ['/timeline', 'Timeline'], ['/about', 'About & Team'], ['/queries', 'Queries'], ['/videos', 'Videos']].map(([to, label]) => (
              <div key={to} style={{ marginBottom: 8 }}>
                <Link to={to} style={{ fontSize: '0.875rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                >{label}</Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>Contact</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              mevyn@college.edu<br />
              Campus Media Room, Block C<br />
              Instagram: @mevyn_media
            </p>
            <Link to="/queries" className="btn-gold" style={{ marginTop: 20, fontSize: '11px', padding: '8px 18px' }}>
              Submit a Story
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>© 2025 MEVYN — Campus Media Club. All rights reserved.</span>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>MADE BY STUDENTS, FOR STUDENTS</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          footer .container > div:first-child { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}