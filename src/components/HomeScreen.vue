<template>
  <div class="home-screen">
    <!-- Coin Display Bar -->
    <div class="coin-bar">
      <CoinDisplay size="normal" />
      <button class="shop-btn" @click="openShop">
        <span class="shop-icon">🏪</span>
        <span class="shop-label">{{ t.shop?.title || 'Shop' }}</span>
      </button>
    </div>

    <!-- Hero Section with Avatar Card -->
    <div class="hero-section">
      <div class="avatar-card" :class="userStore.gender">
        <div class="card-decorations">
          <span v-for="(d, i) in decorations" :key="i" class="deco-item" :style="d">
            {{ userStore.theme.decorations[i % userStore.theme.decorations.length] }}
          </span>
        </div>
        <div class="avatar-wrapper">
          <img :src="userStore.theme.avatar" alt="avatar" class="home-avatar" />
          <div class="avatar-ring"></div>
        </div>
        <h1 class="welcome-text">{{ t.userMenu.welcome }}!</h1>
        <h2 class="user-name-display">{{ userStore.username || (userStore.gender === 'prince' ? t.welcome.defaultPrince : t.welcome.defaultPrincess) }}</h2>
        <p class="role-badge">
          <span class="badge-icon">👑</span>
          {{ userStore.gender === 'prince' ? t.home.princeTitle : t.home.princessTitle }}
        </p>
      </div>
    </div>

    <!-- Stats Cards Row -->
    <div class="stats-row">
      <StatCard type="flame" icon="🔥" :value="statsStore.streakDays" :label="t.home.streakDays" />
      <StatCard type="questions" icon="📝" :value="statsStore.totalQuestions" :label="t.home.totalQuestions" />
      <StatCard type="accuracy" icon="🎯" :value="`${statsStore.overallAccuracy}%`" :label="t.home.accuracy" />
      <StatCard type="stickers" icon="🏅" :value="`${stickersStore.getEarnedCount()}/${stickersStore.getTotalCount()}`" :label="t.home.stickers" />
    </div>

    <!-- Main Action Button -->
    <button class="main-action-btn" :class="userStore.gender" @click="$emit('startGame')">
      <span class="btn-sparkle left">✨</span>
      <span class="btn-icon">🎮</span>
      <span class="btn-text">{{ t.home.startGame }}</span>
      <span class="btn-sparkle right">✨</span>
    </button>

    <!-- Feature Cards Grid -->
    <div class="feature-grid">
      <FeatureCard type="sticker" icon="🏆" :title="t.home.stickerWall" @click="showStickerWall = true">
        <!-- Show earned stickers or progress -->
        <div v-if="earnedStickersDisplay.length > 0" class="sticker-mini-grid earned-grid">
          <span
            v-for="sticker in earnedStickersDisplay"
            :key="sticker.id"
            class="mini-sticker earned"
          >{{ sticker.icon }}</span>
          <span v-if="stickersStore.getEarnedCount() > 12" class="more-stickers">
            +{{ stickersStore.getEarnedCount() - 12 }}
          </span>
        </div>
        <div v-else class="sticker-mini-grid">
          <span
            v-for="sticker in allStickersPreview.slice(0, 10)"
            :key="sticker.id"
            class="mini-sticker"
          >{{ sticker.icon }}</span>
        </div>
        <!-- Progress bar -->
        <div class="sticker-progress">
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: `${(stickersStore.getTotalEarnedCount() / stickersStore.getTotalPossibleCount()) * 100}%` }"
            ></div>
          </div>
          <span class="progress-text">{{ stickersStore.getTotalEarnedCount() }}/{{ stickersStore.getTotalPossibleCount() }}</span>
        </div>
      </FeatureCard>
      <FeatureCard type="stats" icon="📊" :title="t.home.stats" :description="t.home.subtitle" @click="showStats = true" />
    </div>

    <!-- Reset Button -->
    <div class="reset-section">
      <button class="reset-btn" @click="confirmReset">
        <span class="reset-icon">🔄</span>
        {{ t.home.reset }}
      </button>
    </div>

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
import { NModal, useDialog } from 'naive-ui'
import { useUserStore } from '../stores/user'
import { useStatsStore } from '../stores/stats'
import { useStickersStore } from '../stores/stickers'
import { useProgressStore } from '../stores/progress'
import { useLocaleStore } from '../stores/locale'
import { useCoinsStore } from '../stores/coins'
import StickerWall from './StickerWall.vue'
import StatsPanel from './StatsPanel.vue'
import CoinDisplay from './CoinDisplay.vue'
import StatCard from './StatCard.vue'
import FeatureCard from './FeatureCard.vue'

const emit = defineEmits(['startGame', 'openShop'])

const userStore = useUserStore()
const statsStore = useStatsStore()
const stickersStore = useStickersStore()
const progressStore = useProgressStore()
const localeStore = useLocaleStore()
const coinsStore = useCoinsStore()
const dialog = useDialog()

const t = computed(() => localeStore.t)

const showStickerWall = ref(false)
const showStats = ref(false)

