/**
 * Classname merge utility.
 *
 * Combines clsx (conditional class logic) with tailwind-merge
 * (deduplicates conflicting Tailwind classes like `bg-white bg-dark-bg`).
 *
 * Usage:
 *   cn('px-4 py-2', isActive && 'bg-secondary-600', className)
 *
 * @param {...(string|boolean|null|undefined)} inputs - Class values
 * @returns {string} Merged class string
 */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
