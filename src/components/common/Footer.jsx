/**
 * Site footer — contact info, address, and copyright.
 *
 * Layout:
 *   Mobile: stacked sections
 *   Desktop: 3-column grid
 *
 * Rendered at the bottom of every public page via PublicLayout.
 */
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ROUTES } from '@/config/routes';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-primary-200 dark:border-dark-border bg-white dark:bg-dark-surface">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & description */}
          <div>
            <Link to={ROUTES.HOME} className="inline-block mb-3">
              <img src="/mevyn-logo.svg" alt="Mevyn" className="h-8" />
            </Link>
            <p className="text-sm text-primary-500 dark:text-dark-muted leading-relaxed">
              Your media body&apos;s home for stories, series, and events.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-primary-800 dark:text-dark-text mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={ROUTES.BLOGS} className="text-primary-500 hover:text-secondary-600 dark:text-dark-muted dark:hover:text-secondary-400 transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SERIES} className="text-primary-500 hover:text-secondary-600 dark:text-dark-muted dark:hover:text-secondary-400 transition-colors">
                  Series
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ABOUT} className="text-primary-500 hover:text-secondary-600 dark:text-dark-muted dark:hover:text-secondary-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info — replace with actual details */}
          <div>
            <h3 className="font-semibold text-primary-800 dark:text-dark-text mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-primary-500 dark:text-dark-muted">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>contact@mevyn.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 00000 00000</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Institution Address, City, State — 000000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-primary-200 dark:border-dark-border text-center text-sm text-primary-400 dark:text-dark-muted">
          &copy; {year} Mevyn. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
