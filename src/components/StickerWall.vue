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
      <!-- Achievement Stickers Tab -->
      <n-tab-pane name="achievement" :tab="t.stickerWall?.title || 'Achievement'">
        <div class="operation-sections">
          <div
            v-for="op in operations"
            :key="op.key"
            class="operation-section"
          >
            <h3 class="section-title">
              <span class="op-icon">{{ op.icon }}</span>
              {{ t.operations[op.key] }}
            </h3>
            <div class="sticker-row">
              <div
                v-for="type in stickerTypes"
                :key="`${op.key}_${type.key}`"
                class="sticker-card"
                :class="{ earned: stickersStore.hasSticker(`${op.key}_${type.key}`) }"
                @click="showStickerDetail(`${op.key}_${type.key}`, 'achievement')"
              >
                <div class="sticker-icon">{{ type.icon }}</div>
                <div class="sticker-name">{{ t.stickerWall[type.key] }}</div>
                <div v-if="!stickersStore.hasSticker(`${op.key}_${type.key}`)" class="lock-badge">
                  🔒
                </div>
              </div>
            </div>
          </div>
        </div>
      </n-tab-pane>

      <!-- Purchased Stickers Tab -->
      <n-tab-pane name="purchased" :tab="t.shop?.tabs?.stickers || 'Purchased'">
        <div class="purchased-stickers">
          <div v-for="(stickers, series) in purchasableStickers" :key="series" class="sticker-series">
            <h3 class="series-title">{{ t.shop?.stickerSeries?.[series] || series }}</h3>
            <div class="sticker-row purchased-row">
              <div
                v-for="sticker in stickers"
                :key="sticker.id"
                class="sticker-card"
                :class="{ earned: isPurchasableStickerOwned(sticker.id) }"
                @click="showStickerDetail(sticker.id, 'purchasable')"
              >
                <div class="sticker-icon">{{ sticker.icon }}</div>
                <div class="sticker-name">{{ t.shop?.stickers?.[sticker.nameKey] || sticker.nameKey }}</div>
                <div v-if="!isPurchasableStickerOwned(sticker.id)" class="lock-badge">
                  🔒
                </div>
              </div>
            </div>
          </div>
        </div>
      </n-tab-pane>

      <!-- Hidden Achievements Tab -->
      <n-tab-pane name="hidden" :tab="t.achievements?.title || 'Hidden'">
        <div class="hidden-achievements">
          <p class="hidden-hint">{{ t.achievements?.hint || 'Unlock through special achievements!' }}</p>
          <div class="sticker-row hidden-row">
            <div
              v-for="achievement in hiddenAchievements"
              :key="achievement.id"
              class="sticker-card achievement-card"
              :class="{ earned: stickersStore.hasHiddenAchievement(achievement.id) }"
              @click="showStickerDetail(achievement.id, 'hidden')"
            >
              <div class="sticker-icon">{{ stickersStore.hasHiddenAchievement(achievement.id) ? achievement.icon : '❓' }}</div>
              <div class="sticker-name">{{ stickersStore.hasHiddenAchievement(achievement.id) ? (t.achievements?.[achievement.nameKey] || '???') : '???' }}</div>
              <div v-if="!stickersStore.hasHiddenAchievement(achievement.id)" class="lock-badge">
                🔒
              </div>
            </div>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>

    <!-- Sticker Detail Modal -->
    <n-modal v-model:show="showDetail" preset="card" style="max-width: 350px">
      <template #header>
        <span class="detail-header">{{ selectedSticker?.icon }} {{ getStickerName() }}</span>
      </template>
      <div v-if="selectedSticker" class="sticker-detail">
        <div class="detail-icon">{{ selectedSticker.icon }}</div>

        <!-- Achievement sticker info -->
        <template v-if="selectedCategory === 'achievement'">
          <div v-if="stickerInfo" class="detail-info">
            <p><strong>{{ t.stickerWall.earnedDate }}:</strong> {{ formatDate(stickerInfo.earnedAt) }}</p>
            <p v-if="stickerInfo.accuracy"><strong>{{ t.result.accuracy }}:</strong> {{ stickerInfo.accuracy }}%</p>
          </div>
          <div v-else class="detail-locked">
            <p class="lock-message">{{ t.stickerWall.notEarned }}</p>
            <p class="condition">{{ getCondition(selectedStickerId) }}</p>
          </div>
        </template>

        <!-- Purchasable sticker info -->
        <template v-else-if="selectedCategory === 'purchasable'">
          <div v-if="isPurchasableStickerOwned(selectedStickerId)" class="detail-info">
            <p class="owned-badge">✓ {{ t.shop?.owned || 'Owned' }}</p>
          </div>
          <div v-else class="detail-locked">
            <p class="lock-message">{{ t.stickerWall.notEarned }}</p>
            <p class="shop-hint">{{ t.shop?.title || 'Available in Shop' }}</p>
          </div>
        </template>

        <!-- Hidden achievement info -->
        <template v-else-if="selectedCategory === 'hidden'">
          <div v-if="stickerInfo" class="detail-info">
            <p><strong>{{ t.stickerWall.earnedDate }}:</strong> {{ formatDate(stickerInfo.earnedAt) }}</p>
            <p class="achievement-desc">{{ t.achievements?.[selectedSticker.descKey] || '' }}</p>
          </div>
          <div v-else class="detail-locked">
            <p class="lock-message">❓ {{ t.achievements?.title || 'Hidden Achievement' }}</p>
            <p class="condition">{{ t.achievements?.[selectedSticker?.descKey] || 'Complete special challenges to unlock!' }}</p>
          </div>
        </template>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NProgress, NModal, NTabs, NTabPane } from 'naive-ui'
