<template>
  <div class="cute-keyboard" :class="theme" tabindex="0" ref="keyboardRef" @keydown="handleKeydown">
    <!-- Display Area -->
    <div class="display-area">
      <div class="display-value" :class="{ empty: !displayValue }">
        {{ displayValue || placeholder }}
      </div>
      <button class="clear-btn" :class="{ visible: displayValue }" @click="clearAll" type="button" tabindex="-1">
        C
      </button>
    </div>

    <!-- Number Keys -->
    <div class="keyboard-grid">
      <button
        v-for="num in numbers"
        :key="num"
        class="key number-key"
        @click="pressKey(num)"
        type="button"
        tabindex="-1"
      >
        {{ num }}
      </button>

      <!-- Delete Key -->
      <button class="key action-key delete-key" @click="deleteKey" type="button" tabindex="-1">
        ⌫
      </button>

      <!-- Zero Key -->
      <button class="key number-key" @click="pressKey(0)" type="button" tabindex="-1">
        0
      </button>

      <!-- Confirm Key -->
      <button
        class="key action-key confirm-key"
        :class="{ disabled: !canConfirm }"
        :disabled="!canConfirm"
        @click="confirm"
        type="button"
        tabindex="-1"
      >
        ✓
      </button>
    </div>

    <!-- Keyboard hint -->
    <div class="keyboard-hint">
      {{ t.game?.keyboardHint }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useLocaleStore } from '../stores/locale'
import { useSound } from '../composables/useSound'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

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
const localeStore = useLocaleStore()
const { playKeySound, playDeleteSound, playConfirmSound } = useSound()

const theme = computed(() => userStore.theme.name)
const t = computed(() => localeStore.t)
const keyboardRef = ref(null)

const displayValue = computed(() => {
  if (props.modelValue === null || props.modelValue === '') return ''
  return String(props.modelValue)
})

const canConfirm = computed(() => displayValue.value !== '')

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
  if (!displayValue.value) return
  playDeleteSound()
  emit('update:modelValue', null)
}

function confirm() {
  if (!canConfirm.value) return
  playConfirmSound()
  emit('confirm')
}

function handleKeydown(e) {
  // Number keys 0-9
  if (e.key >= '0' && e.key <= '9') {
    e.preventDefault()
    pressKey(parseInt(e.key))
    return
  }

  // Backspace - delete
  if (e.key === 'Backspace') {
    e.preventDefault()
    deleteKey()
    return
  }

  // Delete key - clear all
  if (e.key === 'Delete') {
    e.preventDefault()
    clearAll()
    return
  }

  // Enter - confirm
  if (e.key === 'Enter') {
    e.preventDefault()
    confirm()
    return
  }

  // Escape - clear all
  if (e.key === 'Escape') {
    e.preventDefault()
    clearAll()
    return
  }
}

// Global keyboard listener
function handleGlobalKeydown(e) {
  // Only handle if not typing in an input field
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
  // Skip if the event target is this keyboard component (already handled by @keydown)
  if (keyboardRef.value && keyboardRef.value.contains(e.target)) return
  handleKeydown(e)
}

onMounted(() => {
  // Focus the keyboard for immediate input
  keyboardRef.value?.focus()
  // Add global listener as backup
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<style scoped>
.cute-keyboard {
  --kb-primary: #FF69B4;
  --kb-primary-dark: #FF1493;
  --kb-secondary: #FFB6C1;
  --kb-bg: linear-gradient(145deg, #FFF5F8, #FFE8EF);
  --kb-key-bg: #fff;
  --kb-key-shadow: #FFB6C1;

  width: 280px;
  padding: 16px;
  background: var(--kb-bg);
  border-radius: 20px;
  border: 2px solid var(--kb-secondary);
  box-sizing: border-box;
  outline: none;
}

.cute-keyboard:focus {
  border-color: var(--kb-primary);
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.2);
}

.cute-keyboard.prince {
  --kb-primary: #4A90D9;
  --kb-primary-dark: #1E90FF;
  --kb-secondary: #87CEEB;
  --kb-bg: linear-gradient(145deg, #F0F8FF, #E1F0FF);
  --kb-key-shadow: #87CEEB;
}

.cute-keyboard.prince:focus {
  box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.2);
}

/* Display Area - fixed height */
.display-area {
  display: flex;
  align-items: center;
  height: 52px;
  margin-bottom: 12px;
  padding: 0 12px;
  background: #fff;
  border-radius: 12px;
  border: 2px solid var(--kb-secondary);
}

.display-value {
  flex: 1;
  font-size: 28px;
  font-weight: 700;
  color: var(--kb-primary);
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.display-value.empty {
  color: #ccc;
}

.clear-btn {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  border: none;
  background: var(--kb-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s, transform 0.1s;
}

.clear-btn.visible {
  opacity: 1;
  visibility: visible;
}

.clear-btn:active {
  transform: scale(0.9);
}

/* Keyboard Grid - 3 columns */
.keyboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

/* Base Key Style */
.key {
  height: 48px;
  border-radius: 12px;
  border: none;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: transform 0.1s, box-shadow 0.1s;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.key:active {
  transform: translateY(2px);
}

/* Number Keys */
.number-key {
  background: var(--kb-key-bg);
  color: var(--kb-primary);
  box-shadow: 0 3px 0 var(--kb-key-shadow);
}

.number-key:active {
  box-shadow: 0 1px 0 var(--kb-key-shadow);
}

/* Action Keys */
.action-key {
  font-size: 20px;
}

.delete-key {
  background: linear-gradient(145deg, #FFE4EC, #FFCCD5);
  color: #FF6B8A;
  box-shadow: 0 3px 0 #FFB6C1;
}

.cute-keyboard.prince .delete-key {
  background: linear-gradient(145deg, #E6F3FF, #BFDBFE);
  color: #3B82F6;
  box-shadow: 0 3px 0 #93C5FD;
}

.delete-key:active {
  box-shadow: 0 1px 0 #FFB6C1;
}

.cute-keyboard.prince .delete-key:active {
  box-shadow: 0 1px 0 #93C5FD;
}

.confirm-key {
  background: linear-gradient(145deg, var(--kb-primary), var(--kb-primary-dark));
  color: #fff;
  box-shadow: 0 3px 0 var(--kb-primary-dark);
}

.confirm-key:active:not(.disabled) {
  box-shadow: 0 1px 0 var(--kb-primary-dark);
}

.confirm-key.disabled {
  background: linear-gradient(145deg, #E5E5E5, #D4D4D4);
  color: #A3A3A3;
  box-shadow: 0 3px 0 #B3B3B3;
  cursor: not-allowed;
}

/* Keyboard hint */
.keyboard-hint {
  margin-top: 10px;
  text-align: center;
  font-size: 11px;
  color: #999;
}

/* Mobile adjustments */
@media (max-width: 360px) {
  .cute-keyboard {
    width: 260px;
    padding: 12px;
  }

  .display-area {
    height: 46px;
    margin-bottom: 10px;
    padding: 0 10px;
  }

  .display-value {
    font-size: 24px;
  }

  .clear-btn {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }

  .keyboard-grid {
    gap: 6px;
  }

  .key {
    height: 42px;
    font-size: 20px;
    border-radius: 10px;
  }

  .action-key {
    font-size: 18px;
  }

  .keyboard-hint {
    margin-top: 8px;
    font-size: 10px;
  }
}

/* Hide keyboard hint on touch devices */
@media (hover: none) and (pointer: coarse) {
  .keyboard-hint {
    display: none;
  }
}
</style>
