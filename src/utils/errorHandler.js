/**
 * Global error handling utilities
 * @module utils/errorHandler
 */

/**
 * @typedef {Object} ErrorInfo
 * @property {string} message - Error message
 * @property {string} [stack] - Error stack trace
 * @property {string} [componentStack] - Vue component stack
 * @property {string} timestamp - ISO timestamp
 * @property {string} url - Current URL
 * @property {string} [userAgent] - Browser user agent
 */

/**
 * Error log storage key
 */
const ERROR_LOG_KEY = 'mathGame_errorLog'

/**
 * Maximum number of errors to store
 */
const MAX_ERRORS = 20

/**
 * Log an error for debugging
 * @param {Error} error - The error object
 * @param {string} [context] - Additional context
 */
export function logError(error, context = '') {
  try {
    const errorInfo = {
      message: error.message || String(error),
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }

    // Log to console in development
    console.error('MathHero Error:', errorInfo)

    // Store in localStorage for debugging
    const existingLogs = getErrorLogs()
    existingLogs.push(errorInfo)

    // Keep only the last MAX_ERRORS
    if (existingLogs.length > MAX_ERRORS) {
      existingLogs.splice(0, existingLogs.length - MAX_ERRORS)
    }

    localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(existingLogs))
  } catch (e) {
    // Silently fail - we don't want error logging to cause more errors
    console.error('Failed to log error:', e)
  }
}

/**
 * Get stored error logs
 * @returns {ErrorInfo[]} Array of error logs
 */
export function getErrorLogs() {
  try {
    const logs = localStorage.getItem(ERROR_LOG_KEY)
    return logs ? JSON.parse(logs) : []
  } catch (e) {
    return []
  }
}

/**
 * Clear error logs
 */
export function clearErrorLogs() {
  try {
    localStorage.removeItem(ERROR_LOG_KEY)
  } catch (e) {
    // Ignore
  }
}

/**
 * Create a global error handler for Vue
 * @returns {function} Error handler function
 */
export function createVueErrorHandler() {
  return (error, instance, info) => {
    logError(error, `Vue Error (${info})`)

    // In production, you might want to show a user-friendly message
    // For now, we just log it
  }
}

/**
 * Create a global unhandled rejection handler
 */
export function setupGlobalErrorHandlers() {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logError(
      event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
      'Unhandled Promise Rejection'
    )
  })

  // Handle general errors
  window.addEventListener('error', (event) => {
    logError(event.error || new Error(event.message), 'Global Error')
  })
}

/**
 * Wrap a function with error handling
 * @param {Function} fn - Function to wrap
 * @param {string} context - Context for error logging
 * @returns {Function} Wrapped function
 */
export function withErrorHandling(fn, context) {
  return (...args) => {
    try {
      const result = fn(...args)
      // Handle async functions
      if (result instanceof Promise) {
        return result.catch(error => {
          logError(error, context)
          throw error
        })
      }
      return result
    } catch (error) {
      logError(error, context)
      throw error
    }
  }
}
