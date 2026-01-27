<template>
  <div class="result-screen">
    <div class="result-container" :class="resultClass">
      <!-- Encouragement Animation -->
      <div class="encouragement-animation" :class="animationType">
        <span v-for="i in 10" :key="i" class="particle" :style="particleStyle(i)">
          {{ animationEmoji }}
        </span>
      </div>

      <div class="result-icon">{{ encouragementEmoji }}</div>
      <h2 class="result-title">{{ encouragementMessage }}</h2>

      <div class="result-stats">
        <div class="stat-item">
          <div class="stat-value correct">{{ gameStore.correctCount }}</div>
          <div class="stat-label">{{ t.result.correct }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value wrong">{{ gameStore.wrongCount }}</div>
          <div class="stat-label">{{ t.result.wrong }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ gameStore.accuracy }}%</div>
          <div class="stat-label">{{ t.result.accuracy }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ formatTime(gameStore.timeUsed) }}</div>
          <div class="stat-label">{{ t.result.time }}</div>
        </div>
      </div>

      <!-- Retried info -->
      <div v-if="gameStore.retriedCount > 0" class="retried-info">
        {{ localeStore.translate('result.retriedInfo', { count: gameStore.retriedCount }) }}
      </div>

      <!-- Coin Rewards -->
      <div v-if="coinRewards && coinRewards.total > 0" class="coin-rewards">
        <h3 class="coin-title">
          <span class="coin-icon">🪙</span>
          {{ t.coins.earned }}
        </h3>
        <div class="coin-breakdown">
          <div class="coin-row" v-if="coinRewards.correctAnswers > 0">
            <span>{{ t.coins.correctAnswers }}</span>
            <span class="coin-value">+{{ coinRewards.correctAnswers }}</span>
          </div>
          <div class="coin-row" v-if="coinRewards.levelCompletion > 0">
            <span>{{ t.coins.levelBonus }}</span>
            <span class="coin-value">+{{ coinRewards.levelCompletion }}</span>
          </div>
          <div class="coin-row highlight" v-if="coinRewards.perfectScore > 0">
            <span>{{ t.coins.perfectBonus }}</span>
            <span class="coin-value">+{{ coinRewards.perfectScore }}</span>
          </div>
          <div class="coin-row highlight" v-if="coinRewards.noRetryBonus > 0">
            <span>{{ t.coins.noRetryBonus }}</span>
            <span class="coin-value">+{{ coinRewards.noRetryBonus }}</span>
          </div>
          <div class="coin-total">
            <span>{{ t.coins.total }}</span>
            <span class="total-value">🪙 {{ coinRewards.total }}</span>
          </div>
        </div>
      </div>

      <!-- Level passed message -->
      <div v-if="isLevelPassed && hasNextLevel" class="unlock-message">
        {{ t.result.unlockMessage }}
      </div>

      <!-- New stickers earned -->
      <div v-if="newStickers.length > 0" class="new-stickers">
        <h3>{{ t.result.newStickers }}</h3>
        <div class="sticker-list">
          <div v-for="sticker in newStickers" :key="sticker.id" class="new-sticker-item">
            <span class="sticker-icon">{{ sticker.icon }}</span>
            <span class="sticker-name">{{ sticker.name }}</span>
          </div>
        </div>
      </div>

      <!-- New hidden achievements earned -->
      <div v-if="newAchievements.length > 0" class="new-achievements">
        <h3>{{ t.achievements.title }}</h3>
        <div class="achievement-list">
          <div v-for="achievement in newAchievements" :key="achievement.id" class="achievement-item">
            <span class="achievement-icon">{{ achievement.icon }}</span>
            <span class="achievement-name">{{ t.achievements[achievement.nameKey] }}</span>
          </div>
        </div>
      </div>

      <!-- Next level preview -->
      <div v-if="isLevelPassed && hasNextLevel" class="next-level-preview">
        <p>{{ t.result.nextLevelIs }} <strong>{{ nextLevelName }}</strong></p>
        <span class="next-level-icon">{{ nextLevelIcon }}</span>
        <p class="next-level-hint">{{ nextLevelHint }}</p>
      </div>

      <div class="result-actions">
        <n-button size="large" @click="$emit('home')" class="action-btn">
          {{ t.result.home }}
        </n-button>
        <n-button size="large" type="primary" @click="$emit('retry')" class="action-btn">
          {{ t.result.tryAgain }}
        </n-button>
        <n-button
          v-if="isLevelPassed && hasNextLevel"
          size="large"
          type="success"
          @click="$emit('next')"
          class="action-btn"
        >
          {{ t.result.nextLevel }}
        </n-button>
      </div>

      <!-- Question review toggle -->
      <n-button text @click="showReview = !showReview" style="margin-top: 20px">
        {{ showReview ? t.result.hideDetails : t.result.showDetails }}
      </n-button>

      <!-- Question Review -->
      <div v-if="showReview" class="question-review">
        <QuestionReview :answers="gameStore.answers" :operation="operation" />
      </div>
    </div>

    <!-- Coin Animation -->
    <CoinAnimation ref="coinAnimationRef" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { NButton } from 'naive-ui'
