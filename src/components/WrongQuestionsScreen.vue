<template>
  <div class="wrong-questions-screen">
    <div class="header">
      <button class="back-btn" @click="$emit('back')">←</button>
      <h2 class="title">
        <span class="title-icon">📝</span>
        {{ t.wrongQuestions?.title || 'Review Mistakes' }}
      </h2>
      <button v-if="wrongQuestionsStore.hasQuestions" class="clear-btn" @click="confirmClear">
        🗑️
      </button>
      <div v-else style="width: 40px"></div>
    </div>

    <!-- Empty State -->
    <div v-if="!wrongQuestionsStore.hasQuestions" class="empty-state">
      <div class="empty-icon">🎉</div>
      <h3 class="empty-title">{{ t.wrongQuestions?.empty || 'Awesome!' }}</h3>
      <p class="empty-desc">{{ t.wrongQuestions?.emptyDesc || 'No mistakes to review!' }}</p>
    </div>

    <!-- All reviewed, waiting for next review -->
    <div v-else-if="wrongQuestionsStore.dueCount === 0" class="empty-state">
      <div class="empty-icon">⏰</div>
      <h3 class="empty-title">{{ t.wrongQuestions?.allReviewed || 'All Reviewed!' }}</h3>
      <p class="empty-desc">{{ t.wrongQuestions?.waitingDesc || 'Come back later for more practice.' }}</p>
      <p class="waiting-count">{{ t.wrongQuestions?.waitingCount?.replace('{count}', wrongQuestionsStore.totalCount) || `${wrongQuestionsStore.totalCount} question(s) waiting` }}</p>
    </div>

    <!-- Questions List -->
    <template v-else>
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-value">{{ wrongQuestionsStore.dueCount }}</span>
          <span class="stat-label">{{ t.wrongQuestions?.dueNow || 'Due Now' }}</span>
        </div>
        <div class="stat-item secondary">
          <span class="stat-value">{{ wrongQuestionsStore.totalCount - wrongQuestionsStore.dueCount }}</span>
          <span class="stat-label">{{ t.wrongQuestions?.waiting || 'Waiting' }}</span>
        </div>
      </div>

      <!-- Questions by Operation (only show due questions) -->
      <div class="questions-by-op">
        <div
          v-for="(questions, operation) in dueQuestionsByOperation"
          :key="operation"
          class="operation-section"
        >
          <div class="section-header">
            <span class="op-icon">{{ getOperationIcon(operation) }}</span>
            <span class="op-name">{{ t.operations?.[operation] || operation }}</span>
            <span class="op-count">({{ questions.length }})</span>
          </div>
          <div class="questions-list">
            <div
              v-for="item in questions.slice(0, 5)"
              :key="item.id"
              class="question-item"
              @click="debugQuestion(item)"
            >
              <div class="question-display">
                <template v-if="item.question.fraction1">
                  {{ item.question.fraction1.numerator }}/{{ item.question.fraction1.denominator }}
                  {{ item.question.operation }}
                  <template v-if="item.question.fraction2">
                    {{ item.question.fraction2.numerator }}/{{ item.question.fraction2.denominator }}
                  </template>
                  <template v-else>
                    {{ item.question.integer }}
                  </template>
                </template>
                <template v-else>
                  {{ item.question.num1 }} {{ getOperationSymbol(operation) }} {{ item.question.num2 }}
                </template>
              </div>
              <div class="answer-info">
                <span class="wrong-answer">✗ {{ formatAnswer(item.userAnswer) }}</span>
                <span class="correct-answer">✓ {{ formatAnswer(item.correctAnswer) }}</span>
              </div>
              <div class="review-status">
                <span v-if="item.correctStreak > 0" class="streak-badge">
                  ✓{{ item.correctStreak }}/3
                </span>
                <span class="wrong-count">× {{ item.wrongCount }}</span>
              </div>
            </div>
            <div v-if="questions.length > 5" class="more-indicator">
              +{{ questions.length - 5 }} {{ t.home?.viewAll || 'more' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Practice Button -->
      <button class="practice-btn" :class="userStore.gender" @click="startPractice">
        <span class="btn-icon">🚀</span>
        <span class="btn-text">{{ t.wrongQuestions?.practice || 'Practice Now' }}</span>
      </button>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDialog } from 'naive-ui'
import { useWrongQuestionsStore } from '../stores/wrongQuestions'
import { useLocaleStore } from '../stores/locale'
import { useUserStore } from '../stores/user'
import { operationConfig } from '../config/levels'

const emit = defineEmits(['back', 'practice'])

const wrongQuestionsStore = useWrongQuestionsStore()
const localeStore = useLocaleStore()
const userStore = useUserStore()
const dialog = useDialog()

const t = computed(() => localeStore.t)

// Group due questions by operation
const dueQuestionsByOperation = computed(() => {
  const grouped = {}
  wrongQuestionsStore.dueQuestions.forEach(q => {
    if (!grouped[q.operation]) {
      grouped[q.operation] = []
    }
    grouped[q.operation].push(q)
  })
  return grouped
})

function getOperationIcon(operation) {
  return operationConfig[operation]?.icon || '➕'
}

function getOperationSymbol(operation) {
  return operationConfig[operation]?.symbol || '+'
}

function formatAnswer(answer) {
  if (typeof answer === 'object' && answer !== null) {
    return `${answer.numerator}/${answer.denominator}`
  }
  return String(answer)
}

function confirmClear() {
  dialog.warning({
    title: t.value.wrongQuestions?.clear || 'Clear All',
    content: t.value.wrongQuestions?.clearConfirm || 'Are you sure?',
    positiveText: t.value.home?.confirm || 'Confirm',
    negativeText: t.value.home?.cancel || 'Cancel',
    onPositiveClick: () => {
      wrongQuestionsStore.clearAll()
    }
  })
}

function startPractice() {
  emit('practice', wrongQuestionsStore.getQuestionsForPractice(10))
}

// Debug function to inspect question data
function debugQuestion(item) {
  console.group('🔍 Wrong Question Debug Info')
  console.log('Question ID:', item.id)
  console.log('Operation:', item.operation)
  console.log('Level:', item.level)
  console.log('Question Object:', item.question)
  console.log('User Answer:', item.userAnswer)
  console.log('Correct Answer:', item.correctAnswer)
  console.log('Wrong Count:', item.wrongCount)
  console.log('Correct Streak:', item.correctStreak)
  console.log('Next Review At:', item.nextReviewAt)
  console.groupEnd()
}
</script>

<style scoped>
.wrong-questions-screen {
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

.back-btn, .clear-btn {
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

.back-btn:hover, .clear-btn:hover {
  transform: scale(1.1);
}

.clear-btn {
  font-size: 18px;
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

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 24px;
  color: #52C41A;
  margin: 0 0 8px 0;
}

.empty-desc {
  font-size: 16px;
  color: #73D13D;
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.stat-item {
  text-align: center;
  background: white;
  padding: 12px 24px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stat-item.secondary {
  background: #f5f5f5;
}

.stat-item.secondary .stat-value {
  color: #999;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #FF6B6B;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

.questions-by-op {
  margin-bottom: 24px;
}

.operation-section {
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--light-color, #FFF0F5);
}

.op-icon {
  font-size: 24px;
}

.op-name {
  font-size: 16px;
  font-weight: 700;
  color: #333;
}

.op-count {
  font-size: 14px;
  color: #999;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.question-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: var(--light-color, #FFF0F5);
  border-radius: 12px;
}

.question-display {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  min-width: 100px;
}

.answer-info {
  flex: 1;
  display: flex;
  gap: 12px;
  font-size: 14px;
}

.wrong-answer {
  color: #FF6B6B;
}

.correct-answer {
  color: #52C41A;
}

.review-status {
  display: flex;
  align-items: center;
  gap: 6px;
}

.streak-badge {
  background: #E8F5E9;
  color: #4CAF50;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
}

.wrong-count {
  background: #FFEBE9;
  color: #FF6B6B;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.waiting-count {
  font-size: 14px;
  color: #999;
  margin-top: 12px;
}

.more-indicator {
  text-align: center;
  font-size: 12px;
  color: #999;
  padding: 8px;
}

.practice-btn {
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

.practice-btn.princess {
  background: linear-gradient(135deg, #FF69B4, #FF1493);
  box-shadow: 0 8px 30px rgba(255, 105, 180, 0.4);
}

.practice-btn.prince {
  background: linear-gradient(135deg, #4A90D9, #1E90FF);
  box-shadow: 0 8px 30px rgba(74, 144, 217, 0.4);
}

.practice-btn:hover {
  transform: translateY(-3px);
}

.btn-icon {
  font-size: 24px;
}

@media (max-width: 500px) {
  .wrong-questions-screen {
    padding: 16px;
    padding-top: 60px;
  }

  .title {
    font-size: 18px;
  }

  .question-item {
    flex-wrap: wrap;
    gap: 8px;
  }

  .question-display {
    width: 100%;
    min-width: auto;
  }

  .answer-info {
    gap: 8px;
  }

  .practice-btn {
    padding: 16px 24px;
    font-size: 18px;
  }
}
</style>
