/**
 * Tests for progress store
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProgressStore } from '../../stores/progress'

describe('useProgressStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should have all operations with unlocked level 1', () => {
      const store = useProgressStore()
      const operations = ['addition', 'subtraction', 'multiplication', 'division', 'fraction']

      operations.forEach(op => {
        const progress = store.getOperationProgress(op)
        expect(progress.unlockedLevel).toBe(1)
        expect(progress.completedLevels).toEqual([])
        expect(progress.levelScores).toEqual({})
      })
    })
  })

  describe('getOperationProgress', () => {
    it('should return default progress for unknown operation', () => {
      const store = useProgressStore()
      const progress = store.getOperationProgress('unknown')
      expect(progress.unlockedLevel).toBe(1)
      expect(progress.completedLevels).toEqual([])
    })
  })

  describe('completeLevel', () => {
    it('should add level to completed levels', () => {
      const store = useProgressStore()
      store.completeLevel('addition', 1, 8, 80)

      const progress = store.getOperationProgress('addition')
      expect(progress.completedLevels).toContain(1)
    })

    it('should not duplicate completed levels', () => {
      const store = useProgressStore()
      store.completeLevel('addition', 1, 8, 80)
      store.completeLevel('addition', 1, 9, 90)

      const progress = store.getOperationProgress('addition')
      expect(progress.completedLevels.filter(l => l === 1)).toHaveLength(1)
    })

    it('should store best score', () => {
      const store = useProgressStore()
      store.completeLevel('addition', 1, 8, 80)
      store.completeLevel('addition', 1, 6, 60) // Worse score

      const progress = store.getOperationProgress('addition')
      expect(progress.levelScores[1].score).toBe(8)
      expect(progress.levelScores[1].accuracy).toBe(80)
    })

    it('should update score if better', () => {
      const store = useProgressStore()
      store.completeLevel('addition', 1, 8, 80)
      store.completeLevel('addition', 1, 10, 100) // Better score

      const progress = store.getOperationProgress('addition')
      expect(progress.levelScores[1].score).toBe(10)
      expect(progress.levelScores[1].accuracy).toBe(100)
    })

    it('should unlock next level when passing with 7+', () => {
      const store = useProgressStore()
      store.completeLevel('addition', 1, 7, 70)

      const progress = store.getOperationProgress('addition')
      expect(progress.unlockedLevel).toBe(2)
    })

    it('should not unlock next level when score < 7', () => {
      const store = useProgressStore()
      store.completeLevel('addition', 1, 6, 60)

      const progress = store.getOperationProgress('addition')
      expect(progress.unlockedLevel).toBe(1)
    })

    it('should not unlock beyond level 6', () => {
      const store = useProgressStore()
      // Unlock all levels
      for (let level = 1; level <= 5; level++) {
        store.completeLevel('addition', level, 10, 100)
      }
      store.completeLevel('addition', 6, 10, 100)

      const progress = store.getOperationProgress('addition')
      expect(progress.unlockedLevel).toBe(6)
    })
  })

  describe('getCompletedLevelCount', () => {
    it('should return 0 for fresh operation', () => {
      const store = useProgressStore()
      expect(store.getCompletedLevelCount('addition')).toBe(0)
    })

    it('should count completed levels', () => {
      const store = useProgressStore()
      store.completeLevel('addition', 1, 8, 80)
      store.completeLevel('addition', 2, 9, 90)

      expect(store.getCompletedLevelCount('addition')).toBe(2)
    })
  })

  describe('getTotalAccuracy', () => {
    it('should return 0 for no completed levels', () => {
      const store = useProgressStore()
      expect(store.getTotalAccuracy('addition')).toBe(0)
    })

    it('should calculate average accuracy', () => {
      const store = useProgressStore()
      store.completeLevel('addition', 1, 8, 80)
      store.completeLevel('addition', 2, 10, 100)

      expect(store.getTotalAccuracy('addition')).toBe(90)
    })
  })

  describe('isOperationMastered', () => {
    it('should return false if not all levels completed', () => {
      const store = useProgressStore()
      for (let level = 1; level <= 5; level++) {
        store.completeLevel('addition', level, 10, 100)
      }
      expect(store.isOperationMastered('addition')).toBe(false)
    })

    it('should return false if accuracy < 90%', () => {
      const store = useProgressStore()
      for (let level = 1; level <= 6; level++) {
        store.completeLevel('addition', level, 8, 80)
      }
      expect(store.isOperationMastered('addition')).toBe(false)
    })

    it('should return true if all levels completed with 90%+ accuracy', () => {
      const store = useProgressStore()
      for (let level = 1; level <= 6; level++) {
        store.completeLevel('addition', level, 10, 100)
      }
      expect(store.isOperationMastered('addition')).toBe(true)
    })
  })

  describe('purchaseUnlock', () => {
    it('should unlock a locked level', () => {
      const store = useProgressStore()
      const result = store.purchaseUnlock('addition', 3)

      expect(result).toBe(true)
      expect(store.getOperationProgress('addition').unlockedLevel).toBe(3)
    })

    it('should not unlock already unlocked level', () => {
      const store = useProgressStore()
      store.completeLevel('addition', 1, 10, 100)
      store.completeLevel('addition', 2, 10, 100)

      const result = store.purchaseUnlock('addition', 2)
      expect(result).toBe(false)
    })
  })

  describe('areAllOperationsMastered', () => {
    it('should return false if any operation not mastered', () => {
      const store = useProgressStore()
      expect(store.areAllOperationsMastered()).toBe(false)
    })

    it('should return true if all operations mastered', () => {
      const store = useProgressStore()
      const operations = ['addition', 'subtraction', 'multiplication', 'division', 'fraction']

      operations.forEach(op => {
        for (let level = 1; level <= 6; level++) {
          store.completeLevel(op, level, 10, 100)
        }
      })

      expect(store.areAllOperationsMastered()).toBe(true)
    })
  })

  describe('reset', () => {
    it('should reset all progress', () => {
      const store = useProgressStore()
      store.completeLevel('addition', 1, 10, 100)
      store.completeLevel('subtraction', 2, 9, 90)

      store.reset()

      expect(store.getCompletedLevelCount('addition')).toBe(0)
      expect(store.getCompletedLevelCount('subtraction')).toBe(0)
      expect(store.getOperationProgress('addition').unlockedLevel).toBe(1)
    })
  })
})
