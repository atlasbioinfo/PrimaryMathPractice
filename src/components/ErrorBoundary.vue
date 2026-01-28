<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-content">
      <div class="error-icon">😿</div>
      <h2 class="error-title">{{ title }}</h2>
      <p class="error-message">{{ message }}</p>
      <button class="retry-btn" @click="handleRetry">
        {{ retryText }}
      </button>
    </div>
  </div>
  <slot v-else></slot>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { logError } from '../utils/errorHandler'

const props = defineProps({
  title: {
    type: String,
    default: 'Oops! Something went wrong'
  },
  message: {
    type: String,
    default: 'Please try again or refresh the page.'
  },
  retryText: {
    type: String,
    default: 'Try Again'
  }
})

const emit = defineEmits(['error', 'retry'])

const hasError = ref(false)
const errorInfo = ref(null)

onErrorCaptured((error, instance, info) => {
  hasError.value = true
  errorInfo.value = { error, info }

  // Log the error
  logError(error, `ErrorBoundary caught error: ${info}`)

  // Emit error event for parent handling
  emit('error', { error, info })

  // Prevent error from propagating
  return false
})

function handleRetry() {
  hasError.value = false
  errorInfo.value = null
  emit('retry')
}
</script>

<style scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 40px 20px;
}

.error-content {
  text-align: center;
  max-width: 400px;
}

.error-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.error-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
}

.error-message {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
  line-height: 1.5;
}

.retry-btn {
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #FF69B4, #FF1493);
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
}

.retry-btn:active {
  transform: translateY(0);
}

@media (max-width: 500px) {
  .error-icon {
    font-size: 48px;
  }

  .error-title {
    font-size: 20px;
  }

  .error-message {
    font-size: 14px;
  }

  .retry-btn {
    padding: 10px 24px;
    font-size: 14px;
  }
}
</style>
