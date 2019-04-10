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
        <b-button block href="#" v-b-toggle.accordion-1 variant="info">Val. minima del vendedor</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion">
        <b-card-body>
          <b-form-group>
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
          <radio-group :options="optionsCat"></radio-group>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
  import VueSlideBar from 'vue-slide-bar'
  import StarRating from "./StarRating";
  import RadioGroup from "./RadioGroup";

  export default {
    name: "Filters",
    components: {RadioGroup, StarRating, VueSlideBar},
    data() {
      return {
        text: 'Esto es un mensaje',
        optionsCat: [{text: 'Option 1 ', value: '1'},
          {text: 'Option 2 ', value: '2'},
          {text: 'Option 3 ', value: '3'},
          {text: 'Option 4 ', value: '4'},
          {text: 'Option 5 ', value: '5'},],
        value: 100,
        valVendedor: 1
      }
    },
    methods: {
      minVal :function (newVal) {
        this.valVendedor = newVal;
      }
    }
  }
</script>

<style scoped>

</style>
