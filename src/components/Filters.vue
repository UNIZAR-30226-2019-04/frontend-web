<template>
  <div style="margin-top: 30px">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info">Valoración media del vendedor</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion">
        <b-card-body>
          <b-card-text>I start opened because</b-card-text>
          <b-form-group>
            <b-form-radio-group id="basicRadios">
              <input type="radio" id="one" value="One">
              <label for="one">
                <star-rating value="4" :disabled="true"></star-rating>
              </label>
              <br/>
              <input type="radio" id="two" value="Two">
              <label for="two">
                <star-rating value="3" :disabled="true"></star-rating>
              </label>
              <br/>
              <input type="radio" id="three" value="Three">
              <label for="three">
                <star-rating value="3" :disabled="true"></star-rating>
              </label>
              <br/>
              <input type="radio" id="four" value="Four">
              <label for="four">
                <star-rating value="3" :disabled="true"></star-rating>
              </label>
            </b-form-radio-group>
          </b-form-group>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1">
        <b-button block href="#" v-b-toggle.accordion-2 variant="info">Precio</b-button>
      </b-card-header>
      <!--<b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">-->

          <VueSlideBar v-model="value">
          </VueSlideBar>
      <!--</b-collapse>-->
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
        value: 0
      }
    }
  }
</script>

<style scoped>

</style>
