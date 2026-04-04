/**
 * SeriesDetailPage — shows posts belonging to a specific series.
 *
 * Supports 3 layout variants based on series-config.json `layout` field:
 *   - "grid" — 3-column card grid (like Events page in reference)
 *   - "editorial" — Image+text pairs, numbered (like Diaries page)
 *   - "numbered" — Numbered list with small thumbnail (like CampusVoice page)
 *
 * Route: /series/:slug
 */
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { usePosts } from '@/hooks/usePosts';
import { ROUTES } from '@/config/routes';
import { ANONYMOUS_AUTHOR } from '@/config/constants';
import { formatDate } from '@/utils/formatDate';
import { truncate } from '@/utils/truncate';
import PostCard from '@/components/posts/PostCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import EmptyState from '@/components/common/EmptyState';
import seriesData from '@/data/series-config.json';

export default function SeriesDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const series = seriesData.find(s => s.slug === slug);

  useDocumentTitle(series?.title || 'Series');

  const { posts, isLoading, error, refetch } = usePosts({ series: slug, limit: 50 });

  if (!series) {
    return (
      <div className="page-enter">
        <section className="section">
          <div className="container-editorial" style={{ textAlign: 'center' }}>
            <span className="section-label">Series</span>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '14px 0', color: 'var(--text)' }}>Series not found</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>This series may not exist yet.</p>
            <Link to={ROUTES.SERIES} className="btn-accent">View All Series</Link>
          </div>
        </section>
      </div>
    );
  }

  const accent = series.accent || 'var(--accent)';
  const layout = series.layout || 'grid';

  return (
    <div className="page-enter">
      {/* Header */}
      <div style={{ padding: '56px 0 48px', borderBottom: '1px solid var(--border)' }}>
        <div className="container-editorial">
          <span className="section-label" style={{ color: accent }}>{series.layout === 'editorial' ? 'Series' : series.layout === 'numbered' ? 'Opinion & Issues' : 'Coverage'}</span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.0, marginTop: 12, color: 'var(--text)' }}>
            {series.title.split(' ').slice(0, -1).join(' ')}<br />
            <em style={{ color: accent, fontStyle: 'italic' }}>{series.title.split(' ').slice(-1)[0]}</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 16, maxWidth: 520, lineHeight: 1.7 }}>
            {series.description}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container-editorial">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} onRetry={refetch} />}
          {!isLoading && !error && posts.length === 0 && (
            <EmptyState title="No stories yet" description="Check back soon for new content in this series." />
          )}

          {!isLoading && !error && posts.length > 0 && (
            <>
              {layout === 'grid' && <GridLayout posts={posts} />}
              {layout === 'editorial' && <EditorialLayout posts={posts} accent={accent} navigate={navigate} />}
              {layout === 'numbered' && <NumberedLayout posts={posts} accent={accent} navigate={navigate} />}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

/** Grid layout — 3-column PostCard grid */
function GridLayout({ posts }) {
  return (
    <div className="editorial-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
      {posts.map(p => <PostCard key={p.uuid || p.slug} post={p} />)}
    </div>
  );
}

/** Editorial layout — image + text pairs, numbered (like Intern Diaries) */
function EditorialLayout({ posts, accent, navigate }) {
  return (
    <div>
      {posts.map((post, i) => {
        const authorName = post.anonymous || !post.authors?.length ? ANONYMOUS_AUTHOR : post.authors.map(a => a.name).join(', ');
        return (
          <div key={post.uuid || post.slug} onClick={() => navigate(`/blogs/${post.slug}`)}
            className="editorial-grid-2"
            style={{
              display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40,
              padding: '40px 0', borderBottom: '1px solid var(--border)',
              cursor: 'pointer', transition: 'all 0.25s',
            }}
            onMouseEnter={e => e.currentTarget.style.paddingLeft = '8px'}
            onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
          >
            {/* Gradient placeholder image */}
            <div style={{ aspectRatio: '4/3', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: `linear-gradient(135deg, ${accent}40, ${accent}10)` }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: '10px', color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                  #{String(i + 1).padStart(2, '0')} Story
                </span>
                <span style={{ width: 1, height: 10, background: 'var(--border)' }} />
                <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{formatDate(post.published_at)}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: 16, color: 'var(--text)' }}>
                {post.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>{truncate(post.excerpt, 200)}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '12px', color: 'var(--text-dim)' }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: `${accent}20`, border: `1px solid ${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: accent, fontWeight: 600 }}>
                  {authorName[0]}
                </span>
                <span>{authorName}</span>
                <span>·</span>
                <span style={{ color: accent }}>Read story →</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Numbered layout — list with small thumbnails (like Campus Voice) */
function NumberedLayout({ posts, accent, navigate }) {
  return (
    <div>
      {posts.map((post, i) => (
        <div key={post.uuid || post.slug} onClick={() => navigate(`/blogs/${post.slug}`)}
          style={{
            display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32,
            padding: '32px 0', borderBottom: '1px solid var(--border)',
            alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.paddingLeft = '16px'}
          onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
        >
          <span style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-dim)', lineHeight: 1, minWidth: 48 }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
              {post.tags?.slice(0, 3).map(t => (
                <span key={t} style={{ fontSize: '10px', color: accent, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>#{t}</span>
              ))}
              <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{formatDate(post.published_at)}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 600, lineHeight: 1.2, marginBottom: 8, color: 'var(--text)' }}>
              {post.title}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{truncate(post.excerpt, 150)}</p>
          </div>
          {/* Small gradient thumbnail */}
          <div style={{ width: 120, aspectRatio: '4/3', borderRadius: 'var(--radius)', overflow: 'hidden', flexShrink: 0, background: `linear-gradient(135deg, ${accent}40, ${accent}10)` }} />
        </div>
      ))}
    </div>
  );
}
