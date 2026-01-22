<script setup>
  import { ref, onMounted, watch } from 'vue'
  import videoFileSrc from '@/assets/videos/example.mp4'

  const props = defineProps({
    selectedTime: {
      type: Number
    }
  })

  const emit = defineEmits(['loaded', 'timeUpdate'])

  const videoRef = ref(null)

  onMounted(() => {
    if (!videoRef.value) {
      return
    }

    videoRef.value.addEventListener('loadedmetadata', () => {
      emit('loaded', videoRef.value.duration)
    })

    videoRef.value.addEventListener('timeupdate', () => {
      emit('timeUpdate', videoRef.value.currentTime)
    })
  })

  watch(
  () => props.selectedTime,
  (time) => {
    if (time == null || !videoRef.value) {
      return
    }
    videoRef.value.currentTime = time
  })
</script>

<template>
  <div class="video-player">
    <video
        class="video"
        ref="videoRef"
        :src="videoFileSrc"
        controls
    />
  </div>
</template>

<style scoped>
  .video-player {
    display: flex;
    justify-content: center;
  }
  .video {
    object-fit: contain;
    width: 90%;
    height: auto;
  }
</style>