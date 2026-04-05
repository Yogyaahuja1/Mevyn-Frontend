/**
 * PostCard - Editorial card component for blog listing grids.
 *
 * Displays a deterministic gradient placeholder (based on title hash),
 * series/tag pill, date, title, excerpt, "Read Story" CTA, and author.
 * Uses editorial CSS classes (.card, .card-body, .card-img, etc.).
 *
 * @param {object} props
 * @param {object} props.post
 * @param {'normal'|'large'} [props.size='normal']
 */
import { useNavigate } from 'react-router-dom';
import { ANONYMOUS_AUTHOR } from '@/config/constants';
import { formatDate } from '@/utils/formatDate';
import { truncate } from '@/utils/truncate';
import BorderGlow from '@/components/common/BorderGlow';

/**
 * Simple string hash for deterministic gradient generation.
 * @param {string} str
 * @returns {number}
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

/**
 * Generate a deterministic CSS gradient from a post title.
 * Hashes the title into two hue values so each post gets a unique gradient.
 * @param {string} title
 * @returns {string} CSS linear-gradient value
 */
function generateGradient(title) {
  const hash = hashString(title || '');
  const h1 = Math.abs(hash % 360);
  const h2 = (h1 + 40) % 360;
  return `linear-gradient(135deg, hsl(${h1}, 70%, 45%), hsl(${h2}, 60%, 35%))`;
}

export default function PostCard({ post, size = 'normal' }) {
  const navigate = useNavigate();
  const authorName =
    post.anonymous || !post.authors?.length
      ? ANONYMOUS_AUTHOR
      : post.authors.map((a) => a.name).join(', ');

  return (
    <BorderGlow
      edgeSensitivity={24}
      glowColor="201 168 76"
      backgroundColor="transparent"
      borderRadius={8}
      glowRadius={24}
      glowIntensity={0.64}
      coneSpread={22}
      animated={false}
      colors={['rgba(226, 196, 120, 0.62)', 'rgba(201, 168, 76, 0.2)', 'rgba(201, 168, 76, 0.03)']}
      style={{ height: '100%' }}
    >
      <div
        className="card"
        onClick={() => navigate(`/blogs/${post.slug}`)}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {/* Cover image or gradient placeholder */}
        <div
          className="card-img"
          style={{ aspectRatio: size === 'large' ? '16/7' : '16/9' }}
        >
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: generateGradient(post.title),
              }}
            />
          )}
        </div>

        <div
          className="card-body"
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          {/* Meta: pill + date */}
          <div className="card-meta">
            {post.series && (
              <span className="pill" style={{ cursor: 'default' }}>
                {post.series}
              </span>
            )}
            {!post.series && post.tags?.[0] && (
              <span className="pill" style={{ cursor: 'default' }}>
                {post.tags[0]}
              </span>
            )}
            <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
              {formatDate(post.published_at)}
            </span>
          </div>

          {/* Title */}
          <h3
            className="card-title"
            style={{ fontSize: size === 'large' ? '1.4rem' : '1.1rem' }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="card-excerpt" style={{ flex: 1 }}>
            {truncate(post.excerpt, 120)}
          </p>

          {/* Read CTA */}
          <div
            style={{
              marginTop: 14,
              fontSize: '11px',
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 600,
            }}
          >
            Read Story &rarr;
          </div>

          {/* Author */}
          <div className="card-author">
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'var(--accent-dim)',
                border: '1px solid var(--border-accent)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                color: 'var(--accent)',
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {authorName[0]}
            </span>
            {authorName}
          </div>
        </div>
      </div>
    </BorderGlow>
  );
}
