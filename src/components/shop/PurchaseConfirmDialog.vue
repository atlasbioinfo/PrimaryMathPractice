<template>
  <n-modal :show="modelValue" preset="card" style="max-width: 350px" :closable="false">
    <template #header>
      <span>{{ t.shop.confirmPurchase }}</span>
    </template>
    <div class="confirm-content">
      <div class="confirm-item">
        <span class="confirm-icon">{{ purchase?.icon }}</span>
        <span class="confirm-name">{{ purchase?.name }}</span>
      </div>
      <div class="confirm-price">
        <CoinIcon :size="24" />
        {{ purchase?.price }}
      </div>
      <div class="balance-after">
        {{ t.shop.balanceAfter }}: {{ balanceAfterPurchase }}
      </div>
    </div>
    <template #footer>
      <div class="confirm-actions">
        <n-button @click="emit('cancel')">{{ t.common.cancel }}</n-button>
        <n-button type="primary" @click="emit('confirm')">{{ t.shop.buy }}</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { computed } from 'vue'
import { NButton, NModal } from 'naive-ui'
import { useCoinsStore } from '../../stores/coins.js'
import { useLocaleStore } from '../../stores/locale.js'
import CoinIcon from '../CoinIcon.vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  purchase: { type: Object, default: null }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const coinsStore = useCoinsStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)
const balanceAfterPurchase = computed(() => coinsStore.balance - (props.purchase?.price || 0))
</script>

<style scoped>
.confirm-content {
  text-align: center;
  padding: 20px 0;
}

.confirm-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.confirm-icon {
  font-size: 40px;
}

.confirm-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.confirm-price {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 24px;
  font-weight: 700;
  color: #B8860B;
  margin-bottom: 8px;
}

.balance-after {
  font-size: 14px;
  color: #666;
}

.confirm-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

@media (max-width: 500px) {
  .confirm-icon {
    font-size: 32px;
  }

  .confirm-name {
    font-size: 16px;
  }

  .confirm-price {
    font-size: 20px;
  }
}
</style>
