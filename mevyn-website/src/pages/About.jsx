import { TEAM } from '../mockData';

export default function About() {
  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Hero */}
      <div style={{ padding: '80px 0 64px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -100, top: -100, width: 500, height: 500, borderRadius: '50%', border: '1px solid var(--gold-dim)', opacity: 0.3 }} />
        <div style={{ position: 'absolute', right: -60, top: -60, width: 300, height: 300, borderRadius: '50%', border: '1px solid var(--gold-dim)', opacity: 0.2 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label">Who We Are</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.0, marginTop: 12, maxWidth: 700 }}>
            About<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>MEVYN</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 20, maxWidth: 580, lineHeight: 1.8, fontSize: '1.05rem' }}>
            MEVYN is the campus media club — a group of students who believe every campus has stories worth telling. We cover events, amplify issues, and give interns a space to share their honest experiences.
          </p>
          <p style={{ color: 'var(--text-muted)', marginTop: 16, maxWidth: 580, lineHeight: 1.8 }}>
            Founded in November 2024, we've grown from a single article to a full editorial operation with writers, photographers, and videographers all working together.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48, marginTop: 48 }}>
            {[['Nov 2024', 'Founded'], ['8+', 'Articles'], ['6', 'Team Members'], ['3', 'Series Running']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold)' }}>{n}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="section-sm" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
            {[
              { icon: '◎', title: 'Cover Everything', desc: 'From soapbox elections to mess committee crises — if it affects students, we cover it.' },
              { icon: '◈', title: 'Stay Honest', desc: 'Every story goes through editorial review. We reach out for comments before we publish anything serious.' },
              { icon: '◇', title: 'Give Everyone a Voice', desc: 'Campus Voice and Intern Diaries exist so students can share what they\'re experiencing, unfiltered.' },
            ].map(m => (
              <div key={m.title} style={{ padding: 28, background: 'var(--bg2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 24, color: 'var(--gold)', marginBottom: 14 }}>{m.icon}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 600, marginBottom: 10 }}>{m.title}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">The People Behind It</span>
            <h2>Our Team</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {TEAM.map(m => (
              <div key={m.name} style={{ background: 'var(--bg2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-gold)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                  <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)', transition: 'all 0.4s' }} />
                </div>
                <div style={{ padding: '20px 20px 24px' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 600, marginBottom: 2 }}>{m.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.06em', fontWeight: 500, marginBottom: 6 }}>{m.role}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Beat: {m.beat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`@media(max-width:900px){section>.container>div[style*="repeat(3, 1fr)"]{grid-template-columns:1fr 1fr!important}section>.container>div[style*="1fr 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}