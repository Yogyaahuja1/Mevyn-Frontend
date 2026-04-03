/**
 * PostGrid - Responsive grid wrapper for PostCard components.
 *
 * Layout:
 *   - 1 column on mobile (< md)
 *   - 2 columns on md
 *   - 3 columns on lg and above
 *
 * Used by: BlogListingPage, HomePage featured section.
 *
 * @param {object} props
 * @param {object[]} props.posts - Array of post objects passed to PostCard
 */
import PostCard from '@/components/posts/PostCard';

export default function PostGrid({ posts }) {
  if (!posts?.length) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.uuid} post={post} />
      ))}
    </div>
  );
}
