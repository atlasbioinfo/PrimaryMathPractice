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
        :aria-label="`Numerator: ${modelValue.numerator ?? 'empty'}`"
        :aria-pressed="activeField === 'numerator'"
      >
        {{ modelValue.numerator ?? '?' }}
      </div>
      <div class="fraction-line" role="presentation" aria-hidden="true"></div>
      <div
        class="fraction-part"
        :class="{ active: activeField === 'denominator', filled: modelValue.denominator !== null }"
        @click="activeField = 'denominator'"
        role="button"
        tabindex="-1"
        :aria-label="`Denominator: ${modelValue.denominator ?? 'empty'}`"
        :aria-pressed="activeField === 'denominator'"
      >
        {{ modelValue.denominator ?? '?' }}
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
        {{ t.game?.numerator }}
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
        {{ t.game?.denominator }}
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
import { computed, toRef } from 'vue'
import { useUserStore } from '../stores/user'
import { useLocaleStore } from '../stores/locale'
import { useFractionKeyboard } from '../composables/useFractionKeyboard'

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

const theme = computed(() => userStore.theme.name)
const t = computed(() => localeStore.t)

const {
  keyboardRef,
  activeField,
  canConfirm,
  pressKey,
  deleteKey,
  confirm,
  handleKeydown
} = useFractionKeyboard({
  modelValue: toRef(props, 'modelValue'),
  maxLength: toRef(props, 'maxLength'),
  onUpdate: (value) => emit('update:modelValue', value),
  onConfirm: () => emit('confirm')
})
</script>

<style scoped>
@import './FractionKeyboard.css';
</style>
