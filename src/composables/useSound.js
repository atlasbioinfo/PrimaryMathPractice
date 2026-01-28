import { computed } from 'vue'
import { useAudioStore } from '../stores/audio'

let audioContext = null

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

export function useSound() {
  const audioStore = useAudioStore()

  // Use computed to reactively check if sound is muted
  const isMuted = computed(() => !audioStore.soundEnabled)
  const isHapticEnabled = computed(() => audioStore.hapticEnabled)

  function playCorrectSound() {
    if (isMuted.value) return
    try {
      const ctx = getAudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      // Happy ascending notes
      oscillator.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
      oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1) // E5
      oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2) // G5

      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.4)
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  function playWrongSound() {
    if (isMuted.value) return
    try {
      const ctx = getAudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.setValueAtTime(200, ctx.currentTime)
      oscillator.frequency.setValueAtTime(150, ctx.currentTime + 0.1)

      oscillator.type = 'square'
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.3)
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  function playVictorySound() {
    if (isMuted.value) return
    try {
      const ctx = getAudioContext()
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6

      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.frequency.setValueAtTime(freq, ctx.currentTime)
        oscillator.type = 'sine'

        const startTime = ctx.currentTime + i * 0.15
        gainNode.gain.setValueAtTime(0, startTime)
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4)

        oscillator.start(startTime)
        oscillator.stop(startTime + 0.4)
      })
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  function playApplauseSound() {
    if (isMuted.value) return
    try {
      const ctx = getAudioContext()

      for (let i = 0; i < 20; i++) {
        const noise = ctx.createBufferSource()
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate)
        const data = buffer.getChannelData(0)

        for (let j = 0; j < buffer.length; j++) {
          data[j] = (Math.random() * 2 - 1) * 0.3
        }

        noise.buffer = buffer
        const gainNode = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        filter.type = 'bandpass'
        filter.frequency.value = 1000 + Math.random() * 2000

        noise.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(ctx.destination)

        const startTime = ctx.currentTime + i * 0.05 + Math.random() * 0.03
        gainNode.gain.setValueAtTime(0.15, startTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1)

        noise.start(startTime)
        noise.stop(startTime + 0.1)
      }
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  function playClickSound() {
    if (isMuted.value) return
    try {
      const ctx = getAudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.setValueAtTime(800, ctx.currentTime)
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.1)
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  // Keyboard key press sound - short, crisp tap
  function playKeySound() {
    if (isMuted.value) return

    // Trigger haptic feedback on supported devices
    triggerHaptic('light')

    try {
      const ctx = getAudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      // Short crisp pop sound
      oscillator.frequency.setValueAtTime(600, ctx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.03)
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.05)
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  // Delete key sound - slightly different tone
  function playDeleteSound() {
    if (isMuted.value) return

    triggerHaptic('light')

    try {
      const ctx = getAudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.setValueAtTime(300, ctx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05)
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.12, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.06)
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  // Confirm key sound - satisfying confirmation
  function playConfirmSound() {
    if (isMuted.value) return

    triggerHaptic('medium')

    try {
      const ctx = getAudioContext()
      const oscillator = ctx.createOscillator()
      const oscillator2 = ctx.createOscillator()
      const gainNode = ctx.createGain()
      const gainNode2 = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      oscillator2.connect(gainNode2)
      gainNode2.connect(ctx.destination)

      // Two-tone confirmation beep
      oscillator.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

      oscillator2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.08) // G5
      oscillator2.type = 'sine'
      gainNode2.gain.setValueAtTime(0, ctx.currentTime)
      gainNode2.gain.setValueAtTime(0.15, ctx.currentTime + 0.08)
      gainNode2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.1)
      oscillator2.start(ctx.currentTime + 0.08)
      oscillator2.stop(ctx.currentTime + 0.18)
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  // Haptic feedback helper
  function triggerHaptic(intensity = 'light') {
    if (!isHapticEnabled.value) return
    try {
      if ('vibrate' in navigator) {
        const duration = intensity === 'light' ? 10 : intensity === 'medium' ? 20 : 30
        navigator.vibrate(duration)
      }
    } catch (e) {
      // Vibration not supported
    }
  }

  function playStickerSound() {
    if (isMuted.value) return
    try {
      const ctx = getAudioContext()
      const notes = [659.25, 783.99, 987.77, 1318.51] // E5, G5, B5, E6

      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1)
        oscillator.type = 'sine'

        const startTime = ctx.currentTime + i * 0.1
        gainNode.gain.setValueAtTime(0.2, startTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)

        oscillator.start(startTime)
        oscillator.stop(startTime + 0.3)
      })
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  function playCoinSound() {
    if (isMuted.value) return
    try {
      const ctx = getAudioContext()
      // Metallic coin collision sound - multiple high frequency sine waves
      const frequencies = [1200, 1500, 1800, 2200]

      frequencies.forEach((freq, i) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        const startTime = ctx.currentTime + i * 0.02
        oscillator.frequency.setValueAtTime(freq, startTime)
        oscillator.frequency.exponentialRampToValueAtTime(freq * 0.8, startTime + 0.15)
        oscillator.type = 'sine'

        gainNode.gain.setValueAtTime(0.15, startTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2)

        oscillator.start(startTime)
        oscillator.stop(startTime + 0.2)
      })
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  function playPurchaseSound() {
    if (isMuted.value) return
    try {
      const ctx = getAudioContext()
      // Cash register / purchase confirmation sound
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51] // C5, E5, G5, C6, E6

      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        const startTime = ctx.currentTime + i * 0.08
        oscillator.frequency.setValueAtTime(freq, startTime)
        oscillator.type = 'sine'

        gainNode.gain.setValueAtTime(0.25, startTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25)

        oscillator.start(startTime)
        oscillator.stop(startTime + 0.25)
      })
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  function playUnlockSound() {
    if (isMuted.value) return
    try {
      const ctx = getAudioContext()
      // Magical unlock sound - ascending arpeggio with shimmer
      const notes = [392, 523.25, 659.25, 783.99, 1046.50] // G4, C5, E5, G5, C6

      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator()
        const oscillator2 = ctx.createOscillator()
        const gainNode = ctx.createGain()
        const gainNode2 = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)
        oscillator2.connect(gainNode2)
        gainNode2.connect(ctx.destination)

        const startTime = ctx.currentTime + i * 0.1
        oscillator.frequency.setValueAtTime(freq, startTime)
        oscillator.type = 'sine'

        // Add shimmer with slightly detuned second oscillator
        oscillator2.frequency.setValueAtTime(freq * 1.005, startTime)
        oscillator2.type = 'sine'

        gainNode.gain.setValueAtTime(0.2, startTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4)

        gainNode2.gain.setValueAtTime(0.1, startTime)
        gainNode2.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35)

        oscillator.start(startTime)
        oscillator.stop(startTime + 0.4)
        oscillator2.start(startTime)
        oscillator2.stop(startTime + 0.35)
      })
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  function toggleMute() {
    audioStore.toggleSound()
  }

  return {
    isMuted,
    isHapticEnabled,
    playCorrectSound,
    playWrongSound,
    playVictorySound,
    playApplauseSound,
    playClickSound,
    playKeySound,
    playDeleteSound,
    playConfirmSound,
    playStickerSound,
    playCoinSound,
    playPurchaseSound,
    playUnlockSound,
    triggerHaptic,
    toggleMute
  }
}
