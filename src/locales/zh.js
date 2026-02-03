// 简体中文翻译
export default {
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
      multiplication_5: '20-40 × 2-9',
      multiplication_6: '10-30 × 2-12',
      division_1: '能被 2-5 整除的数',
      division_2: '九九乘法表对应的除法',
      division_3: '整十数 ÷',
      division_4: '100以内 ÷',
      division_5: '商10-25',
      division_6: '商10-30',
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
    quitConfirm: '先休息一下',
    numerator: '分子',
    denominator: '分母',
    keyboardHint: '可使用键盘输入',
    fractionKeyboardHint: 'Tab或/切换分子分母',
    retriedBadge: '重试',
    go: '开始!'
  },

  // 贴纸展示
  stickerShowcase: {
    title: '我的收藏贴纸',
    desc: '选择最多5个贴纸展示',
    edit: '编辑',
    owned: '购买的贴纸',
    earned: '成就贴纸',
    empty: '完成关卡赚取贴纸，或在商店购买！',
    clear: '清空'
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
    loading: '加载中...',
    cancel: '取消',
    save: '保存'
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
      avatars: '头像',
      frames: '边框',
      backgrounds: '主题'
    },
    levelUnlockDesc: '使用金币提前解锁新关卡！',
    avatarsDesc: '换一个可爱的新头像！',
    framesDesc: '用漂亮的边框装饰你的头像！',
    backgroundsDesc: '改变数学王国的主题！',
    removeAvatar: '恢复默认头像',
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
      unicorns: '独角兽',
      special: '特别',
      ocean: '海洋',
      space: '太空',
      sweets: '甜点',
      animals: '动物',
      food: '美食',
      sports: '运动',
      nature: '自然',
      fantasy: '奇幻',
      celebration: '派对'
    },
    stickers: {
      // Unicorns
      unicorn: '独角兽',
      // Ocean
      dolphin: '海豚',
      whale: '鲸鱼',
      octopus: '章鱼',
      shark: '鲨鱼',
      tropicalFish: '热带鱼',
      shell: '贝壳',
      crab: '螃蟹',
      jellyfish: '水母',
      // Space
      rocketSpace: '火箭',
      ufo: '飞碟',
      satellite: '卫星',
      planet: '星球',
      meteor: '流星',
      astronaut: '宇航员',
      fullMoon: '满月',
      starSpace: '星星',
      // Sweets
      lollipop: '棒棒糖',
      chocolate: '巧克力',
      candySweet: '糖果',
      iceCreamSweet: '冰淇淋',
      cakeSweet: '蛋糕',
      cupcakeSweet: '纸杯蛋糕',
      donutSweet: '甜甜圈',
      cookieSweet: '曲奇',
      // Special
      rainbow: '彩虹',
      rocket: '火箭',
      diamond: '钻石',
      star: '星星',
      sparklingHeart: '闪亮爱心',
      sun: '太阳',
      moon: '月亮',
      butterfly: '蝴蝶',
      hibiscus: '木槿花',
      crown: '皇冠',
      crystal: '水晶球',
      sparkles: '闪耀',
      comet: '彗星',
      galaxy: '银河',
      // Animals
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
      koala: '考拉',
      tiger: '老虎',
      elephant: '大象',
      monkey: '猴子',
      dragon: '龙',
      phoenix: '凤凰',
      // Food
      pizza: '披萨',
      iceCream: '冰淇淋',
      cake: '生日蛋糕',
      cookie: '饼干',
      candy: '糖果',
      donut: '甜甜圈',
      burger: '汉堡',
      fries: '薯条',
      sushi: '寿司',
      watermelon: '西瓜',
      strawberry: '草莓',
      cupcake: '纸杯蛋糕',
      // Sports
      soccer: '足球',
      basketball: '篮球',
      tennis: '网球',
      baseball: '棒球',
      volleyball: '排球',
      trophy: '奖杯',
      medal: '金牌',
      skateboard: '滑板',
      // Nature
      snowflake: '雪花',
      lightning: '闪电',
      fire: '火焰',
      cloud: '云朵',
      tornado: '龙卷风',
      wave: '海浪',
      volcano: '火山',
      mountain: '山峰',
      tree: '大树',
      cactus: '仙人掌',
      // Fantasy
      fairy: '小精灵',
      wizard: '魔法师',
      mermaid: '美人鱼',
      genie: '神灯精灵',
      ghost: '幽灵',
      alien: '外星人',
      robot: '机器人',
      superhero: '超级英雄',
      castle: '城堡',
      magic: '魔法棒',
      // Celebration
      balloon: '气球',
      gift: '礼物',
      confetti: '彩带',
      party: '派对',
      fireworks: '烟花',
      sparkler: '烟火棒',
      ribbon: '蝴蝶结',
      clap: '鼓掌'
    },
    avatars: {
      princess: '小公主',
      prince: '小王子',
      redPanda: '小熊猫',
      pandaQueen: '熊猫女王'
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
      bunny: '可爱兔兔',
      bunnyDesc: '粉嫩兔兔的世界！',
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
      galaxyDesc: '穿越宇宙的旅程！',
      winter: '冬日雪景',
      winterDesc: '银装素裹的世界！',
      rainbow: '彩虹天空',
      rainbowDesc: '五彩缤纷的天空！',
      jungle: '热带丛林',
      jungleDesc: '探索神秘雨林！',
      castle: '童话城堡',
      castleDesc: '公主与王子的梦幻王国！',
      underwater: '深海探险',
      underwaterDesc: '探索神秘海底！',
      volcano: '火山地带',
      volcanoDesc: '热情似火的冒险！',
      meadow: '花田草地',
      meadowDesc: '阳光下的花海！',
      night: '星空夜晚',
      nightDesc: '宁静的夜空！',
      desert: '沙漠绿洲',
      desertDesc: '金色沙漠的冒险！',
      arctic: '北极冰原',
      arcticDesc: '冰雪奇缘的世界！',
      neon: '霓虹都市',
      neonDesc: '炫酷的霓虹世界！'
    },
    collections: {
      title: '收集系列',
      progress: '收集进度',
      complete: '已完成！',
      reward: '奖励',
      oceanCollection: '海洋探险家',
      spaceCollection: '太空先驱',
      sweetsCollection: '甜蜜达人',
      oceanMaster: '海洋大师徽章',
      spaceMaster: '太空大师徽章',
      sweetsMaster: '甜蜜大师徽章',
      collectAll: '集齐全部可获得奖励！'
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

  // 无障碍
  accessibility: {
    title: '设置',
    fontSize: '字体大小',
    reduceMotion: '减少动画',
    reduceMotionDesc: '禁用动画效果',
    highContrast: '高对比度',
    highContrastDesc: '增强视觉对比',
    reset: '恢复默认'
  },

  // 音效设置
  audio: {
    title: '音效设置',
    soundEffects: '音效',
    soundEffectsDesc: '游戏音效开关',
    hapticFeedback: '触感反馈',
    hapticFeedbackDesc: '按键振动反馈'
  },

  // 深色模式
  darkMode: {
    title: '显示设置',
    darkMode: '深色模式',
    darkModeDesc: '切换深色主题',
    auto: '跟随系统',
    autoDesc: '自动跟随系统设置'
  },

  // 每日挑战
  dailyChallenge: {
    title: '每日挑战',
    completed: '今日已完成！',
    tapToPlay: '点击开始挑战！',
    streak: '连续',
    currentStreak: '当前连续',
    bestStreak: '最佳连续',
    total: '总计',
    rewards: '奖励预览',
    streakBonus: '连续奖励',
    perfectBonus: '满分奖励',
    start: '开始挑战'
  },

  // 错题回顾
  wrongQuestions: {
    title: '错题回顾',
    empty: '太棒了！没有错题',
    emptyDesc: '继续保持，你做得很好！',
    allReviewed: '全部复习完了！',
    waitingDesc: '稍后再来继续练习吧。',
    waitingCount: '{count} 道题目等待复习',
    dueNow: '待复习',
    waiting: '等待中',
    count: '{count} 道错题',
    practice: '开始练习',
    clear: '清空错题',
    clearConfirm: '确定清空所有错题吗？',
    lastWrong: '上次答错',
    wrongCount: '错误次数'
  },

  // 自定义难度
  customDifficulty: {
    title: '高级',
    questionsPerRound: '每轮题目数',
    showHints: '显示提示',
    showHintsDesc: '答错时显示正确答案',
    allowRetry: '允许重试',
    allowRetryDesc: '答错后可以重新作答',
    customRanges: '自定义范围',
    enabled: '启用',
    min: '最小值',
    max: '最大值',
    resetSettings: '重置设置',
    // 防沉迷
    screenTime: '游戏时间限制',
    screenTimeDesc: '每日游戏时长限制',
    screenTimeEnabled: '启用限制',
    minutesPerDay: '每天分钟数',
    playedToday: '今日已玩',
    minutes: '分钟'
  },

  // 休息提醒
  restReminder: {
    title: '该休息啦！',
    message: '你今天已经玩了 {minutes} 分钟了，让眼睛休息一下吧！',
    playedTime: '今日游戏时间',
    ok: '好的，我去休息'
  },

  // 成绩报告
  report: {
    title: '成绩报告',
    generate: '生成PDF报告',
    generating: '正在生成...',
    success: '报告已生成！',
    error: '生成报告失败'
  },

  // 页脚
  footer: {
    privacy: '这是纯前端应用，所有数据保存在您的浏览器本地，不会上传任何信息。',
    aboutApp: '关于这个应用 ✨',
    hideStory: '收起故事',
    story: '这个应用诞生于陪女儿做数学练习的时光。我在想："如果有一个有趣的、充满魔法的应用，能让学数学变成一场冒险，那该多好啊！" 于是，数学王国就这样诞生了！🏰',
    callToAction: '如果你有让它变得更好的想法，欢迎在 GitHub 上告诉我！祝所有小数学家们学业进步！🌟',
    feedback: '反馈与建议'
  },

  // 分享
  share: {
    button: '分享成绩',
    joinMe: '快来和我一起玩 MathHero！',
    title: '我的 MathHero 成绩',
    generating: '生成中...',
    success: '图片已生成！',
    download: '保存图片',
    copied: '图片已保存！'
  }
}
