<template>
  <div class="shop-screen">
    <div class="shop-header">
      <n-button quaternary circle @click="$emit('back')">
        <template #icon>
          <span style="font-size: 24px">←</span>
        </template>
      </n-button>
      <h2 class="shop-title">
        <span class="shop-icon">🏪</span>
        {{ t.shop.title }}
      </h2>
      <CoinDisplay clickable @click="showTransactions = true" />
    </div>

    <!-- Tab Navigation -->
    <div class="shop-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ t.shop.tabs[tab.key] }}</span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="shop-content">
      <!-- Level Unlock Tab -->
      <div v-if="activeTab === 'levels'" class="tab-content">
        <div class="section-desc">{{ t.shop.levelUnlockDesc }}</div>
        <div class="level-unlock-list">
          <template v-for="op in operations" :key="op">
            <LevelUnlockCard
              v-for="level in getLockedLevels(op)"
              :key="`${op}_${level}`"
              :operation="op"
              :level="level"
              @purchase="confirmLevelPurchase"
            />
          </template>
        </div>
        <div v-if="noLockedLevels" class="empty-state">
          <span class="empty-icon">🎉</span>
          <p>{{ t.shop.allLevelsUnlocked }}</p>
        </div>
      </div>

      <!-- Stickers Tab -->
      <div v-if="activeTab === 'stickers'" class="tab-content">
        <div v-for="(stickers, series) in purchasableStickers" :key="series" class="sticker-series">
          <h3 class="series-title">{{ t.shop.stickerSeries[series] }}</h3>
          <div class="sticker-grid">
            <StickerShopCard
              v-for="sticker in stickers"
              :key="sticker.id"
              :sticker="sticker"
              @purchase="confirmStickerPurchase"
            />
          </div>
        </div>
      </div>

      <!-- Frames Tab -->
      <div v-if="activeTab === 'frames'" class="tab-content">
        <div class="section-desc">{{ t.shop.framesDesc }}</div>
        <div class="frames-grid">
          <FrameShopCard
            v-for="frame in avatarFrames"
            :key="frame.id"
            :frame="frame"
            @purchase="confirmFramePurchase"
            @equip="equipFrame"
          />
        </div>
        <button
          v-if="coinsStore.equippedFrame"
          class="unequip-btn"
          @click="unequipFrame"
        >
          {{ t.shop.removeFrame }}
        </button>
      </div>

      <!-- Backgrounds Tab -->
      <div v-if="activeTab === 'backgrounds'" class="tab-content">
        <div class="section-desc">{{ t.shop.backgroundsDesc }}</div>
        <div class="backgrounds-grid">
          <BackgroundShopCard
            v-for="bg in backgroundThemes"
            :key="bg.id"
            :bg="bg"
            @purchase="confirmBackgroundPurchase"
            @equip="equipBackground"
          />
        </div>
        <button
          v-if="coinsStore.equippedBackground"
          class="unequip-btn"
          @click="unequipBackground"
        >
          {{ t.shop.removeBackground }}
        </button>
      </div>
    </div>

    <!-- Purchase Confirmation Dialog -->
    <n-modal v-model:show="showConfirmDialog" preset="card" style="max-width: 350px">
      <template #header>
        <span>{{ t.shop.confirmPurchase }}</span>
      </template>
      <div class="confirm-content">
        <div class="confirm-item">
          <span class="confirm-icon">{{ pendingPurchase?.icon }}</span>
          <span class="confirm-name">{{ pendingPurchase?.name }}</span>
        </div>
        <div class="confirm-price">
          <span class="coin-icon">🪙</span>
          {{ pendingPurchase?.price }}
        </div>
        <div class="balance-after">
          {{ t.shop.balanceAfter }}: {{ coinsStore.balance - (pendingPurchase?.price || 0) }}
        </div>
      </div>
      <template #footer>
        <div class="confirm-actions">
          <n-button @click="showConfirmDialog = false">{{ t.common.cancel }}</n-button>
          <n-button type="primary" @click="executePurchase">{{ t.shop.buy }}</n-button>
        </div>
      </template>
    </n-modal>

    <!-- Transaction History Modal -->
    <n-modal v-model:show="showTransactions" preset="card" style="max-width: 400px">
      <template #header>
        <span>{{ t.shop.transactionHistory }}</span>
      </template>
      <div class="transactions-list">
        <div class="total-stats">
          <div class="stat">
            <span class="stat-label">{{ t.shop.totalEarned }}:</span>
            <span class="stat-value earn">🪙 {{ coinsStore.totalEarned }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">{{ t.shop.totalSpent }}:</span>
            <span class="stat-value spend">🪙 {{ coinsStore.totalSpent }}</span>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NButton, NModal, useMessage } from 'naive-ui'
