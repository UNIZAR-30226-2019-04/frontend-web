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
          <b-btn variant="outline-primary">
            <a class="card-link" v-b-modal.modal3>Vender producto</a>
          </b-btn>
          <b-modal id="modal3"
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
            </b-input-group>
            <b-btn class="btn-success" v-on:click="asignarUsuarioTrueque"
                   style="margin-right: 10px; background-color: #20a8d8; font-weight: bold">ASIGNAR
            </b-btn>
            <b-btn @click="ocultarModal">CANCELAR</b-btn>
          </b-modal>
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
          <h2>Precio actual de la subasta:</h2>
          <h2>{{method.precioAux}}€</h2>
        </b-card-title>
        <div v-if="this.$store.state.public_id === method.vendido_por"> <!-- SI EL PRODUCTO SÍ TE PERTENECE -->
          <!--<h1>Este producto te pertenece</h1>-->
          <h3>Tiempo restante:</h3>
          <div v-if="">
            <CountdownTimer :end-time="endTim"></CountdownTimer>
          </div>
          <!--<button @click="sobreProd()">BOTON DEBUG</button>-->
        </div>

        <div v-else> <!-- SI EL PRODUCTO NO TE PERTENECE -->
          <h3>Tiempo restante:</h3>
          <!--Dia actual: {{this.diaActual}} <br/>-->
          <!--Mes actual: {{this.mesActual}} <br/>-->
          <!--Anyo actual: {{this.anyoActual}} <br/>-->
          <!--Dia caduc: {{Number(this.method.fechaexpiracion.split("/")[0])}} <br/>-->
          <!--Mes caduc: {{Number(this.method.fechaexpiracion.split("/")[1])}} <br/>-->
          <!--Anyo caduc: {{Number((this.method.fechaexpiracion.split("/")[2]).split(",")[0])}} <br/>-->
          <CountdownTimer :end-time="endTim"></CountdownTimer>
          <!--<b-btn v-on:click="logTime">Log time</b-btn>-->
          <b-form>
            <div v-if="this.anyoActual <= Number((this.method.fechaexpiracion.split('/')[2]).split(',')[0])">
              <div v-if="this.mesActual < Number((this.method.fechaexpiracion.split('/')[1]))">
                                <b-row>
                                  <b-col>
                                    <b-input type="number" style="font-size: medium" id="precioPujado" v-model="precioPujado"></b-input>
                                  </b-col>
                                  <b-col style="font-size: larger; margin-left: -15px">
                                    €
                                  </b-col>
                                </b-row>
                                <b-button id="pujaRealizada" v-on:click="actPrecio(precioPujado)"
                                          style="font-size: 1rem; font-weight:bold; background-color: #20a8d8; color: white; margin-top: 10px;">
                                  PUJAR
                                </b-button>
              </div>
              <div v-else-if="this.mesActual === Number((this.method.fechaexpiracion.split('/')[1]))">
                <div v-if="this.diaActual < Number((this.method.fechaexpiracion.split('/')[0]))">
                                <b-row>
                                  <b-col>
                                    <b-input type="number" style="font-size: medium" id="precioPujado"
                                             v-model="precioPujado"></b-input>
                                  </b-col>
                                  <b-col style="font-size: larger; margin-left: -15px">
                                    €
                                  </b-col>
                                </b-row>
                                <b-button id="pujaRealizada" v-on:click="actPrecio(precioPujado)"
                                          style="font-size: 1rem; font-weight:bold; background-color: #20a8d8; color: white; margin-top: 10px;">
                                  PUJAR
                                </b-button>
                </div>
                <div v-else-if="this.diaActual === Number((this.method.fechaexpiracion.split('/')[0]))">
                  <div
                    v-if="this.horaActual < Number((this.method.fechaexpiracion.split('/')[2]).split(',')[1].split(':')[0])">
                                <b-row>
                                  <b-col>
                                    <b-input type="number" style="font-size: medium" id="precioPujado"
                                             v-model="precioPujado"></b-input>
                                  </b-col>
                                  <b-col style="font-size: larger; margin-left: -15px">
                                    €
                                  </b-col>
                                </b-row>
                                <b-button id="pujaRealizada" v-on:click="actPrecio(precioPujado)"
                                          style="font-size: 1rem; font-weight:bold; background-color: #20a8d8; color: white; margin-top: 10px;">
                                  PUJAR
                                </b-button>
                  </div>
                  <div
                    v-else-if="this.horaActual === Number((this.method.fechaexpiracion.split('/')[2]).split(',')[1].split(':')[0])">
                    <div
                      v-if="this.minActual < Number((this.method.fechaexpiracion.split('/')[2]).split(',')[1].split(':')[1])">
                                <b-row>
                                  <b-col>
                                    <b-input type="number" style="font-size: medium" id="precioPujado"
                                             v-model="precioPujado"></b-input>
                                  </b-col>
                                  <b-col style="font-size: larger; margin-left: -15px">
                                    €
                                  </b-col>
                                </b-row>
                                <b-button id="pujaRealizada" v-on:click="actPrecio(precioPujado)"
                                          style="font-size: 1rem; font-weight:bold; background-color: #20a8d8; color: white; margin-top: 10px;">
                                  PUJAR
                                </b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--<b-row>-->
            <!--<b-col>-->
            <!--<b-input type="number" style="font-size: medium" id="precioPujado" v-model="precioPujado"></b-input>-->
            <!--</b-col>-->
            <!--<b-col style="font-size: larger; margin-left: -15px">-->
            <!--€-->
            <!--</b-col>-->
            <!--</b-row>-->
            <!--<b-button id="pujaRealizada"v-on:click="actPrecio(precioPujado)"-->
            <!--style="font-size: 1rem; font-weight:bold; background-color: #20a8d8; color: white; margin-top: 10px;">-->
            <!--PUJAR-->
            <!--</b-button>-->

            <div v-else>
              jejejje
            </div>
            <!--<button @click="sobreProd()">BOTON DEBUG</button>-->
            <br/>
          </b-form>
        </div>
      </b-card-body>

      <b-card-body v-else-if="tipo === trueque">
        <div v-if="this.$store.state.public_id === method.vendido_por">
          <h2>Este producto te pertenece</h2>
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
            </b-input-group>
            <b-btn class="btn-success" v-on:click="asignarUsuarioTrueque"
                   style="margin-right: 10px; background-color: #20a8d8; font-weight: bold">ASIGNAR
            </b-btn>
            <b-btn @click="ocultarModal">CANCELAR</b-btn>
          </b-modal>
        </div>
        <div v-else>
          <h1>¡Contacta con el vendedor para comprar el producto!</h1>
          <br/>
          <button class="btn" style="background-color: #20a8d8; color: white; font-weight: bold; font-size: 1rem"
                  @click="nuevoChat">CHATEAR
          </button>
          <br/>
        </div>

      </b-card-body>
      <b-card-body>
        <Mapa ref="mapProd" :preview="preview" :radius="0"></Mapa>
      </b-card-body>
      <!--#TODO: hacer que se vea el mapa con la pos del prodcuto, sin imagen el puntero por defecto-->
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
  import Mapa from "../Mapa";

  export default {
    name: "ProductPage_sell",
    components: {Mapa, ButtonGroups, BRow, CountdownTimer},
    // la funcion que hereda del papi
    data() {
      return {
        preview: true,
        id_vendedor: this.method.vendido_por,
        idProducto: this.method.idProducto,
        endTim: {
          day: Number(this.method.fechaexpiracion.split("/")[0]),
          month: Number(this.method.fechaexpiracion.split("/")[1]),
          year: Number((this.method.fechaexpiracion.split("/")[2]).split(",")[0]),
          hour: Number((this.method.fechaexpiracion.split(",")[1]).split(":")[0]),
          min: Number((this.method.fechaexpiracion.split(",")[1]).split(":")[1])
        },
        precio: this.method.precio,
        precioAux: this.method.precioAux,
        info: null,
        infoProd: null,
        infoProdData: null,
        infoProdData_date: null,
        asignarTrueque: '',
        infoPujaProd: null,
        ultimoPrecioValido: null,
        // mesActual: this.$store.getters.actualMonth,
        diaActual: new Date().getDate(),
        mesActual: new Date().getUTCMonth() + 1,
        anyoActual: new Date().getFullYear(),
        horaActual: new Date().getHours(),
        minActual: new Date().getMinutes(),
      }
    },
    props: {
      method: {type: Function},
    },
    async mounted() {
      console.log('Carga de _sell');
      axios.get(`${API_BASE}user/${this.id_vendedor}`).then(response => (this.info = response.data));
      let response = await axios.get(`${API_BASE}producto/${this.idProducto}`);
      this.infoProdData = response.data;
      this.infoProdData_date = response.data.fechaexpiracion;
      //axios.get(`${API_BASE}producto/${this.idProducto}`).then(response => (this.infoProdData_date = response.data.fechaexpiracion));
      axios.get(`${API_BASE}puja/${this.idProducto}`).then(response => (this.ultimoPrecioValido = response.data));
      this.mesActual = new Date().getUTCMonth() + 1;
      let centro = {
        lat: this.infoProdData.latitud,
        lng: this.infoProdData.longitud
      };
      console.log(centro);
      this.$refs.mapProd.centerUpdated(centro);
      this.$refs.mapProd.zoomUpdated(17);
    },
    methods: {
      logTime() {
        console.log(this.endTim);
      },
      ocultarModal(num) {
        if (num === 1) {
          this.$refs['modalexito'].hide();
          // this.$router.push("/Profile");
        } else if (num === 2) {
          this.$refs['modalerror'].hide();
        } else {
          this.$refs['modalVentaTrueque'].hide()
        }
      },
      async nuevoChat() {
        let url = API_BASE + 'conversacion/';
        let header = {
          Content_Type: 'application/json',
          Authorization: this.$store.getters.token
        };
        let datos = {
          "comprador": this.$store.getters.user,
          "vendedor": this.method.vendido_por,
          "email_comprador": this.$store.getters.name,
          "email_vendedor": ""
        };
        console.log('---------------');
        console.log(this.$store.getters.currentUser);
        console.log('---------------');
        console.log('---------------');
        console.log(datos);
        console.log('---------------');
        console.log('---------------');
        console.log(this.info);
        console.log('---------------');
        let respuesta = await
          axios.post(url, datos, {headers: header}).catch(error => (console.log(error)));
        console.log(respuesta);
        this.$router.push({path: 'Chat', query: {id_conv: respuesta.data}})
      },
      showPrecio() {
        let kk = axios.get(`${API_BASE}puja/${this.idProducto}`).then(response => (this.infoPujaProd = response.data));
      },
      /* Función que actualiza el precio del producto en la subasta */
      actPrecio: function (precioPujado) {
        console.log(precioPujado);
        console.log('Precio inicial: ', this.precio);
        console.log('PrecioAux: ', this.precioAux);
        console.log('El idProducto: ', this.idProducto);
        if (precioPujado > this.precioAux) {
          console.log('El precio pujado es mayor');
          this.actualizarPrecioEnBD(precioPujado, this.idProducto, this.$store.getters.user);
          // this.$router.push('/ProductPage?=idProd=`${this.idProducto}`');
          // this.$router.push({path: 'ProductPage', query: {idProd: this.idProducto}});
        }
        else {
          console.log('El precio pujado es menor');
          // this.showModal(2);
          // this.$('#modalerror').modal('show');
        }
      },
      showModal(number) {
        if (number === 1) {

        } else {
          $('#modalerror').modal('show');
        }
      },
      async actualizarPrecioEnBD(precioPujado, idProducto, usuario) {
        /* Se añade la puja a la lista de pujas del producto */
        let url = API_BASE + 'puja/';
        console.log('La URL donde se hará post de la puja: ', url);
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
        console.log('La respuesta: ', respuesta);
        console.log('al routerpush');
        // await this.$router.push({path: 'Search'});
        // await this.$router.push({path: 'ProductPage', query: {idProd: this.idProducto}});
        location.reload();
        //respuesta = await axios.get(`${API_BASE}producto/${this.idProducto}`);
        //this.method.precioAux = respuesta.data.precioAux;
        console.log('post routerpush');
        //this.precioPujado = '';
      },
      asignarUsuarioTrueque: function () {
        let url = API_BASE + 'producto/' + this.idProducto + '/ventapornick/' + this.asignarTrueque;
        axios.post(url).then(response => {
            this.$router.push({
              path: 'Search'
            });
          }
        ).catch(error => (console.log(error)));
        //#TODO: mostrar mensaje de nick incorrecto.
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
        console.log('Full Year: ', new Date().getFullYear());
        console.log('Get Month: ', new Date().getMonth());
        console.log('Get Day: ', new Date().getDay());
        console.log('Get Date: ', new Date().getDate());
        console.log('Get UTCMonth+1: ', new Date().getUTCMonth() + 1);
        console.log('--------------------------------------');
        console.log('dia: ', this.method.fechaexpiracion.split("/")[0]);
        console.log('mes: ', this.method.fechaexpiracion.split("/")[1]);
        console.log('anyo: ', this.method.fechaexpiracion.split("/")[2]);
        console.log('--------------------------------------');
      }
    }
  }
</script>

<style scoped>

</style>
