/**
 * PostMeta - Metadata bar showing author(s), published date, and reading time.
 *
 * Displays "Mevyn Editorial Team" when the post is anonymous.
 * Uses lucide-react icons for visual clarity.
 *
 * Used by: BlogPostPage (below the title, above PostContent).
 *
 * @param {object} props
 * @param {object} props.post
 * @param {Array<{name: string}>} props.post.authors
 * @param {boolean} props.post.anonymous
 * @param {string} props.post.published_at
 * @param {string} props.post.body_html
 */
import { User, Calendar, Clock } from 'lucide-react';
import { readingTime } from '@/utils/readingTime';
import { formatDate } from '@/utils/formatDate';
import { ANONYMOUS_AUTHOR } from '@/config/constants';
import { cn } from '@/utils/cn';

export default function PostMeta({ post }) {
  const { authors, anonymous, published_at: publishedAt, body_html: bodyHtml } = post;

  const authorLabel = anonymous
    ? ANONYMOUS_AUTHOR
    : authors?.map((a) => a.name).join(', ') || ANONYMOUS_AUTHOR;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-5 gap-y-2 text-sm',
        'text-primary-500 dark:text-dark-muted'
      )}
    >
      {/* Author */}
      <span className="inline-flex items-center gap-1.5">
        <User className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{authorLabel}</span>
      </span>

      {/* Published date */}
      {publishedAt && (
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        </span>
      )}

      {/* Reading time */}
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{readingTime(bodyHtml)}</span>
      </span>
    </div>
  );
}
