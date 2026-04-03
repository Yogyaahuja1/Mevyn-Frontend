/**
 * ThemeContext — manages dark/light mode across the entire app.
 *
 * State:
 *   theme: 'light' | 'dark'
 *
 * Actions:
 *   toggleTheme() — switches between light and dark mode
 *
 * How it works:
 *   1. On mount, reads saved preference from localStorage ('mevyn_theme')
 *   2. Falls back to system preference (prefers-color-scheme)
 *   3. Adds/removes 'dark' class on <html> for Tailwind's class-based dark mode
 *   4. Persists choice to localStorage on every toggle
 *
 * Used by: ThemeToggle component (in Navbar and AdminHeader)
 */
import { createContext, useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '@/config/constants';
import logger from '@/utils/logger';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') return saved;

    // Fall back to system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  // Apply the dark class to <html> whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    logger.debug('Theme', `Theme set to ${theme}`);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
