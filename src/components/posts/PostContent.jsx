/**
 * PostContent - Renders blog post HTML body with typographic styling.
 *
 * Uses dangerouslySetInnerHTML to inject pre-sanitized body_html from the API.
 * Wraps content in Tailwind Typography `prose` classes for consistent styling.
 * Dark mode overrides are provided via CSS custom properties in index.css
 * (see `.dark .prose` block).
 *
 * Used by: BlogPostPage.
 *
 * @param {object} props
 * @param {string} props.html - The body_html string from the post
 */
import { cn } from '@/utils/cn';

export default function PostContent({ html }) {
  if (!html) return null;

  return (
    <div
      className={cn(
        'prose prose-primary max-w-none',
        // Responsive font sizing
        'prose-sm sm:prose-base lg:prose-lg',
        // Link styling
        'prose-a:text-secondary-600 prose-a:underline-offset-2 hover:prose-a:text-secondary-700',
        // Image rounding
        'prose-img:rounded-lg',
        // Code block styling
        'prose-pre:rounded-lg prose-pre:border prose-pre:border-primary-200',
        // Dark mode — CSS vars in index.css handle prose colors
        'dark:prose-pre:border-dark-border'
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
