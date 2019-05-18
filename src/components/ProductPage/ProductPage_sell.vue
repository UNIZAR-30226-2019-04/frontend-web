<template>
  <div>
    <b-card no-body class="mb-1" style="margin-left: 15px ">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info"
                  style="background-color: #20a8d8; color: white; font-size: 1.3rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%">
          Detalles de la venta
        </b-button>
      </b-card-header>

      <b-card-body v-if="tipo === normal">
        <!--<h1>Es un tipo de venta normal</h1>-->
        <br/>
        <b-card-title style="font-size: xx-large"> {{ method.precio }} €</b-card-title>
        <br/>
        <button @click="procesoCompra()" class="btn"
                style="font-size: 1rem; font-weight:bold; background-color: #20a8d8; color: white; margin-bottom: 5px;"
                align="center">
          COMPRAR AHORA
        </button>
      </b-card-body>

      <b-card-body v-else-if="tipo === subasta">
        <h1>Es una subasta</h1>
        <b-card-title>Precio actual: {{method.precio}}€</b-card-title>
        <br/>
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

      <b-card-body v-else-if="tipo === trueque">
        <b-card-title>Trueque disponible</b-card-title>
        <b-card-text>{{ method.cambioTrueque }}</b-card-text>
      </b-card-body>


      <b-list-group flush>
        <b-list-group-item>{{ method.razones_venta }}</b-list-group-item>
        <img :src="method.zona_geografica">
      </b-list-group>

      <!--<b-card-footer>Otras fotos</b-card-footer>-->
    </b-card>
  </div>
</template>

<script>
  import CountdownTimer from "../CountdownTimer";
  import {API_BASE} from "../../config";
  import axios from "axios";

  export default {
    name: "ProductPage_sell",
    components: {CountdownTimer},
    // la funcion que hereda del papi
    data() {
      return {
        id_vendedor: this.method.vendido_por,
        idProducto: this.method.idProducto,
        endTim: {
          day: 19,
          month: 5,
          year: 2019,
        },
        precio_: this.method.precio,
      }
    },
    props: {
      method: {type: Function},
    },
    mounted() {
      this.method();
      console.log('Carga de _sell');
      // console.log('El id_vendedor es: ', this.id_vendedor);
      // console.log(${API_BASE}/user/${this.id_vendedor});
      // axios.get(`${API_BASE}/user/${this.id_vendedor}`).then(response => (this.info = response));
    },
    methods: {
      actPrecio: function () {
        // this.precioFinal = this.precio;
      },

      procesoCompra: function () {
        console.log(this.precio_);
        if(this.method.tipoVenta === 'normal'){
          console.log('Es una venta normal');
        }
        else if(this.method.tipoVenta === 'subasta'){
          console.log('Es una subasta');
        }
        console.log(`${API_BASE}/user/${this.id_vendedor}`);
        console.log(`${API_BASE}/producto/${this.idProducto}`);
        this.$router.push({path: 'CompraProducto', query: {idProd: this.idProducto, idVendor: this.id_vendedor}})
      }
    }
  }
</script>

<style scoped>

</style>
