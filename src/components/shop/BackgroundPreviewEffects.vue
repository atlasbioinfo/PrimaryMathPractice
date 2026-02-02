<template>
  <div class="preview-effects">
    <!-- Ocean: waves and bubbles -->
    <div v-if="themeId === 'bg_ocean'" class="ocean-effect">
      <div class="wave"></div>
      <span
        v-for="i in 5"
        :key="'b' + i"
        class="mini-bubble"
        :style="{ left: i * 18 + '%', animationDelay: i * 0.3 + 's' }"
      ></span>
    </div>

    <!-- Space/Galaxy: twinkling stars -->
    <div v-if="themeId === 'bg_space' || themeId === 'bg_galaxy'" class="stars-effect">
      <span
        v-for="i in 8"
        :key="'s' + i"
        class="mini-star"
        :style="{
          left: i * 12 + '%',
          top: 10 + ((i * 10) % 70) + '%',
          animationDelay: i * 0.2 + 's'
        }"
      ></span>
    </div>

    <!-- Forest: fireflies -->
    <div v-if="themeId === 'bg_forest'" class="forest-effect">
      <span
        v-for="i in 4"
        :key="'f' + i"
        class="mini-firefly"
        :style="{
          left: 15 + i * 20 + '%',
          top: 20 + i * 15 + '%',
          animationDelay: i * 0.5 + 's'
        }"
      ></span>
    </div>

    <!-- Aurora: light bands -->
    <div v-if="themeId === 'bg_aurora'" class="aurora-effect">
      <div class="aurora-band aurora-band-1"></div>
      <div class="aurora-band aurora-band-2"></div>
    </div>

    <!-- Sakura/Candy: falling items -->
    <div v-if="themeId === 'bg_sakura' || themeId === 'bg_candy'" class="falling-effect">
      <span
        v-for="i in 6"
        :key="'fall' + i"
        class="mini-fall"
        :style="{ left: i * 15 + '%', animationDelay: i * 0.4 + 's' }"
      >
        {{ getFallingEmoji }}
      </span>
    </div>

    <!-- Sunset: floating clouds -->
    <div v-if="themeId === 'bg_sunset'" class="sunset-effect">
      <span class="mini-cloud mini-cloud-1">{{ cloudEmoji }}</span>
      <span class="mini-cloud mini-cloud-2">{{ cloudEmoji }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  themeId: { type: String, required: true }
})

const sakuraEmoji = '\u{1F338}'
const candyEmoji = '\u{1F36C}'
const cloudEmoji = '\u2601\uFE0F'

const getFallingEmoji = computed(() => props.themeId === 'bg_sakura' ? sakuraEmoji : candyEmoji)
</script>
