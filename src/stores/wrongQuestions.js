/**
 * Wrong Questions store for tracking and reviewing mistakes
 * @module stores/wrongQuestions
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * @typedef {Object} WrongQuestion
 * @property {string} id - Unique identifier
 * @property {string} operation - Operation type
 * @property {number} level - Level number
 * @property {Object} question - The question object
 * @property {*} userAnswer - User's wrong answer
 * @property {*} correctAnswer - The correct answer
 * @property {number} wrongCount - Number of times answered wrong
 * @property {string} lastWrongAt - ISO timestamp of last wrong answer
 * @property {string} addedAt - ISO timestamp when first added
 */

export const useWrongQuestionsStore = defineStore('wrongQuestions', () => {
  // State
  /** @type {import('vue').Ref<WrongQuestion[]>} */
  const questions = ref([])

  // Computed
  const totalCount = computed(() => questions.value.length)

  const questionsByOperation = computed(() => {
    const grouped = {}
    questions.value.forEach(q => {
      if (!grouped[q.operation]) {
        grouped[q.operation] = []
      }
      grouped[q.operation].push(q)
    })
    return grouped
  })

  const hasQuestions = computed(() => questions.value.length > 0)

  // Actions
  /**
   * Generate a unique ID for a question
   * @param {string} operation - Operation type
   * @param {Object} question - The question object
   * @returns {string} Unique ID
   */
  function generateQuestionId(operation, question) {
    if (question.fraction1) {
      // Fraction question
      const f1 = `${question.fraction1.numerator}/${question.fraction1.denominator}`
      const f2 = question.fraction2
        ? `${question.fraction2.numerator}/${question.fraction2.denominator}`
        : question.integer
      return `${operation}_${f1}_${question.operation}_${f2}`
    }
    // Number question
    return `${operation}_${question.num1}_${question.num2}`
  }

  /**
   * Add a wrong question to the review list
   * @param {string} operation - Operation type
   * @param {number} level - Level number
   * @param {Object} question - The question object
   * @param {*} userAnswer - User's wrong answer
   * @param {*} correctAnswer - The correct answer
   */
  function addWrongQuestion(operation, level, question, userAnswer, correctAnswer) {
    const id = generateQuestionId(operation, question)
    const existing = questions.value.find(q => q.id === id)

    if (existing) {
      // Update existing entry
      existing.wrongCount++
      existing.lastWrongAt = new Date().toISOString()
      existing.userAnswer = userAnswer // Store most recent wrong answer
    } else {
      // Add new entry
      questions.value.push({
        id,
        operation,
        level,
        question: { ...question },
        userAnswer,
        correctAnswer,
        wrongCount: 1,
        lastWrongAt: new Date().toISOString(),
        addedAt: new Date().toISOString()
      })
    }

    // Keep list manageable - limit to 100 questions
    if (questions.value.length > 100) {
      // Remove oldest questions first
      questions.value.sort((a, b) => new Date(b.lastWrongAt) - new Date(a.lastWrongAt))
      questions.value = questions.value.slice(0, 100)
    }
  }

  /**
   * Remove a question from the review list (when answered correctly)
   * @param {string} id - Question ID
   */
  function removeQuestion(id) {
    const index = questions.value.findIndex(q => q.id === id)
    if (index !== -1) {
      questions.value.splice(index, 1)
    }
  }

  /**
   * Get questions for practice (sorted by wrong count)
   * @param {number} [count=10] - Number of questions to get
   * @returns {WrongQuestion[]} Questions for practice
   */
  function getQuestionsForPractice(count = 10) {
    // Sort by wrong count (most wrong first) then by recency
    const sorted = [...questions.value].sort((a, b) => {
      if (b.wrongCount !== a.wrongCount) {
        return b.wrongCount - a.wrongCount
      }
      return new Date(b.lastWrongAt) - new Date(a.lastWrongAt)
    })

    return sorted.slice(0, count)
  }

  /**
   * Get questions filtered by operation
   * @param {string} operation - Operation type
   * @returns {WrongQuestion[]} Filtered questions
   */
  function getQuestionsByOperation(operation) {
    return questions.value.filter(q => q.operation === operation)
  }

  /**
   * Clear all wrong questions
   */
  function clearAll() {
    questions.value = []
  }

  /**
   * Record a correct answer for a previously wrong question
   * @param {string} id - Question ID
   */
  function recordCorrectAnswer(id) {
    removeQuestion(id)
  }

  function reset() {
    questions.value = []
  }

  return {
    // State
    questions,
    // Computed
    totalCount,
    questionsByOperation,
    hasQuestions,
    // Actions
    addWrongQuestion,
    removeQuestion,
    getQuestionsForPractice,
    getQuestionsByOperation,
    clearAll,
    recordCorrectAnswer,
    reset
  }
})
