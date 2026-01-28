<template>
  <Teleport to="body">
    <div v-if="show" class="pin-modal-overlay" @click.self="$emit('close')">
      <div class="pin-modal">
        <button class="close-btn" @click="$emit('close')">×</button>

        <div class="pin-content">
          <div class="pin-icon">🔐</div>
          <h3 class="pin-title">{{ isSettingPin ? (t.customDifficulty?.setPin || 'Set Parent PIN') : (t.customDifficulty?.enterPin || 'Enter Parent PIN') }}</h3>
          <p class="pin-desc">{{ isSettingPin ? (t.customDifficulty?.setPinDesc || 'Set a 4-digit PIN to access parent settings') : (t.customDifficulty?.enterPinDesc || 'Enter your 4-digit PIN') }}</p>

          <div class="pin-input-container">
            <div class="pin-dots">
              <div
                v-for="i in 4"
                :key="i"
                class="pin-dot"
                :class="{ filled: pin.length >= i }"
              ></div>
            </div>
            <input
              ref="pinInput"
              v-model="pin"
              type="tel"
              maxlength="4"
              pattern="[0-9]*"
              inputmode="numeric"
              class="hidden-input"
              @input="handleInput"
              @keydown="handleKeydown"
            />
          </div>

          <div v-if="error" class="pin-error">{{ error }}</div>

          <div class="pin-keypad">
            <button
              v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del']"
              :key="num"
              class="keypad-btn"
              :class="{ empty: num === null, delete: num === 'del' }"
              @click="handleKeypadClick(num)"
            >
              {{ num === 'del' ? '⌫' : num }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useLocaleStore } from '../stores/locale'
import { useCustomDifficultyStore } from '../stores/customDifficulty'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  isSettingPin: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'success'])

const localeStore = useLocaleStore()
const customDifficultyStore = useCustomDifficultyStore()

const t = computed(() => localeStore.t)

const pin = ref('')
const error = ref('')
const pinInput = ref(null)

watch(() => props.show, (newVal) => {
  if (newVal) {
    pin.value = ''
    error.value = ''
    nextTick(() => {
      pinInput.value?.focus()
    })
  }
})

function handleInput() {
  // Filter non-numeric characters
  pin.value = pin.value.replace(/\D/g, '').slice(0, 4)
  error.value = ''

  if (pin.value.length === 4) {
    validatePin()
  }
}

function handleKeydown(e) {
  if (e.key === 'Enter' && pin.value.length === 4) {
    validatePin()
  }
}

function handleKeypadClick(num) {
  if (num === null) return

  if (num === 'del') {
    pin.value = pin.value.slice(0, -1)
    error.value = ''
  } else if (pin.value.length < 4) {
    pin.value += num
    if (pin.value.length === 4) {
      validatePin()
    }
  }
}

function validatePin() {
  if (props.isSettingPin) {
    if (customDifficultyStore.setPin(pin.value)) {
      emit('success')
      emit('close')
    } else {
      error.value = t.value.customDifficulty?.invalidPin || 'Invalid PIN format'
      pin.value = ''
    }
  } else {
    if (customDifficultyStore.verifyPin(pin.value)) {
      emit('success')
      emit('close')
    } else {
      error.value = t.value.customDifficulty?.wrongPin || 'Wrong PIN'
      pin.value = ''
    }
  }
}
</script>

<style scoped>
.pin-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.pin-modal {
  background: white;
  border-radius: 24px;
  width: 90%;
  max-width: 320px;
  padding: 24px;
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
  transition: all 0.2s;
}

.close-btn:hover {
  background: #eee;
  color: #333;
}

.pin-content {
  text-align: center;
}

.pin-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.pin-title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
}

.pin-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
}

.pin-input-container {
  position: relative;
  margin-bottom: 16px;
}

.pin-dots {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.pin-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #ddd;
  background: transparent;
  transition: all 0.2s;
}

.pin-dot.filled {
  background: var(--primary-color, #FF69B4);
  border-color: var(--primary-color, #FF69B4);
}

.hidden-input {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 40px;
  opacity: 0;
  cursor: pointer;
}

.pin-error {
  color: #e74c3c;
  font-size: 14px;
  margin-bottom: 16px;
}

.pin-keypad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  max-width: 240px;
  margin: 0 auto;
}

.keypad-btn {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: #f5f5f5;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.keypad-btn:hover:not(.empty) {
  background: var(--light-color, #FFF5F8);
  transform: scale(1.05);
}

.keypad-btn:active:not(.empty) {
  transform: scale(0.95);
}

.keypad-btn.empty {
  background: transparent;
  cursor: default;
}

.keypad-btn.delete {
  font-size: 20px;
  color: #e74c3c;
}

.keypad-btn.delete:hover {
  background: #fff5f5;
}
</style>