import { useGameStore } from '../stores/game'
import { useProgressStore } from '../stores/progress'
import { useStickersStore } from '../stores/stickers'
import { useStatsStore } from '../stores/stats'
import { useUserStore } from '../stores/user'
import { useLocaleStore } from '../stores/locale'
import { useCoinsStore } from '../stores/coins'
import { levelIcons } from '../config/levels'
import { calculateCoins } from '../config/coinRewards'
import { useSound } from '../composables/useSound'
import { useConfetti } from '../composables/useConfetti'
import QuestionReview from './QuestionReview.vue'
import CoinDisplay from './CoinDisplay.vue'
import CoinAnimation from './CoinAnimation.vue'

const props = defineProps({
  operation: { type: String, required: true },
  level: { type: Number, required: true }
})

const emit = defineEmits(['home', 'retry', 'next'])

const gameStore = useGameStore()
const progressStore = useProgressStore()
const stickersStore = useStickersStore()
const statsStore = useStatsStore()
const userStore = useUserStore()
const localeStore = useLocaleStore()
const coinsStore = useCoinsStore()
const { playVictorySound, playApplauseSound, playStickerSound, playCoinSound } = useSound()
const { celebratePerfect, starBurst, rainbowCelebration, coinRain } = useConfetti()

const t = computed(() => localeStore.t)
const showReview = ref(false)
const newStickers = ref([])
const newAchievements = ref([])
const coinAnimationRef = ref(null)
const coinRewards = ref(null)

const encouragementType = computed(() => {
  if (gameStore.correctCount === 10) return 'perfect'
  if (gameStore.correctCount >= 8) return 'excellent'
  if (gameStore.correctCount >= 7) return 'good'
  return 'tryAgain'
})

const encouragementMessage = computed(() => {
  return localeStore.getRandomMessage(`result.encouragement.${encouragementType.value}`)
})

const encouragementEmoji = computed(() => {
  switch (encouragementType.value) {
    case 'perfect': return '🎆'
    case 'excellent': return '⭐'
    case 'good': return '🌈'
    default: return '🤗'
  }
})

const animationType = computed(() => {
  switch (encouragementType.value) {
    case 'perfect': return 'fireworks'
    case 'excellent': return 'stars'
    case 'good': return 'rainbow'
    default: return 'hug'
  }
})

const animationEmoji = computed(() => {
  switch (animationType.value) {
    case 'fireworks': return '🎆'
    case 'stars': return '⭐'
    case 'rainbow': return '🌈'
    case 'hug': return '🤗'
    default: return '✨'
  }
})

const isLevelPassed = computed(() => gameStore.correctCount >= 7)
const hasNextLevel = computed(() => props.level < 6)

const nextLevelName = computed(() => {
  if (!hasNextLevel.value) return ''
  const nextLevel = props.level + 1
  if (nextLevel === 6) {
    const titles = userStore.gender === 'prince'
      ? t.value.levels.princeTitle
      : t.value.levels.princessTitle
    return titles[props.operation]
  }
  return t.value.levels.levelNames[nextLevel]
})

const nextLevelIcon = computed(() => {
  if (!hasNextLevel.value) return ''
  return levelIcons[props.level + 1]
})

const nextLevelHint = computed(() => {
  if (!hasNextLevel.value) return ''
  return t.value.result.nextLevelHint[props.level]
})

const resultClass = computed(() => {
  if (gameStore.correctCount >= 9) return 'excellent'
  if (gameStore.correctCount >= 7) return 'good'
  return 'try-again'
})

