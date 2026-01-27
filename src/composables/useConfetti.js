import confetti from 'canvas-confetti'

export function useConfetti() {
  // Celebration for perfect score - dual side burst
  function celebratePerfect() {
    const duration = 3000
    const colors = ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD']

    // Left side burst
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors
    })

    // Right side burst
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors
    })

    // Center burst after small delay
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors
      })
    }, 300)
  }

  // Coin rain effect
  function coinRain() {
    const duration = 2000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 90,
        spread: 60,
        origin: { x: Math.random(), y: -0.1 },
        colors: ['#FFD700', '#FFA500', '#FFDF00'],
        shapes: ['circle'],
        gravity: 1.2,
        scalar: 1.2,
        drift: 0
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }

  // Stars burst for excellent performance
  function starBurst() {
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FFD700', '#FFA500', '#FFFFFF', '#FFFACD'],
      shapes: ['circle', 'square'],
      scalar: 1.5
    })
  }

  // Rainbow effect for level completion
  function rainbowCelebration() {
    const colors = [
      '#FF0000', // Red
      '#FF7F00', // Orange
      '#FFFF00', // Yellow
      '#00FF00', // Green
      '#0000FF', // Blue
      '#4B0082', // Indigo
      '#9400D3'  // Violet
    ]

    colors.forEach((color, i) => {
      setTimeout(() => {
        confetti({
          particleCount: 30,
          angle: 90 + (i - 3) * 15,
          spread: 30,
          origin: { x: 0.5, y: 0.7 },
          colors: [color]
        })
      }, i * 100)
    })
  }

  // Purchase celebration
  function purchaseCelebration() {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98'],
      shapes: ['circle', 'square']
    })
  }

  // Unlock celebration - magical sparkle effect
  function unlockCelebration() {
    const count = 50
    const defaults = {
      origin: { y: 0.5 },
      spread: 360,
      ticks: 100,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 20,
      shapes: ['circle'],
      colors: ['#FFD700', '#FFFFFF', '#87CEEB', '#DDA0DD']
    }

    confetti({
      ...defaults,
      particleCount: count,
      scalar: 1.2,
      origin: { x: 0.5, y: 0.5 }
    })

    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: count / 2,
        scalar: 0.75
      })
    }, 150)
  }

  // Sticker earned celebration
  function stickerCelebration() {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FF69B4', '#FFB6C1', '#DDA0DD', '#FFD700'],
      scalar: 1.3
    })
  }

  // Achievement unlocked - grand celebration
  function achievementCelebration() {
    // Initial burst
    celebratePerfect()

    // Followed by coin rain
    setTimeout(() => {
      coinRain()
    }, 500)
  }

  return {
    celebratePerfect,
    coinRain,
    starBurst,
    rainbowCelebration,
    purchaseCelebration,
    unlockCelebration,
    stickerCelebration,
    achievementCelebration
  }
}
