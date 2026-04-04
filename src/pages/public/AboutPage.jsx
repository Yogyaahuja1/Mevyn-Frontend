/**
 * AboutPage — editorial about page with hero, mission pillars, and team grid.
 *
 * Uses editorial CSS classes from index.css (.section-label, .section,
 * .container-editorial, .editorial-grid-3, etc.) and CSS variables.
 *
 * Route: /about
 */
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import MembersPanel from '@/components/about/MembersPanel';

export default function AboutPage() {
  useDocumentTitle('About Us');

  return (
    <div className="page-enter">
      {/* Hero header */}
      <div style={{ padding: '80px 0 64px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', right: -100, top: -100, width: 500, height: 500, borderRadius: '50%', border: '1px solid var(--border-accent)', opacity: 0.3 }} />
        <div style={{ position: 'absolute', right: -60, top: -60, width: 300, height: 300, borderRadius: '50%', border: '1px solid var(--border-accent)', opacity: 0.2 }} />
        <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label">Who We Are</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.0, marginTop: 12, maxWidth: 700, color: 'var(--text)' }}>
            About<br /><em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>MEVYN</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 20, maxWidth: 580, lineHeight: 1.8, fontSize: '1.05rem' }}>
            Mevyn is a vibrant community of curious minds driven to inform, engage and represent. We bring student stories, achievements, opinions into the spotlight while maintaining an honest and balanced narrative of campus life at IIT Dharwad.
          </p>
          <p style={{ color: 'var(--text-muted)', marginTop: 16, maxWidth: 580, lineHeight: 1.8 }}>
            By bridging the gap between students and authorities, Mevyn ensures that opinions, concerns, and ideas are effectively communicated, fostering transparency, dialogue, and a more connected campus environment.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48, marginTop: 48, flexWrap: 'wrap' }}>
            {[['2024', 'Founded'], ['5', 'Teams'], ['6+', 'Series'], ['Active', 'Coverage']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent)' }}>{n}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission section */}
      <section className="section-sm" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container-editorial">
          <div className="editorial-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
            {[
              { icon: '\u25CE', title: 'PARSEC-Driven Coverage', desc: 'Every story is guided by PARSEC — our editorial framework ensuring rigorous, balanced, and purposeful reporting across IIT Dharwad.' },
              { icon: '\u25C8', title: 'Editorial Integrity', desc: 'All content passes through Chief Editors approval before publication. We verify facts, check sources, and uphold journalistic standards.' },
              { icon: '\u25C7', title: 'Interno & OOPSS', desc: 'From the reflective depth of Interno to the unfiltered student perspectives in OOPSS, our series give every voice on campus a platform.' },
            ].map(m => (
              <div key={m.title} style={{ padding: 28, background: 'var(--bg2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 24, color: 'var(--accent)', marginBottom: 14 }}>{m.icon}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 600, marginBottom: 10, color: 'var(--text)' }}>{m.title}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="section">
        <div className="container-editorial">
          <MembersPanel />
        </div>
      </section>
    </div>
  );
}
