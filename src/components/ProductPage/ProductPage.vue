<template>
  <b-row style="margin-right: 10px;">
    <!--<makeReview></makeReview>-->
    <br/>
    <b-col cols="auto" sm="3">
      <ProductPage_img :method="informacion()"></ProductPage_img>
    </b-col>
    <b-col>
      <!--<h1 class="text-hide" style="background-image: url('../icons/'); width: 50px; height: 50px;">Bootstrap</h1>-->
      <ProductPage_details :method="informacion()"></ProductPage_details>
    </b-col>
    <b-col cols="auto" sm="3">
      <!--<h1 class="text-hide" style="background-image: url('../icons/'); width: 50px; height: 50px;">Bootstrap</h1>-->
      <ProductPage_sell :method="informacion()" :tipo="tipo"></ProductPage_sell>
    </b-col>
  </b-row>
</template>

<script>
  import axios from "axios";
  import {API_BASE} from "../../config";

  import ProductPage_img from './ProductPage_img'
  import ProductPage_details from './ProductPage_details'
  import ProductPage_sell from './ProductPage_sell'
  // import MakeReview

  export default {
    name: "ProductPage",
    components: {ProductPage_img, ProductPage_details, ProductPage_sell},
    data() {
      return {
        id: 0,
        info: null,
        infoExtended: null,
      }
    },
    beforeCreate() {
      //axios.get(`${API_BASE}producto/`).then(response => (this.info = response));
      let url = API_BASE + 'producto/' + this.$route.query.idProd + '?usuario=' + this.$store.getters.user;
      axios.get(url).then(response => (this.infoExtended = response));
      console.log(this.$route.query.idProd);
      console.log('-------------------------------------');
      // console.log(this.infoExtended.data.titulo);
      console.log('-------------------------------------');

    },
    methods: {
      informacion: function () {
        return {
          // fotoPerfil: 'https://www.pcper.com/files/imagecache/article_max_width/review/2011-04-24/asusk53e-3.jpg',
          idProducto: this.infoExtended.data.id,
          titulo: this.infoExtended.data.titulo,
          descripcion: this.infoExtended.data.descripcion,
          visualizaciones: this.infoExtended.data.visualizaciones,
          precio: this.infoExtended.data.precioBase,
          precioAux: this.infoExtended.data.precioAux,
          tipoVenta: this.infoExtended.data.tipo,
          categoria: this.infoExtended.data.categoria_nombre,
          fecha: this.infoExtended.data.fecha,
          fechaexpiracion: this.infoExtended.data.fechaexpiracion,
          vendido_por: this.infoExtended.data.vendedor,
          razones_venta: "Se vende por poco uso. Lo uso de pisapapeles y atrapapolvo.",
          zona_geografica: 'https://snazzy-maps-cdn.azureedge.net/assets/127403-no-label-bright-colors.png?v=20171101110035',
          cambioTrueque: "Smartphone valorado en más de 300€",
          images: this.infoExtended.data.multimedia
        }
      }
    }
  }

</script>

<style scoped>
  .col-img {
    margin-left: 20px;
    float: none;
    width: 30%;
  }

  .col-detalle {
    margin-left: 20px;
    float: none;
    width: fit-content;
  }

  .col-venta {
    margin-left: 20px;
    float: none;
    width: 30%;
  }

  /* Clear floats after the columns */
  .row:after {
    content: "";
    display: table;
    clear: both;
  }
</style>
