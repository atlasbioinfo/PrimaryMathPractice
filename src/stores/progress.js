import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProgressStore = defineStore('progress', () => {
  const operations = ref({
    addition: { unlockedLevel: 1, completedLevels: [], levelScores: {} },
    subtraction: { unlockedLevel: 1, completedLevels: [], levelScores: {} },
    multiplication: { unlockedLevel: 1, completedLevels: [], levelScores: {} },
    division: { unlockedLevel: 1, completedLevels: [], levelScores: {} },
    fraction: { unlockedLevel: 1, completedLevels: [], levelScores: {} }
  })

  function getOperationProgress(operationType) {
    return operations.value[operationType] || { unlockedLevel: 1, completedLevels: [], levelScores: {} }
  }

  function completeLevel(operationType, level, score, accuracy) {
    const op = operations.value[operationType]
    if (!op) return

    // Add to completed levels if not already there
    if (!op.completedLevels.includes(level)) {
      op.completedLevels.push(level)
    }

    // Store score for this level (keep best score)
    const prevScore = op.levelScores[level] || { score: 0, accuracy: 0 }
    if (score > prevScore.score || (score === prevScore.score && accuracy > prevScore.accuracy)) {
      op.levelScores[level] = { score, accuracy, completedAt: new Date().toISOString() }
    }

    // Unlock next level if passed (7+ correct) and not already unlocked
    if (score >= 7 && level >= op.unlockedLevel && level < 6) {
      op.unlockedLevel = level + 1
    }
  }

  function getCompletedLevelCount(operationType) {
    return operations.value[operationType]?.completedLevels.length || 0
  }

  function getTotalAccuracy(operationType) {
    const op = operations.value[operationType]
    if (!op || Object.keys(op.levelScores).length === 0) return 0

    const scores = Object.values(op.levelScores)
    const totalAccuracy = scores.reduce((sum, s) => sum + s.accuracy, 0)
    return Math.round(totalAccuracy / scores.length)
  }

  function isOperationMastered(operationType) {
    const op = operations.value[operationType]
    if (!op) return false
    return op.completedLevels.length === 6 && getTotalAccuracy(operationType) >= 90
  }

  function purchaseUnlock(operationType, level) {
    const op = operations.value[operationType]
    if (!op) return false

    // Only unlock if the level is currently locked
    if (op.unlockedLevel >= level) return false

    // Set unlockedLevel to the purchased level
    op.unlockedLevel = level
    return true
  }

  function areAllOperationsMastered() {
    return Object.keys(operations.value).every(op => isOperationMastered(op))
  }

  function reset() {
    operations.value = {
      addition: { unlockedLevel: 1, completedLevels: [], levelScores: {} },
      subtraction: { unlockedLevel: 1, completedLevels: [], levelScores: {} },
      multiplication: { unlockedLevel: 1, completedLevels: [], levelScores: {} },
      division: { unlockedLevel: 1, completedLevels: [], levelScores: {} },
      fraction: { unlockedLevel: 1, completedLevels: [], levelScores: {} }
    }
  }

  return {
    operations,
    getOperationProgress,
    completeLevel,
    getCompletedLevelCount,
    getTotalAccuracy,
    isOperationMastered,
    purchaseUnlock,
    areAllOperationsMastered,
    reset
  }
})
