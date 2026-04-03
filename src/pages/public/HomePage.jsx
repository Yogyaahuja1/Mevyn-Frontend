/**
 * HomePage — the main landing page of the Mevyn website.
 *
 * Layout:
 *   - HeroSection (welcome banner + CTA)
 *   - Body: 2/3 RecentPosts grid + 1/3 UpcomingEvents sidebar (stacked on mobile)
 *   - TopicSuggestion (Google Form embed placeholder)
 *
 * Route: /
 * Data: Self-contained — child components fetch their own data.
 */
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import HeroSection from '@/components/home/HeroSection';
import RecentPosts from '@/components/home/RecentPosts';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import TopicSuggestion from '@/components/home/TopicSuggestion';

export default function HomePage() {
  useDocumentTitle('Home');

  return (
    <div className="space-y-12">
      <HeroSection />

      {/* Main content: posts grid + events sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentPosts />
        </div>
        <aside className="lg:col-span-1">
          <UpcomingEvents />
        </aside>
      </div>

      <TopicSuggestion />
    </div>
  );
}
