<template>
  <div class="encouragement-animation" :class="type">
    <span
      v-for="i in 10"
      :key="i"
      class="particle"
      :style="particleStyle(i)"
    >
      {{ emoji }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, required: true },
  emoji: { type: String, required: true }
})

function particleStyle(i) {
  const angle = (i / 10) * 360
  const delay = (i / 10) * 0.5
  return {
    '--angle': `${angle}deg`,
    '--delay': `${delay}s`
  }
}
</script>

<style scoped>
.encouragement-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  pointer-events: none;
}

.particle {
  position: absolute;
  font-size: 24px;
  animation: explode 2s ease-out infinite;
  animation-delay: var(--delay);
}

@keyframes explode {
  0% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(0);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-150px) scale(1);
    opacity: 0;
  }
}

@media (max-width: 500px) {
  .encouragement-animation {
    width: 150px;
    height: 150px;
  }

  .particle {
    font-size: 18px;
  }
}
</style>
