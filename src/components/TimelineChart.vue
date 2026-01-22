<script setup>
  import { ref, toRef } from "vue";
  import { useChart } from "@/hooks/useChart.js";

  const props = defineProps({
    duration: Number,
    currentTime: Number,
  })

  const emit = defineEmits(['selectTime'])

  const canvasRef = ref(null)

  useChart(
    canvasRef,
    props.duration,
    toRef(props, "currentTime"),
    (time)=> emit("selectTime",time)
  )
</script>

<template>
  <div class="timeline">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
  .timeline {
    width: 85%;
    height: 50px;
    margin-inline: auto;
  }
</style>