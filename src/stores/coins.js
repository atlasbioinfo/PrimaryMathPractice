/**
 * Coins store for managing virtual currency
 * @module stores/coins
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { defaultAvatars } from '../config/shop'

/**
 * @typedef {Object} Transaction
 * @property {number} id - Unique transaction ID (timestamp)
 * @property {'earn' | 'spend'} type - Transaction type
 * @property {number} amount - Amount of coins
 * @property {string} reason - Reason for the transaction
 * @property {Object} [details] - Additional details (for earn transactions)
 * @property {string} [itemId] - Item ID (for spend transactions)
 * @property {string} timestamp - ISO timestamp of the transaction
 */

/**
 * @typedef {Object} PurchasedItem
 * @property {string} id - Item ID
 * @property {string} type - Item type (sticker, frame, background, level)
 * @property {string} purchasedAt - ISO timestamp of purchase
 */

/**
 * @typedef {Object} CoinsState
 * @property {number} balance - Current coin balance
 * @property {number} totalEarned - Total coins ever earned
 * @property {number} totalSpent - Total coins ever spent
 * @property {Transaction[]} transactions - Transaction history
 * @property {PurchasedItem[]} purchasedItems - List of purchased items
 * @property {string|null} equippedFrame - Currently equipped frame ID
 * @property {string|null} equippedBackground - Currently equipped background ID
 */

export const useCoinsStore = defineStore('coins', () => {
  // State
  const balance = ref(0)
  const totalEarned = ref(0)
  const totalSpent = ref(0)
  const transactions = ref([])
  const purchasedItems = ref([])
  const equippedFrame = ref(null)
  const equippedBackground = ref(null)
  const equippedAvatar = ref(null)

  // Computed
  const transactionHistory = computed(() => {
    return [...transactions.value].reverse().slice(0, 50) // Last 50 transactions
  })

  // Actions
  /**
   * Add coins to the balance
   * @param {number} amount - Amount of coins to add
   * @param {string} reason - Reason for earning coins
   * @param {Object} [details={}] - Additional details about the earnings
   */
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

  /**
   * Spend coins from the balance
   * @param {number} amount - Amount of coins to spend
   * @param {string} reason - Reason for spending
   * @param {string|null} [itemId=null] - Item ID being purchased
   * @returns {boolean} Whether the transaction was successful
   */
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

  /**
   * Check if user can afford an amount
   * @param {number} amount - Amount to check
   * @returns {boolean} Whether user has enough coins
   */
  function canAfford(amount) {
    return balance.value >= amount
  }

  /**
   * Purchase an item from the shop
   * @param {string} itemId - Item ID to purchase
   * @param {number} price - Price of the item
   * @param {string} itemType - Type of item (sticker, frame, background)
   * @returns {boolean} Whether the purchase was successful
   */
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
    // Default avatars are always owned
    if (defaultAvatars.some(a => a.id === itemId)) {
      return true
    }
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

  function equipAvatar(avatarId) {
    if (avatarId && !hasPurchasedItem(avatarId)) return false
    equippedAvatar.value = avatarId
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
    equippedAvatar.value = null
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
    equippedAvatar,
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
    equipAvatar,
    reset
  }
})
