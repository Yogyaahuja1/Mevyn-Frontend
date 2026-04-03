/**
 * BlogPostPage — full view of a single blog post.
 *
 * Displays the rendered HTML content with proper typography,
 * author info (or "Mevyn Editorial Team" if anonymous), date, reading time, and tags.
 *
 * Route: /blogs/:slug
 * Data: usePost(slug) hook
 */
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { usePost } from '@/hooks/usePost';
import { ROUTES } from '@/config/routes';
import PostContent from '@/components/posts/PostContent';
import PostMeta from '@/components/posts/PostMeta';
import Badge from '@/components/common/Badge';
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
    <article className="max-w-3xl mx-auto">
      {/* Back link */}
      <Link
        to={ROUTES.BLOGS}
        className="inline-flex items-center gap-1.5 text-sm text-primary-500 hover:text-secondary-600 dark:text-dark-muted dark:hover:text-secondary-400 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all posts
      </Link>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-primary-900 dark:text-dark-text mb-4 leading-tight">
        {post.title}
      </h1>

      {/* Meta: author, date, reading time */}
      <PostMeta post={post} />

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 mb-8">
          {post.tags.map((tag) => (
            <Link key={tag} to={`${ROUTES.BLOGS}?tag=${tag}`}>
              <Badge variant="blue">{tag}</Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Divider */}
      <hr className="border-primary-200 dark:border-dark-border mb-8" />

      {/* Post body */}
      <PostContent html={post.body_html} />
    </article>
  );
}
