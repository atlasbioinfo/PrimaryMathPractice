<template>
  <!-- Aurora: Northern lights effect -->
  <div class="aurora-container">
    <div class="aurora aurora-1"></div>
    <div class="aurora aurora-2"></div>
    <div class="aurora aurora-3"></div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.aurora-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  overflow: hidden;
}

.aurora {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(28, 181, 224, 0.15) 20%,
    rgba(100, 255, 218, 0.2) 40%,
    rgba(155, 89, 182, 0.15) 60%,
    transparent 80%
  );
  animation: auroraSway 15s infinite ease-in-out;
  transform-origin: center top;
}

.aurora-1 { animation-delay: 0s; }
.aurora-2 { animation-delay: -5s; opacity: 0.7; }
.aurora-3 { animation-delay: -10s; opacity: 0.5; }

@keyframes auroraSway {
  0%, 100% {
    transform: skewX(0deg) translateX(0);
  }
  25% {
    transform: skewX(5deg) translateX(5%);
  }
  75% {
    transform: skewX(-5deg) translateX(-5%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .aurora {
    animation: none !important;
  }
}
</style>
