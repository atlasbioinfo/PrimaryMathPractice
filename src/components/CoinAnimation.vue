<template>
  <div class="coin-animation-container" ref="containerRef">
    <div
      v-for="coin in activeCoins"
      :key="coin.id"
      class="flying-coin"
      :style="coin.style"
    >
      🪙
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue'

const props = defineProps({
  targetSelector: {
    type: String,
    default: '.coin-display'
  }
})

const containerRef = ref(null)
const activeCoins = reactive([])
let coinIdCounter = 0

function getTargetPosition() {
  const target = document.querySelector(props.targetSelector)
  if (!target) return { x: window.innerWidth / 2, y: 50 }

  const rect = target.getBoundingClientRect()
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  }
}

function triggerCoinAnimation(startX, startY, coinCount = 1, onComplete = null) {
  const targetPos = getTargetPosition()
  const coinsToAnimate = Math.min(coinCount, 10) // Cap at 10 coins for performance

  for (let i = 0; i < coinsToAnimate; i++) {
    const coin = {
      id: ++coinIdCounter,
      style: {
        left: `${startX}px`,
        top: `${startY}px`,
        '--target-x': `${targetPos.x - startX}px`,
        '--target-y': `${targetPos.y - startY}px`,
        animationDelay: `${i * 80}ms`
      }
    }

    activeCoins.push(coin)

    // Remove coin after animation
    setTimeout(() => {
      const index = activeCoins.findIndex(c => c.id === coin.id)
      if (index !== -1) {
        activeCoins.splice(index, 1)
      }

      // Call completion callback after last coin
      if (i === coinsToAnimate - 1 && onComplete) {
        onComplete()
      }
    }, 800 + i * 80)
  }
}

function triggerFromElement(element, coinCount = 1, onComplete = null) {
  const rect = element.getBoundingClientRect()
  const startX = rect.left + rect.width / 2
  const startY = rect.top + rect.height / 2
  triggerCoinAnimation(startX, startY, coinCount, onComplete)
}

function triggerFromCenter(coinCount = 1, onComplete = null) {
  const startX = window.innerWidth / 2
  const startY = window.innerHeight / 2
  triggerCoinAnimation(startX, startY, coinCount, onComplete)
}

function triggerSpread(centerX, centerY, coinCount = 5, onComplete = null) {
  const targetPos = getTargetPosition()
  const coinsToAnimate = Math.min(coinCount, 15)

  for (let i = 0; i < coinsToAnimate; i++) {
    // Random spread offset
    const spreadX = (Math.random() - 0.5) * 100
    const spreadY = (Math.random() - 0.5) * 100
    const startX = centerX + spreadX
    const startY = centerY + spreadY

    const coin = {
      id: ++coinIdCounter,
      style: {
        left: `${startX}px`,
        top: `${startY}px`,
        '--target-x': `${targetPos.x - startX}px`,
        '--target-y': `${targetPos.y - startY}px`,
        animationDelay: `${i * 50}ms`
      }
    }

    activeCoins.push(coin)

    setTimeout(() => {
      const index = activeCoins.findIndex(c => c.id === coin.id)
      if (index !== -1) {
        activeCoins.splice(index, 1)
      }

      if (i === coinsToAnimate - 1 && onComplete) {
        onComplete()
      }
    }, 700 + i * 50)
  }
}

// Cleanup on unmount
onUnmounted(() => {
  activeCoins.splice(0, activeCoins.length)
})

defineExpose({
  triggerCoinAnimation,
  triggerFromElement,
  triggerFromCenter,
  triggerSpread
})
</script>

<style scoped>
.coin-animation-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.flying-coin {
  position: absolute;
  font-size: 28px;
  animation: flyToTarget 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: var(--delay, 0ms);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

@keyframes flyToTarget {
  0% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    opacity: 1;
  }
  30% {
    transform: translate(
      calc(var(--target-x) * 0.3),
      calc(var(--target-y) * 0.3 - 30px)
    ) scale(1.3) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--target-x), var(--target-y)) scale(0.3) rotate(360deg);
    opacity: 0;
  }
}

/* Mobile - smaller coins */
@media (max-width: 500px) {
  .flying-coin {
    font-size: 22px;
  }
}
</style>
