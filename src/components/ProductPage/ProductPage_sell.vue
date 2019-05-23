<template>
  <div>
    <b-card no-body class="mb-1" style="margin-left: 15px ">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info"
                  style="background-color: #20a8d8; color: white; font-size: 1.3rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%">
          Detalles de la venta
        </b-button>
      </b-card-header>

      <b-card-body v-if="method.tipoVenta === 'normal'">
        {{this.$store.state.public_id}}
        {{method.vendido_por}}
        <div v-if="this.$store.state.public_id === method.vendido_por">
          <h1>ESTE PRODUCTO ES TUYO</h1>
        </div>
        <div v-else>
        <!--<h1>Es un tipo de venta normal</h1>-->
          <br/>
          <b-card-title style="font-size: xx-large"> {{ method.precio }} €</b-card-title>
          <br/>
          <button @click="procesoCompra()" class="btn"
                  style="font-size: 1rem; font-weight:bold; background-color: #20a8d8; color: white; margin-bottom: 5px;"
                  align="center">
            COMPRAR AHORA
          </button>
        </div>
      </b-card-body>

      <b-card-body v-else-if="method.tipoVenta === 'subasta'">
        <!--<h1>Es una subasta</h1>-->
        <div v-if="this.$store.state.public_id === method.vendido_por">
          <h1>ESTE PRODUCTO ES TUYO</h1>
          <h3>Tiempo restante</h3>
          <CountdownTimer :end-time="endTim"></CountdownTimer>
          <h3>{{method.fechaexpiracion}}</h3>
          <h3>{{method.fecha}}</h3>
          <br/>
          <p>------------------------------------------------</p>
          Dia: {{Number(this.method.fechaexpiracion.split("/")[0])}} <br/>
          Mes: {{Number(this.method.fechaexpiracion.split("/")[1])}} <br/>
          Fecha completa: {{this.method.fechaexpiracion}} <br/>
          Anyo: {{Number((this.method.fechaexpiracion.split("/")[2]).split(",")[0])}} <br/>

          <p>------------------------------------------------</p>
          <br/>
        </div>
        <div v-else>
          <b-card-title>Precio actual: {{method.precio}}€</b-card-title>
          <br/>
          <CountdownTimer :end-time="endTim"></CountdownTimer>
          <b-form>
            <b-row>
              <b-col>
                <b-input type="number" v-model="precio"></b-input>
              </b-col>
              <b-col style="font-size: larger; margin-left: -15px">
                €
              </b-col>
            </b-row>
            <b-button v-on:click="actPrecio()"
                      style="font-size: 1rem; font-weight:bold; background-color: #20a8d8; color: white; margin-top: 10px;">PUJAR</b-button>
            <button @click="sobreProd()">BOTON DEBUG</button>
            <br/>
            {{method.fechaexpiracion}}<br/>
            {{method.fechaexpiracion.split("/")[0]}}-
            {{method.fechaexpiracion.split("/")[1]}}-
            {{method.fechaexpiracion.split("/")[2]}}
            <br/>
            {{parseInt(method.fechaexpiracion.split("/")[0])}}-
            {{method.fechaexpiracion.split("/")[1]}}-
            {{method.fechaexpiracion.split("/")[2]}}
            <br/>
            {{typeof method.fechaexpiracion}}
            <br/>
            Mi public_id: {{this.$store.state.public_id}}
            <br/>
          </b-form>
        </div>
      </b-card-body>

      <b-card-body v-else-if="tipo === trueque">
        <div v-if="this.$store.state.public_id === method.vendido_por">
          <h1>ESTE PRODUCTO ES TUYO</h1>
          <p>Esto es lo que se verá si el producto es tuyo y lo quieres asignar a alguien</p>
          <b-btn variant="outline-primary">
            <a class="card-link" v-b-modal.modal2>Vender producto trueque</a>
          </b-btn>
          <b-modal id="modal2"
                   ref="modalVentaTrueque"
                   title="Asignar producto de trueque"
                   header-bg-variant="primary"
                   hide-footer
          >
            <h3 class="my-4">Introduzca el nombre de usuario a quien quiera asignar el trueque del producto</h3>
            <b-input-group class="mb-4">
              <!--<b-input-group-prepend>-->
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
              <!--</b-input-group-prepend>-->
              <b-form-input :type="tipo" class="form-control" v-model="asignarTrueque" placeholder="nick del usuario"
                            autocomplete/>
              <b-form-invalid-feedback id="input-live-feedback3">
                Escriba su contraseña para poder borrar la cuenta (al menos 6 caracteres).
              </b-form-invalid-feedback>
            </b-input-group>
            <b-btn class="btn-success" v-on:click="asignarUsuarioTrueque" style="margin-right: 10px; background-color: #20a8d8; font-weight: bold">ASIGNAR</b-btn>
            <b-btn @click="ocultarModal">CANCELAR</b-btn>
          </b-modal>
        </div>
        <div v-else>
         <h1>Este producto no es mio y quiero comprarlo</h1>
          <br/>
          <button class="btn" style="background-color: #20a8d8; color: white; font-weight: bold" >CHATEAR</button>

        </div>
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
  import BRow from "bootstrap-vue/src/components/layout/row";
  import moment from "moment";

  export default {
    name: "ProductPage_sell",
    components: {BRow, CountdownTimer},
    // la funcion que hereda del papi
    data() {
      return {
        id_vendedor: this.method.vendido_por,
        idProducto: this.method.idProducto,
        endTim: {
          day: Number(this.method.fechaexpiracion.split("/")[0]),
          // day: 31,
          month: Number(this.method.fechaexpiracion.split("/")[1]),
          // month: 7,
          // year: 2019,
          year: Number((this.method.fechaexpiracion.split("/")[2]).split(",")[0]),
        },
        precio_: this.method.precio,
        infoProd: null,
        infoProdData: null,
        infoProdData_date: null,
        asignarTrueque: ''
      }
    },
    props: {
      method: {type: Function},
    },
    mounted() {
      this.method();
      console.log('Carga de _sell');
      axios.get(`${API_BASE}/producto/${this.idProducto}`).then(response => (this.infoProdData = response.data));
      axios.get(`${API_BASE}/producto/${this.idProducto}`).then(response => (this.infoProdData_date = response.data.fechaexpiracion));
    },
    methods: {
      actPrecio: function () {
        this.precioFinal = this.precio;
      },
      ocultarModal() {
        this.$refs['modalVentaTrueque'].hide()
      },
      asignarUsuarioTrueque: function(){
        // TODO: funcion que haga algo cuando se le asigna a un usuario la compra de un trueque
      },
      procesoCompra: function () {
        console.log(this.precio_);
        if (this.method.tipoVenta === 'normal') {
          console.log('Es una venta normal');
        }
        else if (this.method.tipoVenta === 'subasta') {
          console.log('Es una subasta');
        }
        console.log(`${API_BASE}/user/${this.id_vendedor}`);
        console.log(`${API_BASE}/producto/${this.idProducto}`);
        console.log('----------------------------');
        console.log(this.idProducto);
        console.log('idProducto: ', this.method.idProducto);
        console.log('id_vendedor: ', this.method.vendido_por);
        console.log(this.id_vendedor);
        console.log('----------------------------');
        this.$router.push({path: 'CompraProducto', query: {idProd: this.method.idProducto, idVendor: this.method.vendido_por}})
      },
      sobreProd: function () {
        console.log('Al boton ajjajajaj');
        console.log(this.infoProdData);
        // console.log(Date().getFullYear());
        let start = new Date();
        let y = start.getFullYear();
        console.log(y);
        console.log(new Date().getFullYear());
        console.log(new Date().getMonth());
        console.log(new Date().getDay());
        console.log(new Date().getDate());
        console.log(new Date().getUTCMonth() + 1);
        // console.log(this.infoProdData.fechaexpiracion);
        // console.log(this.infoProdData_date);
        // console.log(typeof this.infoProdData.fechaexpiracion);
        // console.log(typeof this.infoProdData.fecha);
        // console.log(typeof this.infoProdData_date);
        // console.log(this.loquesea);
      }
    }
  }
</script>

<style scoped>

</style>
