<template>
  <div class="shop-screen">
    <div class="shop-header">
      <div class="header-left">
        <n-button quaternary circle @click="$emit('back')">
          <template #icon>
            <span style="font-size: 24px">←</span>
          </template>
        </n-button>
        <CoinDisplay clickable @click="showTransactions = true" />
      </div>
      <h2 class="shop-title">
        <span class="shop-icon">🏪</span>
        {{ t.shop.title }}
      </h2>
      <div class="header-spacer"></div>
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

      <!-- Avatars Tab -->
      <div v-if="activeTab === 'avatars'" class="tab-content">
        <div class="section-desc">{{ t.shop.avatarsDesc }}</div>
        <div class="avatars-grid">
          <AvatarShopCard
            v-for="avatar in purchasableAvatars"
            :key="avatar.id"
            :avatar="avatar"
            @purchase="confirmAvatarPurchase"
            @equip="equipAvatar"
          />
        </div>
        <button
          v-if="coinsStore.equippedAvatar"
          class="unequip-btn"
          @click="unequipAvatar"
        >
          {{ t.shop.removeAvatar }}
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
    <PurchaseConfirmDialog
      v-model="showConfirmDialog"
      :purchase="pendingPurchase"
      @confirm="executePurchase"
      @cancel="cancelPurchase"
    />

    <!-- Transaction History Modal -->
    <TransactionHistoryModal v-model="showTransactions" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import { useCoinsStore } from '../stores/coins.js'
import { useProgressStore } from '../stores/progress.js'
import { useLocaleStore } from '../stores/locale.js'
import { useShopPurchase } from '../composables/useShopPurchase.js'
import {
  purchasableStickers,
  purchasableAvatars,
  avatarFrames,
  backgroundThemes
} from '../config/shop.js'

import CoinDisplay from './CoinDisplay.vue'
import LevelUnlockCard from './shop/LevelUnlockCard.vue'
import StickerShopCard from './shop/StickerShopCard.vue'
import FrameShopCard from './shop/FrameShopCard.vue'
import BackgroundShopCard from './shop/BackgroundShopCard.vue'
import AvatarShopCard from './shop/AvatarShopCard.vue'
import PurchaseConfirmDialog from './shop/PurchaseConfirmDialog.vue'
import TransactionHistoryModal from './shop/TransactionHistoryModal.vue'

defineEmits(['back'])

const coinsStore = useCoinsStore()
const progressStore = useProgressStore()
const localeStore = useLocaleStore()
const message = useMessage()

const {
  showConfirmDialog,
  pendingPurchase,
  confirmLevelPurchase,
  confirmStickerPurchase,
  confirmFramePurchase,
  confirmBackgroundPurchase,
  confirmAvatarPurchase,
  executePurchase,
  cancelPurchase
} = useShopPurchase()

const t = computed(() => localeStore.t)

const activeTab = ref('stickers')
const showTransactions = ref(false)

const tabs = [
  { key: 'levels', icon: '🔓' },
  { key: 'stickers', icon: '🎨' },
  { key: 'avatars', icon: '🦝' },
  { key: 'frames', icon: '🖼️' },
  { key: 'backgrounds', icon: '🌈' }
]

const operations = ['addition', 'subtraction', 'multiplication', 'division']

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

function equipAvatar(avatar) {
  coinsStore.equipAvatar(avatar.id)
  message.success(t.value.shop.equipped)
}

function unequipAvatar() {
  coinsStore.equipAvatar(null)
}
</script>

<style scoped>
.shop-screen {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 40px;
  position: relative;
  z-index: 2;
}

.shop-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.header-spacer {
  flex: 1;
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

/* Avatars */
.avatars-grid {
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
}
</style>
