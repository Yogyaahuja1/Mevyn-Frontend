/**
 * MemberCard - Editorial team member card with square photo.
 *
 * Shows a square photo, name, designation, and a text LinkedIn link.
 * Photo falls back to placeholder-avatar.svg when the image fails to load.
 *
 * Uses editorial CSS variables (--bg2, --border, --border-accent, --radius-lg,
 * --serif, --text, --accent, --text-dim) for consistent styling.
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

import BorderGlow from '@/components/common/BorderGlow';

const PLACEHOLDER = '/team/placeholder-avatar.svg';

export default function MemberCard({ member }) {
  const { name, designation, photo, linkedin } = member;

  return (
    <BorderGlow
      glowColor="201 168 76"
      borderRadius={8}
      glowIntensity={0.58}
      glowRadius={20}
      colors={['rgba(226, 196, 120, 0.55)', 'rgba(160, 120, 48, 0.15)', 'rgba(160, 120, 48, 0.04)']}
      style={{ maxWidth: 200 }}
    >
      <div
        style={{
          background: 'var(--bg2)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          transition: 'all 0.3s',
          maxWidth: 200,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-accent)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.transform = 'none';
        }}
      >
        {/* Photo — 1:1 square, card width matches image */}
        <div style={{ aspectRatio: '1/1', overflow: 'hidden', maxHeight: 200 }}>
          <img
            src={photo || PLACEHOLDER}
            alt={name}
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER;
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(20%)',
              transition: 'all 0.4s',
            }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: '14px 16px 18px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '0.95rem', fontWeight: 600, marginBottom: 2, color: 'var(--text)' }}>
              {name}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.06em', fontWeight: 500 }}>
              {designation}
            </div>
          </div>
          {/* LinkedIn icon — visible only when URL is provided */}
          <a
            href={linkedin || '#'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            style={{
              visibility: linkedin ? 'visible' : 'hidden',
              flexShrink: 0,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-dim)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { if (linkedin) e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; }}
            onClick={(e) => { if (!linkedin) e.preventDefault(); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </BorderGlow>
  );
}
