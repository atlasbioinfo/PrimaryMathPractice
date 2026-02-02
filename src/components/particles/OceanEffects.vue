<template>
  <!-- Ocean: Waves at bottom -->
  <div class="ocean-waves">
    <div class="wave wave-1"></div>
    <div class="wave wave-2"></div>
    <div class="wave wave-3"></div>
  </div>

  <!-- Ocean: Bubbles -->
  <div class="bubbles">
    <span
      v-for="i in 15"
      :key="'bubble-' + i"
      class="bubble"
      :style="getBubbleStyle(i)"
    ></span>
  </div>
</template>

<script setup>
import { getBubbleStyle } from '../../config/themeParticles.js'
</script>

<style scoped>
.ocean-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: linear-gradient(transparent, rgba(144, 224, 239, 0.3));
  border-radius: 50% 50% 0 0;
  animation: waveMotion 8s infinite ease-in-out;
}

.wave-1 { animation-delay: 0s; opacity: 0.4; }
.wave-2 { animation-delay: -2s; opacity: 0.3; height: 80%; }
.wave-3 { animation-delay: -4s; opacity: 0.2; height: 60%; }

@keyframes waveMotion {
  0%, 100% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(2%) translateY(-10px); }
}

.bubbles {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bubble {
  position: absolute;
  bottom: -20px;
  width: var(--size, 8px);
  height: var(--size, 8px);
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.2));
  border-radius: 50%;
  animation: bubbleRise 6s infinite ease-in;
}

@keyframes bubbleRise {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-50vh) translateX(20px) scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100vh) translateX(-10px) scale(0.8);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wave,
  .bubble {
    animation: none !important;
  }
}

@media (max-width: 768px) {
  .bubbles .bubble:nth-child(n+8) {
    display: none;
  }
}
</style>
