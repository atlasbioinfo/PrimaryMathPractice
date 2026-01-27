<template>
  <div class="gender-select">
    <!-- Language Switcher -->
    <div class="language-switcher">
      <div class="lang-btn" @click="localeStore.toggleLocale()">
        <span class="lang-icon">🌐</span>
        <span class="lang-text">{{ currentLocaleName }}</span>
      </div>
    </div>

    <!-- Cute floating decorations -->
    <div class="floating-decorations">
      <span v-for="(item, i) in floatingItems" :key="i" class="float-item" :style="item.style">
        {{ item.emoji }}
      </span>
    </div>

    <div class="login-container">
      <div class="welcome-header">
        <div class="crown-icon">👑</div>
        <h1 class="welcome-title">{{ t.welcome.title }}</h1>
        <p class="welcome-subtitle">{{ t.welcome.subtitle }}</p>
      </div>

      <!-- Name Input -->
      <div class="input-section">
        <label class="cute-label">
          <span class="label-icon">✨</span>
          {{ t.login.enterName }}
        </label>
        <div class="cute-input-wrapper" :class="{ focused: inputFocused, error: showError }">
          <span class="input-icon">👤</span>
          <input
            v-model="username"
            type="text"
            :placeholder="t.login.namePlaceholder"
            class="cute-input"
            maxlength="20"
            @focus="inputFocused = true; showError = false"
            @blur="inputFocused = false"
            @keyup.enter="handleSubmit"
          />
          <span v-if="username" class="clear-btn" @click="username = ''">✕</span>
        </div>
        <p v-if="showError" class="error-msg">{{ t.login.nameRequired }}</p>
      </div>

      <!-- Gender Selection -->
      <div class="input-section">
        <label class="cute-label">
          <span class="label-icon">🎭</span>
          {{ t.login.selectGender }}
        </label>
        <div class="gender-options">
          <div
            class="gender-option prince"
            :class="{ selected: selectedGender === 'prince' }"
            @click="selectedGender = 'prince'"
          >
            <div class="option-glow"></div>
            <img src="/math_prince.png" alt="Prince" class="option-avatar" />
            <span class="option-label">{{ t.login.boy }}</span>
            <span class="option-check">✓</span>
          </div>
          <div
            class="gender-option princess"
            :class="{ selected: selectedGender === 'princess' }"
            @click="selectedGender = 'princess'"
          >
            <div class="option-glow"></div>
            <img src="/math_princess.png" alt="Princess" class="option-avatar" />
            <span class="option-label">{{ t.login.girl }}</span>
            <span class="option-check">✓</span>
          </div>
        </div>
      </div>

      <!-- Start Button -->
      <button
        class="start-btn"
        :class="selectedGender"
        :disabled="!canSubmit"
        @click="handleSubmit"
      >
        <span class="btn-sparkle">✨</span>
        {{ t.login.start }}
        <span class="btn-sparkle">✨</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user'
import { useLocaleStore } from '../stores/locale'
import { useProfilesStore } from '../stores/profiles'
import { useSound } from '../composables/useSound'
import { getLocaleDisplayName } from '../config/i18n'

const emit = defineEmits(['selected'])

const userStore = useUserStore()
const localeStore = useLocaleStore()
const profilesStore = useProfilesStore()
const { playClickSound } = useSound()

const username = ref('')
const selectedGender = ref('princess')
const inputFocused = ref(false)
const showError = ref(false)

const t = computed(() => localeStore.t)
const currentLocaleName = computed(() => getLocaleDisplayName(localeStore.currentLocale))

const canSubmit = computed(() => username.value.trim().length > 0)

const floatingItems = [
  { emoji: '🌟', style: { top: '10%', left: '5%', animationDelay: '0s', fontSize: '28px' } },
  { emoji: '💫', style: { top: '20%', right: '8%', animationDelay: '0.5s', fontSize: '24px' } },
  { emoji: '🎀', style: { bottom: '30%', left: '8%', animationDelay: '1s', fontSize: '26px' } },
  { emoji: '⭐', style: { bottom: '20%', right: '5%', animationDelay: '1.5s', fontSize: '30px' } },
  { emoji: '🦋', style: { top: '40%', left: '3%', animationDelay: '2s', fontSize: '22px' } },
  { emoji: '🚀', style: { top: '35%', right: '3%', animationDelay: '2.5s', fontSize: '24px' } },
  { emoji: '💖', style: { bottom: '40%', right: '10%', animationDelay: '3s', fontSize: '20px' } },
  { emoji: '🌈', style: { bottom: '15%', left: '15%', animationDelay: '3.5s', fontSize: '28px' } },
]

