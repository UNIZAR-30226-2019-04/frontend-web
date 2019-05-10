<template>
  <div style="margin-top: 30px">
    <div>
      <h4>Precio máximo</h4>
      <VueSlideBar v-model="precioMax" :max="1000">
      </VueSlideBar>
      <b-btn v-on:click="nuevoPrecio">Aplicar precio</b-btn>
      <h6>Value: {{precioMax}}</h6>
    </div>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info">Val. minima del vendedor</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion">
        <b-card-body>
          <b-form-group>
            <b-btn v-on:click="minVal(5)" style="background-color: transparent; border: transparent"><label><star-rating value="5" :disabled="true"></star-rating></label></b-btn>
            <b-btn v-on:click="minVal(4)" style="background-color: transparent; border: transparent"><label><star-rating value="4" :disabled="true"></star-rating></label></b-btn>
            <b-btn v-on:click="minVal(3)" style="background-color: transparent; border: transparent"><label><star-rating value="3" :disabled="true"></star-rating></label></b-btn>
            <b-btn v-on:click="minVal(2)" style="background-color: transparent; border: transparent"><label><star-rating value="2" :disabled="true"></star-rating></label></b-btn>
            <b-btn v-on:click="minVal(1)" style="background-color: transparent; border: transparent"><label><star-rating value="1" :disabled="true"></star-rating></label></b-btn>
            <p>Valoración mínima: {{valVendedor}}</p>
          </b-form-group>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1">
        <b-button block href="#" v-b-toggle.accordion-3 variant="info">Categorías</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <radio-group @nuevo-tag="resend" :options="cat.data"></radio-group>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1">
        <b-button block href="#" v-b-toggle.accordion-4 variant="info">Tipo de venta</b-button>
      </b-card-header>
      <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-btn v-on:click="tipovent('normal')" style="background-color: transparent; border: transparent"><label>Venta normal</label></b-btn>
          <b-btn v-on:click="tipovent('subasta')" style="background-color: transparent; border: transparent"><label>Subasta</label></b-btn>
          <b-btn v-on:click="tipovent('trueque')" style="background-color: transparent; border: transparent"><label>Trueque</label></b-btn>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
  import VueSlideBar from 'vue-slide-bar'
  import StarRating from "./StarRating";
  import RadioGroup from "./RadioGroup";
  import axios from "axios";

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
        precioMax: 1000,
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
      }
    },
    mounted () {
      axios
        .get('http://155.210.47.51:5000/categoria/')
        .then(response => (this.cat = response.data));

    }
  }
</script>

<style scoped>

</style>
