<template>
  <div class="home-screen">
    <!-- Coin Display Bar -->
    <div class="coin-bar">
      <CoinDisplay size="normal" />
      <button class="shop-btn" @click="emit('openShop')">
        <span class="shop-icon">🏪</span>
        <span class="shop-label">{{ t.shop?.title || 'Shop' }}</span>
      </button>
    </div>

    <!-- Hero Section with Avatar Card -->
    <div class="hero-section">
      <AvatarCard />
    </div>

    <!-- Stats Cards Row -->
    <div class="stats-row">
      <StatCard type="flame" icon="🔥" :value="statsStore.streakDays" :label="t.home.streakDays" />
      <StatCard type="questions" icon="📝" :value="statsStore.totalQuestions" :label="t.home.totalQuestions" />
      <StatCard type="accuracy" icon="🎯" :value="`${statsStore.overallAccuracy}%`" :label="t.home.accuracy" />
      <StatCard type="stickers" icon="🏅" :value="`${stickersStore.getEarnedCount()}/${stickersStore.getTotalCount()}`" :label="t.home.stickers" />
    </div>

    <!-- Daily Challenge & Wrong Questions Row -->
    <div class="challenge-row">
      <DailyChallengeCard @play="emit('openDailyChallenge')" />
      <WrongQuestionsCard @review="emit('openWrongQuestions')" />
    </div>

    <!-- Main Action Button -->
    <button class="main-action-btn" :class="userStore.gender" @click="emit('startGame')">
      <span class="btn-sparkle left">✨</span>
      <span class="btn-icon">🎮</span>
      <span class="btn-text">{{ t.home.startGame }}</span>
      <span class="btn-sparkle right">✨</span>
    </button>

    <!-- Feature Cards Grid -->
    <div class="feature-grid">
      <StickerWallPreview @click="showStickerWall = true" />
      <FeatureCard type="stats" icon="📊" :title="t.home.stats" :description="t.home.subtitle" @click="showStats = true" />
    </div>

    <!-- Action Buttons -->
    <div class="action-section">
      <button class="action-btn share-btn" @click="openShareModal">
        <span class="action-icon">📤</span>
        {{ t.share?.button || 'Share' }}
      </button>
      <button class="action-btn reset-btn" @click="confirmReset">
        <span class="action-icon">🔄</span>
        {{ t.home.reset }}
      </button>
    </div>

    <!-- Share Modal -->
    <n-modal v-model:show="showShareModal" preset="card" :title="t.share?.title || 'Share'" style="max-width: 420px">
      <div class="share-modal-content">
        <div class="share-card-wrapper">
          <ShareCard ref="shareCardRef" />
        </div>
        <div class="share-actions">
          <n-button type="primary" :loading="isGenerating" @click="handleGenerateAndShare">
            <template #icon><span>📤</span></template>
            {{ isGenerating ? t.share?.generating : (canShare ? 'Share' : t.share?.download) }}
          </n-button>
        </div>
      </div>
    </n-modal>

    <!-- Sticker Wall Modal -->
    <n-modal v-model:show="showStickerWall" preset="card" :title="t.stickerWall.title" style="max-width: 600px">
      <StickerWall />
    </n-modal>

    <!-- Stats Panel Modal -->
    <n-modal v-model:show="showStats" preset="card" :title="t.stats.title" style="max-width: 600px">
      <StatsPanel />
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NModal, NButton, useDialog } from 'naive-ui'
import { useUserStore } from '../stores/user'
import { useStatsStore } from '../stores/stats'
import { useStickersStore } from '../stores/stickers'
import { useProgressStore } from '../stores/progress'
import { useLocaleStore } from '../stores/locale'
import { useCoinsStore } from '../stores/coins'
import { useShare } from '../composables/useShare'
import StickerWall from './StickerWall.vue'
import StatsPanel from './StatsPanel.vue'
import CoinDisplay from './CoinDisplay.vue'
import StatCard from './StatCard.vue'
import FeatureCard from './FeatureCard.vue'
import DailyChallengeCard from './DailyChallengeCard.vue'
import WrongQuestionsCard from './WrongQuestionsCard.vue'
import ShareCard from './ShareCard.vue'
import AvatarCard from './home/AvatarCard.vue'
import StickerWallPreview from './home/StickerWallPreview.vue'

const emit = defineEmits(['startGame', 'openShop', 'openDailyChallenge', 'openWrongQuestions'])

const userStore = useUserStore()
const statsStore = useStatsStore()
const stickersStore = useStickersStore()
const progressStore = useProgressStore()
const localeStore = useLocaleStore()
const coinsStore = useCoinsStore()
const dialog = useDialog()

