import Chart from 'chart.js/auto'
import { onMounted, onUnmounted } from "vue";

export function useChart(canvasElement, widthAxisX, currentTime, onEvent) {

  let chart = null
  let animationId = null
  let smoothTime = 0

  const createChart = () => {
    const bodyChart = canvasElement.value.getContext('2d')

    if (!bodyChart) {
      return
    }

    chart = new Chart(bodyChart, {
      type: 'line',
      data: {
        datasets: [
          // Unplayed line
          {
            data: [
              { x: 0, y: 1 },
              { x: widthAxisX, y: 1 }
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
            max: widthAxisX,
            ticks: {
              callback: seconds => `${Math.floor(seconds)}s`
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
          onEvent(x)
        }
      }
    })
  }

  const animate = () => {
    if (!chart) {
      return
    }

    smoothTime += (currentTime.value - smoothTime) * 0.15

    chart.data.datasets[1].data[1].x = smoothTime
    chart.update('none')

    animationId = requestAnimationFrame(animate)
  }

  onMounted(() => {
    createChart()
    smoothTime = currentTime.value
    animationId = requestAnimationFrame(animate)
  })

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    chart?.destroy()
  })
}