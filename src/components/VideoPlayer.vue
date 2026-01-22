<script setup>
  import { ref, onMounted, watch } from 'vue'
  import videoFileSrc from '@/assets/videos/example.mp4'

  const props = defineProps({
    seekTime: {
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

  watch(() => props.seekTime, (time) => {
    if (time == null || !videoRef.value) return
    videoRef.value.currentTime = time
  })

</script>

<template>
  <div class="container">
    <video
        class="video"
        ref="videoRef"
        :src="videoFileSrc"
        controls
        width="688"
        height="472"
    />
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
  }
  .video {
    object-fit: cover;
  }
</style>