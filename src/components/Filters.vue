<template>
  <b-card  style="width: 100%; margin-left: 10px; margin-top: 30px">
    <div>
      <h4>Precio máximo (€)</h4>
      <VueSlideBar v-model="precioMax" lineHeight=6 max=1000
                   :tooltip-styles="{ backgroundColor: '#20a8d8', borderColor: '#20a8d8' }"
                   :labelStyles="{ color: '#4a4a4a', backgroundColor: '#4a4a4a' }"
                   :processStyle="{ backgroundColor: '#20a8d8' }"></VueSlideBar>
      <b-btn v-on:click="nuevoPrecio" variant="outline-primary" style="width: 100%; margin-top: 7px; margin-bottom: 7px">Aplicar precio</b-btn>
    </div>

    <br/>
    <hr/>
    <br/>

    <div>
      <h4>Distancia máxima (€)</h4>
      <VueSlideBar v-model="distMax" lineHeight=6 max=1000
                   :tooltip-styles="{ backgroundColor: '#20a8d8', borderColor: '#20a8d8' }"
                   :labelStyles="{ color: '#4a4a4a', backgroundColor: '#4a4a4a' }"
                   :processStyle="{ backgroundColor: '#20a8d8' }"></VueSlideBar>
      <b-btn v-on:click="nuevaDist" variant="outline-primary" style="width: 100%; margin-top: 7px; margin-bottom: 7px">Aplicar distancia</b-btn>
    </div>

    <br/>
    <hr/>
    <br/>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab" style="text-align: center; vertical-align: middle;">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info" style="font-size: 1.1rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%">Valoración mínima</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion">
        <b-card-body style="margin-top: 10px;">
          <b-form-group>
            <b-btn v-on:click="minVal(5)" style="background-color: transparent; border: transparent"><label><star-rating value="5" :disabled="true"></star-rating></label></b-btn>
            <b-btn v-on:click="minVal(4)" style="background-color: transparent; border: transparent"><label><star-rating value="4" :disabled="true"></star-rating></label></b-btn>
            <b-btn v-on:click="minVal(3)" style="background-color: transparent; border: transparent"><label><star-rating value="3" :disabled="true"></star-rating></label></b-btn>
            <b-btn v-on:click="minVal(2)" style="background-color: transparent; border: transparent"><label><star-rating value="2" :disabled="true"></star-rating></label></b-btn>
            <b-btn v-on:click="minVal(1)" style="background-color: transparent; border: transparent"><label><star-rating value="1" :disabled="true"></star-rating></label></b-btn>
            <!--<p>Valoración mínima: {{valVendedor}}</p>-->
          </b-form-group>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1">
        <b-button block href="#" v-b-toggle.accordion-3 variant="info" style="font-size: 1.1rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%">Categorías</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <radio-group @nuevo-tag="resend" :options="cat.data"></radio-group>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1">
        <b-button block href="#" style="font-size: 1.1rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%" v-b-toggle.accordion-4 variant="info">Tipo de venta</b-button>
      </b-card-header>
      <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-btn v-on:click="tipovent('normal')" style="font-size: 1.1rem; background-color: transparent; border: transparent"><label>Venta normal</label></b-btn>
          <br/>
          <b-btn v-on:click="tipovent('subasta')" style="font-size: 1.1rem; background-color: transparent; border: transparent"><label>Subasta</label></b-btn>
          <br/>
          <b-btn v-on:click="tipovent('trueque')" style="font-size: 1.1rem; background-color: transparent; border: transparent"><label>Trueque</label></b-btn>
          <br/>
        </b-card-body>
      </b-collapse>
    </b-card>
  </b-card>
</template>

<script>
  import VueSlideBar from 'vue-slide-bar'
  import StarRating from "./StarRating";
  import RadioGroup from "./RadioGroup";
  import axios from "axios";
  import {API_BASE} from "../config";

  export default {
    name: "Filters",
    components: {RadioGroup, StarRating, VueSlideBar},
    data() {
      return {
        text: 'Esto es un mensaje',
        tipoVenta: '',
        optionsCat: [{nombre: 'Option 1 '},
          {nombre: 'Option 2 '},
          {nombre: 'Option 3 '},
          {nombre: 'Option 4 '},
          {nombre: 'Option 5 '},],
        cat: [],
        precioMax: 500,
        distMax: 500,
        valVendedor: 1
      }
    },
    methods: {
      minVal :function (newVal) {
        this.valVendedor = newVal;
        let value = 'Val. '+ newVal;
        this.$emit('selected', value, 'valoracion', newVal);
      },
      tipovent :function (newVal) {
        this.tipoVenta = newVal;
        this.$emit('selected', newVal, 'tipo');
      },
      resend : function (val, tipo) {
        console.log(val);
        this.$emit('selected', val, tipo);
      },
      nuevoPrecio: function () {
        this.$emit('precio',this.precioMax);
      },
      nuevaDist: function () {
        this.$emit('dist',this.distMax);
      }
    },
    mounted () {
      axios
        .get(API_BASE + 'categoria/')
        .then(response => (this.cat = response.data));

    }
  }
</script>

<style scoped>

</style>
