<template>
  <div
    class="daily-challenge-card"
    :class="{ completed: challengeStore.hasCompletedToday, clickable: challengeStore.canPlayToday }"
    @click="handleClick"
  >
    <div class="card-header">
      <span class="card-icon">🎯</span>
      <h3 class="card-title">{{ t.dailyChallenge?.title || 'Daily Challenge' }}</h3>
    </div>

    <div v-if="challengeStore.hasCompletedToday" class="completed-state">
      <div class="check-mark">✅</div>
      <p class="completed-text">{{ t.dailyChallenge?.completed || 'Completed!' }}</p>
      <div class="result-info">
        <span class="score">{{ challengeStore.todayResult?.score }}/10</span>
        <span class="accuracy">{{ challengeStore.todayResult?.accuracy }}%</span>
      </div>
    </div>

    <div v-else class="available-state">
      <div class="challenge-info">
        <span class="operation-icon">{{ getOperationIcon(challengeStore.todayChallengeConfig.operation) }}</span>
        <span class="operation-name">{{ t.operations?.[challengeStore.todayChallengeConfig.operation] || challengeStore.todayChallengeConfig.operation }}</span>
        <span class="level-badge">Lv.{{ challengeStore.todayChallengeConfig.level }}</span>
      </div>
      <p class="cta-text">{{ t.dailyChallenge?.tapToPlay || 'Tap to play!' }}</p>
    </div>

    <div class="streak-info">
      <span class="streak-icon">🔥</span>
      <span class="streak-count">{{ challengeStore.currentStreak }}</span>
      <span class="streak-label">{{ t.dailyChallenge?.streak || 'streak' }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDailyChallengeStore } from '../stores/dailyChallenge'
import { useLocaleStore } from '../stores/locale'
import { operationConfig } from '../config/levels'

const emit = defineEmits(['play'])

const challengeStore = useDailyChallengeStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)

function getOperationIcon(operation) {
  return operationConfig[operation]?.icon || '➕'
}

function handleClick() {
  if (challengeStore.canPlayToday) {
    emit('play')
  }
}
</script>

<style scoped>
.daily-challenge-card {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border-radius: 16px;
  padding: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(255, 165, 0, 0.3);
  transition: all 0.3s;
}

.daily-challenge-card.clickable {
  cursor: pointer;
}

.daily-challenge-card.clickable:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(255, 165, 0, 0.4);
}

.daily-challenge-card.completed {
  background: linear-gradient(135deg, #98D8AA 0%, #52C41A 100%);
  box-shadow: 0 4px 15px rgba(82, 196, 26, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.card-icon {
  font-size: 24px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.completed-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
}

.check-mark {
  font-size: 32px;
  margin-bottom: 4px;
}

.completed-text {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin: 0 0 8px 0;
}

.result-info {
  display: flex;
  gap: 12px;
}

.score, .accuracy {
  background: rgba(255,255,255,0.3);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: white;
}

.available-state {
  text-align: center;
  padding: 8px 0;
}

.challenge-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.operation-icon {
  font-size: 24px;
}

.operation-name {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.level-badge {
  background: rgba(255,255,255,0.3);
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  color: white;
}

.cta-text {
  font-size: 14px;
  color: rgba(255,255,255,0.9);
  margin: 0;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 0.6; }
}

.streak-info {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255,255,255,0.2);
  padding: 4px 10px;
  border-radius: 12px;
}

.streak-icon {
  font-size: 14px;
}

.streak-count {
  font-size: 14px;
  font-weight: 700;
  color: white;
}

.streak-label {
  font-size: 10px;
  color: rgba(255,255,255,0.8);
}

@media (max-width: 500px) {
  .daily-challenge-card {
    padding: 12px;
  }

  .card-icon {
    font-size: 20px;
  }

  .card-title {
    font-size: 14px;
  }

  .operation-icon {
    font-size: 20px;
  }

  .operation-name {
    font-size: 14px;
  }
}
</style>
