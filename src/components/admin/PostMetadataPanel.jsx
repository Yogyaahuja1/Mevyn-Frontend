/**
 * PostMetadataPanel - Sidebar panel for post metadata when creating/editing.
 *
 * Displays form fields for title, excerpt, tags, series, status, and anonymous
 * publishing. Tags are entered as comma-separated values and rendered as removable
 * badge chips.
 *
 * @param {object} props
 * @param {object} props.metadata - { title, excerpt, tags, series, status, anonymous }
 * @param {function} props.onChange - Called with (field, value) for each field change
 */
import { useState } from 'react';
import { X } from 'lucide-react';
import Input from '@/components/common/Input';
import Badge from '@/components/common/Badge';
import { cn } from '@/utils/cn';

export default function PostMetadataPanel({ metadata, onChange }) {
  const [tagInput, setTagInput] = useState('');

  /**
   * Process the tag input when comma is typed or Enter pressed.
   * Splits on commas, trims whitespace, deduplicates, and merges with existing tags.
   */
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTags(tagInput);
    }
  };

  const handleTagBlur = () => {
    if (tagInput.trim()) {
      addTags(tagInput);
    }
  };

  const addTags = (input) => {
    const newTags = input
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t && !metadata.tags.includes(t));

    if (newTags.length > 0) {
      onChange('tags', [...metadata.tags, ...newTags]);
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove) => {
    onChange(
      'tags',
      metadata.tags.filter((t) => t !== tagToRemove)
    );
  };

  return (
    <div
      className={cn(
        'space-y-5 rounded-lg border p-5',
        'bg-white border-primary-200',
        'dark:bg-dark-surface dark:border-dark-border'
      )}
    >
      <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-500 dark:text-dark-muted">
        Post Details
      </h3>

      {/* Title */}
      <Input
        label="Title"
        name="title"
        value={metadata.title}
        onChange={(e) => onChange('title', e.target.value)}
        placeholder="Post title"
        required
      />

      {/* Excerpt */}
      <div className="space-y-1">
        <label
          htmlFor="excerpt"
          className="block text-sm font-medium text-primary-700 dark:text-dark-text"
        >
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          value={metadata.excerpt}
          onChange={(e) => onChange('excerpt', e.target.value)}
          placeholder="Brief summary for previews..."
          className={cn(
            'block w-full rounded-lg border px-3 py-2 text-sm transition-colors',
            'bg-white border-primary-300 text-primary-800 placeholder-primary-400',
            'dark:bg-dark-surface2 dark:border-dark-border dark:text-dark-text dark:placeholder-dark-muted',
            'focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500',
            'resize-y'
          )}
        />
      </div>

      {/* Tags */}
      <div className="space-y-1">
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-primary-700 dark:text-dark-text"
        >
          Tags
        </label>
        <Input
          id="tags"
          name="tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          onBlur={handleTagBlur}
          placeholder="Type a tag, press comma or Enter..."
        />
        {metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1.5">
            {metadata.tags.map((tag) => (
              <Badge key={tag} variant="blue" className="gap-1 pr-1">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-secondary-200 dark:hover:bg-secondary-800 transition-colors"
                  aria-label={`Remove tag ${tag}`}
                >
                  <X size={12} />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Series */}
      <Input
        label="Series"
        name="series"
        value={metadata.series}
        onChange={(e) => onChange('series', e.target.value)}
        placeholder="Series name (optional)"
      />

      {/* Status */}
      <div className="space-y-1">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-primary-700 dark:text-dark-text"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={metadata.status}
          onChange={(e) => onChange('status', e.target.value)}
          className={cn(
            'block w-full rounded-lg border px-3 py-2 text-sm transition-colors',
            'bg-white border-primary-300 text-primary-800',
            'dark:bg-dark-surface2 dark:border-dark-border dark:text-dark-text',
            'focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500',
            'min-h-[44px]'
          )}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Anonymous */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="anonymous"
          name="anonymous"
          checked={metadata.anonymous}
          onChange={(e) => onChange('anonymous', e.target.checked)}
          className={cn(
            'h-4 w-4 rounded border-primary-300 text-secondary-600',
            'focus:ring-secondary-500',
            'dark:border-dark-border dark:bg-dark-surface2'
          )}
        />
        <label
          htmlFor="anonymous"
          className="text-sm text-primary-700 dark:text-dark-text"
        >
          Publish anonymously (as Mevyn Editorial Team)
        </label>
      </div>
    </div>
  );
}
