<template>
  <div class="question-review">
    <div
      v-for="(answer, index) in answers"
      :key="index"
      class="review-item"
      :class="{ correct: answer.isCorrect, wrong: !answer.isCorrect }"
    >
      <div class="review-number">{{ index + 1 }}</div>
      <div class="review-question">
        <template v-if="!isFraction">
          {{ answer.question.num1 }}
          {{ operationSymbol }}
          {{ answer.question.num2 }}
          =
        </template>
        <template v-else>
          <span class="mini-fraction">
            {{ answer.question.fraction1.numerator }}/{{ answer.question.fraction1.denominator }}
          </span>
          {{ answer.question.operation }}
          <template v-if="answer.question.fraction2">
            <span class="mini-fraction">
              {{ answer.question.fraction2.numerator }}/{{ answer.question.fraction2.denominator }}
            </span>
          </template>
          <template v-if="answer.question.integer">
            {{ answer.question.integer }}
          </template>
          =
        </template>
      </div>
      <div class="review-answer">
        <span class="user-answer" :class="{ strike: !answer.isCorrect }">
          <template v-if="!isFraction">
            {{ answer.userAnswer }}
          </template>
          <template v-else>
            {{ formatFraction(answer.userAnswer) }}
          </template>
        </span>
        <span v-if="!answer.isCorrect" class="correct-answer">
          →
          <template v-if="!isFraction">
            {{ answer.correctAnswer }}
          </template>
          <template v-else>
            {{ formatFraction(answer.correctAnswer) }}
          </template>
        </span>
      </div>
      <div class="review-status">
        <span v-if="answer.isCorrect" class="status-icon correct">✓</span>
        <span v-else class="status-icon wrong">✗</span>
        <span v-if="answer.retried" class="retried-badge">重试</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { operationConfig } from '../config/levels'

const props = defineProps({
  answers: { type: Array, required: true },
  operation: { type: String, required: true }
})

const operationInfo = computed(() => operationConfig[props.operation])
const isFraction = computed(() => operationInfo.value.isFraction)
const operationSymbol = computed(() => operationInfo.value.symbol)

function formatFraction(frac) {
  if (!frac || typeof frac !== 'object') return frac
  return `${frac.numerator}/${frac.denominator}`
}
</script>

<style scoped>
.question-review {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 12px;
}

.review-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-bottom: 8px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid;
}

.review-item.correct {
  border-left-color: #52C41A;
}

.review-item.wrong {
  border-left-color: #FF6B6B;
}

.review-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: #666;
}

.review-question {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.mini-fraction {
  font-weight: bold;
}

.review-answer {
  font-size: 14px;
}

.user-answer {
  font-weight: bold;
}

.user-answer.strike {
  text-decoration: line-through;
  color: #FF6B6B;
}

.correct-answer {
  color: #52C41A;
  font-weight: bold;
  margin-left: 5px;
}

.review-status {
  display: flex;
  align-items: center;
  gap: 5px;
}

.status-icon {
  font-size: 18px;
  font-weight: bold;
}

.status-icon.correct {
  color: #52C41A;
}

.status-icon.wrong {
  color: #FF6B6B;
}

.retried-badge {
  font-size: 10px;
  background: #FFF3CD;
  color: #856404;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
