<template>
  <div>
    <b-tabs content-class="mt-3" style="margin-top: 20px; margin-left: 5px;">
      <b-tab title="Mis Productos" active style="margin-top: 10px; margin-left: 10px; ">
        <b-card-group columns>
          <ProductBox v-for="(product, index) in prods" :key="index"
                      :product="product"
                      :comprado="false"
                      style="margin-bottom: 10px;"></ProductBox>
        </b-card-group>
      </b-tab>
      <b-tab title="Valoraciones recibidas">
        <UserReview v-for="(val,index) in valGet" :key="index" :valoracion="val"></UserReview>
      </b-tab>
      <b-tab title="Comprados" style="margin-top: 10px; margin-left: 10px; ">
        <b-card-group columns>
          <ProductBox  v-if="comprados.length > 0" v-for="(product, index) in comprados" :key="index"
                      :product="product"
                      :comprado="true"
                      style="margin-bottom: 10px;"></ProductBox>
        </b-card-group>
      </b-tab>
      <b-tab title="Lista de deseos" style="margin-top: 10px; margin-left: 10px; ">
        <b-card-group columns>
          <ProductBox v-for="(product, index) in deseados" :key="index"
                      :product="product"
                      :comprado="false"
                      style="margin-bottom: 10px;"></ProductBox>
        </b-card-group>
      </b-tab>
      <b-tab title="Valoraciones realizadas">
        <UserReview v-for="(val,index) in valDone" :key="index" :valoracion="val"></UserReview>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
  import ProductBox from './ProductBox'
  import ProductItem from './ProdItem'
  import UserReview from './UserReview'
  import axios from 'axios';
  import {API_BASE} from "../config";

  export default {
    name: 'UserTab',
    components: {ProductItem, ProductBox, UserReview},
    data(){
      return {
        prods : [],
        deseados: [],
        valDone : [],
        valGet : [],
        comprados: []
      }
    },
    mounted() {
      let url = API_BASE+'/user/' + this.$store.getters.user;
      axios.get(url).then(response => {
        this.prods = response.data.cajas_productos;
        this.deseados = response.data.deseados;
        this.valDone = response.data.valoraciones_hechas;
        this.valGet = response.data.valoraciones_recibidas;
      });
      url = url + '/comprados';
      axios.get(url).then(response => {
        this.comprados = response.data;
      });
    }
  }
</script>

<style scoped>

</style>
