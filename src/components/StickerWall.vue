<template>
  <div class="sticker-wall">
    <!-- Summary with stats -->
    <div class="sticker-summary">
      <div class="summary-stats">
        <div class="stat-box">
          <span class="stat-value">{{ achievementCount }}</span>
          <span class="stat-label">{{ t.stickerWall?.title || 'Achievement' }}</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">{{ purchasedCount }}</span>
          <span class="stat-label">{{ t.shop?.tabs?.stickers || 'Purchased' }}</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">{{ hiddenCount }}</span>
          <span class="stat-label">{{ t.achievements?.title || 'Hidden' }}</span>
        </div>
      </div>
      <div class="progress-section">
        <span class="summary-text">
          {{ localeStore.translate('stickerWall.collected', {
            earned: totalEarnedCount,
            total: totalPossibleCount
          }) }}
        </span>
        <n-progress
          type="line"
          :percentage="(totalEarnedCount / totalPossibleCount) * 100"
          :height="10"
          :border-radius="5"
          :show-indicator="false"
        />
      </div>
    </div>

    <n-tabs v-model:value="activeTab" type="segment" animated>
      <n-tab-pane name="achievement" :tab="t.stickerWall?.title || 'Achievement'">
        <AchievementTab @show-detail="showStickerDetail" />
      </n-tab-pane>

      <n-tab-pane name="purchased" :tab="t.shop?.tabs?.stickers || 'Purchased'">
        <PurchasedTab @show-detail="showStickerDetail" />
      </n-tab-pane>

      <n-tab-pane name="hidden" :tab="t.achievements?.title || 'Hidden'">
        <HiddenTab @show-detail="showStickerDetail" />
      </n-tab-pane>
    </n-tabs>

    <StickerDetailModal
      v-model:show="showDetail"
      :sticker="selectedSticker"
      :sticker-info="stickerInfo"
      :sticker-name="getStickerName()"
      :category="selectedCategory"
      :condition="getCondition(selectedStickerId)"
      :is-purchasable-owned="isPurchasableStickerOwned(selectedStickerId)"
      :t="t"
      :format-date="formatDate"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NProgress, NTabs, NTabPane } from 'naive-ui'
import { useStickerWall } from '../composables/useStickerWall.js'
import AchievementTab from './sticker-wall/AchievementTab.vue'
import PurchasedTab from './sticker-wall/PurchasedTab.vue'
import HiddenTab from './sticker-wall/HiddenTab.vue'
import StickerDetailModal from './sticker-wall/StickerDetailModal.vue'

const {
  showDetail,
  selectedStickerId,
  selectedCategory,
  selectedSticker,
  stickerInfo,
  achievementCount,
  hiddenCount,
  purchasedCount,
  totalEarnedCount,
  totalPossibleCount,
  showStickerDetail,
  isPurchasableStickerOwned,
  getStickerName,
  getCondition,
  formatDate,
  localeStore,
  t
} = useStickerWall()

const activeTab = ref('achievement')
</script>

<style scoped>
.sticker-wall {
  padding: 10px;
}

.sticker-summary {
  margin-bottom: 20px;
  padding: 15px;
  background: var(--light-color, #FFF0F5);
  border-radius: 12px;
}

.summary-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--secondary-color, #FFB6C1);
}

.stat-box {
  text-align: center;
}

.stat-box .stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color, #FF69B4);
}

.stat-box .stat-label {
  font-size: 11px;
  color: #888;
}

.progress-section {
  padding-top: 5px;
}

.summary-text {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: var(--primary-color, #FF69B4);
}
</style>
