<template>
  <div class="advanced-settings">
    <h3 class="settings-title">{{ t.customDifficulty?.title || 'Advanced Settings' }}</h3>

    <!-- Questions per round -->
    <div class="setting-group">
      <label class="setting-label">{{ t.customDifficulty?.questionsPerRound || 'Questions per Round' }}</label>
      <div class="range-input">
        <input
          type="range"
          min="5"
          max="20"
          :value="customDifficultyStore.questionsPerRound"
          @input="updateQuestionsPerRound"
        />
        <span class="range-value">{{ customDifficultyStore.questionsPerRound }}</span>
      </div>
    </div>

    <!-- Show hints toggle -->
    <div class="setting-group">
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label">{{ t.customDifficulty?.showHints || 'Show Hints' }}</span>
          <span class="setting-desc">{{ t.customDifficulty?.showHintsDesc || 'Show correct answer' }}</span>
        </div>
        <button
          class="toggle-switch"
          :class="{ on: customDifficultyStore.showHints }"
          @click="toggleShowHints"
        >
          <span class="toggle-thumb"></span>
        </button>
      </div>
    </div>

    <!-- Allow retry toggle -->
    <div class="setting-group">
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label">{{ t.customDifficulty?.allowRetry || 'Allow Retry' }}</span>
          <span class="setting-desc">{{ t.customDifficulty?.allowRetryDesc || 'Allow retry after wrong' }}</span>
        </div>
        <button
          class="toggle-switch"
          :class="{ on: customDifficultyStore.allowRetry }"
          @click="toggleAllowRetry"
        >
          <span class="toggle-thumb"></span>
        </button>
      </div>
    </div>

    <!-- Screen time limit -->
    <div class="setting-group screen-time-group">
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label">{{ t.customDifficulty?.screenTime || 'Screen Time Limit' }}</span>
          <span class="setting-desc">{{ t.customDifficulty?.screenTimeDesc || 'Daily play time limit' }}</span>
        </div>
        <button
          class="toggle-switch"
          :class="{ on: playTimeStore.isLimitEnabled }"
          @click="toggleScreenTimeLimit"
        >
          <span class="toggle-thumb"></span>
        </button>
      </div>
      <div v-if="playTimeStore.isLimitEnabled" class="screen-time-details">
        <div class="time-limit-row">
          <span class="time-label">{{ t.customDifficulty?.minutesPerDay || 'Minutes per day' }}</span>
          <div class="time-selector">
            <button class="time-btn" @click="decrementDailyLimit">-</button>
            <span class="time-value">{{ playTimeStore.dailyLimitMinutes }}</span>
            <button class="time-btn" @click="incrementDailyLimit">+</button>
          </div>
        </div>
        <div class="today-progress">
          <span class="progress-label">
            {{ t.customDifficulty?.playedToday || 'Played today' }}:
            {{ playTimeStore.todayPlayTimeMinutes }} {{ t.customDifficulty?.minutes || 'min' }}
          </span>
          <div class="progress-bar-small">
            <div class="progress-fill-small" :style="{ width: `${playTimeStore.progressPercent}%` }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reset button -->
    <button class="reset-btn" @click="customDifficultyStore.reset()">
      {{ t.customDifficulty?.resetSettings || 'Reset Settings' }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocaleStore } from '../../stores/locale.js'
import { useCustomDifficultyStore } from '../../stores/customDifficulty.js'
import { usePlayTimeStore } from '../../stores/playTime.js'

const localeStore = useLocaleStore()
const customDifficultyStore = useCustomDifficultyStore()
const playTimeStore = usePlayTimeStore()

const t = computed(() => localeStore.t)

function updateQuestionsPerRound(event) {
  customDifficultyStore.updateSettings({ questionsPerRound: parseInt(event.target.value) })
}

function toggleShowHints() {
  customDifficultyStore.updateSettings({ showHints: !customDifficultyStore.showHints })
}

function toggleAllowRetry() {
  customDifficultyStore.updateSettings({ allowRetry: !customDifficultyStore.allowRetry })
}

function toggleScreenTimeLimit() {
  playTimeStore.setLimitEnabled(!playTimeStore.isLimitEnabled)
}

function decrementDailyLimit() {
  playTimeStore.setDailyLimit(playTimeStore.dailyLimitMinutes - 5)
}

function incrementDailyLimit() {
  playTimeStore.setDailyLimit(playTimeStore.dailyLimitMinutes + 5)
}
</script>

<style scoped>
.advanced-settings {
  padding: 16px;
}

.settings-title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 0 0 20px 0;
  text-align: center;
}

.setting-group {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.setting-group:last-of-type {
  border-bottom: none;
}

.setting-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.setting-row .setting-label {
  margin-bottom: 0;
}

.setting-info {
  display: flex;
  flex-direction: column;
}

.setting-desc {
  font-size: 12px;
  color: #999;
}

.range-input {
  display: flex;
  align-items: center;
  gap: 12px;
}

.range-input input[type="range"] {
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  background: #eee;
  border-radius: 3px;
  outline: none;
}

.range-input input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: var(--primary-color, #FF69B4);
  border-radius: 50%;
  cursor: pointer;
}

.range-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color, #FF69B4);
  min-width: 30px;
  text-align: center;
}

.toggle-switch {
  width: 50px;
  height: 28px;
  background: #ddd;
  border: none;
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
}

.toggle-switch.on {
  background: var(--primary-color, #FF69B4);
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.on .toggle-thumb {
  transform: translateX(22px);
}

/* Screen Time Settings */
.screen-time-group {
  background: var(--light-color, #FFF5F8);
  border-radius: 12px;
  padding: 16px;
  margin-top: 8px;
}

.screen-time-details {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed var(--secondary-color, #FFB6C1);
}

.time-limit-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.time-label {
  font-size: 13px;
  color: #666;
}

.time-selector {
  display: flex;
  align-items: center;
  gap: 12px;
}

.time-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: var(--primary-color, #FF69B4);
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.time-btn:hover {
  transform: scale(1.1);
}

.time-btn:active {
  transform: scale(0.95);
}

.time-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-color, #FF69B4);
  min-width: 40px;
  text-align: center;
}

.today-progress {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.progress-label {
  font-size: 12px;
  color: #888;
}

.progress-bar-small {
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill-small {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color, #FF69B4), var(--accent-color, #FF1493));
  border-radius: 3px;
  transition: width 0.3s;
}

.reset-btn {
  width: 100%;
  padding: 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 16px;
}

.reset-btn:hover {
  background: #eee;
  color: #333;
}
</style>
