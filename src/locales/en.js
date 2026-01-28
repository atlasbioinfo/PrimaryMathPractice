// English translations
export default {
  // Gender Selection
  welcome: {
    title: 'Welcome to Math Kingdom!',
    subtitle: 'Choose your character to start the adventure',
    princess: 'Math Princess',
    princessDesc: 'A dreamy pink world',
    prince: 'Math Prince',
    princeDesc: 'A blue adventure land',
    defaultPrince: 'Little Prince',
    defaultPrincess: 'Little Princess'
  },

  // Home Screen
  home: {
    princessTitle: 'Math Princess',
    princeTitle: 'Math Prince',
    subtitle: 'The Road to Math Royalty',
    streakDays: 'Streak',
    totalQuestions: 'Questions',
    accuracy: 'Accuracy',
    stickers: 'Stickers',
    stickerWall: 'My Sticker Wall',
    viewAll: 'View All →',
    startGame: 'Start Practice',
    stats: 'Statistics',
    stickerWallBtn: 'Stickers',
    reset: 'Reset Data',
    noStickers: 'Complete levels to earn stickers!',
    confirmReset: 'Confirm Reset',
    resetWarning: 'Are you sure you want to reset all data? This will clear all progress, stickers, and statistics.',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },

  // Operation Selection
  operations: {
    title: 'Choose Operation Type',
    addition: 'Addition',
    subtraction: 'Subtraction',
    multiplication: 'Multiplication',
    division: 'Division',
    fraction: 'Fractions',
    levelsCompleted: '{count}/6 levels completed'
  },

  // Level Selection
  levels: {
    title: 'Select Level',
    level: 'Level',
    best: 'Best',
    levelNames: {
      1: 'Number Baby',
      2: 'Little Explorer',
      3: 'Number Fairy',
      4: 'Hundred Warrior',
      5: 'Math Master',
      6: '' // Dynamic based on operation
    },
    princeTitle: {
      addition: 'Addition Prince',
      subtraction: 'Subtraction Prince',
      multiplication: 'Multiplication Prince',
      division: 'Division Prince',
      fraction: 'Fraction Prince'
    },
    princessTitle: {
      addition: 'Addition Princess',
      subtraction: 'Subtraction Princess',
      multiplication: 'Multiplication Princess',
      division: 'Division Princess',
      fraction: 'Fraction Princess'
    },
    levelDescriptions: {
      addition_1: '1-10 + 1-10',
      addition_2: '10-50 + 1-20',
      addition_3: '10-99 + 10-99',
      addition_4: '100-500 + tens',
      addition_5: '100-999 + non-zero ones',
      addition_6: 'Mixed large numbers',
      subtraction_1: '10-20 − 1-9',
      subtraction_2: '20-50 − 1-19',
      subtraction_3: '50-99 − 10-49',
      subtraction_4: '100-200 − tens',
      subtraction_5: '200-500 − non-zero ones',
      subtraction_6: 'Mixed large numbers',
      multiplication_1: '1-5 × 1-5',
      multiplication_2: '1-9 × 1-9 (times table)',
      multiplication_3: '10-20 × 2-9',
      multiplication_4: '11-19 × 11-19',
      multiplication_5: '20-50 × 2-9',
      multiplication_6: 'Mixed challenge',
      division_1: 'Divisible by 2-5',
      division_2: 'Times table division',
      division_3: 'Tens ÷',
      division_4: 'Within 100 ÷',
      division_5: 'Larger numbers ÷',
      division_6: 'Mixed challenge',
      fraction_1: 'Same denominator +',
      fraction_2: 'Same denominator −',
      fraction_3: 'Simple different denominators',
      fraction_4: 'Fraction × integer',
      fraction_5: 'Fraction ÷ integer',
      fraction_6: 'Mixed fraction operations'
    }
  },

  // Game Screen
  game: {
    question: 'Question',
    yourAnswer: 'Your answer',
    submit: 'Submit',
    correct: 'Correct',
    wrong: 'Wrong',
    correctAnswer: 'Correct answer is',
    retry: 'Try Again',
    next: 'Next →',
    correctFeedback: '✓ Correct!',
    wrongFeedback: '✗ Wrong',
    quit: 'Quit',
    quitTitle: 'Take a break?',
    quitMessage: 'Your progress in this round will not be saved. Want to continue practicing?',
    continueGame: 'Keep Going!',
    quitConfirm: 'Take a Break',
    numerator: 'Top',
    denominator: 'Bottom',
    keyboardHint: 'Keyboard input supported',
    fractionKeyboardHint: 'Tab or / to switch',
    retriedBadge: 'Retried'
  },

  // Result Screen
  result: {
    correct: 'Correct',
    wrong: 'Wrong',
    accuracy: 'Accuracy',
    time: 'Time',
    retriedInfo: '{count} question(s) were correct after retry',
    unlockMessage: '🎉 Awesome! Next level unlocked!',
    newStickers: 'New Stickers Earned!',
    nextLevelIs: 'Next level is',
    home: '🏠 Home',
    tryAgain: '🔄 Try Again',
    nextLevel: '➡️ Next Level',
    showDetails: 'Show Details',
    hideDetails: 'Hide Details',
    encouragement: {
      perfect: [
        "Amazing! You're a math genius!",
        "Perfect! You're absolutely brilliant!",
        "Wow! All correct! You're incredible!",
        "Full marks! You're the brightest star!",
        "Unbeatable! The Math Kingdom is proud of you!"
      ],
      excellent: [
        "Great job! Keep going, next level awaits!",
        "Awesome! You're so close to perfect!",
        "Fantastic! Your progress is amazing!",
        "Brilliant! You're a math star!",
        "Super! Keep up the great work!"
      ],
      good: [
        "Well done! Keep practicing!",
        "Nice work! Keep it up!",
        "Good job! Practice makes perfect!",
        "Keep going! You can do even better!",
        "Not bad! Persistence is key!"
      ],
      tryAgain: [
        "Don't give up! Practice makes perfect!",
        "Keep trying! You can do it!",
        "It's okay! Failure is the mother of success!",
        "Try again! You'll definitely make it!",
        "Don't quit! Every practice counts!"
      ]
    },
    nextLevelHint: {
      1: 'Ready for a new adventure?',
      2: "Let's challenge harder problems!",
      3: 'Big numbers are coming, are you ready?',
      4: 'About to become a Math Master!',
      5: 'The final challenge, coronation time!'
    }
  },

  // Sticker Wall
  stickerWall: {
    title: 'My Sticker Wall',
    collected: 'Collected {earned} / {total} stickers',
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    crown: 'Crown',
    notEarned: '🔒 Not yet earned',
    earnedDate: 'Earned on',
    condition: {
      bronze: 'Complete Level 1-2',
      silver: 'Complete Level 3-4',
      gold: 'Complete Level 5-6',
      crown: 'Complete all levels + 90%+ accuracy'
    }
  },

  // Stats Panel
  stats: {
    title: 'Statistics',
    totalQuestions: 'Total Questions',
    overallAccuracy: 'Overall Accuracy',
    streakDays: 'Streak Days',
    operationStats: 'Stats by Operation',
    questions: 'Questions',
    accuracy: 'Accuracy',
    sessions: 'Sessions',
    bestTime: 'Best Time',
    progressOverview: 'Level Progress'
  },

  // Common
  common: {
    back: 'Back',
    close: 'Close',
    loading: 'Loading...'
  },

  // User Menu
  userMenu: {
    welcome: 'Welcome',
    logout: 'Logout',
    switchUser: 'Switch User',
    language: 'Language',
    addUser: 'Add User',
    deleteUser: 'Delete User',
    confirmDelete: 'Delete User?',
    deleteWarning: 'Are you sure you want to delete {name}? All progress and data for this user will be permanently deleted.',
    userName: 'Name (optional)',
    namePlaceholder: 'Enter name...',
    selectGender: 'Select Character',
    confirm: 'Create User',
    cancel: 'Cancel',
    delete: 'Delete'
  },

  // Login
  login: {
    enterName: "What's your name?",
    namePlaceholder: 'Enter your name...',
    selectGender: 'I am a...',
    boy: 'Boy',
    girl: 'Girl',
    start: 'Start Adventure!',
    nameRequired: 'Please enter your name'
  },

  // Shop
  shop: {
    title: 'Shop',
    tabs: {
      levels: 'Unlock',
      stickers: 'Stickers',
      frames: 'Frames',
      backgrounds: 'Themes'
    },
    levelUnlockDesc: 'Use coins to unlock new levels early!',
    framesDesc: 'Decorate your avatar with beautiful frames!',
    backgroundsDesc: 'Change your math kingdom theme!',
    allLevelsUnlocked: 'All levels are already unlocked!',
    unlocked: 'Unlocked',
    owned: 'Owned',
    equipped: 'Equipped',
    tapToEquip: 'Tap to equip',
    removeFrame: 'Remove Frame',
    removeBackground: 'Reset Theme',
    confirmPurchase: 'Confirm Purchase',
    balanceAfter: 'Balance after purchase',
    buy: 'Buy',
    purchaseSuccess: 'Purchase successful!',
    purchaseFailed: 'Purchase failed',
    transactionHistory: 'Coin History',
    totalEarned: 'Total Earned',
    totalSpent: 'Total Spent',
    noTransactions: 'No transactions yet',
    transactionReasons: {
      purchase: 'Shop purchase',
      levelUnlock: 'Level unlock',
      levelComplete: 'Level completed'
    },
    stickerSeries: {
      special: 'Special Series',
      animals: 'Animal Friends',
      food: 'Yummy Food',
      sports: 'Sports Fun'
    },
    stickers: {
      rainbow: 'Rainbow',
      unicorn: 'Unicorn',
      rocket: 'Rocket',
      diamond: 'Diamond',
      star: 'Star',
      sparklingHeart: 'Sparkling Heart',
      sun: 'Sun',
      moon: 'Moon',
      butterfly: 'Butterfly',
      hibiscus: 'Hibiscus',
      panda: 'Panda',
      cat: 'Cat',
      dog: 'Dog',
      rabbit: 'Rabbit',
      bear: 'Bear',
      fox: 'Fox',
      lion: 'Lion',
      penguin: 'Penguin',
      owl: 'Owl',
      dolphin: 'Dolphin',
      pizza: 'Pizza',
      iceCream: 'Ice Cream',
      cake: 'Birthday Cake',
      cookie: 'Cookie',
      candy: 'Candy',
      soccer: 'Soccer',
      basketball: 'Basketball',
      tennis: 'Tennis'
    },
    frames: {
      gold: 'Golden Frame',
      rainbow: 'Rainbow Frame',
      sparkle: 'Sparkle Frame',
      diamond: 'Diamond Frame',
      flower: 'Flower Frame',
      star: 'Star Frame',
      heart: 'Heart Frame',
      crown: 'Crown Frame'
    },
    backgrounds: {
      space: 'Space Adventure',
      spaceDesc: 'Explore the stars!',
      ocean: 'Ocean World',
      oceanDesc: 'Dive into the deep blue!',
      forest: 'Magic Forest',
      forestDesc: 'Enter the enchanted woods!',
      candy: 'Candy Land',
      candyDesc: 'A sweet paradise!',
      sunset: 'Sunset Glow',
      sunsetDesc: 'Beautiful golden hour!',
      aurora: 'Aurora Night',
      auroraDesc: 'Northern lights magic!',
      sakura: 'Cherry Blossoms',
      sakuraDesc: 'Petals falling gently!',
      galaxy: 'Galaxy Stream',
      galaxyDesc: 'Journey through the cosmos!'
    }
  },

  // Coins
  coins: {
    earned: 'Coins Earned',
    correctAnswers: 'Correct Answers',
    levelBonus: 'Level Bonus',
    perfectBonus: 'Perfect Score Bonus',
    noRetryBonus: 'No Retry Bonus',
    total: 'Total'
  },

  // Hidden Achievements
  achievements: {
    title: 'Hidden Achievements',
    hint: 'Unlock through special achievements!',
    firstPerfect: 'First Perfect',
    firstPerfectDesc: 'Get your first perfect score!',
    speedDemon: 'Speed Demon',
    speedDemonDesc: 'Perfect score in under 60 seconds!',
    sevenDay: 'Weekly Warrior',
    sevenDayDesc: '7 day practice streak!',
    goldCollector: 'Gold Collector',
    goldCollectorDesc: 'Earn 1000 coins total!',
    thousand: 'Question Master',
    thousandDesc: 'Answer 1000 questions!',
    allRounder: 'All-Rounder',
    allRounderDesc: 'Master all operations!',
    firstTry: 'First Try',
    firstTryDesc: 'Perfect score without any retries!',
    collector: 'Collector',
    collectorDesc: 'Collect 30 stickers!',
    rich: 'Little Tycoon',
    richDesc: 'Earn 5000 coins total!',
    mathMaster: 'Math Master',
    mathMasterDesc: 'Perfect all levels in all operations!'
  },

  // Accessibility
  accessibility: {
    title: 'Accessibility',
    fontSize: 'Font Size',
    reduceMotion: 'Reduce Motion',
    reduceMotionDesc: 'Disable animations',
    highContrast: 'High Contrast',
    highContrastDesc: 'Increase visual contrast',
    reset: 'Reset to Default'
  },

  // Audio Settings
  audio: {
    title: 'Audio Settings',
    soundEffects: 'Sound Effects',
    soundEffectsDesc: 'Toggle game sounds',
    hapticFeedback: 'Haptic Feedback',
    hapticFeedbackDesc: 'Vibration on key press'
  },

  // Dark Mode
  darkMode: {
    title: 'Display Settings',
    darkMode: 'Dark Mode',
    darkModeDesc: 'Switch to dark theme',
    auto: 'Follow System',
    autoDesc: 'Automatically follow system setting'
  },

  // Daily Challenge
  dailyChallenge: {
    title: 'Daily Challenge',
    completed: 'Completed today!',
    tapToPlay: 'Tap to play!',
    streak: 'streak',
    currentStreak: 'Current Streak',
    bestStreak: 'Best Streak',
    total: 'Total',
    rewards: 'Rewards Preview',
    streakBonus: 'streak bonus',
    perfectBonus: 'perfect bonus',
    start: 'Start Challenge'
  },

  // Wrong Questions
  wrongQuestions: {
    title: 'Review Mistakes',
    empty: 'Awesome! No mistakes',
    emptyDesc: 'Keep up the great work!',
    count: '{count} mistakes',
    practice: 'Practice Now',
    clear: 'Clear All',
    clearConfirm: 'Are you sure you want to clear all mistakes?',
    lastWrong: 'Last wrong',
    wrongCount: 'Wrong count'
  },

  // Custom Difficulty
  customDifficulty: {
    title: 'Parent Settings',
    setPin: 'Set Parent PIN',
    setPinDesc: 'Set a 4-digit PIN to access parent settings',
    enterPin: 'Enter Parent PIN',
    enterPinDesc: 'Enter your 4-digit PIN',
    wrongPin: 'Wrong PIN',
    invalidPin: 'Invalid PIN format',
    questionsPerRound: 'Questions per Round',
    showHints: 'Show Hints',
    showHintsDesc: 'Show correct answer after wrong response',
    allowRetry: 'Allow Retry',
    allowRetryDesc: 'Allow retry after wrong answer',
    customRanges: 'Custom Ranges',
    enabled: 'Enabled',
    min: 'Min',
    max: 'Max',
    resetSettings: 'Reset Settings',
    changePin: 'Change PIN'
  },

  // Report
  report: {
    title: 'Progress Report',
    generate: 'Generate PDF Report',
    generating: 'Generating...',
    success: 'Report generated!',
    error: 'Failed to generate report'
  },

  // Footer
  footer: {
    privacy: 'This is a pure frontend app. All your data is stored locally in your browser. We never upload any information.',
    aboutApp: 'About this app ✨',
    hideStory: 'Hide story',
    story: 'This app was born when I was doing math practice with my daughter and thought: "Wouldn\'t it be wonderful to have a fun, magical app to make learning math an adventure?" And so, the Math Kingdom was created! 🏰',
    callToAction: 'If you have ideas to make it better, please share them on GitHub! Wishing all little mathematicians great success! 🌟',
    feedback: 'Feedback & Suggestions'
  }
}
