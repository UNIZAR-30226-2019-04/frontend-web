<template>
  <div>
    <b-row>
      <b-col>
        <p>Aqui va la caja del producto</p>
        <ProductBox :product=this.producto :key="idProducto"
                    style="margin-bottom: 10px;"></ProductBox>
      </b-col>
      <b-col>
        <div v-if="infoProd.data.tipo === 'normal'">
          <h1> Usted va a comprar el producto con id {{this.idProducto}} vendido por {{this.idVendedor}}. Desea
            continuar?</h1>
          <p> Nombre del vendedor {{ info.data.nombre }} </p>
          <p> y ya aqui vendria lo de PayPal o lo que fuera </p>
        </div>
        <div v-else-if="infoProd.data.tipo === 'subasta'">
          <h1>Esto ES SUBASTA</h1>
          <p>De momento el countdown timer está hardcodeado</p>
          <countdown-timer :end-time="endTim"></countdown-timer>
        </div>
        <div v-else>
          <h1>Esto será trueque</h1>

        </div>
      </b-col>

    </b-row>
    <!--<button @click="sobreProd()">JEEJJEJEJ</button>-->
    <!--<h1>{{this.infoProd.data.tipo}}</h1>-->
    <!--<h1>{{typeof this.infoProd.data.tipo}}</h1>-->
    <!--<h1>Comparison con normal: {{this.infoProd.data.tipo === 'normal'}}</h1>-->
    <!--<h1>Comparison con subasta: {{this.infoProd.data.tipo === 'subasta'}}</h1>-->
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
        producto: `${API_BASE}/producto/${this.idProducto}`,
        loquesea: null,
        inte: 0,
        info: null,
        infoProd: null,
        infoProd_type: null,
        endTim: {
          day: 19,
          month: 5,
          year: 2019,
        },
      }
    },
    mounted() {
      console.log('desde la compra d producto');
      console.log(`${API_BASE}/producto/${this.idProducto}`);
      axios.get(`${API_BASE}/user/${this.idVendedor}`).then(response => (this.info = response));
      axios.get(`${API_BASE}/producto/${this.idProducto}`).then(response => (this.infoProd = response));
      console.log(this.info);
      console.log('PreCalculo');
    },
    computed: {
      // infoProd_type: this.infoProd.data.tipo,
    },
    methods: {
      sobreProd: function () {
        console.log('Al boton ajjajajaj');
        console.log(this.producto);
        console.log(this.infoProd.data);
        console.log(typeof this.infoProd.data.tipo);
      }
    }

  }
</script>

<style scoped>

</style>
