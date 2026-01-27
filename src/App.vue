<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <!-- User Menu (top right) -->
        <UserMenu v-if="!userStore.isNewUser" />

        <!-- Floating decorations -->
        <FloatingDecorations v-if="!userStore.isNewUser" />

        <!-- App Footer with privacy notice -->
        <AppFooter v-if="!userStore.isNewUser && currentScreen === 'home'" />

        <!-- Global Coin Display (when not on home/shop) -->
        <div
          v-if="!userStore.isNewUser && currentScreen !== 'home' && currentScreen !== 'shop'"
          class="global-coin-display"
        >
          <CoinDisplay />
        </div>

        <!-- App frame -->
        <div class="app-frame" :class="userStore.theme.name">
          <div class="app-container" :style="equippedBackground ? backgroundStyle : {}" :class="{ 'custom-bg': equippedBackground }">
            <!-- Gender Selection (First time) -->
            <GenderSelect
              v-if="userStore.isNewUser"
              @selected="onGenderSelected"
            />

            <!-- Home Screen -->
            <HomeScreen
              v-else-if="currentScreen === 'home'"
              @startGame="goToOperationSelect"
              @openShop="goToShop"
            />

            <!-- Shop Screen -->
            <ShopScreen
              v-else-if="currentScreen === 'shop'"
              @back="goHome"
            />

            <!-- Operation Selection -->
            <OperationSelect
              v-else-if="currentScreen === 'operationSelect'"
              @back="goHome"
              @select="onOperationSelect"
            />

            <!-- Level Selection -->
            <LevelSelect
              v-else-if="currentScreen === 'levelSelect'"
              :operation="selectedOperation"
              @back="goToOperationSelect"
              @select="onLevelSelect"
            />

            <!-- Game Screen -->
            <GameScreen
              v-else-if="currentScreen === 'playing'"
              :operation="selectedOperation"
              :level="selectedLevel"
              @complete="onGameComplete"
              @quit="onGameQuit"
            />

            <!-- Result Screen -->
            <ResultScreen
              v-else-if="currentScreen === 'result'"
              :operation="selectedOperation"
              :level="selectedLevel"
              @home="goHome"
              @retry="retryLevel"
              @next="nextLevel"
            />
          </div>
        </div>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  NConfigProvider,
  NMessageProvider,
  NDialogProvider
} from 'naive-ui'
import { useUserStore } from './stores/user'
import { useGameStore } from './stores/game'
import { useCoinsStore } from './stores/coins'
import { useTheme } from './composables/useTheme'
import { generateQuestions } from './config/levels'
import { backgroundThemes } from './config/shop'

import FloatingDecorations from './components/FloatingDecorations.vue'
import UserMenu from './components/UserMenu.vue'
import GenderSelect from './components/GenderSelect.vue'
import HomeScreen from './components/HomeScreen.vue'
import OperationSelect from './components/OperationSelect.vue'
import LevelSelect from './components/LevelSelect.vue'
import GameScreen from './components/GameScreen.vue'
import ResultScreen from './components/ResultScreen.vue'
import ShopScreen from './components/ShopScreen.vue'
import CoinDisplay from './components/CoinDisplay.vue'
import AppFooter from './components/AppFooter.vue'

const userStore = useUserStore()
const gameStore = useGameStore()
const coinsStore = useCoinsStore()
const { themeOverrides, applyTheme } = useTheme()

const currentScreen = ref('home')
const selectedOperation = ref(null)
const selectedLevel = ref(null)

// Get equipped background theme
const equippedBackground = computed(() => {
  if (!coinsStore.equippedBackground) return null
  return backgroundThemes.find(bg => bg.id === coinsStore.equippedBackground)
})

const backgroundStyle = computed(() => {
  if (!equippedBackground.value) return {}
  return {
    background: equippedBackground.value.gradient
  }
})

function onGenderSelected(gender) {
  applyTheme()
}

