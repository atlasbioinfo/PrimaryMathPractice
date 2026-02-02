<template>
  <div class="user-menu">
    <!-- Language Selector -->
    <div class="menu-item language-selector" @click="showLanguageDropdown = !showLanguageDropdown">
      <span class="menu-icon">{{ globeIcon }}</span>
      <span class="menu-text">{{ currentLocaleName }}</span>
      <span class="dropdown-arrow">{{ showLanguageDropdown ? upArrow : downArrow }}</span>

      <div v-if="showLanguageDropdown" class="dropdown cute-dropdown">
        <div
          v-for="locale in localeStore.supportedLocales"
          :key="locale"
          class="dropdown-item"
          :class="{ active: locale === localeStore.currentLocale }"
          @click.stop="selectLocale(locale)"
        >
          <span class="check-mark">{{ locale === localeStore.currentLocale ? checkMark : '' }}</span>
          {{ getLocaleName(locale) }}
        </div>
      </div>
    </div>

    <!-- User Profile (when logged in) -->
    <div v-if="!userStore.isNewUser" class="menu-item user-profile" @click="showUserDropdown = !showUserDropdown">
      <img :src="userStore.theme.avatar" :alt="localizedDisplayName" class="user-avatar" />
      <span class="user-name">{{ localizedDisplayName }}</span>
      <span class="dropdown-arrow">{{ showUserDropdown ? upArrow : downArrow }}</span>

      <div v-if="showUserDropdown" class="dropdown cute-dropdown user-dropdown">
        <!-- Current User Header -->
        <div class="dropdown-header">
          <img :src="userStore.theme.avatar" class="dropdown-avatar" />
          <div class="dropdown-user-info">
            <span class="dropdown-user-name">{{ localizedDisplayName }}</span>
            <span class="dropdown-user-role">{{ userRoleText }}</span>
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
            <img :src="getProfileAvatar(profile)" class="mini-avatar" />
            <span class="user-item-name">{{ getProfileName(profile) }}</span>
            <button
              class="delete-user-btn"
              :title="t.userMenu.deleteUser"
              @click.stop="confirmDeleteUser(profile)"
            >
              {{ closeIcon }}
            </button>
          </div>
        </div>

        <div class="dropdown-divider"></div>

        <!-- Add New User -->
        <div class="dropdown-item add-user" @click.stop="showAddUserModal = true">
          <span class="item-icon">{{ addIcon }}</span>
          {{ t.userMenu.addUser }}
        </div>

        <div class="dropdown-divider"></div>

        <!-- Settings -->
        <div class="dropdown-item settings" @click.stop="openSettings">
          <span class="item-icon">{{ settingsIcon }}</span>
          {{ t.accessibility?.title || 'Settings' }}
        </div>

        <div class="dropdown-divider"></div>

        <!-- Logout -->
        <div class="dropdown-item logout" @click.stop="handleLogoutAndClose">
          <span class="item-icon">{{ logoutIcon }}</span>
          {{ t.userMenu.logout }}
        </div>
      </div>
    </div>

    <AddUserModal
      :show="showAddUserModal"
      :title="t.userMenu.addUser"
      :name-label="t.userMenu.userName"
      :name-placeholder="t.userMenu.namePlaceholder"
      :gender-label="t.userMenu.selectGender"
      :princess-text="t.welcome.princess"
      :prince-text="t.welcome.prince"
      :confirm-text="t.userMenu.confirm"
      @close="showAddUserModal = false"
      @confirm="handleAddUser"
    />

    <ConfirmModal
      :show="showDeleteConfirm"
      :title="t.userMenu.confirmDelete"
      :message="deleteWarningMessage"
      :cancel-text="t.userMenu.cancel"
      :confirm-text="t.userMenu.delete"
      type="danger"
      @close="showDeleteConfirm = false"
      @confirm="handleDeleteUserAndClose"
    />

    <SettingsModal :show="showSettingsModal" @close="showSettingsModal = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useLocaleStore } from '../stores/locale.js'
import { useProfilesStore } from '../stores/profiles.js'
import { useUserManagement } from '../composables/useUserManagement.js'
import { getLocaleDisplayName } from '../config/i18n.js'
import AddUserModal from './AddUserModal.vue'
import ConfirmModal from './ConfirmModal.vue'
import SettingsModal from './settings/SettingsModal.vue'

const userStore = useUserStore()
const localeStore = useLocaleStore()
const profilesStore = useProfilesStore()

const {
  showAddUserModal,
  showDeleteConfirm,
  userToDelete,
  handleAddUser,
  handleSwitchUser,
  confirmDeleteUser,
  handleDeleteUser,
  handleLogout
} = useUserManagement()

const baseUrl = import.meta.env.BASE_URL
const showLanguageDropdown = ref(false)
const showUserDropdown = ref(false)
const showSettingsModal = ref(false)

// Icons as constants
const globeIcon = '\u{1F310}'     // 🌐
const upArrow = '\u25B2'          // ▲
const downArrow = '\u25BC'        // ▼
const checkMark = '\u2713'        // ✓
const closeIcon = '\u2715'        // ✕
const addIcon = '\u2795'          // ➕
const settingsIcon = '\u2699\uFE0F' // ⚙️
const logoutIcon = '\u{1F6AA}'    // 🚪

const t = computed(() => localeStore.t)
const currentLocaleName = computed(() => getLocaleDisplayName(localeStore.currentLocale))

const localizedDisplayName = computed(() => {
  if (userStore.username) return userStore.username
  return userStore.gender === 'prince' ? t.value.welcome?.defaultPrince : t.value.welcome?.defaultPrincess
})

const userRoleText = computed(() => {
  return userStore.gender === 'prince' ? t.value.welcome.prince : t.value.welcome.princess
})

const otherProfiles = computed(() => {
  return profilesStore.profiles.filter(p => p.id !== profilesStore.currentProfileId)
})

const deleteWarningMessage = computed(() => {
  return t.value.userMenu.deleteWarning.replace('{name}', userToDelete.value?.name || '')
})

function getLocaleName(locale) {
  return getLocaleDisplayName(locale)
}

function selectLocale(locale) {
  localeStore.setLocale(locale)
  showLanguageDropdown.value = false
}

function getProfileAvatar(profile) {
  const avatarFile = profile.gender === 'prince' ? 'math_prince.png' : 'math_princess.png'
  return `${baseUrl}${avatarFile}`
}

function getProfileName(profile) {
  if (profile.name) return profile.name
  return profile.gender === 'prince' ? t.value.welcome.defaultPrince : t.value.welcome.defaultPrincess
}

function openSettings() {
  showUserDropdown.value = false
  showSettingsModal.value = true
}

function handleLogoutAndClose() {
  handleLogout()
  showUserDropdown.value = false
}

function handleDeleteUserAndClose() {
  handleDeleteUser()
  showUserDropdown.value = false
}

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

.dropdown-item.settings {
  color: #666;
}

.dropdown-item.settings:hover {
  background: var(--light-color, #FFF5F8);
  color: var(--primary-color, #FF69B4);
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
