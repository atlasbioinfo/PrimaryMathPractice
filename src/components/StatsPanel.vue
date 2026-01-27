<template>
  <div class="stats-panel">
    <!-- Overall Stats -->
    <div class="overall-stats">
      <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-value">{{ statsStore.totalQuestions }}</div>
        <div class="stat-label">{{ t.stats.totalQuestions }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-value">{{ statsStore.overallAccuracy }}%</div>
        <div class="stat-label">{{ t.stats.overallAccuracy }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🔥</div>
        <div class="stat-value">{{ statsStore.streakDays }}</div>
        <div class="stat-label">{{ t.stats.streakDays }}</div>
      </div>
    </div>

    <!-- Operation Stats -->
    <h3 class="section-title">{{ t.stats.operationStats }}</h3>
    <div class="operation-stats">
      <div
        v-for="op in operations"
        :key="op.key"
        class="operation-stat-card"
      >
        <div class="op-header">
          <span class="op-icon">{{ op.icon }}</span>
          <span class="op-name">{{ t.operations[op.key] }}</span>
        </div>
        <div class="op-stats">
          <div class="op-stat-item">
            <span class="label">{{ t.stats.questions }}</span>
            <span class="value">{{ getStats(op.key).total }}</span>
          </div>
          <div class="op-stat-item">
            <span class="label">{{ t.stats.accuracy }}</span>
            <span class="value">{{ getAccuracy(op.key) }}%</span>
          </div>
          <div class="op-stat-item">
            <span class="label">{{ t.stats.sessions }}</span>
            <span class="value">{{ getStats(op.key).sessions }}</span>
          </div>
          <div class="op-stat-item" v-if="getStats(op.key).bestTime">
            <span class="label">{{ t.stats.bestTime }}</span>
            <span class="value">{{ formatTime(getStats(op.key).bestTime) }}</span>
          </div>
        </div>
        <div class="accuracy-bar">
          <div
            class="accuracy-fill"
            :style="{ width: `${getAccuracy(op.key)}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Progress Overview -->
    <h3 class="section-title">{{ t.stats.progressOverview }}</h3>
    <div class="progress-overview">
      <div
        v-for="op in operations"
        :key="`progress_${op.key}`"
        class="progress-item"
      >
        <span class="progress-label">
          <span class="op-icon-small">{{ op.icon }}</span>
          {{ t.operations[op.key] }}
        </span>
        <n-progress
          type="line"
          :percentage="(getCompletedLevels(op.key) / 6) * 100"
          :height="8"
          :border-radius="4"
          :show-indicator="false"
        />
        <span class="progress-text">{{ getCompletedLevels(op.key) }}/6</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { NProgress } from 'naive-ui'
import { useStatsStore } from '../stores/stats'
import { useProgressStore } from '../stores/progress'
import { useLocaleStore } from '../stores/locale'

const statsStore = useStatsStore()
const progressStore = useProgressStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)

const operations = [
  { key: 'addition', icon: '✨' },
  { key: 'subtraction', icon: '✂️' },
  { key: 'multiplication', icon: '⭐' },
  { key: 'division', icon: '🍕' },
  { key: 'fraction', icon: '🍰' }
]

function getStats(opKey) {
  return statsStore.getOperationStats(opKey)
}

function getAccuracy(opKey) {
  return statsStore.getOperationAccuracy(opKey)
}

function getCompletedLevels(opKey) {
  return progressStore.getCompletedLevelCount(opKey)
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.stats-panel {
  padding: 10px;
}

.overall-stats {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.stat-card {
  flex: 1;
  min-width: 100px;
  background: var(--light-color, #FFF0F5);
  border-radius: 16px;
  padding: 15px;
  text-align: center;
}

.stat-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: var(--primary-color, #FF69B4);
}

.stat-label {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.section-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--secondary-color, #FFB6C1);
}

.operation-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}

.operation-stat-card {
  background: white;
  border: 1px solid var(--secondary-color, #FFB6C1);
  border-radius: 12px;
  padding: 12px;
}

.op-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.op-icon {
  font-size: 20px;
}

.op-name {
  font-weight: bold;
  color: #333;
}

.op-stats {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.op-stat-item {
  display: flex;
  flex-direction: column;
  min-width: 60px;
}

.op-stat-item .label {
  font-size: 11px;
  color: #999;
}

.op-stat-item .value {
  font-size: 16px;
  font-weight: bold;
  color: var(--primary-color, #FF69B4);
}

.accuracy-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.accuracy-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color, #FF69B4), var(--accent-color, #FF1493));
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-overview {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-label {
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 80px;
  font-size: 14px;
  color: #666;
}

.op-icon-small {
  font-size: 16px;
}

.progress-item :deep(.n-progress) {
  flex: 1;
}

.progress-text {
  min-width: 35px;
  text-align: right;
  font-size: 14px;
  color: var(--primary-color, #FF69B4);
  font-weight: bold;
}
</style>
