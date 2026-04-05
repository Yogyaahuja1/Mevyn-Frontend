/**
 * Ticker - Scrolling marquee showing the latest post titles.
 *
 * Fetches the 8 most recent posts and displays their titles in a
 * continuously scrolling horizontal strip. The items array is tripled
 * to create a seamless infinite-loop animation (CSS handles the
 * translate keyframe via the ticker-track class).
 *
 * Falls back to static placeholder items when no posts are available.
 *
 * Used by: HomePage (placed directly below HeroSection).
 */
import { usePosts } from '@/hooks/usePosts';

export default function Ticker() {
  const { posts } = usePosts({ limit: 8 });

  // Build ticker items from post titles, or use fallback
  const items =
    posts.length > 0
      ? posts.map((p) => p.title)
      : ['Welcome to Mevyn', 'Stories coming soon', 'Campus media coverage'];

  // Triple for seamless loop
  const tripled = [...items, ...items, ...items];

  return (
    <div className="ticker-wrap">
      <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, overflow: 'hidden' }}>
        <span className="ticker-indicator-label" style={{ padding: '0 12px 0 18px', flexShrink: 0 }}>Latest</span>
        <span style={{ width: 1, height: 16, background: 'var(--border-accent)', flexShrink: 0 }} />
        <div className="ticker-track">
          {tripled.map((item, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="ticker-indicator">
        <span className="ticker-indicator-label">Slide</span>
        <span>{items.length.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
}
