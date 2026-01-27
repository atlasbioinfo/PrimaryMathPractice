import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCoinsStore = defineStore('coins', () => {
  // State
  const balance = ref(0)
  const totalEarned = ref(0)
  const totalSpent = ref(0)
  const transactions = ref([])
  const purchasedItems = ref([])
  const equippedFrame = ref(null)
  const equippedBackground = ref(null)

  // Computed
  const transactionHistory = computed(() => {
    return [...transactions.value].reverse().slice(0, 50) // Last 50 transactions
  })

  // Actions
  function addCoins(amount, reason, details = {}) {
    if (amount <= 0) return

    balance.value += amount
    totalEarned.value += amount

    transactions.value.push({
      id: Date.now(),
      type: 'earn',
      amount,
      reason,
      details,
      timestamp: new Date().toISOString()
    })
  }

  function spendCoins(amount, reason, itemId = null) {
    if (amount <= 0 || balance.value < amount) return false

    balance.value -= amount
    totalSpent.value += amount

    transactions.value.push({
      id: Date.now(),
      type: 'spend',
      amount,
      reason,
      itemId,
      timestamp: new Date().toISOString()
    })

    return true
  }

  function canAfford(amount) {
    return balance.value >= amount
  }

  function purchaseItem(itemId, price, itemType) {
    if (!canAfford(price)) return false
    if (hasPurchasedItem(itemId)) return false

    if (spendCoins(price, `purchase_${itemType}`, itemId)) {
      purchasedItems.value.push({
        id: itemId,
        type: itemType,
        purchasedAt: new Date().toISOString()
      })
      return true
    }
    return false
  }

  function hasPurchasedItem(itemId) {
    return purchasedItems.value.some(item => item.id === itemId)
  }

  function getPurchasedItemsByType(type) {
    return purchasedItems.value.filter(item => item.type === type)
  }

  function equipFrame(frameId) {
    if (frameId && !hasPurchasedItem(frameId)) return false
    equippedFrame.value = frameId
    return true
  }

  function equipBackground(backgroundId) {
    if (backgroundId && !hasPurchasedItem(backgroundId)) return false
    equippedBackground.value = backgroundId
    return true
  }

  function reset() {
    balance.value = 0
    totalEarned.value = 0
    totalSpent.value = 0
    transactions.value = []
    purchasedItems.value = []
    equippedFrame.value = null
    equippedBackground.value = null
  }

  return {
    // State
    balance,
    totalEarned,
    totalSpent,
    transactions,
    purchasedItems,
    equippedFrame,
    equippedBackground,
    // Computed
    transactionHistory,
    // Actions
    addCoins,
    spendCoins,
    canAfford,
    purchaseItem,
    hasPurchasedItem,
    getPurchasedItemsByType,
    equipFrame,
    equipBackground,
    reset
  }
})
