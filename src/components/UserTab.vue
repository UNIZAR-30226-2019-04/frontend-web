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
        <a v-if="!prods.length" style="color: #666666;">
          Vaya, parece que no has subido ningún producto...<br/><br/>
        </a>
      </b-tab>
      <b-tab title="Valoraciones recibidas" style="margin-top: 10px; margin-left: 10px; ">
        <UserReview v-for="(val,index) in valGet" :key="index" :valoracion="val"></UserReview>
        <a v-if="!valGet.length" style="color: #666666;">
          Todavía no te han valorado...<br/><br/>
        </a>
      </b-tab>
      <b-tab title="Comprados" style="margin-top: 10px; margin-left: 10px; ">
        <b-card-group columns>
          <ProductBox  v-if="comprados.length > 0" v-for="(product, index) in comprados" :key="index"
                      :product="product"
                      :comprado="true"
                      style="margin-bottom: 10px;"></ProductBox>
        </b-card-group>
        <a v-if="!comprados.length" style="color: #666666;">
          Esto está muy vacío... ¡Prueba a comprar algo!<br/><br/>
        </a>
      </b-tab>
      <b-tab title="Lista de deseos" style="margin-top: 10px; margin-left: 10px; ">
        <b-card-group columns>
          <ProductBox v-for="(product, index) in deseados" :key="index"
                      :product="product"
                      :comprado="false"
                      style="margin-bottom: 10px;"></ProductBox>
        </b-card-group>
        <a v-if="!deseados.length" style="color: #666666;">
          ¿No deseas ningún producto? :(<br/><br/>
        </a>
      </b-tab>
      <b-tab title="Valoraciones realizadas" style="margin-top: 10px; margin-left: 10px; ">
        <UserReview v-for="(val,index) in valDone" :key="index" :valoracion="val"></UserReview>
        <a v-if="!comprados.valDone" style="color: #666666;">
          ¡No olvides valorar a los usuarios tras las compras!<br/><br/>
        </a>
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
      let url = API_BASE+'user/' + this.$store.getters.user;
      axios.get(url).then(response => {
        this.prods = response.data.cajas_productos;
        this.deseados = response.data.deseados;
        this.valDone = response.data.valoraciones_hechas;
        this.valGet = response.data.valoraciones_recibidas;
      });
      /*url = url + '/comprados';
      axios.get(url).then(response => {
        this.comprados = response.data;
      });*/
    }
  }
</script>

<style scoped>

</style>
