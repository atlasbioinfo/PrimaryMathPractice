/**
 * Custom difficulty store for parent-controlled settings
 * @module stores/customDifficulty
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * @typedef {Object} DifficultySettings
 * @property {number} questionsPerRound - Number of questions per round (5-20)
 * @property {number} timeLimit - Time limit in seconds (0 = no limit)
 * @property {boolean} showHints - Whether to show hints
 * @property {boolean} allowRetry - Whether to allow retry on wrong answers
 */

/**
 * @typedef {Object} CustomRange
 * @property {number} min - Minimum value
 * @property {number} max - Maximum value
 */

export const useCustomDifficultyStore = defineStore('customDifficulty', () => {
  // Parent PIN (4 digits)
  const parentPin = ref('')
  const isPinSet = ref(false)

  // General settings
  const questionsPerRound = ref(10)
  const showHints = ref(true)
  const allowRetry = ref(true)

  // Custom ranges for each operation (optional overrides)
  const customRanges = ref({
    addition: { enabled: false, num1: { min: 1, max: 100 }, num2: { min: 1, max: 100 } },
    subtraction: { enabled: false, num1: { min: 10, max: 100 }, num2: { min: 1, max: 50 } },
    multiplication: { enabled: false, num1: { min: 1, max: 12 }, num2: { min: 1, max: 12 } },
    division: { enabled: false, divisor: { min: 2, max: 10 }, result: { min: 1, max: 10 } }
  })

  // Load from localStorage
  function load() {
    try {
      const saved = localStorage.getItem('mathGame_customDifficulty')
      if (saved) {
        const data = JSON.parse(saved)
        parentPin.value = data.parentPin || ''
        isPinSet.value = !!data.parentPin
        questionsPerRound.value = data.questionsPerRound ?? 10
        showHints.value = data.showHints ?? true
        allowRetry.value = data.allowRetry ?? true
        if (data.customRanges) {
          customRanges.value = { ...customRanges.value, ...data.customRanges }
        }
      }
    } catch (e) {
      console.warn('Failed to load custom difficulty settings:', e)
    }
  }

  // Save to localStorage
  function save() {
    try {
      localStorage.setItem('mathGame_customDifficulty', JSON.stringify({
        parentPin: parentPin.value,
        questionsPerRound: questionsPerRound.value,
        showHints: showHints.value,
        allowRetry: allowRetry.value,
        customRanges: customRanges.value
      }))
    } catch (e) {
      console.warn('Failed to save custom difficulty settings:', e)
    }
  }

  // Set parent PIN
  function setPin(pin) {
    if (pin.length === 4 && /^\d+$/.test(pin)) {
      parentPin.value = pin
      isPinSet.value = true
      save()
      return true
    }
    return false
  }

  // Verify PIN
  function verifyPin(pin) {
    return parentPin.value === pin
  }

  // Clear PIN
  function clearPin() {
    parentPin.value = ''
    isPinSet.value = false
    save()
  }

  // Update settings
  function updateSettings(settings) {
    if (settings.questionsPerRound !== undefined) {
      questionsPerRound.value = Math.max(5, Math.min(20, settings.questionsPerRound))
    }
    if (settings.showHints !== undefined) {
      showHints.value = settings.showHints
    }
    if (settings.allowRetry !== undefined) {
      allowRetry.value = settings.allowRetry
    }
    save()
  }

  // Update custom range for an operation
  function updateCustomRange(operation, range) {
    if (customRanges.value[operation]) {
      customRanges.value[operation] = { ...customRanges.value[operation], ...range }
      save()
    }
  }

  // Get custom range for an operation
  function getCustomRange(operation) {
    const range = customRanges.value[operation]
    if (range && range.enabled) {
      return range
    }
    return null
  }

  // Reset to defaults
  function reset() {
    questionsPerRound.value = 10
    showHints.value = true
    allowRetry.value = true
    customRanges.value = {
      addition: { enabled: false, num1: { min: 1, max: 100 }, num2: { min: 1, max: 100 } },
      subtraction: { enabled: false, num1: { min: 10, max: 100 }, num2: { min: 1, max: 50 } },
      multiplication: { enabled: false, num1: { min: 1, max: 12 }, num2: { min: 1, max: 12 } },
      division: { enabled: false, divisor: { min: 2, max: 10 }, result: { min: 1, max: 10 } }
    }
    save()
  }

  // Initialize on load
  load()

  return {
    // State
    isPinSet,
    questionsPerRound,
    showHints,
    allowRetry,
    customRanges,
    // Actions
    setPin,
    verifyPin,
    clearPin,
    updateSettings,
    updateCustomRange,
    getCustomRange,
    reset
  }
})
