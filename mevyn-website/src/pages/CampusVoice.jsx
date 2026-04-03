import { useNavigate } from 'react-router-dom';
import { ARTICLES } from '../mockData';

const voice = ARTICLES.filter(a => a.category === 'voice');

export default function CampusVoice() {
  const navigate = useNavigate();
  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
      <div style={{ padding: '56px 0 48px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="section-label" style={{ color: '#d85a30' }}>Opinion & Issues</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.0, marginTop: 12 }}>
            Campus<br /><em style={{ color: '#d85a30', fontStyle: 'italic' }}>Voice</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 16, maxWidth: 520, lineHeight: 1.7 }}>
            Issues that matter. Opinions that need to be heard. We investigate and amplify what's happening on campus.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Opinion cards — bolder layout */}
          <div style={{ display: 'grid', gap: 2 }}>
            {voice.map((a, i) => (
              <div key={a.id} onClick={() => navigate(`/article/${a.id}`)}
                style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr auto',
                  gap: 32, padding: '32px 0', borderBottom: '1px solid var(--border)',
                  alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s',
                  borderRadius: 'var(--radius)',
                }}
                onMouseEnter={e => e.currentTarget.style.paddingLeft = '16px'}
                onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
              >
                <span style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-dim)', lineHeight: 1, minWidth: 48 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                    {a.tags.map(t => (
                      <span key={t} style={{ fontSize: '10px', color: '#d85a30', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>#{t}</span>
                    ))}
                    <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{a.date}</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 600, lineHeight: 1.2, marginBottom: 8 }}>{a.title}</h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{a.excerpt}</p>
                </div>
                <div style={{ width: 120, aspectRatio: '4/3', borderRadius: 'var(--radius)', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={a.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}