function goHome() {
  currentScreen.value = 'home'
  gameStore.reset()
}

function goToShop() {
  currentScreen.value = 'shop'
}

function goToOperationSelect() {
  currentScreen.value = 'operationSelect'
}

function onOperationSelect(operation) {
  selectedOperation.value = operation
  currentScreen.value = 'levelSelect'
}

function onLevelSelect(level) {
  selectedLevel.value = level
  startGame()
}

function startGame() {
  const questions = generateQuestions(selectedOperation.value, selectedLevel.value, 10)
  gameStore.startGame(selectedOperation.value, selectedLevel.value, questions)
  currentScreen.value = 'playing'
}

function onGameComplete() {
  currentScreen.value = 'result'
}

function onGameQuit() {
  currentScreen.value = 'levelSelect'
}

function retryLevel() {
  startGame()
}

function nextLevel() {
  selectedLevel.value++
  startGame()
}

onMounted(() => {
  applyTheme()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Global Coin Display */
.global-coin-display {
  position: fixed;
  top: 12px;
  left: 16px;
  z-index: 1000;
}

@media (max-width: 500px) {
  .global-coin-display {
    top: 10px;
    left: 12px;
  }
}

:root {
  --primary-color: #FF69B4;
  --secondary-color: #FFB6C1;
  --background-color: #FFF0F5;
  --light-color: #FFF5F8;
  --accent-color: #FF1493;
}

html {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ffecd2 100%);
  min-height: 100vh;
  min-height: -webkit-fill-available;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Ensure proper height on iOS */
html, body, #app {
  height: 100%;
}

.app-frame {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  padding: 6px;
  background: linear-gradient(
    135deg,
    #FF69B4,
    #FFB6C1,
    #FF69B4,
    #FF1493
  );
  border-radius: 0;
}

.app-frame.prince {
  background: linear-gradient(
    135deg,
    #4A90D9,
    #87CEEB,
    #4A90D9,
    #1E90FF
  );
}

.app-container {
  min-height: calc(100vh - 12px);
  min-height: calc(-webkit-fill-available - 12px);
  background: linear-gradient(135deg, var(--light-color) 0%, var(--background-color) 50%, var(--light-color) 100%);
  border-radius: 16px;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* Theme-specific backgrounds */
.app-frame.princess .app-container {
  background: linear-gradient(135deg, #FFF5F8 0%, #FFF0F5 50%, #FFE4EC 100%);
}

.app-frame.prince .app-container {
  background: linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 50%, #DBEAFE 100%);
}

/* Better touch targets for mobile */
@media (pointer: coarse) {
  button, .clickable, [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Tablet */
@media (max-width: 768px) {
  .app-frame {
    padding: 5px;
  }

  .app-container {
    min-height: calc(100vh - 10px);
    border-radius: 14px;
  }
}

/* Mobile */
@media (max-width: 500px) {
  .app-frame {
    padding: 4px;
  }

  .app-container {
    min-height: calc(100vh - 8px);
    border-radius: 12px;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .app-frame {
    padding: 3px;
  }

  .app-container {
    min-height: calc(100vh - 6px);
    border-radius: 10px;
  }
}

/* Safe area insets for notched phones */
@supports (padding: max(0px)) {
  .app-frame {
    padding-left: max(6px, env(safe-area-inset-left));
    padding-right: max(6px, env(safe-area-inset-right));
    padding-bottom: max(6px, env(safe-area-inset-bottom));
  }

  @media (max-width: 500px) {
    .app-frame {
      padding-left: max(4px, env(safe-area-inset-left));
      padding-right: max(4px, env(safe-area-inset-right));
      padding-bottom: max(4px, env(safe-area-inset-bottom));
    }
  }
}

/* Prevent overscroll bounce on iOS */
@media screen and (max-width: 768px) {
  body {
    position: fixed;
    width: 100%;
  }

  .app-container {
    height: calc(100vh - 8px);
    overflow-y: auto;
  }
}
</style>
