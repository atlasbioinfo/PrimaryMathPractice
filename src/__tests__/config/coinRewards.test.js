/**
 * Tests for coin rewards calculation
 */
import { describe, it, expect } from 'vitest'
import {
  coinsPerCorrectAnswer,
  levelCompletionBonus,
  perfectScoreBonus,
  noRetryPerfectBonus,
  calculateCoins,
  getLevelRewardInfo,
} from '../../config/coinRewards'

describe('coinsPerCorrectAnswer', () => {
  it('should have coins defined for all 6 levels', () => {
    expect(Object.keys(coinsPerCorrectAnswer)).toHaveLength(6)
    for (let level = 1; level <= 6; level++) {
      expect(coinsPerCorrectAnswer[level]).toBeGreaterThan(0)
    }
  })

  it('should increase coins with higher levels', () => {
    for (let level = 1; level < 6; level++) {
      expect(coinsPerCorrectAnswer[level + 1]).toBeGreaterThan(coinsPerCorrectAnswer[level])
    }
  })
})

describe('calculateCoins', () => {
  it('should calculate correct coins for partial completion', () => {
    const result = calculateCoins(1, 5, 0)
    expect(result.correctAnswers).toBe(5) // 5 * 1 coin at level 1
    expect(result.levelCompletion).toBe(0) // Less than 7 correct
    expect(result.perfectScore).toBe(0)
    expect(result.noRetryBonus).toBe(0)
    expect(result.total).toBe(5)
  })

  it('should include level completion bonus when 7+ correct', () => {
    const result = calculateCoins(1, 7, 0)
    expect(result.correctAnswers).toBe(7)
    expect(result.levelCompletion).toBe(levelCompletionBonus[1])
    expect(result.total).toBe(7 + levelCompletionBonus[1])
  })

  it('should include perfect score bonus at 10/10', () => {
    const result = calculateCoins(2, 10, 0)
    expect(result.correctAnswers).toBe(20) // 10 * 2 coins at level 2
    expect(result.levelCompletion).toBe(levelCompletionBonus[2])
    expect(result.perfectScore).toBe(perfectScoreBonus[2])
    expect(result.noRetryBonus).toBe(noRetryPerfectBonus[2])
    expect(result.total).toBe(20 + levelCompletionBonus[2] + perfectScoreBonus[2] + noRetryPerfectBonus[2])
  })

  it('should not include no-retry bonus if retried', () => {
    const result = calculateCoins(3, 10, 2)
    expect(result.perfectScore).toBe(perfectScoreBonus[3])
    expect(result.noRetryBonus).toBe(0) // Had retries
  })

  it('should handle level 6 correctly', () => {
    const result = calculateCoins(6, 10, 0)
    expect(result.correctAnswers).toBe(60) // 10 * 6 coins
    expect(result.levelCompletion).toBe(levelCompletionBonus[6])
    expect(result.perfectScore).toBe(perfectScoreBonus[6])
    expect(result.noRetryBonus).toBe(noRetryPerfectBonus[6])
  })

  it('should return 0 for 0 correct answers', () => {
    const result = calculateCoins(1, 0, 0)
    expect(result.total).toBe(0)
  })
})

describe('getLevelRewardInfo', () => {
  it('should return correct reward info for each level', () => {
    for (let level = 1; level <= 6; level++) {
      const info = getLevelRewardInfo(level)
      expect(info.perCorrect).toBe(coinsPerCorrectAnswer[level])
      expect(info.completion).toBe(levelCompletionBonus[level])
      expect(info.perfect).toBe(perfectScoreBonus[level])
      expect(info.noRetry).toBe(noRetryPerfectBonus[level])
      expect(info.maxPossible).toBe(
        10 * coinsPerCorrectAnswer[level] +
        levelCompletionBonus[level] +
        perfectScoreBonus[level] +
        noRetryPerfectBonus[level]
      )
    }
  })
})
