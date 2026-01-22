<script setup>
  import { ref, onMounted, onUnmounted, watch } from "vue";
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

    chart = new Chart(bodyChart, {
      type: 'line',
      data: {
        datasets: [
          // Unplayed line
          {
            data: [
              { x: 0, y: 1 },
              { x: props.duration, y: 1 }
            ],
            borderColor: '#444',
            borderWidth: 12,
            pointRadius: 0
          },
          // Played line
          {
            data: [
              { x: 0, y: 1 },
              { x: 0, y: 1 }
            ],
            borderColor: '#42b883',
            borderWidth: 24,
            pointRadius: 0
          }
        ]
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            display: false,
            min: 0,
            max: 1
          },
          x: {
            type: 'linear',
            min: 0,
            max: props.duration,
            ticks: {
              callback: v => `${Math.floor(v)}s`
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        onClick(event) {
          const x = chart.scales.x.getValueForPixel(event.x)
          emit('seek', x)
        }
      }
    })
  }

  onMounted(createChart)

  watch(
      () => props.currentTime,
      time => {
        if (!chart) return
        chart.data.datasets[1].data[1].x = time
        chart.update('none')
      }
  )

  onUnmounted(() => {
    chart?.destroy()
  })
</script>

<template>
  <div class="timeline">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
  .timeline {
    width: 70%;
    height: 50px;
    margin-inline: auto;
  }
</style>