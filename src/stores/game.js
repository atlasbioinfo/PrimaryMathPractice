/**
 * Game store for managing active game session state
 * @module stores/game
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * @typedef {import('../config/levels').Question} Question
 */

/**
 * @typedef {Object} AnswerRecord
 * @property {Question} question - The question that was answered
 * @property {*} userAnswer - The user's answer
 * @property {*} correctAnswer - The correct answer
 * @property {boolean} isCorrect - Whether the answer was correct
 * @property {boolean} retried - Whether this was a retry attempt
 */

/**
 * @typedef {Object} GameState
 * @property {string|null} currentOperation - Current operation type
 * @property {number|null} currentLevel - Current level number
 * @property {Question[]} questions - Array of questions for this game
 * @property {number} currentQuestionIndex - Index of current question
 * @property {AnswerRecord[]} answers - Array of answer records
 * @property {number} timeLeft - Seconds remaining
 * @property {number|null} startTime - Timestamp when game started
 * @property {boolean} isPlaying - Whether game is in progress
 * @property {boolean} isPaused - Whether game is paused
 */

export const useGameStore = defineStore('game', () => {
  const currentOperation = ref(null)
  const currentLevel = ref(null)
  const questions = ref([])
  const currentQuestionIndex = ref(0)
  const answers = ref([]) // { question, userAnswer, correctAnswer, isCorrect, retried }
  const timeLeft = ref(180)
  const startTime = ref(null)
  const isPlaying = ref(false)
  const isPaused = ref(false)

  const currentQuestion = computed(() => {
    return questions.value[currentQuestionIndex.value] || null
  })

  const correctCount = computed(() => {
    return answers.value.filter(a => a.isCorrect).length
  })

  const wrongCount = computed(() => {
    return answers.value.filter(a => !a.isCorrect).length
  })

  const retriedCount = computed(() => {
    return answers.value.filter(a => a.retried).length
  })

  const accuracy = computed(() => {
    if (answers.value.length === 0) return 0
    return Math.round((correctCount.value / answers.value.length) * 100)
  })

  const timeUsed = computed(() => {
    if (!startTime.value) return 0
    return 180 - timeLeft.value
  })

  /**
   * Start a new game session
   * @param {string} operation - Operation type
   * @param {number} level - Level number
   * @param {Question[]} generatedQuestions - Questions for this game
   */
  function startGame(operation, level, generatedQuestions) {
    currentOperation.value = operation
    currentLevel.value = level
    questions.value = generatedQuestions
    currentQuestionIndex.value = 0
    answers.value = []
    timeLeft.value = 180
    startTime.value = Date.now()
    isPlaying.value = true
    isPaused.value = false
  }

  /**
   * Submit an answer for the current question
   * @param {*} userAnswer - The user's answer
   * @param {*} correctAnswer - The correct answer
   * @param {boolean} [retried=false] - Whether this is a retry attempt
   * @returns {boolean} Whether the answer was correct
   */
  function submitAnswer(userAnswer, correctAnswer, retried = false) {
    const isCorrect = userAnswer === correctAnswer
    answers.value.push({
      question: { ...currentQuestion.value },
      userAnswer,
      correctAnswer,
      isCorrect,
      retried
    })
    return isCorrect
  }

  function nextQuestion() {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++
      return true
    }
    return false
  }

  function tick() {
    if (isPlaying.value && !isPaused.value && timeLeft.value > 0) {
      timeLeft.value--
    }
  }

  function pause() {
    isPaused.value = true
  }

  function resume() {
    isPaused.value = false
  }

  function endGame() {
    isPlaying.value = false
  }

  function reset() {
    currentOperation.value = null
    currentLevel.value = null
    questions.value = []
    currentQuestionIndex.value = 0
    answers.value = []
    timeLeft.value = 180
    startTime.value = null
    isPlaying.value = false
    isPaused.value = false
  }

  return {
    currentOperation,
    currentLevel,
    questions,
    currentQuestionIndex,
    answers,
    timeLeft,
    startTime,
    isPlaying,
    isPaused,
    currentQuestion,
    correctCount,
    wrongCount,
    retriedCount,
    accuracy,
    timeUsed,
    startGame,
    submitAnswer,
    nextQuestion,
    tick,
    pause,
    resume,
    endGame,
    reset
  }
})
