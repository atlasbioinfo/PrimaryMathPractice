/**
 * Safe localStorage utilities with error handling
 * @module utils/storage
 */

/**
 * Check if localStorage is available
 * @returns {boolean} Whether localStorage is available
 */
export function isStorageAvailable() {
  try {
    const testKey = '__storage_test__'
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Safely get an item from localStorage
 * @param {string} key - Storage key
 * @param {*} [defaultValue=null] - Default value if key doesn't exist or on error
 * @returns {*} Parsed value or default
 */
export function safeGetItem(key, defaultValue = null) {
  try {
    if (!isStorageAvailable()) {
      console.warn('localStorage is not available')
      return defaultValue
    }
    const item = localStorage.getItem(key)
    if (item === null) {
      return defaultValue
    }
    return JSON.parse(item)
  } catch (e) {
    console.error(`Error reading from localStorage key "${key}":`, e)
    return defaultValue
  }
}

/**
 * Safely set an item in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store (will be JSON stringified)
 * @returns {boolean} Whether the operation was successful
 */
export function safeSetItem(key, value) {
  try {
    if (!isStorageAvailable()) {
      console.warn('localStorage is not available')
      return false
    }
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Consider clearing old data.')
      // Try to clear old transaction history to make space
      tryFreeSpace(key)
    } else {
      console.error(`Error writing to localStorage key "${key}":`, e)
    }
    return false
  }
}

/**
 * Safely remove an item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Whether the operation was successful
 */
export function safeRemoveItem(key) {
  try {
    if (!isStorageAvailable()) {
      return false
    }
    localStorage.removeItem(key)
    return true
  } catch (e) {
    console.error(`Error removing localStorage key "${key}":`, e)
    return false
  }
}

/**
 * Try to free up localStorage space by clearing old data
 * @param {string} excludeKey - Key that should not be cleared
 */
function tryFreeSpace(excludeKey) {
  try {
    // Get all mathGame keys
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('mathGame_') && key !== excludeKey) {
        keys.push(key)
      }
    }

    // Try to trim transaction history in each key
    keys.forEach(key => {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}')
        if (data.transactions && Array.isArray(data.transactions) && data.transactions.length > 100) {
          data.transactions = data.transactions.slice(-50) // Keep only last 50
          localStorage.setItem(key, JSON.stringify(data))
        }
      } catch (e) {
        // Ignore errors during cleanup
      }
    })
  } catch (e) {
    console.error('Error trying to free localStorage space:', e)
  }
}

/**
 * Get the total size of localStorage in bytes (approximate)
 * @returns {number} Approximate size in bytes
 */
export function getStorageSize() {
  try {
    let total = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        const value = localStorage.getItem(key) || ''
        total += key.length + value.length
      }
    }
    return total * 2 // UTF-16 uses 2 bytes per character
  } catch (e) {
    return 0
  }
}

/**
 * Clear all MathHero data from localStorage
 */
export function clearAllMathHeroData() {
  try {
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('mathGame_')) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key))
  } catch (e) {
    console.error('Error clearing MathHero data:', e)
  }
}
