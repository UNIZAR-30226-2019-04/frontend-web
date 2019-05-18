<template>
  <div>
    <b-row>
      <b-col>
        <b-card-group columns>
          <!--v-if="index<(porPagina*pagina) && index>=(porPagina*pagina-porPagina)"-->
          <ProductBox v-for="(product, index) in products" :key="index"
                      :product="product"
                      style="margin-bottom: 10px;"></ProductBox>
        </b-card-group>
      </b-col>
      <b-col>
        <h1> Usted va a comprar el producto con id {{this.idProducto}} vendido por {{this.idVendedor}}. Desea
          continuar?</h1>
        <p> y ya aqui vendria lo de PayPal o lo que fuera </p>
      </b-col>
    </b-row>

  </div>
</template>

<script>
  import ProductBox from "./ProductBox";
  import BRow from "bootstrap-vue/src/components/layout/row";

  export default {
    name: "CompraProducto",
    components: {BRow, ProductBox},
    data() {
      return {
        idProducto: this.$route.query.idProd,
        idVendedor: this.$route.query.idVendor,
        loquesea: null,
        inte: 0,
      }
    },
    mounted() {
      console.log('desde la compra d producto');
    }

  }
</script>

<style scoped>

</style>
