/**
 * MembersPanel - Responsive grid of team MemberCards.
 *
 * Reads member data from the static team.json file, sorts by the
 * `order` field, and renders each member inside a MemberCard.
 *
 * Grid breakpoints (mobile-first):
 *   default  1 column
 *   sm       2 columns
 *   md       3 columns
 *   lg       4 columns
 *
 * Used by: AboutPage
 *
 * @param {object} [props]            - No required props
 * @param {string} [props.className]  - Additional classes for the wrapper
 */
import teamData from '@/data/team.json';
import MemberCard from '@/components/about/MemberCard';
import { cn } from '@/utils/cn';

export default function MembersPanel({ className }) {
  const sortedMembers = [...teamData.members].sort(
    (a, b) => a.order - b.order
  );

  return (
    <section className={cn('py-10 px-4 sm:px-6 lg:px-8', className)}>
      {/* Section heading */}
      <h2 className="mb-8 text-center text-2xl font-bold text-primary-800 dark:text-dark-text sm:text-3xl">
        Our Team
      </h2>

      {/* Member grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