import { useStickersStore } from '../stores/stickers'
import { useLocaleStore } from '../stores/locale'
import { useCoinsStore } from '../stores/coins'
import { purchasableStickers, hiddenAchievements } from '../config/shop'

const stickersStore = useStickersStore()
const localeStore = useLocaleStore()
const coinsStore = useCoinsStore()

const t = computed(() => localeStore.t)

const activeTab = ref('achievement')
const showDetail = ref(false)
const selectedStickerId = ref(null)
const selectedCategory = ref('achievement') // 'achievement', 'purchasable', 'hidden'

const operations = [
  { key: 'addition', icon: '✨' },
  { key: 'subtraction', icon: '✂️' },
  { key: 'multiplication', icon: '⭐' },
  { key: 'division', icon: '🍕' },
  { key: 'fraction', icon: '🍰' }
]

const stickerTypes = [
  { key: 'bronze', icon: '🥉' },
  { key: 'silver', icon: '🥈' },
  { key: 'gold', icon: '🥇' },
  { key: 'crown', icon: '👑' }
]

const selectedSticker = computed(() => {
  if (!selectedStickerId.value) return null

  if (selectedCategory.value === 'achievement') {
    return stickersStore.allStickers.find(s => s.id === selectedStickerId.value)
  } else if (selectedCategory.value === 'purchasable') {
    const allPurchasable = Object.values(purchasableStickers).flat()
    return allPurchasable.find(s => s.id === selectedStickerId.value)
  } else if (selectedCategory.value === 'hidden') {
    return hiddenAchievements.find(a => a.id === selectedStickerId.value)
  }
  return null
})

const stickerInfo = computed(() => {
  if (!selectedStickerId.value) return null

  if (selectedCategory.value === 'achievement') {
    return stickersStore.getSticker(selectedStickerId.value)
  } else if (selectedCategory.value === 'hidden') {
    return stickersStore.getHiddenAchievement(selectedStickerId.value)
  }
  return null
})

// Individual counts
const achievementCount = computed(() => stickersStore.getEarnedCount())
const hiddenCount = computed(() => stickersStore.getHiddenAchievementCount())
const purchasedCount = computed(() => coinsStore.getPurchasedItemsByType('sticker').length)

// Total sticker counts
const totalEarnedCount = computed(() => {
  return achievementCount.value + hiddenCount.value + purchasedCount.value
})

