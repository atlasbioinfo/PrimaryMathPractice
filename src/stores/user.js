import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const gender = ref(null) // 'princess' | 'prince' | null
  const username = ref(null) // User's name
  const createdAt = ref(null)

  const baseUrl = import.meta.env.BASE_URL

  const theme = computed(() => {
    if (gender.value === 'prince') {
      return {
        name: 'prince',
        primary: '#4A90D9',
        secondary: '#87CEEB',
        background: '#E6F3FF',
        light: '#F0F8FF',
        accent: '#1E90FF',
        mascot: '👦',
        avatar: `${baseUrl}math_prince.png`,
        title: 'Math Prince',
        decorations: ['⭐', '🚀', '🛡️', '⚡', '🌟', '🎯', '🏆', '💎', '🔥', '🌙']
      }
    }
    return {
      name: 'princess',
      primary: '#FF69B4',
      secondary: '#FFB6C1',
      background: '#FFF0F5',
      light: '#FFF5F8',
      accent: '#FF1493',
      mascot: '👧',
      avatar: `${baseUrl}math_princess.png`,
      title: 'Math Princess',
      decorations: ['🌸', '🌺', '🦋', '🌈', '💖', '🎀', '🍬', '✨', '💐', '🌷']
    }
  })

  const isNewUser = computed(() => gender.value === null)

  const displayName = computed(() => username.value || (gender.value === 'prince' ? 'Little Prince' : 'Little Princess'))

  function setUser(name, g) {
    username.value = name
    gender.value = g
    if (!createdAt.value) {
      createdAt.value = new Date().toISOString()
    }
  }

  function setGender(g) {
    gender.value = g
    if (!createdAt.value) {
      createdAt.value = new Date().toISOString()
    }
  }

  function logout() {
    gender.value = null
    username.value = null
  }

  function reset() {
    gender.value = null
    username.value = null
    createdAt.value = null
  }

  return {
    gender,
    username,
    createdAt,
    theme,
    isNewUser,
    displayName,
    setUser,
    setGender,
    logout,
    reset
  }
})
