/**
 * AboutPage — institution description and team members panel.
 *
 * The "About" section uses lorem ipsum placeholder text.
 * The team members panel reads from src/data/team.json.
 *
 * Route: /about
 */
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import MembersPanel from '@/components/about/MembersPanel';

export default function AboutPage() {
  useDocumentTitle('About Us');

  return (
    <div className="space-y-16">
      {/* About the institution */}
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-900 dark:text-dark-text mb-6">
          About Mevyn
        </h1>
        <div className="space-y-4 text-primary-600 dark:text-dark-muted leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
          <p>
            Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et
            commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
            Integer in mauris eu nibh euismod gravida.
          </p>
        </div>
      </section>

      {/* Team members */}
      <MembersPanel />
    </div>
  );
}
