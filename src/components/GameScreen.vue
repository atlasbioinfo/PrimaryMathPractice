<template>
  <div class="game-screen">
    <div class="game-header">
      <!-- Quit Button -->
      <button class="quit-btn" @click="showQuitConfirm = true" :title="t.game.quit">
        ✕
      </button>
      <div class="level-badge">
        {{ operationInfo.icon }} {{ levelName }}
      </div>
      <div class="timer-container">
        <CuteClock :timeLeft="gameStore.timeLeft" />
        <div class="timer" :class="{ warning: gameStore.timeLeft <= 30 }">
          {{ formatTime(gameStore.timeLeft) }}
        </div>
      </div>
      <div class="progress-info">
        📝 {{ gameStore.currentQuestionIndex + 1 }} / {{ totalQuestions }}
      </div>
    </div>

    <!-- Quit Confirmation Modal -->
    <Teleport to="body">
      <transition name="modal">
        <div v-if="showQuitConfirm" class="modal-overlay" @click.self="showQuitConfirm = false">
          <div class="modal-content quit-modal">
            <div class="quit-icon">😢</div>
            <h3 class="modal-title">{{ t.game.quitTitle }}</h3>
            <p class="quit-message">{{ t.game.quitMessage }}</p>
            <div class="modal-buttons">
              <button class="continue-btn" @click="showQuitConfirm = false">
                💪 {{ t.game.continueGame }}
              </button>
              <button class="quit-confirm-btn" @click="handleQuit">
                🏠 {{ t.game.quitConfirm }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <n-progress
      type="line"
      :percentage="progressPercent"
      :show-indicator="false"
      :height="12"
      :border-radius="6"
      :color="progressColor"
      class="game-progress"
    />

    <div class="question-container">
      <div class="question-card">
        <div class="question-number">{{ localeStore.translate('game.question', { n: gameStore.currentQuestionIndex + 1 }) }}</div>

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
          <div class="fraction-display">
            <div class="fraction">
              <span class="numerator">{{ currentQuestion.fraction1.numerator }}</span>
              <span class="fraction-line"></span>
              <span class="denominator">{{ currentQuestion.fraction1.denominator }}</span>
            </div>
          </div>
          <span class="operator">{{ currentQuestion.operation }}</span>
          <div v-if="currentQuestion.fraction2" class="fraction-display">
            <div class="fraction">
              <span class="numerator">{{ currentQuestion.fraction2.numerator }}</span>
              <span class="fraction-line"></span>
              <span class="denominator">{{ currentQuestion.fraction2.denominator }}</span>
            </div>
          </div>
          <span v-if="currentQuestion.integer" class="number">{{ currentQuestion.integer }}</span>
          <span class="equals">=</span>
          <span class="answer-box">?</span>
        </div>
      </div>

      <div class="answer-section">
        <!-- Regular answer input -->
        <template v-if="!isFraction">
          <n-input-number
            v-model:value="userAnswer"
            :show-button="false"
            :placeholder="t.game.yourAnswer"
            size="large"
            class="answer-input"
            @keyup.enter="submitAnswer"
            ref="answerInput"
          />
        </template>

        <!-- Fraction answer input -->
        <template v-else>
          <div class="fraction-input">
            <n-input-number
              v-model:value="fractionAnswer.numerator"
              :show-button="false"
              placeholder="↑"
              size="large"
              class="fraction-input-field"
              @keyup.enter="submitAnswer"
              ref="answerInput"
            />
            <div class="fraction-input-line"></div>
            <n-input-number
              v-model:value="fractionAnswer.denominator"
              :show-button="false"
              placeholder="↓"
              size="large"
              class="fraction-input-field"
              @keyup.enter="submitAnswer"
            />
          </div>
        </template>

        <n-button
          type="primary"
          size="large"
          class="submit-btn"
          @click="submitAnswer"
          :disabled="!canSubmit"
        >
          {{ t.game.submit }} ✓
        </n-button>
      </div>

      <!-- Retry button (shown after wrong answer) -->
      <div v-if="showRetry" class="retry-section">
        <p class="retry-hint">{{ t.game.correctAnswer }}: <strong>{{ formatCorrectAnswer() }}</strong></p>
        <n-button type="warning" @click="retryQuestion">
          {{ t.game.retry }} 🔄
        </n-button>
        <n-button @click="skipToNext" style="margin-left: 10px">
          {{ t.game.next }}
        </n-button>
      </div>
    </div>

    <div class="score-display">
      {{ t.game.correct }}: <span class="correct-count">{{ gameStore.correctCount }}</span> |
      {{ t.game.wrong }}: <span class="wrong-count">{{ gameStore.wrongCount }}</span>
    </div>

    <!-- Feedback Animation -->
    <transition name="feedback">
      <div v-if="showFeedback" class="feedback-overlay" :class="feedbackType">
        <div class="feedback-content">
          {{ feedbackType === 'correct' ? t.game.correctFeedback : t.game.wrongFeedback }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { NInputNumber, NButton, NProgress } from 'naive-ui'
import { useGameStore } from '../stores/game'
import { useUserStore } from '../stores/user'
import { useLocaleStore } from '../stores/locale'
import { operationConfig } from '../config/levels'
import { useSound } from '../composables/useSound'
import CuteClock from './CuteClock.vue'

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
const answerInput = ref(null)
const userAnswer = ref(null)
const fractionAnswer = ref({ numerator: null, denominator: null })
const showFeedback = ref(false)
const feedbackType = ref('correct')
const showRetry = ref(false)
const hasRetried = ref(false)
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

function formatCorrectAnswer() {
  const answer = currentQuestion.value.answer
  if (isFraction.value) {
    return `${answer.numerator}/${answer.denominator}`
  }
  return answer
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
  nextTick(() => {
    const input = answerInput.value?.$el?.querySelector('input')
    if (input) {
      input.focus()
      input.select()
    }
  })
}

function submitAnswer() {
  if (!canSubmit.value || showRetry.value) return

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
    gameStore.submitAnswer(answer, correctAnswer, hasRetried.value)
    moveToNext()
  } else {
    playWrongSound()
    showRetry.value = true
  }
}

function retryQuestion() {
  showRetry.value = false
  hasRetried.value = true
  userAnswer.value = null
  fractionAnswer.value = { numerator: null, denominator: null }
  focusInput()
}

function skipToNext() {
  showRetry.value = false
  const answer = isFraction.value
    ? { ...fractionAnswer.value }
    : userAnswer.value
  gameStore.submitAnswer(answer, currentQuestion.value.answer, false)
  moveToNext()
}

function moveToNext() {
  hasRetried.value = false
  showRetry.value = false

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

/* Quit Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: linear-gradient(135deg, #fff 0%, #FFF5F8 100%);
  border-radius: 24px;
  padding: 30px;
  max-width: 340px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(255, 182, 193, 0.3);
}

.quit-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--primary-color, #FF69B4);
  margin: 0 0 12px;
}

.quit-message {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
}

.modal-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.continue-btn, .quit-confirm-btn {
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.continue-btn {
  background: linear-gradient(135deg, var(--primary-color, #FF69B4), var(--accent-color, #FF1493));
  color: white;
}

.continue-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
}

.quit-confirm-btn {
  background: #f5f5f5;
  color: #666;
}

.quit-confirm-btn:hover {
  background: #eee;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
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

.fraction-display {
  display: inline-block;
}

.fraction {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f5f5;
  padding: 10px 20px;
  border-radius: 12px;
}

.numerator, .denominator {
  font-size: 28px;
  color: #333;
}

.fraction-line {
  width: 100%;
  height: 3px;
  background: #333;
  margin: 5px 0;
}

.answer-section {
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.answer-input {
  width: 150px;
}

.answer-input :deep(.n-input) {
  font-size: 24px !important;
  text-align: center;
  border-radius: 12px !important;
}

.answer-input :deep(.n-input__input-el) {
  text-align: center !important;
}

.fraction-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.fraction-input-field {
  width: 100px;
}

.fraction-input-field :deep(.n-input) {
  font-size: 20px !important;
  text-align: center;
}

.fraction-input-field :deep(.n-input__input-el) {
  text-align: center !important;
}

.fraction-input-line {
  width: 80px;
  height: 3px;
  background: var(--primary-color, #FF69B4);
}

.submit-btn {
  padding: 0 30px !important;
}

.retry-section {
  margin-top: 20px;
  padding: 20px;
  background: #FFF5F5;
  border-radius: 12px;
}

.retry-hint {
  margin-bottom: 15px;
  color: #666;
}

.retry-hint strong {
  color: var(--primary-color, #FF69B4);
  font-size: 20px;
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

  .answer-input {
    width: 120px;
  }

  .answer-input :deep(.n-input) {
    font-size: 20px !important;
    border-radius: 10px !important;
  }

  .submit-btn {
    padding: 0 20px !important;
    font-size: 14px !important;
  }

  .retry-section {
    padding: 16px;
    margin-top: 16px;
  }

  .retry-hint {
    font-size: 14px;
    margin-bottom: 12px;
  }

  .retry-hint strong {
    font-size: 18px;
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

  /* Fraction styles */
  .fraction-question {
    font-size: 18px;
  }

  .fraction {
    padding: 8px 14px;
  }

  .numerator, .denominator {
    font-size: 20px;
  }

  .fraction-input-field {
    width: 80px;
  }

  .fraction-input-field :deep(.n-input) {
    font-size: 18px !important;
  }

  .fraction-input-line {
    width: 60px;
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

  .answer-input {
    width: 100px;
  }

  .answer-input :deep(.n-input) {
    font-size: 18px !important;
  }

  .feedback-content {
    font-size: 28px;
    padding: 12px 24px;
  }
}
</style>
