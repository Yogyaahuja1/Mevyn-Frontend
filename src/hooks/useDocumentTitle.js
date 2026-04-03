/**
 * Set the document <title> dynamically.
 *
 * Appends " | Mevyn" to every page title for consistent branding.
 * Reverts to "Mevyn" on unmount.
 *
 * @param {string} title - The page-specific title (e.g., "All Posts")
 */
import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | Mevyn` : 'Mevyn';
    return () => { document.title = prev; };
  }, [title]);
}
