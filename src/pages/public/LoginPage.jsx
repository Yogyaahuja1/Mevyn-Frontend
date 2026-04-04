/**
 * LoginPage — admin/editor authentication form (editorial style).
 *
 * This page is ONLY for media body members who manage content.
 * Regular blog visitors never need to log in (no signup flow exists).
 *
 * Flow: email + password -> POST /api/admins/login -> store JWT -> redirect to /admin
 * If already authenticated, immediately redirects to /admin.
 *
 * Route: /login
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/config/routes';
import logger from '@/utils/logger';

export default function LoginPage() {
  useDocumentTitle('Login');

  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(ROUTES.ADMIN, { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      logger.info('LoginPage', 'Login successful, redirecting to dashboard');
      navigate(ROUTES.ADMIN, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
      logger.warn('LoginPage', 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="page-enter" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: '0 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent)' }}>
            MEVYN
          </span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 600, marginTop: 8, color: 'var(--text)' }}>
            Admin Login
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 4 }}>
            For Mevyn media body members only
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 28,
          }}
        >
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className="form-input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@mevyn.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              className="form-input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p style={{ fontSize: '0.875rem', color: '#ef4444', marginBottom: 16 }} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-accent"
            disabled={isLoading}
            style={{ width: '100%', justifyContent: 'center', padding: '12px 24px', opacity: isLoading ? 0.6 : 1 }}
          >
            {isLoading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
}
