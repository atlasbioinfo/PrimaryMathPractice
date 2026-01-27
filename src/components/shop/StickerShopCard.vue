<template>
  <div
    class="sticker-shop-card"
    :class="{
      owned: isOwned,
      affordable: canAfford && !isOwned
    }"
    @click="handleClick"
  >
    <div class="sticker-icon">{{ sticker.icon }}</div>
    <div class="sticker-name">{{ getStickerName() }}</div>
    <div v-if="isOwned" class="owned-badge">
      <span>✓</span>
    </div>
    <div v-else class="price-badge" :class="{ unaffordable: !canAfford }">
      <span class="coin-icon">🪙</span>
      {{ sticker.price }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCoinsStore } from '../../stores/coins'
import { useLocaleStore } from '../../stores/locale'

const props = defineProps({
  sticker: { type: Object, required: true }
})

const emit = defineEmits(['purchase'])

const coinsStore = useCoinsStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)
const canAfford = computed(() => coinsStore.canAfford(props.sticker.price))
const isOwned = computed(() => coinsStore.hasPurchasedItem(props.sticker.id))

function getStickerName() {
  return t.value.shop.stickers[props.sticker.nameKey] || props.sticker.nameKey
}

function handleClick() {
  if (!isOwned.value && canAfford.value) {
    emit('purchase', props.sticker)
  }
}
</script>

<style scoped>
.sticker-shop-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 16px;
  padding: 16px 12px;
  border: 2px solid #f0f0f0;
  transition: all 0.3s;
  cursor: default;
  position: relative;
  min-height: 120px;
}

.sticker-shop-card.affordable {
  cursor: pointer;
  border-color: var(--secondary-color, #FFB6C1);
}

.sticker-shop-card.affordable:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  border-color: var(--primary-color, #FF69B4);
}

.sticker-shop-card.owned {
  background: linear-gradient(135deg, var(--light-color, #FFF0F5), white);
  border-color: var(--primary-color, #FF69B4);
}

.sticker-icon {
  font-size: 40px;
  margin-bottom: 8px;
}

.sticker-name {
  font-size: 12px;
  color: #666;
  text-align: center;
  line-height: 1.3;
}

.owned-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: #81C784;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
}

.price-badge {
  display: flex;
  align-items: center;
  gap: 3px;
  background: linear-gradient(135deg, #FFF9E6, #FFE4B5);
  border: 1px solid #FFD700;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  color: #B8860B;
  margin-top: 8px;
}

.price-badge.unaffordable {
  opacity: 0.5;
  border-color: #ccc;
  background: #f5f5f5;
  color: #999;
}

.coin-icon {
  font-size: 12px;
}

/* Mobile */
@media (max-width: 500px) {
  .sticker-shop-card {
    padding: 12px 8px;
    min-height: 100px;
  }

  .sticker-icon {
    font-size: 32px;
    margin-bottom: 6px;
  }

  .sticker-name {
    font-size: 11px;
  }

  .price-badge {
    font-size: 11px;
    padding: 3px 6px;
    margin-top: 6px;
  }

  .owned-badge {
    width: 20px;
    height: 20px;
    font-size: 12px;
    top: 6px;
    right: 6px;
  }
}
</style>
