// Internationalization configuration
// Import all language packs
import en from './en'
import zh from './zh'
import es from './es'
import de from './de'
import fr from './fr'

// All available languages
export const messages = {
  en,
  zh,
  es,
  de,
  fr
}

// Default language
export const defaultLocale = 'en'

// List of supported locales (for UI dropdown)
export const supportedLocales = Object.keys(messages)

// Display names for each locale
const localeDisplayNames = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français'
}

/**
 * Get the display name for a locale
 * @param {string} locale - The locale code (e.g., 'en', 'zh')
 * @returns {string} The display name for the locale
 */
export function getLocaleDisplayName(locale) {
  return localeDisplayNames[locale] || locale
}

/**
 * Check if a locale is supported
 * @param {string} locale - The locale code to check
 * @returns {boolean} Whether the locale is supported
 */
export function isLocaleSupported(locale) {
  return locale in messages
}

/**
 * Get all available locales with their display names
 * @returns {Array<{code: string, name: string}>} Array of locale objects
 */
export function getAvailableLocales() {
  return supportedLocales.map(code => ({
    code,
    name: getLocaleDisplayName(code)
  }))
}

/**
 * Get messages for a specific locale
 * @param {string} locale - The locale code
 * @returns {Object} The messages object for the locale
 */
export function getMessages(locale) {
  return messages[locale] || messages[defaultLocale]
}
