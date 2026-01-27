<template>
  <div class="user-menu">
    <!-- Language Selector -->
    <div class="menu-item language-selector" @click="showLanguageDropdown = !showLanguageDropdown">
      <span class="menu-icon">🌐</span>
      <span class="menu-text">{{ currentLocaleName }}</span>
      <span class="dropdown-arrow">{{ showLanguageDropdown ? '▲' : '▼' }}</span>

      <div v-if="showLanguageDropdown" class="dropdown cute-dropdown">
        <div
          v-for="locale in localeStore.supportedLocales"
          :key="locale"
          class="dropdown-item"
          :class="{ active: locale === localeStore.currentLocale }"
          @click.stop="selectLocale(locale)"
        >
          <span class="check-mark">{{ locale === localeStore.currentLocale ? '✓' : '' }}</span>
          {{ getLocaleName(locale) }}
        </div>
      </div>
    </div>

    <!-- User Profile (when logged in) -->
    <div v-if="!userStore.isNewUser" class="menu-item user-profile" @click="showUserDropdown = !showUserDropdown">
      <img :src="userStore.theme.avatar" :alt="userStore.displayName" class="user-avatar" />
      <span class="user-name">{{ userStore.displayName }}</span>
      <span class="dropdown-arrow">{{ showUserDropdown ? '▲' : '▼' }}</span>

      <div v-if="showUserDropdown" class="dropdown cute-dropdown user-dropdown">
        <!-- Current User Header -->
        <div class="dropdown-header">
          <img :src="userStore.theme.avatar" class="dropdown-avatar" />
          <div class="dropdown-user-info">
            <span class="dropdown-user-name">{{ userStore.displayName }}</span>
            <span class="dropdown-user-role">{{ userStore.gender === 'prince' ? t.welcome.prince : t.welcome.princess }}</span>
          </div>
        </div>

        <!-- Other Users Section -->
        <div v-if="otherProfiles.length > 0" class="other-users-section">
          <div class="section-label">{{ t.userMenu.switchUser }}</div>
          <div
            v-for="profile in otherProfiles"
            :key="profile.id"
            class="dropdown-item user-item"
            @click.stop="handleSwitchUser(profile.id)"
          >
            <img
              :src="profile.gender === 'prince' ? '/math_prince.png' : '/math_princess.png'"
              class="mini-avatar"
            />
            <span class="user-item-name">{{ profile.name || (profile.gender === 'prince' ? t.welcome.defaultPrince : t.welcome.defaultPrincess) }}</span>
            <button class="delete-user-btn" @click.stop="confirmDeleteUser(profile)" :title="t.userMenu.deleteUser">
              ✕
            </button>
          </div>
        </div>

        <div class="dropdown-divider"></div>

        <!-- Add New User -->
        <div class="dropdown-item add-user" @click.stop="showAddUserModal = true">
          <span class="item-icon">➕</span>
          {{ t.userMenu.addUser }}
        </div>

        <div class="dropdown-divider"></div>

        <!-- Logout -->
        <div class="dropdown-item logout" @click.stop="handleLogout">
          <span class="item-icon">🚪</span>
          {{ t.userMenu.logout }}
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <Teleport to="body">
      <transition name="modal">
        <div v-if="showAddUserModal" class="modal-overlay" @click.self="showAddUserModal = false">
          <div class="modal-content add-user-modal">
            <button class="close-btn" @click="showAddUserModal = false">✕</button>

            <h3 class="modal-title">{{ t.userMenu.addUser }}</h3>

            <!-- Name Input -->
            <div class="input-group">
              <label>{{ t.userMenu.userName }}</label>
              <input
                v-model="newUserName"
                type="text"
                :placeholder="t.userMenu.namePlaceholder"
                maxlength="20"
                class="name-input"
              />
            </div>

            <!-- Gender Selection -->
            <div class="gender-selection">
              <label>{{ t.userMenu.selectGender }}</label>
              <div class="gender-options">
                <div
                  class="gender-option"
                  :class="{ selected: newUserGender === 'princess' }"
                  @click="newUserGender = 'princess'"
                >
                  <img src="/math_princess.png" alt="Princess" class="gender-avatar" />
                  <span>{{ t.welcome.princess }}</span>
                </div>
                <div
                  class="gender-option"
                  :class="{ selected: newUserGender === 'prince' }"
                  @click="newUserGender = 'prince'"
                >
                  <img src="/math_prince.png" alt="Prince" class="gender-avatar" />
                  <span>{{ t.welcome.prince }}</span>
                </div>
              </div>
            </div>

            <!-- Confirm Button -->
            <button
              class="confirm-btn"
              :disabled="!newUserGender"
              @click="handleAddUser"
            >
              {{ t.userMenu.confirm }}
            </button>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <transition name="modal">
        <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="showDeleteConfirm = false">
          <div class="modal-content delete-confirm-modal">
            <h3 class="modal-title">{{ t.userMenu.confirmDelete }}</h3>
            <p class="delete-warning">
              {{ t.userMenu.deleteWarning.replace('{name}', userToDelete?.name || '') }}
            </p>
            <div class="modal-buttons">
              <button class="cancel-btn" @click="showDeleteConfirm = false">
                {{ t.userMenu.cancel }}
              </button>
              <button class="delete-btn" @click="handleDeleteUser">
                {{ t.userMenu.delete }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useLocaleStore } from '../stores/locale'
