import { ref, computed, nextTick } from 'vue'
import { useGameStore } from '../stores/game.js'
import { useProgressStore } from '../stores/progress.js'
import { useStickersStore } from '../stores/stickers.js'
import { useStatsStore } from '../stores/stats.js'
import { useUserStore } from '../stores/user.js'
import { useLocaleStore } from '../stores/locale.js'
import { useCoinsStore } from '../stores/coins.js'
import { levelIcons } from '../config/levels.js'
import { calculateCoins } from '../config/coinRewards.js'
import { useSound } from './useSound.js'
import { useConfetti } from './useConfetti.js'

/**
 * Composable for ResultScreen logic
 * @param {Object} props - Component props with operation and level
 * @returns {Object} All reactive state and methods for the result screen
 */
export function useResultScreen(props) {
  const gameStore = useGameStore()
  const progressStore = useProgressStore()
  const stickersStore = useStickersStore()
  const statsStore = useStatsStore()
  const userStore = useUserStore()
  const localeStore = useLocaleStore()
  const coinsStore = useCoinsStore()
  const { playVictorySound, playApplauseSound, playCoinSound } = useSound()
  const { celebratePerfect, starBurst, rainbowCelebration, coinRain } = useConfetti()

  const t = computed(() => localeStore.t)
  const showReview = ref(false)
  const newStickers = ref([])
  const newAchievements = ref([])
  const coinAnimationRef = ref(null)
  const coinRewards = ref(null)
  const showStickerUnlock = ref(false)
  const unlockStickers = ref([])

  const encouragementType = computed(() => {
    if (gameStore.correctCount === 10) return 'perfect'
    if (gameStore.correctCount >= 8) return 'excellent'
    if (gameStore.correctCount >= 7) return 'good'
    return 'tryAgain'
  })

  const encouragementMessage = computed(() => {
    return localeStore.getRandomMessage(`result.encouragement.${encouragementType.value}`)
  })

  const encouragementEmoji = computed(() => {
    switch (encouragementType.value) {
      case 'perfect': return '🎆'
      case 'excellent': return '⭐'
      case 'good': return '🌈'
      default: return '🤗'
    }
  })

  const animationType = computed(() => {
    switch (encouragementType.value) {
      case 'perfect': return 'fireworks'
      case 'excellent': return 'stars'
      case 'good': return 'rainbow'
      default: return 'hug'
    }
  })

  const animationEmoji = computed(() => {
    switch (animationType.value) {
      case 'fireworks': return '🎆'
      case 'stars': return '⭐'
      case 'rainbow': return '🌈'
      case 'hug': return '🤗'
      default: return '✨'
    }
  })

  const isLevelPassed = computed(() => gameStore.correctCount >= 7)
  const hasNextLevel = computed(() => props.level < 6)

  const nextLevelName = computed(() => {
    if (!hasNextLevel.value) return ''
    const nextLevel = props.level + 1
    if (nextLevel === 6) {
      const titles = userStore.gender === 'prince'
        ? t.value.levels.princeTitle
        : t.value.levels.princessTitle
      return titles[props.operation]
    }
    return t.value.levels.levelNames[nextLevel]
  })

  const nextLevelIcon = computed(() => {
    if (!hasNextLevel.value) return ''
    return levelIcons[props.level + 1]
  })

  const nextLevelHint = computed(() => {
    if (!hasNextLevel.value) return ''
    return t.value.result.nextLevelHint[props.level]
  })

  const resultClass = computed(() => {
    if (gameStore.correctCount >= 9) return 'excellent'
    if (gameStore.correctCount >= 7) return 'good'
    return 'try-again'
  })

  function particleStyle(i) {
    const angle = (i / 10) * 360
    const delay = (i / 10) * 0.5
    return {
      '--angle': `${angle}deg`,
      '--delay': `${delay}s`
    }
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  function getStickerDisplayName(sticker) {
    if (sticker.operationKey && sticker.typeKey) {
      return `${t.value.operations?.[sticker.operationKey] || sticker.operationKey} ${t.value.stickerWall?.[sticker.typeKey] || sticker.typeKey}`
    }
    return sticker.name || ''
  }

  function closeStickerUnlock() {
    showStickerUnlock.value = false
  }

  function playSoundsAndConfetti() {
    if (gameStore.correctCount === 10) {
      playVictorySound()
      setTimeout(() => {
        playApplauseSound()
        celebratePerfect()
      }, 300)
      setTimeout(() => coinRain(), 800)
    } else if (gameStore.correctCount >= 9) {
      playVictorySound()
      setTimeout(() => {
        playApplauseSound()
        starBurst()
      }, 500)
    } else if (gameStore.correctCount >= 7) {
      playVictorySound()
      setTimeout(() => rainbowCelebration(), 300)
    }
  }

  function prepareUnlockItems() {
    const allNewItems = [
      ...newStickers.value.map(s => ({
        icon: s.icon,
        name: getStickerDisplayName(s),
        description: ''
      })),
      ...newAchievements.value.map(a => ({
        icon: a.icon,
        name: t.value.achievements?.[a.nameKey] || a.nameKey,
        description: t.value.achievements?.[a.descKey] || ''
      }))
    ]
    unlockStickers.value = allNewItems

    setTimeout(() => {
      showStickerUnlock.value = true
    }, 1200)
  }

  async function initializeResult() {
    // Auto-expand review if there are wrong answers
    if (gameStore.wrongCount > 0) {
      showReview.value = true
    }

    // Calculate coin rewards
    coinRewards.value = calculateCoins(
      props.level,
      gameStore.correctCount,
      gameStore.retriedCount
    )

    // Record stats
    statsStore.recordSession(
      props.operation,
      gameStore.correctCount,
      10,
      gameStore.timeUsed
    )

    // Add coins earned
    if (coinRewards.value.total > 0) {
      coinsStore.addCoins(coinRewards.value.total, 'level_complete', {
        operation: props.operation,
        level: props.level,
        correctCount: gameStore.correctCount
      })

      await nextTick()
      setTimeout(() => {
        playCoinSound()
        if (coinAnimationRef.value) {
          coinAnimationRef.value.triggerFromCenter(
            Math.min(coinRewards.value.total / 10, 8)
          )
        }
      }, 500)
    }

    // Update progress if passed
    if (isLevelPassed.value) {
      progressStore.completeLevel(
        props.operation,
        props.level,
        gameStore.correctCount,
        gameStore.accuracy
      )

      // Check for new stickers
      const progress = progressStore.getOperationProgress(props.operation)
      newStickers.value = stickersStore.checkAndAwardStickers(
        props.operation,
        progress.completedLevels,
        gameStore.accuracy
      )

      // Check for hidden achievements
      const achievementContext = {
        isPerfect: gameStore.correctCount === 10,
        retriedCount: gameStore.retriedCount,
        timeUsed: gameStore.timeUsed,
        streakDays: statsStore.streakDays,
        totalEarned: coinsStore.totalEarned,
        totalQuestions: statsStore.totalQuestions,
        allOperationsMastered: progressStore.areAllOperationsMastered(),
        allLevelsPerfect: false
      }
      newAchievements.value = stickersStore.checkHiddenAchievements(achievementContext)

      playSoundsAndConfetti()

      // Show sticker unlock effect if earned new stickers or achievements
      if (newStickers.value.length > 0 || newAchievements.value.length > 0) {
        prepareUnlockItems()
      }
    }
  }

  return {
    // Stores
    gameStore,
    localeStore,
    // Reactive state
    t,
    showReview,
    newStickers,
    newAchievements,
    coinAnimationRef,
    coinRewards,
    showStickerUnlock,
    unlockStickers,
    // Computed
    encouragementType,
    encouragementMessage,
    encouragementEmoji,
    animationType,
    animationEmoji,
    isLevelPassed,
    hasNextLevel,
    nextLevelName,
    nextLevelIcon,
    nextLevelHint,
    resultClass,
    // Methods
    particleStyle,
    formatTime,
    closeStickerUnlock,
    initializeResult
  }
}
