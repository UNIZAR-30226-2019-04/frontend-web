<template>
  <div>
    <b-card no-body class="mb-1" style="margin-left: 15px ">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info"
                  style="background-color: #20a8d8; color: white; font-size: 1.3rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%">
          Detalles del producto
        </b-button>
      </b-card-header>

      <b-card-body style="width: 36rem; height: 36rem; align-self: center;">
        <b-tabs>
          <b-tab title="Imágenes" active>
            <!--<b-card-body class="carousel">-->
            <b-carousel
              v-if="method.images.length > 0"
              id="carousel1"
              style="height:auto; "
              controls
              fade
              indicators
              img-height="500"
              :interval="3000"
            >
              <!--@sliding-start="onSlideStart"-->
              <!--@sliding-end="onSlideEnd"-->
              <b-carousel-slide class="carousel-inner" v-for="(img,index) in method.images " v-if="!img.tipo"
                                :img-src="img.path"
                                :key="index"
              >
              </b-carousel-slide>
            </b-carousel>
            <img src="../../../public/img/product-placeholder.png"
                 v-else
                 alt="SIN IMAGEN"
                 style="width: 100%;"
            >
          </b-tab>
          <b-tab title="Videos" v-if="videoAv">
            <b-embed type="video" aspect="4by3" controls >
              <source v-for="(img,index) in method.images " v-if="img.tipo" :src="img.path"
                      :key="index" type="video/mp4">
            </b-embed>
          </b-tab>
        </b-tabs>
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item>
          <h5>Titulo:</h5>
          {{ method.titulo }}
        </b-list-group-item>
        <b-list-group-item>
          <h5>Descripción:</h5>
          {{ method.descripcion }}
        </b-list-group-item>
        <b-list-group-item>
          <v-icon class="material-icons">remove_red_eye</v-icon>
          {{ method.visualizaciones }}
          <v-icon class="material-icons" style="margin-left: 4px;">favorite</v-icon>
          {{ method.likes }}
        </b-list-group-item>
        <b-list-group-item>
          <h5>Precio:</h5>
          {{ method.precio }}€
        </b-list-group-item>
        <!--<b-list-group-item>-->
        <!--<h5>Tipo de venta:</h5>-->
        <!--{{ method.tipoVenta }}-->
        <!--</b-list-group-item>-->
        <div v-if="method.categoria !== undefined">
          <b-list-group-item>
            <h5>Categoria del producto:</h5>
            {{ method.categoria }}
          </b-list-group-item>
        </div>
        <b-list-group-item>
          <h5>Fecha de publicación:</h5>
          {{ method.fecha}}
        </b-list-group-item>
        <div v-if="method.tipoVenta === 'subasta'">
          <b-list-group-item>
            <h5>Precio actual de la subasta:</h5>
            {{ method.precioAux }}
            <h5>Fecha de finalización de la misma: </h5>
            {{ method.fechaexpiracion }}
          </b-list-group-item>
          <!--<b-list-group-item>-->
          <!--<h5>Fecha de finalización de la misma: </h5>-->
          <!--{{ method.fechaexpiracion }}-->
          <!--</b-list-group-item>-->
        </div>
        <div v-else>
          <b-list-group-item>
            <h5>Tipo de venta: </h5>
            {{ method.tipoVenta }}
          </b-list-group-item>
        </div>
      </b-list-group>

      <!--<b-card-footer>Otras fotos</b-card-footer>-->
      <!--<b-card-img :src="fotoExtra" alt="Image" bottom/>-->
    </b-card>
    <!--<button class="btn" @click="infoCat()">DEBUG</button>-->
  </div>
</template>

<script>
  import BCardBody from "bootstrap-vue/src/components/card/card-body";
  //import { mdbCarousel, mdbCarouselItem, mdbCarouselCaption } from 'mdbvue';
  export default {
    name: "ProductPage_details",
    components: {BCardBody},
    data() {
      return {
        laCategoria: method.categoria,
      }
    },
    props: {
      method: {type: Function},
    },
    mounted() {
      this.method();
    },
    methods: {
      infoCat: function () {
        console.log(this.laCategoria);
      }
    },
    computed: {
      videoAv() {
        for (var i = 0; i < this.$props.method.images.length; i++) {
          if (this.$props.method.images[i]["tipo"]) {
            return true;
          }
        }
        return false;
      }
    }
  }
</script>

<style scoped>

</style>
