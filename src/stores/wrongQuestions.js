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
 * @property {number} correctStreak - Consecutive correct answers (for Ebbinghaus)
 * @property {string|null} nextReviewAt - ISO timestamp for next review (null = ready for review)
 */

/**
 * Ebbinghaus review intervals (in days)
 * After 3 consecutive correct answers, the question is removed
 */
const REVIEW_INTERVALS = [1, 3] // After 1st correct: 1 day, after 2nd: 3 days, after 3rd: remove

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
      // Update existing entry - reset correct streak since they got it wrong again
      existing.wrongCount++
      existing.lastWrongAt = new Date().toISOString()
      existing.userAnswer = userAnswer // Store most recent wrong answer
      existing.correctStreak = 0 // Reset streak on wrong answer
      existing.nextReviewAt = null // Make it available for review immediately
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
        addedAt: new Date().toISOString(),
        correctStreak: 0,
        nextReviewAt: null
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
   * Check if a question is due for review
   * @param {WrongQuestion} question - The question to check
   * @returns {boolean} True if due for review
   */
  function isDueForReview(question) {
    if (!question.nextReviewAt) return true // Never reviewed or just added
    return new Date(question.nextReviewAt) <= new Date()
  }

  /**
   * Get questions that are due for review (available now)
   * @returns {WrongQuestion[]} Questions ready for review
   */
  const dueQuestions = computed(() => {
    return questions.value.filter(isDueForReview)
  })

  /**
   * Count of questions due for review
   */
  const dueCount = computed(() => dueQuestions.value.length)

  /**
   * Get questions for practice (only those due for review, sorted by wrong count)
   * @param {number} [count=10] - Number of questions to get
   * @returns {WrongQuestion[]} Questions for practice
   */
  function getQuestionsForPractice(count = 10) {
    // Only get questions that are due for review
    const available = questions.value.filter(isDueForReview)

    // Sort by wrong count (most wrong first) then by recency
    const sorted = available.sort((a, b) => {
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
   * Uses Ebbinghaus spaced repetition: hide after correct, show again after interval
   * After 3 consecutive correct answers, remove from list
   * @param {string} id - Question ID
   * @returns {Object} Result with action taken and next review info
   */
  function recordCorrectAnswer(id) {
    const question = questions.value.find(q => q.id === id)
    if (!question) return { action: 'not_found' }

    question.correctStreak = (question.correctStreak || 0) + 1

    if (question.correctStreak >= 3) {
      // Mastered! Remove from wrong questions
      removeQuestion(id)
      return { action: 'mastered', streak: 3 }
    }

    // Schedule next review based on Ebbinghaus intervals
    const intervalDays = REVIEW_INTERVALS[question.correctStreak - 1] || 1
    const nextReview = new Date()
    nextReview.setDate(nextReview.getDate() + intervalDays)
    question.nextReviewAt = nextReview.toISOString()

    return {
      action: 'scheduled',
      streak: question.correctStreak,
      nextReviewAt: question.nextReviewAt,
      intervalDays
    }
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
    dueQuestions,
    dueCount,
    // Actions
    addWrongQuestion,
    removeQuestion,
    getQuestionsForPractice,
    getQuestionsByOperation,
    clearAll,
    recordCorrectAnswer,
    isDueForReview,
    generateQuestionId,
    reset
  }
})
