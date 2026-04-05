import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ROUTES } from '@/config/routes';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useEvents } from '@/hooks/useEvents';
import { formatDate } from '@/utils/formatDate';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import Hyperspeed from '@/components/common/Hyperspeed';

export default function TimelinePage() {
  useDocumentTitle('Timeline');
  const [showIntro, setShowIntro] = useState(true);
  const { events, isLoading, error, refetch } = useEvents({ limit: 30 });

  const timelineEffectOptions = useMemo(
    () => ({
      distortion: 'LongRaceDistortion',
      autoSpeedUp: true,
      length: 400,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 108,
      fovSpeedUp: 124,
      speedUp: 2.2,
      carLightsFade: 0.36,
      totalSideLightSticks: 34,
      lightPairsPerRoadWay: 38,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5],
      lightStickHeight: [1.3, 1.7],
      movingAwaySpeed: [52, 78],
      movingCloserSpeed: [-108, -154],
      carLightsLength: [140, 300],
      carLightsRadius: [0.05, 0.14],
      carWidthPercentage: [0.3, 0.5],
      carShiftX: [-0.35, 0.35],
      carFloorSeparation: [0.05, 1.2],
      colors: {
        roadColor: 0x0a0a0a,
        islandColor: 0x111111,
        background: 0x000000,
        shoulderLines: 0x2d2616,
        brokenLines: 0x43331a,
        leftCars: [0xe2c478, 0xc9a84c, 0xb89339],
        rightCars: [0xb38a34, 0xa33a2d, 0x7e6024],
        sticks: [0xd3b466, 0xb63a2d],
      },
    }),
    []
  );

  useEffect(() => {
    const endTimer = window.setTimeout(() => setShowIntro(false), 2450);
    return () => {
      window.clearTimeout(endTimer);
    };
  }, []);

  useEffect(() => {
    if (!showIntro) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntro]);

  if (showIntro) {
    return createPortal(
      <div
        className="timeline-intro-screen"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 20000,
          background: '#000',
          pointerEvents: 'all',
          display: 'grid',
          placeItems: 'end start',
        }}
      >
        <Hyperspeed effectOptions={timelineEffectOptions} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'flex-end',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.08) 44%, transparent 72%)',
          }}
        >
          <div className="container-editorial" style={{ paddingBottom: 'clamp(28px, 7vh, 84px)' }}>
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.82)' }}>
              MEVYN TIMELINE
            </span>
            <h1
              className="hero-title"
              style={{
                marginBottom: 10,
                color: '#f1d48a',
                textShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
              }}
            >
              Roadmap Journey Till Now
            </h1>
            <p className="hero-subtitle" style={{ maxWidth: '52ch', color: 'rgba(233, 211, 156, 0.9)' }}>
              Loading our timeline of stories, events, and milestones.
            </p>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  const sorted = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
  const now = Date.now();
  const covered = sorted.filter((e) => new Date(e.date).getTime() <= now);
  const upcoming = sorted.filter((e) => new Date(e.date).getTime() > now);

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
      <section style={{ padding: '80px 0 64px', borderBottom: '1px solid var(--border)' }}>
        <div className="container-editorial">
          <span className="section-label">Roadmap of Coverage</span>
          <h1 className="hero-title" style={{ marginBottom: 10 }}>
            Timeline of What We Covered
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 56 + 'ch' }}>
            A complete view of every event we've covered and what's coming next.
          </p>
          <Link to={ROUTES.BLOGS} className="btn-accent" style={{ marginTop: 28, display: 'inline-block' }}>
            Explore Stories &rarr;
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container-editorial">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} onRetry={refetch} />}

          {!isLoading && !error && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 54 }}>
              <div>
                <div className="section-label" style={{ marginBottom: 20 }}>Covered Events</div>
                <div className="timeline">
                  {covered.map((ev) => (
                    <div className="timeline-item" key={ev.uuid}>
                      <div className="timeline-dot" />
                      <div className="timeline-date">{formatDate(ev.date)}</div>
                      <div className="timeline-title">{ev.title}</div>
                      <div className="timeline-desc">{ev.description || 'Coverage completed by MEVYN editorial team.'}</div>
                    </div>
                  ))}
                  {covered.length === 0 && <div className="timeline-desc">No covered events yet.</div>}
                </div>
              </div>

              <div>
                <div className="section-label" style={{ marginBottom: 20 }}>Upcoming Events</div>
                <div className="timeline">
                  {upcoming.map((ev) => (
                    <div className="timeline-item" key={ev.uuid}>
                      <div className="timeline-dot" style={{ background: 'transparent', border: '1px dashed var(--accent)' }} />
                      <div className="timeline-date">{formatDate(ev.date)}</div>
                      <div className="timeline-title">{ev.title}</div>
                      <div className="timeline-desc">{ev.description || 'Scheduled for upcoming coverage.'}</div>
                    </div>
                  ))}
                  {upcoming.length === 0 && <div className="timeline-desc">No upcoming events right now.</div>}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px){
          section .container-editorial > div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;gap:40px!important;}
        }
      `}</style>
    </div>
  );
}
