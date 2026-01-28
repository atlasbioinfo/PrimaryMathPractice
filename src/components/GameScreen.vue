<template>
  <div class="game-screen" role="main" aria-label="Math practice game">
    <div class="game-header" role="banner">
      <button class="quit-btn" @click="showQuitConfirm = true" :title="t.game.quit">✕</button>
      <div class="level-badge">{{ operationInfo.icon }} {{ levelName }}</div>
      <div class="timer-container">
        <CuteClock :timeLeft="gameStore.timeLeft" />
        <div class="timer" :class="{ warning: gameStore.timeLeft <= 30 }">{{ formatTime(gameStore.timeLeft) }}</div>
      </div>
      <div class="progress-info">📝 {{ gameStore.currentQuestionIndex + 1 }} / {{ totalQuestions }}</div>
    </div>

    <QuitModal
      :show="showQuitConfirm"
      :title="t.game.quitTitle"
      :message="t.game.quitMessage"
      :continue-text="t.game.continueGame"
      :confirm-text="t.game.quitConfirm"
      @close="showQuitConfirm = false"
      @confirm="handleQuit"
    />

    <n-progress
      type="line"
      :percentage="progressPercent"
      :show-indicator="false"
      :height="12"
      :border-radius="6"
      :color="progressColor"
      class="game-progress"
    />

    <div class="question-container" role="region" aria-label="Question area">
      <div class="question-card" role="article">
        <div class="question-number" aria-live="polite">{{ localeStore.translate('game.question', { n: gameStore.currentQuestionIndex + 1 }) }}</div>

        <!-- Regular number question -->
        <div v-if="!isFraction" class="question-content">
          <span class="number">{{ currentQuestion.num1 }}</span>
          <span class="operator">{{ operationInfo.symbol }}</span>
          <span class="number">{{ currentQuestion.num2 }}</span>
          <span class="equals">=</span>
          <span class="answer-box">?</span>
        </div>

        <!-- Fraction question -->
        <div v-else class="question-content fraction-question">
          <FractionDisplay
            :numerator="currentQuestion.fraction1.numerator"
            :denominator="currentQuestion.fraction1.denominator"
          />
          <span class="operator">{{ currentQuestion.operation }}</span>
          <FractionDisplay
            v-if="currentQuestion.fraction2"
            :numerator="currentQuestion.fraction2.numerator"
            :denominator="currentQuestion.fraction2.denominator"
          />
          <span v-if="currentQuestion.integer" class="number">{{ currentQuestion.integer }}</span>
          <span class="equals">=</span>
          <span class="answer-box">?</span>
        </div>
      </div>

      <div class="answer-section">
        <!-- Regular answer input with cute keyboard -->
        <template v-if="!isFraction">
          <CuteKeyboard
            v-model="userAnswer"
            :placeholder="t.game.yourAnswer"
            @confirm="submitAnswer"
          />
        </template>

        <!-- Fraction answer input with cute keyboard -->
        <template v-else>
          <FractionKeyboard
            v-model="fractionAnswer"
            @confirm="submitAnswer"
          />
        </template>
      </div>

    </div>

    <div class="score-display" role="status" aria-live="polite">
      {{ t.game.correct }}: <span class="correct-count">{{ gameStore.correctCount }}</span> |
      {{ t.game.wrong }}: <span class="wrong-count">{{ gameStore.wrongCount }}</span>
    </div>

    <!-- Feedback Animation -->
    <transition name="feedback">
      <div
        v-if="showFeedback"
        class="feedback-overlay"
        :class="feedbackType"
        role="alert"
        aria-live="assertive"
      >
        <div class="feedback-content">
          {{ feedbackType === 'correct' ? t.game.correctFeedback : t.game.wrongFeedback }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NButton, NProgress } from 'naive-ui'
import { useGameStore } from '../stores/game'
import { useUserStore } from '../stores/user'
import { useLocaleStore } from '../stores/locale'
import { operationConfig } from '../config/levels'
import { useSound } from '../composables/useSound'
import CuteClock from './CuteClock.vue'
import QuitModal from './QuitModal.vue'
import FractionDisplay from './FractionDisplay.vue'
import FractionKeyboard from './FractionKeyboard.vue'
import CuteKeyboard from './CuteKeyboard.vue'

