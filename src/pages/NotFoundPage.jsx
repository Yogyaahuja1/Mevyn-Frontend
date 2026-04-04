/**
 * NotFoundPage - displayed when no route matches the current URL.
 *
 * Route: * (catch-all)
 * Uses editorial styling with serif headings and accent colors.
 */
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ROUTES } from '@/config/routes';

export default function NotFoundPage() {
  useDocumentTitle('404 - Page Not Found');

  return (
    <div
      className="page-enter"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <div style={{ textAlign: 'center', padding: '0 20px' }}>
        <span className="section-label">404</span>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            margin: '16px 0',
            color: 'var(--text)',
          }}
        >
          Page is Absent
        </h1>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 12,
          }}
        >
          Academic Status: DX
        </div>
        <p
          style={{
            color: 'var(--text-muted)',
            marginBottom: 28,
            maxWidth: 440,
            margin: '0 auto 28px',
          }}
        >
          This page got DX due to attendance shortage. Head back home before the admin notices.
        </p>
        <Link to={ROUTES.HOME} className="btn-accent">Go Home &rarr;</Link>
      </div>
    </div>
  );
}
