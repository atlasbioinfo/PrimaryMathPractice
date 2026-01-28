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
    quitConfirm: '先休息一下',
    numerator: '分子',
    denominator: '分母',
    keyboardHint: '可使用键盘输入',
    fractionKeyboardHint: 'Tab或/切换分子分母',
    retriedBadge: '重试'
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
