/**
 * HeroSection - Welcome banner for the Mevyn homepage.
 *
 * Displays a large heading, tagline paragraph, and a CTA button linking
 * to the blogs listing page. Uses a subtle gradient background that
 * adapts to both light and dark themes.
 *
 * Used by: HomePage.
 */
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';
import { ROUTES } from '@/config/routes';

export default function HeroSection() {
  return (
    <section
      className={[
        'relative overflow-hidden rounded-2xl px-6 py-16 text-center',
        'bg-gradient-to-br from-secondary-50 via-white to-secondary-100',
        'dark:from-dark-surface dark:via-dark-bg dark:to-secondary-900/20',
        'sm:px-12 sm:py-24',
      ].join(' ')}
    >
      {/* Decorative background dots / subtle pattern */}
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none absolute inset-0 opacity-[0.04]',
          'dark:opacity-[0.06]',
        ].join(' ')}
        style={{
          backgroundImage:
            'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary-900 dark:text-dark-text sm:text-4xl lg:text-5xl">
          Welcome to Mevyn
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-primary-600 dark:text-dark-muted sm:text-lg">
          Your media body&apos;s home for stories, series, and events.
        </p>

        <div className="mt-8">
          <Link to={ROUTES.BLOGS}>
            <Button size="lg">Explore Posts</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