const props = defineProps({
  operation: { type: String, required: true },
  level: { type: Number, required: true }
})

const emit = defineEmits(['complete', 'quit'])

const gameStore = useGameStore()
const userStore = useUserStore()
const localeStore = useLocaleStore()
const { playCorrectSound, playWrongSound } = useSound()

const t = computed(() => localeStore.t)
const totalQuestions = 10
const userAnswer = ref(null)
const fractionAnswer = ref({ numerator: null, denominator: null })
const showFeedback = ref(false)
const feedbackType = ref('correct')
const showQuitConfirm = ref(false)

let timer = null

const operationInfo = computed(() => operationConfig[props.operation])
const isFraction = computed(() => operationInfo.value.isFraction)

const levelName = computed(() => {
  if (props.level === 6) {
    const titles = userStore.gender === 'prince'
      ? t.value.levels.princeTitle
      : t.value.levels.princessTitle
    return titles[props.operation]
  }
  return t.value.levels.levelNames[props.level]
})

const currentQuestion = computed(() => gameStore.currentQuestion)

const progressPercent = computed(() => {
  return (gameStore.currentQuestionIndex / totalQuestions) * 100
})

const progressColor = computed(() => {
  if (progressPercent.value < 30) return '#52C41A'
  if (progressPercent.value < 70) return '#FAAD14'
  return '#FF6B6B'
})

