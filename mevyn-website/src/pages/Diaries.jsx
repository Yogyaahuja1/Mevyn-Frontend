import { useNavigate } from 'react-router-dom';
import { ARTICLES } from '../mockData';

const diaries = ARTICLES.filter(a => a.category === 'diaries');

export default function Diaries() {
  const navigate = useNavigate();
  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Header */}
      <div style={{ padding: '56px 0 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ paddingBottom: 48 }}>
          <span className="section-label" style={{ color: '#5dcaa5' }}>Series</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.0, marginTop: 12 }}>
            Intern<br /><em style={{ color: '#5dcaa5', fontStyle: 'italic' }}>Diaries</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 16, maxWidth: 520, lineHeight: 1.7 }}>
            Real stories from students who interned at companies across India and the world. Honest, unfiltered, and deeply human.
          </p>
        </div>
      </div>

      {/* Diaries list — editorial style */}
      <section className="section">
        <div className="container">
          {diaries.map((d, i) => (
            <div key={d.id} onClick={() => navigate(`/article/${d.id}`)}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40,
                padding: '40px 0', borderBottom: '1px solid var(--border)',
                cursor: 'pointer', transition: 'all 0.25s',
              }}
              onMouseEnter={e => e.currentTarget.style.paddingLeft = '8px'}
              onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
            >
              <div style={{ aspectRatio: '4/3', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <img src={d.img} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: '10px', color: '#5dcaa5', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                    #{String(i + 1).padStart(2, '0')} Diary
                  </span>
                  <span style={{ width: 1, height: 10, background: 'var(--border)' }} />
                  <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{d.date}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: 16 }}>
                  {d.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>{d.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '12px', color: 'var(--text-dim)' }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(93,202,165,0.15)', border: '1px solid rgba(93,202,165,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#5dcaa5', fontWeight: 600 }}>
                    {d.author[0]}
                  </span>
                  <span>{d.author}</span>
                  <span>·</span>
                  <span style={{ color: '#5dcaa5' }}>Read diary →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}