function handleSubmit() {
  if (!canSubmit.value) {
    showError.value = true
    return
  }

  playClickSound()

  // Create a new profile for this user
  const profileId = profilesStore.createProfile(username.value.trim(), selectedGender.value)
  profilesStore.switchProfile(profileId)

  // Set user data
  userStore.setUser(username.value.trim(), selectedGender.value)
  emit('selected', selectedGender.value)
}
</script>

<style scoped>
.gender-select {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* Language Switcher */
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

/* Floating Decorations */
.floating-decorations {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.float-item {
  position: absolute;
  opacity: 0.5;
}

/* Login Container */
.login-container {
  background: white;
  border-radius: 32px;
  padding: 40px;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(255, 105, 180, 0.2);
  border: 3px solid #FFB6C1;
  position: relative;
  z-index: 1;
}

.login-container::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(135deg, #FF69B4, #87CEEB, #FFB6C1, #4A90D9);
  border-radius: 34px;
  z-index: -1;
  opacity: 0.5;
}

/* Welcome Header */
.welcome-header {
  text-align: center;
  margin-bottom: 32px;
}

.crown-icon {
  font-size: 48px;
}

.welcome-title {
  font-size: 28px;
  background: linear-gradient(135deg, #FF69B4, #4A90D9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 12px 0 8px;
  font-weight: 700;
}

.welcome-subtitle {
  font-size: 14px;
  color: #888;
}

/* Input Section */
.input-section {
  margin-bottom: 24px;
}

.cute-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #555;
  margin-bottom: 12px;
}

.label-icon {
  font-size: 18px;
}

/* Cute Input */
.cute-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: #FFF5F8;
  border-radius: 16px;
  border: 2px solid #FFE4EC;
  transition: all 0.3s;
}

.cute-input-wrapper.focused {
  border-color: #FF69B4;
  box-shadow: 0 0 0 4px rgba(255, 105, 180, 0.15);
  background: white;
}

.cute-input-wrapper.error {
  border-color: #e74c3c;
  background: #fff5f5;
}

.input-icon {
  font-size: 20px;
  opacity: 0.6;
}

.cute-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #333;
  outline: none;
}

.cute-input::placeholder {
  color: #ccc;
}

.clear-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  color: #999;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #FF69B4;
  color: white;
}

.error-msg {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 8px;
  padding-left: 8px;
}

/* Gender Options */
.gender-options {
  display: flex;
  gap: 16px;
}

.gender-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  border: 3px solid transparent;
  position: relative;
  overflow: hidden;
}

