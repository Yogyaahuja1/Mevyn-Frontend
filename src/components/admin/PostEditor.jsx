/**
 * PostEditor - TipTap rich text editor wrapper for blog post content.
 *
 * Provides a full WYSIWYG editing experience with a grouped toolbar
 * for formatting text, headings, lists, alignment, media, and history.
 *
 * @param {object} props
 * @param {string} props.content - Initial HTML content (empty for new posts)
 * @param {function} props.onChange - Called with updated HTML string on every change
 */
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  Undo,
  Redo,
} from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Single toolbar button with active state highlighting.
 */
function ToolbarButton({ onClick, isActive = false, disabled = false, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'p-2 rounded-md transition-colors duration-150',
        'hover:bg-primary-200 dark:hover:bg-dark-surface2',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        isActive
          ? 'bg-primary-200 text-secondary-600 dark:bg-dark-surface2 dark:text-secondary-400'
          : 'text-primary-600 dark:text-dark-muted'
      )}
    >
      {children}
    </button>
  );
}

/**
 * Visual separator between toolbar groups.
 */
function ToolbarDivider() {
  return <div className="w-px h-6 bg-primary-300 dark:bg-dark-border mx-1" />;
}

/**
 * Toolbar component with grouped formatting controls.
 */
function Toolbar({ editor }) {
  if (!editor) return null;

  const handleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl || 'https://');
    if (url === null) return; // cancelled
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleImage = () => {
    const url = window.prompt('Enter image URL:', 'https://');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleYoutube = () => {
    const url = window.prompt('Enter YouTube URL:');
    if (!url) return;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/);
    if (!match) { alert('Invalid YouTube URL'); return; }
    editor.chain().focus().insertContent(
      `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5em 0;border-radius:8px"><iframe src="https://www.youtube-nocookie.com/embed/${match[1]}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe></div>`
    ).run();
  };

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-0.5 p-2 border-b',
        'bg-primary-50 border-primary-200',
        'dark:bg-dark-surface dark:border-dark-border'
      )}
    >
      {/* Text formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Bold"
      >
        <Bold size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Italic"
      >
        <Italic size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
        title="Underline"
      >
        <UnderlineIcon size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
        title="Strikethrough"
      >
        <Strikethrough size={18} />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
        title="Heading 3"
      >
        <Heading3 size={18} />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Lists & blockquote */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <List size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title="Ordered List"
      >
        <ListOrdered size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        title="Blockquote"
      >
        <Quote size={18} />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
        title="Align Left"
      >
        <AlignLeft size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
        title="Align Center"
      >
        <AlignCenter size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
        title="Align Right"
      >
        <AlignRight size={18} />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Media */}
      <ToolbarButton
        onClick={handleLink}
        isActive={editor.isActive('link')}
        title="Insert Link"
      >
        <LinkIcon size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={handleImage}
        title="Insert Image"
      >
        <ImageIcon size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={handleYoutube}
        title="Embed YouTube Video"
      >
        <Video size={18} />
      </ToolbarButton>

      <ToolbarDivider />

      {/* History */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo size={18} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo size={18} />
      </ToolbarButton>
    </div>
  );
}

export default function PostEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image,
      Placeholder.configure({
        placeholder: 'Start writing your post...',
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  return (
    <div
      className={cn(
        'rounded-lg border overflow-hidden',
        'border-primary-300 bg-white',
        'dark:border-dark-border dark:bg-dark-surface'
      )}
    >
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className={cn(
          'prose max-w-none min-h-[400px] p-4',
          'bg-white text-primary-800',
          'dark:bg-dark-surface dark:text-dark-text',
          '[&_.tiptap]:outline-none [&_.tiptap]:min-h-[400px]',
          '[&_.tiptap_p.is-editor-empty:first-child::before]:text-primary-400',
          '[&_.tiptap_p.is-editor-empty:first-child::before]:dark:text-dark-muted',
          '[&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
          '[&_.tiptap_p.is-editor-empty:first-child::before]:float-left',
          '[&_.tiptap_p.is-editor-empty:first-child::before]:h-0',
          '[&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none'
        )}
      />
    </div>
  );
}
