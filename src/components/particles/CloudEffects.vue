<template>
  <!-- Sunset: Floating clouds -->
  <div class="clouds">
    <span
      v-for="i in 5"
      :key="'cloud-' + i"
      class="cloud"
      :style="getCloudStyle(i)"
    >&#x2601;&#xFE0F;</span>
  </div>
</template>

<script setup>
import { getCloudStyle } from '../../config/themeParticles.js'
</script>

<style scoped>
.clouds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cloud {
  position: absolute;
  left: -100px;
  animation: cloudDrift 30s infinite linear;
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
}

@keyframes cloudDrift {
  0% { transform: translateX(-100px); }
  100% { transform: translateX(calc(100vw + 100px)); }
}

@media (prefers-reduced-motion: reduce) {
  .cloud {
    animation: none !important;
  }
}
</style>
