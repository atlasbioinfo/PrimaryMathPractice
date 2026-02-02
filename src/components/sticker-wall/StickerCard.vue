<template>
  <div
    class="sticker-card"
    :class="{ earned: isEarned }"
    @click="$emit('click')"
  >
    <div class="sticker-icon">{{ icon }}</div>
    <div class="sticker-name">{{ name }}</div>
    <div v-if="!isEarned" class="lock-badge">
      <slot name="lock-badge">&#x1F512;</slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isEarned: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.sticker-card {
  width: 70px;
  height: 80px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.sticker-card.earned {
  background: linear-gradient(135deg, var(--light-color, #FFF0F5), var(--secondary-color, #FFB6C1));
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
}

.sticker-card:not(.earned) {
  filter: grayscale(1);
  opacity: 0.5;
}

.sticker-card:hover {
  transform: scale(1.05);
}

.sticker-icon {
  font-size: 32px;
}

.sticker-name {
  font-size: 11px;
  color: #666;
  margin-top: 4px;
}

.lock-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 12px;
}
</style>