const canSubmit = computed(() => {
  if (isFraction.value) {
    return fractionAnswer.value.numerator !== null && fractionAnswer.value.denominator !== null
  }
  return userAnswer.value !== null
})

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function startTimer() {
  timer = setInterval(() => {
    gameStore.tick()
    if (gameStore.timeLeft <= 0) {
      endGame()
    }
  }, 1000)
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function focusInput() {
  // CuteKeyboard and FractionKeyboard don't need traditional focus
  // They use touch/click interactions
}

function submitAnswer() {
  if (!canSubmit.value) return

  let answer
  let correctAnswer

  if (isFraction.value) {
    answer = { ...fractionAnswer.value }
    correctAnswer = currentQuestion.value.answer
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
    const g1 = gcd(correctAnswer.numerator, correctAnswer.denominator)
    const g2 = gcd(answer.numerator, answer.denominator)
    const isCorrect =
      correctAnswer.numerator / g1 === answer.numerator / g2 &&
      correctAnswer.denominator / g1 === answer.denominator / g2
    handleAnswer(isCorrect, answer, correctAnswer)
  } else {
    answer = userAnswer.value
    correctAnswer = currentQuestion.value.answer
    const isCorrect = answer === correctAnswer
    handleAnswer(isCorrect, answer, correctAnswer)
  }
}

function handleAnswer(isCorrect, answer, correctAnswer) {
  feedbackType.value = isCorrect ? 'correct' : 'wrong'
  showFeedback.value = true

  setTimeout(() => {
    showFeedback.value = false
  }, 500)

  if (isCorrect) {
    playCorrectSound()
  } else {
    playWrongSound()
  }

  // Record answer and move to next question
  gameStore.submitAnswer(answer, correctAnswer, false)
  moveToNext()
}

function moveToNext() {

  if (!gameStore.nextQuestion()) {
    endGame()
  } else {
    userAnswer.value = null
    fractionAnswer.value = { numerator: null, denominator: null }
    focusInput()
  }
}

function endGame() {
  stopTimer()
  gameStore.endGame()
  emit('complete')
}

function handleQuit() {
  stopTimer()
  gameStore.reset()
  showQuitConfirm.value = false
  emit('quit')
}

onMounted(() => {
  startTimer()
  focusInput()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
.game-screen {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.9);
  padding: 12px 16px;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  position: relative;
}

/* Quit Button */
.quit-btn {
  position: relative;
  left: auto;
  top: auto;
  transform: none;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #FF6B6B;
  background: linear-gradient(135deg, #FFF5F5 0%, #FFE4E4 100%);
  color: #FF6B6B;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}

.quit-btn:hover {
  border-color: #FF4444;
  color: white;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF4444 100%);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

.level-badge, .progress-info {
  font-size: 16px;
  color: var(--primary-color, #FF69B4);
  font-weight: bold;
}

.timer-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.timer {
  font-size: 24px;
  color: var(--primary-color, #FF69B4);
  font-weight: bold;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.timer.warning {
  color: #FF6B6B;
  animation: blink 0.5s infinite;
  background: rgba(255, 107, 107, 0.1);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.game-progress {
  margin-bottom: 30px;
}

.question-container {
  background: white;
  border-radius: 24px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  border: 2px solid var(--secondary-color, #FFB6C1);
}

.question-card {
  margin-bottom: 30px;
}

.question-number {
  font-size: 16px;
  color: #999;
  margin-bottom: 20px;
}

.question-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-size: 42px;
  font-weight: bold;
}

.fraction-question {
  font-size: 24px;
}

.number {
  color: #333;
  background: #f5f5f5;
  padding: 10px 20px;
  border-radius: 12px;
}

.operator {
  color: var(--primary-color, #FF69B4);
  font-size: 36px;
}

.equals {
  color: #666;
}

.answer-box {
  color: var(--primary-color, #FF69B4);
}

.answer-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
}

.submit-btn {
  padding: 0 30px !important;
}

.score-display {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: var(--primary-color, #FF69B4);
  background: rgba(255, 255, 255, 0.8);
  padding: 10px 20px;
  border-radius: 20px;
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
}

.correct-count {
  color: #52C41A;
  font-weight: bold;
}

.wrong-count {
  color: #FF8080;
  font-weight: bold;
}

.feedback-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  pointer-events: none;
}

.feedback-content {
  font-size: 48px;
  font-weight: bold;
  padding: 20px 40px;
  border-radius: 20px;
}

.feedback-overlay.correct .feedback-content {
  background: #52C41A;
  color: white;
}

.feedback-overlay.wrong .feedback-content {
  background: #FF6B6B;
  color: white;
}

.feedback-enter-active {
  animation: feedbackIn 0.3s ease;
}

.feedback-leave-active {
  animation: feedbackOut 0.2s ease;
}

@keyframes feedbackIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes feedbackOut {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

/* Tablet */
@media (max-width: 768px) {
  .game-screen {
    padding: 16px;
    padding-top: 60px;
  }

  .game-header {
    padding: 12px 16px;
  }

  .question-container {
    padding: 30px 25px;
  }
}

/* Mobile */
@media (max-width: 500px) {
  .game-screen {
    padding: 12px;
    padding-top: 55px;
  }

  .game-header {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 12px;
    margin-bottom: 12px;
  }

  .quit-btn {
    width: 34px;
    height: 34px;
    font-size: 14px;
    order: 0;
  }

  .level-badge {
    font-size: 12px;
    order: 1;
  }

  .timer-container {
    order: 2;
    gap: 6px;
  }

  .timer {
    font-size: 18px;
    padding: 6px 12px;
  }

  .progress-info {
    font-size: 12px;
    order: 3;
  }

  .game-progress {
    margin-bottom: 16px;
  }

  .question-container {
    padding: 24px 16px;
    border-radius: 20px;
  }

  .question-card {
    margin-bottom: 20px;
  }

  .question-number {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .question-content {
    font-size: 28px;
    gap: 8px;
    flex-wrap: wrap;
  }

  .number {
    padding: 8px 14px;
    border-radius: 10px;
    font-size: 26px;
  }

  .operator {
    font-size: 28px;
  }

  .answer-section {
    gap: 10px;
  }

  .submit-btn {
    padding: 0 20px !important;
    font-size: 14px !important;
  }

  .score-display {
    font-size: 14px;
    padding: 8px 16px;
    margin-top: 16px;
  }

  .feedback-content {
    font-size: 32px;
    padding: 16px 28px;
    border-radius: 16px;
  }

  .fraction-question {
    font-size: 18px;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .game-screen {
    padding: 10px;
    padding-top: 50px;
  }

  .game-header {
    padding: 8px 10px;
  }

  .quit-btn {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }

  .level-badge, .progress-info {
    font-size: 11px;
  }

  .timer {
    font-size: 16px;
    padding: 5px 10px;
  }

  .question-container {
    padding: 20px 12px;
  }

  .question-content {
    font-size: 24px;
    gap: 6px;
  }

  .number {
    padding: 6px 10px;
    font-size: 22px;
  }

  .operator {
    font-size: 24px;
  }

  .feedback-content {
    font-size: 28px;
    padding: 12px 24px;
  }
}
</style>
