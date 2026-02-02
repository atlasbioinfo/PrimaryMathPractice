import { computed } from 'vue'
import { useCoinsStore } from '../stores/coins.js'
import { backgroundThemes } from '../config/shop.js'

/**
 * Composable for managing equipped background theme
 * @returns {object} Background theme state and computed styles
 */
export function useBackground() {
  const coinsStore = useCoinsStore()

  const equippedBackground = computed(() => {
    if (!coinsStore.equippedBackground) return null
    return backgroundThemes.find(bg => bg.id === coinsStore.equippedBackground)
  })

  const backgroundStyle = computed(() => {
    if (!equippedBackground.value) return {}
    return {
      background: equippedBackground.value.gradient
    }
  })

  return {
    equippedBackground,
    backgroundStyle
  }
}
