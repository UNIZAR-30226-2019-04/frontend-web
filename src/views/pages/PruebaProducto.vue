<template>
  <div>
    <div>
      <h1>juejeujeuejuejejue</h1>
      <p>{{this.info}}</p>
      <br>
      <p>{{this.info.data[this.id]}}</p>
      <br>
      <p>Visualizaciones: {{this.info.data[this.id].visualizaciones}}</p>
      <br>
      <p>Precio aux: {{this.info.data[this.id].precioAux}}</p>
      <br>
      <p>Titulo: {{this.info.data[this.id].titulo}}</p>
      <br>
      <p>ID: {{this.info.data[this.id].id}}</p>
      <br>
      <p>Tipo: {{this.info.data[this.id].tipo}}</p>
      <br>
      <p>Categoria: {{this.info.data[this.id].categoria_nombre}}</p>
      <br>
      <p>Vendido por: {{this.info.data[this.id].vendedor}}</p>
      <br>
      <p>Precio base: {{this.info.data[this.id].precioBase}}</p>
      <br>
      <p>Descripcion: {{this.info.data[this.id].descripcion}}</p>
      <br>
      <p>Fecha: {{this.info.data[this.id].fecha}}</p>

      <!--<br>-->
      <!--<p>{{this.info.data}}</p>-->
      <br>
      <button @click="showInfo">info!</button>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <b-row style="margin-right: 10px;">
      <b-col cols="auto" sm="3">
        <ProductPage_img :method="this.informacion()"></ProductPage_img>
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
  </div>
</template>

<script>
  import axios from "axios";
  import {API_BASE} from "../../config";

  import ProductPage_img from '../../components/ProductPage/ProductPage_img'
  import ProductPage_details from '../../components/ProductPage/ProductPage_details'
  import ProductPage_sell from '../../components/ProductPage/ProductPage_sell'

  export default {
    name: "PruebaProducto",
    components: {ProductPage_img, ProductPage_details, ProductPage_sell},
    data() {
      return {
        id: 0,
        info: null
      }
    },
    mounted() {
      axios
        .get(`${API_BASE}/producto/`)
        .then(response => (this.info = response))
    },
    methods: {
      showInfo: function () {
        console.log(this.info.data[this.id]);
      },
      informacion: function () {
        return {
          myData: "jojojojojojojojojoj",
          fotoPerfil: 'https://www.pcper.com/files/imagecache/article_max_width/review/2011-04-24/asusk53e-3.jpg',
          titulo: this.info.data[this.id].titulo,
          descripcion: this.info.data[this.id].descripcion,
          visualizaciones: this.info.data[this.id].visualizaciones,
          precio: this.info.data[this.id].precioBase,
          tipoVenta: this.info.data[this.id].tipo,
          categoria: this.info.data[this.id].categoria_nombre,
          fecha: this.info.data[this.id].fecha,
          vendido_por: this.info.data[this.id].vendedor,
          whatever: "jejejejjeje",
          numero: 300,
          razones_venta: "Se vende por poco uso. Lo uso de pisapapeles y atrapapolvo.",
          zona_geografica: 'https://snazzy-maps-cdn.azureedge.net/assets/127403-no-label-bright-colors.png?v=20171101110035',
          trueque: true,
          cambioTrueque: "Smartphone valorado en más de 300€",
          images: [{
            src: 'https://www.asus.com/media/US/products/fCGFt3hiSAQYMnvO/P_500.jpg',
            id: 1
          },
            {
              src: 'https://dlcdnimgs.asus.com/websites/global/products/amrevEkgfqmrdCMD/K53_ov1.jpg',
              id: 2
            },
            {
              src: 'https://www.pcper.com/files/imagecache/article_max_width/review/2011-04-24/asusk53e-3.jpg',
              id: 3
            },]
        }
      }
    }
  }
</script>

<style scoped>

</style>
