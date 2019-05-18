<template>
  <div>
    <b-row>
      <b-col>
        <p>Aqui va la caja del producto</p>
        <ProductBox v-for="(product, index) in products" :key="index"
                    :product="product"
                    style="margin-bottom: 10px;"></ProductBox>
      </b-col>
      <b-col>
        <h1> Usted va a comprar el producto con id {{this.idProducto}} vendido por {{this.idVendedor}}. Desea
          continuar?</h1>
        <p> Nombre del vendedor {{ info.data.nombre }} </p>
        <p> y ya aqui vendria lo de PayPal o lo que fuera </p>
      </b-col>
    </b-row>

  </div>
</template>

<script>
  import ProductBox from "./ProductBox";
  import BRow from "bootstrap-vue/src/components/layout/row";
  import axios from "axios";
  import {API_BASE} from "../config";

  export default {
    name: "CompraProducto",
    components: {BRow, ProductBox},
    data() {
      return {
        idProducto: this.$route.query.idProd,
        idVendedor: this.$route.query.idVendor,
        loquesea: null,
        inte: 0,
        info: null,
      }
    },
    mounted() {
      console.log('desde la compra d producto');
      axios.get(`${API_BASE}/user/${this.idVendedor}`).then(response => (this.info = response));
      console.log(this.info);
    }

  }
</script>

<style scoped>

</style>
