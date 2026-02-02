<template>
  <div v-if="profiles.length > 0" class="existing-users">
    <p class="existing-label">{{ switchUserLabel }}</p>
    <div class="user-list">
      <div
        v-for="profile in profiles"
        :key="profile.id"
        class="user-card"
        :class="profile.gender"
        @click="$emit('select', profile.id)"
      >
        <img
          :src="profile.gender === 'prince' ? `${baseUrl}math_prince.png` : `${baseUrl}math_princess.png`"
          class="user-avatar"
        />
        <span class="user-name">{{ getProfileName(profile) }}</span>
      </div>
    </div>
    <div class="divider">
      <span>{{ newUserLabel }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocaleStore } from '../stores/locale'

defineProps({
  profiles: {
    type: Array,
    required: true
  },
  switchUserLabel: {
    type: String,
    default: 'Switch User'
  },
  newUserLabel: {
    type: String,
    default: 'New User'
  }
})

defineEmits(['select'])

const localeStore = useLocaleStore()
const t = computed(() => localeStore.t)
const baseUrl = import.meta.env.BASE_URL

function getProfileName(profile) {
  if (profile.name) return profile.name
  return profile.gender === 'prince' ? t.value.welcome?.defaultPrince : t.value.welcome?.defaultPrincess
}
</script>

<style scoped>
.existing-users {
  width: 100%;
  max-width: 420px;
  margin-bottom: 20px;
  z-index: 1;
}

.existing-label {
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-bottom: 12px;
}

.user-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  min-width: 90px;
}

.user-card.prince {
  border-color: #87CEEB;
}

.user-card.princess {
  border-color: #FFB6C1;
}

.user-card:hover {
  transform: translateY(-4px);
}

.user-card.prince:hover {
  box-shadow: 0 8px 25px rgba(74, 144, 217, 0.3);
  border-color: #4A90D9;
}

.user-card.princess:hover {
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
  border-color: #FF69B4;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 6px;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-name {
  font-size: 12px;
  font-weight: 600;
  color: #555;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.user-card.prince .user-name {
  color: #4A90D9;
}

.user-card.princess .user-name {
  color: #FF69B4;
}

.divider {
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 12px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ddd, transparent);
}

.divider span {
  font-size: 13px;
  color: #999;
  white-space: nowrap;
}

@media (max-width: 500px) {
  .existing-users {
    margin-bottom: 16px;
  }

  .existing-label {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .user-list {
    gap: 8px;
  }

  .user-card {
    padding: 10px 12px;
    border-radius: 12px;
    min-width: 80px;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
  }

  .user-name {
    font-size: 11px;
    max-width: 70px;
  }

  .divider {
    margin-top: 16px;
  }

  .divider span {
    font-size: 12px;
  }
}

@media (max-width: 360px) {
  .user-card {
    padding: 8px 10px;
    min-width: 70px;
  }

  .user-avatar {
    width: 36px;
    height: 36px;
  }

  .user-name {
    font-size: 10px;
    max-width: 60px;
  }
}
</style>