import { useStatsStore } from '../stores/stats'
import { useStickersStore } from '../stores/stickers'
import { useProgressStore } from '../stores/progress'
import { useCoinsStore } from '../stores/coins'
import { useProfilesStore } from '../stores/profiles'
import { getLocaleDisplayName } from '../config/i18n'

const userStore = useUserStore()
const localeStore = useLocaleStore()
const statsStore = useStatsStore()
const stickersStore = useStickersStore()
const progressStore = useProgressStore()
const coinsStore = useCoinsStore()
const profilesStore = useProfilesStore()

const showLanguageDropdown = ref(false)
const showUserDropdown = ref(false)
const showAddUserModal = ref(false)
const showDeleteConfirm = ref(false)
const userToDelete = ref(null)

const newUserName = ref('')
const newUserGender = ref(null)

const t = computed(() => localeStore.t)
const currentLocaleName = computed(() => getLocaleDisplayName(localeStore.currentLocale))

// Get other profiles (not the current one)
const otherProfiles = computed(() => {
  return profilesStore.profiles.filter(p => p.id !== profilesStore.currentProfileId)
})

function getLocaleName(locale) {
  return getLocaleDisplayName(locale)
}

function selectLocale(locale) {
  localeStore.setLocale(locale)
  showLanguageDropdown.value = false
}

function handleLogout() {
  userStore.logout()
  statsStore.reset()
  stickersStore.reset()
  progressStore.reset()
  coinsStore.reset()
  showUserDropdown.value = false
}

function handleAddUser() {
  if (!newUserGender.value) return

  // Create new profile
  const profileId = profilesStore.createProfile(newUserName.value || null, newUserGender.value)

  // Switch to the new profile
  profilesStore.switchProfile(profileId)

  // Reset all user stores for fresh start
  userStore.reset()
  statsStore.reset()
  stickersStore.reset()
  progressStore.reset()
  coinsStore.reset()

  // Set the new user data
  userStore.setUser(newUserName.value || null, newUserGender.value)

  // Close modal and reset form
  showAddUserModal.value = false
  showUserDropdown.value = false
  newUserName.value = ''
  newUserGender.value = null

  // Reload page to ensure clean state
  window.location.reload()
}

function handleSwitchUser(profileId) {
  const profile = profilesStore.getProfile(profileId)
  if (!profile) return

  // Switch profile
  profilesStore.switchProfile(profileId)

  // Close dropdown
  showUserDropdown.value = false

  // Reload page to load the new user's data
  window.location.reload()
}

function confirmDeleteUser(profile) {
  userToDelete.value = profile
  showDeleteConfirm.value = true
}

function handleDeleteUser() {
  if (!userToDelete.value) return

  profilesStore.deleteProfile(userToDelete.value.id)

  showDeleteConfirm.value = false
  userToDelete.value = null
  showUserDropdown.value = false
}

