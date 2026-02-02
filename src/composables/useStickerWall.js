/**
 * Composable for sticker wall display logic
 * @module composables/useStickerWall
 */
import { ref, computed } from 'vue'
import { useStickersStore } from '../stores/stickers.js'
import { useLocaleStore } from '../stores/locale.js'
import { useCoinsStore } from '../stores/coins.js'
import { purchasableStickers, hiddenAchievements } from '../config/shop.js'

/**
 * Operations configuration for achievement stickers
 */
export const OPERATIONS = [
  { key: 'addition', icon: '✨' },
  { key: 'subtraction', icon: '✂️' },
  { key: 'multiplication', icon: '⭐' },
  { key: 'division', icon: '🍕' }
]

/**
 * Sticker type configuration for achievement levels
 */
export const STICKER_TYPES = [
  { key: 'bronze', icon: '🥉' },
  { key: 'silver', icon: '🥈' },
  { key: 'gold', icon: '🥇' },
  { key: 'crown', icon: '👑' }
]

/**
 * Hook for managing sticker wall state and interactions
 * @returns {Object} Sticker wall state and functions
 */
export function useStickerWall() {
  const stickersStore = useStickersStore()
  const localeStore = useLocaleStore()
  const coinsStore = useCoinsStore()

  const t = computed(() => localeStore.t)

  // Modal state
  const showDetail = ref(false)
  const selectedStickerId = ref(null)
  const selectedCategory = ref('achievement')

  // Counts for summary display
  const achievementCount = computed(() => stickersStore.getEarnedCount())
  const hiddenCount = computed(() => stickersStore.getHiddenAchievementCount())
  const purchasedCount = computed(() => coinsStore.getPurchasedItemsByType('sticker').length)
  const totalEarnedCount = computed(() => achievementCount.value + hiddenCount.value + purchasedCount.value)
  const totalPossibleCount = computed(() => stickersStore.getTotalPossibleCount())

  /**
   * Get the currently selected sticker data
   */
  const selectedSticker = computed(() => {
    if (!selectedStickerId.value) return null

    if (selectedCategory.value === 'achievement') {
      return stickersStore.allStickers.find(s => s.id === selectedStickerId.value)
    }
    if (selectedCategory.value === 'purchasable') {
      const allPurchasable = Object.values(purchasableStickers).flat()
      return allPurchasable.find(s => s.id === selectedStickerId.value)
    }
    if (selectedCategory.value === 'hidden') {
      return hiddenAchievements.find(a => a.id === selectedStickerId.value)
    }
    return null
  })

  /**
   * Get earned info for the selected sticker
   */
  const stickerInfo = computed(() => {
    if (!selectedStickerId.value) return null

    if (selectedCategory.value === 'achievement') {
      return stickersStore.getSticker(selectedStickerId.value)
    }
    if (selectedCategory.value === 'hidden') {
      return stickersStore.getHiddenAchievement(selectedStickerId.value)
    }
    return null
  })

  /**
   * Open the sticker detail modal
   * @param {string} id - Sticker ID
   * @param {string} category - Category: 'achievement', 'purchasable', or 'hidden'
   */
  function showStickerDetail(id, category = 'achievement') {
    selectedStickerId.value = id
    selectedCategory.value = category
    showDetail.value = true
  }

  /**
   * Check if a purchasable sticker is owned
   * @param {string} stickerId - Sticker ID
   * @returns {boolean}
   */
  function isPurchasableStickerOwned(stickerId) {
    return coinsStore.hasPurchasedItem(stickerId)
  }

  /**
   * Get the display name for the selected sticker
   * @returns {string}
   */
  function getStickerName() {
    if (!selectedStickerId.value) return ''

    if (selectedCategory.value === 'achievement') {
      const [op, type] = selectedStickerId.value.split('_')
      return `${t.value.operations[op]} ${t.value.stickerWall[type]}`
    }
    if (selectedCategory.value === 'purchasable') {
      const sticker = selectedSticker.value
      if (sticker) {
        return t.value.shop?.stickers?.[sticker.nameKey] || sticker.nameKey
      }
    }
    if (selectedCategory.value === 'hidden') {
      const achievement = selectedSticker.value
      if (achievement) {
        return t.value.achievements?.[achievement.nameKey] || achievement.nameKey
      }
    }
    return ''
  }

  /**
   * Get the unlock condition text for a sticker
   * @param {string} stickerId - Sticker ID
   * @returns {string}
   */
  function getCondition(stickerId) {
    if (!stickerId) return ''
    const [, type] = stickerId.split('_')
    return t.value.stickerWall.condition[type] || ''
  }

  /**
   * Format a date string for display
   * @param {string} dateStr - ISO date string
   * @returns {string}
   */
  function formatDate(dateStr) {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString(localeStore.currentLocale === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return {
    // State
    showDetail,
    selectedStickerId,
    selectedCategory,
    selectedSticker,
    stickerInfo,

    // Counts
    achievementCount,
    hiddenCount,
    purchasedCount,
    totalEarnedCount,
    totalPossibleCount,

    // Functions
    showStickerDetail,
    isPurchasableStickerOwned,
    getStickerName,
    getCondition,
    formatDate,

    // Stores
    stickersStore,
    localeStore,
    t
  }
}
