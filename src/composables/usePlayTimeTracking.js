import { ref, watch, onUnmounted } from 'vue'
import { usePlayTimeStore } from '../stores/playTime.js'

/**
 * Composable for managing play time tracking and rest reminders
 * @param {import('vue').Ref<string>} currentScreen - Reactive reference to current screen
 * @param {Function} goHome - Function to navigate to home screen
 * @returns {object} Rest reminder state and handlers
 */
export function usePlayTimeTracking(currentScreen, goHome) {
  const playTimeStore = usePlayTimeStore()
  const showRestReminder = ref(false)
  let playTimeInterval = null

  function startPlayTimeTracking() {
    if (playTimeInterval) return

    playTimeStore.startPlaying()

    playTimeInterval = setInterval(() => {
      playTimeStore.addPlayTime(10)

      if (playTimeStore.isLimitReached && !showRestReminder.value) {
        showRestReminder.value = true
        stopPlayTimeTracking()
      }
    }, 10000)
  }

  function stopPlayTimeTracking() {
    if (playTimeInterval) {
      clearInterval(playTimeInterval)
      playTimeInterval = null
    }
    playTimeStore.stopPlaying()
  }

  function handleRestReminderClose() {
    showRestReminder.value = false
    goHome()
  }

  // Watch for screen changes to track play time
  watch(currentScreen, (newScreen, oldScreen) => {
    const playingScreens = ['playing', 'dailyChallenge']

    if (playingScreens.includes(newScreen)) {
      if (playTimeStore.isLimitReached) {
        showRestReminder.value = true
        currentScreen.value = 'home'
        return
      }
      startPlayTimeTracking()
    } else if (playingScreens.includes(oldScreen)) {
      stopPlayTimeTracking()
    }
  })

  onUnmounted(() => {
    stopPlayTimeTracking()
  })

  return {
    showRestReminder,
    playTimeStore,
    handleRestReminderClose
  }
}
