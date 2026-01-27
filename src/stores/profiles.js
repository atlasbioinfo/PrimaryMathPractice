import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// This store manages multiple user profiles
// It's persisted separately and doesn't depend on user-specific keys
export const useProfilesStore = defineStore('profiles', () => {
  const profiles = ref([])
  const currentProfileId = ref(null)

  const currentProfile = computed(() => {
    if (!currentProfileId.value) return null
    return profiles.value.find(p => p.id === currentProfileId.value)
  })

  const hasProfiles = computed(() => profiles.value.length > 0)

  const sortedProfiles = computed(() => {
    return [...profiles.value].sort((a, b) => {
      // Current user first
      if (a.id === currentProfileId.value) return -1
      if (b.id === currentProfileId.value) return 1
      // Then by last used
      return new Date(b.lastUsedAt || 0) - new Date(a.lastUsedAt || 0)
    })
  })

  function generateId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  function createProfile(name, gender) {
    const id = generateId()
    const profile = {
      id,
      name,
      gender,
      createdAt: new Date().toISOString(),
      lastUsedAt: new Date().toISOString()
    }
    profiles.value.push(profile)
    return id
  }

  function updateProfile(id, updates) {
    const profile = profiles.value.find(p => p.id === id)
    if (profile) {
      Object.assign(profile, updates)
      return true
    }
    return false
  }

  function deleteProfile(id) {
    const index = profiles.value.findIndex(p => p.id === id)
    if (index === -1) return false

    // Remove profile
    profiles.value.splice(index, 1)

    // Clear localStorage data for this profile
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(`mathGame_${id}_`)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key))

    // If deleted current profile, switch to another or null
    if (currentProfileId.value === id) {
      currentProfileId.value = profiles.value.length > 0 ? profiles.value[0].id : null
    }

    return true
  }

  function switchProfile(id) {
    const profile = profiles.value.find(p => p.id === id)
    if (!profile) return false

    currentProfileId.value = id
    profile.lastUsedAt = new Date().toISOString()
    return true
  }

  function getProfile(id) {
    return profiles.value.find(p => p.id === id)
  }

  // Initialize: load from localStorage
  function init() {
    const saved = localStorage.getItem('mathGame_profiles')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        profiles.value = data.profiles || []
        currentProfileId.value = data.currentProfileId || null
      } catch (e) {
        console.warn('Failed to load profiles:', e)
      }
    }
  }

  // Save to localStorage
  function save() {
    localStorage.setItem('mathGame_profiles', JSON.stringify({
      profiles: profiles.value,
      currentProfileId: currentProfileId.value
    }))
  }

  // Watch for changes and save
  function setupPersistence() {
    // Already handled by Pinia plugin, but we need special handling
  }

  return {
    profiles,
    currentProfileId,
    currentProfile,
    hasProfiles,
    sortedProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
    switchProfile,
    getProfile,
    init,
    save
  }
})
