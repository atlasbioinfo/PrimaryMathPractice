<template>
  <n-modal
    :show="modelValue"
    preset="card"
    style="max-width: 400px"
    @update:show="(val) => $emit('update:modelValue', val)"
  >
    <template #header>
      <span>{{ t.shop.transactionHistory }}</span>
    </template>
    <div class="transactions-list">
      <div class="total-stats">
        <div class="stat">
          <span class="stat-label">{{ t.shop.totalEarned }}:</span>
          <span class="stat-value earn"><CoinIcon :size="16" /> {{ coinsStore.totalEarned }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">{{ t.shop.totalSpent }}:</span>
          <span class="stat-value spend"><CoinIcon :size="16" /> {{ coinsStore.totalSpent }}</span>
        </div>
      </div>
      <div v-if="coinsStore.transactionHistory.length === 0" class="empty-transactions">
        {{ t.shop.noTransactions }}
      </div>
      <div
        v-for="tx in coinsStore.transactionHistory"
        :key="tx.id"
        class="transaction-item"
        :class="tx.type"
      >
        <div class="tx-info">
          <span class="tx-reason">{{ getTransactionReason(tx) }}</span>
          <span class="tx-date">{{ formatDate(tx.timestamp) }}</span>
        </div>
        <span class="tx-amount" :class="tx.type">
          {{ tx.type === 'earn' ? '+' : '-' }}{{ tx.amount }}
        </span>
      </div>
    </div>
  </n-modal>
</template>

<script setup>
import { computed } from 'vue'
import { NModal } from 'naive-ui'
import { useCoinsStore } from '../../stores/coins.js'
import { useLocaleStore } from '../../stores/locale.js'
import CoinIcon from '../CoinIcon.vue'

defineProps({
  modelValue: { type: Boolean, required: true }
})

defineEmits(['update:modelValue'])

const coinsStore = useCoinsStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)

function getTransactionReason(tx) {
  if (tx.reason.startsWith('purchase_')) {
    return t.value.shop.transactionReasons.purchase
  }
  if (tx.reason === 'level_unlock') {
    return t.value.shop.transactionReasons.levelUnlock
  }
  if (tx.reason === 'level_complete') {
    return t.value.shop.transactionReasons.levelComplete
  }
  return tx.reason
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const locale = localeStore.currentLocale === 'zh' ? 'zh-CN' : 'en-US'
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.transactions-list {
  max-height: 400px;
  overflow-y: auto;
}

.total-stats {
  display: flex;
  gap: 20px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 12px;
  margin-bottom: 16px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.stat-value {
  font-weight: 700;
}

.stat-value.earn {
  color: #52C41A;
}

.stat-value.spend {
  color: #FF6B6B;
}

.empty-transactions {
  text-align: center;
  padding: 30px;
  color: #999;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.tx-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tx-reason {
  font-size: 14px;
  color: #333;
}

.tx-date {
  font-size: 12px;
  color: #999;
}

.tx-amount {
  font-size: 16px;
  font-weight: 700;
}

.tx-amount.earn {
  color: #52C41A;
}

.tx-amount.spend {
  color: #FF6B6B;
}

@media (max-width: 500px) {
  .total-stats {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
