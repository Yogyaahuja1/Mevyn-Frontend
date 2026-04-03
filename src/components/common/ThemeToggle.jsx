/**
 * Dark/light mode toggle button.
 *
 * Shows a sun icon in dark mode (click to switch to light)
 * and a moon icon in light mode (click to switch to dark).
 *
 * Placed in: Navbar (public pages) and AdminHeader (admin pages).
 *
 * @see src/contexts/ThemeContext.jsx — provides toggleTheme
 */
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
        'text-primary-500 hover:bg-primary-100',
        'dark:text-dark-muted dark:hover:bg-dark-surface2',
        className
      )}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
