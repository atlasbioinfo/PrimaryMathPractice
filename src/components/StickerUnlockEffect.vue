<template>
  <Teleport to="body">
    <Transition name="sticker-unlock">
      <div v-if="show" class="sticker-unlock-overlay" @click="close">
        <div class="sticker-unlock-container" @click.stop>
          <!-- Background particles -->
          <div class="particle-container">
            <span
              v-for="i in 20"
              :key="i"
              class="particle"
              :style="getParticleStyle(i)"
            >{{ getParticleEmoji(i) }}</span>
          </div>

          <!-- Glow effect -->
          <div class="glow-ring"></div>
          <div class="glow-ring delay-1"></div>
          <div class="glow-ring delay-2"></div>

          <!-- Main sticker -->
          <div class="sticker-showcase">
            <div class="sticker-icon-large">{{ currentSticker?.icon }}</div>
            <div class="shine-effect"></div>
          </div>

          <!-- Title -->
          <h2 class="unlock-title">{{ title }}</h2>
          <p class="sticker-name">{{ currentSticker?.name }}</p>

          <!-- Description -->
          <p v-if="currentSticker?.description" class="sticker-desc">
            {{ currentSticker.description }}
          </p>

          <!-- Navigation for multiple stickers -->
          <div v-if="stickers.length > 1" class="sticker-nav">
            <span
              v-for="(_, index) in stickers"
              :key="index"
              class="nav-dot"
              :class="{ active: index === currentIndex }"
              @click="currentIndex = index"
            ></span>
          </div>

          <!-- Close button -->
          <button class="close-btn" @click="close">
            {{ closeText }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useSound } from '../composables/useSound'
import { useConfetti } from '../composables/useConfetti'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  stickers: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: 'New Sticker!'
  },
  closeText: {
    type: String,
    default: 'Awesome!'
  }
})

const emit = defineEmits(['close'])

const { playStickerSound } = useSound()
const { starBurst } = useConfetti()

const currentIndex = ref(0)

const currentSticker = computed(() => props.stickers[currentIndex.value])

const particleEmojis = ['✨', '⭐', '🌟', '💫', '🎉', '🎊', '💖', '🌈', '🦋', '🌸']

function getParticleStyle(i) {
  const angle = (i / 20) * 360
  const distance = 80 + Math.random() * 60
  const delay = Math.random() * 0.5
  const duration = 1.5 + Math.random() * 1
  const size = 16 + Math.random() * 12

  return {
    '--angle': `${angle}deg`,
    '--distance': `${distance}px`,
    '--delay': `${delay}s`,
    '--duration': `${duration}s`,
    '--size': `${size}px`
  }
}

function getParticleEmoji(i) {
  return particleEmojis[i % particleEmojis.length]
}

function close() {
  emit('close')
}

watch(() => props.show, (newVal) => {
  if (newVal && props.stickers.length > 0) {
    currentIndex.value = 0
    playStickerSound()
    setTimeout(() => starBurst(), 300)
  }
})

// Auto-advance for multiple stickers
watch(currentIndex, () => {
  if (props.show && props.stickers.length > 1) {
    playStickerSound()
  }
})
</script>

<style scoped>
.sticker-unlock-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.sticker-unlock-container {
  position: relative;
  background: linear-gradient(145deg, #fff 0%, #fff5f8 100%);
  border-radius: 32px;
  padding: 48px 40px;
  text-align: center;
  max-width: 360px;
  width: 90%;
  box-shadow:
    0 0 0 4px rgba(255, 105, 180, 0.3),
    0 25px 80px rgba(255, 105, 180, 0.4),
    0 0 120px rgba(255, 182, 193, 0.3);
  animation: containerPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes containerPop {
  0% {
    transform: scale(0.5) rotate(-5deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.05) rotate(2deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

/* Particle effects */
.particle-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  font-size: var(--size);
  animation: particleExplode var(--duration) ease-out infinite;
  animation-delay: var(--delay);
}

@keyframes particleExplode {
  0% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(0);
    opacity: 1;
  }
  20% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--distance) * 0.3)) scale(1);
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(var(--distance)) scale(0.5);
    opacity: 0;
  }
}

/* Glow rings */
.glow-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid rgba(255, 105, 180, 0.4);
  transform: translate(-50%, -70%);
  animation: glowPulse 2s ease-out infinite;
}

.glow-ring.delay-1 {
  animation-delay: 0.3s;
  border-color: rgba(255, 182, 193, 0.4);
}

.glow-ring.delay-2 {
  animation-delay: 0.6s;
  border-color: rgba(255, 223, 186, 0.4);
}

@keyframes glowPulse {
  0% {
    transform: translate(-50%, -70%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -70%) scale(2);
    opacity: 0;
  }
}

/* Sticker showcase */
.sticker-showcase {
  position: relative;
  margin-bottom: 24px;
}

.sticker-icon-large {
  font-size: 100px;
  line-height: 1;
  animation: stickerBounce 1s ease infinite;
  filter: drop-shadow(0 8px 20px rgba(255, 105, 180, 0.4));
}

@keyframes stickerBounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-15px) scale(1.05);
  }
}

/* Shine effect */
.shine-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  transform: translate(-50%, -50%);
  background: linear-gradient(
    135deg,
    transparent 40%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 60%
  );
  border-radius: 50%;
  animation: shine 2s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shine {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
    opacity: 0;
  }
}

/* Text styles */
.unlock-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color, #FF69B4);
  margin: 0 0 8px 0;
  text-shadow: 0 2px 10px rgba(255, 105, 180, 0.3);
}

.sticker-name {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.sticker-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

/* Navigation dots */
.sticker-nav {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.nav-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ddd;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-dot.active {
  background: var(--primary-color, #FF69B4);
  transform: scale(1.3);
}

.nav-dot:hover {
  background: var(--secondary-color, #FFB6C1);
}

/* Close button */
.close-btn {
  background: linear-gradient(135deg, var(--primary-color, #FF69B4), var(--accent-color, #FF1493));
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 25px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(255, 105, 180, 0.4);
}

.close-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(255, 105, 180, 0.5);
}

.close-btn:active {
  transform: scale(0.98);
}

/* Transition */
.sticker-unlock-enter-active {
  animation: overlayIn 0.3s ease;
}

.sticker-unlock-leave-active {
  animation: overlayOut 0.3s ease;
}

@keyframes overlayIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes overlayOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Mobile */
@media (max-width: 500px) {
  .sticker-unlock-container {
    padding: 36px 28px;
    border-radius: 24px;
  }

  .sticker-icon-large {
    font-size: 80px;
  }

  .unlock-title {
    font-size: 20px;
  }

  .sticker-name {
    font-size: 18px;
  }

  .close-btn {
    padding: 12px 32px;
    font-size: 16px;
  }

  .glow-ring {
    width: 120px;
    height: 120px;
  }
}
</style>
