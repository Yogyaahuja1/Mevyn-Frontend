import { useMemo, useRef, useState } from 'react';

/**
 * BorderGlow
 * Adds an edge-sensitive glow around any wrapped content.
 */
export default function BorderGlow({
  children,
  edgeSensitivity = 24,
  glowColor = '201 168 76',
  backgroundColor = 'transparent',
  borderRadius = 12,
  glowRadius = 28,
  glowIntensity = 0.7,
  coneSpread = 24,
  animated = false,
  colors,
  style,
}) {
  const hostRef = useRef(null);
  const [state, setState] = useState({ x: -9999, y: -9999, strength: 0 });

  const gradientStops = useMemo(() => {
    if (Array.isArray(colors) && colors.length >= 2) {
      return colors.join(', ');
    }
    return `rgba(${glowColor}, 0.7), rgba(${glowColor}, 0.24), rgba(${glowColor}, 0.03)`;
  }, [colors, glowColor]);

  const handleMove = (event) => {
    const node = hostRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const dLeft = x;
    const dRight = rect.width - x;
    const dTop = y;
    const dBottom = rect.height - y;
    const nearest = Math.min(dLeft, dRight, dTop, dBottom);

    const ratio = Math.max(0, 1 - nearest / edgeSensitivity);
    const strength = Math.max(0, Math.min(1, ratio * glowIntensity));

    setState({ x, y, strength });
  };

  const handleLeave = () => setState((prev) => ({ ...prev, strength: 0 }));

  return (
    <div
      ref={hostRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        position: 'relative',
        borderRadius,
        background: backgroundColor,
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius,
          pointerEvents: 'none',
          opacity: state.strength,
          transition: animated ? 'opacity 120ms linear' : 'opacity 180ms ease',
          boxShadow: `0 0 ${glowRadius}px rgba(${glowColor}, ${Math.min(0.24, 0.1 + state.strength * 0.14)})`,
          background: `conic-gradient(from 0deg at ${state.x}px ${state.y}px, ${gradientStops})`,
          WebkitMask:
            `radial-gradient(circle ${coneSpread}% at ${state.x}px ${state.y}px, black 0%, transparent 70%)`,
          mask:
            `radial-gradient(circle ${coneSpread}% at ${state.x}px ${state.y}px, black 0%, transparent 70%)`,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, borderRadius }}>{children}</div>
    </div>
  );
}
