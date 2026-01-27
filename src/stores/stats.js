import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStatsStore = defineStore('stats', () => {
  const totalQuestions = ref(0)
  const totalCorrect = ref(0)

  const byOperation = ref({
    addition: { total: 0, correct: 0, bestTime: null, sessions: 0 },
    subtraction: { total: 0, correct: 0, bestTime: null, sessions: 0 },
    multiplication: { total: 0, correct: 0, bestTime: null, sessions: 0 },
    division: { total: 0, correct: 0, bestTime: null, sessions: 0 },
    fraction: { total: 0, correct: 0, bestTime: null, sessions: 0 }
  })

  const streakDays = ref(0)
  const lastPlayDate = ref(null)

  const overallAccuracy = computed(() => {
    if (totalQuestions.value === 0) return 0
    return Math.round((totalCorrect.value / totalQuestions.value) * 100)
  })

  function recordSession(operationType, correct, total, timeUsed) {
    // Update totals
    totalQuestions.value += total
    totalCorrect.value += correct

    // Update operation stats
    const op = byOperation.value[operationType]
    if (op) {
      op.total += total
      op.correct += correct
      op.sessions += 1

      // Update best time if this was a perfect or near-perfect run
      if (correct >= 9 && (op.bestTime === null || timeUsed < op.bestTime)) {
        op.bestTime = timeUsed
      }
    }

    // Update streak
    updateStreak()
  }

  function updateStreak() {
    const today = new Date().toISOString().split('T')[0]

    if (!lastPlayDate.value) {
      streakDays.value = 1
    } else {
      const lastDate = new Date(lastPlayDate.value)
      const todayDate = new Date(today)
      const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24))

      if (diffDays === 0) {
        // Same day, streak continues
      } else if (diffDays === 1) {
        // Next day, increment streak
        streakDays.value += 1
      } else {
        // Gap in days, reset streak
        streakDays.value = 1
      }
    }

    lastPlayDate.value = today
  }

  function getOperationAccuracy(operationType) {
    const op = byOperation.value[operationType]
    if (!op || op.total === 0) return 0
    return Math.round((op.correct / op.total) * 100)
  }

  function getOperationStats(operationType) {
    return byOperation.value[operationType] || { total: 0, correct: 0, bestTime: null, sessions: 0 }
  }

  function reset() {
    totalQuestions.value = 0
    totalCorrect.value = 0
    byOperation.value = {
      addition: { total: 0, correct: 0, bestTime: null, sessions: 0 },
      subtraction: { total: 0, correct: 0, bestTime: null, sessions: 0 },
      multiplication: { total: 0, correct: 0, bestTime: null, sessions: 0 },
      division: { total: 0, correct: 0, bestTime: null, sessions: 0 },
      fraction: { total: 0, correct: 0, bestTime: null, sessions: 0 }
    }
    streakDays.value = 0
    lastPlayDate.value = null
  }

  return {
    totalQuestions,
    totalCorrect,
    byOperation,
    streakDays,
    lastPlayDate,
    overallAccuracy,
    recordSession,
    getOperationAccuracy,
    getOperationStats,
    reset
  }
})
