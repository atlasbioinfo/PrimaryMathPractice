<template>
  <div
    class="background-shop-card"
    :class="{
      owned: isOwned,
      equipped: isEquipped,
      affordable: canAfford && !isOwned
    }"
    @click="handleClick"
  >
    <div class="bg-preview" :class="bg.id" :style="{ background: bg.gradient }">
      <BackgroundPreviewEffects :theme-id="bg.id" />

      <div class="particles">
        <span
          v-for="(particle, i) in bg.particles.slice(0, 4)"
          :key="i"
          class="particle"
          :class="'particle-' + bg.id"
          :style="{ animationDelay: `${i * 0.5}s` }"
        >
          {{ particle }}
        </span>
      </div>
      <div class="preview-icon">{{ bg.preview }}</div>
    </div>

    <div class="bg-info">
      <div class="bg-name">{{ bgName }}</div>
      <div class="bg-desc">{{ bgDesc }}</div>
    </div>

    <div class="bg-action">
      <div v-if="isEquipped" class="equipped-badge">
        <span>&#10003;</span> {{ t.shop.equipped }}
      </div>
      <div v-else-if="isOwned" class="owned-badge">
        {{ t.shop.tapToEquip }}
      </div>
      <div v-else class="price-badge" :class="{ unaffordable: !canAfford }">
        <CoinIcon :size="14" />
        {{ bg.price }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCoinsStore } from '../../stores/coins'
import { useLocaleStore } from '../../stores/locale'
import CoinIcon from '../CoinIcon.vue'
import BackgroundPreviewEffects from './BackgroundPreviewEffects.vue'

const props = defineProps({
  bg: { type: Object, required: true }
})

const emit = defineEmits(['purchase', 'equip'])

const coinsStore = useCoinsStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)
const canAfford = computed(() => coinsStore.canAfford(props.bg.price))
const isOwned = computed(() => coinsStore.hasPurchasedItem(props.bg.id))
const isEquipped = computed(() => coinsStore.equippedBackground === props.bg.id)

const bgName = computed(() => t.value.shop.backgrounds[props.bg.nameKey] || props.bg.nameKey)
const bgDesc = computed(() => t.value.shop.backgrounds[props.bg.description] || '')

function handleClick() {
  if (isOwned.value) {
    emit('equip', props.bg)
  } else if (canAfford.value) {
    emit('purchase', props.bg)
  }
}
</script>

<style scoped>
@import './BackgroundShopCard.css';
</style>
