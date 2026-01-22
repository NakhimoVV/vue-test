<script setup>
  import { ref } from 'vue'
  import VideoPlayer from '@/components/VideoPlayer.vue'
  import TimelineChart from "@/components/TimelineChart.vue";

  const duration = ref(0)
  const currentTime = ref(0)
  const selectedTime = ref(null)

  const onVideoLoaded = (value) => {
    duration.value = value
  }

  const onTimeUpdate = (time) => {
    currentTime.value = time
  }

  const onSelectTime = (time) => {
    selectedTime.value = time
  }
</script>

<template>
  <VideoPlayer
    :selectedTime="selectedTime"
    @loaded="onVideoLoaded"
    @timeUpdate="onTimeUpdate"
  />
  <TimelineChart
    v-if="duration"
    :duration="duration"
    :currentTime="currentTime"
    @selectTime="onSelectTime"
  />
  <p v-else>Видео не загрузилось!</p>
</template>

<style>
  #app {
    display: grid;
    row-gap: 20px;
  }
</style>
