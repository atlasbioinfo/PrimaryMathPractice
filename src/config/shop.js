// Shop configuration for math practice app

// Level unlock prices
export const levelUnlockPrices = {
  2: 50,
  3: 100,
  4: 200,
  5: 350,
  6: 500
}

// Purchasable stickers organized by series
export const purchasableStickers = {
  special: [
    { id: 'sticker_rainbow', icon: '🌈', price: 120, nameKey: 'rainbow' },
    { id: 'sticker_unicorn', icon: '🦄', price: 200, nameKey: 'unicorn' },
    { id: 'sticker_rocket', icon: '🚀', price: 150, nameKey: 'rocket' },
    { id: 'sticker_diamond', icon: '💎', price: 180, nameKey: 'diamond' },
    { id: 'sticker_star', icon: '🌟', price: 100, nameKey: 'star' },
    { id: 'sticker_heart', icon: '💖', price: 80, nameKey: 'sparklingHeart' },
    { id: 'sticker_sun', icon: '🌞', price: 90, nameKey: 'sun' },
    { id: 'sticker_moon', icon: '🌙', price: 95, nameKey: 'moon' },
    { id: 'sticker_butterfly', icon: '🦋', price: 110, nameKey: 'butterfly' },
    { id: 'sticker_flower', icon: '🌺', price: 85, nameKey: 'hibiscus' }
  ],
  animals: [
    { id: 'sticker_panda', icon: '🐼', price: 140, nameKey: 'panda' },
    { id: 'sticker_cat', icon: '🐱', price: 100, nameKey: 'cat' },
    { id: 'sticker_dog', icon: '🐶', price: 100, nameKey: 'dog' },
    { id: 'sticker_rabbit', icon: '🐰', price: 110, nameKey: 'rabbit' },
    { id: 'sticker_bear', icon: '🐻', price: 120, nameKey: 'bear' },
    { id: 'sticker_fox', icon: '🦊', price: 130, nameKey: 'fox' },
    { id: 'sticker_lion', icon: '🦁', price: 140, nameKey: 'lion' },
    { id: 'sticker_penguin', icon: '🐧', price: 115, nameKey: 'penguin' },
    { id: 'sticker_owl', icon: '🦉', price: 125, nameKey: 'owl' },
    { id: 'sticker_dolphin', icon: '🐬', price: 135, nameKey: 'dolphin' }
  ],
  food: [
    { id: 'sticker_pizza', icon: '🍕', price: 50, nameKey: 'pizza' },
    { id: 'sticker_icecream', icon: '🍦', price: 45, nameKey: 'iceCream' },
    { id: 'sticker_cake', icon: '🎂', price: 70, nameKey: 'cake' },
    { id: 'sticker_cookie', icon: '🍪', price: 40, nameKey: 'cookie' },
    { id: 'sticker_candy', icon: '🍬', price: 35, nameKey: 'candy' }
  ],
  sports: [
    { id: 'sticker_soccer', icon: '⚽', price: 65, nameKey: 'soccer' },
    { id: 'sticker_basketball', icon: '🏀', price: 70, nameKey: 'basketball' },
    { id: 'sticker_tennis', icon: '🎾', price: 75, nameKey: 'tennis' }
  ]
}

// All purchasable stickers as flat array
export const allPurchasableStickers = Object.values(purchasableStickers).flat()

// Avatar frames
export const avatarFrames = [
  {
    id: 'frame_gold',
    nameKey: 'gold',
    price: 250,
    color: '#FFD700',
    gradient: 'linear-gradient(135deg, #FFD700, #FFA500)',
    borderWidth: 4
  },
  {
    id: 'frame_rainbow',
    nameKey: 'rainbow',
    price: 350,
    gradient: 'linear-gradient(135deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #8B00FF)',
    borderWidth: 4
  },
  {
    id: 'frame_sparkle',
    nameKey: 'sparkle',
    price: 400,
    color: '#E6E6FA',
    gradient: 'linear-gradient(135deg, #E6E6FA, #FFB6C1, #87CEEB)',
    borderWidth: 5,
    animated: true
  },
  {
    id: 'frame_diamond',
    nameKey: 'diamond',
    price: 500,
    color: '#B9F2FF',
    gradient: 'linear-gradient(135deg, #B9F2FF, #FFFFFF, #B9F2FF)',
    borderWidth: 5
  },
  {
    id: 'frame_flower',
    nameKey: 'flower',
    price: 300,
    color: '#FFB6C1',
    gradient: 'linear-gradient(135deg, #FFB6C1, #FF69B4)',
    borderWidth: 4,
    decoration: '🌸'
  },
  {
    id: 'frame_star',
    nameKey: 'star',
    price: 320,
    color: '#FFD700',
    gradient: 'linear-gradient(135deg, #FFD700, #FFA500)',
    borderWidth: 4,
    decoration: '⭐'
  },
  {
    id: 'frame_heart',
    nameKey: 'heart',
    price: 280,
    color: '#FF69B4',
    gradient: 'linear-gradient(135deg, #FF69B4, #FF1493)',
    borderWidth: 4,
    decoration: '💕'
  },
  {
    id: 'frame_crown',
    nameKey: 'crown',
    price: 600,
    color: '#FFD700',
    gradient: 'linear-gradient(135deg, #FFD700, #FF8C00, #FFD700)',
    borderWidth: 6,
    decoration: '👑'
  }
]

