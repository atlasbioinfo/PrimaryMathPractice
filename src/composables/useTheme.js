import { computed, watch, ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'

// Dark mode state - stored outside composable for persistence
const darkMode = ref(false)
const autoMode = ref(true) // Follow system preference by default

export function useTheme() {
  const userStore = useUserStore()

  const themeOverrides = computed(() => {
    const theme = userStore.theme
    return {
      common: {
        primaryColor: theme.primary,
        primaryColorHover: theme.secondary,
        primaryColorPressed: theme.accent,
        borderRadius: '12px'
      },
      Button: {
        fontSizeLarge: '18px',
        heightLarge: '48px',
        borderRadiusLarge: '24px'
      },
      Card: {
        borderRadius: '16px'
      },
      Progress: {
        fillColor: theme.primary
      }
    }
  })

  const cssVariables = computed(() => {
    const theme = userStore.theme
    return {
      '--primary-color': theme.primary,
      '--secondary-color': theme.secondary,
      '--background-color': theme.background,
      '--light-color': theme.light,
      '--accent-color': theme.accent
    }
  })

  // Is dark mode currently active
  const isDarkMode = computed(() => darkMode.value)
  const isAutoMode = computed(() => autoMode.value)

  // Apply CSS variables to document
  function applyTheme() {
    const vars = cssVariables.value
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }

  // Apply dark mode
  function applyDarkMode() {
    if (darkMode.value) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
    saveDarkModePreference()
  }

  // Toggle dark mode
  function toggleDarkMode() {
    autoMode.value = false
    darkMode.value = !darkMode.value
    applyDarkMode()
  }

  // Set dark mode explicitly
  function setDarkMode(enabled) {
    autoMode.value = false
    darkMode.value = enabled
    applyDarkMode()
  }

  // Toggle auto mode (follow system)
  function toggleAutoMode() {
    autoMode.value = !autoMode.value
    if (autoMode.value) {
      // Apply system preference
      darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyDarkMode()
    }
    saveDarkModePreference()
  }

  // Set auto mode explicitly
  function setAutoMode(enabled) {
    autoMode.value = enabled
    if (enabled) {
      darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyDarkMode()
    }
    saveDarkModePreference()
  }

  // Save preference to localStorage
  function saveDarkModePreference() {
    try {
      localStorage.setItem('mathGame_darkMode', JSON.stringify({
        darkMode: darkMode.value,
        autoMode: autoMode.value
      }))
    } catch (e) {
      console.warn('Failed to save dark mode preference:', e)
    }
  }

  // Load preference from localStorage
  function loadDarkModePreference() {
    try {
      const saved = localStorage.getItem('mathGame_darkMode')
      if (saved) {
        const data = JSON.parse(saved)
        autoMode.value = data.autoMode ?? true
        if (autoMode.value) {
          darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        } else {
          darkMode.value = data.darkMode ?? false
        }
      } else {
        // Default: follow system preference
        autoMode.value = true
        darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
    } catch (e) {
      console.warn('Failed to load dark mode preference:', e)
    }
  }

  // Listen for system preference changes
  function setupSystemPreferenceListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      if (autoMode.value) {
        darkMode.value = e.matches
        applyDarkMode()
      }
    }
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler)
    }
  }

  // Initialize dark mode
  function initDarkMode() {
    loadDarkModePreference()
    applyDarkMode()
    setupSystemPreferenceListener()
  }

  // Watch for theme changes
  watch(() => userStore.theme, () => {
    applyTheme()
  }, { immediate: true })

  return {
    themeOverrides,
    cssVariables,
    isDarkMode,
    isAutoMode,
    applyTheme,
    toggleDarkMode,
    setDarkMode,
    toggleAutoMode,
    setAutoMode,
    initDarkMode
  }
}
