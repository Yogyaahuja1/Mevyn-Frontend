/**
 * MemberCard - Displays a single team member's profile card.
 *
 * Shows a circular photo, name, designation, and a LinkedIn icon link.
 * Photo falls back to placeholder-avatar.svg when the image fails to load.
 *
 * Used by: MembersPanel on the About page.
 *
 * @param {object} props
 * @param {object} props.member
 * @param {string} props.member.id          - Unique identifier
 * @param {string} props.member.name        - Full name
 * @param {string} props.member.designation - Role / title
 * @param {string} props.member.photo       - Path to photo (relative to public/)
 * @param {string} props.member.linkedin    - LinkedIn profile URL
 */
import { cn } from '@/utils/cn';

/** Inline LinkedIn SVG icon — lucide-react doesn't include brand icons */
function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const PLACEHOLDER = '/team/placeholder-avatar.svg';

export default function MemberCard({ member }) {
  const { name, designation, photo, linkedin } = member;

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 rounded-xl p-6 text-center',
        'bg-white border border-primary-200 shadow-sm',
        'dark:bg-dark-surface dark:border-dark-border',
        'transition-shadow duration-200 hover:shadow-md'
      )}
    >
      {/* Circular avatar */}
      <img
        src={photo || PLACEHOLDER}
        alt={name}
        onError={(e) => {
          e.currentTarget.src = PLACEHOLDER;
        }}
        className="h-24 w-24 rounded-full object-cover bg-primary-100 dark:bg-dark-surface2"
      />

      {/* Name */}
      <h3 className="text-lg font-bold text-primary-800 dark:text-dark-text">
        {name}
      </h3>

      {/* Designation */}
      <p className="text-sm text-primary-500 dark:text-dark-muted">
        {designation}
      </p>

      {/* LinkedIn link */}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          className={cn(
            'inline-flex items-center justify-center rounded-lg p-2',
            'text-secondary-600 hover:bg-secondary-50',
            'dark:text-secondary-400 dark:hover:bg-dark-surface2',
            'transition-colors duration-150',
            'min-h-[44px] min-w-[44px]' // Touch-friendly target
          )}
        >
          <LinkedinIcon className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}
