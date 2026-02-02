/**
 * Composable for handling shop purchase logic
 * @module composables/useShopPurchase
 */
import { ref, computed } from 'vue'
import { useMessage } from 'naive-ui'
import { useCoinsStore } from '../stores/coins.js'
import { useProgressStore } from '../stores/progress.js'
import { useLocaleStore } from '../stores/locale.js'
import { useSound } from './useSound.js'
import { useConfetti } from './useConfetti.js'

/**
 * @typedef {Object} PendingPurchase
 * @property {'level' | 'sticker' | 'frame' | 'background' | 'avatar'} type
 * @property {string} [id] - Item ID for non-level purchases
 * @property {string} [operation] - Operation type for level unlocks
 * @property {number} [level] - Level number for level unlocks
 * @property {number} price
 * @property {string} icon
 * @property {string} name
 */

/**
 * Hook for managing shop purchase flow
 * @returns {Object} Purchase management functions and state
 */
export function useShopPurchase() {
  const coinsStore = useCoinsStore()
  const progressStore = useProgressStore()
  const localeStore = useLocaleStore()
  const message = useMessage()
  const { playPurchaseSound, playUnlockSound } = useSound()
  const { purchaseCelebration, unlockCelebration } = useConfetti()

  const t = computed(() => localeStore.t)

  const showConfirmDialog = ref(false)
  const pendingPurchase = ref(null)

  /**
   * Start purchase confirmation for a level unlock
   * @param {Object} params
   * @param {string} params.operation
   * @param {number} params.level
   * @param {number} params.price
   */
  function confirmLevelPurchase({ operation, level, price }) {
    const levelName = t.value.levels.level + ' ' + level
    pendingPurchase.value = {
      type: 'level',
      operation,
      level,
      price,
      icon: '🔓',
      name: `${t.value.operations[operation]} - ${levelName}`
    }
    showConfirmDialog.value = true
  }

  /**
   * Start purchase confirmation for a sticker
   * @param {Object} sticker
   */
  function confirmStickerPurchase(sticker) {
    pendingPurchase.value = {
      type: 'sticker',
      id: sticker.id,
      price: sticker.price,
      icon: sticker.icon,
      name: t.value.shop.stickers[sticker.nameKey] || sticker.nameKey
    }
    showConfirmDialog.value = true
  }

  /**
   * Start purchase confirmation for a frame
   * @param {Object} frame
   */
  function confirmFramePurchase(frame) {
    pendingPurchase.value = {
      type: 'frame',
      id: frame.id,
      price: frame.price,
      icon: '🖼️',
      name: t.value.shop.frames[frame.nameKey] || frame.nameKey
    }
    showConfirmDialog.value = true
  }

  /**
   * Start purchase confirmation for a background
   * @param {Object} bg
   */
  function confirmBackgroundPurchase(bg) {
    pendingPurchase.value = {
      type: 'background',
      id: bg.id,
      price: bg.price,
      icon: bg.preview,
      name: t.value.shop.backgrounds[bg.nameKey] || bg.nameKey
    }
    showConfirmDialog.value = true
  }

  /**
   * Start purchase confirmation for an avatar
   * @param {Object} avatar
   */
  function confirmAvatarPurchase(avatar) {
    pendingPurchase.value = {
      type: 'avatar',
      id: avatar.id,
      price: avatar.price,
      icon: avatar.preview,
      name: t.value.shop.avatars?.[avatar.nameKey] || avatar.nameKey
    }
    showConfirmDialog.value = true
  }

  /**
   * Execute the pending purchase
   * @returns {boolean} Whether purchase was successful
   */
  function executePurchase() {
    if (!pendingPurchase.value) return false

    const { type, id, price, operation, level } = pendingPurchase.value
    let success = false

    if (type === 'level') {
      if (coinsStore.spendCoins(price, 'level_unlock', `${operation}_${level}`)) {
        progressStore.purchaseUnlock(operation, level)
        success = true
        playUnlockSound()
        unlockCelebration()
      }
    } else {
      success = coinsStore.purchaseItem(id, price, type)
      if (success) {
        playPurchaseSound()
        purchaseCelebration()
      }
    }

    if (success) {
      message.success(t.value.shop.purchaseSuccess)
    } else {
      message.error(t.value.shop.purchaseFailed)
    }

    showConfirmDialog.value = false
    pendingPurchase.value = null

    return success
  }

  /**
   * Cancel the pending purchase
   */
  function cancelPurchase() {
    showConfirmDialog.value = false
    pendingPurchase.value = null
  }

  return {
    showConfirmDialog,
    pendingPurchase,
    confirmLevelPurchase,
    confirmStickerPurchase,
    confirmFramePurchase,
    confirmBackgroundPurchase,
    confirmAvatarPurchase,
    executePurchase,
    cancelPurchase
  }
}
