<template>
  <div
    :ref="(el) => setCardRef(el)"
    class="level-card"
    :class="{
      locked: isLocked,
      completed: isCompleted,
      focused: isFocused
    }"
    role="option"
    :aria-selected="isFocused"
    :aria-disabled="isLocked"
    tabindex="0"
    @click="$emit('select')"
    @keydown="$emit('keydown', $event)"
    @focus="$emit('focus')"
  >
    <div v-if="isLocked" class="lock-overlay" :class="{ purchasable: unlockPrice }">
      <span class="lock-icon">{{ lockIcon }}</span>
      <div v-if="unlockPrice" class="unlock-price">
        <CoinIcon :size="14" />
        {{ unlockPrice }}
      </div>
    </div>
    <div v-if="isCompleted" class="star-badge">{{ starIcon }}</div>

    <div class="level-number">{{ levelLabel }}</div>
    <div class="level-icon">{{ icon }}</div>
    <div class="level-name">{{ name }}</div>
    <div class="level-desc">{{ description }}</div>

    <div v-if="score" class="level-score">
      {{ bestLabel }}: {{ score.score }}/10
      ({{ score.accuracy }}%)
    </div>
  </div>
</template>

<script setup>
import CoinIcon from '../CoinIcon.vue'

defineProps({
  level: { type: Number, required: true },
  icon: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  levelLabel: { type: String, required: true },
  bestLabel: { type: String, required: true },
  isLocked: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  isFocused: { type: Boolean, default: false },
  unlockPrice: { type: Number, default: null },
  score: { type: Object, default: null },
  setCardRef: { type: Function, required: true }
})

defineEmits(['select', 'keydown', 'focus'])

const lockIcon = '🔒'
const starIcon = '⭐'
</script>

<style scoped>
.level-card {
  background: white;
  border-radius: 20px;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  border: 2px solid var(--secondary-color, #FFB6C1);
  overflow: hidden;
}

.level-card:hover:not(.locked),
.level-card:focus:not(.locked),
.level-card.focused:not(.locked) {
  transform: translateY(-8px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.15);
  border-color: var(--primary-color, #FF69B4);
  outline: none;
}

.level-card:focus-visible {
  outline: 3px solid var(--accent-color, #FF1493);
  outline-offset: 2px;
}

.level-card.locked {
  opacity: 0.6;
  cursor: not-allowed;
}

.level-card.completed {
  background: linear-gradient(135deg, var(--light-color, #FFF0F5), white);
  border-color: var(--primary-color, #FF69B4);
}

.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 18px;
  z-index: 10;
  cursor: default;
}

.lock-overlay.purchasable {
  cursor: pointer;
  transition: background 0.3s;
}

.lock-overlay.purchasable:hover {
  background: rgba(0,0,0,0.4);
}

.lock-icon {
  font-size: 40px;
}

.unlock-price {
  display: flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, #FFF9E6, #FFE4B5);
  border: 2px solid #FFD700;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #B8860B;
}

.star-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 30px;
  animation: pulse 1.5s infinite;
  z-index: 5;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.level-number {
  font-size: 14px;
  color: #999;
  margin-bottom: 10px;
}

.level-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.level-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.level-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.level-score {
  font-size: 12px;
  color: var(--primary-color, #FF69B4);
  background: var(--light-color, #FFF0F5);
  padding: 5px 10px;
  border-radius: 10px;
  display: inline-block;
}

/* Mobile */
@media (max-width: 500px) {
  .level-card {
    padding: 16px 12px;
    border-radius: 16px;
  }

  .lock-icon {
    font-size: 32px;
  }

  .star-badge {
    font-size: 24px;
    top: -3px;
    right: -3px;
  }

  .level-number {
    font-size: 12px;
    margin-bottom: 6px;
  }

  .level-icon {
    font-size: 36px;
    margin-bottom: 6px;
  }

  .level-name {
    font-size: 14px;
    margin-bottom: 4px;
  }

  .level-desc {
    font-size: 11px;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .level-score {
    font-size: 10px;
    padding: 4px 8px;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .level-card {
    padding: 12px 10px;
  }

  .level-icon {
    font-size: 30px;
  }

  .level-name {
    font-size: 13px;
  }

  .level-desc {
    font-size: 10px;
  }
}
</style>
