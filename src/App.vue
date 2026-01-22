<script setup>
  import {ref} from 'vue'
  import VideoPlayer from '@/components/VideoPlayer.vue'
  import TimelineChart from "@/components/TimelineChart.vue";

  const duration = ref(0)
  const currentTime = ref(0)
  const seekTime = ref(null)

  const onVideoLoaded = (value) => {
    duration.value = value
  }

  const onTimeUpdate = (time) => {
    currentTime.value = time
  }

  const onSeek = (second) => {
    seekTime.value = second
  }
</script>

<template>
  <VideoPlayer
    :seekTime="seekTime"
    @loaded="onVideoLoaded"
    @timeUpdate="onTimeUpdate"
  />
  <TimelineChart
    v-if="duration"
    :duration="duration"
    :currentTime="currentTime"
    @seek="onSeek"
  />
  <p v-else>Видео не загрузилось!</p>
</template>

<style scoped></style>
