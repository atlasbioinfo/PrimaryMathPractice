<template>
  <div class="level-select">
    <div class="header">
      <n-button quaternary circle @click="$emit('back')">
        <template #icon>
          <span style="font-size: 24px">←</span>
        </template>
      </n-button>
      <h2 class="title">
        <span class="op-icon">{{ operationInfo.icon }}</span>
        {{ getOperationName() }}
      </h2>
      <div style="width: 40px"></div>
    </div>

    <div class="level-cards">
      <div
        v-for="level in 6"
        :key="level"
        class="level-card"
        :class="{
          locked: level > progress.unlockedLevel,
          completed: progress.completedLevels.includes(level)
        }"
        @click="selectLevel(level)"
      >
        <div v-if="level > progress.unlockedLevel" class="lock-overlay" :class="{ purchasable: levelUnlockPrices[level] }">
          <span class="lock-icon">🔒</span>
          <div v-if="levelUnlockPrices[level]" class="unlock-price">
            <span class="coin-icon">🪙</span>
            {{ levelUnlockPrices[level] }}
          </div>
        </div>
        <div v-if="progress.completedLevels.includes(level)" class="star-badge">
          ⭐
        </div>

        <div class="level-number">{{ t.levels.level }} {{ level }}</div>
        <div class="level-icon">{{ levelIcons[level] }}</div>
        <div class="level-name">{{ getLevelName(level) }}</div>
        <div class="level-desc">{{ getLevelDesc(level) }}</div>

        <div v-if="progress.levelScores[level]" class="level-score">
          {{ t.levels.best }}: {{ progress.levelScores[level].score }}/10
          ({{ progress.levelScores[level].accuracy }}%)
        </div>
      </div>
    </div>

    <!-- Level Unlock Dialog -->
    <n-modal v-model:show="showUnlockDialog" preset="card" style="max-width: 350px">
      <template #header>
        <span>🔓 {{ t.shop?.tabs?.levels || 'Unlock Level' }}</span>
      </template>
      <div class="unlock-dialog-content">
        <div class="unlock-level-icon">{{ levelIcons[levelToUnlock] }}</div>
        <div class="unlock-level-name">{{ t.levels.level }} {{ levelToUnlock }}</div>
        <div class="unlock-level-title">{{ levelToUnlock ? getLevelName(levelToUnlock) : '' }}</div>
        <div class="unlock-price-display">
          <span class="coin-icon">🪙</span>
          <span class="price-amount">{{ levelToUnlock ? getUnlockPrice(levelToUnlock) : 0 }}</span>
        </div>
        <div class="current-balance">
          {{ t.shop?.balanceAfter || 'Balance after' }}: {{ coinsStore.balance - (levelToUnlock ? getUnlockPrice(levelToUnlock) : 0) }}
        </div>
      </div>
      <template #footer>
        <div class="unlock-dialog-actions">
          <n-button @click="showUnlockDialog = false">{{ t.common?.cancel || 'Cancel' }}</n-button>
          <n-button
            type="primary"
            :disabled="!canAffordUnlock(levelToUnlock)"
            @click="purchaseUnlock"
          >
            {{ t.shop?.buy || 'Buy' }}
          </n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NButton, NModal, useMessage } from 'naive-ui'
import { useUserStore } from '../stores/user'
import { useProgressStore } from '../stores/progress'
import { useLocaleStore } from '../stores/locale'
import { useCoinsStore } from '../stores/coins'
import { operationConfig, levelIcons } from '../config/levels'
import { levelUnlockPrices } from '../config/shop'
import { useSound } from '../composables/useSound'
import { useConfetti } from '../composables/useConfetti'

