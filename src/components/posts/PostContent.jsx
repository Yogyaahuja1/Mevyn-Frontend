/**
 * PostContent - Renders blog post HTML body with editorial typography.
 *
 * Uses dangerouslySetInnerHTML to inject pre-sanitized body_html from the API.
 * Wraps content in Tailwind Typography `prose` classes for consistent styling,
 * with editorial CSS variable overrides for font and color.
 * Dark mode prose overrides are handled via CSS in index.css.
 *
 * @param {object} props
 * @param {string} props.html - The body_html string from the post
 */
export default function PostContent({ html }) {
  if (!html) return null;

  return (
    <div
      className="prose prose-lg max-w-none"
      style={{
        fontFamily: 'var(--sans)',
        color: 'var(--text-muted)',
        lineHeight: 1.9,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
