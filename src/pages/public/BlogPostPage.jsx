/**
 * BlogPostPage - Editorial full article view of a single blog post.
 *
 * Displays the post header with series/tag label, title, excerpt, and metadata,
 * followed by tag pills and rendered HTML content. Uses editorial CSS classes
 * and variables for consistent styling.
 *
 * Route: /blogs/:slug
 * Data: usePost(slug) hook
 */
import { useParams, Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { usePost } from '@/hooks/usePost';
import { ROUTES } from '@/config/routes';
import PostContent from '@/components/posts/PostContent';
import PostMeta from '@/components/posts/PostMeta';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { post, isLoading, error } = usePost(slug);

  useDocumentTitle(post?.title || 'Blog Post');

  if (isLoading) return <LoadingSpinner message="Loading post..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return <ErrorMessage message="Post not found." />;

  return (
    <div className="page-enter">
      {/* Article header */}
      <header
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '56px 0 40px',
        }}
      >
        <div className="container-editorial" style={{ maxWidth: 920 }}>
          {post.series && (
            <span className="section-label" style={{ color: 'var(--accent)' }}>
              {post.series}
            </span>
          )}
          {!post.series && post.tags?.[0] && (
            <span className="section-label">{post.tags[0]}</span>
          )}

          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 1.05,
              margin: '14px 0 16px',
              color: 'var(--text)',
            }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '1.02rem',
                lineHeight: 1.8,
              }}
            >
              {post.excerpt}
            </p>
          )}

          <div style={{ marginTop: 18 }}>
            <PostMeta post={post} />
          </div>
        </div>
      </header>

      {/* Cover image */}
      {post.cover_image && (
        <div className="container-editorial" style={{ maxWidth: 920 }}>
          <img
            src={post.cover_image}
            alt={post.title}
            style={{
              width: '100%',
              borderRadius: 'var(--radius-lg)',
              marginTop: 32,
              objectFit: 'cover',
              maxHeight: 480,
            }}
          />
        </div>
      )}

      {/* Article body */}
      <section className="section">
        <div className="container-editorial" style={{ maxWidth: 920 }}>
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
                marginBottom: 28,
              }}
            >
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`${ROUTES.BLOGS}?tag=${tag}`}
                  className="pill"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          <PostContent html={post.body_html} />

          <div style={{ marginTop: 36 }}>
            <Link to={ROUTES.BLOGS} className="btn-ghost">
              &larr; Back to all stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
