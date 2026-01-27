<template>
  <div class="floating-decorations">
    <span
      v-for="item in decorations"
      :key="item.id"
      class="floating-item"
      :style="item.style"
    >
      {{ item.emoji }}
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const decorations = ref([])

const mathSymbols = ['+', '−', '×', '÷', '=', '1', '2', '3', '4', '5', '🔢', '📐']

function generateDecorations() {
  const themeDecos = userStore.theme.decorations
  const allEmojis = [...themeDecos, ...mathSymbols]
  const items = []

  for (let i = 0; i < 25; i++) {
    const emoji = allEmojis[Math.floor(Math.random() * allEmojis.length)]
    const isMath = mathSymbols.includes(emoji)

    items.push({
      id: i,
      emoji,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${isMath ? 18 + Math.random() * 16 : 22 + Math.random() * 22}px`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${15 + Math.random() * 15}s`,
        opacity: 0.25 + Math.random() * 0.35
      }
    })
  }

  decorations.value = items
}

watch(() => userStore.theme, () => {
  generateDecorations()
}, { deep: true })

onMounted(() => {
  generateDecorations()
})
</script>

<style scoped>
.floating-decorations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.floating-item {
  position: absolute;
  animation: floatAround 20s infinite ease-in-out;
  user-select: none;
}

@keyframes floatAround {
  0%, 100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  25% {
    transform: translateY(-30px) translateX(20px) rotate(10deg);
  }
  50% {
    transform: translateY(-10px) translateX(-20px) rotate(-5deg);
  }
  75% {
    transform: translateY(-40px) translateX(10px) rotate(15deg);
  }
}
</style>
