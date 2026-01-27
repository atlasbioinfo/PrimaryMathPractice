import { operationConfig, generateQuestions } from '../config/levels.js'

export function useQuestionGenerator() {
  function generate(operation, level, count = 10) {
    return generateQuestions(operation, level, count)
  }

  function getCorrectAnswer(question, operation) {
    if (operationConfig[operation].isFraction) {
      return question.answer
    }
    return question.answer
  }

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
