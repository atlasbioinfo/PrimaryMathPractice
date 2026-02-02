<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <!-- User Menu (top right) -->
        <UserMenu v-if="!userStore.isNewUser" />

        <!-- Custom theme background layer -->
        <div v-if="equippedBackground" class="theme-background" :style="backgroundStyle"></div>

        <!-- Theme particles (animated effects for purchased themes) -->
        <ThemeParticles v-if="!userStore.isNewUser && equippedBackground" />

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
        <div class="app-frame" :class="[userStore.theme.name, { 'custom-theme': equippedBackground }]">
          <div class="app-container" :class="{ 'custom-bg': equippedBackground }">
            <!-- Gender Selection (First time) -->
            <GenderSelect
              v-if="userStore.isNewUser"
              @selected="applyTheme"
            />

            <!-- Home Screen -->
            <HomeScreen
              v-else-if="currentScreen === 'home'"
              @startGame="goToOperationSelect"
              @openShop="goToShop"
              @openDailyChallenge="goToDailyChallenge"
              @openWrongQuestions="goToWrongQuestions"
            />

            <!-- Shop Screen -->
            <ShopScreen
              v-else-if="currentScreen === 'shop'"
              @back="goHome"
            />

            <!-- Daily Challenge Screen -->
            <DailyChallengeScreen
              v-else-if="currentScreen === 'dailyChallenge'"
              @back="goHome"
              @start="startDailyChallenge"
            />

            <!-- Wrong Questions Screen -->
            <WrongQuestionsScreen
              v-else-if="currentScreen === 'wrongQuestions'"
              @back="goHome"
              @practice="startWrongQuestionsPractice"
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
              :is-review-mode="isReviewMode"
              :review-questions="reviewQuestionIds"
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

        <!-- Countdown Overlay -->
        <CountdownOverlay
          :show="showCountdown"
          :go-text="localeStore.t.game?.go || 'GO!'"
          @complete="onCountdownComplete"
        />

        <!-- Rest Reminder Modal -->
        <RestReminderModal
          :show="showRestReminder"
          :played-minutes="playTimeStore.todayPlayTimeMinutes"
          @close="handleRestReminderClose"
        />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { onMounted, defineAsyncComponent } from 'vue'
import { NConfigProvider, NMessageProvider, NDialogProvider } from 'naive-ui'
import { useUserStore } from './stores/user.js'
import { useLocaleStore } from './stores/locale.js'
import { useTheme } from './composables/useTheme.js'
import { useScreenRouter } from './composables/useScreenRouter.js'
import { useBackground } from './composables/useBackground.js'
import { usePlayTimeTracking } from './composables/usePlayTimeTracking.js'

// Eagerly loaded components (needed immediately)
import FloatingDecorations from './components/FloatingDecorations.vue'
import ThemeParticles from './components/ThemeParticles.vue'
import CountdownOverlay from './components/CountdownOverlay.vue'
import UserMenu from './components/UserMenu.vue'
import GenderSelect from './components/GenderSelect.vue'
import HomeScreen from './components/HomeScreen.vue'
import OperationSelect from './components/OperationSelect.vue'
import LevelSelect from './components/LevelSelect.vue'
import GameScreen from './components/GameScreen.vue'
import CoinDisplay from './components/CoinDisplay.vue'
import AppFooter from './components/AppFooter.vue'
import RestReminderModal from './components/RestReminderModal.vue'

// Lazy loaded components (loaded on demand)
const ResultScreen = defineAsyncComponent(() => import('./components/ResultScreen.vue'))
const ShopScreen = defineAsyncComponent(() => import('./components/ShopScreen.vue'))
const DailyChallengeScreen = defineAsyncComponent(() => import('./components/DailyChallengeScreen.vue'))
const WrongQuestionsScreen = defineAsyncComponent(() => import('./components/WrongQuestionsScreen.vue'))

// Stores
const userStore = useUserStore()
const localeStore = useLocaleStore()

// Theme
const { themeOverrides, applyTheme, initDarkMode } = useTheme()

// Background
const { equippedBackground, backgroundStyle } = useBackground()

// Screen routing
const {
  currentScreen,
  selectedOperation,
  selectedLevel,
  showCountdown,
  isReviewMode,
  reviewQuestionIds,
  goHome,
  goToShop,
  goToDailyChallenge,
  goToWrongQuestions,
  goToOperationSelect,
  startDailyChallenge,
  startWrongQuestionsPractice,
  onOperationSelect,
  onLevelSelect,
  onCountdownComplete,
  onGameComplete,
  onGameQuit,
  retryLevel,
  nextLevel
} = useScreenRouter()

// Play time tracking
const { showRestReminder, playTimeStore, handleRestReminderClose } = usePlayTimeTracking(currentScreen, goHome)

onMounted(() => {
  applyTheme()
  initDarkMode()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html {
  touch-action: manipulation;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}

button, a, input, select, textarea, [role="button"] {
  touch-action: manipulation;
}

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

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ffecd2 100%);
  min-height: 100vh;
  min-height: -webkit-fill-available;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body, #app {
  height: 100%;
}

.app-frame {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  padding: 6px;
  background: linear-gradient(135deg, #FF69B4, #FFB6C1, #FF69B4, #FF1493);
  border-radius: 0;
  position: relative;
  z-index: 2;
}

.app-frame.prince {
  background: linear-gradient(135deg, #4A90D9, #87CEEB, #4A90D9, #1E90FF);
}

.app-container {
  min-height: calc(100vh - 12px);
  min-height: calc(-webkit-fill-available - 12px);
  border-radius: 16px;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.app-container:not(.custom-bg) {
  background: linear-gradient(135deg, var(--light-color) 0%, var(--background-color) 50%, var(--light-color) 100%);
}

.app-frame.princess .app-container:not(.custom-bg) {
  background: linear-gradient(135deg, #FFF5F8 0%, #FFF0F5 50%, #FFE4EC 100%);
}

.app-frame.prince .app-container:not(.custom-bg) {
  background: linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 50%, #DBEAFE 100%);
}

.theme-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.app-frame.custom-theme {
  background: transparent !important;
}

.app-container.custom-bg {
  background: transparent !important;
}

@media (pointer: coarse) {
  button, .clickable, [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
}

@media (max-width: 768px) {
  .app-frame {
    padding: 5px;
  }

  .app-container {
    min-height: calc(100vh - 10px);
    border-radius: 14px;
  }
}

@media (max-width: 500px) {
  .app-frame {
    padding: 4px;
  }

  .app-container {
    min-height: calc(100vh - 8px);
    border-radius: 12px;
  }
}

@media (max-width: 360px) {
  .app-frame {
    padding: 3px;
  }

  .app-container {
    min-height: calc(100vh - 6px);
    border-radius: 10px;
  }
}

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
