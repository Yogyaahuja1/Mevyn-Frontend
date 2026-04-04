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

        {/* LinkedIn */}
        {editor.linkedin && (
          <a
            href={editor.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: 20,
              fontSize: '11px',
              color: 'var(--text-dim)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; }}
          >
            LinkedIn &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
