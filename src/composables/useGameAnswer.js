import { ref, computed } from 'vue'
import { useGameStore } from '../stores/game.js'
import { useWrongQuestionsStore } from '../stores/wrongQuestions.js'
import { useSound } from './useSound.js'

/**
 * Calculate greatest common divisor
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

/**
 * Check if two fractions are equal (handles unsimplified fractions)
 * @param {Object} fraction1 - { numerator, denominator }
 * @param {Object} fraction2 - { numerator, denominator }
 * @returns {boolean}
 */
function fractionsAreEqual(fraction1, fraction2) {
  const g1 = gcd(fraction1.numerator, fraction1.denominator)
  const g2 = gcd(fraction2.numerator, fraction2.denominator)
  return (
    fraction1.numerator / g1 === fraction2.numerator / g2 &&
    fraction1.denominator / g1 === fraction2.denominator / g2
  )
}

/**
 * Composable for managing game answer submission and feedback
 * @param {Object} options
 * @param {Object} options.props - Component props with operation, level, isReviewMode, reviewQuestions
 * @param {Function} options.onCorrect - Callback when answer is correct
 * @param {Function} options.onWrong - Callback when answer is wrong
 * @param {Function} options.onMoveNext - Callback after answer is processed
 */
export function useGameAnswer({ props, onCorrect, onWrong, onMoveNext }) {
  const gameStore = useGameStore()
  const wrongQuestionsStore = useWrongQuestionsStore()
  const { playCorrectSound, playWrongSound } = useSound()

  const userAnswer = ref(null)
  const fractionAnswer = ref({ numerator: null, denominator: null })
  const showFeedback = ref(false)
  const feedbackType = ref('correct')

  const currentQuestion = computed(() => gameStore.currentQuestion)

  /**
   * Check if the submit button should be enabled
   * @param {boolean} isFraction
   * @returns {boolean}
   */
  function canSubmit(isFraction) {
    if (isFraction) {
      return fractionAnswer.value.numerator !== null && fractionAnswer.value.denominator !== null
    }
    return userAnswer.value !== null
  }

  /**
   * Display feedback overlay
   * @param {boolean} isCorrect
   */
  function displayFeedback(isCorrect) {
    feedbackType.value = isCorrect ? 'correct' : 'wrong'
    showFeedback.value = true
    setTimeout(() => {
      showFeedback.value = false
    }, 500)
  }

  /**
   * Handle correct answer
   * @param {*} answer
   * @param {*} correctAnswer
   */
  function handleCorrectAnswer(answer, correctAnswer) {
    playCorrectSound()
    if (props.isReviewMode && props.reviewQuestions.length > 0) {
      const questionId = props.reviewQuestions[gameStore.currentQuestionIndex]
      if (questionId) {
        wrongQuestionsStore.recordCorrectAnswer(questionId)
      }
    }
    onCorrect?.(answer, correctAnswer)
  }

  /**
   * Handle wrong answer
   * @param {*} answer
   * @param {*} correctAnswer
   */
  function handleWrongAnswer(answer, correctAnswer) {
    playWrongSound()
    wrongQuestionsStore.addWrongQuestion(
      props.operation,
      props.level,
      currentQuestion.value,
      answer,
      correctAnswer
    )
    onWrong?.(answer, correctAnswer)
  }

  /**
   * Process the answer (check correctness, play sounds, record)
   * @param {boolean} isCorrect
   * @param {*} answer
   * @param {*} correctAnswer
   */
  function processAnswer(isCorrect, answer, correctAnswer) {
    displayFeedback(isCorrect)

    if (isCorrect) {
      handleCorrectAnswer(answer, correctAnswer)
    } else {
      handleWrongAnswer(answer, correctAnswer)
    }

    gameStore.submitAnswer(answer, correctAnswer, false)
    onMoveNext?.()
  }

  /**
   * Submit the current answer
   * @param {boolean} isFraction
   */
  function submitAnswer(isFraction) {
    if (!canSubmit(isFraction)) return

    if (isFraction) {
      const answer = { ...fractionAnswer.value }
      const correctAnswer = currentQuestion.value.answer
      const isCorrect = fractionsAreEqual(answer, correctAnswer)
      processAnswer(isCorrect, answer, correctAnswer)
    } else {
      const answer = userAnswer.value
      const correctAnswer = currentQuestion.value.answer
      const isCorrect = answer === correctAnswer
      processAnswer(isCorrect, answer, correctAnswer)
    }
  }

  /**
   * Reset answer inputs for next question
   */
  function resetAnswers() {
    userAnswer.value = null
    fractionAnswer.value = { numerator: null, denominator: null }
  }

  return {
    userAnswer,
    fractionAnswer,
    showFeedback,
    feedbackType,
    currentQuestion,
    canSubmit,
    submitAnswer,
    resetAnswers
  }
}
