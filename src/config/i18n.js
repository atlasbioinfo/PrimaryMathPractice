// Internationalization configuration
// Default: English, with Chinese support

export const messages = {
  en: {
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
      quitConfirm: 'Take a Break'
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

    // Footer
    footer: {
      privacy: 'This is a pure frontend app. All your data is stored locally in your browser. We never upload any information.',
      aboutApp: 'About this app ✨',
      hideStory: 'Hide story',
      story: 'This app was born when I was doing math practice with my daughter and thought: "Wouldn\'t it be wonderful to have a fun, magical app to make learning math an adventure?" And so, the Math Kingdom was created! 🏰',
      callToAction: 'If you have ideas to make it better, please share them on GitHub! Wishing all little mathematicians great success! 🌟',
      feedback: 'Feedback & Suggestions'
    }
  },

  zh: {
    // 性别选择
    welcome: {
      title: '欢迎来到数学王国！',
      subtitle: '选择你的角色，开始数学冒险之旅',
      princess: '数学小公主',
      princessDesc: '粉色的梦幻世界',
      prince: '数学小王子',
      princeDesc: '蓝色的冒险天地',
      defaultPrince: '小王子',
      defaultPrincess: '小公主'
    },

    // 主页
    home: {
      princessTitle: '数学小公主',
      princeTitle: '数学小王子',
      subtitle: '通往数学王国的冒险之路',
      streakDays: '连续天数',
      totalQuestions: '总题数',
      accuracy: '正确率',
      stickers: '贴纸',
      stickerWall: '我的贴纸墙',
      viewAll: '查看全部 →',
      startGame: '开始练习',
      stats: '统计数据',
      stickerWallBtn: '贴纸墙',
      reset: '重置数据',
      noStickers: '完成关卡获得贴纸！',
      confirmReset: '确认重置',
      resetWarning: '确定要重置所有数据吗？这将清除所有进度、贴纸和统计数据。',
      confirm: '确认重置',
      cancel: '取消'
    },

    // 运算选择
    operations: {
      title: '选择运算类型',
      addition: '加法',
      subtraction: '减法',
      multiplication: '乘法',
      division: '除法',
      fraction: '分数',
      levelsCompleted: '{count}/6 关卡完成'
    },

    // 关卡选择
    levels: {
      title: '选择关卡',
      level: '关卡',
      best: '最佳',
      levelNames: {
        1: '数字宝宝',
        2: '小小探险家',
        3: '数字精灵',
        4: '百位勇士',
        5: '计算大师',
        6: ''
      },
      princeTitle: {
        addition: '加法王子',
        subtraction: '减法王子',
        multiplication: '乘法王子',
        division: '除法王子',
        fraction: '分数王子'
      },
      princessTitle: {
        addition: '加法公主',
        subtraction: '减法公主',
        multiplication: '乘法公主',
        division: '除法公主',
        fraction: '分数公主'
      },
      levelDescriptions: {
        addition_1: '1-10 + 1-10',
        addition_2: '10-50 + 1-20',
        addition_3: '10-99 + 10-99',
        addition_4: '100-500 + 整十数',
        addition_5: '100-999 + 个位非0',
        addition_6: '混合大数挑战',
        subtraction_1: '10-20 − 1-9',
        subtraction_2: '20-50 − 1-19',
        subtraction_3: '50-99 − 10-49',
        subtraction_4: '100-200 − 整十数',
        subtraction_5: '200-500 − 个位非0',
        subtraction_6: '混合大数挑战',
        multiplication_1: '1-5 × 1-5',
        multiplication_2: '1-9 × 1-9 (九九乘法表)',
        multiplication_3: '10-20 × 2-9',
        multiplication_4: '11-19 × 11-19',
        multiplication_5: '20-50 × 2-9',
        multiplication_6: '混合挑战',
        division_1: '能被 2-5 整除的数',
        division_2: '九九乘法表对应的除法',
        division_3: '整十数 ÷',
        division_4: '100以内 ÷',
        division_5: '较大数 ÷',
        division_6: '混合挑战',
        fraction_1: '同分母加法',
        fraction_2: '同分母减法',
        fraction_3: '简单异分母 (2,4 或 3,6)',
        fraction_4: '分数 × 整数',
        fraction_5: '分数 ÷ 整数',
        fraction_6: '混合分数运算'
      }
    },

    // 游戏界面
    game: {
      question: '第 {n} 题',
      yourAnswer: '你的答案',
      submit: '提交',
      correct: '正确',
      wrong: '错误',
      correctAnswer: '正确答案是',
      retry: '再试一次',
      next: '下一题 →',
      correctFeedback: '✓ 正确!',
      wrongFeedback: '✗ 错误',
      quit: '退出',
      quitTitle: '休息一下？',
      quitMessage: '本轮的进度不会被保存哦。要继续练习吗？',
      continueGame: '继续加油！',
      quitConfirm: '先休息一下'
    },

    // 结果页面
    result: {
      correct: '正确',
      wrong: '错误',
      accuracy: '正确率',
      time: '用时',
      retriedInfo: '其中 {count} 题是重试后答对的',
      unlockMessage: '🎉 太棒了！下一关已解锁！',
      newStickers: '获得新贴纸！',
      nextLevelIs: '下一关是',
      home: '🏠 主页',
      tryAgain: '🔄 再试一次',
      nextLevel: '➡️ 下一关',
      showDetails: '查看答题详情',
      hideDetails: '隐藏答题详情',
      encouragement: {
        perfect: [
          '太棒了！你是数学小天才！',
          '完美！你简直是数学神童！',
          '哇塞！全对！你太厉害了！',
          '满分！你是最闪亮的星星！',
          '无敌了！数学王国为你骄傲！'
        ],
        excellent: [
          '真厉害！继续加油，下一关等着你！',
          '太棒了！你离满分只差一点点！',
          '好厉害！你的进步超级大！',
          '真棒！数学小达人就是你！',
          '超级棒！再接再厉！'
        ],
        good: [
          '做得好！再接再厉！',
          '不错哦！继续努力！',
          '很棒！多练习会更好！',
          '加油！你可以做到更好！',
          '真不错！坚持就是胜利！'
        ],
        tryAgain: [
          '别灰心！多练习就会越来越好！',
          '加油！相信自己可以做到！',
          '没关系！失败是成功之母！',
          '再试一次！你一定可以的！',
          '不要放弃！每次练习都是进步！'
        ]
      },
      nextLevelHint: {
        1: '准备好开始新的冒险了吗？',
        2: '让我们挑战更难的题目吧！',
        3: '大数字来啦，你准备好了吗？',
        4: '即将成为计算大师！',
        5: '最后的挑战，加冕时刻！'
      }
    },

    // 贴纸墙
    stickerWall: {
      title: '我的贴纸墙',
      collected: '已收集 {earned} / {total} 贴纸',
      bronze: '铜牌',
      silver: '银牌',
      gold: '金牌',
      crown: '王冠',
      notEarned: '🔒 尚未获得',
      earnedDate: '获得日期',
      condition: {
        bronze: '完成 Level 1-2',
        silver: '完成 Level 3-4',
        gold: '完成 Level 5-6',
        crown: '全部通关 + 正确率 > 90%'
      }
    },

    // 统计面板
    stats: {
      title: '统计数据',
      totalQuestions: '总做题数',
      overallAccuracy: '总正确率',
      streakDays: '连续天数',
      operationStats: '各运算统计',
      questions: '做题数',
      accuracy: '正确率',
      sessions: '练习次数',
      bestTime: '最佳时间',
      progressOverview: '关卡进度'
    },

    // 通用
    common: {
      back: '返回',
      close: '关闭',
      loading: '加载中...'
    },

    // 用户菜单
    userMenu: {
      welcome: '欢迎',
      logout: '登出',
      switchUser: '切换用户',
      language: '语言',
      addUser: '添加用户',
      deleteUser: '删除用户',
      confirmDelete: '删除用户？',
      deleteWarning: '确定要删除 {name} 吗？该用户的所有进度和数据将被永久删除。',
      userName: '昵称（可选）',
      namePlaceholder: '输入昵称...',
      selectGender: '选择角色',
      confirm: '创建用户',
      cancel: '取消',
      delete: '删除'
    },

    // 登录
    login: {
      enterName: '你叫什么名字？',
      namePlaceholder: '请输入你的名字...',
      selectGender: '我是...',
      boy: '男生',
      girl: '女生',
      start: '开始冒险！',
      nameRequired: '请输入你的名字'
    },

    // 商店
    shop: {
      title: '商店',
      tabs: {
        levels: '解锁',
        stickers: '贴纸',
        frames: '边框',
        backgrounds: '主题'
      },
      levelUnlockDesc: '使用金币提前解锁新关卡！',
      framesDesc: '用漂亮的边框装饰你的头像！',
      backgroundsDesc: '改变数学王国的主题！',
      allLevelsUnlocked: '所有关卡已解锁！',
      unlocked: '已解锁',
      owned: '已拥有',
      equipped: '已装备',
      tapToEquip: '点击装备',
      removeFrame: '移除边框',
      removeBackground: '重置主题',
      confirmPurchase: '确认购买',
      balanceAfter: '购买后余额',
      buy: '购买',
      purchaseSuccess: '购买成功！',
      purchaseFailed: '购买失败',
      transactionHistory: '金币记录',
      totalEarned: '累计获得',
      totalSpent: '累计消费',
      noTransactions: '暂无交易记录',
      transactionReasons: {
        purchase: '商店购买',
        levelUnlock: '关卡解锁',
        levelComplete: '完成关卡'
      },
      stickerSeries: {
        special: '特殊系列',
        animals: '动物朋友',
        food: '美味食物',
        sports: '运动时光'
      },
      stickers: {
        rainbow: '彩虹',
        unicorn: '独角兽',
        rocket: '火箭',
        diamond: '钻石',
        star: '星星',
        sparklingHeart: '闪亮爱心',
        sun: '太阳',
        moon: '月亮',
        butterfly: '蝴蝶',
        hibiscus: '木槿花',
        panda: '熊猫',
        cat: '小猫',
        dog: '小狗',
        rabbit: '兔子',
        bear: '小熊',
        fox: '狐狸',
        lion: '狮子',
        penguin: '企鹅',
        owl: '猫头鹰',
        dolphin: '海豚',
        pizza: '披萨',
        iceCream: '冰淇淋',
        cake: '生日蛋糕',
        cookie: '饼干',
        candy: '糖果',
        soccer: '足球',
        basketball: '篮球',
        tennis: '网球'
      },
      frames: {
        gold: '金色边框',
        rainbow: '彩虹边框',
        sparkle: '闪耀边框',
        diamond: '钻石边框',
        flower: '花朵边框',
        star: '星星边框',
        heart: '爱心边框',
        crown: '皇冠边框'
      },
      backgrounds: {
        space: '太空冒险',
        spaceDesc: '探索星辰大海！',
        ocean: '海底世界',
        oceanDesc: '潜入深蓝海洋！',
        forest: '魔法森林',
        forestDesc: '进入魔法树林！',
        candy: '糖果乐园',
        candyDesc: '甜蜜的天堂！',
        sunset: '夕阳余晖',
        sunsetDesc: '美丽的黄昏时光！',
        aurora: '极光之夜',
        auroraDesc: '北极光的魔法！',
        sakura: '樱花飘落',
        sakuraDesc: '花瓣轻轻飘落！',
        galaxy: '银河星系',
        galaxyDesc: '穿越宇宙的旅程！'
      }
    },

    // 金币
    coins: {
      earned: '获得金币',
      correctAnswers: '答对题目',
      levelBonus: '通关奖励',
      perfectBonus: '满分奖励',
      noRetryBonus: '一次过关奖励',
      total: '总计'
    },

    // 隐藏成就
    achievements: {
      title: '隐藏成就',
      hint: '完成特殊挑战解锁！',
      firstPerfect: '首次满分',
      firstPerfectDesc: '获得第一个满分！',
      speedDemon: '闪电侠',
      speedDemonDesc: '60秒内满分通关！',
      sevenDay: '七日挑战',
      sevenDayDesc: '连续7天练习！',
      goldCollector: '金牌收藏家',
      goldCollectorDesc: '累计获得1000金币！',
      thousand: '千题达人',
      thousandDesc: '累计答题1000道！',
      allRounder: '全能数学家',
      allRounderDesc: '精通所有运算类型！',
      firstTry: '一次过关',
      firstTryDesc: '满分且没有重试！',
      collector: '收藏家',
      collectorDesc: '收集30个贴纸！',
      rich: '小富翁',
      richDesc: '累计获得5000金币！',
      mathMaster: '数学大师',
      mathMasterDesc: '所有运算所有关卡满分！'
    },

    // 页脚
    footer: {
      privacy: '这是纯前端应用，所有数据保存在您的浏览器本地，不会上传任何信息。',
      aboutApp: '关于这个应用 ✨',
      hideStory: '收起故事',
      story: '这个应用诞生于陪女儿做数学练习的时光。我在想："如果有一个有趣的、充满魔法的应用，能让学数学变成一场冒险，那该多好啊！" 于是，数学王国就这样诞生了！🏰',
      callToAction: '如果你有让它变得更好的想法，欢迎在 GitHub 上告诉我！祝所有小数学家们学业进步！🌟',
      feedback: '反馈与建议'
    }
  }
}

export const defaultLocale = 'en'
export const supportedLocales = ['en', 'zh']

export function getLocaleDisplayName(locale) {
  const names = {
    en: 'English',
    zh: '中文'
  }
  return names[locale] || locale
}
