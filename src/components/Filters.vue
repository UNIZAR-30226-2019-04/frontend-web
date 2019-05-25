<template>
  <b-card  style="width: 100%; margin-left: 10px; margin-top: 30px">
    <div>
      <h5>Precio máximo (€)</h5>
      <VueSlideBar style="margin: 0 7px;" lineHeight=6 max=10000
                   v-model="precioMax"
                   :data="priceData"
                   :range="priceRange"
                   :tooltip-styles="{ backgroundColor: '#20a8d8', borderColor: '#20a8d8' }"
                   :labelStyles="{ color: '#4a4a4a', backgroundColor: '#4a4a4a' }"
                   :processStyle="{ backgroundColor: '#d8d8d8' }"
      ></VueSlideBar>
      <b-btn v-on:click="nuevoPrecio" variant="outline-primary" style="width: 100%; margin-top: 7px; margin-bottom: 7px">Aplicar precio</b-btn>
    </div>

    <br/>
    <hr/>
    <br/>

    <div>
      <h5>Distancia máxima (m)</h5>
      <VueSlideBar style="margin: 0 7px;" lineHeight=6
                   v-model="distMax"
                   :data="radiusData"
                   :range="radiusRange"
                   :tooltip-styles="{ backgroundColor: '#20a8d8', borderColor: '#20a8d8' }"
                   :labelStyles="{ color: '#4a4a4a', backgroundColor: '#4a4a4a' }"
                   :processStyle="{ backgroundColor: '#d8d8d8' }"
      ></VueSlideBar>
      <b-btn v-on:click="nuevaDist" variant="outline-primary" style="width: 100%; margin-top: 7px; margin-bottom: 7px">Aplicar distancia</b-btn>
    </div>

    <br/>
    <hr/>
    <br/>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab" style="text-align: center; vertical-align: middle;">
        <b-button block href="#" v-b-toggle.accordion-1 variant="primary" style="height: 100%; font-size: 1rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%">Valoración mínima</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion">
        <b-card-body style="margin-top: 10px; width: 100%; ">
          <b-form-group style="width: 100%; ">
            <b-btn v-on:click="minVal(5)" style="width: 110%; background-color: transparent; border: transparent"><label><star-rating value="5" :disabled="true"></star-rating></label></b-btn>
            <b-btn v-on:click="minVal(4)" style="width: 110%; background-color: transparent; border: transparent"><label><star-rating value="4" :disabled="true"></star-rating></label></b-btn>
            <b-btn v-on:click="minVal(3)" style="width: 110%; background-color: transparent; border: transparent"><label><star-rating value="3" :disabled="true"></star-rating></label></b-btn>
            <b-btn v-on:click="minVal(2)" style="width: 110%; background-color: transparent; border: transparent"><label><star-rating value="2" :disabled="true"></star-rating></label></b-btn>
            <b-btn v-on:click="minVal(1)" style="width: 110%; background-color: transparent; border: transparent"><label><star-rating value="1" :disabled="true"></star-rating></label></b-btn>
            <!--<p>Valoración mínima: {{valVendedor}}</p>-->
          </b-form-group>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1">
        <b-button block href="#" v-b-toggle.accordion-3 variant="primary" style="height: 100%; font-size: 1rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%">Categorías</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <radio-group @nuevo-tag="resend" :options="cat.data"></radio-group>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1">
        <b-button block href="#" style="height: 100%; font-size: 1rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%" v-b-toggle.accordion-4 variant="primary">Tipo de venta</b-button>
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
        valVendedor: 1,
        radiusData: [
          100,
          200,
          500,
          750,
          1000,
          5000,
          15000,
          30000,
          45000,
          60000,
          90000,
          120000,
          300000
        ],
        radiusRange: [
          {
            label: '100 m'
          },
          {
            label: '200 m',
            isHide: true
          },
          {
            label: '500 m',
            isHide: true
          },
          {
            label: '750 m',
            isHide: true
          },
          {
            label: '1 km'
          },
          {
            label: '5 km',
            isHide: true
          },
          {
            label: '15 km',
            isHide: true
          },
          {
            label: '30 km',
            isHide: true
          },
          {
            label: '45 km'
          },
          {
            label: '60 km',
            isHide: true
          },
          {
            label: '90 km',
            isHide: true
          },
          {
            label: '120 km',
            isHide: true
          },
          {
            label: '300 km'
          }
        ],
        priceData: [
          10,
          20,
          50,
          100,
          200,
          500,
          1000,
          2000,
          5000,
          10000,
          20000,
          50000,
          100000,
          200000,
          500000,
          1000000
        ],
        priceRange: [
          {
            label: '10 €'
          },
          {
            label: '20 €',
            isHide: true
          },
          {
            label: '50 €',
            isHide: true
          },
          {
            label: '100 €',
            isHide: true
          },
          {
            label: '200 €',
            isHide: true
          },
          {
            label: '500 €',
          },
          {
            label: '1000 €',
            isHide: true
          },
          {
            label: '2000 €',
            isHide: true
          },
          {
            label: '5000 €',
            isHide: true
          },
          {
            label: '10 000 €',
            isHide: true
          },
          {
            label: '20 000 €',
          },
          {
            label: '50 000 €',
            isHide: true
          },
          {
            label: '100 000 €',
            isHide: true
          },
          {
            label: '200 000 €',
            isHide: true
          },
          {
            label: '500 000 €',
            isHide: true
          },
          {
            label: '1M €',
          },
        ]
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
