<template>
  <div style="width: 20vw; height: 50vh; min-height: 550px;">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <b-card border-variant="light" style="width: 100%; height: 100%;">
      <b-carousel
        id="carousel1"
        style="text-shadow: 1px 1px 2px #333;"
        controls
        fade
        background="#FFFFFF"
        :interval="3000"
        img-width="60"
      >
        <!--v-model="slide"-->
        <!--@sliding-start="onSlideStart"-->
        <!--@sliding-end="onSlideEnd"-->
        <b-carousel-slide class="carousel-inner"
                          v-for="(img,index) in product.multimedia"
                          :key="index"
                          v-if="!img.tipo" :img-src="img.path"
                          style="background-color: transparent">
        </b-carousel-slide>
      </b-carousel>
      <img src="../../public/img/product-placeholder.png"
           v-if="!product.multimedia.length"
           alt="SIN IMAGEN"
           style="width: 100%;"
      >

      <br>
      <b-card-title>
        {{ product.titulo }}
      </b-card-title>
      <b-card-text style="font-size: 1.1rem">
        {{ product.descripcion }}
      </b-card-text>
      <p style="color: #20a8d8; margin-right: 10px;" align="right">
        <b><h1>{{ product.precioBase }}€</h1></b>
      </p>


      <b-row>
        <b-col>
          <!--<router-link to="ProductPage" @click="infoProducto()" class="btn"-->
                       <!--style="font-size: 1rem; font-weight:bold; background-color: #20a8d8; color: white; margin-bottom: 5px;"-->
                       <!--align="center">-->
            <!--Ver producto-->
          <!--</router-link>-->

        </b-col>
        <b-btn v-if="comprado">
          <a class="card-link" v-on:click="showModal">Val. usuario</a>
        </b-btn>
        <b-modal id="modal2"
                 ref="modalReview"
                 title="Hacer review"
                 header-bg-variant="danger"
                 hide-footer
        >
          <make-review :valorado="product.vendedor" @close="ocultarModal"></make-review>
          <!--<b-btn class="btn-primary" style="margin-right: 10px">SI</b-btn>-->
          <!--<b-btn @click="ocultarModal">CANCELAR</b-btn>-->
        </b-modal>
      </b-row>

      <b-row>
        <b-col cols="4">
          <button @click="infoProducto()" class="btn"
                  style="font-size: 1rem; font-weight:bold; background-color: #20a8d8; color: white;"
                  align="center">
            Ver producto
          </button>
        </b-col>
        <b-col cols="6">
          <ShareButton></ShareButton>
        </b-col>
        <b-col cols="2" align="right">
          <b-btn v-on:click="liked" style="background-color: transparent; margin-right: 8px"><i
            :class="isLiked() ? likeIcon : unlikeIcon" :style="isLiked() ? likeColor : unlikeColor" align="right"></i>
          </b-btn>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import ShareButton from "./Share";
  import  axios from 'axios';
  import MakeReview from "./makeReview";
  import {API_BASE} from "../config";

  export default {
    name: "ProductBox",
    components: {MakeReview, ShareButton},
    props: ['product', 'comprado'],
    data() {
      return {
        likeColor: 'color: #ff6b6b;',
        unlikeColor: 'color: #000000;',
        likeIcon: 'fas fa-heart',
        unlikeIcon: 'far fa-heart',
      }
    },
    methods: {
      infoProducto: function(){
        console.log("AQUI");
        console.log(this.product.id);
        this.$router.push({ path: 'ProductPage', query: { idProd: this.product.id } })
      },
      ocultarModal() {
        this.$refs['modalReview'].hide();
      },
      showModal() {
        this.$refs['modalReview'].show();
      },
      liked: function () {
        this.product.deseado = !this.product.deseado;
        let url = API_BASE + 'deseados/' + this.$store.getters.user;
        if(!this.product.deseado){
          url = url + '/remove';
        }
        let headers = {
          Content_Type: 'application/json',
          Authorization: this.$store.getters.token

        };
        let data = { producto_id : this.product.id };
        axios.post(url,data,{headers}).then(response => (console.log(response)));
      },
      isLiked: function () {
        return this.product.deseado;
      }
    }
  }
</script>

<style scoped>
  .column2 {
    width: 66.33%;
  }

  .column1 {
    width: 33.33%;
    /*margin-right: 44px;*/
  }

  .carousel-inner {
    max-height: 300px !important;
  }
</style>
