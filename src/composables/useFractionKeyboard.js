import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSound } from './useSound'
import { throttle } from '../utils/debounceThrottle'

/**
 * Composable for handling fraction keyboard input logic
 * @param {Object} options - Configuration options
 * @param {Object} options.modelValue - Current fraction value { numerator, denominator }
 * @param {number} options.maxLength - Maximum digits allowed per field
 * @param {Function} options.onUpdate - Callback when value changes
 * @param {Function} options.onConfirm - Callback when confirm is pressed
 * @returns {Object} Keyboard state and methods
 */
export function useFractionKeyboard(options) {
  const { modelValue, maxLength, onUpdate, onConfirm } = options
  const { playKeySound, playDeleteSound, playConfirmSound } = useSound()

  const keyboardRef = ref(null)
  const activeField = ref('numerator')

  const canConfirm = computed(() => {
    return modelValue.value.numerator !== null && modelValue.value.denominator !== null
  })

  function toggleField() {
    activeField.value = activeField.value === 'numerator' ? 'denominator' : 'numerator'
  }

  function pressKey(num) {
    const field = activeField.value
    const currentValue = modelValue.value[field]
    const currentStr = currentValue === null ? '' : String(currentValue)

    if (currentStr.length >= maxLength.value) return

    playKeySound()
    const newStr = currentStr + String(num)

    onUpdate({
      ...modelValue.value,
      [field]: Number(newStr)
    })
  }

  function deleteKey() {
    const field = activeField.value
    const currentValue = modelValue.value[field]

    if (currentValue === null) return

    playDeleteSound()
    const currentStr = String(currentValue)
    const newStr = currentStr.slice(0, -1)

    onUpdate({
      ...modelValue.value,
      [field]: newStr === '' ? null : Number(newStr)
    })
  }

  function clearField() {
    const field = activeField.value
    if (modelValue.value[field] === null) return

    playDeleteSound()
    onUpdate({
      ...modelValue.value,
      [field]: null
    })
  }

  const throttledConfirm = throttle(() => {
    playConfirmSound()
    onConfirm()
  }, 500, { trailing: false })

  function confirm() {
    if (!canConfirm.value) return
    throttledConfirm()
  }

  function handleKeydown(e) {
    const key = e.key

    // Number keys 0-9
    if (key >= '0' && key <= '9') {
      e.preventDefault()
      pressKey(parseInt(key))
      return
    }

    // Tab or / to switch fields
    if (key === 'Tab' || key === '/') {
      e.preventDefault()
      toggleField()
      return
    }

    // Arrow up/down to switch fields
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      e.preventDefault()
      toggleField()
      return
    }

    // Backspace - delete
    if (key === 'Backspace') {
      e.preventDefault()
      deleteKey()
      return
    }

    // Delete or Escape - clear current field
    if (key === 'Delete' || key === 'Escape') {
      e.preventDefault()
      clearField()
      return
    }

    // Enter - confirm
    if (key === 'Enter') {
      e.preventDefault()
      confirm()
    }
  }

  function handleGlobalKeydown(e) {
    // Skip if typing in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
    // Skip if the event target is this keyboard component
    if (keyboardRef.value && keyboardRef.value.contains(e.target)) return
    handleKeydown(e)
  }

  onMounted(() => {
    keyboardRef.value?.focus()
    window.addEventListener('keydown', handleGlobalKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleGlobalKeydown)
  })

  return {
    keyboardRef,
    activeField,
    canConfirm,
    toggleField,
    pressKey,
    deleteKey,
    confirm,
    handleKeydown
  }
}
