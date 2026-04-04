/**
 * TagFilter - Editorial pill-based tag filter for blog listing.
 *
 * Shows an "All" pill plus one pill per unique tag. The selected tag is
 * highlighted using the .pill.active editorial CSS class.
 *
 * @param {object} props
 * @param {string[]} props.tags - Unique tag strings to display
 * @param {string|null} props.selectedTag - Currently selected tag, or null for "All"
 * @param {(tag: string|null) => void} props.onTagSelect - Callback when a tag is selected
 */
export default function TagFilter({ tags, selectedTag, onTagSelect }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button
        className={`pill${!selectedTag ? ' active' : ''}`}
        onClick={() => onTagSelect(null)}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          className={`pill${selectedTag === tag ? ' active' : ''}`}
          onClick={() => onTagSelect(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
