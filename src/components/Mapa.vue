<template>
  <div style="height: 400px; align-self: center;">
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
      <l-marker v-if="!sinProds" :lat-lng="center"></l-marker>
      <l-marker
        v-else
        v-for="(marker, index) in prods"
        :key="marker.id"
        :visible="true"
        :lat-lng="pos[index]"
        :icon="icon()"
        @click=""
      >
        <l-popup :content="marker.titulo"></l-popup>
        <l-tooltip :content="marker.titulo"></l-tooltip>
      </l-marker>
      <l-circle
        :lat-lng="center"
        :radius="radius"
      />
    </l-map>
  </div>
</template>

<script>
  import {LMap, LTileLayer, LMarker, LCircle, LPopup, LTooltip, LIcon} from 'vue2-leaflet';
  import * as L from "leaflet";

  export default {
    components: {LTooltip, LPopup, LMap, LMarker, LTileLayer, LCircle, LIcon},
    props: {
      preview: {
        type: Boolean,
        default: false
      },
      radius: {
        type: Number,
        default: null
      },
      prods: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 5,
        center: {
          lat: 40.38,
          lng: -4.033
        },
        pos: [{lng: -0.8773400, lat: 41.8560600}, {lng: -0.7773400, lat: 42.6560600}, {
          lng: -0.7773400,
          lat: 41.7770600
        }, {lng: -0.8773400, lat: 41.3560600}, {lng: -0.8773400, lat: 41.6560600}, {
          lng: -0.9773400,
          lat: 41.6560600
        }, {lng: -0.9773400, lat: 41.8560600}],
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
      icon: function(){
        const firefoxIcon = L.icon({
          iconUrl: 'https://m.media-amazon.com/images/M/MV5BMDkxZTJjZTEtMDRjMy00Yzk1LWI5YjItMjIwYmVlYzhlZWZhXkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg  ',
          iconSize: [38, 95], // size of the icon
        });
        return firefoxIcon;
      },
      zoomUpdated(zoom) {
        this.zoom = zoom;
      },
      centerUpdated(center) {
        this.center = center;
      },
      boundsUpdated(bounds) {
        this.bounds = bounds;
      },
      getCenter() {
        return this.center;
      }
    },
    computed: {
      sinProds() {
        return this.prods.length > 0;
      }
    }
  }
</script>
