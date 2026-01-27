// Encouragement messages and animations based on performance

export const encouragements = {
  perfect: {
    score: 10,
    animation: 'fireworks',
    messages: [
      '太棒了！你是数学小天才！',
      '完美！你简直是数学神童！',
      '哇塞！全对！你太厉害了！',
      '满分！你是最闪亮的星星！',
      '无敌了！数学王国为你骄傲！'
    ],
    emoji: '🎆',
    sound: 'applause'
  },
  excellent: {
    minScore: 8,
    maxScore: 9,
    animation: 'stars',
    messages: [
      '真厉害！继续加油，下一关等着你！',
      '太棒了！你离满分只差一点点！',
      '好厉害！你的进步超级大！',
      '真棒！数学小达人就是你！',
      '超级棒！再接再厉！'
    ],
    emoji: '⭐',
    sound: 'victory'
  },
  good: {
    minScore: 7,
    maxScore: 7,
    animation: 'rainbow',
    messages: [
      '做得好！再接再厉！',
      '不错哦！继续努力！',
      '很棒！多练习会更好！',
      '加油！你可以做到更好！',
      '真不错！坚持就是胜利！'
    ],
    emoji: '🌈',
    sound: 'success'
  },
  tryAgain: {
    minScore: 0,
    maxScore: 6,
    animation: 'hug',
    messages: [
      '别灰心！多练习就会越来越好！',
      '加油！相信自己可以做到！',
      '没关系！失败是成功之母！',
      '再试一次！你一定可以的！',
      '不要放弃！每次练习都是进步！'
    ],
    emoji: '🤗',
    sound: 'encourage'
  }
}

export function getEncouragement(score) {
  if (score === 10) return encouragements.perfect
  if (score >= 8) return encouragements.excellent
  if (score === 7) return encouragements.good
  return encouragements.tryAgain
}

export function getRandomMessage(encouragement) {
  const messages = encouragement.messages
  return messages[Math.floor(Math.random() * messages.length)]
}

export const nextLevelPreview = {
  1: { name: '小小探险家', icon: '🎒', hint: '准备好开始新的冒险了吗？' },
  2: { name: '数字精灵', icon: '🧚', hint: '让我们挑战更难的题目吧！' },
  3: { name: '百位勇士', icon: '⚔️', hint: '大数字来啦，你准备好了吗？' },
  4: { name: '计算大师', icon: '🎓', hint: '即将成为计算大师！' },
  5: { name: '王子/公主', icon: '👑', hint: '最后的挑战，加冕时刻！' },
  6: null // Already at max level
}
