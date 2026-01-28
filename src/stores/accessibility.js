/**
 * Accessibility store for managing accessibility settings
 * @module stores/accessibility
 */
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

/**
 * @typedef {Object} AccessibilityState
 * @property {'small' | 'normal' | 'large' | 'extra-large'} fontSize - Font size preference
 * @property {boolean} reduceMotion - Reduce motion preference
 * @property {boolean} highContrast - High contrast mode
 */

export const useAccessibilityStore = defineStore('accessibility', () => {
  // State
  const fontSize = ref('normal')
  const reduceMotion = ref(false)
  const highContrast = ref(false)

  // Font size scale mapping
  const fontSizeScales = {
    'small': 0.85,
    'normal': 1,
    'large': 1.15,
    'extra-large': 1.3
  }

  // Computed
  const fontSizeScale = computed(() => fontSizeScales[fontSize.value] || 1)

  const cssVariables = computed(() => ({
    '--font-scale': fontSizeScale.value,
    '--base-font-size': `${16 * fontSizeScale.value}px`,
    '--heading-scale': fontSizeScale.value,
  }))

  // Actions
  /**
   * Set font size preference
   * @param {'small' | 'normal' | 'large' | 'extra-large'} size - Font size
   */
  function setFontSize(size) {
    if (fontSizeScales[size] !== undefined) {
      fontSize.value = size
      applyFontSize()
    }
  }

  /**
   * Toggle reduce motion
   */
  function toggleReduceMotion() {
    reduceMotion.value = !reduceMotion.value
    applyReduceMotion()
  }

  /**
   * Toggle high contrast
   */
  function toggleHighContrast() {
    highContrast.value = !highContrast.value
    applyHighContrast()
  }

  /**
   * Apply font size to document
   */
  function applyFontSize() {
    const scale = fontSizeScale.value
    document.documentElement.style.setProperty('--font-scale', scale)
    document.documentElement.style.setProperty('--base-font-size', `${16 * scale}px`)
  }

  /**
   * Apply reduce motion to document
   */
  function applyReduceMotion() {
    if (reduceMotion.value) {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }
  }

  /**
   * Apply high contrast to document
   */
  function applyHighContrast() {
    if (highContrast.value) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }

  /**
   * Apply all accessibility settings
   */
  function applyAll() {
    applyFontSize()
    applyReduceMotion()
    applyHighContrast()
  }

  /**
   * Detect system preferences
   */
  function detectSystemPreferences() {
    // Detect reduce motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reduceMotion.value = true
    }

    // Detect high contrast preference
    if (window.matchMedia('(prefers-contrast: more)').matches) {
      highContrast.value = true
    }
  }

  function reset() {
    fontSize.value = 'normal'
    reduceMotion.value = false
    highContrast.value = false
    applyAll()
  }

  return {
    // State
    fontSize,
    reduceMotion,
    highContrast,
    // Computed
    fontSizeScale,
    cssVariables,
    // Actions
    setFontSize,
    toggleReduceMotion,
    toggleHighContrast,
    applyAll,
    detectSystemPreferences,
    reset
  }
})
