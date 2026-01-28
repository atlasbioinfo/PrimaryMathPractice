/**
 * Image utilities for optimized loading
 * @module utils/imageUtils
 */

/**
 * Get the base URL for assets
 * @returns {string} The base URL
 */
export function getBaseUrl() {
  return import.meta.env.BASE_URL || '/'
}

/**
 * Get the full path for an image
 * @param {string} imageName - The image file name
 * @returns {string} The full image path
 */
export function getImagePath(imageName) {
  return `${getBaseUrl()}${imageName}`
}

/**
 * Get avatar image path based on gender
 * @param {'prince' | 'princess'} gender - The gender/character type
 * @returns {string} The avatar image path
 */
export function getAvatarPath(gender) {
  const imageName = gender === 'prince' ? 'math_prince.png' : 'math_princess.png'
  return getImagePath(imageName)
}

/**
 * Preload an image
 * @param {string} src - The image source URL
 * @returns {Promise<HTMLImageElement>} Promise that resolves when image is loaded
 */
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * Preload multiple images
 * @param {string[]} sources - Array of image source URLs
 * @returns {Promise<HTMLImageElement[]>} Promise that resolves when all images are loaded
 */
export function preloadImages(sources) {
  return Promise.all(sources.map(preloadImage))
}

/**
 * Check if browser supports WebP format
 * @returns {Promise<boolean>} Promise that resolves to true if WebP is supported
 */
export async function supportsWebP() {
  if (typeof window === 'undefined') return false

  const webpData = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'

  try {
    const img = new Image()
    return new Promise((resolve) => {
      img.onload = () => resolve(img.width === 2 && img.height === 2)
      img.onerror = () => resolve(false)
      img.src = webpData
    })
  } catch {
    return false
  }
}

/**
 * Get optimized image source with fallback
 * @param {string} baseName - Base name without extension (e.g., 'math_prince')
 * @param {string} fallbackExt - Fallback extension (default: 'png')
 * @returns {Promise<string>} The best available image source
 */
export async function getOptimizedImageSrc(baseName, fallbackExt = 'png') {
  const baseUrl = getBaseUrl()
  const webpSupported = await supportsWebP()

  if (webpSupported) {
    // Try WebP first
    const webpSrc = `${baseUrl}${baseName}.webp`
    try {
      await preloadImage(webpSrc)
      return webpSrc
    } catch {
      // WebP not available, fall back
    }
  }

  return `${baseUrl}${baseName}.${fallbackExt}`
}
