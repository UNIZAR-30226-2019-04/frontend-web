<template>
  <div>
    <div style="position: center ">
      <h1>ESTO ES UNA PRUEBA</h1>
      <div v-if="this.infoUser.nombre !== null">
        <h1>Hola {{this.infoUser.nombre}}!</h1>
      </div>
      <div v-else>
        <h1>Hola {{this.infoUser.username}}!</h1>
      </div>
    </div>
    {{this.$store.state.public_id}}
    <br/>
    {{this.public_id}}
    <br/>
    {{this.infoUser.nombre}}
    <div style="margin-left: 15px">
      <!--<b-row>-->
      <!--<h1>Productos para ti</h1>-->
      <!--</b-row>-->
      <b-row>
        <b-col>
          <h1>Productos para ti</h1>
          <ProductBox span v-for="(product,index) in products.slice(0,5)" :key="index"
                      :product="product"
                      :comprado="false"
                      style="margin-bottom: 10px;"></ProductBox>
        </b-col>
        <b-col>
          <h1>Productos nuevos</h1>
          <ProductBox v-for="(product,index) in products.slice(0,5)" :key="index"
                      :product="product"
                      :comprado="false"
                      style="margin-bottom: 10px;"></ProductBox>
        </b-col>

      </b-row>

      <h1>rrtgjdkfnalrjvngslxkgbjnwñrtkjgnbsñgj </h1>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <!--<span>-->
      <!--<ProductBox v-for="(product,index) in products" :key="index"-->
      <!--:product="product"-->
      <!--:comprado="false"-->
      <!--style="margin-bottom: 10px;"></ProductBox>-->
      <!--</span>-->
      <h2 style="font-size:3rem;">Showcase</h2>
      <div class="showcase__carousel--container">
        <i class="fa fa-chevron-left" style="font-size:10rem; display:inline-block; float:left;"></i>
        <div class="showcase__carousel--content">
          <div class="showcase__carousel--item">
            <p>jejejeje</p>
          </div>
          <div class="showcase__carousel--item">
            <p>jejejeje</p>
          </div>
          <div class="showcase__carousel--item">
            <p>jejejeje</p>
          </div>
          <div class="showcase__carousel--item">
            <p>jejejeje</p>
          </div>

          <i class="fa fa-chevron-right" style="font-size:10rem; display:inline-block; float:right;"></i>
        </div>
      </div>
      <br/>
      <br/>
      <br/>

      <!--<b-row>-->
      <!--<ProductBox :product=product :key="product.id"-->
      <!--style="margin-bottom: 10px;"></ProductBox>-->
      <!--</b-row>-->
      <b-row>
        <h1>Productos nuevos</h1>
      </b-row>
    </div>
    <br/>
    <button @click="loquesea()">BOTON</button>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <h1>---------------------------------------------------------------------------------------------</h1>
    <br/>
    <br/>
    <br/>
    <br/>


  </div>
</template>

<script>
  import axios from "axios";
  import {API_BASE} from "../../config";
  import ProductBox from "../../components/ProductBox";
  import BRow from "bootstrap-vue/src/components/layout/row";
  import BCarouselSlide from "bootstrap-vue/src/components/carousel/carousel-slide";

  export default {
    name: "Dashboard",
    components: {BCarouselSlide, BRow, ProductBox},
    data() {
      return {
        temporary_public_id: "bbf845ee-c5cb-4a03-a7c0-7efbb101c48a",
        public_id: this.$store.state.public_id,
        infoUser: null,
        total: 0,
        maxComponentsRecomended: 5,
        cards: [
          {
            headline: "Makes App available Offline",
            text:
              "By using the CachingAPI all static elements on an app can be pre-cached",
            imgName: "setting.svg"
          },
          {
            headline: "Use background sync to defer actions",
            text:
              "User inputs entered when offline are sent in the background once they get connectivity.",
            imgName: "cloud.svg"
          },
          {
            headline: "Send Push Notifications",
            text:
              "The Notifications API lets us send push notifications to re-engage users.",
            imgName: "antenna.svg"
          }
        ]
      }
    },
    mounted() {
      axios.get(`${API_BASE}user/${this.public_id}`).then(response => (this.infoUser = response.data));
      axios.get(`${API_BASE}producto/`).then(response => (this.productos = response.data));
      axios.get(`${API_BASE}producto/`).then(response => {
        this.products = response.data.productos;
        this.total = response.data.resultados;
        // console.log(response);
      });
    },
    methods: {
      loquesea: function () {
        console.log('JJEJEJEJ');
        console.log('JJEJEJEJ');
        // console.log(this.$store.state.public_id);
        console.log(typeof this.productos.productos);
        console.log(this.productos.productos);
        console.log(this.products);
        let product = this.products[0];
        console.log('El producto 0: ');
        console.log(product);
      }
    }
  }
</script>

<style scoped>

</style>
