/**
 * MembersPanel — Chief Editor banners + team members grouped by department.
 *
 * Structure:
 *   1. Section header ("The People Behind It" / "Our Team")
 *   2. Two Chief Editor banners (alternating photo left/right)
 *      - Large photo + name + "Their Thoughts" quote
 *   3. Team sections — one row per department with team name header
 *      - Each team shows its members in a responsive grid
 *
 * Data source: src/data/team.json
 *   - chiefEditors[]: { id, name, photo, linkedin, quote }
 *   - teams[]: { name, members[]: { id, name, designation, photo, linkedin } }
 *
 * Used by: AboutPage
 */
import teamData from '@/data/team.json';
import MemberCard from '@/components/about/MemberCard';

const PLACEHOLDER = '/team/placeholder-avatar.svg';

export default function MembersPanel() {
  const { chiefEditors, teams } = teamData;

  return (
    <div>
      {/* Section header */}
      <div className="section-header">
        <span className="section-label">The People Behind It</span>
        <h2>Our Team</h2>
      </div>

      {/* Chief Editor Banners */}
      {chiefEditors && chiefEditors.length > 0 && (
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 24 }}>
            Chief Editors
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {chiefEditors.map((editor, idx) => (
              <ChiefEditorBanner key={editor.id} editor={editor} reversed={idx % 2 !== 0} />
            ))}
          </div>
        </div>
      )}

      {/* Team sections — grouped by department */}
      {teams && teams.map((team) => (
        <div key={team.name} style={{ marginBottom: 56 }}>
          {/* Team name header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <span style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--text)',
            }}>
              {team.name}
            </span>
            <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {team.members.length} {team.members.length === 1 ? 'member' : 'members'}
            </span>
          </div>

          {/* Members grid — responsive */}
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 200px)', gap: 16 }}
          >
            {team.members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Chief Editor banner — large hero-style card with photo, name, and quote.
 *
 * @param {object} props
 * @param {object} props.editor - { id, name, photo, linkedin, quote }
 * @param {boolean} props.reversed - If true, photo is on the right
 */
function ChiefEditorBanner({ editor, reversed }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: reversed ? '1fr 1fr' : '1fr 1fr',
        gap: 0,
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
      className="editorial-grid-2"
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-accent)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
    >
      {/* Photo side — 16:9 landscape, flush to card edge */}
      <div style={{ order: reversed ? 2 : 1, overflow: 'hidden', display: 'flex', alignItems: 'center', background: 'var(--bg3)' }}>
        <img
          src={editor.photo || PLACEHOLDER}
          alt={editor.name}
          onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
          style={{
            width: '100%',
            objectFit: 'cover',
            aspectRatio: '16/9',
            display: 'block',
            filter: 'grayscale(15%)',
          }}
        />
      </div>

      {/* Content side */}
      <div style={{
        order: reversed ? 1 : 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '28px 32px',
      }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: 12,
        }}>
          Chief Editor
        </div>

        <h3 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          color: 'var(--text)',
          marginBottom: 20,
        }}>
          {editor.name}
        </h3>

        {/* Their Thoughts */}
        <div style={{
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          marginBottom: 10,
        }}>
          Their Thoughts
        </div>

        <blockquote style={{
          fontFamily: 'var(--serif)',
          fontSize: '0.9rem',
          fontStyle: 'italic',
          lineHeight: 1.7,
          color: 'var(--text-muted)',
          borderLeft: '2px solid var(--accent)',
          paddingLeft: 16,
          margin: 0,
        }}>
          &ldquo;{editor.quote}&rdquo;
        </blockquote>

        {/* LinkedIn icon — hidden when URL is empty */}
        <a
          href={editor.linkedin || '#'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${editor.name} on LinkedIn`}
          style={{
            visibility: editor.linkedin ? 'visible' : 'hidden',
            marginTop: 20,
            width: 32,
            height: 32,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-dim)',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => { if (editor.linkedin) e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; }}
          onClick={(e) => { if (!editor.linkedin) e.preventDefault(); }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
