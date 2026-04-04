/**
 * PostEditorPage - Rich text editor for creating and editing blog posts.
 *
 * Route: /admin/posts/new      (create mode)
 * Route: /admin/posts/:uuid    (edit mode)
 * Protected route requiring authentication.
 *
 * Composes PostEditor (TipTap WYSIWYG) + PostMetadataPanel (sidebar form).
 * Desktop: 3/4 editor + 1/4 metadata side-by-side.
 * Mobile: stacked, editor on top, metadata below.
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PostEditor from '@/components/admin/PostEditor';
import PostMetadataPanel from '@/components/admin/PostMetadataPanel';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { createPost, updatePost, getPost } from '@/services/postService';
import { ROUTES } from '@/config/routes';
import logger from '@/utils/logger';

const INITIAL_METADATA = {
  title: '',
  excerpt: '',
  cover_image: '',
  tags: [],
  series: '',
  status: 'draft',
  anonymous: false,
};

export default function PostEditorPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(uuid);

  const [bodyHtml, setBodyHtml] = useState('');
  const [metadata, setMetadata] = useState(INITIAL_METADATA);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useDocumentTitle(isEditMode ? `Edit: ${metadata.title || 'Post'}` : 'New Post');

  // Fetch existing post data when in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    let cancelled = false;

    async function fetchPost() {
      try {
        setLoading(true);
        const res = await getPost(uuid);
        const post = res.data || res;

        if (cancelled) return;

        setBodyHtml(post.body_html || '');
        setMetadata({
          title: post.title || '',
          excerpt: post.excerpt || '',
          cover_image: post.cover_image || '',
          tags: post.tags || [],
          series: post.series || '',
          status: post.status || 'draft',
          anonymous: post.anonymous || false,
        });
      } catch (err) {
        logger.error('PostEditorPage', 'Failed to fetch post', err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPost();
    return () => { cancelled = true; };
  }, [uuid, isEditMode]);

  /**
   * Handle metadata field changes from the sidebar panel.
   */
  const handleMetadataChange = (field, value) => {
    setMetadata((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Persist the post to the backend.
   * @param {'draft'|'published'} status - Override the current status for this save
   */
  const handleSave = async (status) => {
    if (!metadata.title.trim()) {
      setError('Title is required.');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const payload = {
        title: metadata.title,
        body_html: bodyHtml,
        excerpt: metadata.excerpt || undefined,
        cover_image: metadata.cover_image || undefined,
        tags: metadata.tags.length > 0 ? metadata.tags : undefined,
        series: metadata.series || undefined,
        status,
        anonymous: metadata.anonymous,
      };

      if (isEditMode) {
        await updatePost(uuid, payload);
        logger.info('PostEditorPage', `Post ${uuid} updated`);
      } else {
        await createPost(payload);
        logger.info('PostEditorPage', 'New post created');
      }

      navigate(ROUTES.ADMIN_POSTS);
    } catch (err) {
      logger.error('PostEditorPage', 'Failed to save post', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading post..." />;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-900 dark:text-dark-text">
          {isEditMode ? `Edit: ${metadata.title || 'Untitled'}` : 'New Post'}
        </h1>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => handleSave('draft')}
            loading={saving}
            disabled={saving}
          >
            Save Draft
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSave('published')}
            loading={saving}
            disabled={saving}
          >
            Publish
          </Button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Editor + Metadata layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Editor (3/4 on desktop) */}
        <div className="w-full lg:w-3/4">
          <PostEditor content={bodyHtml} onChange={setBodyHtml} />
        </div>

        {/* Metadata sidebar (1/4 on desktop) */}
        <div className="w-full lg:w-1/4">
          <PostMetadataPanel metadata={metadata} onChange={handleMetadataChange} />
        </div>
      </div>
    </div>
  );
}
