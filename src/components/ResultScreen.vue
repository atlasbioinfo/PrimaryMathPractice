<template>
  <div class="result-screen">
    <div class="result-container" :class="resultClass">
      <EncouragementAnimation :type="animationType" :emoji="animationEmoji" />

      <div class="result-icon">{{ encouragementEmoji }}</div>
      <h2 class="result-title">{{ encouragementMessage }}</h2>

      <ResultStats
        :correct-count="gameStore.correctCount"
        :wrong-count="gameStore.wrongCount"
        :accuracy="gameStore.accuracy"
        :time-used="gameStore.timeUsed"
        :labels="{
          correct: t.result.correct,
          wrong: t.result.wrong,
          accuracy: t.result.accuracy,
          time: t.result.time
        }"
      />

      <div v-if="gameStore.retriedCount > 0" class="retried-info">
        {{ localeStore.translate('result.retriedInfo', { count: gameStore.retriedCount }) }}
      </div>

      <CoinRewards
        :rewards="coinRewards"
        :earned-text="t.coins.earned"
        :correct-answers-text="t.coins.correctAnswers"
        :level-bonus-text="t.coins.levelBonus"
        :perfect-bonus-text="t.coins.perfectBonus"
        :no-retry-bonus-text="t.coins.noRetryBonus"
        :total-text="t.coins.total"
      />

      <div v-if="isLevelPassed && hasNextLevel" class="unlock-message">
        {{ t.result.unlockMessage }}
      </div>

      <NewStickersSection
        :stickers="newStickers"
        :title="t.result.newStickers"
      />

      <NewAchievementsSection
        :achievements="formattedAchievements"
        :title="t.achievements.title"
      />

      <NextLevelPreview
        :show="isLevelPassed && hasNextLevel"
        :next-level-is-text="t.result.nextLevelIs"
        :level-name="nextLevelName"
        :icon="nextLevelIcon"
        :hint="nextLevelHint"
      />

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

      <n-button text @click="showReview = !showReview" style="margin-top: 20px">
        {{ showReview ? t.result.hideDetails : t.result.showDetails }}
      </n-button>

      <div v-if="showReview" class="question-review">
        <QuestionReview :answers="gameStore.answers" :operation="operation" />
      </div>
    </div>

    <CoinAnimation ref="coinAnimationRef" />

    <StickerUnlockEffect
      :show="showStickerUnlock"
      :stickers="unlockStickers"
      :title="t.result?.newStickers || 'New Sticker!'"
      :close-text="t.common?.close || 'Awesome!'"
      @close="closeStickerUnlock"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { NButton } from 'naive-ui'
import { useResultScreen } from '../composables/useResultScreen.js'
import QuestionReview from './QuestionReview.vue'
import CoinAnimation from './CoinAnimation.vue'
import CoinRewards from './CoinRewards.vue'
import StickerUnlockEffect from './StickerUnlockEffect.vue'
import ResultStats from './result/ResultStats.vue'
import NewStickersSection from './result/NewStickersSection.vue'
import NewAchievementsSection from './result/NewAchievementsSection.vue'
import NextLevelPreview from './result/NextLevelPreview.vue'
import EncouragementAnimation from './result/EncouragementAnimation.vue'

const props = defineProps({
  operation: { type: String, required: true },
  level: { type: Number, required: true }
})

defineEmits(['home', 'retry', 'next'])

const {
  gameStore,
  localeStore,
  t,
  showReview,
  newStickers,
  newAchievements,
  coinAnimationRef,
  coinRewards,
  showStickerUnlock,
  unlockStickers,
  encouragementMessage,
  encouragementEmoji,
  animationType,
  animationEmoji,
  isLevelPassed,
  hasNextLevel,
  nextLevelName,
  nextLevelIcon,
  nextLevelHint,
  resultClass,
  closeStickerUnlock,
  initializeResult
} = useResultScreen(props)

const formattedAchievements = computed(() =>
  newAchievements.value.map(a => ({
    id: a.id,
    icon: a.icon,
    name: t.value.achievements[a.nameKey]
  }))
)

onMounted(() => {
  initializeResult()
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
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
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

  .result-icon {
    font-size: 56px;
    margin-bottom: 16px;
  }

  .result-title {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .retried-info {
    font-size: 12px;
    margin-bottom: 12px;
  }

  .unlock-message {
    font-size: 16px;
    margin-bottom: 16px;
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
}
</style>
