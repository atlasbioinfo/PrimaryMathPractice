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
    <div class="bg-preview" :style="{ background: bg.gradient }">
      <div class="particles">
        <span
          v-for="(particle, i) in bg.particles.slice(0, 4)"
          :key="i"
          class="particle"
          :style="{ animationDelay: `${i * 0.5}s` }"
        >
          {{ particle }}
        </span>
      </div>
      <div class="preview-icon">{{ bg.preview }}</div>
    </div>

    <div class="bg-info">
      <div class="bg-name">{{ getBgName() }}</div>
      <div class="bg-desc">{{ getBgDesc() }}</div>
    </div>

    <div class="bg-action">
      <div v-if="isEquipped" class="equipped-badge">
        <span>✓</span> {{ t.shop.equipped }}
      </div>
      <div v-else-if="isOwned" class="owned-badge">
        {{ t.shop.tapToEquip }}
      </div>
      <div v-else class="price-badge" :class="{ unaffordable: !canAfford }">
        <span class="coin-icon">🪙</span>
        {{ bg.price }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCoinsStore } from '../../stores/coins'
import { useLocaleStore } from '../../stores/locale'

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

function getBgName() {
  return t.value.shop.backgrounds[props.bg.nameKey] || props.bg.nameKey
}

function getBgDesc() {
  return t.value.shop.backgrounds[props.bg.description] || ''
}

function handleClick() {
  if (isOwned.value) {
    emit('equip', props.bg)
  } else if (canAfford.value) {
    emit('purchase', props.bg)
  }
}
</script>

<style scoped>
.background-shop-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid #f0f0f0;
  transition: all 0.3s;
  cursor: default;
}

.background-shop-card.affordable,
.background-shop-card.owned {
  cursor: pointer;
}

.background-shop-card.affordable {
  border-color: var(--secondary-color, #FFB6C1);
}

.background-shop-card.affordable:hover,
.background-shop-card.owned:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.background-shop-card.affordable:hover {
  border-color: var(--primary-color, #FF69B4);
}

.background-shop-card.equipped {
  border-color: #81C784;
  border-width: 3px;
}

.bg-preview {
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  font-size: 16px;
  opacity: 0.7;
  animation: float 3s ease-in-out infinite;
}

.particle:nth-child(1) { top: 20%; left: 15%; }
.particle:nth-child(2) { top: 60%; left: 75%; }
.particle:nth-child(3) { top: 30%; left: 80%; }
.particle:nth-child(4) { top: 70%; left: 25%; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(10deg); }
}

.preview-icon {
  font-size: 36px;
  z-index: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.bg-info {
  padding: 12px 16px;
}

.bg-name {
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
}

.bg-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}

.bg-action {
  padding: 0 16px 12px;
}

.equipped-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #81C784;
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.owned-badge {
  display: inline-block;
  background: var(--light-color, #FFF0F5);
  color: var(--primary-color, #FF69B4);
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.price-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, #FFF9E6, #FFE4B5);
  border: 2px solid #FFD700;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #B8860B;
}

.price-badge.unaffordable {
  opacity: 0.5;
  border-color: #ccc;
  background: #f5f5f5;
  color: #999;
}

.coin-icon {
  font-size: 14px;
}

/* Mobile */
@media (max-width: 500px) {
  .bg-preview {
    height: 80px;
  }

  .particle {
    font-size: 14px;
  }

  .preview-icon {
    font-size: 28px;
  }

  .bg-info {
    padding: 10px 12px;
  }

  .bg-name {
    font-size: 13px;
  }

  .bg-desc {
    font-size: 11px;
  }

  .bg-action {
    padding: 0 12px 10px;
  }

  .price-badge,
  .owned-badge,
  .equipped-badge {
    font-size: 12px;
    padding: 5px 10px;
  }
}
</style>
