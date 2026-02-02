<template>
  <div class="result-stats">
    <div class="stat-item">
      <div class="stat-value correct">{{ correctCount }}</div>
      <div class="stat-label">{{ labels.correct }}</div>
    </div>
    <div class="stat-item">
      <div class="stat-value wrong">{{ wrongCount }}</div>
      <div class="stat-label">{{ labels.wrong }}</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">{{ accuracy }}%</div>
      <div class="stat-label">{{ labels.accuracy }}</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">{{ formattedTime }}</div>
      <div class="stat-label">{{ labels.time }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  correctCount: { type: Number, required: true },
  wrongCount: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  timeUsed: { type: Number, required: true },
  labels: { type: Object, required: true }
})

const formattedTime = computed(() => {
  const mins = Math.floor(props.timeUsed / 60)
  const secs = props.timeUsed % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})
</script>

<style scoped>
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

@media (max-width: 500px) {
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
}

@media (max-width: 360px) {
  .stat-value {
    font-size: 20px;
  }

  .stat-label {
    font-size: 11px;
  }
}
</style>
