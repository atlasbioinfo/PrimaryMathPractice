<template>
  <!-- Sakura/Candy: Extra falling petals -->
  <div class="falling-items">
    <span
      v-for="i in 20"
      :key="'fall-' + i"
      class="falling-item"
      :style="getFallingStyle(i)"
    >
      {{ getEmoji(i) }}
    </span>
  </div>
</template>

<script setup>
import { getFallingStyle } from '../../config/themeParticles.js'

const props = defineProps({
  themeId: {
    type: String,
    required: true
  }
})

function getEmoji(index) {
  if (props.themeId === 'bg_sakura') {
    return index % 3 === 0 ? '\u{1F338}' : '\u{1F4AE}'
  }
  return index % 2 === 0 ? '\u{1F36C}' : '\u{1F36D}'
}
</script>

<style scoped>
.falling-items {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.falling-item {
  position: absolute;
  top: -50px;
  animation: fallingItem 12s infinite linear;
}

@keyframes fallingItem {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0.8;
  }
  25% {
    transform: translateY(25vh) translateX(40px) rotate(90deg);
  }
  50% {
    transform: translateY(50vh) translateX(-30px) rotate(180deg);
  }
  75% {
    transform: translateY(75vh) translateX(50px) rotate(270deg);
  }
  100% {
    transform: translateY(calc(100vh + 50px)) translateX(0) rotate(360deg);
    opacity: 0.3;
  }
}

@media (prefers-reduced-motion: reduce) {
  .falling-item {
    animation: none !important;
  }
}

@media (max-width: 768px) {
  .falling-items .falling-item:nth-child(n+10) {
    display: none;
  }
}
</style>
