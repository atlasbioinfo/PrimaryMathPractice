/**
 * Daily Challenge store for managing daily challenge state
 * @module stores/dailyChallenge
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateQuestions } from '../config/levels'

/**
 * @typedef {Object} DailyChallengeState
 * @property {string|null} lastChallengeDate - Date of last completed challenge (YYYY-MM-DD)
 * @property {number} currentStreak - Current daily streak
 * @property {number} bestStreak - Best daily streak ever
 * @property {Object|null} todayResult - Today's challenge result
 * @property {number} totalChallenges - Total challenges completed
 */

/**
 * Generate a seed from a date string for consistent random generation
 * @param {string} dateStr - Date string (YYYY-MM-DD)
 * @returns {number} Seed number
 */
function dateToSeed(dateStr) {
  let hash = 0
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

/**
 * Seeded random number generator
 * @param {number} seed - The seed
 * @returns {function} Random function
 */
function seededRandom(seed) {
  return function() {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
}

export const useDailyChallengeStore = defineStore('dailyChallenge', () => {
  // State
  const lastChallengeDate = ref(null)
  const currentStreak = ref(0)
  const bestStreak = ref(0)
  const todayResult = ref(null)
  const totalChallenges = ref(0)

  // Computed
  const today = computed(() => {
    const now = new Date()
    return now.toISOString().split('T')[0]
  })

  const hasCompletedToday = computed(() => {
    return lastChallengeDate.value === today.value
  })

  const canPlayToday = computed(() => {
    return !hasCompletedToday.value
  })

  /**
   * Get today's challenge configuration
   * Uses date-based seeding for consistent questions per day
   */
  const todayChallengeConfig = computed(() => {
    const seed = dateToSeed(today.value)
    const random = seededRandom(seed)

    const operations = ['addition', 'subtraction', 'multiplication', 'division', 'fraction']
    const operationIndex = Math.floor(random() * operations.length)
    const operation = operations[operationIndex]

    // Level varies by day of week (1-6, with level 6 on weekends)
    const dayOfWeek = new Date().getDay()
    const level = dayOfWeek === 0 || dayOfWeek === 6 ? 6 : Math.min(dayOfWeek, 5)

    return {
      operation,
      level,
      questionCount: 10,
      date: today.value
    }
  })

  // Actions
  /**
   * Generate today's challenge questions
   * @returns {Array} Array of questions
   */
  function generateTodayQuestions() {
    const config = todayChallengeConfig.value

    // Use seeded random to generate consistent questions
    const seed = dateToSeed(config.date)
    const random = seededRandom(seed + 1000) // Different seed for questions

    // Store original Math.random and replace temporarily
    const originalRandom = Math.random
    Math.random = random

    const questions = generateQuestions(config.operation, config.level, config.questionCount)

    // Restore original Math.random
    Math.random = originalRandom

    return questions
  }

  /**
   * Complete today's challenge
   * @param {number} score - Score achieved (0-10)
   * @param {number} accuracy - Accuracy percentage
   * @param {number} timeUsed - Time used in seconds
   */
  function completeChallenge(score, accuracy, timeUsed) {
    if (hasCompletedToday.value) return

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    // Update streak
    if (lastChallengeDate.value === yesterdayStr) {
      currentStreak.value++
    } else if (lastChallengeDate.value !== today.value) {
      currentStreak.value = 1
    }

    // Update best streak
    if (currentStreak.value > bestStreak.value) {
      bestStreak.value = currentStreak.value
    }

    // Record today's result
    todayResult.value = {
      date: today.value,
      score,
      accuracy,
      timeUsed,
      operation: todayChallengeConfig.value.operation,
      level: todayChallengeConfig.value.level
    }

    lastChallengeDate.value = today.value
    totalChallenges.value++
  }

  /**
   * Get bonus coins for daily challenge
   * @param {number} score - Score achieved
   * @returns {number} Bonus coins
   */
  function getDailyChallengeBonus(score) {
    let bonus = score * 3 // 3 coins per correct answer

    // Streak bonuses
    if (currentStreak.value >= 7) bonus += 50
    else if (currentStreak.value >= 3) bonus += 20

    // Perfect score bonus
    if (score === 10) bonus += 30

    return bonus
  }

  function reset() {
    lastChallengeDate.value = null
    currentStreak.value = 0
    bestStreak.value = 0
    todayResult.value = null
    totalChallenges.value = 0
  }

  return {
    // State
    lastChallengeDate,
    currentStreak,
    bestStreak,
    todayResult,
    totalChallenges,
    // Computed
    today,
    hasCompletedToday,
    canPlayToday,
    todayChallengeConfig,
    // Actions
    generateTodayQuestions,
    completeChallenge,
    getDailyChallengeBonus,
    reset
  }
})