function particleStyle(i) {
  const angle = (i / 10) * 360
  const delay = (i / 10) * 0.5
  return {
    '--angle': `${angle}deg`,
    '--delay': `${delay}s`
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

onMounted(async () => {
  // Calculate coin rewards
  coinRewards.value = calculateCoins(
    props.level,
    gameStore.correctCount,
    gameStore.retriedCount
  )

  // Record stats
  statsStore.recordSession(
    props.operation,
    gameStore.correctCount,
    10,
    gameStore.timeUsed
  )

  // Add coins earned
  if (coinRewards.value.total > 0) {
    coinsStore.addCoins(coinRewards.value.total, 'level_complete', {
      operation: props.operation,
      level: props.level,
      correctCount: gameStore.correctCount
    })

    // Trigger coin animation and sound
    await nextTick()
    setTimeout(() => {
      playCoinSound()
      if (coinAnimationRef.value) {
        coinAnimationRef.value.triggerFromCenter(
          Math.min(coinRewards.value.total / 10, 8)
        )
      }
    }, 500)
  }

  // Update progress if passed
  if (isLevelPassed.value) {
    progressStore.completeLevel(
      props.operation,
      props.level,
      gameStore.correctCount,
      gameStore.accuracy
    )

    // Check for new stickers
    const progress = progressStore.getOperationProgress(props.operation)
    newStickers.value = stickersStore.checkAndAwardStickers(
      props.operation,
      progress.completedLevels,
      gameStore.accuracy
    )

    // Check for hidden achievements
    const achievementContext = {
      isPerfect: gameStore.correctCount === 10,
      retriedCount: gameStore.retriedCount,
      timeUsed: gameStore.timeUsed,
      streakDays: statsStore.streakDays,
      totalEarned: coinsStore.totalEarned,
      totalQuestions: statsStore.totalQuestions,
      allOperationsMastered: progressStore.areAllOperationsMastered(),
      allLevelsPerfect: false // TODO: implement full check
    }
    newAchievements.value = stickersStore.checkHiddenAchievements(achievementContext)

    // Play sounds and confetti based on performance
    if (gameStore.correctCount === 10) {
      // Perfect score
      playVictorySound()
      setTimeout(() => {
        playApplauseSound()
        celebratePerfect()
      }, 300)
      setTimeout(() => coinRain(), 800)
    } else if (gameStore.correctCount >= 9) {
      playVictorySound()
      setTimeout(() => {
        playApplauseSound()
        starBurst()
      }, 500)
    } else if (gameStore.correctCount >= 7) {
      playVictorySound()
      setTimeout(() => rainbowCelebration(), 300)
    }

    // Play sticker sound if earned new stickers or achievements
    if (newStickers.value.length > 0 || newAchievements.value.length > 0) {
      setTimeout(() => playStickerSound(), 1000)
    }
  }
})
</script>

<style scoped>
.result-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: 20px;
}

.result-container {
  background: white;
  border-radius: 24px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  border: 3px solid var(--secondary-color, #FFB6C1);
  position: relative;
  overflow: hidden;
}

.result-container.excellent {
  background: linear-gradient(135deg, var(--light-color, #FFF0F5) 0%, #FFE4EC 100%);
  border-color: var(--primary-color, #FF69B4);
}

.result-container.good {
  background: linear-gradient(135deg, #FFF5F8 0%, #FFE8F0 100%);
  border-color: var(--secondary-color, #FFB6C1);
}

.result-container.try-again {
  background: linear-gradient(135deg, #FFF 0%, #FFF5F5 100%);
  border-color: #FFC0CB;
}

.encouragement-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  pointer-events: none;
}

.particle {
  position: absolute;
  font-size: 24px;
  animation: explode 2s ease-out infinite;
  animation-delay: var(--delay);
}

@keyframes explode {
  0% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(0);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-150px) scale(1);
    opacity: 0;
  }
}

.result-icon {
  font-size: 80px;
  margin-bottom: 20px;
  animation: bounce 1s ease infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.result-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  line-height: 1.4;
}

.result-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.stat-item {
  text-align: center;
  min-width: 70px;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: var(--primary-color, #FF69B4);
}

.stat-value.correct {
  color: #52C41A;
}

.stat-value.wrong {
  color: #FF6B6B;
}

.stat-label {
  font-size: 14px;
  color: #999;
}

.retried-info {
  font-size: 14px;
  color: #999;
  margin-bottom: 15px;
}

.unlock-message {
  font-size: 20px;
  color: var(--primary-color, #FF69B4);
  margin-bottom: 20px;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Coin Rewards */
.coin-rewards {
  background: linear-gradient(135deg, #FFF9E6, #FFE4B5);
  border: 2px solid #FFD700;
  border-radius: 16px;
  padding: 15px;
  margin-bottom: 20px;
}

.coin-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
  color: #B8860B;
  margin-bottom: 12px;
}

.coin-icon {
  font-size: 20px;
}

.coin-breakdown {
  font-size: 14px;
}

.coin-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  color: #666;
}

.coin-row.highlight {
  color: #B8860B;
  font-weight: 600;
}

.coin-value {
  color: #52C41A;
  font-weight: 600;
}

.coin-total {
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
  margin-top: 8px;
  border-top: 1px dashed #FFD700;
  font-weight: 700;
  color: #B8860B;
}

.total-value {
  font-size: 18px;
}

/* New Achievements */
.new-achievements {
  background: linear-gradient(135deg, #E8F5E9, #C8E6C9);
  border: 2px solid #81C784;
  border-radius: 16px;
  padding: 15px;
  margin-bottom: 20px;
}

.new-achievements h3 {
  font-size: 16px;
  color: #2E7D32;
  margin-bottom: 10px;
  text-align: center;
}

.achievement-list {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.achievement-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  animation: achievementPop 0.5s ease;
}

@keyframes achievementPop {
  0% { transform: scale(0) rotate(-10deg); }
  50% { transform: scale(1.2) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.achievement-icon {
  font-size: 40px;
}

.achievement-name {
  font-size: 12px;
  color: #2E7D32;
  font-weight: 600;
}

.new-stickers {
  background: var(--light-color, #FFF0F5);
  border-radius: 16px;
  padding: 15px;
  margin-bottom: 20px;
}

.new-stickers h3 {
  font-size: 16px;
  color: var(--primary-color, #FF69B4);
  margin-bottom: 10px;
}

.sticker-list {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.new-sticker-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  animation: stickerPop 0.5s ease;
}

@keyframes stickerPop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.new-sticker-item .sticker-icon {
  font-size: 40px;
}

.new-sticker-item .sticker-name {
  font-size: 12px;
  color: #666;
}

.next-level-preview {
  background: var(--light-color, #FFF0F5);
  border-radius: 16px;
  padding: 15px;
  margin-bottom: 20px;
}

.next-level-preview p {
  margin: 5px 0;
  color: #666;
}

.next-level-preview strong {
  color: var(--primary-color, #FF69B4);
}

.next-level-icon {
  font-size: 48px;
  display: block;
  margin: 10px 0;
}

.next-level-hint {
  font-size: 14px;
  color: #999;
}

.result-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  min-width: 120px;
}

.question-review {
  margin-top: 20px;
  text-align: left;
}

/* Tablet */
@media (max-width: 768px) {
  .result-screen {
    padding: 16px;
    padding-top: 60px;
    min-height: auto;
  }

  .result-container {
    padding: 30px;
  }
}

/* Mobile */
@media (max-width: 500px) {
  .result-screen {
    padding: 12px;
    padding-top: 55px;
    align-items: flex-start;
  }

  .result-container {
    padding: 24px 18px;
    border-radius: 20px;
  }

  .encouragement-animation {
    width: 150px;
    height: 150px;
  }

  .particle {
    font-size: 18px;
  }

  .result-icon {
    font-size: 56px;
    margin-bottom: 16px;
  }

  .result-title {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .result-stats {
    margin-bottom: 16px;
    gap: 8px;
  }

  .stat-item {
    min-width: 60px;
  }

  .stat-value {
    font-size: 22px;
  }

  .stat-label {
    font-size: 12px;
  }

  .retried-info {
    font-size: 12px;
    margin-bottom: 12px;
  }

  .unlock-message {
    font-size: 16px;
    margin-bottom: 16px;
  }

  .new-stickers {
    padding: 12px;
    margin-bottom: 16px;
    border-radius: 14px;
  }

  .new-stickers h3 {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .sticker-list {
    gap: 12px;
  }

  .new-sticker-item .sticker-icon {
    font-size: 32px;
  }

  .new-sticker-item .sticker-name {
    font-size: 11px;
  }

  .next-level-preview {
    padding: 12px;
    margin-bottom: 16px;
    border-radius: 14px;
  }

  .next-level-preview p {
    font-size: 13px;
  }

  .next-level-icon {
    font-size: 40px;
    margin: 8px 0;
  }

  .next-level-hint {
    font-size: 12px;
  }

  .result-actions {
    flex-direction: column;
    gap: 10px;
  }

  .action-btn {
    width: 100%;
    min-width: auto;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .result-screen {
    padding: 10px;
    padding-top: 50px;
  }

  .result-container {
    padding: 20px 14px;
  }

  .result-icon {
    font-size: 48px;
  }

  .result-title {
    font-size: 16px;
  }

  .stat-value {
    font-size: 20px;
  }

  .stat-label {
    font-size: 11px;
  }
}
</style>
