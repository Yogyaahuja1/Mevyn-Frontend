/**
 * Debounce hook — delays updating a value until after a pause in changes.
 *
 * Used by SearchBar to avoid firing API/filter calls on every keystroke.
 *
 * @param {*} value - The value to debounce
 * @param {number} [delay=300] - Debounce delay in milliseconds
 * @returns {*} The debounced value
 */
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
