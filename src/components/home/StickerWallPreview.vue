<template>
  <FeatureCard type="sticker" icon="🏆" :title="t.home.stickerWall" @click="$emit('click')">
    <!-- Show earned stickers or progress -->
    <div v-if="earnedStickersDisplay.length > 0" class="sticker-mini-grid earned-grid">
      <span
        v-for="sticker in earnedStickersDisplay"
        :key="sticker.id"
        class="mini-sticker earned"
      >{{ sticker.icon }}</span>
      <span v-if="stickersStore.getEarnedCount() > 12" class="more-stickers">
        +{{ stickersStore.getEarnedCount() - 12 }}
      </span>
    </div>
    <div v-else class="sticker-mini-grid">
      <span
        v-for="sticker in allStickersPreview"
        :key="sticker.id"
        class="mini-sticker"
      >{{ sticker.icon }}</span>
    </div>
    <!-- Progress bar -->
    <div class="sticker-progress">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: progressPercent }"
        ></div>
      </div>
      <span class="progress-text">{{ stickersStore.getTotalEarnedCount() }}/{{ stickersStore.getTotalPossibleCount() }}</span>
    </div>
  </FeatureCard>
</template>

<script setup>
import { computed } from 'vue'
import { useStickersStore } from '../../stores/stickers'
import { useLocaleStore } from '../../stores/locale'
import FeatureCard from '../FeatureCard.vue'

defineEmits(['click'])

const stickersStore = useStickersStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)

const earnedStickersDisplay = computed(() => {
  return stickersStore.allStickers
    .filter(s => stickersStore.hasSticker(s.id))
    .slice(0, 12)
})

const allStickersPreview = computed(() => {
  return stickersStore.allStickers.slice(0, 10)
})

const progressPercent = computed(() => {
  const earned = stickersStore.getTotalEarnedCount()
  const total = stickersStore.getTotalPossibleCount()
  return `${(earned / total) * 100}%`
})
</script>

<style scoped>
.sticker-mini-grid {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.sticker-mini-grid.earned-grid {
  gap: 4px;
}

.more-stickers {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 10px;
  font-weight: 600;
  color: var(--primary-color, #FF69B4);
  background: var(--light-color, #FFF0F5);
  border-radius: 50%;
}

.sticker-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #eee;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color, #FF69B4), var(--accent-color, #FF1493));
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 11px;
  font-weight: 600;
  color: var(--primary-color, #FF69B4);
  min-width: 40px;
  text-align: right;
}

.mini-sticker {
  font-size: 18px;
  opacity: 0.3;
  filter: grayscale(1);
}

.mini-sticker.earned {
  opacity: 1;
  filter: none;
}

@media (max-width: 500px) {
  .sticker-mini-grid {
    gap: 4px;
  }

  .mini-sticker {
    font-size: 16px;
  }
}
</style>
