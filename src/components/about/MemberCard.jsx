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

const PLACEHOLDER = '/team/placeholder-avatar.svg';

export default function MemberCard({ member }) {
  const { name, designation, photo, linkedin } = member;

  return (
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
        e.currentTarget.style.transform = 'translateY(-4px)';
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
      <div style={{ padding: '14px 16px 18px' }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: '0.95rem', fontWeight: 600, marginBottom: 2, color: 'var(--text)' }}>
          {name}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.06em', fontWeight: 500, marginBottom: 6 }}>
          {designation}
        </div>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            style={{
              fontSize: '11px',
              color: 'var(--text-dim)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-dim)';
            }}
          >
            LinkedIn &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
