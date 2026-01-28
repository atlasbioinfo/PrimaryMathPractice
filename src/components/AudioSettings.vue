<template>
  <div class="audio-settings">
    <h3 class="settings-title">{{ t.audio?.title || 'Audio Settings' }}</h3>

    <!-- Sound Effects -->
    <div class="setting-group">
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label">{{ t.audio?.soundEffects || 'Sound Effects' }}</span>
          <span class="setting-desc">{{ t.audio?.soundEffectsDesc || 'Toggle game sounds' }}</span>
        </div>
        <button
          class="toggle-switch"
          :class="{ on: audioStore.soundEnabled }"
          @click="audioStore.toggleSound()"
          :aria-pressed="audioStore.soundEnabled"
          role="switch"
        >
          <span class="toggle-thumb"></span>
        </button>
      </div>
    </div>

    <!-- Haptic Feedback -->
    <div class="setting-group">
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label">{{ t.audio?.hapticFeedback || 'Haptic Feedback' }}</span>
          <span class="setting-desc">{{ t.audio?.hapticFeedbackDesc || 'Vibration on key press' }}</span>
        </div>
        <button
          class="toggle-switch"
          :class="{ on: audioStore.hapticEnabled }"
          @click="audioStore.toggleHaptic()"
          :aria-pressed="audioStore.hapticEnabled"
          role="switch"
        >
          <span class="toggle-thumb"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAudioStore } from '../stores/audio'
import { useLocaleStore } from '../stores/locale'

const audioStore = useAudioStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)
</script>

<style scoped>
.audio-settings {
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
  margin-bottom: 0;
  padding-bottom: 0;
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
</style>
