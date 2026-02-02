// Theme particle configuration for animated background effects

// Particle counts per theme
export const particleCounts = {
  bg_space: 15,
  bg_ocean: 12,
  bg_forest: 10,
  bg_candy: 12,
  bg_sunset: 8,
  bg_aurora: 10,
  bg_sakura: 12,
  bg_galaxy: 15
}

// Default particle count for themes not explicitly configured
export const DEFAULT_PARTICLE_COUNT = 10

// Particle animation types per theme
export const particleTypes = {
  bg_space: 'twinkle',
  bg_ocean: { primary: 'swim', secondary: 'drift' },
  bg_forest: { primary: 'fall', secondary: 'flutter' },
  bg_candy: 'fall-spin',
  bg_sunset: 'float',
  bg_aurora: 'shimmer',
  bg_sakura: 'fall-sway',
  bg_galaxy: 'twinkle'
}

// Default particle type for themes not explicitly configured
export const DEFAULT_PARTICLE_TYPE = 'float'

/**
 * Get the particle count for a theme
 * @param {string} themeId
 * @returns {number}
 */
export function getParticleCount(themeId) {
  return particleCounts[themeId] || DEFAULT_PARTICLE_COUNT
}

/**
 * Get the particle type for a theme and index
 * @param {string} themeId
 * @param {number} index
 * @returns {string}
 */
export function getParticleType(themeId, index) {
  const typeConfig = particleTypes[themeId]

  if (!typeConfig) {
    return DEFAULT_PARTICLE_TYPE
  }

  if (typeof typeConfig === 'string') {
    return typeConfig
  }

  // For themes with primary/secondary types, alternate based on index
  if (themeId === 'bg_ocean') {
    return index % 3 === 0 ? typeConfig.primary : typeConfig.secondary
  }

  return index % 2 === 0 ? typeConfig.primary : typeConfig.secondary
}

/**
 * Generate base particle style
 * @param {number} index
 * @returns {Object}
 */
function generateBaseStyle(index) {
  const baseDelay = (index * 0.8) % 10
  const baseDuration = 8 + (index % 5) * 2

  return {
    left: `${5 + (index * 7) % 90}%`,
    top: `${5 + (index * 11) % 85}%`,
    fontSize: `${20 + (index % 4) * 6}px`,
    animationDelay: `${baseDelay}s`,
    animationDuration: `${baseDuration}s`,
    opacity: 0.7 + (index % 3) * 0.1
  }
}

/**
 * Apply theme-specific style adjustments
 * @param {Object} style
 * @param {string} themeId
 * @param {number} index
 * @returns {Object}
 */
function applyThemeAdjustments(style, themeId, index) {
  const adjustedStyle = { ...style }

  if (themeId === 'bg_ocean') {
    adjustedStyle.top = `${20 + (index * 13) % 50}%`
  } else if (themeId === 'bg_forest') {
    adjustedStyle.top = `${-5 - (index % 10) * 5}%`
  } else if (themeId === 'bg_sakura' || themeId === 'bg_candy') {
    adjustedStyle.top = `${-10 - (index % 8) * 8}%`
  }

  return adjustedStyle
}

/**
 * Get the complete particle style for a theme and index
 * @param {string} themeId
 * @param {number} index
 * @returns {Object}
 */
export function getParticleStyle(themeId, index) {
  const baseStyle = generateBaseStyle(index)
  return applyThemeAdjustments(baseStyle, themeId, index)
}

/**
 * Generate style for ocean bubbles
 * @param {number} index
 * @returns {Object}
 */
export function getBubbleStyle(index) {
  return {
    left: `${5 + (index * 6.5) % 90}%`,
    animationDelay: `${(index * 0.7) % 8}s`,
    animationDuration: `${4 + (index % 4) * 2}s`,
    '--size': `${6 + (index % 4) * 4}px`
  }
}

/**
 * Generate style for twinkling stars
 * @param {number} index
 * @returns {Object}
 */
export function getStarStyle(index) {
  return {
    left: `${(index * 3.3) % 100}%`,
    top: `${(index * 3.7) % 100}%`,
    animationDelay: `${(index * 0.3) % 5}s`,
    animationDuration: `${1 + (index % 3)}s`,
    '--size': `${2 + (index % 3)}px`
  }
}

/**
 * Generate style for fireflies
 * @param {number} index
 * @returns {Object}
 */
export function getFireflyStyle(index) {
  return {
    left: `${10 + (index * 7) % 80}%`,
    top: `${20 + (index * 8) % 60}%`,
    animationDelay: `${(index * 0.5) % 6}s`,
    animationDuration: `${3 + (index % 4)}s`
  }
}

/**
 * Generate style for falling items (sakura petals, candy)
 * @param {number} index
 * @returns {Object}
 */
export function getFallingStyle(index) {
  return {
    left: `${(index * 5) % 100}%`,
    animationDelay: `${(index * 0.6) % 12}s`,
    animationDuration: `${8 + (index % 6) * 2}s`,
    fontSize: `${16 + (index % 4) * 4}px`
  }
}

/**
 * Generate style for floating clouds
 * @param {number} index
 * @returns {Object}
 */
export function getCloudStyle(index) {
  return {
    top: `${10 + index * 15}%`,
    animationDelay: `${index * 3}s`,
    animationDuration: `${20 + index * 5}s`,
    fontSize: `${30 + index * 10}px`,
    opacity: 0.4 + index * 0.1
  }
}
