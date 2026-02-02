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
  unicorns: [
    { id: 'sticker_unicorn', icon: '🦄', price: 350, nameKey: 'unicorn' }
  ],
  special: [
    { id: 'sticker_rainbow', icon: '🌈', price: 200, nameKey: 'rainbow' },
    { id: 'sticker_rocket', icon: '🚀', price: 250, nameKey: 'rocket' },
    { id: 'sticker_diamond', icon: '💎', price: 300, nameKey: 'diamond' },
    { id: 'sticker_star', icon: '🌟', price: 180, nameKey: 'star' },
    { id: 'sticker_heart', icon: '💖', price: 150, nameKey: 'sparklingHeart' },
    { id: 'sticker_sun', icon: '🌞', price: 160, nameKey: 'sun' },
    { id: 'sticker_moon', icon: '🌙', price: 170, nameKey: 'moon' },
    { id: 'sticker_butterfly', icon: '🦋', price: 190, nameKey: 'butterfly' },
    { id: 'sticker_flower', icon: '🌺', price: 150, nameKey: 'hibiscus' },
    { id: 'sticker_crown', icon: '👑', price: 400, nameKey: 'crown' },
    { id: 'sticker_crystal', icon: '🔮', price: 320, nameKey: 'crystal' },
    { id: 'sticker_sparkles', icon: '✨', price: 180, nameKey: 'sparkles' },
    { id: 'sticker_comet', icon: '☄️', price: 280, nameKey: 'comet' },
    { id: 'sticker_galaxy', icon: '🌌', price: 350, nameKey: 'galaxy' }
  ],
  ocean: [
    { id: 'sticker_dolphin_ocean', icon: '🐬', price: 240, nameKey: 'dolphin', collection: 'ocean' },
    { id: 'sticker_whale', icon: '🐋', price: 280, nameKey: 'whale', collection: 'ocean' },
    { id: 'sticker_octopus', icon: '🐙', price: 260, nameKey: 'octopus', collection: 'ocean' },
    { id: 'sticker_shark', icon: '🦈', price: 300, nameKey: 'shark', collection: 'ocean' },
    { id: 'sticker_tropical_fish', icon: '🐠', price: 200, nameKey: 'tropicalFish', collection: 'ocean' },
    { id: 'sticker_shell', icon: '🐚', price: 180, nameKey: 'shell', collection: 'ocean' },
    { id: 'sticker_crab', icon: '🦀', price: 220, nameKey: 'crab', collection: 'ocean' },
    { id: 'sticker_jellyfish', icon: '🪼', price: 250, nameKey: 'jellyfish', collection: 'ocean' }
  ],
  space: [
    { id: 'sticker_rocket_space', icon: '🚀', price: 280, nameKey: 'rocketSpace', collection: 'space' },
    { id: 'sticker_ufo', icon: '🛸', price: 320, nameKey: 'ufo', collection: 'space' },
    { id: 'sticker_satellite', icon: '🛰️', price: 260, nameKey: 'satellite', collection: 'space' },
    { id: 'sticker_planet', icon: '🪐', price: 300, nameKey: 'planet', collection: 'space' },
    { id: 'sticker_meteor', icon: '☄️', price: 280, nameKey: 'meteor', collection: 'space' },
    { id: 'sticker_astronaut', icon: '👨‍🚀', price: 350, nameKey: 'astronaut', collection: 'space' },
    { id: 'sticker_moon_space', icon: '🌕', price: 220, nameKey: 'fullMoon', collection: 'space' },
    { id: 'sticker_stars', icon: '🌟', price: 200, nameKey: 'starSpace', collection: 'space' }
  ],
  sweets: [
    { id: 'sticker_lollipop', icon: '🍭', price: 150, nameKey: 'lollipop', collection: 'sweets' },
    { id: 'sticker_chocolate', icon: '🍫', price: 160, nameKey: 'chocolate', collection: 'sweets' },
    { id: 'sticker_candy_sweets', icon: '🍬', price: 140, nameKey: 'candySweet', collection: 'sweets' },
    { id: 'sticker_icecream_sweets', icon: '🍦', price: 170, nameKey: 'iceCreamSweet', collection: 'sweets' },
    { id: 'sticker_cake_sweets', icon: '🎂', price: 200, nameKey: 'cakeSweet', collection: 'sweets' },
    { id: 'sticker_cupcake_sweets', icon: '🧁', price: 180, nameKey: 'cupcakeSweet', collection: 'sweets' },
    { id: 'sticker_donut_sweets', icon: '🍩', price: 160, nameKey: 'donutSweet', collection: 'sweets' },
    { id: 'sticker_cookie_sweets', icon: '🍪', price: 140, nameKey: 'cookieSweet', collection: 'sweets' }
  ],
  animals: [
    { id: 'sticker_panda', icon: '🐼', price: 240, nameKey: 'panda' },
    { id: 'sticker_cat', icon: '🐱', price: 180, nameKey: 'cat' },
    { id: 'sticker_dog', icon: '🐶', price: 180, nameKey: 'dog' },
    { id: 'sticker_rabbit', icon: '🐰', price: 200, nameKey: 'rabbit' },
    { id: 'sticker_bear', icon: '🐻', price: 210, nameKey: 'bear' },
    { id: 'sticker_fox', icon: '🦊', price: 230, nameKey: 'fox' },
    { id: 'sticker_lion', icon: '🦁', price: 250, nameKey: 'lion' },
    { id: 'sticker_penguin', icon: '🐧', price: 200, nameKey: 'penguin' },
    { id: 'sticker_owl', icon: '🦉', price: 220, nameKey: 'owl' },
    { id: 'sticker_dolphin', icon: '🐬', price: 240, nameKey: 'dolphin' },
    { id: 'sticker_koala', icon: '🐨', price: 260, nameKey: 'koala' },
    { id: 'sticker_tiger', icon: '🐯', price: 280, nameKey: 'tiger' },
    { id: 'sticker_elephant', icon: '🐘', price: 270, nameKey: 'elephant' },
    { id: 'sticker_monkey', icon: '🐵', price: 220, nameKey: 'monkey' },
    { id: 'sticker_dragon', icon: '🐉', price: 400, nameKey: 'dragon' },
    { id: 'sticker_phoenix', icon: '🦅', price: 350, nameKey: 'phoenix' }
  ],
  food: [
    { id: 'sticker_pizza', icon: '🍕', price: 100, nameKey: 'pizza' },
    { id: 'sticker_icecream', icon: '🍦', price: 90, nameKey: 'iceCream' },
    { id: 'sticker_cake', icon: '🎂', price: 140, nameKey: 'cake' },
    { id: 'sticker_cookie', icon: '🍪', price: 80, nameKey: 'cookie' },
    { id: 'sticker_candy', icon: '🍬', price: 70, nameKey: 'candy' },
    { id: 'sticker_donut', icon: '🍩', price: 110, nameKey: 'donut' },
    { id: 'sticker_burger', icon: '🍔', price: 120, nameKey: 'burger' },
    { id: 'sticker_fries', icon: '🍟', price: 85, nameKey: 'fries' },
    { id: 'sticker_sushi', icon: '🍣', price: 150, nameKey: 'sushi' },
    { id: 'sticker_watermelon', icon: '🍉', price: 95, nameKey: 'watermelon' },
    { id: 'sticker_strawberry', icon: '🍓', price: 100, nameKey: 'strawberry' },
    { id: 'sticker_cupcake', icon: '🧁', price: 130, nameKey: 'cupcake' }
  ],
  sports: [
    { id: 'sticker_soccer', icon: '⚽', price: 130, nameKey: 'soccer' },
    { id: 'sticker_basketball', icon: '🏀', price: 140, nameKey: 'basketball' },
    { id: 'sticker_tennis', icon: '🎾', price: 145, nameKey: 'tennis' },
    { id: 'sticker_baseball', icon: '⚾', price: 135, nameKey: 'baseball' },
    { id: 'sticker_volleyball', icon: '🏐', price: 130, nameKey: 'volleyball' },
    { id: 'sticker_trophy', icon: '🏆', price: 200, nameKey: 'trophy' },
    { id: 'sticker_medal', icon: '🥇', price: 180, nameKey: 'medal' },
    { id: 'sticker_skateboard', icon: '🛹', price: 160, nameKey: 'skateboard' }
  ],
  nature: [
    { id: 'sticker_snowflake', icon: '❄️', price: 150, nameKey: 'snowflake' },
    { id: 'sticker_lightning', icon: '⚡', price: 180, nameKey: 'lightning' },
    { id: 'sticker_fire', icon: '🔥', price: 200, nameKey: 'fire' },
    { id: 'sticker_cloud', icon: '☁️', price: 120, nameKey: 'cloud' },
    { id: 'sticker_tornado', icon: '🌪️', price: 220, nameKey: 'tornado' },
    { id: 'sticker_wave', icon: '🌊', price: 170, nameKey: 'wave' },
    { id: 'sticker_volcano', icon: '🌋', price: 250, nameKey: 'volcano' },
    { id: 'sticker_mountain', icon: '🏔️', price: 160, nameKey: 'mountain' },
    { id: 'sticker_tree', icon: '🌳', price: 130, nameKey: 'tree' },
    { id: 'sticker_cactus', icon: '🌵', price: 140, nameKey: 'cactus' }
  ],
  fantasy: [
    { id: 'sticker_fairy', icon: '🧚', price: 280, nameKey: 'fairy' },
    { id: 'sticker_wizard', icon: '🧙', price: 300, nameKey: 'wizard' },
    { id: 'sticker_mermaid', icon: '🧜', price: 320, nameKey: 'mermaid' },
    { id: 'sticker_genie', icon: '🧞', price: 350, nameKey: 'genie' },
    { id: 'sticker_ghost', icon: '👻', price: 180, nameKey: 'ghost' },
    { id: 'sticker_alien', icon: '👽', price: 250, nameKey: 'alien' },
    { id: 'sticker_robot', icon: '🤖', price: 270, nameKey: 'robot' },
    { id: 'sticker_superhero', icon: '🦸', price: 300, nameKey: 'superhero' },
    { id: 'sticker_castle', icon: '🏰', price: 280, nameKey: 'castle' },
    { id: 'sticker_magic', icon: '🪄', price: 260, nameKey: 'magic' }
  ],
  celebration: [
    { id: 'sticker_balloon', icon: '🎈', price: 120, nameKey: 'balloon' },
    { id: 'sticker_gift', icon: '🎁', price: 160, nameKey: 'gift' },
    { id: 'sticker_confetti', icon: '🎊', price: 140, nameKey: 'confetti' },
    { id: 'sticker_party', icon: '🎉', price: 150, nameKey: 'party' },
    { id: 'sticker_fireworks', icon: '🎆', price: 200, nameKey: 'fireworks' },
    { id: 'sticker_sparkler', icon: '🎇', price: 180, nameKey: 'sparkler' },
    { id: 'sticker_ribbon', icon: '🎀', price: 130, nameKey: 'ribbon' },
    { id: 'sticker_clap', icon: '👏', price: 100, nameKey: 'clap' }
  ]
}

