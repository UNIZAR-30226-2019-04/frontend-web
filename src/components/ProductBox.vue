<template>
  <div style="">
    <v-hover>
      <b-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`"
              :title="product.titulo" :img-src="imageReady() ? product.multimedia[0].path : defaultImage"
              border-variant="light" style="width: 100%; height: 100%;">
        <b-card-text style="font-size: 1.1rem; height: 3.6rem; overflow: hidden; text-overflow: ellipsis;">
          {{ product.descripcion }}
        </b-card-text>
        <p style="color: #20a8d8; margin-right: 10px;" align="right">
          <b v-if="isTrade"><h1>{{ product.precioBase }} - {{ product.precioAux }}€</h1></b>
          <b v-if="isAuction">Última puja: <h1>{{ product.precioAux }}€</h1></b>
          <b v-if="!isTrade && !isAuction"><h1>{{ product.precioBase }}€</h1></b>
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
          <b-col cols="8">
            <button @click="infoProducto()" class="btn"
                    style="font-size: 1rem; font-weight:bold; background-color: #20a8d8; color: white;"
                    align="center">
              Ver producto
            </button>
          </b-col>
          <!--<b-col cols="4">-->
          <!--<ShareButton></ShareButton>-->
          <!--</b-col>-->
          <b-col cols="4" align="right">
            <b-btn v-on:click="liked" style="background-color: transparent; margin-right: 8px"><i
              :class="isLiked() ? likeIcon : unlikeIcon" :style="isLiked() ? likeColor : unlikeColor" align="right"></i>
            </b-btn>
          </b-col>
        </b-row>
      </b-card>
    </v-hover>
  </div>
</template>

<script>
  import ShareButton from "./Share";
  import axios from 'axios';
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
        defaultImage: 'http://www.kerrick.co.nz/site/DefaultSite/filesystem/images/products/category-images/product-placeholder.png'
      }
    },
    methods: {
      infoProducto: function () {
        console.log("AQUI");
        console.log(this.product.id);
        this.$router.push({path: 'ProductPage', query: {idProd: this.product.id}})
      },
      ocultarModal() {
        this.$refs['modalReview'].hide();
      },
      showModal() {
        this.$refs['modalReview'].show();
      },
      imageReady() {
        return this.$props.product.multimedia.length > 0;
      },
      liked: function () {
        this.product.deseado = !this.product.deseado;
        let url = API_BASE + 'deseados/' + this.$store.getters.user;
        if (!this.product.deseado) {
          url = url + '/remove';
        }
        let headers = {
          Content_Type: 'application/json',
          Authorization: this.$store.getters.token

        };
        let data = {producto_id: this.product.id};
        axios.post(url, data, {headers}).then(response => (console.log(response)));
      },
      isLiked: function () {
        return this.product.deseado;
      }
    },
    computed: {
      isTrade() {
        return this.$props.product.tipo === 'trueque';
      },
      isAuction() {
        return this.$props.product.tipo === 'subasta';
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
