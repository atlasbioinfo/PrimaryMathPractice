/**
 * Tests for question generation
 */
import { describe, it, expect } from 'vitest'
import { operationConfig, levelIcons, generateQuestions } from '../../config/levels'

describe('levelIcons', () => {
  it('should have icons for all 6 levels', () => {
    expect(Object.keys(levelIcons)).toHaveLength(6)
    for (let level = 1; level <= 6; level++) {
      expect(levelIcons[level]).toBeDefined()
      expect(typeof levelIcons[level]).toBe('string')
    }
  })
})

describe('operationConfig', () => {
  const operations = ['addition', 'subtraction', 'multiplication', 'division', 'fraction']

  it('should have all operations defined', () => {
    operations.forEach(op => {
      expect(operationConfig[op]).toBeDefined()
    })
  })

  it('should have symbol and icon for each operation', () => {
    operations.forEach(op => {
      expect(operationConfig[op].symbol).toBeDefined()
      expect(operationConfig[op].icon).toBeDefined()
    })
  })

  it('should have 6 levels for each operation', () => {
    operations.forEach(op => {
      expect(Object.keys(operationConfig[op].levels)).toHaveLength(6)
    })
  })
})

describe('generateQuestions', () => {
  it('should generate 10 questions by default', () => {
    const questions = generateQuestions('addition', 1)
    expect(questions).toHaveLength(10)
  })

  it('should generate custom number of questions', () => {
    const questions = generateQuestions('addition', 1, 5)
    expect(questions).toHaveLength(5)
  })

  describe('addition', () => {
    it('level 1 should generate valid addition questions (1-10 + 1-10)', () => {
      const questions = generateQuestions('addition', 1, 20)
      questions.forEach(q => {
        expect(q.num1).toBeGreaterThanOrEqual(1)
        expect(q.num1).toBeLessThanOrEqual(10)
        expect(q.num2).toBeGreaterThanOrEqual(1)
        expect(q.num2).toBeLessThanOrEqual(10)
        expect(q.answer).toBe(q.num1 + q.num2)
      })
    })

    it('level 6 should generate three-digit numbers', () => {
      const questions = generateQuestions('addition', 6, 20)
      questions.forEach(q => {
        expect(q.num1).toBeGreaterThanOrEqual(100)
        expect(q.num2).toBeGreaterThanOrEqual(100)
        expect(q.answer).toBe(q.num1 + q.num2)
      })
    })
  })

  describe('subtraction', () => {
    it('should always produce non-negative results', () => {
      for (let level = 1; level <= 6; level++) {
        const questions = generateQuestions('subtraction', level, 20)
        questions.forEach(q => {
          expect(q.answer).toBeGreaterThanOrEqual(0)
          expect(q.answer).toBe(q.num1 - q.num2)
        })
      }
    })
  })

  describe('multiplication', () => {
    it('level 2 should stay within times table (1-9 x 1-9)', () => {
      const questions = generateQuestions('multiplication', 2, 20)
      questions.forEach(q => {
        expect(q.num1).toBeGreaterThanOrEqual(1)
        expect(q.num1).toBeLessThanOrEqual(9)
        expect(q.num2).toBeGreaterThanOrEqual(1)
        expect(q.num2).toBeLessThanOrEqual(9)
        expect(q.answer).toBe(q.num1 * q.num2)
      })
    })
  })

  describe('division', () => {
    it('should always produce integer results', () => {
      for (let level = 1; level <= 6; level++) {
        const questions = generateQuestions('division', level, 20)
        questions.forEach(q => {
          expect(Number.isInteger(q.answer)).toBe(true)
          expect(q.answer).toBe(q.num1 / q.num2)
        })
      }
    })
  })

  describe('fraction', () => {
    it('level 1 should generate same denominator addition', () => {
      const questions = generateQuestions('fraction', 1, 20)
      questions.forEach(q => {
        expect(q.fraction1).toBeDefined()
        expect(q.fraction2).toBeDefined()
        expect(q.fraction1.denominator).toBe(q.fraction2.denominator)
        expect(q.operation).toBe('+')
        expect(q.answer.numerator).toBe(q.fraction1.numerator + q.fraction2.numerator)
      })
    })

    it('level 4 should have integer multiplier', () => {
      const questions = generateQuestions('fraction', 4, 20)
      questions.forEach(q => {
        expect(q.fraction1).toBeDefined()
        expect(q.integer).toBeDefined()
        expect(q.operation).toBe('×')
      })
    })
  })
})
