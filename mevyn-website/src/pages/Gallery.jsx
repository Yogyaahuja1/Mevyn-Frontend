import { useMemo, useState } from 'react';
import { GALLERY_PHOTOS } from '../mockData';

export default function Gallery() {
  const [activeEvent, setActiveEvent] = useState('All');
  const filters = useMemo(() => ['All', ...new Set(GALLERY_PHOTOS.map((p) => p.event))], []);
  const photos = activeEvent === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.event === activeEvent);

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
      <div style={{ padding: '56px 0 48px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="section-label">Photo Archive</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.0, marginTop: 12 }}>
            Gallery<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Coverage</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 16, maxWidth: 560, lineHeight: 1.7 }}>
            A visual timeline of events we covered, moments we captured, and stories told through images.
          </p>

          <div style={{ display: 'flex', gap: 8, marginTop: 30, flexWrap: 'wrap' }}>
            {filters.map((f) => (
              <button
                key={f}
                className="pill"
                style={{
                  borderColor: activeEvent === f ? 'var(--gold)' : 'var(--border)',
                  color: activeEvent === f ? 'var(--gold)' : 'var(--text-muted)',
                  background: activeEvent === f ? 'var(--gold-dim2)' : 'transparent',
                }}
                onClick={() => setActiveEvent(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="gallery-grid" style={{ columnCount: 3, columnGap: 18 }}>
            {photos.map((photo) => (
              <figure
                key={photo.id}
                style={{
                  breakInside: 'avoid',
                  marginBottom: 18,
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: 'var(--bg2)',
                }}
              >
                <img src={photo.img} alt={photo.caption} style={{ width: '100%', display: 'block' }} />
                <figcaption style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>
                    {photo.event}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{photo.caption}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 960px) {
          .gallery-grid { column-count: 2 !important; }
        }
        @media (max-width: 640px) {
          .gallery-grid { column-count: 1 !important; }
        }
      `}</style>
    </div>
  );
}
