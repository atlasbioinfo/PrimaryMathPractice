import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProgressStore } from './progress'
import { hiddenAchievementStickers } from '../config/stickers'
import { allPurchasableStickers } from '../config/shop'

export const useStickersStore = defineStore('stickers', () => {
  const earnedStickers = ref([])
  const earnedHiddenAchievements = ref([])

  const stickerTypes = {
    bronze: { levels: [1, 2], icon: '🥉', nameKey: 'bronze' },
    silver: { levels: [3, 4], icon: '🥈', nameKey: 'silver' },
    gold: { levels: [5, 6], icon: '🥇', nameKey: 'gold' },
    crown: { icon: '👑', nameKey: 'crown' }
  }

  const operations = ['addition', 'subtraction', 'multiplication', 'division', 'fraction']

  // Achievement stickers (operation-based)
  const achievementStickers = computed(() => {
    const stickers = []
    operations.forEach(op => {
      ['bronze', 'silver', 'gold', 'crown'].forEach(type => {
        stickers.push({
          id: `${op}_${type}`,
          operation: op,
          type,
          category: 'achievement',
          icon: stickerTypes[type].icon,
          operationKey: op,
          typeKey: type
        })
      })
    })
    return stickers
  })

  // All stickers including achievement stickers (for backward compatibility)
  const allStickers = computed(() => achievementStickers.value)

  // Hidden achievement stickers
  const hiddenStickers = computed(() => {
    return hiddenAchievementStickers.map(s => ({
      ...s,
      category: 'hidden'
    }))
  })

  // Purchasable stickers (from shop)
  const purchasableStickers = computed(() => {
    return allPurchasableStickers.map(s => ({
      ...s,
      category: 'purchasable'
    }))
  })

  function hasSticker(stickerId) {
    return earnedStickers.value.some(s => s.id === stickerId)
  }

  function hasHiddenAchievement(achievementId) {
    return earnedHiddenAchievements.value.some(a => a.id === achievementId)
  }

  function getSticker(stickerId) {
    return earnedStickers.value.find(s => s.id === stickerId)
  }

  function getHiddenAchievement(achievementId) {
    return earnedHiddenAchievements.value.find(a => a.id === achievementId)
  }

  function earnSticker(stickerId, score, accuracy) {
    if (hasSticker(stickerId)) return false

    const stickerInfo = allStickers.value.find(s => s.id === stickerId)
    if (!stickerInfo) return false

    earnedStickers.value.push({
      id: stickerId,
      earnedAt: new Date().toISOString(),
      score,
      accuracy
    })
    return true
  }

  function earnHiddenAchievement(achievementId, details = {}) {
    if (hasHiddenAchievement(achievementId)) return false

    const achievementInfo = hiddenAchievementStickers.find(a => a.id === achievementId)
    if (!achievementInfo) return false

    earnedHiddenAchievements.value.push({
      id: achievementId,
      earnedAt: new Date().toISOString(),
      ...details
    })
    return true
  }

  // Check and award stickers based on progress
  function checkAndAwardStickers(operationType, completedLevels, accuracy) {
    const progressStore = useProgressStore()
    const newStickers = []

    // Check bronze (levels 1-2)
    if (completedLevels.includes(1) && completedLevels.includes(2)) {
      const stickerId = `${operationType}_bronze`
      if (!hasSticker(stickerId)) {
        earnSticker(stickerId, 0, accuracy)
        newStickers.push(allStickers.value.find(s => s.id === stickerId))
      }
    }

    // Check silver (levels 3-4)
    if (completedLevels.includes(3) && completedLevels.includes(4)) {
      const stickerId = `${operationType}_silver`
      if (!hasSticker(stickerId)) {
        earnSticker(stickerId, 0, accuracy)
        newStickers.push(allStickers.value.find(s => s.id === stickerId))
      }
    }

    // Check gold (levels 5-6)
    if (completedLevels.includes(5) && completedLevels.includes(6)) {
      const stickerId = `${operationType}_gold`
      if (!hasSticker(stickerId)) {
        earnSticker(stickerId, 0, accuracy)
        newStickers.push(allStickers.value.find(s => s.id === stickerId))
      }
    }

    // Check crown (all levels + 90% accuracy)
    if (completedLevels.length === 6) {
      const totalAccuracy = progressStore.getTotalAccuracy(operationType)
      if (totalAccuracy >= 90) {
        const stickerId = `${operationType}_crown`
        if (!hasSticker(stickerId)) {
          earnSticker(stickerId, 0, totalAccuracy)
          newStickers.push(allStickers.value.find(s => s.id === stickerId))
        }
      }
    }

    return newStickers
  }

  // Check hidden achievements based on game state
  function checkHiddenAchievements(context) {
    const newAchievements = []

    // First perfect score
    if (context.isPerfect && !hasHiddenAchievement('achievement_first_perfect')) {
      const isFirstPerfect = earnedHiddenAchievements.value.length === 0 ||
        !earnedHiddenAchievements.value.some(a => a.id === 'achievement_first_perfect')
      if (isFirstPerfect) {
        earnHiddenAchievement('achievement_first_perfect')
        newAchievements.push(hiddenAchievementStickers.find(a => a.id === 'achievement_first_perfect'))
      }
    }

    // Speed demon - complete level in under 60 seconds with perfect score
    if (context.isPerfect && context.timeUsed < 60 && !hasHiddenAchievement('achievement_speed_demon')) {
      earnHiddenAchievement('achievement_speed_demon', { timeUsed: context.timeUsed })
      newAchievements.push(hiddenAchievementStickers.find(a => a.id === 'achievement_speed_demon'))
    }

    // Perfect without retry
    if (context.isPerfect && context.retriedCount === 0 && !hasHiddenAchievement('achievement_first_try')) {
      earnHiddenAchievement('achievement_first_try')
      newAchievements.push(hiddenAchievementStickers.find(a => a.id === 'achievement_first_try'))
    }

    // Seven day streak
    if (context.streakDays >= 7 && !hasHiddenAchievement('achievement_seven_day')) {
      earnHiddenAchievement('achievement_seven_day', { streakDays: context.streakDays })
      newAchievements.push(hiddenAchievementStickers.find(a => a.id === 'achievement_seven_day'))
    }

    // Gold collector - earn 1000 coins total
    if (context.totalEarned >= 1000 && !hasHiddenAchievement('achievement_gold_collector')) {
      earnHiddenAchievement('achievement_gold_collector')
      newAchievements.push(hiddenAchievementStickers.find(a => a.id === 'achievement_gold_collector'))
    }

    // Thousand questions
    if (context.totalQuestions >= 1000 && !hasHiddenAchievement('achievement_thousand')) {
      earnHiddenAchievement('achievement_thousand')
      newAchievements.push(hiddenAchievementStickers.find(a => a.id === 'achievement_thousand'))
    }

    // Rich - accumulate 5000 coins
    if (context.totalEarned >= 5000 && !hasHiddenAchievement('achievement_rich')) {
      earnHiddenAchievement('achievement_rich')
      newAchievements.push(hiddenAchievementStickers.find(a => a.id === 'achievement_rich'))
    }

    // Collector - collect 30 stickers
    if (getTotalEarnedCount() >= 30 && !hasHiddenAchievement('achievement_collector')) {
      earnHiddenAchievement('achievement_collector')
      newAchievements.push(hiddenAchievementStickers.find(a => a.id === 'achievement_collector'))
    }

    // All rounder - master all operations
    if (context.allOperationsMastered && !hasHiddenAchievement('achievement_all_rounder')) {
      earnHiddenAchievement('achievement_all_rounder')
      newAchievements.push(hiddenAchievementStickers.find(a => a.id === 'achievement_all_rounder'))
    }

    // Math master - complete all levels with perfect scores
    if (context.allLevelsPerfect && !hasHiddenAchievement('achievement_math_master')) {
      earnHiddenAchievement('achievement_math_master')
      newAchievements.push(hiddenAchievementStickers.find(a => a.id === 'achievement_math_master'))
    }

    return newAchievements
  }

  function getEarnedCount() {
    return earnedStickers.value.length
  }

  function getHiddenAchievementCount() {
    return earnedHiddenAchievements.value.length
  }

  function getTotalEarnedCount() {
    return earnedStickers.value.length + earnedHiddenAchievements.value.length
  }

  function getTotalCount() {
    return allStickers.value.length
  }

  function getTotalPossibleCount() {
    // Achievement (20) + Hidden (10) + Purchasable (28) = 58
    return 58
  }

  function reset() {
    earnedStickers.value = []
    earnedHiddenAchievements.value = []
  }

  return {
    earnedStickers,
    earnedHiddenAchievements,
    allStickers,
    achievementStickers,
    hiddenStickers,
    purchasableStickers,
    stickerTypes,
    operations,
    hasSticker,
    hasHiddenAchievement,
    getSticker,
    getHiddenAchievement,
    earnSticker,
    earnHiddenAchievement,
    checkAndAwardStickers,
    checkHiddenAchievements,
    getEarnedCount,
    getHiddenAchievementCount,
    getTotalEarnedCount,
    getTotalCount,
    getTotalPossibleCount,
    reset
  }
})
