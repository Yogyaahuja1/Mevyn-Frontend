import { useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { ARTICLES } from '../mockData';

const ALL_CATS = ['All', 'Events', 'Soapbox', 'Intern Diaries', 'Campus Voice'];
const CAT_MAP = { 'Events': 'events', 'Soapbox': 'soapbox', 'Intern Diaries': 'diaries', 'Campus Voice': 'voice' };

export default function Events() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? ARTICLES : ARTICLES.filter(a => a.category === CAT_MAP[active]);

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Page header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 48, paddingTop: 56 }}>
        <div className="container">
          <span className="section-label">All Stories</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.0, marginTop: 12 }}>
            Events &<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Coverage</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 16, maxWidth: 480 }}>
            Every event we've attended, every story we've told. Filtered by series below.
          </p>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
            {ALL_CATS.map(c => (
              <button key={c} onClick={() => setActive(c)}
                style={{
                  padding: '8px 20px', borderRadius: 99, fontSize: '12px', fontWeight: 500,
                  letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
                  border: active === c ? '1px solid var(--gold)' : '1px solid var(--border)',
                  background: active === c ? 'var(--gold-dim)' : 'transparent',
                  color: active === c ? 'var(--gold)' : 'var(--text-muted)',
                  transition: 'all 0.2s',
                }}
              >{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <section className="section">
        <div className="container">
          <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {filtered.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', marginBottom: 12 }}>Nothing here yet</div>
              <p>Check back soon — we're always covering something new.</p>
            </div>
          )}
        </div>
      </section>
      <style>{`@media(max-width:900px){.events-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:600px){.events-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}