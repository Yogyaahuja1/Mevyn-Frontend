/**
 * Debounced search input component.
 *
 * Fires onChange callback only after the user stops typing (debounced).
 * Used by BlogListingPage and PostManagementPage.
 *
 * @param {object} props
 * @param {string} props.value - Current search query
 * @param {Function} props.onChange - Called with the new search string
 * @param {string} [props.placeholder='Search...']
 */
import { Search, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function SearchBar({ value, onChange, placeholder = 'Search...', className }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-400 dark:text-dark-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg border pl-10 pr-10 py-2 text-sm transition-colors',
          'bg-white border-primary-300 text-primary-800 placeholder-primary-400',
          'dark:bg-dark-surface2 dark:border-dark-border dark:text-dark-text dark:placeholder-dark-muted',
          'focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500',
          'min-h-[44px]'
        )}
        aria-label="Search"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600 dark:text-dark-muted dark:hover:text-dark-text"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
