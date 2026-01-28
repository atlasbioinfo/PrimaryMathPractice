<template>
  <div class="cute-keyboard" :class="theme">
    <!-- Display Area -->
    <div class="display-area">
      <div class="display-value" :class="{ empty: !displayValue }">
        {{ displayValue || placeholder }}
      </div>
      <button v-if="displayValue" class="clear-all-btn" @click="clearAll" type="button">
        C
      </button>
    </div>

    <!-- Number Keys -->
    <div class="keyboard-grid">
      <button
        v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :key="num"
        class="key number-key"
        @click="pressKey(num)"
        type="button"
      >
        {{ num }}
      </button>

      <!-- Delete Key -->
      <button class="key delete-key" @click="deleteKey" type="button">
        <span class="key-icon">⌫</span>
      </button>

      <!-- Zero Key -->
      <button class="key number-key zero-key" @click="pressKey(0)" type="button">
        0
      </button>

      <!-- Confirm Key -->
      <button
        class="key confirm-key"
        :class="{ disabled: !canConfirm }"
        :disabled="!canConfirm"
        @click="confirm"
        type="button"
      >
        <span class="key-icon">✓</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user'
import { useSound } from '../composables/useSound'

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: null
  },
  placeholder: {
    type: String,
    default: '?'
  },
  maxLength: {
    type: Number,
    default: 6
  }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const userStore = useUserStore()
const { playKeySound, playDeleteSound, playConfirmSound } = useSound()
const theme = computed(() => userStore.theme.name)

const displayValue = computed(() => {
  if (props.modelValue === null || props.modelValue === '') return ''
  return String(props.modelValue)
})

const canConfirm = computed(() => {
  return displayValue.value !== ''
})

function pressKey(num) {
  const currentValue = displayValue.value
  if (currentValue.length >= props.maxLength) return

  playKeySound()
  const newValue = currentValue + String(num)
  emit('update:modelValue', Number(newValue))
}

function deleteKey() {
  const currentValue = displayValue.value
  if (currentValue.length === 0) return

  playDeleteSound()
  const newValue = currentValue.slice(0, -1)
  emit('update:modelValue', newValue === '' ? null : Number(newValue))
}

function clearAll() {
  playDeleteSound()
  emit('update:modelValue', null)
}

function confirm() {
  if (!canConfirm.value) return
  playConfirmSound()
  emit('confirm')
}
</script>

