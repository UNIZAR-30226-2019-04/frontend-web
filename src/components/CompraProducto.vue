<template>
  <div>
    <b-row>
      <b-col style="margin-left: 5%" cols="4">
        <!--<p>{{producto}}</p>-->
        <!--<p>{{infoProd}}</p>-->
        <ProductBox :product=infoProdData :key=idProducto
                    style="margin-bottom: 10px;"></ProductBox>
      </b-col>
      <b-col style="margin-left: 2px; margin-right: 5%">
        <div v-if="infoProdData.tipo === 'normal'">
          <h1> Usted va a comprar el producto "{{this.infoProdData.titulo}}" vendido por {{this.info.nick}}.</h1>
          <h2> ¡Continúe con la compra! </h2>
          <b-tabs content-class="mt-3" style="margin-top: 20px; margin-left: 5px;">
            <b-tab title="Pago en efectivo" active style="margin-top: 10px; margin-left: 0px; ">
              <h3>¡Contacta con el vendedor!</h3>
              <v-btn style="background-color: green; font-weight: bold; color: white;" @click="nuevoChat">Chat</v-btn>

            </b-tab>
            <b-tab title="Pago por PayPal" style="margin-top: 10px; margin-left: 0px; ">
              <h3>PayPal</h3>
              <p> Nombre del vendedor {{ info.nombre }} </p>
              <v-btn style="background-color: green; font-weight: bold; color: white;" @click="pagoPayPal">Pago con PayPal</v-btn>
              <br/>
              <!--<b-btn v-on:click="ventana">BOTON VENTANA</b-btn>-->
            </b-tab>
          </b-tabs>


        </div>
        <!--<div v-else-if="infoProdData.tipo === 'subasta'">-->
          <!--<h1>Esto ES SUBASTA</h1>-->
          <!--<p>{{infoProdData.fechaexpiracion}}</p>-->
          <!--<p>{{infoProdData_date}}</p>-->
          <!--<p>De momento el countdown timer está hardcodeado</p>-->
          <!--<countdown-timer :end-time="endTim"></countdown-timer>-->
        <!--</div>-->
        <!--<div v-else>-->
          <!--<h1>Esto será trueque</h1>-->
        <!--</div>-->
      </b-col>
    </b-row>
    <!--{{typeof infoProdData_date}}-->
    <!--<br/>-->
    <!--{{this.infoProdData_date}}-->
  </div>
</template>

<script>
  import ProductBox from "./ProductBox";
  import BRow from "bootstrap-vue/src/components/layout/row";
  import axios from "axios";
  import {API_BASE} from "../config";
  import CountdownTimer from "./CountdownTimer";
  import PayPal from 'vue-paypal-checkout'

  export default {
    name: "CompraProducto",
    components: {CountdownTimer, BRow, ProductBox, PayPal},
    data() {
      return {
        idProducto: this.$route.query.idProd,
        idVendedor: this.$route.query.idVendor,
        // producto: `${API_BASE}/producto/${this.$route.query.idProd}`,
        // loquesea: null,
        // inte: 0,
        info: null,
        infoProd: null,
        infoProdData: null,
        infoProdData_date: null,
        infoProd_type: null,
        loquesea: null,
        endTim: {
          // day: null,
          // month: null,
          // year: null,
          // day: this.infoProdData.fechaexpiracion.split('/')[0],
          day: 5,
          month: 6,
          year: 2019,
        },
      }
    },
    mounted() {
      console.log('desde la compra d producto');
      console.log(`${API_BASE}producto/${this.idProducto}`);
      axios.get(`${API_BASE}user/${this.idVendedor}`).then(response => (this.info = response.data));
      axios.get(`${API_BASE}producto/${this.idProducto}`).then(response => (this.infoProdData = response.data));
      axios.get(`${API_BASE}producto/${this.idProducto}`).then(response => (this.infoProdData_date = response.data.fechaexpiracion));
      console.log('PreCalculo');
      console.log(this.infoProdData.fechaexpiracion);
    },
    created() {
      // endTim: infoProdData.fechaexpiracion;
      console.log('DESDE CREATTEEEEED');
      console.log(this.infoProdData.fechaexpiracion);
    },
    methods: {
      ventana(url){
        window.open(url, "_blank","toolbar=yes,top=500,left=500,width=650,height=650");
      },
      async pagoPayPal(){
        console.log(this.$store.getters.user);
        let urlPago = API_BASE + 'paypal/venta_producto/' + this.idProducto + '/' + this.$store.getters.user;
        console.log(urlPago);
        let urlToPay;

        let response = await axios.post(urlPago);
        urlToPay = response.data.link;
        console.log('url: ', urlToPay);
        console.log('url_t: ', typeof urlToPay);

        this.ventana(urlToPay);
      },
      async nuevoChat() {
        let url = API_BASE + 'conversacion/';
        let header = {
          Content_Type: 'application/json',
          Authorization: this.$store.getters.token
        };
        let datos = {
          "comprador": this.$store.getters.user,
          "vendedor": this.idVendedor,
          "email_comprador": this.$store.getters.name,
          "email_vendedor": this.info.email
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
        let respuesta = await axios.post(url, datos, {headers: header}).catch(error => (console.log(error)));
        console.log(respuesta);
        this.$router.push({path: 'Chat', query: {id_conv: respuesta.data}})

      },
      sobreProd: function () {
        console.log('Al boton ajjajajaj');
        console.log(this.infoProdData.fechaexpiracion);
        console.log(this.infoProdData_date);
        console.log(typeof this.infoProdData.fechaexpiracion);
        console.log(typeof this.infoProdData.fecha);
        console.log(typeof this.infoProdData_date);
        console.log('---------------------');
        console.log(this.info);

        // console.log(this.loquesea);
      }
    }

  }
</script>

<style scoped>

</style>
