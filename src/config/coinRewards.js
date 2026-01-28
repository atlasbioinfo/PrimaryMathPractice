/**
 * Coin reward configuration for math practice app
 * @module config/coinRewards
 */

/**
 * @typedef {Object} CoinBreakdown
 * @property {number} correctAnswers - Coins earned from correct answers
 * @property {number} levelCompletion - Bonus coins for completing level (7+ correct)
 * @property {number} perfectScore - Bonus coins for perfect 10/10
 * @property {number} noRetryBonus - Additional bonus for perfect without retries
 * @property {number} total - Total coins earned
 */

/**
 * @typedef {Object} LevelRewardInfo
 * @property {number} perCorrect - Coins per correct answer
 * @property {number} completion - Level completion bonus
 * @property {number} perfect - Perfect score bonus
 * @property {number} noRetry - No retry bonus
 * @property {number} maxPossible - Maximum coins possible for the level
 */

/**
 * Coins earned per correct answer by level
 * @type {Record<number, number>}
 */
export const coinsPerCorrectAnswer = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6
}

/**
 * Bonus coins for completing a level (≥7 correct answers)
 * @type {Record<number, number>}
 */
export const levelCompletionBonus = {
  1: 10,
  2: 20,
  3: 35,
  4: 50,
  5: 70,
  6: 100
}

/**
 * Extra bonus for perfect score (10/10)
 * @type {Record<number, number>}
 */
export const perfectScoreBonus = {
  1: 15,
  2: 30,
  3: 50,
  4: 75,
  5: 100,
  6: 150
}

/**
 * Additional bonus for perfect score without any retries
 * @type {Record<number, number>}
 */
export const noRetryPerfectBonus = {
  1: 5,
  2: 10,
  3: 15,
  4: 20,
  5: 30,
  6: 50
}

/**
 * Calculate total coins earned for a game session
 * @param {number} level - Level number (1-6)
 * @param {number} correctCount - Number of correct answers (0-10)
 * @param {number} [retriedCount=0] - Number of questions answered correctly after retry
 * @returns {CoinBreakdown} Breakdown of coins earned
 */
export function calculateCoins(level, correctCount, retriedCount = 0) {
  const result = {
    correctAnswers: 0,
    levelCompletion: 0,
    perfectScore: 0,
    noRetryBonus: 0,
    total: 0
  }

  // Coins for correct answers
  result.correctAnswers = correctCount * coinsPerCorrectAnswer[level]

  // Level completion bonus (≥7 correct)
  if (correctCount >= 7) {
    result.levelCompletion = levelCompletionBonus[level]
  }

  // Perfect score bonus (10/10)
  if (correctCount === 10) {
    result.perfectScore = perfectScoreBonus[level]

    // No retry bonus (perfect score without any retries)
    if (retriedCount === 0) {
      result.noRetryBonus = noRetryPerfectBonus[level]
    }
  }

  result.total = result.correctAnswers + result.levelCompletion + result.perfectScore + result.noRetryBonus

  return result
}

/**
 * Get coin reward description for display
 * @param {number} level - Level number (1-6)
 * @returns {LevelRewardInfo} Descriptions of rewards for this level
 */
export function getLevelRewardInfo(level) {
  return {
    perCorrect: coinsPerCorrectAnswer[level],
    completion: levelCompletionBonus[level],
    perfect: perfectScoreBonus[level],
    noRetry: noRetryPerfectBonus[level],
    maxPossible: 10 * coinsPerCorrectAnswer[level] + levelCompletionBonus[level] + perfectScoreBonus[level] + noRetryPerfectBonus[level]
  }
}