import { useCoinsStore } from '../stores/coins'
import { useProgressStore } from '../stores/progress'
import { useLocaleStore } from '../stores/locale'
import { useSound } from '../composables/useSound'
import { useConfetti } from '../composables/useConfetti'
import {
  purchasableStickers,
  avatarFrames,
  backgroundThemes,
  levelUnlockPrices
} from '../config/shop'

import CoinDisplay from './CoinDisplay.vue'
import LevelUnlockCard from './shop/LevelUnlockCard.vue'
import StickerShopCard from './shop/StickerShopCard.vue'
import FrameShopCard from './shop/FrameShopCard.vue'
import BackgroundShopCard from './shop/BackgroundShopCard.vue'

const emit = defineEmits(['back'])

const coinsStore = useCoinsStore()
const progressStore = useProgressStore()
const localeStore = useLocaleStore()
const message = useMessage()
const { playPurchaseSound, playUnlockSound } = useSound()
const { purchaseCelebration, unlockCelebration } = useConfetti()

const t = computed(() => localeStore.t)

const activeTab = ref('stickers')
const showConfirmDialog = ref(false)
const showTransactions = ref(false)
const pendingPurchase = ref(null)

const tabs = [
  { key: 'levels', icon: '🔓' },
  { key: 'stickers', icon: '🎨' },
  { key: 'frames', icon: '🖼️' },
  { key: 'backgrounds', icon: '🌈' }
]

const operations = ['addition', 'subtraction', 'multiplication', 'division', 'fraction']

const noLockedLevels = computed(() => {
  return operations.every(op => getLockedLevels(op).length === 0)
})

function getLockedLevels(operation) {
  const progress = progressStore.getOperationProgress(operation)
  const levels = []
  for (let level = 2; level <= 6; level++) {
    if (progress.unlockedLevel < level) {
      levels.push(level)
    }
  }
  return levels
}

function confirmLevelPurchase({ operation, level, price }) {
  const levelName = t.value.levels.level + ' ' + level
  pendingPurchase.value = {
    type: 'level',
    operation,
    level,
    price,
    icon: '🔓',
    name: `${t.value.operations[operation]} - ${levelName}`
  }
  showConfirmDialog.value = true
}

function confirmStickerPurchase(sticker) {
  pendingPurchase.value = {
    type: 'sticker',
    id: sticker.id,
    price: sticker.price,
    icon: sticker.icon,
    name: t.value.shop.stickers[sticker.nameKey] || sticker.nameKey
  }
  showConfirmDialog.value = true
}

function confirmFramePurchase(frame) {
  pendingPurchase.value = {
    type: 'frame',
    id: frame.id,
    price: frame.price,
    icon: '🖼️',
    name: t.value.shop.frames[frame.nameKey] || frame.nameKey
  }
  showConfirmDialog.value = true
}

function confirmBackgroundPurchase(bg) {
  pendingPurchase.value = {
    type: 'background',
    id: bg.id,
    price: bg.price,
    icon: bg.preview,
    name: t.value.shop.backgrounds[bg.nameKey] || bg.nameKey
  }
  showConfirmDialog.value = true
}

