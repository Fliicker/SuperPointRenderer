<template>
  <div id="map-container" ref="mapContainer"></div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import mapboxgl from "mapbox-gl";
import CustomLayer from "@/js/CustomLayer"

mapboxgl.accessToken =
  "pk.eyJ1IjoiZmxpY2tlcjA1NiIsImEiOiJjbGd4OXM1c3cwOWs3M21ta2RiMDhoczVnIn0.lE8NriBf_g3RZWCusw_mZA";

const mapContainer = ref(null);
let map;

onMounted(async () => {
  map = new mapboxgl.Map({
    container: "map-container",
    center: [118.800697, 32.064162], // starting position [lng, lat]
    zoom: 4,
    style: "mapbox://styles/mapbox/dark-v10", // style URL
  });

  map.on('load', ()=>{
    map.addLayer(new CustomLayer())
  })
});
</script>

<style lang="scss">
#map-container {
  width: 100%;
  height: 100%;
}
</style>
