<template>
  <div
    class="coin-display"
    :class="{ large: size === 'large', clickable: clickable }"
    @click="handleClick"
    ref="coinDisplayRef"
  >
    <span class="coin-icon">🪙</span>
    <span class="coin-amount" :class="{ animating: isAnimating }">
      {{ displayAmount }}
    </span>
    <span v-if="showPlus && pendingCoins > 0" class="coin-plus">
      +{{ pendingCoins }}
    </span>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useCoinsStore } from '../stores/coins'

const props = defineProps({
  size: {
    type: String,
    default: 'normal', // 'normal' or 'large'
    validator: v => ['normal', 'large'].includes(v)
  },
  animated: {
    type: Boolean,
    default: true
  },
  clickable: {
    type: Boolean,
    default: false
  },
  showPlus: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const coinsStore = useCoinsStore()
const coinDisplayRef = ref(null)

const displayAmount = ref(coinsStore.balance)
const isAnimating = ref(false)
const pendingCoins = ref(0)

// Animate coin count changes
watch(() => coinsStore.balance, (newVal, oldVal) => {
  if (!props.animated) {
    displayAmount.value = newVal
    return
  }

  const diff = newVal - oldVal
  if (diff > 0) {
    pendingCoins.value = diff
    isAnimating.value = true

    // Animate counting up
    const duration = Math.min(1000, diff * 50) // Cap at 1 second
    const startTime = Date.now()
    const startVal = displayAmount.value

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      displayAmount.value = Math.round(startVal + diff * easeProgress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        displayAmount.value = newVal
        isAnimating.value = false
        pendingCoins.value = 0
      }
    }

    requestAnimationFrame(animate)
  } else {
    displayAmount.value = newVal
  }
})

function handleClick() {
  if (props.clickable) {
    emit('click')
  }
}

// Expose ref for coin animation targeting
defineExpose({
  getElement: () => coinDisplayRef.value
})

onMounted(() => {
  displayAmount.value = coinsStore.balance
})
</script>

<style scoped>
.coin-display {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #FFF9E6, #FFE4B5);
  border: 2px solid #FFD700;
  border-radius: 20px;
  padding: 6px 14px;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
  user-select: none;
}

.coin-display.large {
  padding: 10px 20px;
  border-radius: 24px;
  gap: 8px;
}

.coin-display.clickable {
  cursor: pointer;
  transition: all 0.2s;
}

.coin-display.clickable:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
}

.coin-display.clickable:active {
  transform: scale(0.98);
}

.coin-icon {
  font-size: 20px;
  animation: coinSpin 3s ease-in-out infinite;
}

.coin-display.large .coin-icon {
  font-size: 28px;
}

@keyframes coinSpin {
  0%, 100% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
}

.coin-amount {
  font-size: 16px;
  font-weight: 700;
  color: #B8860B;
  min-width: 30px;
  text-align: center;
}

.coin-display.large .coin-amount {
  font-size: 22px;
  min-width: 40px;
}

.coin-amount.animating {
  animation: coinPulse 0.3s ease;
}

@keyframes coinPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); color: #FFD700; }
}

.coin-plus {
  font-size: 14px;
  font-weight: 700;
  color: #32CD32;
  animation: plusBounce 0.5s ease;
}

.coin-display.large .coin-plus {
  font-size: 18px;
}

@keyframes plusBounce {
  0% { transform: translateY(0); opacity: 0; }
  50% { transform: translateY(-5px); opacity: 1; }
  100% { transform: translateY(0); opacity: 1; }
}

/* Mobile */
@media (max-width: 500px) {
  .coin-display {
    padding: 4px 10px;
    gap: 4px;
  }

  .coin-icon {
    font-size: 16px;
  }

  .coin-amount {
    font-size: 14px;
    min-width: 24px;
  }

  .coin-plus {
    font-size: 12px;
  }

  .coin-display.large {
    padding: 8px 16px;
  }

  .coin-display.large .coin-icon {
    font-size: 22px;
  }

  .coin-display.large .coin-amount {
    font-size: 18px;
  }
}
</style>
