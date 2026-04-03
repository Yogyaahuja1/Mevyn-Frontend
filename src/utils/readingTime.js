/**
 * Estimate reading time from HTML content.
 *
 * Strips HTML tags, counts words, and divides by average reading speed
 * (200 words per minute). Used by PostMeta and BlogPostPage.
 *
 * @param {string} html - The body_html content of a post
 * @returns {string} Human-readable estimate, e.g. "3 min read"
 */
export function readingTime(html) {
  if (!html) return '1 min read';

  // Strip HTML tags to get plain text
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
}
