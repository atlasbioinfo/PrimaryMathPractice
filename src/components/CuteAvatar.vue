<template>
  <div class="cute-avatar" :class="gender">
    <!-- Avatar Frame (if equipped) -->
    <div
      v-if="frame"
      class="avatar-frame"
      :style="{
        background: frame.gradient,
        borderWidth: `${frame.borderWidth}px`,
        width: `${size + 16}px`,
        height: `${size + 16}px`
      }"
      :class="{ animated: frame.animated }"
    >
      <span v-if="frame.decoration" class="frame-decoration">{{ frame.decoration }}</span>
    </div>
    <svg viewBox="0 0 100 100" :width="size" :height="size">
      <!-- Face -->
      <circle cx="50" cy="50" r="45" :fill="faceColor" />

      <!-- Blush -->
      <ellipse cx="25" cy="58" rx="8" ry="5" :fill="blushColor" opacity="0.6" />
      <ellipse cx="75" cy="58" rx="8" ry="5" :fill="blushColor" opacity="0.6" />

      <!-- Eyes -->
      <g class="eyes">
        <ellipse cx="35" cy="45" rx="8" ry="10" fill="#333" />
        <ellipse cx="65" cy="45" rx="8" ry="10" fill="#333" />
        <!-- Eye shine -->
        <circle cx="38" cy="42" r="3" fill="white" />
        <circle cx="68" cy="42" r="3" fill="white" />
      </g>

      <!-- Eyebrows for prince -->
      <g v-if="gender === 'prince'" class="eyebrows">
        <path d="M 27 32 Q 35 28 43 32" stroke="#5D4037" stroke-width="2" fill="none" />
        <path d="M 57 32 Q 65 28 73 32" stroke="#5D4037" stroke-width="2" fill="none" />
      </g>

      <!-- Eyelashes for princess -->
      <g v-if="gender === 'princess'" class="eyelashes">
        <path d="M 27 38 L 24 33" stroke="#333" stroke-width="1.5" />
        <path d="M 30 36 L 28 31" stroke="#333" stroke-width="1.5" />
        <path d="M 40 36 L 42 31" stroke="#333" stroke-width="1.5" />
        <path d="M 43 38 L 46 33" stroke="#333" stroke-width="1.5" />
        <path d="M 57 38 L 54 33" stroke="#333" stroke-width="1.5" />
        <path d="M 60 36 L 58 31" stroke="#333" stroke-width="1.5" />
        <path d="M 70 36 L 72 31" stroke="#333" stroke-width="1.5" />
        <path d="M 73 38 L 76 33" stroke="#333" stroke-width="1.5" />
      </g>

      <!-- Smile -->
      <path d="M 35 62 Q 50 75 65 62" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round" />

      <!-- Hair -->
      <g v-if="gender === 'princess'" class="hair-princess">
        <!-- Long wavy hair -->
        <path d="M 10 45 Q 5 20 30 10 Q 50 5 70 10 Q 95 20 90 45 Q 92 60 88 75 Q 85 90 75 95" :fill="hairColor" />
        <path d="M 10 45 Q 8 60 12 75 Q 15 90 25 95" :fill="hairColor" />
        <!-- Hair top -->
        <ellipse cx="50" cy="12" rx="30" ry="10" :fill="hairColor" />
        <!-- Cute hair accessories -->
        <circle cx="20" cy="30" r="6" fill="#FF69B4" />
        <circle cx="20" cy="30" r="3" fill="#FFB6C1" />
      </g>

      <g v-if="gender === 'prince'" class="hair-prince">
        <!-- Short spiky hair -->
        <path d="M 15 35 Q 10 15 35 8 Q 50 5 65 8 Q 90 15 85 35" :fill="hairColor" />
        <path d="M 25 15 L 30 5 L 38 18" :fill="hairColor" />
        <path d="M 45 12 L 50 2 L 55 12" :fill="hairColor" />
        <path d="M 62 15 L 70 5 L 75 18" :fill="hairColor" />
      </g>

      <!-- Crown/Tiara -->
      <g v-if="gender === 'princess'" class="crown">
        <path d="M 30 8 L 35 -5 L 42 5 L 50 -8 L 58 5 L 65 -5 L 70 8" fill="#FFD700" stroke="#FFA500" stroke-width="1" />
        <circle cx="50" cy="-3" r="3" fill="#FF69B4" />
        <circle cx="38" cy="0" r="2" fill="#87CEEB" />
        <circle cx="62" cy="0" r="2" fill="#87CEEB" />
      </g>

      <g v-if="gender === 'prince'" class="crown">
        <path d="M 32 5 L 35 -8 L 42 2 L 50 -12 L 58 2 L 65 -8 L 68 5" fill="#FFD700" stroke="#FFA500" stroke-width="1" />
        <circle cx="50" cy="-6" r="3" fill="#4A90D9" />
        <circle cx="39" cy="-2" r="2" fill="#4A90D9" />
        <circle cx="61" cy="-2" r="2" fill="#4A90D9" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  gender: {
    type: String,
    default: 'princess',
    validator: (v) => ['princess', 'prince'].includes(v)
  },
  size: {
    type: Number,
    default: 100
  },
  frame: {
    type: Object,
    default: null
  }
})

const faceColor = computed(() => props.gender === 'princess' ? '#FFECD2' : '#FFE4C4')
const blushColor = computed(() => props.gender === 'princess' ? '#FFB6C1' : '#FFCBA4')
const hairColor = computed(() => props.gender === 'princess' ? '#8B4513' : '#5D4037')
</script>

<style scoped>
.cute-avatar {
  display: inline-block;
  animation: float 3s ease-in-out infinite;
  position: relative;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.cute-avatar svg {
  overflow: visible;
  position: relative;
  z-index: 2;
}

.eyes {
  animation: blink 4s infinite;
}

@keyframes blink {
  0%, 96%, 100% { transform: scaleY(1); }
  98% { transform: scaleY(0.1); }
}

/* Avatar Frame */
.avatar-frame {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border-style: solid;
  z-index: 1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.avatar-frame.animated {
  animation: frameShimmer 2s ease-in-out infinite;
}

@keyframes frameShimmer {
  0%, 100% { filter: brightness(1); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); }
  50% { filter: brightness(1.2); box-shadow: 0 4px 25px rgba(255, 215, 0, 0.4); }
}

.frame-decoration {
  position: absolute;
  top: -10px;
  right: -5px;
  font-size: 20px;
  animation: decorBounce 1.5s ease-in-out infinite;
  z-index: 3;
}

@keyframes decorBounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(10deg); }
}
</style>