const decorations = [
  { top: '5%', left: '5%', fontSize: '20px', animationDelay: '0s' },
  { top: '10%', right: '8%', fontSize: '18px', animationDelay: '0.5s' },
  { bottom: '15%', left: '8%', fontSize: '22px', animationDelay: '1s' },
  { bottom: '10%', right: '5%', fontSize: '16px', animationDelay: '1.5s' },
  { top: '40%', left: '2%', fontSize: '14px', animationDelay: '2s' },
  { top: '35%', right: '2%', fontSize: '16px', animationDelay: '2.5s' },
]

// Get earned stickers with their info
const earnedStickersDisplay = computed(() => {
  return stickersStore.allStickers
    .filter(s => stickersStore.hasSticker(s.id))
    .slice(0, 12) // Show up to 12 earned stickers
})

// Get all stickers for display (showing progress)
const allStickersPreview = computed(() => {
  return stickersStore.allStickers.slice(0, 20) // Show first 20 achievement stickers
})

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

function openShop() {
  emit('openShop')
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

.avatar-card {
  background: white;
  border-radius: 28px;
  padding: 32px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.avatar-card.princess {
  border: 3px solid #FFB6C1;
  background: linear-gradient(180deg, white 0%, #FFF5F8 100%);
}

.avatar-card.prince {
  border: 3px solid #87CEEB;
  background: linear-gradient(180deg, white 0%, #F0F8FF 100%);
}

.card-decorations {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.deco-item {
  position: absolute;
  opacity: 0.5;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.home-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 2;
}

.avatar-card.princess .home-avatar {
  border: 4px solid #FF69B4;
  box-shadow: 0 8px 30px rgba(255, 105, 180, 0.3);
}

.avatar-card.prince .home-avatar {
  border: 4px solid #4A90D9;
  box-shadow: 0 8px 30px rgba(74, 144, 217, 0.3);
}

.avatar-ring {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  z-index: 1;
}

.avatar-card.princess .avatar-ring {
  border: 3px dashed #FFB6C1;
}

.avatar-card.prince .avatar-ring {
  border: 3px dashed #87CEEB;
}

.welcome-text {
  font-size: 18px;
  color: #888;
  margin-bottom: 4px;
  font-weight: 500;
}

.user-name-display {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.avatar-card.princess .user-name-display {
  color: #FF69B4;
}

.avatar-card.prince .user-name-display {
  color: #4A90D9;
}

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.avatar-card.princess .role-badge {
  background: linear-gradient(135deg, #FFE4EC, #FFB6C1);
  color: #FF1493;
}

.avatar-card.prince .role-badge {
  background: linear-gradient(135deg, #DBEAFE, #87CEEB);
  color: #1E90FF;
}

.badge-icon {
  font-size: 16px;
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

.sticker-mini-grid {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.sticker-mini-grid.earned-grid {
  gap: 4px;
}

.more-stickers {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 10px;
  font-weight: 600;
  color: var(--primary-color, #FF69B4);
  background: var(--light-color, #FFF0F5);
  border-radius: 50%;
}

.sticker-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #eee;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color, #FF69B4), var(--accent-color, #FF1493));
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 11px;
  font-weight: 600;
  color: var(--primary-color, #FF69B4);
  min-width: 40px;
  text-align: right;
}

.mini-sticker {
  font-size: 18px;
  opacity: 0.3;
  filter: grayscale(1);
}

.mini-sticker.earned {
  opacity: 1;
  filter: none;
}

/* Reset Section */
.reset-section {
  text-align: center;
}

.reset-btn {
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

.reset-btn:hover {
  border-color: #e74c3c;
  color: #e74c3c;
  background: #fff5f5;
}

.reset-icon {
  font-size: 16px;
}

/* Responsive - Tablet */
@media (max-width: 768px) {
  .home-screen {
    padding: 16px;
    padding-top: 65px;
  }

  .avatar-card {
    padding: 28px 20px;
    border-radius: 24px;
  }

  .home-avatar {
    width: 100px;
    height: 100px;
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

  .avatar-card {
    padding: 20px 16px;
    border-radius: 20px;
  }

  .avatar-card::before {
    display: none;
  }

  .card-decorations {
    display: none;
  }

  .avatar-wrapper {
    margin-bottom: 12px;
  }

  .home-avatar {
    width: 80px;
    height: 80px;
  }

  .avatar-ring {
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-width: 2px;
  }

  .welcome-text {
    font-size: 14px;
  }

  .user-name-display {
    font-size: 24px;
    margin-bottom: 6px;
  }

  .role-badge {
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 16px;
  }

  .badge-icon {
    font-size: 14px;
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

  .sticker-mini-grid {
    gap: 4px;
  }

  .mini-sticker {
    font-size: 16px;
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

  .avatar-card {
    padding: 16px 12px;
  }

  .home-avatar {
    width: 70px;
    height: 70px;
  }

  .user-name-display {
    font-size: 20px;
  }

  .role-badge {
    padding: 5px 10px;
    font-size: 11px;
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

  .avatar-card {
    padding: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    text-align: left;
  }

  .avatar-wrapper {
    margin-bottom: 0;
  }

  .home-avatar {
    width: 60px;
    height: 60px;
  }

  .avatar-ring {
    display: none;
  }

  .welcome-text {
    font-size: 12px;
    margin-bottom: 2px;
  }

  .user-name-display {
    font-size: 18px;
    margin-bottom: 4px;
  }

  .role-badge {
    padding: 4px 8px;
    font-size: 10px;
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
