/**
 * TopicSuggestion - Editorial 2-column section with a topic suggestion form.
 *
 * Left column: heading, section label, and descriptive text encouraging
 * visitors to submit story ideas. Right column: a styled form card with
 * name input, textarea for the story idea, and a submit button.
 *
 * Uses editorial CSS classes (section-label, form-group, form-label,
 * form-input, form-textarea, btn-accent) for consistent styling.
 *
 * Used by: HomePage.
 */

export default function TopicSuggestion() {
  return (
    <section className="section section-divider">
      <div className="container-editorial">
        <div
          className="editorial-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'start',
          }}
        >
          {/* Left: description */}
          <div>
            <span className="section-label">Your Voice</span>
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                marginTop: 12,
                marginBottom: 20,
                color: 'var(--text)',
              }}
            >
              Suggest a Topic
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Know something we should cover? Have a story idea or feedback?
              We&apos;d love to hear from you.
            </p>
          </div>

          {/* Right: form card */}
          <div
            style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: 36,
            }}
          >
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input className="form-input" placeholder="e.g. Ananya Mehta" />
            </div>
            <div className="form-group">
              <label className="form-label">Story Idea or Question</label>
              <textarea
                className="form-textarea"
                placeholder="Tell us what's on your mind..."
                style={{ minHeight: 90 }}
              />
            </div>
            <button
              className="btn-accent"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Submit &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
