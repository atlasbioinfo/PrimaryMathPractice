/**
 * Composable for keyboard navigation in level selection
 * @module composables/useLevelNavigation
 */
import { ref, nextTick, onMounted } from 'vue'

/**
 * Hook for managing keyboard navigation between level cards
 * @param {Object} options
 * @param {number} options.totalLevels - Total number of levels
 * @param {function} options.onSelect - Callback when a level is selected
 * @param {function} options.onBack - Callback for escape key
 * @returns {Object} Navigation state and handlers
 */
export function useLevelNavigation({ totalLevels, onSelect, onBack }) {
  const focusedIndex = ref(0)
  const cardRefs = ref([])

  function focusCard(index) {
    nextTick(() => {
      const card = cardRefs.value[index]
      if (card) {
        card.focus()
      }
    })
  }

  function setCardRef(el, index) {
    if (el) {
      cardRefs.value[index] = el
    }
  }

  function handleKeydown(event) {
    const { key } = event

    if (key === 'ArrowDown' || key === 'ArrowRight') {
      event.preventDefault()
      focusedIndex.value = (focusedIndex.value + 1) % totalLevels
      focusCard(focusedIndex.value)
    } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
      event.preventDefault()
      focusedIndex.value = (focusedIndex.value - 1 + totalLevels) % totalLevels
      focusCard(focusedIndex.value)
    } else if (key === 'Enter' || key === ' ') {
      event.preventDefault()
      onSelect(focusedIndex.value + 1)
    } else if (key === 'Escape') {
      onBack()
    }
  }

  function setFocusedIndex(index) {
    focusedIndex.value = index
  }

  onMounted(() => {
    nextTick(() => {
      focusCard(0)
    })
  })

  return {
    focusedIndex,
    setCardRef,
    handleKeydown,
    setFocusedIndex
  }
}
