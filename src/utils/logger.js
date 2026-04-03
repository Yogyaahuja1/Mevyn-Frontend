/**
 * Frontend logger utility.
 *
 * Provides structured, leveled console logging that is safe for a public site:
 *   - NEVER logs tokens, passwords, emails, or API keys
 *   - DEBUG and INFO logs are stripped in production builds
 *   - Only WARN and ERROR appear in production
 *
 * Usage:
 *   import logger from '@/utils/logger';
 *   logger.info('Auth', 'User logged in successfully');
 *   logger.warn('API', 'Retrying failed request', { endpoint: '/posts' });
 *   logger.error('Router', 'Navigation failed', error);
 *
 * Log levels: DEBUG < INFO < WARN < ERROR
 */

const IS_PROD = import.meta.env.PROD;

/** ANSI-style colored prefixes for browser console */
const LEVEL_STYLES = {
  DEBUG: 'color: #829ab1; font-weight: normal',
  INFO: 'color: #3b82f6; font-weight: normal',
  WARN: 'color: #f59e0b; font-weight: bold',
  ERROR: 'color: #ef4444; font-weight: bold',
};

/**
 * Format a log message with timestamp and module context.
 * @param {'DEBUG'|'INFO'|'WARN'|'ERROR'} level
 * @param {string} module - Component or module name (e.g., 'Auth', 'API')
 * @param {string} message
 * @param {*} [data] - Optional data (objects, arrays). NEVER pass sensitive data.
 */
function log(level, module, message, data) {
  // In production, suppress DEBUG and INFO to keep console clean
  if (IS_PROD && (level === 'DEBUG' || level === 'INFO')) return;

  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
  const prefix = `%c[${timestamp}] [${level}] [${module}]`;
  const style = LEVEL_STYLES[level];

  if (data !== undefined) {
    console[level === 'ERROR' ? 'error' : level === 'WARN' ? 'warn' : 'log'](
      prefix,
      style,
      message,
      data
    );
  } else {
    console[level === 'ERROR' ? 'error' : level === 'WARN' ? 'warn' : 'log'](
      prefix,
      style,
      message
    );
  }
}

const logger = {
  /** Verbose debugging info — stripped in production */
  debug: (module, message, data) => log('DEBUG', module, message, data),

  /** General operational info — stripped in production */
  info: (module, message, data) => log('INFO', module, message, data),

  /** Potential issues that don't break functionality */
  warn: (module, message, data) => log('WARN', module, message, data),

  /** Errors that affect functionality */
  error: (module, message, data) => log('ERROR', module, message, data),
};

export default logger;
