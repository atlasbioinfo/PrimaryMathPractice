<template>
  <div
    class="fraction-keyboard"
    :class="theme"
    tabindex="0"
    ref="keyboardRef"
    @keydown="handleKeydown"
    role="application"
    :aria-label="t.game?.fractionKeyboardHint || 'Fraction keyboard'"
  >
    <!-- Fraction Display Area -->
    <div class="fraction-display" role="group" aria-label="Fraction input">
      <div
        class="fraction-part"
        :class="{ active: activeField === 'numerator', filled: modelValue.numerator !== null }"
        @click="activeField = 'numerator'"
        role="button"
        tabindex="-1"
        :aria-label="`Numerator: ${modelValue.numerator !== null ? modelValue.numerator : 'empty'}`"
        :aria-pressed="activeField === 'numerator'"
      >
        {{ modelValue.numerator !== null ? modelValue.numerator : '?' }}
      </div>
      <div class="fraction-line" role="presentation" aria-hidden="true"></div>
      <div
        class="fraction-part"
        :class="{ active: activeField === 'denominator', filled: modelValue.denominator !== null }"
        @click="activeField = 'denominator'"
        role="button"
        tabindex="-1"
        :aria-label="`Denominator: ${modelValue.denominator !== null ? modelValue.denominator : 'empty'}`"
        :aria-pressed="activeField === 'denominator'"
      >
        {{ modelValue.denominator !== null ? modelValue.denominator : '?' }}
      </div>
    </div>

    <!-- Field Toggle Buttons -->
    <div class="field-toggle" role="tablist" aria-label="Select fraction part">
      <button
        class="toggle-btn"
        :class="{ active: activeField === 'numerator' }"
        @click="activeField = 'numerator'"
        type="button"
        tabindex="-1"
        role="tab"
        :aria-selected="activeField === 'numerator'"
      >
        {{ numeratorLabel }}
      </button>
      <button
        class="toggle-btn"
        :class="{ active: activeField === 'denominator' }"
        @click="activeField = 'denominator'"
        type="button"
        tabindex="-1"
        role="tab"
        :aria-selected="activeField === 'denominator'"
      >
        {{ denominatorLabel }}
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
      {{ t.game?.fractionKeyboardHint }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useLocaleStore } from '../stores/locale'
import { useSound } from '../composables/useSound'
import { throttle } from '../utils/debounceThrottle'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ numerator: null, denominator: null })
  },
  maxLength: {
    type: Number,
    default: 4
  }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const userStore = useUserStore()
const localeStore = useLocaleStore()
const { playKeySound, playDeleteSound, playConfirmSound } = useSound()

const theme = computed(() => userStore.theme.name)
const t = computed(() => localeStore.t)
const keyboardRef = ref(null)

const numeratorLabel = computed(() => t.value.game?.numerator)
const denominatorLabel = computed(() => t.value.game?.denominator)

const activeField = ref('numerator')

const canConfirm = computed(() => {
  return props.modelValue.numerator !== null && props.modelValue.denominator !== null
})

function toggleField() {
  activeField.value = activeField.value === 'numerator' ? 'denominator' : 'numerator'
}

function pressKey(num) {
  const field = activeField.value
  const currentValue = props.modelValue[field]
  const currentStr = currentValue === null ? '' : String(currentValue)

  if (currentStr.length >= props.maxLength) return

  playKeySound()
  const newStr = currentStr + String(num)

  emit('update:modelValue', {
    ...props.modelValue,
    [field]: Number(newStr)
  })
}

function deleteKey() {
  const field = activeField.value
  const currentValue = props.modelValue[field]

  if (currentValue === null) return

  playDeleteSound()
  const currentStr = String(currentValue)
  const newStr = currentStr.slice(0, -1)

  emit('update:modelValue', {
    ...props.modelValue,
    [field]: newStr === '' ? null : Number(newStr)
  })
}

function clearField() {
  const field = activeField.value
  if (props.modelValue[field] === null) return

  playDeleteSound()
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: null
  })
}

