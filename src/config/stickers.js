// Sticker configuration with cute icons
// Descriptions are handled via i18n keys

// Achievement stickers (earned through gameplay)
// descriptionKey format: {operation}_{level} e.g. "addition_bronze"
export const stickerConfig = {
  addition: {
    bronze: { icon: '🌟', cuteIcon: '✨' },
    silver: { icon: '💫', cuteIcon: '🌙' },
    gold: { icon: '⭐', cuteIcon: '🌟' },
    crown: { icon: '👑', cuteIcon: '💎' }
  },
  subtraction: {
    bronze: { icon: '🎀', cuteIcon: '🎗️' },
    silver: { icon: '🎁', cuteIcon: '🎊' },
    gold: { icon: '🏆', cuteIcon: '🥇' },
    crown: { icon: '👑', cuteIcon: '💎' }
  },
  multiplication: {
    bronze: { icon: '🌸', cuteIcon: '🌺' },
    silver: { icon: '🌼', cuteIcon: '🌻' },
    gold: { icon: '🌹', cuteIcon: '💐' },
    crown: { icon: '👑', cuteIcon: '💎' }
  },
  division: {
    bronze: { icon: '🦋', cuteIcon: '🐝' },
    silver: { icon: '🐬', cuteIcon: '🐳' },
    gold: { icon: '🦄', cuteIcon: '🐉' },
    crown: { icon: '👑', cuteIcon: '💎' }
  },
  fraction: {
    bronze: { icon: '🍰', cuteIcon: '🧁' },
    silver: { icon: '🎂', cuteIcon: '🍩' },
    gold: { icon: '🍭', cuteIcon: '🍬' },
    crown: { icon: '👑', cuteIcon: '💎' }
  }
}

// Sticker conditions - levels required for each tier
// Description is handled via i18n key 'stickerWall.condition.{tier}'
export const stickerConditions = {
  bronze: {
    levels: [1, 2]
  },
  silver: {
    levels: [3, 4]
  },
  gold: {
    levels: [5, 6]
  },
  crown: {
    levels: [1, 2, 3, 4, 5, 6],
    minAccuracy: 90
  }
}

// Hidden achievement stickers (earned through special gameplay milestones)
export const hiddenAchievementStickers = [
  {
    id: 'achievement_first_perfect',
    icon: '🎯',
    nameKey: 'firstPerfect',
    descKey: 'firstPerfectDesc',
    category: 'hidden'
  },
  {
    id: 'achievement_speed_demon',
    icon: '⚡',
    nameKey: 'speedDemon',
    descKey: 'speedDemonDesc',
    category: 'hidden'
  },
  {
    id: 'achievement_seven_day',
    icon: '🔥',
    nameKey: 'sevenDay',
    descKey: 'sevenDayDesc',
    category: 'hidden'
  },
  {
    id: 'achievement_gold_collector',
    icon: '🏅',
    nameKey: 'goldCollector',
    descKey: 'goldCollectorDesc',
    category: 'hidden'
  },
  {
    id: 'achievement_thousand',
    icon: '💯',
    nameKey: 'thousand',
    descKey: 'thousandDesc',
    category: 'hidden'
  },
  {
    id: 'achievement_all_rounder',
    icon: '🎓',
    nameKey: 'allRounder',
    descKey: 'allRounderDesc',
    category: 'hidden'
  },
  {
    id: 'achievement_first_try',
    icon: '💎',
    nameKey: 'firstTry',
    descKey: 'firstTryDesc',
    category: 'hidden'
  },
  {
    id: 'achievement_collector',
    icon: '📚',
    nameKey: 'collector',
    descKey: 'collectorDesc',
    category: 'hidden'
  },
  {
    id: 'achievement_rich',
    icon: '💰',
    nameKey: 'rich',
    descKey: 'richDesc',
    category: 'hidden'
  },
  {
    id: 'achievement_math_master',
    icon: '👑',
    nameKey: 'mathMaster',
    descKey: 'mathMasterDesc',
    category: 'hidden'
  }
]

// Get total sticker count (achievement + purchasable + hidden)
export function getTotalStickerCount() {
  // 20 achievement stickers (5 operations × 4 levels)
  // 28 purchasable stickers (from shop.js)
  // 10 hidden achievement stickers
  return 58
}
