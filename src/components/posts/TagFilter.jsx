/**
 * TagFilter - Horizontal scrollable tag chip filter for blog listing.
 *
 * Shows an "All" chip plus one chip per unique tag. The selected tag is
 * visually highlighted with the secondary (blue) color. Scrolls horizontally
 * on mobile screens.
 *
 * Used by: BlogListingPage.
 *
 * @param {object} props
 * @param {string[]} props.tags - Unique tag strings to display
 * @param {string|null} props.selectedTag - Currently selected tag, or null for "All"
 * @param {(tag: string|null) => void} props.onTagSelect - Callback when a tag is selected
 */
import { cn } from '@/utils/cn';

/**
 * Individual tag chip button.
 * @param {object} props
 * @param {string} props.label
 * @param {boolean} props.isActive
 * @param {() => void} props.onClick
 */
function TagChip({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg',
        'min-h-[36px]', // Touch-friendly target
        isActive
          ? 'bg-secondary-600 text-white dark:bg-secondary-500 dark:text-white'
          : cn(
              'bg-primary-100 text-primary-600 hover:bg-primary-200',
              'dark:bg-dark-surface2 dark:text-dark-muted dark:hover:bg-dark-border'
            )
      )}
    >
      {label}
    </button>
  );
}

export default function TagFilter({ tags, selectedTag, onTagSelect }) {
  if (!tags?.length) return null;

  return (
    <div
      className={cn(
        'flex gap-2 overflow-x-auto pb-2',
        // Hide scrollbar but keep scrollable
        'scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]',
        '[&::-webkit-scrollbar]:hidden'
      )}
      role="toolbar"
      aria-label="Filter posts by tag"
    >
      {/* "All" chip */}
      <TagChip
        label="All"
        isActive={selectedTag === null}
        onClick={() => onTagSelect(null)}
      />

      {/* Tag chips */}
      {tags.map((tag) => (
        <TagChip
          key={tag}
          label={tag}
          isActive={selectedTag === tag}
          onClick={() => onTagSelect(tag)}
        />
      ))}
    </div>
  );
}