// Throttled confirm to prevent double submissions
const throttledConfirm = throttle(() => {
  playConfirmSound()
  emit('confirm')
}, 500, { trailing: false })

function confirm() {
  if (!canConfirm.value) return
  throttledConfirm()
}

function handleKeydown(e) {
  // Number keys 0-9
  if (e.key >= '0' && e.key <= '9') {
    e.preventDefault()
    pressKey(parseInt(e.key))
    return
  }

  // Tab or / to switch fields
  if (e.key === 'Tab' || e.key === '/') {
    e.preventDefault()
    toggleField()
    return
  }

  // Arrow up/down to switch fields
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault()
    toggleField()
    return
  }

  // Backspace - delete
  if (e.key === 'Backspace') {
    e.preventDefault()
    deleteKey()
    return
  }

  // Delete key - clear current field
  if (e.key === 'Delete') {
    e.preventDefault()
    clearField()
    return
  }

  // Enter - confirm
  if (e.key === 'Enter') {
    e.preventDefault()
    confirm()
    return
  }

  // Escape - clear current field
  if (e.key === 'Escape') {
    e.preventDefault()
    clearField()
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
.fraction-keyboard {
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

.fraction-keyboard:focus {
  border-color: var(--kb-primary);
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.2);
}

.fraction-keyboard.prince {
  --kb-primary: #4A90D9;
  --kb-primary-dark: #1E90FF;
  --kb-secondary: #87CEEB;
  --kb-bg: linear-gradient(145deg, #F0F8FF, #E1F0FF);
  --kb-key-shadow: #87CEEB;
}

.fraction-keyboard.prince:focus {
  box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.2);
}

/* Fraction Display */
.fraction-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 12px;
  border: 2px solid var(--kb-secondary);
}

.fraction-part {
  min-width: 60px;
  padding: 6px 16px;
  font-size: 26px;
  font-weight: 700;
  color: #ccc;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.fraction-part.filled {
  color: var(--kb-primary);
}

.fraction-part.active {
  background: var(--kb-bg);
  box-shadow: inset 0 0 0 2px var(--kb-primary);
}

.fraction-line {
  width: 80px;
  height: 3px;
  background: var(--kb-primary);
  border-radius: 2px;
}

/* Field Toggle */
.field-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.toggle-btn {
  flex: 1;
  height: 36px;
  border: 2px solid var(--kb-secondary);
  border-radius: 10px;
  background: #fff;
  font-size: 13px;
  font-weight: 600;
  color: #999;
  cursor: pointer;
  transition: all 0.15s;
}

.toggle-btn.active {
  background: var(--kb-primary);
  border-color: var(--kb-primary);
  color: #fff;
}

/* Keyboard Grid - 3 columns */
.keyboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

/* Base Key Style */
.key {
  height: 44px;
  border-radius: 10px;
  border: none;
  font-size: 20px;
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
  font-size: 18px;
}

.delete-key {
  background: linear-gradient(145deg, #FFE4EC, #FFCCD5);
  color: #FF6B8A;
  box-shadow: 0 3px 0 #FFB6C1;
}

.fraction-keyboard.prince .delete-key {
  background: linear-gradient(145deg, #E6F3FF, #BFDBFE);
  color: #3B82F6;
  box-shadow: 0 3px 0 #93C5FD;
}

.delete-key:active {
  box-shadow: 0 1px 0 #FFB6C1;
}

.fraction-keyboard.prince .delete-key:active {
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
  .fraction-keyboard {
    width: 260px;
    padding: 12px;
  }

  .fraction-display {
    padding: 10px;
    margin-bottom: 8px;
  }

  .fraction-part {
    min-width: 50px;
    padding: 4px 12px;
    font-size: 22px;
  }

  .fraction-line {
    width: 60px;
  }

  .field-toggle {
    gap: 6px;
    margin-bottom: 8px;
  }

  .toggle-btn {
    height: 32px;
    font-size: 12px;
    border-radius: 8px;
  }

  .keyboard-grid {
    gap: 6px;
  }

  .key {
    height: 40px;
    font-size: 18px;
    border-radius: 8px;
  }

  .action-key {
    font-size: 16px;
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
