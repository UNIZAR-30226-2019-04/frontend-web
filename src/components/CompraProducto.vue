<template>
  <div>
    <b-row>
      <b-col style="margin-left: 5%" cols="4">
        <p>Aqui va la caja del producto</p>
        <!--<p>{{producto}}</p>-->
        <!--<p>{{infoProd}}</p>-->
        <ProductBox :product=infoProdData :key=idProducto
                    style="margin-bottom: 10px;"></ProductBox>
      </b-col>
      <b-col style="margin-left: 2.5%; margin-right: 5%">
        <div v-if="infoProdData.tipo === 'normal'">
          <h1> Usted va a comprar el producto con id {{this.idProducto}} vendido por {{this.idVendedor}}. Desea
            continuar?</h1>
          <p> Nombre del vendedor {{ info.data.nombre }} </p>
          <p> y ya aqui vendria lo de PayPal o lo que fuera </p>
        </div>
        <div v-else-if="infoProdData.tipo === 'subasta'">
          <h1>Esto ES SUBASTA</h1>
          <p>{{infoProdData.fecha}}</p>
          <p>De momento el countdown timer está hardcodeado</p>
          <countdown-timer :end-time="endTim"></countdown-timer>
        </div>
        <div v-else>
          <h1>Esto será trueque</h1>
        </div>
      </b-col>
    </b-row>
    <button @click="sobreProd()">JEEJJEJEJ</button>
  </div>
</template>

<script>
  import ProductBox from "./ProductBox";
  import BRow from "bootstrap-vue/src/components/layout/row";
  import axios from "axios";
  import {API_BASE} from "../config";
  import CountdownTimer from "./CountdownTimer";


  export default {
    name: "CompraProducto",
    components: {CountdownTimer, BRow, ProductBox},
    data() {
      return {
        idProducto: this.$route.query.idProd,
        idVendedor: this.$route.query.idVendor,
        producto: `${API_BASE}/producto/${this.$route.query.idProd}`,
        loquesea: null,
        inte: 0,
        info: null,
        infoProd: null,
        infoProdData: null,
        infoProd_type: null,
        // fechaFin: this.infoProd.data.fecha,
        endTim: {
          // day: null,
          // month: null,
          // year: null,
          day: 5,
          month: 6,
          year: 2019,
        },
      }
    },
    mounted() {
      console.log('desde la compra d producto');
      console.log(`${API_BASE}/producto/${this.idProducto}`);
      axios.get(`${API_BASE}/user/${this.idVendedor}`).then(response => (this.info = response));
      // axios.get(`${API_BASE}/producto/${this.idProducto}`).then(response => (this.infoProd = response));
      axios.get(`${API_BASE}/producto/${this.idProducto}`).then(response => (this.infoProdData = response.data));
      console.log('PreCalculo');
    },
    computed: {
      // infoProd_type: this.infoProd.data.tipo,
    },
    methods: {
      sobreProd: function () {
        console.log('Al boton ajjajajaj');
      }
    }

  }
</script>

<style scoped>

</style>
