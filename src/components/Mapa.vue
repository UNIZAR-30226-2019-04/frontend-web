
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
      :options="options"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="center" ></l-marker>
      <l-circle
        :lat-lng="center"
        :radius="radius"
      />
    </l-map>
  </div>
</template>

<script>
  import {LMap, LTileLayer, LMarker, LCircle } from 'vue2-leaflet';

  export default {
    components: {LMap, LMarker, LTileLayer, LCircle},
    props: {
      preview: {
        type: Boolean,
        default: false
      },
      radius: {
        type: Number,
        default: null
      }
    },
    data () {
      return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 5,
        center: {
          lat: 40.38,
          lng: -4.033
        },
        bounds: null,
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        options: {
          dragging: !this.preview,
          boxZoom: !this.preview,
          doubleClickZoom: this.preview ? 'center' : true,
          scrollWheelZoom: this.preview ? 'center' : true
        }
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
