<template>
  <div>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <b-card border-variant="light" style="max-width: 26rem;">
      <b-carousel
        id="carousel1"
        style="text-shadow: 1px 1px 2px #333;"
        controls
        fade
        background="#ababab"
        :interval="3000"
        img-width="60"

      >
        <!--v-model="slide"-->
        <!--@sliding-start="onSlideStart"-->
        <!--@sliding-end="onSlideEnd"-->
        <b-carousel-slide class="carousel-inner" v-for="img in product.images" :img-src="img.src" :key="img.id">
        </b-carousel-slide>
      </b-carousel>
      <br>
      <b-card-title>
        {{ product.titulo }}
      </b-card-title>
      <b-card-text>
        {{ product.descripcion }}
      </b-card-text>
      <p style="color: #20a8d8; margin-right: 10px;" align="right">
        <b><h1>{{ product.precioBase }}€</h1></b>
      </p>

      <router-link to="ProductPage" class="btn" style="border-color: #20a8d8; color: #20a8d8; margin-bottom: 5px;" align="center">
        Ver Producto
      </router-link>
      <ShareButton></ShareButton>
      <b-btn v-on:click="liked" style="background-color: transparent"><i :class="isLiked() ? likeIcon : unlikeIcon" :style="isLiked() ? likeColor : unlikeColor"></i></b-btn>
    </b-card>
  </div>
</template>

<script>
  import ShareButton from "./Share";

  export default {
    name: "ProductBox",
    components: {ShareButton},
    props: ['product'],
    data() {
      return {
        likeColor: 'color: #ff6b6b;',
        unlikeColor: 'color: #000000;',
        likeIcon: 'fas fa-heart',
        unlikeIcon: 'far fa-heart',
        nombre: "Portátil ASUS nuevo",
        descripcion: "Producto a la venta, recién estrenado y en muy buen estado, todavía en garantía, solamente se vende porque me han regalado otro.",
        precio: 25,
        like: false,
        images: [{
          src: "https://picsum.photos/1024/480/?image=52",
          id: 1
        },
          {
            src: "https://picsum.photos/1024/480/?image=54",
            id: 4
          },
          {
            src: "https://picsum.photos/1024/480/?image=58",
            id: 3
          },]
      }
    },
    methods: {
      liked: function () {
        this.product.like = !this.product.like;
      },
      isLiked: function () {
        return this.product.like;
      }
    }
  }
</script>

<style scoped>
  .tales {
    width: 100%;
  }

  .carousel-inner {
    width: 100%;
    max-height: 800px !important;
  }
</style>
