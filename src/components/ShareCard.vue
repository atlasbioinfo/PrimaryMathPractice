<template>
  <div ref="cardRef" class="share-card" :class="userStore.gender">
    <!-- Background Pattern -->
    <div class="card-bg">
      <span v-for="i in 12" :key="i" class="bg-deco">
        {{ userStore.theme.decorations[(i - 1) % userStore.theme.decorations.length] }}
      </span>
    </div>

    <!-- Header -->
    <div class="card-header">
      <div class="avatar-section">
        <img :src="userStore.theme.avatar" alt="avatar" class="share-avatar" />
      </div>
      <div class="user-info">
        <div class="username">{{ userStore.username || (userStore.gender === 'prince' ? t.welcome.defaultPrince : t.welcome.defaultPrincess) }}</div>
        <div class="app-name">MathHero</div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-icon">🔥</span>
        <span class="stat-value">{{ statsStore.streakDays }}</span>
        <span class="stat-label">{{ t.home.streakDays }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-icon">📝</span>
        <span class="stat-value">{{ statsStore.totalQuestions }}</span>
        <span class="stat-label">{{ t.home.totalQuestions }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-icon">🎯</span>
        <span class="stat-value">{{ statsStore.overallAccuracy }}%</span>
        <span class="stat-label">{{ t.home.accuracy }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-icon">🏅</span>
        <span class="stat-value">{{ stickersStore.getEarnedCount() }}</span>
        <span class="stat-label">{{ t.home.stickers }}</span>
      </div>
    </div>

    <!-- Stickers Display -->
    <div v-if="earnedStickers.length > 0" class="stickers-section">
      <div class="stickers-row">
        <span v-for="sticker in earnedStickers.slice(0, 8)" :key="sticker.id" class="share-sticker">
          {{ sticker.icon }}
        </span>
        <span v-if="stickersStore.getEarnedCount() > 8" class="more-badge">
          +{{ stickersStore.getEarnedCount() - 8 }}
        </span>
      </div>
    </div>

    <!-- Footer -->
    <div class="card-footer">
      <div class="footer-left">
        <span class="footer-text">{{ t.share?.joinMe || 'Join me on MathHero!' }}</span>
        <span class="footer-url">atlasbioinfo.github.io/MathHero</span>
      </div>
      <img :src="qrCodeImg" alt="QR Code" class="qr-code" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user'
import { useStatsStore } from '../stores/stats'
import { useStickersStore } from '../stores/stickers'
import { useLocaleStore } from '../stores/locale'
import qrCodeImg from '../assets/qr-code.png'

const userStore = useUserStore()
const statsStore = useStatsStore()
const stickersStore = useStickersStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)
const cardRef = ref(null)

const earnedStickers = computed(() => {
  return stickersStore.allStickers.filter(s => stickersStore.hasSticker(s.id))
})

defineExpose({ cardRef })
</script>

<style scoped>
.share-card {
  width: 360px;
  padding: 24px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.share-card.princess {
  background: linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 50%, #FFB6C1 100%);
}

.share-card.prince {
  background: linear-gradient(135deg, #F0F8FF 0%, #E6F2FF 50%, #87CEEB 100%);
}

/* Background decorations */
.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.bg-deco {
  position: absolute;
  font-size: 24px;
  opacity: 0.15;
}

.bg-deco:nth-child(1) { top: 5%; left: 5%; }
.bg-deco:nth-child(2) { top: 10%; right: 10%; }
.bg-deco:nth-child(3) { top: 25%; left: 15%; }
.bg-deco:nth-child(4) { top: 30%; right: 5%; }
.bg-deco:nth-child(5) { top: 50%; left: 3%; }
.bg-deco:nth-child(6) { top: 55%; right: 12%; }
.bg-deco:nth-child(7) { top: 70%; left: 10%; }
.bg-deco:nth-child(8) { top: 75%; right: 8%; }
.bg-deco:nth-child(9) { bottom: 15%; left: 5%; }
.bg-deco:nth-child(10) { bottom: 10%; right: 15%; }
.bg-deco:nth-child(11) { bottom: 5%; left: 20%; }
.bg-deco:nth-child(12) { bottom: 3%; right: 3%; }

/* Header */
.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.avatar-section {
  flex-shrink: 0;
}

.share-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
}

.share-card.princess .share-avatar {
  border: 3px solid #FF69B4;
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
}

.share-card.prince .share-avatar {
  border: 3px solid #4A90D9;
  box-shadow: 0 4px 12px rgba(74, 144, 217, 0.3);
}

.user-info {
  flex: 1;
}

.username {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}

.share-card.princess .username {
  color: #FF1493;
}

.share-card.prince .username {
  color: #1E90FF;
}

.app-name {
  font-size: 13px;
  color: #888;
  font-weight: 500;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.stat-item {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  padding: 14px 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-icon {
  font-size: 22px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
}

.share-card.princess .stat-value {
  color: #FF69B4;
}

.share-card.prince .stat-value {
  color: #4A90D9;
}

.stat-label {
  font-size: 11px;
  color: #888;
}

/* Stickers Section */
.stickers-section {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.stickers-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.share-sticker {
  font-size: 24px;
}

.more-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
}

.share-card.princess .more-badge {
  background: #FFE4EC;
  color: #FF1493;
}

.share-card.prince .more-badge {
  background: #E6F2FF;
  color: #1E90FF;
}

/* Footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  padding: 12px 16px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer-text {
  font-size: 14px;
  font-weight: 600;
}

.footer-url {
  font-size: 11px;
  color: #666;
}

.qr-code {
  width: 56px;
  height: 56px;
  border-radius: 8px;
}

.share-card.princess .footer-text {
  color: #FF69B4;
}

.share-card.prince .footer-text {
  color: #4A90D9;
}
</style>
