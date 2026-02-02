<template>
  <Teleport to="body">
    <div v-if="show" class="settings-modal-overlay" @click.self="$emit('close')">
      <div class="settings-modal">
        <button class="close-btn" @click="$emit('close')">×</button>

        <!-- Tabs -->
        <div class="settings-tabs">
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'audio' }"
            @click="activeTab = 'audio'"
          >
            {{ audioIcon }} {{ t.audio?.title || 'Audio' }}
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'display' }"
            @click="activeTab = 'display'"
          >
            {{ displayIcon }} {{ t.darkMode?.title || 'Display' }}
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'accessibility' }"
            @click="activeTab = 'accessibility'"
          >
            {{ settingsIcon }} {{ t.accessibility?.title || 'Settings' }}
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'advanced' }"
            @click="activeTab = 'advanced'"
          >
            {{ advancedIcon }} {{ t.customDifficulty?.title || 'Advanced' }}
          </button>
        </div>

        <!-- Tab Content -->
        <div class="settings-content">
          <AudioSettings v-if="activeTab === 'audio'" />
          <DarkModeSettings v-if="activeTab === 'display'" />
          <AccessibilitySettings v-if="activeTab === 'accessibility'" />
          <AdvancedSettings v-if="activeTab === 'advanced'" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLocaleStore } from '../../stores/locale.js'
import AudioSettings from '../AudioSettings.vue'
import DarkModeSettings from '../DarkModeSettings.vue'
import AccessibilitySettings from '../AccessibilitySettings.vue'
import AdvancedSettings from './AdvancedSettings.vue'

defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

defineEmits(['close'])

const localeStore = useLocaleStore()
const activeTab = ref('audio')

const t = computed(() => localeStore.t)

// Icons as constants to keep template cleaner
const audioIcon = '\u{1F50A}'      // 🔊
const displayIcon = '\u{1F313}'    // 🌓
const settingsIcon = '\u2699\uFE0F' // ⚙️
const advancedIcon = '\u{1F39B}\uFE0F' // 🎛️
</script>

<style scoped>
.settings-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.settings-modal {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  z-index: 10;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #eee;
  color: #333;
}

.settings-tabs {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 2px solid #eee;
  padding: 12px 12px 0;
  gap: 6px;
}

.tab-btn {
  flex: 0 1 auto;
  min-width: 0;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 13px;
  font-weight: 600;
  color: #888;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 10px 10px 0 0;
  white-space: nowrap;
}

.tab-btn:hover {
  background: #f9f9f9;
  color: #666;
}

.tab-btn.active {
  color: var(--primary-color, #FF69B4);
  border-bottom-color: var(--primary-color, #FF69B4);
  background: var(--light-color, #FFF5F8);
}

.settings-content {
  max-height: 60vh;
  overflow-y: auto;
}

@media (max-width: 500px) {
  .settings-modal {
    width: 95%;
    max-height: 85vh;
  }

  .settings-tabs {
    padding: 10px 10px 0;
    gap: 4px;
  }

  .tab-btn {
    padding: 8px 10px;
    font-size: 12px;
    border-radius: 8px 8px 0 0;
  }
}

@media (max-width: 360px) {
  .settings-tabs {
    padding: 8px 8px 0;
    gap: 3px;
  }

  .tab-btn {
    padding: 6px 8px;
    font-size: 11px;
  }
}
</style>
