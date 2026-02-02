<template>
  <div class="avatar-card" :class="userStore.gender">
    <div class="card-decorations">
      <span v-for="(d, i) in decorations" :key="i" class="deco-item" :style="d">
        {{ userStore.theme.decorations[i % userStore.theme.decorations.length] }}
      </span>
    </div>
    <div class="card-content">
      <div class="avatar-wrapper">
        <img :src="currentAvatar" alt="avatar" class="home-avatar" />
        <div class="avatar-ring"></div>
      </div>
      <div class="info-section">
        <h1 class="welcome-text">{{ t.userMenu.welcome }}!</h1>
        <h2 class="user-name-display">{{ displayName }}</h2>
        <StickerShowcase />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../../stores/user'
import { useCoinsStore } from '../../stores/coins'
import { useLocaleStore } from '../../stores/locale'
import { purchasableAvatars } from '../../config/shop'
import StickerShowcase from '../StickerShowcase.vue'

const userStore = useUserStore()
const coinsStore = useCoinsStore()
const localeStore = useLocaleStore()

const t = computed(() => localeStore.t)
const baseUrl = import.meta.env.BASE_URL

const decorations = [
  { top: '5%', left: '5%', fontSize: '20px', animationDelay: '0s' },
  { top: '10%', right: '8%', fontSize: '18px', animationDelay: '0.5s' },
  { bottom: '15%', left: '8%', fontSize: '22px', animationDelay: '1s' },
  { bottom: '10%', right: '5%', fontSize: '16px', animationDelay: '1.5s' },
  { top: '40%', left: '2%', fontSize: '14px', animationDelay: '2s' },
  { top: '35%', right: '2%', fontSize: '16px', animationDelay: '2.5s' },
]

const currentAvatar = computed(() => {
  if (coinsStore.equippedAvatar) {
    const equipped = purchasableAvatars.find(a => a.id === coinsStore.equippedAvatar)
    if (equipped) {
      return `${baseUrl}${equipped.image}`
    }
  }
  return userStore.theme.avatar
})

const displayName = computed(() => {
  if (userStore.username) {
    return userStore.username
  }
  return userStore.gender === 'prince' ? t.value.welcome.defaultPrince : t.value.welcome.defaultPrincess
})
</script>

<style scoped>
.avatar-card {
  background: white;
  border-radius: 28px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.info-section {
  flex: 1;
  text-align: left;
}

.avatar-card.princess {
  border: 3px solid #FFB6C1;
  background: linear-gradient(180deg, white 0%, #FFF5F8 100%);
}

.avatar-card.prince {
  border: 3px solid #87CEEB;
  background: linear-gradient(180deg, white 0%, #F0F8FF 100%);
}

.card-decorations {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.deco-item {
  position: absolute;
  opacity: 0.5;
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.home-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 2;
}

.avatar-card.princess .home-avatar {
  border: 4px solid #FF69B4;
  box-shadow: 0 8px 30px rgba(255, 105, 180, 0.3);
}

.avatar-card.prince .home-avatar {
  border: 4px solid #4A90D9;
  box-shadow: 0 8px 30px rgba(74, 144, 217, 0.3);
}

.avatar-ring {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  z-index: 1;
}

.avatar-card.princess .avatar-ring {
  border: 3px dashed #FFB6C1;
}

.avatar-card.prince .avatar-ring {
  border: 3px dashed #87CEEB;
}

.welcome-text {
  font-size: 14px;
  color: #888;
  margin-bottom: 2px;
  font-weight: 500;
}

.user-name-display {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.avatar-card.princess .user-name-display {
  color: #FF69B4;
}

.avatar-card.prince .user-name-display {
  color: #4A90D9;
}

/* Responsive - Tablet */
@media (max-width: 768px) {
  .avatar-card {
    padding: 20px;
    border-radius: 24px;
  }

  .home-avatar {
    width: 90px;
    height: 90px;
  }
}

/* Responsive - Mobile */
@media (max-width: 500px) {
  .avatar-card {
    padding: 20px 16px;
    border-radius: 20px;
  }

  .avatar-card::before {
    display: none;
  }

  .card-decorations {
    display: none;
  }

  .card-content {
    gap: 16px;
  }

  .home-avatar {
    width: 70px;
    height: 70px;
  }

  .avatar-ring {
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-width: 2px;
  }

  .welcome-text {
    font-size: 12px;
  }

  .user-name-display {
    font-size: 20px;
    margin-bottom: 4px;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .avatar-card {
    padding: 12px;
  }

  .card-content {
    gap: 12px;
  }

  .home-avatar {
    width: 60px;
    height: 60px;
  }

  .user-name-display {
    font-size: 18px;
  }
}

/* Landscape mode on mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .avatar-card {
    padding: 12px 16px;
  }

  .home-avatar {
    width: 50px;
    height: 50px;
  }

  .avatar-ring {
    display: none;
  }

  .welcome-text {
    font-size: 11px;
  }

  .user-name-display {
    font-size: 16px;
    margin-bottom: 2px;
  }
}
</style>
