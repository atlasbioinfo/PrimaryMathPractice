<template>
  <div v-if="stickers.length > 0" class="new-stickers">
    <h3>{{ title }}</h3>
    <div class="sticker-list">
      <div v-for="sticker in stickers" :key="sticker.id" class="new-sticker-item">
        <span class="sticker-icon">{{ sticker.icon }}</span>
        <span class="sticker-name">{{ sticker.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stickers: { type: Array, required: true },
  title: { type: String, required: true }
})
</script>

<style scoped>
.new-stickers {
  background: var(--light-color, #FFF0F5);
  border-radius: 16px;
  padding: 15px;
  margin-bottom: 20px;
}

.new-stickers h3 {
  font-size: 16px;
  color: var(--primary-color, #FF69B4);
  margin-bottom: 10px;
}

.sticker-list {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.new-sticker-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  animation: stickerPop 0.5s ease;
}

@keyframes stickerPop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.new-sticker-item .sticker-icon {
  font-size: 40px;
}

.new-sticker-item .sticker-name {
  font-size: 12px;
  color: #666;
}

@media (max-width: 500px) {
  .new-stickers {
    padding: 12px;
    margin-bottom: 16px;
    border-radius: 14px;
  }

  .new-stickers h3 {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .sticker-list {
    gap: 12px;
  }

  .new-sticker-item .sticker-icon {
    font-size: 32px;
  }

  .new-sticker-item .sticker-name {
    font-size: 11px;
  }
}
</style>
