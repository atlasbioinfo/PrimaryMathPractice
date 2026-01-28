/**
 * Question generator composable
 * @module composables/useQuestionGenerator
 */
import { operationConfig, generateQuestions } from '../config/levels.js'

/**
 * @typedef {import('../config/levels').Question} Question
 * @typedef {import('../config/levels').Fraction} Fraction
 * @typedef {import('../config/levels').NumberQuestion} NumberQuestion
 * @typedef {import('../config/levels').FractionQuestion} FractionQuestion
 */

/**
 * @typedef {Object} FormattedNumberQuestion
 * @property {'number'} type - Question type
 * @property {number} num1 - First number
 * @property {number} num2 - Second number
 * @property {string} operation - Operation symbol
 */

/**
 * @typedef {Object} FormattedFractionFractionQuestion
 * @property {'fraction_fraction'} type - Question type
 * @property {Fraction} fraction1 - First fraction
 * @property {Fraction} fraction2 - Second fraction
 * @property {string} operation - Operation symbol
 */

/**
 * @typedef {Object} FormattedFractionIntegerQuestion
 * @property {'fraction_integer'} type - Question type
 * @property {Fraction} fraction - The fraction
 * @property {number} integer - The integer
 * @property {string} operation - Operation symbol
 */

/**
 * @typedef {FormattedNumberQuestion | FormattedFractionFractionQuestion | FormattedFractionIntegerQuestion} FormattedQuestion
 */

/**
 * Composable for generating and validating math questions
 * @returns {Object} Question generator methods
 */
export function useQuestionGenerator() {
  /**
   * Generate questions for a game session
   * @param {string} operation - Operation type
   * @param {number} level - Level number (1-6)
   * @param {number} [count=10] - Number of questions
   * @returns {Question[]} Generated questions
   */
  function generate(operation, level, count = 10) {
    return generateQuestions(operation, level, count)
  }

  /**
   * Get the correct answer for a question
   * @param {Question} question - The question
   * @param {string} operation - Operation type
   * @returns {number | Fraction} The correct answer
   */
  function getCorrectAnswer(question, operation) {
    if (operationConfig[operation].isFraction) {
      return question.answer
    }
    return question.answer
  }

  /**
   * Check if user's answer is correct
   * @param {Question} question - The question
   * @param {number | Fraction} userAnswer - User's answer
   * @param {string} operation - Operation type
   * @returns {boolean} Whether the answer is correct
   */
  function checkAnswer(question, userAnswer, operation) {
    if (operationConfig[operation].isFraction) {
      // For fractions, compare numerator and denominator
      const correct = question.answer
      if (typeof userAnswer === 'object') {
        // Simplify both fractions for comparison
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
        const g1 = gcd(correct.numerator, correct.denominator)
        const g2 = gcd(userAnswer.numerator, userAnswer.denominator)
        return (
          correct.numerator / g1 === userAnswer.numerator / g2 &&
          correct.denominator / g1 === userAnswer.denominator / g2
        )
      }
      return false
    }
    return userAnswer === question.answer
  }

  /**
   * Format a question for display
   * @param {Question} question - The question
   * @param {string} operation - Operation type
   * @returns {FormattedQuestion} Formatted question for rendering
   */
  function formatQuestion(question, operation) {
    if (operationConfig[operation].isFraction) {
      if (question.integer !== undefined) {
        // Fraction with integer operation
        return {
          type: 'fraction_integer',
          fraction: question.fraction1,
          integer: question.integer,
          operation: question.operation
        }
      }
      // Fraction with fraction operation
      return {
        type: 'fraction_fraction',
        fraction1: question.fraction1,
        fraction2: question.fraction2,
        operation: question.operation
      }
    }
    // Regular number operation
    return {
      type: 'number',
      num1: question.num1,
      num2: question.num2,
      operation: operationConfig[operation].symbol
    }
  }

  return {
    generate,
    getCorrectAnswer,
    checkAnswer,
    formatQuestion
  }
}
