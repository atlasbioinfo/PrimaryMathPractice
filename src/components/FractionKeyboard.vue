<template>
  <div class="fraction-keyboard" :class="theme">
    <!-- Fraction Display Area -->
    <div class="fraction-display-area">
      <div
        class="fraction-part numerator"
        :class="{ active: activeField === 'numerator', filled: modelValue.numerator !== null }"
        @click="activeField = 'numerator'"
      >
        {{ modelValue.numerator !== null ? modelValue.numerator : '?' }}
      </div>
      <div class="fraction-line"></div>
      <div
        class="fraction-part denominator"
        :class="{ active: activeField === 'denominator', filled: modelValue.denominator !== null }"
        @click="activeField = 'denominator'"
      >
        {{ modelValue.denominator !== null ? modelValue.denominator : '?' }}
      </div>
    </div>

    <!-- Field Toggle -->
    <div class="field-toggle">
      <button
        class="toggle-btn"
        :class="{ active: activeField === 'numerator' }"
        @click="activeField = 'numerator'"
        type="button"
      >
        {{ numeratorLabel }}
      </button>
      <button
        class="toggle-btn"
        :class="{ active: activeField === 'denominator' }"
        @click="activeField = 'denominator'"
        type="button"
      >
        {{ denominatorLabel }}
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
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user'
import { useLocaleStore } from '../stores/locale'
import { useSound } from '../composables/useSound'

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

const numeratorLabel = computed(() => t.value.game?.numerator || '分子')
const denominatorLabel = computed(() => t.value.game?.denominator || '分母')

const activeField = ref('numerator')

const canConfirm = computed(() => {
  return props.modelValue.numerator !== null && props.modelValue.denominator !== null
})