// All purchasable stickers as flat array
export const allPurchasableStickers = Object.values(purchasableStickers).flat()

// Purchasable avatars
// Default avatars (owned by all users)
export const defaultAvatars = [
  {
    id: 'avatar_princess',
    nameKey: 'princess',
    price: 0,
    image: 'math_princess.png',
    isDefault: true
  },
  {
    id: 'avatar_prince',
    nameKey: 'prince',
    price: 0,
    image: 'math_prince.png',
    isDefault: true
  }
]

// Purchasable avatars
export const purchasableAvatars = [
  {
    id: 'avatar_red_panda',
    nameKey: 'redPanda',
    price: 800,
    image: 'red_panda.png'
  }
  // More avatars can be added here
]

// All avatars (default + purchasable)
export const allAvatars = [...defaultAvatars, ...purchasableAvatars]

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
    id: 'bg_bunny',
    nameKey: 'bunny',
    price: 100,
    preview: '🐰💕',
    gradient: 'linear-gradient(135deg, #FFE4EC, #FFB6C1, #FFC0CB, #FFE4EC)',
    particles: ['🐰', '💕', '🌸', '✨', '💖'],
    description: 'bunnyDesc'
  },
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
  },
  {
    id: 'bg_winter',
    nameKey: 'winter',
    price: 380,
    preview: '❄️🏔️',
    gradient: 'linear-gradient(135deg, #E0EAFC, #CFDEF3, #a8c0ff)',
    particles: ['❄️', '⛄', '🌨️', '💎'],
    description: 'winterDesc'
  },
  {
    id: 'bg_rainbow',
    nameKey: 'rainbow',
    price: 420,
    preview: '🌈☁️',
    gradient: 'linear-gradient(135deg, #ff9a9e, #fecfef, #fecfef, #a1c4fd, #c2e9fb)',
    particles: ['🌈', '☁️', '✨', '🦄'],
    description: 'rainbowDesc'
  },
  {
    id: 'bg_jungle',
    nameKey: 'jungle',
    price: 360,
    preview: '🌴🦜',
    gradient: 'linear-gradient(135deg, #0b8a3d, #1e5631, #3d8b37, #5cad4a)',
    particles: ['🌴', '🦜', '🌺', '🦋', '🍃'],
    description: 'jungleDesc'
  },
  {
    id: 'bg_castle',
    nameKey: 'castle',
    price: 480,
    preview: '🏰👸',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
    particles: ['🏰', '👑', '✨', '💫', '🌟'],
    description: 'castleDesc'
  },
  {
    id: 'bg_underwater',
    nameKey: 'underwater',
    price: 400,
    preview: '🐙🦑',
    gradient: 'linear-gradient(135deg, #000428, #004e92, #0077b6)',
    particles: ['🐙', '🦑', '🐡', '🦈', '🫧'],
    description: 'underwaterDesc'
  },
  {
    id: 'bg_volcano',
    nameKey: 'volcano',
    price: 440,
    preview: '🌋🔥',
    gradient: 'linear-gradient(135deg, #1a0a0a, #8B0000, #FF4500, #FF6347)',
    particles: ['🌋', '🔥', '💥', '☄️'],
    description: 'volcanoDesc'
  },
  {
    id: 'bg_meadow',
    nameKey: 'meadow',
    price: 340,
    preview: '🌻🌾',
    gradient: 'linear-gradient(135deg, #96e6a1, #d4fc79, #fffde4)',
    particles: ['🌻', '🌼', '🦋', '🐝', '🌾'],
    description: 'meadowDesc'
  },
  {
    id: 'bg_night',
    nameKey: 'night',
    price: 360,
    preview: '🌙🦉',
    gradient: 'linear-gradient(135deg, #0c0c1e, #1a1a2e, #16213e, #1a1a40)',
    particles: ['🌙', '⭐', '🦉', '🌟', '✨'],
    description: 'nightDesc'
  },
  {
    id: 'bg_desert',
    nameKey: 'desert',
    price: 320,
    preview: '🏜️🐪',
    gradient: 'linear-gradient(135deg, #f4a460, #deb887, #d2691e, #cd853f)',
    particles: ['🏜️', '🐪', '🌵', '☀️', '🦂'],
    description: 'desertDesc'
  },
  {
    id: 'bg_arctic',
    nameKey: 'arctic',
    price: 400,
    preview: '🐧🧊',
    gradient: 'linear-gradient(135deg, #e0f7fa, #b2ebf2, #80deea, #4dd0e1)',
    particles: ['🐧', '🧊', '❄️', '🦭', '⛄'],
    description: 'arcticDesc'
  },
  {
    id: 'bg_neon',
    nameKey: 'neon',
    price: 500,
    preview: '💜💙',
    gradient: 'linear-gradient(135deg, #0a0a0a, #1a0a2e, #2a0a4e, #0a2a4e)',
    particles: ['💜', '💙', '💖', '✨', '⚡'],
    description: 'neonDesc'
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

// Collection rewards - bonus for completing a full set
export const collectionRewards = {
  ocean: {
    nameKey: 'oceanCollection',
    requiredStickers: [
      'sticker_dolphin_ocean',
      'sticker_whale',
      'sticker_octopus',
      'sticker_shark',
      'sticker_tropical_fish',
      'sticker_shell',
      'sticker_crab',
      'sticker_jellyfish'
    ],
    rewardCoins: 400,
    rewardBadge: '🌊👑',
    rewardBadgeKey: 'oceanMaster'
  },
  space: {
    nameKey: 'spaceCollection',
    requiredStickers: [
      'sticker_rocket_space',
      'sticker_ufo',
      'sticker_satellite',
      'sticker_planet',
      'sticker_meteor',
      'sticker_astronaut',
      'sticker_moon_space',
      'sticker_stars'
    ],
    rewardCoins: 450,
    rewardBadge: '🚀👑',
    rewardBadgeKey: 'spaceMaster'
  },
  sweets: {
    nameKey: 'sweetsCollection',
    requiredStickers: [
      'sticker_lollipop',
      'sticker_chocolate',
      'sticker_candy_sweets',
      'sticker_icecream_sweets',
      'sticker_cake_sweets',
      'sticker_cupcake_sweets',
      'sticker_donut_sweets',
      'sticker_cookie_sweets'
    ],
    rewardCoins: 350,
    rewardBadge: '🍭👑',
    rewardBadgeKey: 'sweetsMaster'
  }
}

// Get collection progress
export function getCollectionProgress(collectionId, purchasedItems) {
  const collection = collectionRewards[collectionId]
  if (!collection) return null

  const owned = collection.requiredStickers.filter(id => purchasedItems.includes(id))
  return {
    total: collection.requiredStickers.length,
    owned: owned.length,
    isComplete: owned.length === collection.requiredStickers.length,
    missing: collection.requiredStickers.filter(id => !purchasedItems.includes(id))
  }
}
