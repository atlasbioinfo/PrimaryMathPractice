import { computed, watch } from 'vue'
import { useUserStore } from '../stores/user'

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

  // Apply CSS variables to document
  function applyTheme() {
    const vars = cssVariables.value
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }

  // Watch for theme changes
  watch(() => userStore.theme, () => {
    applyTheme()
  }, { immediate: true })

  return {
    themeOverrides,
    cssVariables,
    applyTheme
  }
}
