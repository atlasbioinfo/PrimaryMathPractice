<template>
  <!-- Space/Galaxy: Twinkling stars background -->
  <div class="stars-container">
    <span
      v-for="i in 30"
      :key="'star-' + i"
      class="star"
      :style="getStarStyle(i)"
    ></span>
  </div>
</template>

<script setup>
import { getStarStyle } from '../../config/themeParticles.js'
</script>

<style scoped>
.stars-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  width: var(--size, 3px);
  height: var(--size, 3px);
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 6px 2px rgba(255,255,255,0.5);
  animation: starTwinkle 2s infinite ease-in-out;
}

@keyframes starTwinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}

@media (prefers-reduced-motion: reduce) {
  .star {
    animation: none !important;
  }
}

@media (max-width: 768px) {
  .stars-container .star:nth-child(n+15) {
    display: none;
  }
}
</style>
