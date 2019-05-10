<template>
  <div>
    <b-card no-body class="mb-1" style="margin-left: 15px ">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info"
                  style="background-color: #20a8d8; color: white; font-size: 1.3rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%">
          Detalles de la venta
        </b-button>
      </b-card-header>

      <b-card-body v-if="tipo === 'Compra'">
        <b-card-title>{{precioFinal}}€</b-card-title>
        <button>COMPRAR AHORA</button>
      </b-card-body>

      <b-card-body v-else-if="tipo === 'Subasta'">
        <b-card-title>Precio actual: {{precioFinal}}€</b-card-title>
        <CountdownTimer :end-time="endTim"></CountdownTimer>
        <!--<b-input :placeholder="Nueva puja"></b-input>-->
        <b-form>
          <b-input type="number" v-model="precio"></b-input>
          <b-button v-on:click="actPrecio()"
                    style="font-size: 1rem; font-weight:bold; background-color: #20a8d8; color: white; margin-top: 10px;">
            PUJAR
          </b-button>
        </b-form>
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item>{{ method.razones_venta }}</b-list-group-item>
        <img :src="method.zona_geografica">
      </b-list-group>

      <b-card-body v-if="method.trueque">
        <b-card-title>Trueque disponible</b-card-title>
        <b-card-text>{{ method.cambioTrueque }}</b-card-text>
      </b-card-body>

      <!--<b-card-footer>Otras fotos</b-card-footer>-->
    </b-card>
  </div>
</template>

<script>
  import CountdownTimer from "../CountdownTimer";

  export default {
    name: "ProductPage_sell",
    components: {CountdownTimer},
    // la funcion que hereda del papi
    props: {
      method: {type: Function},
      tipo: {type: String}
    },
    data() {
      return {
        endTim: {
          day: 19,
          month: 5,
          year: 2019
        },
        precio: 1,
        precioFinal: 500
      }
    },
    mounted() {
      this.method();
    },
    methods: {
      actPrecio: function () {
        this.precioFinal = this.precio;
      }
    }
  }
</script>

<style scoped>

</style>
