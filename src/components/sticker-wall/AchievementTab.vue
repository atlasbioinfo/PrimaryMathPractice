<template>
  <div class="operation-sections">
    <div
      v-for="op in operations"
      :key="op.key"
      class="operation-section"
    >
      <h3 class="section-title">
        <span class="op-icon">{{ op.icon }}</span>
        {{ t.operations[op.key] }}
      </h3>
      <div class="sticker-row">
        <StickerCard
          v-for="type in stickerTypes"
          :key="`${op.key}_${type.key}`"
          :icon="type.icon"
          :name="t.stickerWall[type.key]"
          :is-earned="stickersStore.hasSticker(`${op.key}_${type.key}`)"
          @click="$emit('show-detail', `${op.key}_${type.key}`, 'achievement')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStickersStore } from '../../stores/stickers.js'
import { useLocaleStore } from '../../stores/locale.js'
import { OPERATIONS, STICKER_TYPES } from '../../composables/useStickerWall.js'
import StickerCard from './StickerCard.vue'

const stickersStore = useStickersStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)
const operations = OPERATIONS
const stickerTypes = STICKER_TYPES

defineEmits(['show-detail'])
</script>

<style scoped>
.operation-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.operation-section {
  background: white;
  border-radius: 12px;
  padding: 15px;
  border: 1px solid var(--secondary-color, #FFB6C1);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
}

.op-icon {
  font-size: 20px;
}

.sticker-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