const props = defineProps({
  operation: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['back', 'select'])

const userStore = useUserStore()
const progressStore = useProgressStore()
const localeStore = useLocaleStore()
const coinsStore = useCoinsStore()
const message = useMessage()
const { playClickSound, playUnlockSound } = useSound()
const { unlockCelebration } = useConfetti()

const t = computed(() => localeStore.t)
const operationInfo = computed(() => operationConfig[props.operation])
const progress = computed(() => progressStore.getOperationProgress(props.operation))

const showUnlockDialog = ref(false)
const levelToUnlock = ref(null)

function getOperationName() {
  return t.value.operations[props.operation]
}

function getLevelName(level) {
  if (level === 6) {
    const titles = userStore.gender === 'prince'
      ? t.value.levels.princeTitle
      : t.value.levels.princessTitle
    return titles[props.operation]
  }
  return t.value.levels.levelNames[level]
}

function getLevelDesc(level) {
  return operationInfo.value.levels[level].description
}

function selectLevel(level) {
  if (level > progress.value.unlockedLevel) {
    // Show unlock option for locked levels
    if (levelUnlockPrices[level]) {
      levelToUnlock.value = level
      showUnlockDialog.value = true
    }
    return
  }
  playClickSound()
  emit('select', level)
}

function getUnlockPrice(level) {
  return levelUnlockPrices[level] || 0
}

function canAffordUnlock(level) {
  return coinsStore.canAfford(getUnlockPrice(level))
}

function purchaseUnlock() {
  if (!levelToUnlock.value) return

  const price = getUnlockPrice(levelToUnlock.value)
  if (!coinsStore.canAfford(price)) {
    message.error(t.value.shop?.purchaseFailed || 'Not enough coins')
    return
  }

  if (coinsStore.spendCoins(price, 'level_unlock', `${props.operation}_${levelToUnlock.value}`)) {
    progressStore.purchaseUnlock(props.operation, levelToUnlock.value)
    playUnlockSound()
    unlockCelebration()
    message.success(t.value.shop?.purchaseSuccess || 'Level unlocked!')
    showUnlockDialog.value = false
    levelToUnlock.value = null
  }
}
</script>

<style scoped>
.level-select {
  max-width: 900px;
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
  display: flex;
  align-items: center;
  gap: 10px;
}

.op-icon {
  font-size: 32px;
}

.level-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.level-card {
  background: white;
  border-radius: 20px;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  border: 2px solid var(--secondary-color, #FFB6C1);
  overflow: hidden;
}

.level-card:hover:not(.locked) {
  transform: translateY(-8px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.15);
  border-color: var(--primary-color, #FF69B4);
}

.level-card.locked {
  opacity: 0.6;
  cursor: not-allowed;
}

.level-card.completed {
  background: linear-gradient(135deg, var(--light-color, #FFF0F5), white);
  border-color: var(--primary-color, #FF69B4);
}

.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 18px;
  z-index: 10;
  cursor: default;
}

.lock-overlay.purchasable {
  cursor: pointer;
  transition: background 0.3s;
}

.lock-overlay.purchasable:hover {
  background: rgba(0,0,0,0.4);
}

.lock-icon {
  font-size: 40px;
}

.unlock-price {
  display: flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, #FFF9E6, #FFE4B5);
  border: 2px solid #FFD700;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #B8860B;
}

.unlock-price .coin-icon {
  font-size: 14px;
}

/* Unlock Dialog */
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

.unlock-price-display .coin-icon {
  font-size: 24px;
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

.star-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 30px;
  animation: pulse 1.5s infinite;
  z-index: 5;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.level-number {
  font-size: 14px;
  color: #999;
  margin-bottom: 10px;
}

.level-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.level-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.level-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.level-score {
  font-size: 12px;
  color: var(--primary-color, #FF69B4);
  background: var(--light-color, #FFF0F5);
  padding: 5px 10px;
  border-radius: 10px;
  display: inline-block;
}

/* Tablet */
@media (max-width: 768px) {
  .level-select {
    padding: 16px;
    padding-top: 60px;
  }

  .header {
    margin-bottom: 20px;
  }

  .level-cards {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
  }
}

/* Mobile */
@media (max-width: 500px) {
  .level-select {
    padding: 12px;
    padding-top: 55px;
  }

  .header {
    margin-bottom: 16px;
  }

  .title {
    font-size: 18px;
    gap: 6px;
  }

  .op-icon {
    font-size: 24px;
  }

  .level-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .level-card {
    padding: 16px 12px;
    border-radius: 16px;
  }

  .lock-icon {
    font-size: 32px;
  }

  .star-badge {
    font-size: 24px;
    top: -3px;
    right: -3px;
  }

  .level-number {
    font-size: 12px;
    margin-bottom: 6px;
  }

  .level-icon {
    font-size: 36px;
    margin-bottom: 6px;
  }

  .level-name {
    font-size: 14px;
    margin-bottom: 4px;
  }

  .level-desc {
    font-size: 11px;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .level-score {
    font-size: 10px;
    padding: 4px 8px;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .level-select {
    padding: 10px;
    padding-top: 50px;
  }

  .title {
    font-size: 16px;
  }

  .level-cards {
    gap: 8px;
  }

  .level-card {
    padding: 12px 10px;
  }

  .level-icon {
    font-size: 30px;
  }

  .level-name {
    font-size: 13px;
  }

  .level-desc {
    font-size: 10px;
  }
}
</style>
