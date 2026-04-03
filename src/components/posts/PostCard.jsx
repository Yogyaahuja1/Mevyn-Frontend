/**
 * PostCard - Card component for blog listing grids.
 *
 * Displays a color gradient placeholder (deterministic based on title hash),
 * post title (linked to /blogs/:slug), truncated excerpt, author name(s) or
 * "Mevyn Editorial Team" when anonymous, formatted published date, and tags.
 *
 * Used by: PostGrid on BlogListingPage, HomePage featured posts.
 *
 * @param {object} props
 * @param {object} props.post
 * @param {string} props.post.uuid
 * @param {string} props.post.title
 * @param {string} props.post.slug
 * @param {Array<{name: string}>} props.post.authors
 * @param {boolean} props.post.anonymous
 * @param {string} props.post.excerpt
 * @param {string[]} props.post.tags
 * @param {string} props.post.published_at
 * @param {string} props.post.status
 */
import { Link } from 'react-router-dom';
import Badge from '@/components/common/Badge';
import { formatDate } from '@/utils/formatDate';
import { truncate } from '@/utils/truncate';
import { cn } from '@/utils/cn';
import { ANONYMOUS_AUTHOR } from '@/config/constants';
import { ROUTES } from '@/config/routes';

/**
 * Generate a deterministic gradient CSS string from a post title.
 * Hashes the title into two hue values so each post gets a unique gradient.
 *
 * @param {string} title
 * @returns {string} CSS linear-gradient value
 */
function titleGradient(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0; // convert to 32-bit int
  }
  const hue1 = Math.abs(hash) % 360;
  const hue2 = (hue1 + 40 + (Math.abs(hash >> 8) % 60)) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 65%, 55%), hsl(${hue2}, 55%, 45%))`;
}

export default function PostCard({ post }) {
  const {
    title,
    slug,
    authors,
    anonymous,
    excerpt,
    tags,
    published_at: publishedAt,
  } = post;

  const postUrl = ROUTES.BLOG_POST.replace(':slug', slug);
  const authorLabel = anonymous
    ? ANONYMOUS_AUTHOR
    : authors?.map((a) => a.name).join(', ') || ANONYMOUS_AUTHOR;

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border transition-shadow duration-200',
        'border-primary-200 bg-white shadow-sm hover:shadow-md',
        'dark:border-dark-border dark:bg-dark-surface hover:dark:shadow-lg'
      )}
    >
      {/* Gradient placeholder for cover image */}
      <Link to={postUrl} className="block" aria-hidden="true" tabIndex={-1}>
        <div
          className="h-40 sm:h-48 w-full"
          style={{ background: titleGradient(title) }}
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug">
          <Link
            to={postUrl}
            className={cn(
              'text-primary-800 hover:text-secondary-600 transition-colors',
              'dark:text-dark-text dark:hover:text-secondary-400'
            )}
          >
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm leading-relaxed text-primary-500 dark:text-dark-muted">
            {truncate(excerpt, 120)}
          </p>
        )}

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="blue">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Meta footer: author + date */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-primary-100 dark:border-dark-border">
          <span className="text-xs font-medium text-primary-600 dark:text-dark-muted truncate max-w-[60%]">
            {authorLabel}
          </span>
          {publishedAt && (
            <time
              dateTime={publishedAt}
              className="text-xs text-primary-400 dark:text-dark-muted"
            >
              {formatDate(publishedAt)}
            </time>
          )}
        </div>
      </div>
    </article>
  );
}
