<script setup>
  import {ref} from 'vue'
  import VideoPlayer from '@/components/VideoPlayer.vue'
  import TimelineChart from "@/components/TimelineChart.vue";

  const duration = ref(0)
  const currentTime = ref(0)

  const onVideoLoaded = (value) => {
    duration.value = Math.floor(value)
  }

  const onTimeUpdate = (time) => {
    currentTime.value = Math.floor(time)
  }

  const onSeek = (second) => {
    currentTime.value = second
  }
</script>

<template>
  <VideoPlayer
    :currentTime="currentTime"
    @loaded="onVideoLoaded"
    @timeUpdate="onTimeUpdate"
  />
  <TimelineChart
    v-if="duration"
    :duration="duration"
    :currentTime="currentTime"
    @seek="onSeek"
  />
</template>

<style scoped></style>
