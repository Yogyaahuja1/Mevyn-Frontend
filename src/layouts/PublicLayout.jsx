/**
 * Public layout — wraps all visitor-facing pages.
 *
 * Structure: Navbar → main content (Outlet) → Footer
 * The main area is a centered container with responsive padding.
 *
 * Used by: HomePage, BlogListingPage, BlogPostPage, SeriesListingPage, AboutPage, LoginPage
 */
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-primary-50 dark:bg-dark-bg">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
