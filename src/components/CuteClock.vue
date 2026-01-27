<template>
  <div class="cute-clock" :class="{ urgent: timeLeft <= 30 }">
    <span class="clock-emoji">⏰</span>
  </div>
</template>

<script setup>
defineProps({
  timeLeft: {
    type: Number,
    default: 180
  }
})
</script>

<style scoped>
.cute-clock {
  display: flex;
  align-items: center;
  justify-content: center;
}

.clock-emoji {
  font-size: 28px;
  animation: gentleBob 2s ease-in-out infinite;
  filter: drop-shadow(0 2px 4px rgba(255, 105, 180, 0.3));
}

.cute-clock.urgent .clock-emoji {
  animation: urgentShake 0.3s ease-in-out infinite;
  filter: drop-shadow(0 2px 6px rgba(255, 71, 87, 0.5));
}

@keyframes gentleBob {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-2px) scale(1.05); }
}

@keyframes urgentShake {
  0%, 100% { transform: rotate(-8deg) scale(1.1); }
  50% { transform: rotate(8deg) scale(1.1); }
}

/* Responsive */
@media (max-width: 500px) {
  .clock-emoji {
    font-size: 24px;
  }
}
</style>
