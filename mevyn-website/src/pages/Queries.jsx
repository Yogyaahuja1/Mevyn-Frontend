import { useState } from 'react';
import { FAQS } from '../mockData';

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <div className="faq-q" onClick={() => setOpen(o => !o)}>
        <span>{faq.q}</span>
        <span className="faq-icon" style={{ transition: 'transform 0.25s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </div>
      {open && <div className="faq-a">{faq.a}</div>}
    </div>
  );
}

export default function Queries() {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('Story Idea');

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
      <div style={{ padding: '56px 0 48px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="section-label">Your Voice Matters</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.0, marginTop: 12 }}>
            Queries &<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Suggestions</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 16, maxWidth: 520, lineHeight: 1.7 }}>
            Have a story tip? A question? Want to join the team? Or just have feedback? This is the place.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

            {/* Form */}
            <div>
              <span className="section-label" style={{ marginBottom: 24, display: 'block' }}>Reach Out</span>

              {!submitted ? (
                <div>
                  {/* Type selector */}
                  <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
                    {['Story Idea', 'Question', 'Feedback', 'Join Team'].map(t => (
                      <button key={t} onClick={() => setType(t)}
                        style={{
                          padding: '8px 16px', borderRadius: 99, fontSize: '12px', fontWeight: 500,
                          border: type === t ? '1px solid var(--gold)' : '1px solid var(--border)',
                          background: type === t ? 'var(--gold-dim)' : 'transparent',
                          color: type === t ? 'var(--gold)' : 'var(--text-muted)',
                          cursor: 'pointer', transition: 'all 0.2s',
                        }}
                      >{t}</button>
                    ))}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input className="form-input" placeholder="First name is fine" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Your Email (optional)</label>
                    <input className="form-input" type="email" placeholder="If you'd like a reply" />
                  </div>
                  {type === 'Story Idea' && (
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select className="form-input" style={{ cursor: 'pointer' }}>
                        <option>Events</option>
                        <option>Campus Issue</option>
                        <option>Opinion</option>
                        <option>Intern Story</option>
                        <option>Other</option>
                      </select>
                    </div>
                  )}
                  <div className="form-group">
                    <label className="form-label">{type === 'Story Idea' ? 'Describe the story' : type === 'Join Team' ? 'Tell us about yourself' : 'Your message'}</label>
                    <textarea className="form-textarea" placeholder={
                      type === 'Story Idea' ? "What happened? Who's involved? Why does it matter to students?" :
                      type === 'Join Team' ? "What's your interest — writing, photography, video? What's your year?" :
                      "Write freely..."
                    } />
                  </div>
                  <button className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                    onClick={() => setSubmitted(true)}>
                    Submit →
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--gold)', marginBottom: 12 }}>Thank you.</div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
                    We've received your submission. We review everything and usually respond within 3 working days.
                  </p>
                  <button className="btn-ghost" onClick={() => setSubmitted(false)}>Submit another →</button>
                </div>
              )}
            </div>

            {/* FAQ */}
            <div>
              <span className="section-label" style={{ marginBottom: 24, display: 'block' }}>Frequently Asked</span>
              {FAQS.map((f, i) => <FaqItem key={i} faq={f} />)}

              {/* Contact info */}
              <div style={{ marginTop: 40, padding: 28, background: 'var(--bg2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <div className="section-label" style={{ marginBottom: 16 }}>Other Ways to Reach Us</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 2 }}>
                  <div>Email — <span style={{ color: 'var(--gold)' }}>mevyn@college.edu</span></div>
                  <div>Instagram — <span style={{ color: 'var(--gold)' }}>@mevyn_media</span></div>
                  <div>Location — <span style={{ color: 'var(--text)' }}>Media Room, Block C, Campus</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:900px){section>.container>div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}