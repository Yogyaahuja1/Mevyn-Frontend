import { TIMELINE_EVENTS } from '../mockData';

export default function Timeline() {
  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
      <div style={{ padding: '56px 0 48px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="section-label">Our Journey</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.0, marginTop: 12 }}>
            MEVYN<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Timeline</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 16, maxWidth: 520, lineHeight: 1.7 }}>
            Every event we've covered, every series we've launched, and everything we're building towards. A living archive of campus stories.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
            {/* Past */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
                <span className="section-label">Past Events</span>
                <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div className="timeline">
                {TIMELINE_EVENTS.filter(e => !e.upcoming).map((ev, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-date">{ev.date}</div>
                    <div className="timeline-title">{ev.title}</div>
                    <div className="timeline-desc">{ev.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
                <span className="section-label" style={{ color: 'var(--gold)' }}>Upcoming</span>
                <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div className="timeline">
                {TIMELINE_EVENTS.filter(e => e.upcoming).map((ev, i) => (
                  <div key={i} className="timeline-item" style={{ paddingBottom: 36 }}>
                    <div className="timeline-dot" style={{ background: 'transparent', border: '1px dashed var(--gold)' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span className="timeline-date">{ev.date}</span>
                      <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: 99, border: '1px solid var(--border-gold)', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Upcoming</span>
                    </div>
                    <div className="timeline-title">{ev.title}</div>
                    <div className="timeline-desc">{ev.desc}</div>
                  </div>
                ))}
              </div>

              {/* Year summary */}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-lg)', padding: 28, marginTop: 24 }}>
                <span className="section-label" style={{ marginBottom: 12, display: 'block' }}>2024–25 in Numbers</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {[['8', 'Articles Published'], ['3', 'Events Covered'], ['2', 'Diary Series'], ['1', 'Investigation']].map(([n, l]) => (
                    <div key={l}>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.05em' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){section>.container>div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;gap:48px!important}}`}</style>
    </div>
  );
}