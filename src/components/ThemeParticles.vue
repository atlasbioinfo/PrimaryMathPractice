<template>
  <div v-if="theme" class="theme-particles" :class="theme.id">
    <!-- Particles for all themes -->
    <span
      v-for="particle in particles"
      :key="particle.id"
      class="particle"
      :class="[`particle-${particle.type}`, theme.id]"
      :style="particle.style"
    >
      {{ particle.emoji }}
    </span>

    <!-- Theme-specific special effects -->
    <OceanEffects v-if="theme.id === 'bg_ocean'" />
    <SpaceEffects v-if="theme.id === 'bg_space' || theme.id === 'bg_galaxy'" />
    <AuroraEffects v-if="theme.id === 'bg_aurora'" />
    <ForestEffects v-if="theme.id === 'bg_forest'" />
    <FallingEffects v-if="theme.id === 'bg_sakura' || theme.id === 'bg_candy'" :theme-id="theme.id" />
    <CloudEffects v-if="theme.id === 'bg_sunset'" />
  </div>
</template>

<script setup>
import { useThemeParticles } from '../composables/useThemeParticles.js'
import OceanEffects from './particles/OceanEffects.vue'
import SpaceEffects from './particles/SpaceEffects.vue'
import AuroraEffects from './particles/AuroraEffects.vue'
import ForestEffects from './particles/ForestEffects.vue'
import FallingEffects from './particles/FallingEffects.vue'
import CloudEffects from './particles/CloudEffects.vue'

const { theme, particles } = useThemeParticles()
</script>

<style scoped>
.theme-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.particle {
  position: absolute;
  user-select: none;
  will-change: transform, opacity;
}

/* ========== OCEAN THEME ========== */
.particle.bg_ocean.particle-swim {
  animation: swimAround 12s infinite ease-in-out;
}

.particle.bg_ocean.particle-drift {
  animation: oceanDrift 15s infinite ease-in-out;
}

@keyframes swimAround {
  0%, 100% {
    transform: translateX(0) translateY(0) scaleX(1);
  }
  25% {
    transform: translateX(50px) translateY(-20px) scaleX(1);
  }
  50% {
    transform: translateX(100px) translateY(10px) scaleX(-1);
  }
  75% {
    transform: translateX(50px) translateY(-10px) scaleX(-1);
  }
}

@keyframes oceanDrift {
  0%, 100% {
    transform: translateX(0) translateY(0) rotate(0deg);
  }
  33% {
    transform: translateX(30px) translateY(-15px) rotate(10deg);
  }
  66% {
    transform: translateX(-20px) translateY(10px) rotate(-10deg);
  }
}

/* ========== SPACE/GALAXY THEME ========== */
.particle.bg_space.particle-twinkle,
.particle.bg_galaxy.particle-twinkle {
  animation: twinkle 3s infinite ease-in-out, floatSlow 20s infinite ease-in-out;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

@keyframes floatSlow {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-20px) translateX(15px); }
}

/* ========== FOREST THEME ========== */
.particle.bg_forest.particle-fall {
  animation: leafFall 12s infinite linear;
}

.particle.bg_forest.particle-flutter {
  animation: butterflyFlutter 8s infinite ease-in-out;
}

@keyframes leafFall {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0.8;
  }
  25% {
    transform: translateY(25vh) translateX(30px) rotate(90deg);
  }
  50% {
    transform: translateY(50vh) translateX(-20px) rotate(180deg);
  }
  75% {
    transform: translateY(75vh) translateX(40px) rotate(270deg);
  }
  100% {
    transform: translateY(110vh) translateX(10px) rotate(360deg);
    opacity: 0.3;
  }
}

@keyframes butterflyFlutter {
  0%, 100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  20% {
    transform: translateY(-30px) translateX(40px) rotate(10deg);
  }
  40% {
    transform: translateY(-10px) translateX(80px) rotate(-5deg);
  }
  60% {
    transform: translateY(-40px) translateX(50px) rotate(15deg);
  }
  80% {
    transform: translateY(-20px) translateX(20px) rotate(-10deg);
  }
}

/* ========== CANDY THEME ========== */
.particle.bg_candy.particle-fall-spin {
  animation: candyFall 10s infinite linear;
}

@keyframes candyFall {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(1);
    opacity: 0.9;
  }
  100% {
    transform: translateY(120vh) translateX(50px) rotate(720deg) scale(0.8);
    opacity: 0.5;
  }
}

/* ========== SUNSET THEME ========== */
.particle.bg_sunset.particle-float {
  animation: sunsetFloat 15s infinite ease-in-out;
}

@keyframes sunsetFloat {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-30px) translateX(40px);
    opacity: 0.9;
  }
}

/* ========== AURORA THEME ========== */
.particle.bg_aurora.particle-shimmer {
  animation: auroraShimmer 5s infinite ease-in-out, floatSlow 20s infinite ease-in-out;
}

@keyframes auroraShimmer {
  0%, 100% { opacity: 0.4; filter: brightness(1); }
  50% { opacity: 1; filter: brightness(1.5); }
}

/* ========== SAKURA THEME ========== */
.particle.bg_sakura.particle-fall-sway {
  animation: sakuraFall 12s infinite linear;
}

@keyframes sakuraFall {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0.9;
  }
  25% {
    transform: translateY(25vh) translateX(30px) rotate(45deg);
  }
  50% {
    transform: translateY(50vh) translateX(-20px) rotate(90deg);
  }
  75% {
    transform: translateY(75vh) translateX(40px) rotate(135deg);
  }
  100% {
    transform: translateY(110vh) translateX(10px) rotate(180deg);
    opacity: 0.4;
  }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .particle {
    animation: none !important;
  }
}
</style>