const totalPossibleCount = computed(() => stickersStore.getTotalPossibleCount())

function getStickerName() {
  if (!selectedStickerId.value) return ''

  if (selectedCategory.value === 'achievement') {
    const [op, type] = selectedStickerId.value.split('_')
    return `${t.value.operations[op]} ${t.value.stickerWall[type]}`
  } else if (selectedCategory.value === 'purchasable') {
    const sticker = selectedSticker.value
    if (sticker) {
      return t.value.shop?.stickers?.[sticker.nameKey] || sticker.nameKey
    }
  } else if (selectedCategory.value === 'hidden') {
    const achievement = selectedSticker.value
    if (achievement) {
      return t.value.achievements?.[achievement.nameKey] || achievement.nameKey
    }
  }
  return ''
}

function showStickerDetail(id, category = 'achievement') {
  selectedStickerId.value = id
  selectedCategory.value = category
  showDetail.value = true
}

function isPurchasableStickerOwned(stickerId) {
  return coinsStore.hasPurchasedItem(stickerId)
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString(localeStore.currentLocale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getCondition(stickerId) {
  if (!stickerId) return ''
  const [, type] = stickerId.split('_')
  return t.value.stickerWall.condition[type] || ''
}
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

.operation-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.operation-section {
  background: white;
  border-radius: 12px;
  padding: 15px;
  border: 1px solid var(--secondary-color, #FFB6C1);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
}

.op-icon {
  font-size: 20px;
}

.sticker-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.sticker-card {
  width: 70px;
  height: 80px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.sticker-card.earned {
  background: linear-gradient(135deg, var(--light-color, #FFF0F5), var(--secondary-color, #FFB6C1));
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
}

.sticker-card:not(.earned) {
  filter: grayscale(1);
  opacity: 0.5;
}

.sticker-card:hover {
  transform: scale(1.05);
}

.sticker-icon {
  font-size: 32px;
}

.sticker-name {
  font-size: 11px;
  color: #666;
  margin-top: 4px;
}

.lock-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 12px;
}

/* Detail modal */
.detail-header {
  font-size: 18px;
}

.sticker-detail {
  text-align: center;
  padding: 10px;
}

.detail-icon {
  font-size: 80px;
  margin-bottom: 20px;
  animation: bounce 1s ease infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.detail-info {
  text-align: left;
}

.detail-info p {
  margin: 8px 0;
  color: #666;
}

.detail-locked {
  color: #999;
}

.lock-message {
  font-size: 18px;
  margin-bottom: 10px;
}

.condition {
  font-size: 14px;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
}

/* Purchased stickers section */
.purchased-stickers {
  padding: 10px 0;
}

.sticker-series {
  margin-bottom: 20px;
}

.series-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  padding-left: 8px;
  border-left: 3px solid var(--primary-color, #FF69B4);
}

.purchased-row {
  gap: 8px;
}

/* Hidden achievements section */
.hidden-achievements {
  padding: 10px 0;
}

.hidden-hint {
  font-size: 13px;
  color: #666;
  text-align: center;
  margin-bottom: 15px;
  padding: 10px;
  background: var(--light-color, #FFF0F5);
  border-radius: 10px;
}

.hidden-row {
  justify-content: center;
  gap: 10px;
}

.achievement-card {
  min-width: 85px;
}

.achievement-card:not(.earned) .sticker-icon {
  font-size: 28px;
}

/* Detail modal additions */
.owned-badge {
  display: inline-block;
  background: #81C784;
  color: white;
  padding: 6px 14px;
  border-radius: 12px;
  font-weight: 600;
  margin-bottom: 10px;
}

.shop-hint {
  font-size: 14px;
  color: var(--primary-color, #FF69B4);
  background: var(--light-color, #FFF0F5);
  padding: 10px;
  border-radius: 8px;
}

.achievement-desc {
  font-size: 14px;
  color: #52C41A;
  font-style: italic;
  margin-top: 8px;
}
</style>
