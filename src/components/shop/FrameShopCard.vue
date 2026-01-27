<template>
  <div
    class="frame-shop-card"
    :class="{
      owned: isOwned,
      equipped: isEquipped,
      affordable: canAfford && !isOwned
    }"
    @click="handleClick"
  >
    <div class="frame-preview">
      <div
        class="frame-ring"
        :style="{
          background: frame.gradient,
          borderWidth: `${frame.borderWidth}px`
        }"
        :class="{ animated: frame.animated }"
      >
        <div class="avatar-placeholder">
          <span class="avatar-emoji">👤</span>
        </div>
      </div>
      <span v-if="frame.decoration" class="frame-decoration">
        {{ frame.decoration }}
      </span>
    </div>

    <div class="frame-info">
      <div class="frame-name">{{ getFrameName() }}</div>
      <div v-if="isEquipped" class="equipped-badge">
        {{ t.shop.equipped }}
      </div>
      <div v-else-if="isOwned" class="owned-badge">
        {{ t.shop.owned }}
      </div>
      <div v-else class="price-badge" :class="{ unaffordable: !canAfford }">
        <span class="coin-icon">🪙</span>
        {{ frame.price }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCoinsStore } from '../../stores/coins'
import { useLocaleStore } from '../../stores/locale'

const props = defineProps({
  frame: { type: Object, required: true }
})

const emit = defineEmits(['purchase', 'equip'])

const coinsStore = useCoinsStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)
const canAfford = computed(() => coinsStore.canAfford(props.frame.price))
const isOwned = computed(() => coinsStore.hasPurchasedItem(props.frame.id))
const isEquipped = computed(() => coinsStore.equippedFrame === props.frame.id)

function getFrameName() {
  return t.value.shop.frames[props.frame.nameKey] || props.frame.nameKey
}

function handleClick() {
  if (isOwned.value) {
    emit('equip', props.frame)
  } else if (canAfford.value) {
    emit('purchase', props.frame)
  }
}
</script>

<style scoped>
.frame-shop-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 16px;
  border: 2px solid #f0f0f0;
  transition: all 0.3s;
  cursor: default;
}

.frame-shop-card.affordable,
.frame-shop-card.owned {
  cursor: pointer;
}

.frame-shop-card.affordable {
  border-color: var(--secondary-color, #FFB6C1);
}

.frame-shop-card.affordable:hover,
.frame-shop-card.owned:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.frame-shop-card.affordable:hover {
  border-color: var(--primary-color, #FF69B4);
}

.frame-shop-card.equipped {
  background: linear-gradient(135deg, #E8F5E9, #C8E6C9);
  border-color: #81C784;
}

.frame-preview {
  position: relative;
  margin-bottom: 12px;
}

.frame-ring {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: solid;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.frame-ring.animated {
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
}

.avatar-placeholder {
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-emoji {
  font-size: 28px;
  opacity: 0.5;
}

.frame-decoration {
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 20px;
  animation: bounce 1.5s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.frame-info {
  text-align: center;
}

.frame-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.equipped-badge {
  background: #81C784;
  color: white;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
}

.owned-badge {
  background: var(--light-color, #FFF0F5);
  color: var(--primary-color, #FF69B4);
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
}

.price-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: linear-gradient(135deg, #FFF9E6, #FFE4B5);
  border: 1px solid #FFD700;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 13px;
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
  font-size: 13px;
}

/* Mobile */
@media (max-width: 500px) {
  .frame-shop-card {
    padding: 12px;
  }

  .frame-ring {
    width: 60px;
    height: 60px;
  }

  .avatar-emoji {
    font-size: 22px;
  }

  .frame-decoration {
    font-size: 16px;
  }

  .frame-name {
    font-size: 12px;
    margin-bottom: 6px;
  }

  .price-badge,
  .owned-badge,
  .equipped-badge {
    font-size: 11px;
    padding: 3px 8px;
  }
}
</style>
