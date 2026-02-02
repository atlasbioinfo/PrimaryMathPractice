<template>
  <div class="language-switcher">
    <div class="lang-btn" @click="handleToggle">
      <span class="lang-icon">🌐</span>
      <span class="lang-text">{{ currentLocaleName }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocaleStore } from '../stores/locale'
import { getLocaleDisplayName } from '../config/i18n'

const localeStore = useLocaleStore()
const currentLocaleName = computed(() => getLocaleDisplayName(localeStore.currentLocale))

function handleToggle() {
  localeStore.toggleLocale()
}
</script>

<style scoped>
.language-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid #FFB6C1;
}

.lang-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  border-color: #FF69B4;
}

.lang-icon {
  font-size: 18px;
}

.lang-text {
  font-weight: 500;
  color: #FF69B4;
}

@media (max-width: 500px) {
  .language-switcher {
    top: 12px;
    right: 12px;
  }

  .lang-btn {
    padding: 6px 12px;
  }

  .lang-icon {
    font-size: 16px;
  }

  .lang-text {
    font-size: 12px;
  }
}
</style>
