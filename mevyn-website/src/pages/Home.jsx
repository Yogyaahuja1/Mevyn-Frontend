import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Ticker from '../components/Ticker';
import ArticleCard from '../components/ArticleCard';
import { ARTICLES, TIMELINE_EVENTS, FAQS } from '../mockData';

const HERO_ARTICLES = ARTICLES.filter(a => a.featured);

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <div className="faq-q" onClick={() => setOpen(o => !o)}>
        <span>{faq.q}</span>
        <span className="faq-icon">{open ? '−' : '+'}</span>
      </div>
      {open && <div className="faq-a">{faq.a}</div>}
    </div>
  );
}

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const navigate = useNavigate();
  const hero = HERO_ARTICLES[heroIdx];
  const heroParts = hero.title.split(':');
  const heroLead = heroParts[0] || hero.title;
  const heroSub = heroParts.slice(1).join(':').trim();

  return (
    <div className="page-enter">
      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', flexDirection: 'column', paddingTop: 'var(--nav-h)' }}>
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
          <img src={hero.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.34, transition: 'opacity 0.8s' }} />
          <div className="hero-overlay" />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 86 }}>
          <div className="hero-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
              <span className="section-label">Featured Story</span>
              <span style={{ width: 1, height: 12, background: 'var(--border)' }} />
              <span className="live-badge"><span className="live-dot" />Currently Covering</span>
              <span style={{ fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {hero.categoryLabel}
              </span>
            </div>

            <h1 onClick={() => navigate(`/article/${hero.id}`)} style={{
              fontFamily: 'var(--serif)', fontWeight: 600,
              cursor: 'pointer', transition: 'color 0.2s', marginBottom: 8,
            }}
              className="hero-title"
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >
              {heroLead}
            </h1>

            {heroSub && (
              <h2 className="hero-subtitle" style={{ fontFamily: 'var(--serif)', color: 'var(--text-muted)' }}>
                {heroSub}
              </h2>
            )}

            <p className="hero-subtext text-measure" style={{ color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
              Read full coverage from debates, student reactions, and election night moments.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <button className="btn-gold" onClick={() => navigate(`/article/${hero.id}`)}>Read Story {'->'}</button>
              <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>By {hero.author} · {hero.date}</span>
            </div>
          </div>

          {/* Slide dots */}
          <div style={{ display: 'flex', gap: 8, marginTop: 40 }}>
            {HERO_ARTICLES.map((_, i) => (
              <button key={i} onClick={() => setHeroIdx(i)} style={{
                width: i === heroIdx ? 28 : 6, height: 2, borderRadius: 1,
                background: i === heroIdx ? 'var(--gold)' : 'var(--border)',
                transition: 'all 0.3s', border: 'none', cursor: 'pointer',
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────── */}
      <Ticker />

      {/* ── DASHBOARD ENTRY ──────────────────────────── */}
      <section className="section-sm section-divider">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginBottom: 24, gap: 20, flexWrap: 'wrap' }}>
            <div>
              <span className="section-label">Navigate Coverage</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.14, marginTop: 8 }}>
                Dedicated Media Dashboard
              </h2>
            </div>
            <Link to="/dashboard" className="btn-gold">Open Dashboard {'->'}</Link>
          </div>

          <div className="dashboard-grid">
            {[
              { label: 'Events', to: '/events', cls: 'events', desc: 'Live event reports and post-event stories.' },
              { label: 'Intern Diaries', to: '/diaries', cls: 'diaries', desc: 'Internship journeys and lessons from students.' },
              { label: 'Campus Voice', to: '/voice', cls: 'voice', desc: 'Investigations and opinion-led campus features.' },
            ].map(c => (
              <Link key={c.label} to={c.to} className="dashboard-card">
                <div className={`series-title ${c.cls}`}>{c.label}</div>
                <div className="series-desc">{c.desc}</div>
                <div className="dashboard-cta" style={{ marginTop: 12 }}>Explore {'->'}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT ARTICLES ──────────────────────────── */}
      <section className="section section-divider">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Latest from MEVYN</span>
            <h2>Recent Stories</h2>
          </div>

          {/* Featured + grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24, marginBottom: 24 }}>
            <ArticleCard article={ARTICLES[0]} size="large" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <ArticleCard article={ARTICLES[1]} />
              <ArticleCard article={ARTICLES[2]} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {ARTICLES.slice(3, 6).map(a => <ArticleCard key={a.id} article={a} />)}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/events" className="btn-ghost">View All Stories →</Link>
          </div>
        </div>
      </section>

      {/* ── TIMELINE PREVIEW ─────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginTop: 8 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
            <div>
              <span className="section-label">What We've Covered</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 600, lineHeight: 1.1, marginTop: 12, marginBottom: 20 }}>Our Timeline</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 28 }}>
                From our first article to upcoming events — every story we've told and everything we're building towards.
              </p>
              <Link to="/timeline" className="btn-gold">View Full Timeline →</Link>
            </div>
            <div className="timeline">
              {TIMELINE_EVENTS.slice(0, 5).map((ev, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" style={{ background: ev.upcoming ? 'transparent' : 'var(--gold)', border: ev.upcoming ? '1px dashed var(--gold)' : 'none' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span className="timeline-date">{ev.date}</span>
                    {ev.upcoming && <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: 99, border: '1px solid var(--border-gold)', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Upcoming</span>}
                  </div>
                  <div className="timeline-title">{ev.title}</div>
                  <div className="timeline-desc">{ev.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ & SUGGESTIONS ────────────────────────── */}
      <section className="section section-divider">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            {/* FAQ */}
            <div>
              <span className="section-label">Got Questions?</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)', fontWeight: 600, lineHeight: 1.1, marginTop: 12, marginBottom: 32 }}>
                Frequently Asked
              </h2>
              {FAQS.slice(0, 3).map((f, i) => <FaqItem key={i} faq={f} />)}
              <Link to="/queries" style={{ display: 'inline-block', marginTop: 24, fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>See all FAQs →</Link>
            </div>

            {/* Quick Suggestion Form */}
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 36 }}>
              <span className="section-label">Your Voice</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', fontWeight: 600, margin: '12px 0 8px' }}>
                Suggest a Topic
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 24 }}>
                Know something we should cover? Have a story idea or feedback? Let us know.
              </p>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input className="form-input" placeholder="e.g. Ananya Mehta" />
              </div>
              <div className="form-group">
                <label className="form-label">Story Idea or Question</label>
                <textarea className="form-textarea" placeholder="Tell us what's on your mind..." style={{ minHeight: 90 }} />
              </div>
              <button className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>Submit →</button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){
          section > .container > div[style*="grid-template-columns: 1.6fr"]{grid-template-columns:1fr!important}
          section > .container > div[style*="grid-template-columns: repeat(3"]{grid-template-columns:1fr 1fr!important}
          section > .container > div[style*="grid-template-columns: 1fr 2fr"]{grid-template-columns:1fr!important}
          section > .container > div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  );
}