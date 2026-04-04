/**
 * PostMeta - Editorial metadata bar showing author, date, and reading time.
 *
 * Displays "Mevyn Editorial Team" when the post is anonymous or has no authors.
 * Uses editorial CSS variables for consistent styling.
 *
 * @param {object} props
 * @param {object} props.post
 * @param {Array<{name: string}>} props.post.authors
 * @param {boolean} props.post.anonymous
 * @param {string} props.post.published_at
 * @param {string} props.post.body_html
 */
import { readingTime } from '@/utils/readingTime';
import { formatDate } from '@/utils/formatDate';
import { ANONYMOUS_AUTHOR } from '@/config/constants';

export default function PostMeta({ post }) {
  const authorName =
    post.anonymous || !post.authors?.length
      ? ANONYMOUS_AUTHOR
      : post.authors.map((a) => a.name).join(', ');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontSize: '0.9rem',
        color: 'var(--text-dim)',
        flexWrap: 'wrap',
      }}
    >
      <span>
        By{' '}
        <strong style={{ color: 'var(--text)', fontWeight: 500 }}>
          {authorName}
        </strong>
      </span>
      <span>&middot;</span>
      <span>{formatDate(post.published_at)}</span>
      <span>&middot;</span>
      <span>{readingTime(post.body_html)}</span>
    </div>
  );
}