.gender-option.prince {
  background: linear-gradient(135deg, #E6F3FF, #DBEAFE);
}

.gender-option.princess {
  background: linear-gradient(135deg, #FFF5F8, #FFE4EC);
}

.gender-option:hover {
  transform: translateY(-4px);
}

.gender-option.prince:hover,
.gender-option.prince.selected {
  border-color: #4A90D9;
  box-shadow: 0 8px 25px rgba(74, 144, 217, 0.3);
}

.gender-option.princess:hover,
.gender-option.princess.selected {
  border-color: #FF69B4;
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
}

.option-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.3s;
}

.gender-option.prince .option-glow {
  background: radial-gradient(circle at center, rgba(74, 144, 217, 0.2), transparent 70%);
}

.gender-option.princess .option-glow {
  background: radial-gradient(circle at center, rgba(255, 105, 180, 0.2), transparent 70%);
}

.gender-option.selected .option-glow {
  opacity: 1;
}

.option-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
  border: 3px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.gender-option.selected .option-avatar {
  transform: scale(1.1);
}

.option-label {
  font-size: 16px;
  font-weight: 600;
  color: #555;
}

.gender-option.prince .option-label {
  color: #4A90D9;
}

.gender-option.princess .option-label {
  color: #FF69B4;
}

.option-check {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s;
}

.gender-option.prince .option-check {
  background: #4A90D9;
}

.gender-option.princess .option-check {
  background: #FF69B4;
}

.gender-option.selected .option-check {
  opacity: 1;
  transform: scale(1);
}

/* Start Button */
.start-btn {
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 8px;
  position: relative;
  overflow: hidden;
}

.start-btn.princess {
  background: linear-gradient(135deg, #FF69B4, #FF1493);
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
}

.start-btn.prince {
  background: linear-gradient(135deg, #4A90D9, #1E90FF);
  box-shadow: 0 8px 25px rgba(74, 144, 217, 0.4);
}

.start-btn:hover:not(:disabled) {
  transform: translateY(-3px);
}

.start-btn.princess:hover:not(:disabled) {
  box-shadow: 0 12px 35px rgba(255, 105, 180, 0.5);
}

.start-btn.prince:hover:not(:disabled) {
  box-shadow: 0 12px 35px rgba(74, 144, 217, 0.5);
}

.start-btn:disabled {
  background: #ccc;
  box-shadow: none;
  cursor: not-allowed;
}

.btn-sparkle {
  font-size: 18px;
}

/* Responsive - Tablet */
@media (max-width: 768px) {
  .gender-select {
    padding: 16px;
  }

  .login-container {
    padding: 32px 28px;
    max-width: 380px;
  }
}

/* Responsive - Mobile */
@media (max-width: 500px) {
  .gender-select {
    padding: 12px;
    justify-content: flex-start;
    padding-top: 60px;
  }

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

  .floating-decorations {
    display: none;
  }

  .login-container {
    padding: 24px 20px;
    margin: 0;
    border-radius: 24px;
    max-width: 100%;
  }

  .login-container::before {
    border-radius: 26px;
  }

  .welcome-header {
    margin-bottom: 24px;
  }

  .crown-icon {
    font-size: 36px;
  }

  .welcome-title {
    font-size: 20px;
    margin: 8px 0 6px;
  }

  .welcome-subtitle {
    font-size: 12px;
  }

  .input-section {
    margin-bottom: 20px;
  }

  .cute-label {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .label-icon {
    font-size: 16px;
  }

  .cute-input-wrapper {
    padding: 12px 14px;
    gap: 10px;
    border-radius: 14px;
  }

  .input-icon {
    font-size: 18px;
  }

  .cute-input {
    font-size: 15px;
  }

  .gender-options {
    gap: 10px;
  }

  .gender-option {
    padding: 16px 12px;
    border-radius: 16px;
  }

  .option-avatar {
    width: 56px;
    height: 56px;
    margin-bottom: 8px;
  }

  .option-label {
    font-size: 14px;
  }

  .option-check {
    width: 20px;
    height: 20px;
    font-size: 12px;
    top: 8px;
    right: 8px;
  }

  .start-btn {
    padding: 14px;
    font-size: 16px;
    border-radius: 16px;
    gap: 8px;
  }

  .btn-sparkle {
    font-size: 14px;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .gender-select {
    padding: 10px;
    padding-top: 50px;
  }

  .login-container {
    padding: 20px 16px;
  }

  .crown-icon {
    font-size: 32px;
  }

  .welcome-title {
    font-size: 18px;
  }

  .option-avatar {
    width: 48px;
    height: 48px;
  }

  .option-label {
    font-size: 13px;
  }

  .start-btn {
    padding: 12px;
    font-size: 15px;
  }
}

/* Landscape mode on mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .gender-select {
    padding-top: 50px;
    justify-content: flex-start;
  }

  .welcome-header {
    margin-bottom: 16px;
  }

  .crown-icon {
    font-size: 28px;
  }

  .welcome-title {
    font-size: 18px;
    margin: 4px 0;
  }

  .welcome-subtitle {
    display: none;
  }

  .input-section {
    margin-bottom: 12px;
  }

  .gender-options {
    flex-direction: row;
  }

  .option-avatar {
    width: 50px;
    height: 50px;
  }

  .gender-option {
    padding: 12px 10px;
  }
}
</style>
