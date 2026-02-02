<template>
  <div
    class="avatar-shop-card"
    :class="{
      owned: isOwned,
      equipped: isEquipped,
      affordable: canAfford && !isOwned
    }"
    @click="handleClick"
  >
    <div class="avatar-preview">
      <img :src="avatarSrc" :alt="getAvatarName()" class="avatar-image" />
    </div>

    <div class="avatar-info">
      <div class="avatar-name">{{ getAvatarName() }}</div>
      <div v-if="isEquipped" class="equipped-badge">
        <span>✓</span> {{ t.shop.equipped }}
      </div>
      <div v-else-if="isOwned" class="owned-badge">
        {{ t.shop.tapToEquip }}
      </div>
      <div v-else class="price-badge" :class="{ unaffordable: !canAfford }">
        <CoinIcon :size="14" />
        {{ avatar.price }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCoinsStore } from '../../stores/coins'
import { useLocaleStore } from '../../stores/locale'
import CoinIcon from '../CoinIcon.vue'

const props = defineProps({
  avatar: { type: Object, required: true }
})

const emit = defineEmits(['purchase', 'equip'])

const coinsStore = useCoinsStore()
const localeStore = useLocaleStore()
const baseUrl = import.meta.env.BASE_URL

const t = computed(() => localeStore.t)
const canAfford = computed(() => coinsStore.canAfford(props.avatar.price))
const isOwned = computed(() => coinsStore.hasPurchasedItem(props.avatar.id))
const isEquipped = computed(() => coinsStore.equippedAvatar === props.avatar.id)

const avatarSrc = computed(() => `${baseUrl}${props.avatar.image}`)

function getAvatarName() {
  return t.value.shop.avatars?.[props.avatar.nameKey] || props.avatar.nameKey
}

function handleClick() {
  if (isOwned.value) {
    emit('equip', props.avatar)
  } else if (canAfford.value) {
    emit('purchase', props.avatar)
  }
}
</script>

<style scoped>
.avatar-shop-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 16px;
  border: 2px solid #f0f0f0;
  transition: all 0.3s;
  cursor: default;
}

.avatar-shop-card.affordable,
.avatar-shop-card.owned {
  cursor: pointer;
}

.avatar-shop-card.affordable {
  border-color: var(--secondary-color, #FFB6C1);
}

.avatar-shop-card.affordable:hover,
.avatar-shop-card.owned:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.avatar-shop-card.affordable:hover {
  border-color: var(--primary-color, #FF69B4);
}

.avatar-shop-card.equipped {
  background: linear-gradient(135deg, #E8F5E9, #C8E6C9);
  border-color: #81C784;
  border-width: 3px;
}

.avatar-preview {
  position: relative;
  margin-bottom: 12px;
}

.avatar-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border: 3px solid #FFB6C1;
}

.avatar-info {
  text-align: center;
}

.avatar-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.equipped-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #81C784;
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.owned-badge {
  background: var(--light-color, #FFF0F5);
  color: var(--primary-color, #FF69B4);
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.price-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, #FFF9E6, #FFE4B5);
  border: 2px solid #FFD700;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #B8860B;
}

.price-badge.unaffordable {
  opacity: 0.5;
  border-color: #ccc;
  background: #f5f5f5;
  color: #999;
}

/* Mobile */
@media (max-width: 500px) {
  .avatar-shop-card {
    padding: 12px;
  }

  .avatar-image {
    width: 65px;
    height: 65px;
  }

  .avatar-name {
    font-size: 12px;
  }

  .price-badge,
  .owned-badge,
  .equipped-badge {
    font-size: 11px;
    padding: 4px 10px;
  }
}
</style>
