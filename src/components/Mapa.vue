
<template>
  <div style="height: 400px; align-self: center;" >
    <!--<div class="info" style="height: 15%">
      <span>Center: {{ center }}   </span>
      <span>Zoom: {{ zoom }}    </span>
      <span>Bounds: {{ bounds }}   </span>
    </div>-->
    <l-map
      style="height: 100%; width: 100%; align-self: center;"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
  import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';

  export default {
    components: {LMap, LMarker, LTileLayer},
    data () {
      return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 5,
        center: {
          lat: 40.385142747956806,
          lng: -4.033185852475832
        },
        bounds: null
      };
    },
    methods: {
      zoomUpdated (zoom) {
        this.zoom = zoom;
      },
      centerUpdated (center) {
        this.center = center;
      },
      boundsUpdated (bounds) {
        this.bounds = bounds;
      },
      getCenter() {
        return this.center;
      }
    }
  }
</script>
