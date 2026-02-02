<template>
  <div class="purchased-stickers">
    <div v-for="(stickers, series) in purchasableStickers" :key="series" class="sticker-series">
      <h3 class="series-title">{{ t.shop?.stickerSeries?.[series] || series }}</h3>
      <div class="sticker-row purchased-row">
        <StickerCard
          v-for="sticker in stickers"
          :key="sticker.id"
          :icon="sticker.icon"
          :name="t.shop?.stickers?.[sticker.nameKey] || sticker.nameKey"
          :is-earned="isPurchasableStickerOwned(sticker.id)"
          @click="$emit('show-detail', sticker.id, 'purchasable')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocaleStore } from '../../stores/locale.js'
import { useCoinsStore } from '../../stores/coins.js'
import { purchasableStickers } from '../../config/shop.js'
import StickerCard from './StickerCard.vue'

const localeStore = useLocaleStore()
const coinsStore = useCoinsStore()

const t = computed(() => localeStore.t)

function isPurchasableStickerOwned(stickerId) {
  return coinsStore.hasPurchasedItem(stickerId)
}

defineEmits(['show-detail'])
</script>

<style scoped>
.purchased-stickers {
  padding: 10px 0;
}

.sticker-series {
  margin-bottom: 20px;
}

.series-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  padding-left: 8px;
  border-left: 3px solid var(--primary-color, #FF69B4);
}

.sticker-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.purchased-row {
  gap: 8px;
}
</style>
