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
        <div v-if="this.$store.state.public_id === method.vendido_por">
          <h1>ESTE PRODUCTO ES TUYO</h1>
        </div>
        <div v-else>
          <br/>
          <h3>Precio:</h3>
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
        <b-card-title>
          <h2>Precio inicial:</h2>
          <h2>{{method.precio}}€</h2>
          <br/>
          <!--Ultimo precio valido {{// this.ultimoPrecioValido.data[this.ultimoPrecioValido.data.length-1].valor}}-->
          <h2>Precio actual de la subasta:</h2>
          <!--{{ultimoPrecioValido}}-->
          <br/>
          <h2>{{variableSuperSuperfinal}}</h2>
          <!--{{ultimoPrecioValido.data[0].valor}}-->
          <!--{{ultimoPrecioValido.data[ultimoPrecioValido.data.length-1].valor}}-->
          <div v-if="this.showPrecioPujado === true">
            <div v-if="precioPujado > this.ultimoPrecioValido.data[this.ultimoPrecioValido.data.length-1].valor">
              <h2>{{precioPujado}}€</h2>
            </div>
          </div>
          <div v-else>
            <h2>{{method.precio}}€</h2>
          </div>
        </b-card-title>
        <div v-if="this.$store.state.public_id === method.vendido_por">
          <h1>Este producto te pertenece</h1>
          <h3>Tiempo restante:</h3>
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
        <div v-else> <!-- SI EL PRODUCTO NO TE PERTENECE -->
          <h3>Tiempo restante:</h3>
          <CountdownTimer :end-time="endTim"></CountdownTimer>
          <b-form>
            <b-row>
              <b-col>
                <b-input type="number" id="precioPujado" v-model="precioPujado"></b-input>
              </b-col>
              <b-col style="font-size: larger; margin-left: -15px">
                €
              </b-col>
            </b-row>
            <b-button id="pujaRealizada"
                      style="font-size: 1rem; font-weight:bold; background-color: #20a8d8; color: white; margin-top: 10px;"
                      v-on:click="actPrecio(precioPujado)"
            >
              PUJAR
            </b-button>
            <button @click="sobreProd()">BOTON DEBUG</button>
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
            <b-btn class="btn-success" v-on:click="asignarUsuarioTrueque"
                   style="margin-right: 10px; background-color: #20a8d8; font-weight: bold">ASIGNAR
            </b-btn>
            <b-btn @click="ocultarModal">CANCELAR</b-btn>
          </b-modal>
        </div>
        <div v-else>
          <h1>Este producto no es mio y quiero comprarlo</h1>
          <br/>
          <button class="btn" style="background-color: #20a8d8; color: white; font-weight: bold">CHATEAR</button>

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
  import ButtonGroups from "../../views/buttons/ButtonGroups";

  export default {
    name: "ProductPage_sell",
    components: {ButtonGroups, BRow, CountdownTimer},
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
        precio: this.method.precio,
        infoProd: null,
        infoProdData: null,
        infoProdData_date: null,
        asignarTrueque: '',
        precioPujado: this.precio,
        showPrecioPujado: false,
        infoPujaProd: null,
        ultimoPrecioValido: null,
        var_: null,
        variableSuperSuperfinal: null,
      }
    },
    props: {
      method: {type: Function},
    },
    async mounted() {
      this.method();
      console.log('Carga de _sell');
      axios.get(`${API_BASE}producto/${this.idProducto}`).then(response => (this.infoProdData = response.data));
      axios.get(`${API_BASE}producto/${this.idProducto}`).then(response => (this.infoProdData_date = response.data.fechaexpiracion));
      axios.get(`${API_BASE}puja/${this.idProducto}`).then(response => (this.ultimoPrecioValido = response.data));
      this.var_ = 'jeje';
      console.log(this.var_);

    },
    methods: {
      showPrecio(){
        let kk = axios.get(`${API_BASE}puja/${this.idProducto}`).then(response => (this.infoPujaProd = response.data));
      },
      /* Función que actualiza el precio del producto en la subasta */
      actPrecio: function (precioPujado) {
        this.precioFinal = this.precio;
        console.log(precioPujado);
        console.log(this.precio);
        console.log(this.idProducto);
        if (precioPujado > this.precio) {
          console.log('El precio pujado es mayor');
          console.log(this.showPrecioPujado);
          this.showPrecioPujado = true;
          this.precio = precioPujado;
          console.log(this.showPrecioPujado);
          console.log(this.$store.getters.token);
          this.actualizarPrecioEnBD(precioPujado, this.idProducto, this.$store.getters.user);
        }
        else {
          console.log('El precio pujado es menor');
          this.showPrecioPujado = false;
        }
      },
      async actualizarPrecioEnBD(precioPujado, idProducto, usuario) {
        /* Se añade la puja a la lista de pujas del producto */
        let url = API_BASE + 'puja/';
        console.log(url);
        let header = {
          Content_Type: 'application/json',
          Authorization: this.$store.getters.token
        };
        let datos = {
          "valor": Number(precioPujado),
          "producto": idProducto,
          "fecha": new Date(),
          "usuario": usuario
        };
        let respuesta = await axios.post(url, datos, {headers: header}).catch(error => (console.log(error)));
        console.log('La respuesta: ', respuesta); /* Devuelve si ha sido exitosa o no */
        /*----------------------------------------------*/
        console.log('U: ',this.ultimoPrecioValido);
        this.ultimoPrecioValido = await axios.get(`${API_BASE}puja/${idProducto}`).then(response => (this.infoPujaProd = response.data));
        console.log('infoPujaProd: ', this.infoPujaProd);
        console.log('ultimoPrecioValido: ', this.ultimoPrecioValido);
        console.log(this.ultimoPrecioValido.data[this.ultimoPrecioValido.data.length-1]);
        console.log('Ultimo precio valido:', this.ultimoPrecioValido.data[this.ultimoPrecioValido.data.length-1].valor);
        this.variableSuperSuperfinal = this.ultimoPrecioValido.data[this.ultimoPrecioValido.data.length-1].valor;

      },
      getAuthHeader() {
        return this.$store.getters.token;
      },
      ocultarModal() {
        this.$refs['modalVentaTrueque'].hide()
      },
      asignarUsuarioTrueque: function () {
        // TODO: funcion que haga algo cuando se le asigna a un usuario la compra de un trueque
      },
      procesoCompra: function () {
        console.log(this.precio);
        if (this.method.tipoVenta === 'normal') {
          console.log('Es una venta normal');
        }
        else if (this.method.tipoVenta === 'subasta') {
          console.log('Es una subasta');
        }
        console.log(`${API_BASE}user/${this.id_vendedor}`);
        console.log(`${API_BASE}producto/${this.idProducto}`);
        console.log('----------------------------');
        console.log(this.idProducto);
        console.log('idProducto: ', this.method.idProducto);
        console.log('id_vendedor: ', this.method.vendido_por);
        console.log(this.id_vendedor);
        console.log('----------------------------');
        this.$router.push({
          path: 'CompraProducto',
          query: {idProd: this.method.idProducto, idVendor: this.method.vendido_por}
        })
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
