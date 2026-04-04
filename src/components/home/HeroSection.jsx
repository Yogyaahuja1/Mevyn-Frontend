/**
 * HeroSection - Full-viewport editorial hero with optional photo carousel.
 *
 * Background modes (controlled by src/data/hero-config.json):
 *   - carousel.enabled = true  -> Crossfading photo slideshow from public/hero/
 *   - carousel.enabled = false -> Static pre-rendered path artwork matched to the current theme
 *
 * To add carousel photos:
 *   1. Drop images into public/hero/
 *   2. Add filenames to hero-config.json -> carousel.photos array
 *   3. Set carousel.enabled = true
 *
 * Used by: HomePage
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { useTheme } from '@/hooks/useTheme';
import heroConfig from '@/data/hero-config.json';

export default function HeroSection() {
  const { carousel } = heroConfig;

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 86,
        overflow: 'hidden',
      }}
    >
      {/* Background - carousel or static path art */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {carousel.enabled && carousel.photos?.length > 0 ? (
          <PhotoCarousel photos={carousel.photos} interval={carousel.interval || 5000} />
        ) : (
          <RibbonArt />
        )}
        <div className="hero-overlay" />
      </div>

      {/* Content panel */}
      <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
            <span className="section-label">IIT Dharwad</span>
            <span style={{ width: 1, height: 12, background: 'var(--border)' }} />
            <span className="live-badge">
              <span className="live-dot" />
              Student Media Body
            </span>
          </div>

          <h1 className="hero-title">
            Document,
            <br />
            Apprise, and <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Reason</em>
          </h1>

          <p className="hero-subtitle">
            The official media body of IIT Dharwad &mdash; covering campus events,
            amplifying student voices, and documenting the stories that shape our community.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link to={ROUTES.BLOGS} className="btn-accent">
              Explore Stories &rarr;
            </Link>
            <Link to={ROUTES.ABOUT} className="btn-ghost">
              Meet the Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Photo carousel - crossfades between images on a timer.
 * Photos loaded from public/hero/ directory.
 */
function PhotoCarousel({ photos, interval }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (photos.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [photos.length, interval]);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {photos.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === current ? 0.8 : 0,
            transition: 'opacity 1.2s ease-in-out',
          }}
        />
      ))}
      {photos.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            right: 40,
            display: 'flex',
            gap: 8,
            zIndex: 2,
          }}
        >
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i);
                clearInterval(timerRef.current);
              }}
              style={{
                width: i === current ? 28 : 6,
                height: 3,
                borderRadius: 2,
                background: i === current ? 'var(--accent)' : 'var(--border)',
                transition: 'all 0.3s',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * RibbonArt - static pre-rendered hero art matched to the current theme.
 */
function RibbonArt() {
  const { theme } = useTheme();
  const src = theme === 'dark' ? '/hero/paths-dark.svg' : '/hero/paths-light.svg';

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    />
  );
}
