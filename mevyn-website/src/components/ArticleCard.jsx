import { useNavigate } from 'react-router-dom';

const CAT_COLORS = {
  soapbox: '#c9a84c', events: '#ef9e27', diaries: '#5dcaa5', voice: '#d85a30', gallery: '#7f77dd',
};

export default function ArticleCard({ article, size = 'normal' }) {
  const navigate = useNavigate();
  const accent = CAT_COLORS[article.category] || 'var(--gold)';

  return (
    <div className="card" onClick={() => navigate(`/article/${article.id}`)}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-img" style={{ aspectRatio: size === 'large' ? '16/7' : '16/9' }}>
        <img src={article.img} alt={article.title} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
      </div>
      <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="card-meta">
          <span style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: '99px',
            fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            background: `${accent}18`, border: `1px solid ${accent}40`, color: accent,
          }}>
            {article.categoryLabel}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{article.date}</span>
        </div>
        <h3 className="card-title" style={{ fontSize: size === 'large' ? '1.4rem' : '1.1rem' }}>
          {article.title}
        </h3>
        <p className="card-excerpt" style={{ flex: 1 }}>{article.excerpt}</p>
        <div style={{ marginTop: 14, fontSize: '11px', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
          Read Story {'->'}
        </div>
        <div className="card-author">
          <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--gold)', fontWeight: 600, flexShrink: 0 }}>
            {article.author[0]}
          </span>
          {article.author}
        </div>
      </div>
    </div>
  );
}