/**
 * Audio store for managing audio and haptic settings
 * @module stores/audio
 */
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

/**
 * @typedef {Object} AudioState
 * @property {boolean} soundEnabled - Whether sound effects are enabled
 * @property {boolean} hapticEnabled - Whether haptic feedback is enabled
 */

export const useAudioStore = defineStore('audio', () => {
  // State
  const soundEnabled = ref(true)
  const hapticEnabled = ref(true)

  // Load from localStorage on init
  function loadSettings() {
    try {
      const saved = localStorage.getItem('mathGame_audio')
      if (saved) {
        const data = JSON.parse(saved)
        soundEnabled.value = data.soundEnabled ?? true
        hapticEnabled.value = data.hapticEnabled ?? true
      }
    } catch (e) {
      console.warn('Failed to load audio settings:', e)
    }
  }

  // Save to localStorage
  function saveSettings() {
    try {
      localStorage.setItem('mathGame_audio', JSON.stringify({
        soundEnabled: soundEnabled.value,
        hapticEnabled: hapticEnabled.value
      }))
    } catch (e) {
      console.warn('Failed to save audio settings:', e)
    }
  }

  // Actions
  /**
   * Toggle sound effects
   */
  function toggleSound() {
    soundEnabled.value = !soundEnabled.value
    saveSettings()
  }

  /**
   * Toggle haptic feedback
   */
  function toggleHaptic() {
    hapticEnabled.value = !hapticEnabled.value
    saveSettings()
  }

  /**
   * Set sound enabled state
   * @param {boolean} enabled
   */
  function setSound(enabled) {
    soundEnabled.value = enabled
    saveSettings()
  }

  /**
   * Set haptic enabled state
   * @param {boolean} enabled
   */
  function setHaptic(enabled) {
    hapticEnabled.value = enabled
    saveSettings()
  }

  /**
   * Reset to defaults
   */
  function reset() {
    soundEnabled.value = true
    hapticEnabled.value = true
    saveSettings()
  }

  // Load settings on initialization
  loadSettings()

  return {
    // State
    soundEnabled,
    hapticEnabled,
    // Actions
    toggleSound,
    toggleHaptic,
    setSound,
    setHaptic,
    reset
  }
})