function executePurchase() {
  if (!pendingPurchase.value) return

  const { type, id, price, operation, level } = pendingPurchase.value
  let success = false

  if (type === 'level') {
    if (coinsStore.spendCoins(price, 'level_unlock', `${operation}_${level}`)) {
      progressStore.purchaseUnlock(operation, level)
      success = true
      playUnlockSound()
      unlockCelebration()
    }
  } else if (type === 'sticker') {
    success = coinsStore.purchaseItem(id, price, 'sticker')
    if (success) {
      playPurchaseSound()
      purchaseCelebration()
    }
  } else if (type === 'frame') {
    success = coinsStore.purchaseItem(id, price, 'frame')
    if (success) {
      playPurchaseSound()
      purchaseCelebration()
    }
  } else if (type === 'background') {
    success = coinsStore.purchaseItem(id, price, 'background')
    if (success) {
      playPurchaseSound()
      purchaseCelebration()
    }
  }

  if (success) {
    message.success(t.value.shop.purchaseSuccess)
  } else {
    message.error(t.value.shop.purchaseFailed)
  }

  showConfirmDialog.value = false
  pendingPurchase.value = null
}

function equipFrame(frame) {
  coinsStore.equipFrame(frame.id)
  message.success(t.value.shop.equipped)
}

function unequipFrame() {
  coinsStore.equipFrame(null)
}

function equipBackground(bg) {
  coinsStore.equipBackground(bg.id)
  message.success(t.value.shop.equipped)
}

function unequipBackground() {
  coinsStore.equipBackground(null)
}

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
  return date.toLocaleDateString(localeStore.currentLocale === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.shop-screen {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 40px;
}

.shop-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.shop-title {
  font-size: 24px;
  color: var(--primary-color, #FF69B4);
  display: flex;
  align-items: center;
  gap: 8px;
}

.shop-icon {
  font-size: 28px;
}

.shop-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.tab-btn:hover {
  border-color: var(--secondary-color, #FFB6C1);
}

.tab-btn.active {
  background: var(--primary-color, #FF69B4);
  border-color: var(--primary-color, #FF69B4);
  color: white;
}

.tab-icon {
  font-size: 18px;
}

.tab-label {
  font-size: 14px;
  font-weight: 600;
}

.shop-content {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.tab-content {
  min-height: 300px;
}

.section-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 12px;
  background: var(--light-color, #FFF0F5);
  border-radius: 12px;
}

/* Level Unlock */
.level-unlock-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Stickers */
.sticker-series {
  margin-bottom: 24px;
}

.series-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
  padding-left: 8px;
  border-left: 4px solid var(--primary-color, #FF69B4);
}

.sticker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 12px;
}

/* Frames */
.frames-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 16px;
}

/* Backgrounds */
.backgrounds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.unequip-btn {
  margin-top: 16px;
  padding: 10px 20px;
  background: #f5f5f5;
  border: 2px dashed #ccc;
  border-radius: 12px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.unequip-btn:hover {
  border-color: #e74c3c;
  color: #e74c3c;
  background: #fff5f5;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

/* Confirm Dialog */
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

.coin-icon {
  font-size: 24px;
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

/* Transactions */
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

/* Mobile */
@media (max-width: 768px) {
  .shop-screen {
    padding: 16px;
    padding-top: 60px;
  }

  .shop-title {
    font-size: 18px;
  }

  .shop-icon {
    font-size: 22px;
  }
}

@media (max-width: 500px) {
  .shop-screen {
    padding: 12px;
    padding-top: 55px;
  }

  .shop-header {
    margin-bottom: 16px;
  }

  .shop-title {
    font-size: 16px;
    gap: 4px;
  }

  .shop-icon {
    font-size: 20px;
  }

  .shop-tabs {
    gap: 6px;
    margin-bottom: 16px;
  }

  .tab-btn {
    padding: 8px 12px;
    gap: 4px;
  }

  .tab-icon {
    font-size: 16px;
  }

  .tab-label {
    font-size: 12px;
  }

  .shop-content {
    padding: 16px;
    border-radius: 16px;
  }

  .section-desc {
    font-size: 12px;
    padding: 10px;
    margin-bottom: 12px;
  }

  .series-title {
    font-size: 14px;
  }

  .sticker-grid {
    grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
    gap: 8px;
  }

  .frames-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }

  .backgrounds-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .confirm-icon {
    font-size: 32px;
  }

  .confirm-name {
    font-size: 16px;
  }

  .confirm-price {
    font-size: 20px;
  }

  .total-stats {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
