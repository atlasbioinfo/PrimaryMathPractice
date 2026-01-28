/**
 * Tests for question generator composable
 */
import { describe, it, expect } from 'vitest'
import { useQuestionGenerator } from '../../composables/useQuestionGenerator'

describe('useQuestionGenerator', () => {
  const { generate, getCorrectAnswer, checkAnswer, formatQuestion } = useQuestionGenerator()

  describe('generate', () => {
    it('should generate questions using the config', () => {
      const questions = generate('addition', 1, 5)
      expect(questions).toHaveLength(5)
      questions.forEach(q => {
        expect(q.num1).toBeDefined()
        expect(q.num2).toBeDefined()
        expect(q.answer).toBeDefined()
      })
    })
  })

  describe('getCorrectAnswer', () => {
    it('should return the answer for regular questions', () => {
      const question = { num1: 5, num2: 3, answer: 8 }
      expect(getCorrectAnswer(question, 'addition')).toBe(8)
    })

    it('should return the answer for fraction questions', () => {
      const question = {
        fraction1: { numerator: 1, denominator: 4 },
        fraction2: { numerator: 2, denominator: 4 },
        answer: { numerator: 3, denominator: 4 },
        operation: '+'
      }
      expect(getCorrectAnswer(question, 'fraction')).toEqual({ numerator: 3, denominator: 4 })
    })
  })

  describe('checkAnswer', () => {
    it('should return true for correct numeric answers', () => {
      const question = { num1: 5, num2: 3, answer: 8 }
      expect(checkAnswer(question, 8, 'addition')).toBe(true)
    })

    it('should return false for incorrect numeric answers', () => {
      const question = { num1: 5, num2: 3, answer: 8 }
      expect(checkAnswer(question, 7, 'addition')).toBe(false)
    })

    it('should compare simplified fractions correctly', () => {
      const question = {
        fraction1: { numerator: 1, denominator: 4 },
        fraction2: { numerator: 2, denominator: 4 },
        answer: { numerator: 3, denominator: 4 },
        operation: '+'
      }
      // Exact match
      expect(checkAnswer(question, { numerator: 3, denominator: 4 }, 'fraction')).toBe(true)
    })

    it('should accept equivalent fractions', () => {
      const question = {
        fraction1: { numerator: 1, denominator: 2 },
        fraction2: { numerator: 1, denominator: 2 },
        answer: { numerator: 2, denominator: 2 }, // = 1
        operation: '+'
      }
      // User enters equivalent fraction
      expect(checkAnswer(question, { numerator: 1, denominator: 1 }, 'fraction')).toBe(true)
    })

    it('should reject wrong fractions', () => {
      const question = {
        fraction1: { numerator: 1, denominator: 4 },
        fraction2: { numerator: 2, denominator: 4 },
        answer: { numerator: 3, denominator: 4 },
        operation: '+'
      }
      expect(checkAnswer(question, { numerator: 2, denominator: 4 }, 'fraction')).toBe(false)
    })

    it('should reject non-object answers for fractions', () => {
      const question = {
        fraction1: { numerator: 1, denominator: 4 },
        fraction2: { numerator: 2, denominator: 4 },
        answer: { numerator: 3, denominator: 4 },
        operation: '+'
      }
      expect(checkAnswer(question, 0.75, 'fraction')).toBe(false)
    })
  })

  describe('formatQuestion', () => {
    it('should format regular number questions', () => {
      const question = { num1: 5, num2: 3, answer: 8 }
      const formatted = formatQuestion(question, 'addition')
      expect(formatted.type).toBe('number')
      expect(formatted.num1).toBe(5)
      expect(formatted.num2).toBe(3)
      expect(formatted.operation).toBe('+')
    })

    it('should format fraction+fraction questions', () => {
      const question = {
        fraction1: { numerator: 1, denominator: 4 },
        fraction2: { numerator: 2, denominator: 4 },
        answer: { numerator: 3, denominator: 4 },
        operation: '+'
      }
      const formatted = formatQuestion(question, 'fraction')
      expect(formatted.type).toBe('fraction_fraction')
      expect(formatted.fraction1).toEqual({ numerator: 1, denominator: 4 })
      expect(formatted.fraction2).toEqual({ numerator: 2, denominator: 4 })
      expect(formatted.operation).toBe('+')
    })

    it('should format fraction*integer questions', () => {
      const question = {
        fraction1: { numerator: 1, denominator: 4 },
        integer: 3,
        answer: { numerator: 3, denominator: 4 },
        operation: '×'
      }
      const formatted = formatQuestion(question, 'fraction')
      expect(formatted.type).toBe('fraction_integer')
      expect(formatted.fraction).toEqual({ numerator: 1, denominator: 4 })
      expect(formatted.integer).toBe(3)
      expect(formatted.operation).toBe('×')
    })
  })
})
