import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { messages, defaultLocale, supportedLocales } from '../config/i18n'

export const useLocaleStore = defineStore('locale', () => {
  const currentLocale = ref(defaultLocale)

  const t = computed(() => messages[currentLocale.value] || messages[defaultLocale])

  function setLocale(locale) {
    if (supportedLocales.includes(locale)) {
      currentLocale.value = locale
    }
  }

  function toggleLocale() {
    const currentIndex = supportedLocales.indexOf(currentLocale.value)
    const nextIndex = (currentIndex + 1) % supportedLocales.length
    currentLocale.value = supportedLocales[nextIndex]
  }

  // Helper function to get nested translation with interpolation
  function translate(path, params = {}) {
    const keys = path.split('.')
    let result = t.value

    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key]
      } else {
        return path // Return path if translation not found
      }
    }

    // Handle interpolation like {count}, {n}, etc.
    if (typeof result === 'string') {
      return result.replace(/\{(\w+)\}/g, (match, key) => {
        return params[key] !== undefined ? params[key] : match
      })
    }

    return result
  }

  // Get random message from array
  function getRandomMessage(path) {
    const messages = translate(path)
    if (Array.isArray(messages)) {
      return messages[Math.floor(Math.random() * messages.length)]
    }
    return messages
  }

  return {
    currentLocale,
    t,
    setLocale,
    toggleLocale,
    translate,
    getRandomMessage,
    supportedLocales
  }
})
