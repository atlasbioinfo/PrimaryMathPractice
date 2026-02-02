<template>
  <div class="level-select">
    <div class="header">
      <n-button quaternary circle @click="$emit('back')">
        <template #icon>
          <span style="font-size: 24px">{{ backArrow }}</span>
        </template>
      </n-button>
      <h2 class="title">
        <span class="op-icon">{{ operationInfo.icon }}</span>
        {{ operationName }}
      </h2>
      <div style="width: 40px"></div>
    </div>

    <div class="level-cards" role="listbox" aria-label="Level selection">
      <LevelCard
        v-for="level in TOTAL_LEVELS"
        :key="level"
        :level="level"
        :icon="levelIcons[level]"
        :name="getLevelName(level)"
        :description="getLevelDesc(level)"
        :level-label="`${t.levels.level} ${level}`"
        :best-label="t.levels.best"
        :is-locked="level > progress.unlockedLevel"
        :is-completed="progress.completedLevels.includes(level)"
        :is-focused="focusedIndex === level - 1"
        :unlock-price="levelUnlockPrices[level]"
        :score="progress.levelScores[level]"
        :set-card-ref="(el) => setCardRef(el, level - 1)"
        @select="selectLevel(level)"
        @keydown="handleKeydown"
        @focus="setFocusedIndex(level - 1)"
      />
    </div>

    <LevelUnlockDialog
      v-model:show="showUnlockDialog"
      :level-icon="levelToUnlock ? levelIcons[levelToUnlock] : ''"
      :level-label="`${t.levels.level} ${levelToUnlock}`"
      :level-title="levelToUnlock ? getLevelName(levelToUnlock) : ''"
      :price="levelToUnlock ? getUnlockPrice(levelToUnlock) : 0"
      :current-balance="coinsStore.balance"
      :header-text="t.shop?.tabs?.levels || 'Unlock Level'"
      :balance-after-text="t.shop?.balanceAfter || 'Balance after'"
      :cancel-text="t.common?.cancel || 'Cancel'"
      :buy-text="t.shop?.buy || 'Buy'"
      @cancel="showUnlockDialog = false"
      @confirm="purchaseUnlock"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import { useUserStore } from '../stores/user.js'
import { useProgressStore } from '../stores/progress.js'
import { useLocaleStore } from '../stores/locale.js'
import { useCoinsStore } from '../stores/coins.js'
import { operationConfig, levelIcons } from '../config/levels.js'
import { levelUnlockPrices } from '../config/shop.js'
import { useSound } from '../composables/useSound.js'
import { useConfetti } from '../composables/useConfetti.js'
import { useLevelNavigation } from '../composables/useLevelNavigation.js'
import LevelCard from './level-select/LevelCard.vue'
import LevelUnlockDialog from './level-select/LevelUnlockDialog.vue'

const TOTAL_LEVELS = 6
const backArrow = '←'

const props = defineProps({
  operation: { type: String, required: true }
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
const operationName = computed(() => t.value.operations[props.operation])
const progress = computed(() => progressStore.getOperationProgress(props.operation))

const showUnlockDialog = ref(false)
const levelToUnlock = ref(null)

const { focusedIndex, setCardRef, handleKeydown, setFocusedIndex } = useLevelNavigation({
  totalLevels: TOTAL_LEVELS,
  onSelect: selectLevel,
  onBack: () => emit('back')
})

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
}
</style>
