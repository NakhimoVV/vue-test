<script setup>
  import {ref, onMounted, onUnmounted, watch } from "vue";
  import Chart from 'chart.js/auto'

  const props = defineProps({
    duration: Number,
    currentTime: Number,
  })

  const emit = defineEmits(['seek'])

  const chartRef = ref(null)
  let chart = null

  const createChart = () => {
    const bodyChart = chartRef.value.getContext('2d')

    const labels = Array.from(
        { length: props.duration + 1 },
        (_, i) => i
    )

    chart = new Chart(bodyChart, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Video timeline',
          data: labels,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        }]
      },
      options: {
        animation: false,
        onClick(_, elements) {
          if (!elements.length) return
          emit('seek', elements[0].index)
        }
      }
    })
  }

  onMounted(createChart)

  watch(
      () => props.currentTime,
      (time) => {
        if (!chart) return
        chart.setActiveElements([{ datasetIndex: 0, index: time }])
        chart.update()
      }
  )

  onUnmounted(() => {
    chart?.destroy()
  })
</script>

<template>
  <div class="inner-chart">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.inner-chart {
  width: 70%;
  margin-inline: auto;
}
</style>