<template>
  <div class="accessibility-settings">
    <h3 class="settings-title">{{ t.accessibility?.title || 'Accessibility' }}</h3>

    <!-- Font Size -->
    <div class="setting-group">
      <label class="setting-label">{{ t.accessibility?.fontSize || 'Font Size' }}</label>
      <div class="font-size-options">
        <button
          v-for="size in fontSizes"
          :key="size.value"
          class="size-btn"
          :class="{ active: accessibilityStore.fontSize === size.value }"
          @click="accessibilityStore.setFontSize(size.value)"
        >
          <span class="size-preview" :style="{ fontSize: `${14 * size.scale}px` }">Aa</span>
          <span class="size-label">{{ size.label }}</span>
        </button>
      </div>
    </div>

    <!-- Reduce Motion -->
    <div class="setting-group">
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label">{{ t.accessibility?.reduceMotion || 'Reduce Motion' }}</span>
          <span class="setting-desc">{{ t.accessibility?.reduceMotionDesc || 'Disable animations' }}</span>
        </div>
        <button
          class="toggle-switch"
          :class="{ on: accessibilityStore.reduceMotion }"
          @click="accessibilityStore.toggleReduceMotion()"
          :aria-pressed="accessibilityStore.reduceMotion"
          role="switch"
        >
          <span class="toggle-thumb"></span>
        </button>
      </div>
    </div>

    <!-- High Contrast -->
    <div class="setting-group">
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label">{{ t.accessibility?.highContrast || 'High Contrast' }}</span>
          <span class="setting-desc">{{ t.accessibility?.highContrastDesc || 'Increase contrast' }}</span>
        </div>
        <button
          class="toggle-switch"
          :class="{ on: accessibilityStore.highContrast }"
          @click="accessibilityStore.toggleHighContrast()"
          :aria-pressed="accessibilityStore.highContrast"
          role="switch"
        >
          <span class="toggle-thumb"></span>
        </button>
      </div>
    </div>

    <!-- Reset Button -->
    <button class="reset-btn" @click="accessibilityStore.reset()">
      {{ t.accessibility?.reset || 'Reset to Default' }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAccessibilityStore } from '../stores/accessibility'
import { useLocaleStore } from '../stores/locale'

const accessibilityStore = useAccessibilityStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)

const fontSizes = [
  { value: 'small', label: 'S', scale: 0.85 },
  { value: 'normal', label: 'M', scale: 1 },
  { value: 'large', label: 'L', scale: 1.15 },
  { value: 'extra-large', label: 'XL', scale: 1.3 },
]
</script>

<style scoped>
.accessibility-settings {
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

.font-size-options {
  display: flex;
  gap: 8px;
}

.size-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.size-btn:hover {
  background: #eee;
}

.size-btn.active {
  background: var(--light-color, #FFF0F5);
  border-color: var(--primary-color, #FF69B4);
}

.size-preview {
  font-weight: 700;
  color: #333;
}

.size-label {
  font-size: 11px;
  color: #666;
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

.setting-desc {
  font-size: 12px;
  color: #999;
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.toggle-switch.on .toggle-thumb {
  transform: translateX(22px);
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
}

.reset-btn:hover {
  background: #eee;
  color: #333;
}
</style>
