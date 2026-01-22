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

    // генерируем ось Х
    const data = Array.from({ length: 200 }, (_, i) => ({
      x: (props.duration / 200) * i,
      y: 0
    }))

    chart = new Chart(bodyChart, {
      type: 'line',
      data: {
        datasets: [{
          data,
          borderColor: 'rgb(75,192,192)',
          pointRadius: 3,
          showLine: true
        }]
      },
      options: {
        animation: false,
        scales: {
          y: {
            display: false
          },
          x: {
            type: 'linear',
            min: 0,
            max: props.duration,
            ticks: {
              callback: (value) => `${value}s`
            }
          }
        },
        onClick(_, elements) {
          if (!elements.length) return
          const point = chart.data.datasets[0].data[elements[0].index]
          emit('seek', point.x)
        }
      }
    })
  }

  onMounted(createChart)

  function findNearestPointIndex(time) {
    const data = chart.data.datasets[0].data

    const index = data.findIndex(p => p.x >= time)
    return index === -1 ? data.length - 1 : index
  }

  watch(
      () => props.currentTime,
      (time) => {
        if (!chart) return
        chart.setActiveElements([
          {
            datasetIndex: 0,
            index: findNearestPointIndex(time)
          }
        ])
        chart.update('none')
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