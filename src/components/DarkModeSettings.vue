<template>
  <div class="dark-mode-settings">
    <h3 class="settings-title">{{ t.darkMode?.title || 'Display Settings' }}</h3>

    <!-- Dark Mode -->
    <div class="setting-group">
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label">{{ t.darkMode?.darkMode || 'Dark Mode' }}</span>
          <span class="setting-desc">{{ t.darkMode?.darkModeDesc || 'Switch to dark theme' }}</span>
        </div>
        <button
          class="toggle-switch"
          :class="{ on: isDarkMode }"
          @click="toggleDarkMode"
          :aria-pressed="isDarkMode"
          role="switch"
          :disabled="isAutoMode"
        >
          <span class="toggle-thumb"></span>
        </button>
      </div>
    </div>

    <!-- Auto Mode -->
    <div class="setting-group">
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label">{{ t.darkMode?.auto || 'Follow System' }}</span>
          <span class="setting-desc">{{ t.darkMode?.autoDesc || 'Automatically follow system setting' }}</span>
        </div>
        <button
          class="toggle-switch"
          :class="{ on: isAutoMode }"
          @click="toggleAutoMode"
          :aria-pressed="isAutoMode"
          role="switch"
        >
          <span class="toggle-thumb"></span>
        </button>
      </div>
    </div>

    <!-- Preview -->
    <div class="preview-section">
      <div class="preview-card" :class="{ dark: isDarkMode }">
        <div class="preview-header">
          <span class="preview-icon">{{ isDarkMode ? '🌙' : '☀️' }}</span>
          <span class="preview-title">{{ isDarkMode ? 'Dark' : 'Light' }}</span>
        </div>
        <div class="preview-content">
          <div class="preview-line"></div>
          <div class="preview-line short"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocaleStore } from '../stores/locale'
import { useTheme } from '../composables/useTheme'

const localeStore = useLocaleStore()
const { isDarkMode, isAutoMode, toggleDarkMode, toggleAutoMode } = useTheme()

const t = computed(() => localeStore.t)
</script>

<style scoped>
.dark-mode-settings {
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

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.setting-info {
  display: flex;
  flex-direction: column;
}

.setting-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.setting-desc {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
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

.toggle-switch:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.toggle-switch.on .toggle-thumb {
  transform: translateX(22px);
}

/* Preview Section */
.preview-section {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.preview-card {
  width: 120px;
  padding: 16px;
  background: #f8f8f8;
  border-radius: 12px;
  transition: all 0.3s;
  border: 2px solid #eee;
}

.preview-card.dark {
  background: #1a1a2e;
  border-color: #2a2a4a;
}

.preview-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.preview-icon {
  font-size: 20px;
}

.preview-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.preview-card.dark .preview-title {
  color: #fff;
}

.preview-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.preview-line {
  height: 8px;
  background: #ddd;
  border-radius: 4px;
}

.preview-line.short {
  width: 60%;
}

.preview-card.dark .preview-line {
  background: #3a3a5a;
}
</style>
