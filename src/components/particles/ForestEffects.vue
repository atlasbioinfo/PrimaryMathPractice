<template>
  <!-- Forest: Fireflies -->
  <div class="fireflies">
    <span
      v-for="i in 12"
      :key="'firefly-' + i"
      class="firefly"
      :style="getFireflyStyle(i)"
    ></span>
  </div>
</template>

<script setup>
import { getFireflyStyle } from '../../config/themeParticles.js'
</script>

<style scoped>
.fireflies {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.firefly {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #ffff88;
  border-radius: 50%;
  box-shadow: 0 0 10px 4px rgba(255, 255, 136, 0.6), 0 0 20px 8px rgba(255, 255, 136, 0.3);
  animation: fireflyGlow 4s infinite ease-in-out, fireflyMove 10s infinite ease-in-out;
}

@keyframes fireflyGlow {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

@keyframes fireflyMove {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(30px, -20px); }
  50% { transform: translate(-20px, -40px); }
  75% { transform: translate(40px, -10px); }
}

@media (prefers-reduced-motion: reduce) {
  .firefly {
    animation: none !important;
  }
}

@media (max-width: 768px) {
  .fireflies .firefly:nth-child(n+6) {
    display: none;
  }
}
</style>
