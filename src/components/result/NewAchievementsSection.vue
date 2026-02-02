<template>
  <div v-if="achievements.length > 0" class="new-achievements">
    <h3>{{ title }}</h3>
    <div class="achievement-list">
      <div v-for="achievement in achievements" :key="achievement.id" class="achievement-item">
        <span class="achievement-icon">{{ achievement.icon }}</span>
        <span class="achievement-name">{{ achievement.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  achievements: { type: Array, required: true },
  title: { type: String, required: true }
})
</script>

<style scoped>
.new-achievements {
  background: linear-gradient(135deg, #E8F5E9, #C8E6C9);
  border: 2px solid #81C784;
  border-radius: 16px;
  padding: 15px;
  margin-bottom: 20px;
}

.new-achievements h3 {
  font-size: 16px;
  color: #2E7D32;
  margin-bottom: 10px;
  text-align: center;
}

.achievement-list {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.achievement-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  animation: achievementPop 0.5s ease;
}

@keyframes achievementPop {
  0% { transform: scale(0) rotate(-10deg); }
  50% { transform: scale(1.2) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.achievement-icon {
  font-size: 40px;
}

.achievement-name {
  font-size: 12px;
  color: #2E7D32;
  font-weight: 600;
}
</style>
