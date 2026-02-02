<template>
  <div v-if="show" class="next-level-preview">
    <p>{{ nextLevelIsText }} <strong>{{ levelName }}</strong></p>
    <span class="next-level-icon">{{ icon }}</span>
    <p class="next-level-hint">{{ hint }}</p>
  </div>
</template>

<script setup>
defineProps({
  show: { type: Boolean, required: true },
  nextLevelIsText: { type: String, required: true },
  levelName: { type: String, required: true },
  icon: { type: String, required: true },
  hint: { type: String, required: true }
})
</script>

<style scoped>
.next-level-preview {
  background: var(--light-color, #FFF0F5);
  border-radius: 16px;
  padding: 15px;
  margin-bottom: 20px;
}

.next-level-preview p {
  margin: 5px 0;
  color: #666;
}

.next-level-preview strong {
  color: var(--primary-color, #FF69B4);
}

.next-level-icon {
  font-size: 48px;
  display: block;
  margin: 10px 0;
}

.next-level-hint {
  font-size: 14px;
  color: #999;
}

@media (max-width: 500px) {
  .next-level-preview {
    padding: 12px;
    margin-bottom: 16px;
    border-radius: 14px;
  }

  .next-level-preview p {
    font-size: 13px;
  }

  .next-level-icon {
    font-size: 40px;
    margin: 8px 0;
  }

  .next-level-hint {
    font-size: 12px;
  }
}
</style>
