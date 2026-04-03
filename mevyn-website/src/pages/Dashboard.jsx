import { Link } from 'react-router-dom';
import { ARTICLES, TIMELINE_EVENTS, VIDEOS, GALLERY_PHOTOS } from '../mockData';

const PANELS = [
  {
    title: 'Events',
    to: '/events',
    desc: 'Fest coverage, reports, and recaps from across campus.',
    tone: 'events',
    stat: `${ARTICLES.filter((a) => a.category === 'events').length} stories`,
  },
  {
    title: 'Intern Diaries',
    to: '/diaries',
    desc: 'Internship journeys, reflections, and practical advice.',
    tone: 'diaries',
    stat: `${ARTICLES.filter((a) => a.category === 'diaries').length} diaries`,
  },
  {
    title: 'Campus Voice',
    to: '/voice',
    desc: 'Opinion pieces and issues affecting students directly.',
    tone: 'voice',
    stat: `${ARTICLES.filter((a) => a.category === 'voice').length} features`,
  },
  {
    title: 'Gallery',
    to: '/gallery',
    desc: 'Photo moments from events, workshops, and campus life.',
    tone: 'gallery',
    stat: `${GALLERY_PHOTOS.length} photos`,
  },
  {
    title: 'Videos',
    to: '/videos',
    desc: 'Highlights, short films, and event documentaries.',
    tone: 'soapbox',
    stat: `${VIDEOS.length} videos`,
  },
  {
    title: 'Timeline',
    to: '/timeline',
    desc: 'Covered milestones and upcoming media calendar.',
    tone: 'events',
    stat: `${TIMELINE_EVENTS.length} milestones`,
  },
];

export default function Dashboard() {
  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
      <div style={{ padding: '56px 0 44px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="section-label">Coverage Hub</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.6rem, 5vw, 4.6rem)', lineHeight: 1.04, marginTop: 12 }}>
            MEVYN<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Dashboard</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: 660, marginTop: 16, fontSize: '1rem', lineHeight: 1.7 }}>
            One dedicated space for all sections. Use this as your central navigation point to jump into coverage pages.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="dashboard-grid">
            {PANELS.map((panel) => (
              <Link key={panel.title} to={panel.to} className="dashboard-card">
                <div className={`series-title ${panel.tone}`}>{panel.title}</div>
                <p className="series-desc" style={{ marginBottom: 16 }}>{panel.desc}</p>
                <div className="dashboard-stat">{panel.stat}</div>
                <div className="dashboard-cta">Open Section {'->'}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