function pressKey(num) {
  const field = activeField.value
  const currentValue = props.modelValue[field]
  const currentStr = currentValue === null ? '' : String(currentValue)

  if (currentStr.length >= props.maxLength) return

  playKeySound()
  const newStr = currentStr + String(num)
  const newValue = Number(newStr)

  emit('update:modelValue', {
    ...props.modelValue,
    [field]: newValue
  })

  // Auto switch to denominator after entering numerator
  if (field === 'numerator' && currentStr.length >= 1) {
    // Don't auto-switch, let user decide
  }
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

function confirm() {
  if (!canConfirm.value) return
  playConfirmSound()
  emit('confirm')
}
</script>

<style scoped>
.fraction-keyboard {
  background: linear-gradient(135deg, #FFF5F8 0%, #FFE4EC 100%);
  border-radius: 24px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(255, 105, 180, 0.2);
  border: 3px solid #FFB6C1;
  max-width: 320px;
  margin: 0 auto;
}

.fraction-keyboard.prince {
  background: linear-gradient(135deg, #F0F8FF 0%, #DBEAFE 100%);
  border-color: #87CEEB;
  box-shadow: 0 8px 32px rgba(74, 144, 217, 0.2);
}

/* Fraction Display Area */
.fraction-display-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
  padding: 16px;
  background: white;
  border-radius: 16px;
  border: 2px solid #FFB6C1;
}

.fraction-keyboard.prince .fraction-display-area {
  border-color: #87CEEB;
}

.fraction-part {
  font-size: 32px;
  font-weight: 700;
  color: #ccc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 8px 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 80px;
  text-align: center;
}

.fraction-part.filled {
  color: #FF69B4;
}

.fraction-keyboard.prince .fraction-part.filled {
  color: #4A90D9;
}

.fraction-part.active {
  background: linear-gradient(135deg, #FFF5F8 0%, #FFE4EC 100%);
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.3);
}

.fraction-keyboard.prince .fraction-part.active {
  background: linear-gradient(135deg, #F0F8FF 0%, #DBEAFE 100%);
  box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.3);
}

.fraction-line {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #FF69B4, #FF1493);
  border-radius: 2px;
}

.fraction-keyboard.prince .fraction-line {
  background: linear-gradient(90deg, #4A90D9, #1E90FF);
}

/* Field Toggle */
.field-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.toggle-btn {
  flex: 1;
  padding: 10px;
  border: 2px solid #FFB6C1;
  border-radius: 12px;
  background: white;
  font-size: 14px;
  font-weight: 600;
  color: #999;
  cursor: pointer;
  transition: all 0.2s;
}

.fraction-keyboard.prince .toggle-btn {
  border-color: #87CEEB;
}

.toggle-btn.active {
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  border-color: #FF69B4;
  color: white;
}

.fraction-keyboard.prince .toggle-btn.active {
  background: linear-gradient(135deg, #4A90D9 0%, #1E90FF 100%);
  border-color: #4A90D9;
}

/* Keyboard Grid */
.keyboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

/* Keys - same as CuteKeyboard */
.key {
  height: 52px;
  border-radius: 14px;
  border: none;
  font-size: 22px;
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

.number-key {
  background: linear-gradient(135deg, #FFFFFF 0%, #FFF5F8 100%);
  color: #FF69B4;
  box-shadow: 0 4px 0 #FFB6C1, 0 6px 12px rgba(255, 105, 180, 0.2);
}

.fraction-keyboard.prince .number-key {
  background: linear-gradient(135deg, #FFFFFF 0%, #F0F8FF 100%);
  color: #4A90D9;
  box-shadow: 0 4px 0 #87CEEB, 0 6px 12px rgba(74, 144, 217, 0.2);
}

.number-key:hover {
  background: linear-gradient(135deg, #FFF5F8 0%, #FFE4EC 100%);
}

.fraction-keyboard.prince .number-key:hover {
  background: linear-gradient(135deg, #F0F8FF 0%, #DBEAFE 100%);
}

.number-key:active {
  box-shadow: 0 2px 0 #FFB6C1, 0 3px 6px rgba(255, 105, 180, 0.2);
  transform: translateY(2px) scale(0.98);
}

.fraction-keyboard.prince .number-key:active {
  box-shadow: 0 2px 0 #87CEEB, 0 3px 6px rgba(74, 144, 217, 0.2);
}

.delete-key {
  background: linear-gradient(135deg, #FFE4EC 0%, #FFCCD5 100%);
  color: #FF6B8A;
  box-shadow: 0 4px 0 #FFB6C1, 0 6px 12px rgba(255, 107, 138, 0.2);
}

.fraction-keyboard.prince .delete-key {
  background: linear-gradient(135deg, #E6F3FF 0%, #BFDBFE 100%);
  color: #3B82F6;
  box-shadow: 0 4px 0 #93C5FD, 0 6px 12px rgba(59, 130, 246, 0.2);
}

.delete-key:hover {
  background: linear-gradient(135deg, #FFCCD5 0%, #FFB6C1 100%);
}

.fraction-keyboard.prince .delete-key:hover {
  background: linear-gradient(135deg, #BFDBFE 0%, #93C5FD 100%);
}

.delete-key:active {
  box-shadow: 0 2px 0 #FFB6C1, 0 3px 6px rgba(255, 107, 138, 0.2);
  transform: translateY(2px) scale(0.98);
}

.confirm-key {
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: white;
  box-shadow: 0 4px 0 #DB2777, 0 6px 12px rgba(255, 20, 147, 0.3);
}

.fraction-keyboard.prince .confirm-key {
  background: linear-gradient(135deg, #4A90D9 0%, #1E90FF 100%);
  box-shadow: 0 4px 0 #1D4ED8, 0 6px 12px rgba(30, 144, 255, 0.3);
}

.confirm-key:hover:not(.disabled) {
  background: linear-gradient(135deg, #FF1493 0%, #DB2777 100%);
}

.fraction-keyboard.prince .confirm-key:hover:not(.disabled) {
  background: linear-gradient(135deg, #1E90FF 0%, #1D4ED8 100%);
}

.confirm-key:active:not(.disabled) {
  box-shadow: 0 2px 0 #DB2777, 0 3px 6px rgba(255, 20, 147, 0.3);
  transform: translateY(2px) scale(0.98);
}

.confirm-key.disabled {
  background: linear-gradient(135deg, #E5E5E5 0%, #D4D4D4 100%);
  color: #A3A3A3;
  box-shadow: 0 4px 0 #B3B3B3, 0 6px 12px rgba(0, 0, 0, 0.1);
  cursor: not-allowed;
}

.key-icon {
  font-size: 20px;
}

/* Responsive */
@media (max-width: 500px) {
  .fraction-keyboard {
    padding: 12px;
    border-radius: 20px;
    max-width: 100%;
  }

  .fraction-display-area {
    padding: 12px;
    border-radius: 14px;
    margin-bottom: 10px;
  }

  .fraction-part {
    font-size: 26px;
    padding: 6px 20px;
    min-width: 60px;
  }

  .fraction-line {
    width: 80px;
    height: 3px;
  }

  .field-toggle {
    gap: 6px;
    margin-bottom: 10px;
  }

  .toggle-btn {
    padding: 8px;
    font-size: 12px;
    border-radius: 10px;
  }

  .keyboard-grid {
    gap: 8px;
  }

  .key {
    height: 46px;
    font-size: 20px;
    border-radius: 12px;
  }

  .key-icon {
    font-size: 18px;
  }
}

@media (max-width: 360px) {
  .fraction-keyboard {
    padding: 10px;
    border-radius: 16px;
  }

  .fraction-display-area {
    padding: 10px;
  }

  .fraction-part {
    font-size: 22px;
    padding: 4px 16px;
  }

  .fraction-line {
    width: 60px;
  }

  .keyboard-grid {
    gap: 6px;
  }

  .key {
    height: 42px;
    font-size: 18px;
    border-radius: 10px;
  }

  .key-icon {
    font-size: 16px;
  }
}
</style>
