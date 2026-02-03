<template>
  <div
    class="wrong-questions-card"
    :class="{ empty: wrongQuestionsStore.dueCount === 0, clickable: wrongQuestionsStore.hasQuestions }"
    @click="handleClick"
  >
    <div class="card-header">
      <span class="card-icon">📝</span>
      <h3 class="card-title">{{ t.wrongQuestions?.title || 'Review Mistakes' }}</h3>
    </div>

    <!-- Only show badge when there are questions due for review -->
    <div v-if="wrongQuestionsStore.dueCount > 0" class="has-questions">
      <div class="count-badge">
        <span class="count-number">{{ wrongQuestionsStore.dueCount }}</span>
        <span class="count-label">{{ t.wrongQuestions?.dueNow || 'due now' }}</span>
      </div>
      <div class="operation-preview">
        <span
          v-for="(questions, op) in previewOperations"
          :key="op"
          class="op-badge"
        >
          {{ getOperationIcon(op) }} {{ questions.length }}
        </span>
      </div>
      <p class="cta-text">{{ t.wrongQuestions?.practice || 'Practice Now' }}</p>
    </div>

    <!-- Show when all questions are waiting for next review -->
    <div v-else-if="wrongQuestionsStore.totalCount > 0" class="no-questions waiting">
      <div class="success-icon">⏰</div>
      <p class="empty-text">{{ t.wrongQuestions?.allReviewed || 'All Reviewed!' }}</p>
      <p class="empty-desc">{{ wrongQuestionsStore.totalCount }} {{ t.wrongQuestions?.waiting || 'waiting' }}</p>
    </div>

    <!-- Show when no mistakes at all -->
    <div v-else class="no-questions">
      <div class="success-icon">🎉</div>
      <p class="empty-text">{{ t.wrongQuestions?.empty || 'No mistakes!' }}</p>
      <p class="empty-desc">{{ t.wrongQuestions?.emptyDesc || 'Keep it up!' }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWrongQuestionsStore } from '../stores/wrongQuestions'
import { useLocaleStore } from '../stores/locale'
import { operationConfig } from '../config/levels'

const emit = defineEmits(['review'])

const wrongQuestionsStore = useWrongQuestionsStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)

// Only show operations that have questions due for review
const previewOperations = computed(() => {
  const grouped = {}
  wrongQuestionsStore.dueQuestions.forEach(q => {
    if (!grouped[q.operation]) {
      grouped[q.operation] = []
    }
    grouped[q.operation].push(q)
  })
  // Show only first 3 operations
  const entries = Object.entries(grouped).slice(0, 3)
  return Object.fromEntries(entries)
})

function getOperationIcon(operation) {
  return operationConfig[operation]?.icon || '➕'
}

function handleClick() {
  if (wrongQuestionsStore.hasQuestions) {
    emit('review')
  }
}
</script>

<style scoped>
.wrong-questions-card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border: 2px solid var(--secondary-color, #FFB6C1);
  transition: all 0.3s;
}

.wrong-questions-card.clickable {
  cursor: pointer;
}

.wrong-questions-card.clickable:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  border-color: var(--primary-color, #FF69B4);
}

.wrong-questions-card.empty {
  border-color: #52C41A;
  background: linear-gradient(135deg, #F6FFED, #D9F7BE);
}

.no-questions.waiting .success-icon {
  font-size: 28px;
}

.no-questions.waiting .empty-text {
  color: #1890FF;
}

.no-questions.waiting .empty-desc {
  color: #69C0FF;
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
  color: #333;
  margin: 0;
}

.has-questions {
  text-align: center;
}

.count-badge {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  background: linear-gradient(135deg, #FF6B6B, #FF4444);
  padding: 8px 16px;
  border-radius: 20px;
  margin-bottom: 12px;
}

.count-number {
  font-size: 24px;
  font-weight: 700;
  color: white;
}

.count-label {
  font-size: 12px;
  color: rgba(255,255,255,0.9);
}

.operation-preview {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.op-badge {
  background: var(--light-color, #FFF0F5);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-color, #FF69B4);
}

.cta-text {
  font-size: 14px;
  color: var(--primary-color, #FF69B4);
  font-weight: 600;
  margin: 0;
}

.no-questions {
  text-align: center;
  padding: 8px 0;
}

.success-icon {
  font-size: 32px;
  margin-bottom: 4px;
}

.empty-text {
  font-size: 14px;
  font-weight: 600;
  color: #52C41A;
  margin: 0 0 4px 0;
}

.empty-desc {
  font-size: 12px;
  color: #73D13D;
  margin: 0;
}

@media (max-width: 500px) {
  .wrong-questions-card {
    padding: 12px;
  }

  .card-icon {
    font-size: 20px;
  }

  .card-title {
    font-size: 14px;
  }

  .count-number {
    font-size: 20px;
  }
}
</style>
