import { ref } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useStatsStore } from '../stores/stats.js'
import { useStickersStore } from '../stores/stickers.js'
import { useProgressStore } from '../stores/progress.js'
import { useCoinsStore } from '../stores/coins.js'
import { useProfilesStore } from '../stores/profiles.js'

/**
 * Composable for managing user profiles and switching between them.
 * Handles saving/loading user data to localStorage and profile operations.
 */
export function useUserManagement() {
  const userStore = useUserStore()
  const statsStore = useStatsStore()
  const stickersStore = useStickersStore()
  const progressStore = useProgressStore()
  const coinsStore = useCoinsStore()
  const profilesStore = useProfilesStore()

  const showAddUserModal = ref(false)
  const showDeleteConfirm = ref(false)
  const userToDelete = ref(null)

  /**
   * Save all current user data to localStorage
   */
  function saveCurrentUserData() {
    const currentProfileId = profilesStore.currentProfileId
    if (!currentProfileId) return

    localStorage.setItem(`mathGame_${currentProfileId}_user`, JSON.stringify({
      gender: userStore.gender,
      username: userStore.username,
      createdAt: userStore.createdAt
    }))
    localStorage.setItem(`mathGame_${currentProfileId}_stats`, JSON.stringify(statsStore.$state))
    localStorage.setItem(`mathGame_${currentProfileId}_stickers`, JSON.stringify(stickersStore.$state))
    localStorage.setItem(`mathGame_${currentProfileId}_progress`, JSON.stringify(progressStore.$state))
    localStorage.setItem(`mathGame_${currentProfileId}_coins`, JSON.stringify(coinsStore.$state))
  }

  /**
   * Persist profiles to localStorage and reload page
   */
  function persistAndReload() {
    localStorage.setItem('mathGame_profiles', JSON.stringify({
      profiles: profilesStore.profiles,
      currentProfileId: profilesStore.currentProfileId
    }))
    window.location.reload()
  }

  /**
   * Add a new user profile
   */
  function handleAddUser({ name, gender }) {
    if (!gender) return

    saveCurrentUserData()
    const profileId = profilesStore.createProfile(name || null, gender)
    profilesStore.switchProfile(profileId)
    showAddUserModal.value = false
    persistAndReload()
  }

  /**
   * Switch to another user profile
   */
  function handleSwitchUser(profileId) {
    const profile = profilesStore.getProfile(profileId)
    if (!profile) return

    saveCurrentUserData()
    profilesStore.switchProfile(profileId)
    persistAndReload()
  }

  /**
   * Confirm deletion of a user profile
   */
  function confirmDeleteUser(profile) {
    userToDelete.value = profile
    showDeleteConfirm.value = true
  }

  /**
   * Delete the confirmed user profile
   */
  function handleDeleteUser() {
    if (!userToDelete.value) return

    profilesStore.deleteProfile(userToDelete.value.id)
    showDeleteConfirm.value = false
    userToDelete.value = null
  }

  /**
   * Logout current user
   */
  function handleLogout() {
    userStore.logout()
    statsStore.reset()
    stickersStore.reset()
    progressStore.reset()
    coinsStore.reset()
  }

  return {
    showAddUserModal,
    showDeleteConfirm,
    userToDelete,
    handleAddUser,
    handleSwitchUser,
    confirmDeleteUser,
    handleDeleteUser,
    handleLogout
  }
}
