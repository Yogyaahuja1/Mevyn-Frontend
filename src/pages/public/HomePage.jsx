/**
 * HomePage — the main landing page of the Mevyn website.
 *
 * Layout (full-width stacked editorial sections):
 *   - HeroSection (full-viewport editorial hero)
 *   - Ticker (scrolling marquee of latest post titles)
 *   - Series navigation (dashboard-style cards linking to each series)
 *   - RecentPosts (featured + grid editorial layout)
 *   - UpcomingEvents (timeline section)
 *   - TopicSuggestion (2-column form section)
 *
 * Route: /
 * Data: Series data is loaded here from the static JSON config;
 *       child components fetch their own API data.
 */
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ROUTES } from '@/config/routes';
import seriesData from '@/data/series-config.json';
import HeroSection from '@/components/home/HeroSection';
import Ticker from '@/components/home/Ticker';
import RecentPosts from '@/components/home/RecentPosts';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import TopicSuggestion from '@/components/home/TopicSuggestion';

export default function HomePage() {
  useDocumentTitle('Home');

  return (
    <div className="page-enter">
      <HeroSection />
      <Ticker />

      {/* Series navigation (dashboard cards) */}
      <section className="section-sm section-divider">
        <div className="container-editorial">
          <div
            style={{
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'space-between',
              marginBottom: 24,
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <span className="section-label">Navigate Coverage</span>
              <h2
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 1.14,
                  marginTop: 8,
                  color: 'var(--text)',
                }}
              >
                Our Series
              </h2>
            </div>
            <Link to={ROUTES.SERIES} className="btn-accent">
              All Series &rarr;
            </Link>
          </div>

          <div className="dashboard-grid">
            {[...seriesData]
              .sort((a, b) => a.order - b.order)
              .map((s) => (
                <Link
                  key={s.slug}
                  to={`/series/${s.slug}`}
                  className="dashboard-card"
                >
                  <div className="series-title">{s.title}</div>
                  <div className="series-desc">{s.description}</div>
                  <div className="dashboard-cta" style={{ marginTop: 12 }}>
                    Explore &rarr;
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <RecentPosts />
      <UpcomingEvents />
      <TopicSuggestion />
    </div>
  );
}