const { showShareModal, isGenerating, canShare, openShareModal, generateAndShare } = useShare()

const t = computed(() => localeStore.t)

const showStickerWall = ref(false)
const showStats = ref(false)
const shareCardRef = ref(null)

function confirmReset() {
  dialog.warning({
    title: t.value.home.confirmReset,
    content: t.value.home.resetWarning,
    positiveText: t.value.home.confirm,
    negativeText: t.value.home.cancel,
    onPositiveClick: () => {
      userStore.reset()
      statsStore.reset()
      stickersStore.reset()
      progressStore.reset()
      coinsStore.reset()
    }
  })
}

function handleGenerateAndShare() {
  generateAndShare(shareCardRef.value?.cardRef, t.value.share)
}
</script>

<style scoped>
.home-screen {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 70px;
  padding-bottom: 40px;
}

/* Coin Bar */
.coin-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.shop-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #FF69B4, #FF1493);
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
}

.shop-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 105, 180, 0.4);
}

.shop-btn:active {
  transform: translateY(0);
}

.shop-icon {
  font-size: 18px;
}

.shop-label {
  letter-spacing: 0.5px;
}

/* Hero Section */
.hero-section {
  margin-bottom: 24px;
}

/* Challenge Row */
.challenge-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

/* Stats Row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

/* Main Action Button */
.main-action-btn {
  width: 100%;
  padding: 20px 32px;
  border: none;
  border-radius: 24px;
  font-size: 22px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.main-action-btn.princess {
  background: linear-gradient(135deg, #FF69B4, #FF1493);
  box-shadow: 0 8px 30px rgba(255, 105, 180, 0.4);
}

.main-action-btn.prince {
  background: linear-gradient(135deg, #4A90D9, #1E90FF);
  box-shadow: 0 8px 30px rgba(74, 144, 217, 0.4);
}

.main-action-btn:hover {
  transform: translateY(-3px);
}

.main-action-btn.princess:hover {
  box-shadow: 0 12px 40px rgba(255, 105, 180, 0.5);
}

.main-action-btn.prince:hover {
  box-shadow: 0 12px 40px rgba(74, 144, 217, 0.5);
}

.btn-icon {
  font-size: 28px;
}

.btn-text {
  letter-spacing: 1px;
}

.btn-sparkle {
  font-size: 20px;
  opacity: 0.8;
}

/* Feature Grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

/* Action Section */
.action-section {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.action-btn {
  background: transparent;
  border: 2px dashed #ddd;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.share-btn:hover {
  border-color: var(--primary-color, #FF69B4);
  color: var(--primary-color, #FF69B4);
  background: var(--light-color, #FFF0F5);
}

.reset-btn:hover {
  border-color: #e74c3c;
  color: #e74c3c;
  background: #fff5f5;
}

.action-icon {
  font-size: 16px;
}

/* Share Modal */
.share-modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.share-card-wrapper {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.share-actions {
  display: flex;
  gap: 12px;
}

/* Responsive - Tablet */
@media (max-width: 768px) {
  .home-screen {
    padding: 16px;
    padding-top: 65px;
  }

  .stats-row {
    gap: 10px;
  }
}

/* Responsive - Mobile */
@media (max-width: 500px) {
  .home-screen {
    padding: 12px;
    padding-top: 55px;
    padding-bottom: 30px;
  }

  .coin-bar {
    margin-bottom: 12px;
  }

  .shop-btn {
    padding: 6px 12px;
    font-size: 12px;
  }

  .shop-icon {
    font-size: 16px;
  }

  .hero-section {
    margin-bottom: 16px;
  }

  /* Challenge Row */
  .challenge-row {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 16px;
  }

  /* Stats Row */
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }

  /* Main Button */
  .main-action-btn {
    padding: 16px 20px;
    font-size: 18px;
    border-radius: 18px;
    margin-bottom: 16px;
    gap: 8px;
  }

  .btn-icon {
    font-size: 22px;
  }

  .btn-sparkle {
    font-size: 16px;
  }

  /* Feature Grid */
  .feature-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  /* Reset */
  .reset-btn {
    padding: 10px 18px;
    font-size: 12px;
  }

  .reset-icon {
    font-size: 14px;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .home-screen {
    padding: 10px;
    padding-top: 50px;
  }

  .stats-row {
    gap: 6px;
  }

  .main-action-btn {
    padding: 14px 16px;
    font-size: 16px;
  }
}

/* Landscape mode on mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .home-screen {
    padding-top: 50px;
  }

  .hero-section {
    margin-bottom: 12px;
  }

  .stats-row {
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 12px;
  }

  .main-action-btn {
    padding: 12px;
    font-size: 16px;
    margin-bottom: 12px;
  }

  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
