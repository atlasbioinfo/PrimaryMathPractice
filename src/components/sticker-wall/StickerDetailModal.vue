<template>
  <n-modal v-model:show="showModal" preset="card" style="max-width: 350px">
    <template #header>
      <span class="detail-header">{{ sticker?.icon }} {{ stickerName }}</span>
    </template>
    <div v-if="sticker" class="sticker-detail">
      <div class="detail-icon">{{ sticker.icon }}</div>

      <!-- Achievement sticker info -->
      <template v-if="category === 'achievement'">
        <div v-if="stickerInfo" class="detail-info">
          <p><strong>{{ t.stickerWall.earnedDate }}:</strong> {{ formatDate(stickerInfo.earnedAt) }}</p>
          <p v-if="stickerInfo.accuracy"><strong>{{ t.result.accuracy }}:</strong> {{ stickerInfo.accuracy }}%</p>
        </div>
        <div v-else class="detail-locked">
          <p class="lock-message">{{ t.stickerWall.notEarned }}</p>
          <p class="condition">{{ condition }}</p>
        </div>
      </template>

      <!-- Purchasable sticker info -->
      <template v-else-if="category === 'purchasable'">
        <div v-if="isPurchasableOwned" class="detail-info">
          <p class="owned-badge">&#x2713; {{ t.shop?.owned || 'Owned' }}</p>
        </div>
        <div v-else class="detail-locked">
          <p class="lock-message">{{ t.stickerWall.notEarned }}</p>
          <p class="shop-hint">{{ t.shop?.title || 'Available in Shop' }}</p>
        </div>
      </template>

      <!-- Hidden achievement info -->
      <template v-else-if="category === 'hidden'">
        <div v-if="stickerInfo" class="detail-info">
          <p><strong>{{ t.stickerWall.earnedDate }}:</strong> {{ formatDate(stickerInfo.earnedAt) }}</p>
          <p class="achievement-desc">{{ t.achievements?.[sticker.descKey] || '' }}</p>
        </div>
        <div v-else class="detail-locked">
          <p class="lock-message">&#10067; {{ t.achievements?.title || 'Hidden Achievement' }}</p>
          <p class="condition">{{ t.achievements?.[sticker?.descKey] || 'Complete special challenges to unlock!' }}</p>
        </div>
      </template>
    </div>
  </n-modal>
</template>

<script setup>
import { computed } from 'vue'
import { NModal } from 'naive-ui'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  sticker: {
    type: Object,
    default: null
  },
  stickerInfo: {
    type: Object,
    default: null
  },
  stickerName: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'achievement'
  },
  condition: {
    type: String,
    default: ''
  },
  isPurchasableOwned: {
    type: Boolean,
    default: false
  },
  t: {
    type: Object,
    required: true
  },
  formatDate: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['update:show'])

const showModal = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})
</script>

<style scoped>
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
