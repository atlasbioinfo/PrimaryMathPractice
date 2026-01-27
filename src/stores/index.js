import { createPinia } from 'pinia'

const pinia = createPinia()

// Stores that should be persisted per-user
const userSpecificStores = ['user', 'progress', 'stats', 'stickers', 'coins']

// Stores that are global (not per-user)
const globalStores = ['locale', 'game']

// Get current profile ID from profiles store data
function getCurrentProfileId() {
  const profilesData = localStorage.getItem('mathGame_profiles')
  if (profilesData) {
    try {
      const data = JSON.parse(profilesData)
      return data.currentProfileId
    } catch (e) {
      return null
    }
  }
  return null
}

// Persist state to localStorage
pinia.use(({ store }) => {
  const storeId = store.$id

  // Profiles store has its own special persistence
  if (storeId === 'profiles') {
    // Load initial state
    const saved = localStorage.getItem('mathGame_profiles')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        store.$patch({
          profiles: data.profiles || [],
          currentProfileId: data.currentProfileId || null
        })
      } catch (e) {
        console.warn('Failed to load profiles:', e)
      }
    }

    // Save on changes
    store.$subscribe((mutation, state) => {
      localStorage.setItem('mathGame_profiles', JSON.stringify({
        profiles: state.profiles,
        currentProfileId: state.currentProfileId
      }))
    })
    return
  }

  // For user-specific stores, use profile ID in key
  if (userSpecificStores.includes(storeId)) {
    const profileId = getCurrentProfileId()
    const key = profileId ? `mathGame_${profileId}_${storeId}` : `mathGame_${storeId}`

    // Load initial state
    const savedState = localStorage.getItem(key)
    if (savedState) {
      try {
        store.$patch(JSON.parse(savedState))
      } catch (e) {
        console.warn(`Failed to load state for ${storeId}:`, e)
      }
    }

    // Save on changes
    store.$subscribe((mutation, state) => {
      const currentProfileId = getCurrentProfileId()
      const saveKey = currentProfileId ? `mathGame_${currentProfileId}_${storeId}` : `mathGame_${storeId}`
      localStorage.setItem(saveKey, JSON.stringify(state))
    })
    return
  }

  // For global stores, use simple key
  const key = `mathGame_${storeId}`

  const savedState = localStorage.getItem(key)
  if (savedState) {
    try {
      store.$patch(JSON.parse(savedState))
    } catch (e) {
      console.warn(`Failed to load state for ${storeId}:`, e)
    }
  }

  store.$subscribe((mutation, state) => {
    localStorage.setItem(key, JSON.stringify(state))
  })
})

// Helper function to reload user-specific stores when switching profiles
export function reloadUserStores(profileId) {
  userSpecificStores.forEach(storeId => {
    const key = profileId ? `mathGame_${profileId}_${storeId}` : `mathGame_${storeId}`
    const savedState = localStorage.getItem(key)

    // Get the store instance
    const store = pinia.state.value[storeId]
    if (store) {
      // Reset to default state first
      const storeInstance = pinia._s.get(storeId)
      if (storeInstance && storeInstance.reset) {
        storeInstance.reset()
      }

      // Then load saved state if exists
      if (savedState) {
        try {
          storeInstance.$patch(JSON.parse(savedState))
        } catch (e) {
          console.warn(`Failed to reload state for ${storeId}:`, e)
        }
      }
    }
  })
}

export default pinia
