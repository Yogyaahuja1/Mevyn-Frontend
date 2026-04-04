/**
 * Public layout — wraps all visitor-facing pages.
 *
 * Structure: Navbar → main content (Outlet) → Footer
 * Uses editorial CSS variables for background and text color.
 * The nav is fixed-position, so main gets padding-top: var(--nav-h).
 *
 * Used by: HomePage, BlogListingPage, BlogPostPage, SeriesListingPage, AboutPage, LoginPage
 */
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function PublicLayout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <Navbar />
      <main className="flex-1 page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
