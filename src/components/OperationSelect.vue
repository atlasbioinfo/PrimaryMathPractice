<template>
  <div class="operation-select">
    <div class="header">
      <n-button quaternary circle @click="$emit('back')">
        <template #icon>
          <span style="font-size: 24px">←</span>
        </template>
      </n-button>
      <h2 class="title">{{ t.operations.title }}</h2>
      <div style="width: 40px"></div>
    </div>

    <div class="operation-cards">
      <div
        v-for="op in operations"
        :key="op.key"
        class="operation-card"
        @click="selectOperation(op.key)"
      >
        <div class="card-icon">{{ op.icon }}</div>
        <div class="card-content">
          <h3 class="card-title">{{ getOperationName(op.key) }}</h3>
          <p class="card-symbol">{{ op.symbol }}</p>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: `${getProgress(op.key)}%` }"
            ></div>
          </div>
          <p class="progress-text">
            {{ localeStore.translate('operations.levelsCompleted', { count: getCompletedLevels(op.key) }) }}
          </p>
        </div>
        <div class="card-stickers">
          <span
            v-for="sticker in getOperationStickers(op.key)"
            :key="sticker.type"
            class="mini-sticker"
            :class="{ earned: stickersStore.hasSticker(`${op.key}_${sticker.type}`) }"
          >
            {{ sticker.icon }}
          </span>
        </div>
        <div class="card-badge" v-if="progressStore.isOperationMastered(op.key)">
          👑
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { NButton } from 'naive-ui'
import { useProgressStore } from '../stores/progress'
import { useStickersStore } from '../stores/stickers'
import { useLocaleStore } from '../stores/locale'
import { useSound } from '../composables/useSound'

const emit = defineEmits(['back', 'select'])

const progressStore = useProgressStore()
const stickersStore = useStickersStore()
const localeStore = useLocaleStore()
const { playClickSound } = useSound()

const t = computed(() => localeStore.t)

const operations = [
  { key: 'addition', symbol: '+', icon: '✨' },
  { key: 'subtraction', symbol: '−', icon: '✂️' },
  { key: 'multiplication', symbol: '×', icon: '⭐' },
  { key: 'division', symbol: '÷', icon: '🍕' },
  { key: 'fraction', symbol: '/', icon: '🍰' }
]

const stickerTypes = [
  { type: 'bronze', icon: '🥉' },
  { type: 'silver', icon: '🥈' },
  { type: 'gold', icon: '🥇' },
  { type: 'crown', icon: '👑' }
]

function getOperationName(key) {
  return t.value.operations[key]
}

function getOperationStickers(opKey) {
  return stickerTypes
}

function getCompletedLevels(opKey) {
  return progressStore.getCompletedLevelCount(opKey)
}

function getProgress(opKey) {
  return (getCompletedLevels(opKey) / 6) * 100
}

function selectOperation(opKey) {
  playClickSound()
  emit('select', opKey)
}
</script>

<style scoped>
.operation-select {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.title {
  font-size: 28px;
  color: var(--primary-color, #FF69B4);
  text-align: center;
}

.operation-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.operation-card {
  background: white;
  border-radius: 20px;
  padding: 25px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  border: 2px solid var(--secondary-color, #FFB6C1);
  overflow: hidden;
}

.operation-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.15);
  border-color: var(--primary-color, #FF69B4);
}

.card-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 40px;
  opacity: 0.3;
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 5px;
}

.card-symbol {
  font-size: 36px;
  color: var(--primary-color, #FF69B4);
  font-weight: bold;
  margin-bottom: 15px;
}

.progress-bar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color, #FF69B4), var(--accent-color, #FF1493));
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 14px;
  color: #999;
}

.card-stickers {
  display: flex;
  gap: 8px;
  margin-top: 15px;
}

.mini-sticker {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: #f5f5f5;
  transition: all 0.3s;
}

.mini-sticker.earned {
  background: linear-gradient(135deg, var(--light-color, #FFF0F5), var(--secondary-color, #FFB6C1));
  box-shadow: 0 2px 8px rgba(255, 105, 180, 0.3);
}

.mini-sticker:not(.earned) {
  filter: grayscale(1);
  opacity: 0.4;
}

.card-badge {
  position: absolute;
  top: -5px;
  left: -5px;
  font-size: 30px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Tablet */
@media (max-width: 768px) {
  .operation-select {
    padding: 16px;
    padding-top: 60px;
  }

  .header {
    margin-bottom: 20px;
  }

  .operation-cards {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }
}

/* Mobile */
@media (max-width: 500px) {
  .operation-select {
    padding: 12px;
    padding-top: 55px;
  }

  .header {
    margin-bottom: 16px;
  }

  .title {
    font-size: 20px;
  }

  .operation-cards {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .operation-card {
    padding: 18px;
    border-radius: 16px;
  }

  .card-icon {
    font-size: 32px;
    top: 12px;
    right: 12px;
  }

  .card-title {
    font-size: 18px;
  }

  .card-symbol {
    font-size: 28px;
    margin-bottom: 12px;
  }

  .progress-bar {
    height: 6px;
    margin-bottom: 6px;
  }

  .progress-text {
    font-size: 12px;
  }

  .card-stickers {
    gap: 6px;
    margin-top: 12px;
  }

  .mini-sticker {
    width: 28px;
    height: 28px;
    font-size: 16px;
    border-radius: 6px;
  }

  .card-badge {
    font-size: 24px;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .operation-select {
    padding: 10px;
    padding-top: 50px;
  }

  .title {
    font-size: 18px;
  }

  .operation-card {
    padding: 14px;
  }

  .card-title {
    font-size: 16px;
  }

  .card-symbol {
    font-size: 24px;
  }
}
</style>