<style scoped>
.cute-keyboard {
  background: linear-gradient(135deg, #FFF5F8 0%, #FFE4EC 100%);
  border-radius: 24px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(255, 105, 180, 0.2);
  border: 3px solid #FFB6C1;
  max-width: 320px;
  margin: 0 auto;
}

.cute-keyboard.prince {
  background: linear-gradient(135deg, #F0F8FF 0%, #DBEAFE 100%);
  border-color: #87CEEB;
  box-shadow: 0 8px 32px rgba(74, 144, 217, 0.2);
}

/* Display Area */
.display-area {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: white;
  border-radius: 16px;
  border: 2px solid #FFB6C1;
  min-height: 56px;
}

.cute-keyboard.prince .display-area {
  border-color: #87CEEB;
}

.display-value {
  flex: 1;
  font-size: 32px;
  font-weight: 700;
  color: #FF69B4;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: 4px;
}

.cute-keyboard.prince .display-value {
  color: #4A90D9;
}

.display-value.empty {
  color: #ccc;
}

.clear-all-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #FFB6C1, #FF69B4);
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.cute-keyboard.prince .clear-all-btn {
  background: linear-gradient(135deg, #87CEEB, #4A90D9);
}

.clear-all-btn:hover {
  transform: scale(1.1);
}

.clear-all-btn:active {
  transform: scale(0.95);
}

/* Keyboard Grid */
.keyboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

/* Keys */
.key {
  height: 56px;
  border-radius: 14px;
  border: none;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow: hidden;
}

.key::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
  border-radius: 14px 14px 0 0;
  pointer-events: none;
}

.key:active {
  transform: scale(0.95);
}

/* Number Keys */
.number-key {
  background: linear-gradient(135deg, #FFFFFF 0%, #FFF5F8 100%);
  color: #FF69B4;
  box-shadow: 0 4px 0 #FFB6C1, 0 6px 12px rgba(255, 105, 180, 0.2);
}

.cute-keyboard.prince .number-key {
  background: linear-gradient(135deg, #FFFFFF 0%, #F0F8FF 100%);
  color: #4A90D9;
  box-shadow: 0 4px 0 #87CEEB, 0 6px 12px rgba(74, 144, 217, 0.2);
}

.number-key:hover {
  background: linear-gradient(135deg, #FFF5F8 0%, #FFE4EC 100%);
}

.cute-keyboard.prince .number-key:hover {
  background: linear-gradient(135deg, #F0F8FF 0%, #DBEAFE 100%);
}

.number-key:active {
  box-shadow: 0 2px 0 #FFB6C1, 0 3px 6px rgba(255, 105, 180, 0.2);
  transform: translateY(2px) scale(0.98);
}

.cute-keyboard.prince .number-key:active {
  box-shadow: 0 2px 0 #87CEEB, 0 3px 6px rgba(74, 144, 217, 0.2);
}

/* Delete Key */
.delete-key {
  background: linear-gradient(135deg, #FFE4EC 0%, #FFCCD5 100%);
  color: #FF6B8A;
  box-shadow: 0 4px 0 #FFB6C1, 0 6px 12px rgba(255, 107, 138, 0.2);
}

.cute-keyboard.prince .delete-key {
  background: linear-gradient(135deg, #E6F3FF 0%, #BFDBFE 100%);
  color: #3B82F6;
  box-shadow: 0 4px 0 #93C5FD, 0 6px 12px rgba(59, 130, 246, 0.2);
}

.delete-key:hover {
  background: linear-gradient(135deg, #FFCCD5 0%, #FFB6C1 100%);
}

.cute-keyboard.prince .delete-key:hover {
  background: linear-gradient(135deg, #BFDBFE 0%, #93C5FD 100%);
}

.delete-key:active {
  box-shadow: 0 2px 0 #FFB6C1, 0 3px 6px rgba(255, 107, 138, 0.2);
  transform: translateY(2px) scale(0.98);
}

.cute-keyboard.prince .delete-key:active {
  box-shadow: 0 2px 0 #93C5FD, 0 3px 6px rgba(59, 130, 246, 0.2);
}

/* Confirm Key */
.confirm-key {
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: white;
  box-shadow: 0 4px 0 #DB2777, 0 6px 12px rgba(255, 20, 147, 0.3);
}

.cute-keyboard.prince .confirm-key {
  background: linear-gradient(135deg, #4A90D9 0%, #1E90FF 100%);
  box-shadow: 0 4px 0 #1D4ED8, 0 6px 12px rgba(30, 144, 255, 0.3);
}

.confirm-key:hover:not(.disabled) {
  background: linear-gradient(135deg, #FF1493 0%, #DB2777 100%);
}

.cute-keyboard.prince .confirm-key:hover:not(.disabled) {
  background: linear-gradient(135deg, #1E90FF 0%, #1D4ED8 100%);
}

.confirm-key:active:not(.disabled) {
  box-shadow: 0 2px 0 #DB2777, 0 3px 6px rgba(255, 20, 147, 0.3);
  transform: translateY(2px) scale(0.98);
}

.cute-keyboard.prince .confirm-key:active:not(.disabled) {
  box-shadow: 0 2px 0 #1D4ED8, 0 3px 6px rgba(30, 144, 255, 0.3);
}

.confirm-key.disabled {
  background: linear-gradient(135deg, #E5E5E5 0%, #D4D4D4 100%);
  color: #A3A3A3;
  box-shadow: 0 4px 0 #B3B3B3, 0 6px 12px rgba(0, 0, 0, 0.1);
  cursor: not-allowed;
}

.key-icon {
  font-size: 22px;
}

/* Responsive */
@media (max-width: 500px) {
  .cute-keyboard {
    padding: 12px;
    border-radius: 20px;
    max-width: 100%;
  }

  .display-area {
    padding: 10px 14px;
    min-height: 50px;
    border-radius: 14px;
    margin-bottom: 12px;
  }

  .display-value {
    font-size: 28px;
    letter-spacing: 3px;
  }

  .clear-all-btn {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }

  .keyboard-grid {
    gap: 8px;
  }

  .key {
    height: 50px;
    font-size: 22px;
    border-radius: 12px;
  }

  .key-icon {
    font-size: 20px;
  }
}

@media (max-width: 360px) {
  .cute-keyboard {
    padding: 10px;
    border-radius: 16px;
  }

  .display-area {
    padding: 8px 12px;
    min-height: 44px;
  }

  .display-value {
    font-size: 24px;
  }

  .keyboard-grid {
    gap: 6px;
  }

  .key {
    height: 44px;
    font-size: 20px;
    border-radius: 10px;
  }

  .key-icon {
    font-size: 18px;
  }
}
</style>
