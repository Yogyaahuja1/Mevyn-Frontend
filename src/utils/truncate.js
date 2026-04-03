/**
 * Truncate a string to a maximum length, appending ellipsis if truncated.
 *
 * Used by PostCard to cap excerpt length in the grid view.
 *
 * @param {string} text - The string to truncate
 * @param {number} [maxLength=150] - Maximum character count
 * @returns {string} Truncated string with "..." if it exceeded maxLength
 */
export function truncate(text, maxLength = 150) {
  if (!text || text.length <= maxLength) return text || '';
  return text.slice(0, maxLength).trimEnd() + '...';
}
