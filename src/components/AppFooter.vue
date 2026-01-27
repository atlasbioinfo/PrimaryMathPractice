<template>
  <div class="app-footer">
    <!-- Small trigger button -->
    <button class="about-trigger" @click="showModal = true">
      <span class="about-icon">ℹ️</span>
      <span class="about-text">{{ t.footer.aboutApp }}</span>
    </button>

    <!-- Modal Overlay -->
    <Teleport to="body">
      <transition name="modal">
        <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
          <div class="modal-content">
            <!-- Close Button -->
            <button class="close-btn" @click="showModal = false">
              ✕
            </button>

            <!-- Modal Header -->
            <div class="modal-header">
              <span class="modal-logo">🧮</span>
              <h3 class="modal-title">{{ t.footer.aboutApp }}</h3>
            </div>

            <!-- Privacy Notice -->
            <div class="info-section">
              <span class="section-icon">🔒</span>
              <p class="section-text">{{ t.footer.privacy }}</p>
            </div>

            <!-- Story -->
            <div class="info-section story-section">
              <span class="section-icon">💝</span>
              <div>
                <p class="section-text">{{ t.footer.story }}</p>
                <p class="call-to-action">{{ t.footer.callToAction }}</p>
              </div>
            </div>

            <!-- Feedback Link -->
            <a
              href="https://github.com/icemanccc/PrimaryMathPractice/issues"
              target="_blank"
              rel="noopener noreferrer"
              class="feedback-link"
            >
              <span class="section-icon">💬</span>
              {{ t.footer.feedback }}
            </a>

            <!-- Signature -->
            <p class="signature">
              Made with 💖 by H. YU
            </p>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLocaleStore } from '../stores/locale'

const localeStore = useLocaleStore()
const t = computed(() => localeStore.t)

const showModal = ref(false)
</script>

<style scoped>
/* Small trigger button */
.app-footer {
  position: fixed;
  bottom: 12px;
  right: 12px;
  z-index: 100;
}

.about-trigger {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 182, 193, 0.4);
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 11px;
  color: #888;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.about-trigger:hover {
  background: rgba(255, 255, 255, 0.95);
  color: var(--primary-color, #FF69B4);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.about-icon {
  font-size: 12px;
}

.about-text {
  font-weight: 500;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

/* Modal Content */
.modal-content {
  background: linear-gradient(135deg, #fff 0%, #FFF5F8 100%);
  border-radius: 20px;
  padding: 24px;
  max-width: 360px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(255, 182, 193, 0.3);
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 105, 180, 0.1);
  color: var(--primary-color, #FF69B4);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--primary-color, #FF69B4);
  color: white;
  transform: rotate(90deg);
}

/* Modal Header */
.modal-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px dashed rgba(255, 182, 193, 0.4);
}

.modal-logo {
  font-size: 32px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-color, #FF69B4);
  margin: 0;
}

/* Info Sections */
.info-section {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  border-left: 3px solid var(--primary-color, #FF69B4);
}

.section-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.section-text {
  font-size: 12px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.story-section {
  background: linear-gradient(135deg, rgba(255, 182, 193, 0.15) 0%, rgba(255, 240, 245, 0.5) 100%);
}

.call-to-action {
  font-size: 12px;
  color: var(--primary-color, #FF69B4);
  font-weight: 500;
  margin: 8px 0 0 0;
}

/* Feedback Link */
.feedback-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  text-decoration: none;
  color: #666;
  font-size: 12px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
}

.feedback-link:hover {
  background: var(--primary-color, #FF69B4);
  color: white;
  transform: translateX(4px);
}

/* Signature */
.signature {
  text-align: center;
  font-size: 11px;
  color: #aaa;
  margin: 0;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 182, 193, 0.3);
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

/* Mobile adjustments */
@media (max-width: 500px) {
  .app-footer {
    bottom: 8px;
    right: 8px;
  }

  .about-trigger {
    padding: 5px 10px;
    font-size: 10px;
  }

  .about-icon {
    font-size: 11px;
  }

  .modal-content {
    padding: 20px;
    max-width: 320px;
  }

  .modal-logo {
    font-size: 28px;
  }

  .modal-title {
    font-size: 16px;
  }

  .section-text,
  .call-to-action,
  .feedback-link {
    font-size: 11px;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .about-text {
    display: none;
  }

  .about-trigger {
    padding: 6px 8px;
    border-radius: 50%;
  }
}
</style>
