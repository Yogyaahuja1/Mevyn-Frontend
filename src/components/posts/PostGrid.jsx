/**
 * PostGrid - Editorial responsive grid wrapper for PostCard components.
 *
 * Uses the .editorial-grid-3 CSS class for responsive column breakpoints
 * (3 cols desktop, 2 cols tablet, 1 col mobile -- defined in index.css).
 *
 * @param {object} props
 * @param {object[]} props.posts - Array of post objects passed to PostCard
 */
import PostCard from '@/components/posts/PostCard';

export default function PostGrid({ posts }) {
  if (!posts?.length) return null;

  return (
    <div
      className="editorial-grid-3"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
      }}
    >
      {posts.map((p) => (
        <PostCard key={p.uuid || p.slug} post={p} />
      ))}
    </div>
  );
}
