import { ref, computed, watch, onMounted } from 'vue'
import { useCoinsStore } from '../stores/coins.js'
import { backgroundThemes } from '../config/shop.js'
import {
  getParticleCount,
  getParticleType,
  getParticleStyle
} from '../config/themeParticles.js'

/**
 * Composable for managing theme particles
 * Handles particle generation and updates based on equipped background theme
 */
export function useThemeParticles() {
  const coinsStore = useCoinsStore()
  const particles = ref([])

  // Get the current equipped theme
  const theme = computed(() => {
    if (!coinsStore.equippedBackground) {
      return null
    }
    return backgroundThemes.find(bg => bg.id === coinsStore.equippedBackground)
  })

  /**
   * Generate particles for the current theme
   */
  function generateParticles() {
    if (!theme.value) {
      particles.value = []
      return
    }

    const themeId = theme.value.id
    const themeParticles = theme.value.particles || []
    const count = getParticleCount(themeId)
    const items = []

    for (let i = 0; i < count; i++) {
      const emoji = themeParticles[i % themeParticles.length]
      items.push({
        id: i,
        emoji,
        type: getParticleType(themeId, i),
        style: getParticleStyle(themeId, i)
      })
    }

    particles.value = items
  }

  // Regenerate particles when theme changes
  watch(theme, generateParticles, { immediate: true })

  // Also generate on mount
  onMounted(generateParticles)

  return {
    theme,
    particles,
    generateParticles
  }
}