// Close dropdowns when clicking outside
function handleClickOutside(e) {
  if (!e.target.closest('.user-menu')) {
    showLanguageDropdown.value = false
    showUserDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.user-menu {
  position: fixed;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 12px;
  z-index: 1000;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid transparent;
  font-size: 14px;
}

.menu-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.menu-icon {
  font-size: 18px;
}

.menu-text {
  font-weight: 500;
  color: #333;
}

.dropdown-arrow {
  font-size: 10px;
  color: #999;
  transition: transform 0.3s;
}

/* User Profile Styles */
.user-profile {
  padding: 6px 14px 6px 6px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--secondary-color, #FFB6C1);
}

.user-name {
  font-weight: 600;
  color: var(--primary-color, #FF69B4);
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Cute Dropdown Styles */
.cute-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: dropdownFadeIn 0.2s ease;
  border: 2px solid var(--secondary-color, #FFB6C1);
}

.user-dropdown {
  min-width: 220px;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, var(--light-color, #FFF5F8), var(--background-color, #FFF0F5));
}

.dropdown-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-user-info {
  display: flex;
  flex-direction: column;
}

.dropdown-user-name {
  font-weight: 700;
  font-size: 16px;
  color: var(--primary-color, #FF69B4);
}

.dropdown-user-role {
  font-size: 12px;
  color: #888;
}

.dropdown-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--secondary-color, #FFB6C1), transparent);
  margin: 0 12px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  color: #555;
}

.dropdown-item:hover {
  background: var(--light-color, #FFF5F8);
  color: var(--primary-color, #FF69B4);
}

.dropdown-item.active {
  background: var(--light-color, #FFF5F8);
  color: var(--primary-color, #FF69B4);
  font-weight: 600;
}

.dropdown-item.logout {
  color: #e74c3c;
}

.dropdown-item.logout:hover {
  background: #fff5f5;
  color: #c0392b;
}

.dropdown-item.add-user {
  color: var(--primary-color, #FF69B4);
}

.dropdown-item.add-user:hover {
  background: var(--light-color, #FFF5F8);
}

.check-mark {
  width: 16px;
  color: var(--accent-color, #FF1493);
  font-weight: bold;
}

.item-icon {
  font-size: 16px;
}

/* Other Users Section */
.other-users-section {
  padding: 8px 0;
}

.section-label {
  padding: 4px 16px 8px;
  font-size: 11px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.user-item {
  padding: 10px 16px;
}

.mini-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--secondary-color, #FFB6C1);
}

.user-item-name {
  flex: 1;
  font-weight: 500;
}

.delete-user-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #ccc;
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  opacity: 0;
}

.user-item:hover .delete-user-btn {
  opacity: 1;
}

.delete-user-btn:hover {
  background: #fee;
  color: #e74c3c;
}

/* Language selector specific */
.language-selector {
  border: 2px solid var(--secondary-color, #FFB6C1);
}

.language-selector:hover {
  border-color: var(--primary-color, #FF69B4);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: linear-gradient(135deg, #fff 0%, #FFF5F8 100%);
  border-radius: 20px;
  padding: 24px;
  max-width: 360px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(255, 182, 193, 0.3);
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 105, 180, 0.1);
  color: var(--primary-color, #FF69B4);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--primary-color, #FF69B4);
  color: white;
  transform: rotate(90deg);
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-color, #FF69B4);
  margin: 0 0 20px;
  text-align: center;
}

/* Add User Modal */
.input-group {
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  font-size: 12px;
  color: #888;
  margin-bottom: 6px;
}

.name-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--secondary-color, #FFB6C1);
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.name-input:focus {
  border-color: var(--primary-color, #FF69B4);
}

.gender-selection {
  margin-bottom: 20px;
}

.gender-selection label {
  display: block;
  font-size: 12px;
  color: #888;
  margin-bottom: 10px;
}

.gender-options {
  display: flex;
  gap: 12px;
}

.gender-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  border: 2px solid #eee;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.gender-option:hover {
  border-color: var(--secondary-color, #FFB6C1);
  background: var(--light-color, #FFF5F8);
}

.gender-option.selected {
  border-color: var(--primary-color, #FF69B4);
  background: var(--light-color, #FFF5F8);
}

.gender-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}

.gender-option span {
  font-size: 13px;
  font-weight: 500;
  color: #666;
}

.gender-option.selected span {
  color: var(--primary-color, #FF69B4);
}

.confirm-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary-color, #FF69B4), var(--accent-color, #FF1493));
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.confirm-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
}

.confirm-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Delete Confirm Modal */
.delete-confirm-modal {
  max-width: 320px;
}

.delete-warning {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: center;
}

.modal-buttons {
  display: flex;
  gap: 12px;
}

.cancel-btn, .delete-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: #eee;
  color: #666;
}

.cancel-btn:hover {
  background: #ddd;
}

.delete-btn {
  background: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background: #c0392b;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

/* Responsive - Tablet */
@media (max-width: 768px) {
  .user-menu {
    top: 12px;
    right: 12px;
    gap: 10px;
  }

  .menu-item {
    padding: 6px 12px;
  }

  .dropdown-header {
    padding: 12px;
  }

  .dropdown-avatar {
    width: 40px;
    height: 40px;
  }
}

/* Responsive - Mobile */
@media (max-width: 500px) {
  .user-menu {
    top: 8px;
    right: 8px;
    gap: 6px;
  }

  .menu-item {
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 16px;
  }

  .menu-icon {
    font-size: 16px;
  }

  .menu-text {
    display: none;
  }

  .dropdown-arrow {
    font-size: 8px;
  }

  .user-name {
    max-width: 50px;
    font-size: 12px;
  }

  .user-avatar {
    width: 26px;
    height: 26px;
  }

  .user-profile {
    padding: 4px 8px 4px 4px;
  }

  .cute-dropdown {
    min-width: 140px;
    border-radius: 12px;
  }

  .user-dropdown {
    min-width: 200px;
  }

  .dropdown-header {
    padding: 10px;
    gap: 8px;
  }

  .dropdown-avatar {
    width: 36px;
    height: 36px;
  }

  .dropdown-user-name {
    font-size: 14px;
  }

  .dropdown-user-role {
    font-size: 11px;
  }

  .dropdown-item {
    padding: 10px 12px;
    font-size: 13px;
  }

  .modal-content {
    padding: 20px;
  }

  .gender-avatar {
    width: 48px;
    height: 48px;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .user-menu {
    top: 6px;
    right: 6px;
    gap: 4px;
  }

  .menu-item {
    padding: 5px 8px;
  }

  .user-name {
    display: none;
  }

  .user-avatar {
    width: 24px;
    height: 24px;
  }
}
</style>
