import { useState } from 'react';
import { VIDEOS } from '../mockData';

export default function Videos() {
  const [playing, setPlaying] = useState(null);
  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
      <div style={{ padding: '56px 0 48px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="section-label">Watch</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.0, marginTop: 12 }}>
            Video<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Stories</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 16, maxWidth: 480 }}>
            Highlights, documentaries and event coverage — all our video content in one place.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {VIDEOS.map(v => (
              <div key={v.id} className="card" onClick={() => setPlaying(v)}>
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: 'var(--bg3)' }}>
                  <img src={v.thumb} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                  {/* Play button */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}>
                      <span style={{ color: '#000', fontSize: 18, marginLeft: 3 }}>▶</span>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-meta">
                    <span style={{ fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{v.event}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{v.date}</span>
                  </div>
                  <h3 className="card-title" style={{ fontSize: '1rem' }}>{v.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video lightbox */}
      {playing && (
        <div onClick={() => setPlaying(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 900, position: 'relative' }}>
            <button onClick={() => setPlaying(null)} style={{ position: 'absolute', top: -40, right: 0, color: 'var(--text-muted)', fontSize: 24, background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
            <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#000', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <iframe src={`https://www.youtube.com/embed/${playing.embedId}?autoplay=1`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen" allowFullScreen title={playing.title} />
            </div>
            <div style={{ marginTop: 16 }}>
              <span style={{ fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>{playing.event}</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 600, marginTop: 6 }}>{playing.title}</h3>
            </div>
          </div>
        </div>
      )}
      <style>{`@media(max-width:768px){section>.container>div[style*="repeat(3"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}