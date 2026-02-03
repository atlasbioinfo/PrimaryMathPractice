import { ref } from 'vue'
import { useGameStore } from '../stores/game.js'
import { generateQuestions } from '../config/levels.js'

/**
 * Composable for managing screen navigation in the app
 * @returns {object} Screen routing state and navigation functions
 */
export function useScreenRouter() {
  const gameStore = useGameStore()

  const currentScreen = ref('home')
  const selectedOperation = ref(null)
  const selectedLevel = ref(null)
  const showCountdown = ref(false)
  const pendingGameStart = ref(null)
  const isReviewMode = ref(false)
  const reviewQuestionIds = ref([])

  function goHome() {
    currentScreen.value = 'home'
    gameStore.reset()
  }

  function goToShop() {
    currentScreen.value = 'shop'
  }

  function goToDailyChallenge() {
    currentScreen.value = 'dailyChallenge'
  }

  function goToWrongQuestions() {
    currentScreen.value = 'wrongQuestions'
  }

  function goToOperationSelect() {
    currentScreen.value = 'operationSelect'
  }

  function startDailyChallenge(config) {
    import('../stores/dailyChallenge.js').then(({ useDailyChallengeStore }) => {
      const challengeStore = useDailyChallengeStore()
      const questions = challengeStore.generateTodayQuestions()
      selectedOperation.value = config.operation
      selectedLevel.value = config.level
      gameStore.startGame(config.operation, config.level, questions)
      currentScreen.value = 'playing'
    })
  }

  function startWrongQuestionsPractice(wrongQuestions) {
    if (wrongQuestions.length === 0) return

    const firstQ = wrongQuestions[0]
    selectedOperation.value = firstQ.operation
    selectedLevel.value = firstQ.level

    isReviewMode.value = true
    reviewQuestionIds.value = wrongQuestions.map(wq => wq.id)

    // Fix: Ensure question objects have the correct answer from correctAnswer field
    const questions = wrongQuestions.map(wq => ({
      ...wq.question,
      answer: wq.correctAnswer // Use the stored correctAnswer, not question.answer
    }))
    gameStore.startGame(firstQ.operation, firstQ.level, questions)
    currentScreen.value = 'playing'
  }

  function onOperationSelect(operation) {
    selectedOperation.value = operation
    currentScreen.value = 'levelSelect'
  }

  function onLevelSelect(level) {
    selectedLevel.value = level
    startGame()
  }

  function startGame() {
    pendingGameStart.value = {
      operation: selectedOperation.value,
      level: selectedLevel.value
    }
    showCountdown.value = true
  }

  function onCountdownComplete() {
    showCountdown.value = false

    if (pendingGameStart.value) {
      const { operation, level } = pendingGameStart.value
      const questions = generateQuestions(operation, level, 10)
      isReviewMode.value = false
      reviewQuestionIds.value = []
      gameStore.startGame(operation, level, questions)
      currentScreen.value = 'playing'
      pendingGameStart.value = null
    }
  }

  function onGameComplete() {
    currentScreen.value = 'result'
  }

  function onGameQuit() {
    currentScreen.value = 'levelSelect'
  }

  function retryLevel() {
    startGame()
  }

  function nextLevel() {
    selectedLevel.value++
    startGame()
  }

  return {
    // State
    currentScreen,
    selectedOperation,
    selectedLevel,
    showCountdown,
    isReviewMode,
    reviewQuestionIds,
    // Navigation
    goHome,
    goToShop,
    goToDailyChallenge,
    goToWrongQuestions,
    goToOperationSelect,
    // Game flow
    startDailyChallenge,
    startWrongQuestionsPractice,
    onOperationSelect,
    onLevelSelect,
    onCountdownComplete,
    onGameComplete,
    onGameQuit,
    retryLevel,
    nextLevel
  }
}
