<template>
  <div
    class="level-unlock-card"
    :class="{
      unlocked: isUnlocked,
      affordable: canAfford && !isUnlocked
    }"
    @click="handleClick"
  >
    <div class="level-icon">{{ levelIcons[level] }}</div>
    <div class="level-info">
      <div class="level-name">
        {{ t.levels.level }} {{ level }}
        <span class="level-title">{{ getLevelName() }}</span>
      </div>
      <div class="operation-name">{{ t.operations[operation] }}</div>
    </div>
    <div v-if="isUnlocked" class="unlock-badge">
      <span class="check-icon">✓</span>
      {{ t.shop.unlocked }}
    </div>
    <div v-else class="price-badge" :class="{ unaffordable: !canAfford }">
      <span class="coin-icon">🪙</span>
      {{ price }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCoinsStore } from '../../stores/coins'
import { useProgressStore } from '../../stores/progress'
import { useUserStore } from '../../stores/user'
import { useLocaleStore } from '../../stores/locale'
import { levelIcons } from '../../config/levels'
import { levelUnlockPrices } from '../../config/shop'

const props = defineProps({
  operation: { type: String, required: true },
  level: { type: Number, required: true }
})

const emit = defineEmits(['purchase'])

const coinsStore = useCoinsStore()
const progressStore = useProgressStore()
const userStore = useUserStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)
const price = computed(() => levelUnlockPrices[props.level])
const canAfford = computed(() => coinsStore.canAfford(price.value))

const isUnlocked = computed(() => {
  const progress = progressStore.getOperationProgress(props.operation)
  return progress.unlockedLevel >= props.level
})

function getLevelName() {
  if (props.level === 6) {
    const titles = userStore.gender === 'prince'
      ? t.value.levels.princeTitle
      : t.value.levels.princessTitle
    return titles[props.operation]
  }
  return t.value.levels.levelNames[props.level]
}

function handleClick() {
  if (!isUnlocked.value && canAfford.value) {
    emit('purchase', { operation: props.operation, level: props.level, price: price.value })
  }
}
</script>

<style scoped>
.level-unlock-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border-radius: 16px;
  padding: 16px;
  border: 2px solid #f0f0f0;
  transition: all 0.3s;
  cursor: default;
}

.level-unlock-card.affordable {
  cursor: pointer;
  border-color: var(--secondary-color, #FFB6C1);
}

.level-unlock-card.affordable:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color, #FF69B4);
}

.level-unlock-card.unlocked {
  background: linear-gradient(135deg, #F0FFF0, #E8F5E9);
  border-color: #81C784;
}

.level-icon {
  font-size: 36px;
  flex-shrink: 0;
}

.level-info {
  flex: 1;
  min-width: 0;
}

.level-name {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.level-title {
  font-size: 14px;
  color: var(--primary-color, #FF69B4);
  font-weight: 500;
}

.operation-name {
  font-size: 13px;
  color: #666;
  margin-top: 2px;
}

.unlock-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #81C784;
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.check-icon {
  font-size: 14px;
}

.price-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, #FFF9E6, #FFE4B5);
  border: 2px solid #FFD700;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 15px;
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
  font-size: 16px;
}

/* Mobile */
@media (max-width: 500px) {
  .level-unlock-card {
    padding: 12px;
    gap: 10px;
  }

  .level-icon {
    font-size: 28px;
  }

  .level-name {
    font-size: 14px;
  }

  .level-title {
    font-size: 12px;
  }

  .operation-name {
    font-size: 12px;
  }

  .unlock-badge,
  .price-badge {
    padding: 5px 10px;
    font-size: 12px;
  }
}
</style>
