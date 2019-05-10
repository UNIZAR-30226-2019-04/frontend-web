<template>
  <div style="margin-top: 30px">
    <div>
      <h4>Precio máximo</h4>
      <VueSlideBar v-model="value">
      </VueSlideBar>
      <h6>Value: {{value}}</h6>
    </div>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info" style="font-size: 1.1rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%">Val. minima del vendedor</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion">
        <b-card-body>
          <b-form-group style="font-size: 1.1rem">
            <b-btn v-on:click="minVal(4)" style="background-color: transparent; border: transparent"><label><star-rating value="4" :disabled="true"></star-rating></label></b-btn><br>
            <b-btn v-on:click="minVal(3)" style="background-color: transparent; border: transparent"><label><star-rating value="3" :disabled="true"></star-rating></label></b-btn><br>
            <b-btn v-on:click="minVal(2)" style="background-color: transparent; border: transparent"><label><star-rating value="2" :disabled="true"></star-rating></label></b-btn><br>
            <b-btn v-on:click="minVal(1)" style="background-color: transparent; border: transparent"><label><star-rating value="1" :disabled="true"></star-rating></label></b-btn><br>
            <p>Valoración mínima: {{valVendedor}}</p>
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
        optionsCat: [{nombre: 'Option 1 '},
          {nombre: 'Option 2 '},
          {nombre: 'Option 3 '},
          {nombre: 'Option 4 '},
          {nombre: 'Option 5 '},],
        cat: [],
        value: 100,
        valVendedor: 1
      }
    },
    methods: {
      minVal :function (newVal) {
        this.valVendedor = newVal;
        let value = 'Val. '+newVal;
        this.$emit('selected', value);
      },
      resend : function (val) {
        console.log(val);
        this.$emit('selected', val);
      }
    },
    mounted () {
      axios
        .get('http://155.210.47.51:5000/categoria/')
        .then(response => (this.cat = response.data))
    }
  }
</script>

<style scoped>

</style>
