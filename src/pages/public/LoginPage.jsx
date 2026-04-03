/**
 * LoginPage — admin/editor authentication form.
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
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
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
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/mevyn-logo.svg" alt="Mevyn" className="h-10 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary-900 dark:text-dark-text">Admin Login</h1>
          <p className="mt-1 text-sm text-primary-500 dark:text-dark-muted">
            For Mevyn media body members only
          </p>
        </div>

        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-6 rounded-xl border border-primary-200 dark:border-dark-border bg-white dark:bg-dark-surface2"
        >
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@mevyn.com"
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>
          )}

          <Button type="submit" className="w-full" loading={isLoading} disabled={isLoading}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
