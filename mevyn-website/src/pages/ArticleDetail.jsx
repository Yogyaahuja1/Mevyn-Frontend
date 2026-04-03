import { Link, useParams } from 'react-router-dom';
import { ARTICLES } from '../mockData';

export default function ArticleDetail() {
  const { id } = useParams();
  const article = ARTICLES.find((a) => String(a.id) === id);

  if (!article) {
    return (
      <div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
        <section className="section">
          <div className="container" style={{ textAlign: 'center' }}>
            <span className="section-label">Article</span>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '14px 0' }}>Article not found</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>This article may have moved or is not published yet.</p>
            <Link className="btn-gold" to="/events">Back to Stories</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
      <article>
        <header style={{ borderBottom: '1px solid var(--border)', padding: '56px 0 40px' }}>
          <div className="container" style={{ maxWidth: 920 }}>
            <span className="section-label">{article.categoryLabel}</span>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.05, margin: '14px 0 16px' }}>
              {article.title}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.8 }}>{article.excerpt}</p>
            <div style={{ marginTop: 18, fontSize: '0.9rem', color: 'var(--text-dim)' }}>
              By {article.author} · {article.date}
            </div>
          </div>
        </header>

        <section className="section">
          <div className="container" style={{ maxWidth: 920 }}>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 28 }}>
              <img src={article.img} alt={article.title} />
            </div>

            <div style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.9 }}>
              <p>
                This is a demo story detail layout so your routing and content flow remain fully functional while your team adds real long-form copy.
                You can replace this block with markdown-rendered content, CMS output, or rich text from an admin panel.
              </p>
              <p style={{ marginTop: 14 }}>
                Suggested next step for production: keep article metadata in a JSON/Sheet/CMS source, then map it into this page using a slug and full body content.
              </p>
            </div>

            <div style={{ marginTop: 30, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {(article.tags || []).map((tag) => (
                <span key={tag} className="pill">#{tag}</span>
              ))}
            </div>

            <div style={{ marginTop: 36 }}>
              <Link className="btn-ghost" to="/events">← Back to all stories</Link>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
