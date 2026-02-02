import { ref } from 'vue'
import html2canvas from 'html2canvas'

export function useShare() {
  const showShareModal = ref(false)
  const isGenerating = ref(false)
  const canShare = typeof navigator !== 'undefined' && !!navigator.share

  function openShareModal() {
    showShareModal.value = true
  }

  async function generateAndShare(cardRef, translations) {
    if (!cardRef) return

    isGenerating.value = true

    try {
      const canvas = await html2canvas(cardRef, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      })

      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
      const file = new File([blob], 'mathhero-progress.png', { type: 'image/png' })

      // Try Web Share API first
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: translations?.title || 'My MathHero Progress',
          files: [file]
        })
      } else {
        // Fallback: download the image
        downloadBlob(blob, 'mathhero-progress.png')
      }
    } catch (err) {
      console.error('Share failed:', err)
    } finally {
      isGenerating.value = false
    }
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return {
    showShareModal,
    isGenerating,
    canShare,
    openShareModal,
    generateAndShare
  }
}
