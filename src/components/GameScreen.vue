<template>
  <div class="game-screen" role="main" aria-label="Math practice game">
    <div class="game-header" role="banner">
      <button class="quit-btn" @click="showQuitConfirm = true" :title="t.game.quit">&#x2715;</button>
      <div class="level-badge">{{ operationInfo.icon }} {{ levelName }}</div>
      <div class="timer-container">
        <CuteClock :timeLeft="gameStore.timeLeft" />
        <div class="timer" :class="{ warning: gameStore.timeLeft <= 30 }">{{ formatTime(gameStore.timeLeft) }}</div>
      </div>
      <div class="progress-info">&#x1F4DD; {{ gameStore.currentQuestionIndex + 1 }} / {{ totalQuestions }}</div>
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
            @confirm="handleSubmit"
          />
        </template>

        <!-- Fraction answer input with cute keyboard -->
        <template v-else>
          <FractionKeyboard
            v-model="fractionAnswer"
            @confirm="handleSubmit"
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
import { ref, computed } from 'vue'
import { NProgress } from 'naive-ui'
import { useGameStore } from '../stores/game.js'
import { useUserStore } from '../stores/user.js'
import { useLocaleStore } from '../stores/locale.js'
import { operationConfig } from '../config/levels.js'
import { useGameTimer } from '../composables/useGameTimer.js'
import { useGameAnswer } from '../composables/useGameAnswer.js'
import CuteClock from './CuteClock.vue'
import QuitModal from './QuitModal.vue'
import FractionDisplay from './FractionDisplay.vue'
import FractionKeyboard from './FractionKeyboard.vue'
import CuteKeyboard from './CuteKeyboard.vue'

const props = defineProps({
  operation: { type: String, required: true },
  level: { type: Number, required: true },
  isReviewMode: { type: Boolean, default: false },
  reviewQuestions: { type: Array, default: () => [] }
})

const emit = defineEmits(['complete', 'quit'])

const gameStore = useGameStore()
const userStore = useUserStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)
const totalQuestions = 10
const showQuitConfirm = ref(false)

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

const progressPercent = computed(() => {
  return (gameStore.currentQuestionIndex / totalQuestions) * 100
})

const progressColor = computed(() => {
  if (progressPercent.value < 30) return '#52C41A'
  if (progressPercent.value < 70) return '#FAAD14'
  return '#FF6B6B'
})

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
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

function moveToNext() {
  if (!gameStore.nextQuestion()) {
    endGame()
  } else {
    resetAnswers()
  }
}

// Use the game timer composable
const { stopTimer } = useGameTimer(gameStore, endGame)

// Use the game answer composable
const {
  userAnswer,
  fractionAnswer,
  showFeedback,
  feedbackType,
  currentQuestion,
  submitAnswer,
  resetAnswers
} = useGameAnswer({
  props,
  onMoveNext: moveToNext
})

function handleSubmit() {
  submitAnswer(isFraction.value)
}
</script>

<style scoped src="./GameScreen.css"></style>
