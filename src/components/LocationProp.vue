<template>
  <div ref="mapContainer" class="w-full h-96"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const mapContainer = ref(null)
let map = null

onMounted(() => {
  // Ensure the container has size
  if (mapContainer.value) {
    mapContainer.value.style.width = '100%'
    mapContainer.value.style.height = '400px' // Adjust as needed
  }

  mapboxgl.accessToken = 'pk.eyJ1IjoidHN1dTAwMDIiLCJhIjoiY20yNjZndnQ0MHk0bDJrb2p1Nmo1Yjk5eiJ9.Waw4blYbVdaixQJzXZtNog'
  
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.5, 40],
    zoom: 9
  })

  map.on('load', () => {
    console.log('Map loaded successfully')
  })

  map.on('error', (e) => {
    console.error('Mapbox error:', e)
  })

  // check
  map.on('style.load', () => {
    console.log('Map style has loaded')
  })

  // Check for specific loading errors
  map.on('styledata', (e) => {
    if (e.dataType === 'style' && map.isStyleLoaded()) {
      console.log('Style has loaded successfully')
    }
  })

  // Force a resize event after a short delay
  setTimeout(() => {
    map.resize()
    console.log('Triggered resize event')
  }, 100)
})
</script>

<style scoped>
</style>