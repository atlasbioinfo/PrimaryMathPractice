<template>
  <div class="hidden-achievements">
    <p class="hidden-hint">{{ t.achievements?.hint || 'Unlock through special achievements!' }}</p>
    <div class="sticker-row hidden-row">
      <div
        v-for="achievement in hiddenAchievements"
        :key="achievement.id"
        class="sticker-card achievement-card"
        :class="{ earned: stickersStore.hasHiddenAchievement(achievement.id) }"
        @click="$emit('show-detail', achievement.id, 'hidden')"
      >
        <div class="sticker-icon">{{ stickersStore.hasHiddenAchievement(achievement.id) ? achievement.icon : '&#10067;' }}</div>
        <div class="sticker-name">{{ stickersStore.hasHiddenAchievement(achievement.id) ? (t.achievements?.[achievement.nameKey] || '???') : '???' }}</div>
        <div v-if="!stickersStore.hasHiddenAchievement(achievement.id)" class="lock-badge">
          &#x1F512;
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStickersStore } from '../../stores/stickers.js'
import { useLocaleStore } from '../../stores/locale.js'
import { hiddenAchievements } from '../../config/shop.js'

const stickersStore = useStickersStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)

defineEmits(['show-detail'])
</script>

<style scoped>
.hidden-achievements {
  padding: 10px 0;
}

.hidden-hint {
  font-size: 13px;
  color: #666;
  text-align: center;
  margin-bottom: 15px;
  padding: 10px;
  background: var(--light-color, #FFF0F5);
  border-radius: 10px;
}

.sticker-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.hidden-row {
  justify-content: center;
  gap: 10px;
}

.sticker-card {
  width: 70px;
  height: 80px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.sticker-card.earned {
  background: linear-gradient(135deg, var(--light-color, #FFF0F5), var(--secondary-color, #FFB6C1));
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
}

.sticker-card:not(.earned) {
  filter: grayscale(1);
  opacity: 0.5;
}

.sticker-card:hover {
  transform: scale(1.05);
}

.sticker-icon {
  font-size: 32px;
}

.sticker-name {
  font-size: 11px;
  color: #666;
  margin-top: 4px;
}

.lock-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 12px;
}

.achievement-card {
  min-width: 85px;
}

.achievement-card:not(.earned) .sticker-icon {
  font-size: 28px;
}
</style>
