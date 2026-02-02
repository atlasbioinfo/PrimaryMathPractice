<template>
  <n-modal v-model:show="showDialog" preset="card" style="max-width: 350px" :closable="false">
    <template #header>
      <span>{{ unlockIcon }} {{ headerText }}</span>
    </template>
    <div class="unlock-dialog-content">
      <div class="unlock-level-icon">{{ levelIcon }}</div>
      <div class="unlock-level-name">{{ levelLabel }}</div>
      <div class="unlock-level-title">{{ levelTitle }}</div>
      <div class="unlock-price-display">
        <CoinIcon :size="24" />
        <span class="price-amount">{{ price }}</span>
      </div>
      <div class="current-balance">
        {{ balanceAfterText }}: {{ balanceAfter }}
      </div>
    </div>
    <template #footer>
      <div class="unlock-dialog-actions">
        <n-button @click="$emit('cancel')">{{ cancelText }}</n-button>
        <n-button
          type="primary"
          :disabled="!canAfford"
          @click="$emit('confirm')"
        >
          {{ buyText }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { computed } from 'vue'
import { NModal, NButton } from 'naive-ui'
import CoinIcon from '../CoinIcon.vue'

const props = defineProps({
  show: { type: Boolean, required: true },
  levelIcon: { type: String, default: '' },
  levelLabel: { type: String, default: '' },
  levelTitle: { type: String, default: '' },
  price: { type: Number, default: 0 },
  currentBalance: { type: Number, default: 0 },
  headerText: { type: String, default: 'Unlock Level' },
  balanceAfterText: { type: String, default: 'Balance after' },
  cancelText: { type: String, default: 'Cancel' },
  buyText: { type: String, default: 'Buy' }
})

const emit = defineEmits(['update:show', 'cancel', 'confirm'])

const unlockIcon = '🔓'

const showDialog = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

const canAfford = computed(() => props.currentBalance >= props.price)
const balanceAfter = computed(() => props.currentBalance - props.price)
</script>

<style scoped>
.unlock-dialog-content {
  text-align: center;
  padding: 20px 0;
}

.unlock-level-icon {
  font-size: 60px;
  margin-bottom: 12px;
}

.unlock-level-name {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.unlock-level-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-color, #FF69B4);
  margin-bottom: 16px;
}

.unlock-price-display {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #FFF9E6, #FFE4B5);
  border: 2px solid #FFD700;
  padding: 10px 20px;
  border-radius: 16px;
  margin-bottom: 12px;
}

.price-amount {
  font-size: 28px;
  font-weight: 700;
  color: #B8860B;
}

.current-balance {
  font-size: 14px;
  color: #666;
}

.unlock-dialog-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>
