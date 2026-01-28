<template>
  <div class="daily-challenge-screen">
    <div class="header">
      <button class="back-btn" @click="$emit('back')">←</button>
      <h2 class="title">
        <span class="title-icon">🎯</span>
        {{ t.dailyChallenge?.title || 'Daily Challenge' }}
      </h2>
      <div class="streak-badge">
        <span class="streak-icon">🔥</span>
        <span class="streak-count">{{ challengeStore.currentStreak }}</span>
      </div>
    </div>

    <!-- Challenge Info -->
    <div class="challenge-info-card">
      <div class="date-display">
        {{ formattedDate }}
      </div>
      <div class="challenge-details">
        <div class="detail-item">
          <span class="detail-icon">{{ operationIcon }}</span>
          <span class="detail-label">{{ t.operations?.[config.operation] || config.operation }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-icon">{{ levelIcons[config.level] }}</span>
          <span class="detail-label">Level {{ config.level }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-icon">📝</span>
          <span class="detail-label">10 {{ t.home?.totalQuestions || 'Questions' }}</span>
        </div>
      </div>
    </div>

    <!-- Streak Info -->
    <div class="streak-info-card">
      <div class="streak-stat">
        <span class="stat-value">{{ challengeStore.currentStreak }}</span>
        <span class="stat-label">{{ t.dailyChallenge?.currentStreak || 'Current Streak' }}</span>
      </div>
      <div class="streak-stat">
        <span class="stat-value">{{ challengeStore.bestStreak }}</span>
        <span class="stat-label">{{ t.dailyChallenge?.bestStreak || 'Best Streak' }}</span>
      </div>
      <div class="streak-stat">
        <span class="stat-value">{{ challengeStore.totalChallenges }}</span>
        <span class="stat-label">{{ t.dailyChallenge?.total || 'Total' }}</span>
      </div>
    </div>

    <!-- Rewards Preview -->
    <div class="rewards-preview">
      <h3 class="rewards-title">{{ t.dailyChallenge?.rewards || 'Rewards' }}</h3>
      <div class="reward-items">
        <div class="reward-item">
          <span class="reward-icon">🪙</span>
          <span class="reward-text">3x {{ t.coins?.correctAnswers || 'per correct' }}</span>
        </div>
        <div class="reward-item" v-if="challengeStore.currentStreak >= 2">
          <span class="reward-icon">🔥</span>
          <span class="reward-text">{{ challengeStore.currentStreak >= 7 ? '+50' : '+20' }} {{ t.dailyChallenge?.streakBonus || 'streak bonus' }}</span>
        </div>
        <div class="reward-item">
          <span class="reward-icon">⭐</span>
          <span class="reward-text">+30 {{ t.dailyChallenge?.perfectBonus || 'perfect bonus' }}</span>
        </div>
      </div>
    </div>

    <!-- Start Button -->
    <button class="start-btn" :class="userStore.gender" @click="startChallenge">
      <span class="btn-icon">🚀</span>
      <span class="btn-text">{{ t.dailyChallenge?.start || 'Start Challenge' }}</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDailyChallengeStore } from '../stores/dailyChallenge'
import { useLocaleStore } from '../stores/locale'
import { useUserStore } from '../stores/user'
import { operationConfig, levelIcons } from '../config/levels'

const emit = defineEmits(['back', 'start'])

const challengeStore = useDailyChallengeStore()
const localeStore = useLocaleStore()
const userStore = useUserStore()

const t = computed(() => localeStore.t)
const config = computed(() => challengeStore.todayChallengeConfig)

const formattedDate = computed(() => {
  const date = new Date()
  return date.toLocaleDateString(localeStore.currentLocale === 'zh' ? 'zh-CN' : 'en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })
})

const operationIcon = computed(() => operationConfig[config.value.operation]?.icon || '➕')

function startChallenge() {
  emit('start', config.value)
}
</script>

<style scoped>
.daily-challenge-screen {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.back-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: white;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.2s;
}

.back-btn:hover {
  transform: scale(1.1);
}

.title {
  font-size: 24px;
  color: var(--primary-color, #FF69B4);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 28px;
}

.streak-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(255, 165, 0, 0.3);
}

.streak-icon {
  font-size: 18px;
}

.streak-count {
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.challenge-info-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
}

.date-display {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.challenge-details {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.detail-icon {
  font-size: 32px;
}

.detail-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.streak-info-card {
  display: flex;
  justify-content: space-around;
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.streak-stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-color, #FF69B4);
}

.stat-label {
  font-size: 12px;
  color: #999;
}

.rewards-preview {
  background: linear-gradient(135deg, #FFF9E6, #FFE4B5);
  border: 2px solid #FFD700;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 24px;
}

.rewards-title {
  font-size: 16px;
  font-weight: 700;
  color: #B8860B;
  margin: 0 0 12px 0;
  text-align: center;
}

.reward-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reward-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reward-icon {
  font-size: 20px;
}

.reward-text {
  font-size: 14px;
  color: #8B6914;
}

.start-btn {
  width: 100%;
  padding: 20px 32px;
  border: none;
  border-radius: 24px;
  font-size: 20px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s;
}

.start-btn.princess {
  background: linear-gradient(135deg, #FF69B4, #FF1493);
  box-shadow: 0 8px 30px rgba(255, 105, 180, 0.4);
}

.start-btn.prince {
  background: linear-gradient(135deg, #4A90D9, #1E90FF);
  box-shadow: 0 8px 30px rgba(74, 144, 217, 0.4);
}

.start-btn:hover {
  transform: translateY(-3px);
}

.btn-icon {
  font-size: 24px;
}

@media (max-width: 500px) {
  .daily-challenge-screen {
    padding: 16px;
    padding-top: 60px;
  }

  .title {
    font-size: 18px;
  }

  .title-icon {
    font-size: 22px;
  }

  .challenge-details {
    gap: 16px;
  }

  .detail-icon {
    font-size: 24px;
  }

  .detail-label {
    font-size: 12px;
  }

  .start-btn {
    padding: 16px 24px;
    font-size: 18px;
  }
}
</style>