// Background themes
export const backgroundThemes = [
  {
    id: 'bg_space',
    nameKey: 'space',
    price: 350,
    preview: '🚀🌟',
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    particles: ['⭐', '🌟', '✨', '💫'],
    description: 'spaceDesc'
  },
  {
    id: 'bg_ocean',
    nameKey: 'ocean',
    price: 320,
    preview: '🐠🌊',
    gradient: 'linear-gradient(135deg, #0077B6, #00B4D8, #90E0EF)',
    particles: ['🐠', '🐟', '🦀', '🐚', '🌊'],
    description: 'oceanDesc'
  },
  {
    id: 'bg_forest',
    nameKey: 'forest',
    price: 300,
    preview: '🌲🧚',
    gradient: 'linear-gradient(135deg, #134E5E, #71B280, #2D5016)',
    particles: ['🌲', '🍃', '🦋', '🍄', '✨'],
    description: 'forestDesc'
  },
  {
    id: 'bg_candy',
    nameKey: 'candy',
    price: 280,
    preview: '🍭🍬',
    gradient: 'linear-gradient(135deg, #FFB6C1, #FF69B4, #DDA0DD)',
    particles: ['🍭', '🍬', '🧁', '🍩', '🎀'],
    description: 'candyDesc'
  },
  {
    id: 'bg_sunset',
    nameKey: 'sunset',
    price: 380,
    preview: '🌅🧡',
    gradient: 'linear-gradient(135deg, #FF512F, #F09819, #FFD700)',
    particles: ['🌅', '🌤️', '☁️', '🌸'],
    description: 'sunsetDesc'
  },
  {
    id: 'bg_aurora',
    nameKey: 'aurora',
    price: 450,
    preview: '🌌💜',
    gradient: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364, #1CB5E0)',
    particles: ['✨', '💫', '🌟', '❄️'],
    description: 'auroraDesc'
  },
  {
    id: 'bg_sakura',
    nameKey: 'sakura',
    price: 400,
    preview: '🌸🌷',
    gradient: 'linear-gradient(135deg, #FFECD2, #FCB69F, #FFB6C1)',
    particles: ['🌸', '🌷', '💮', '🎀'],
    description: 'sakuraDesc'
  },
  {
    id: 'bg_galaxy',
    nameKey: 'galaxy',
    price: 500,
    preview: '🌌🔮',
    gradient: 'linear-gradient(135deg, #0c0c1e, #1a1a3e, #2d1f5e, #4a2c7e)',
    particles: ['🌟', '💫', '✨', '🔮', '🌙'],
    description: 'galaxyDesc'
  }
]

// Hidden achievement stickers (not purchasable, earned through gameplay)
export const hiddenAchievements = [
  {
    id: 'achievement_first_perfect',
    icon: '🎯',
    nameKey: 'firstPerfect',
    descKey: 'firstPerfectDesc',
    condition: 'first_perfect_score'
  },
  {
    id: 'achievement_speed_demon',
    icon: '⚡',
    nameKey: 'speedDemon',
    descKey: 'speedDemonDesc',
    condition: 'complete_under_60_seconds'
  },
  {
    id: 'achievement_seven_day',
    icon: '🔥',
    nameKey: 'sevenDay',
    descKey: 'sevenDayDesc',
    condition: 'seven_day_streak'
  },
  {
    id: 'achievement_gold_collector',
    icon: '🏅',
    nameKey: 'goldCollector',
    descKey: 'goldCollectorDesc',
    condition: 'earn_1000_coins'
  },
  {
    id: 'achievement_thousand',
    icon: '💯',
    nameKey: 'thousand',
    descKey: 'thousandDesc',
    condition: 'complete_1000_questions'
  },
  {
    id: 'achievement_all_rounder',
    icon: '🎓',
    nameKey: 'allRounder',
    descKey: 'allRounderDesc',
    condition: 'master_all_operations'
  },
  {
    id: 'achievement_first_try',
    icon: '💎',
    nameKey: 'firstTry',
    descKey: 'firstTryDesc',
    condition: 'perfect_no_retry'
  },
  {
    id: 'achievement_collector',
    icon: '📚',
    nameKey: 'collector',
    descKey: 'collectorDesc',
    condition: 'collect_30_stickers'
  },
  {
    id: 'achievement_rich',
    icon: '💰',
    nameKey: 'rich',
    descKey: 'richDesc',
    condition: 'accumulate_5000_coins'
  },
  {
    id: 'achievement_math_master',
    icon: '👑',
    nameKey: 'mathMaster',
    descKey: 'mathMasterDesc',
    condition: 'complete_all_levels_perfect'
  }
]

// Get shop item by ID
export function getShopItem(itemId) {
  // Check stickers
  const sticker = allPurchasableStickers.find(s => s.id === itemId)
  if (sticker) return { ...sticker, type: 'sticker' }

  // Check frames
  const frame = avatarFrames.find(f => f.id === itemId)
  if (frame) return { ...frame, type: 'frame' }

  // Check backgrounds
  const bg = backgroundThemes.find(b => b.id === itemId)
  if (bg) return { ...bg, type: 'background' }

  return null
}

// Get level unlock price
export function getLevelUnlockPrice(level) {
  return levelUnlockPrices[level] || null
}
