<template>
  <div>
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
        <b-carousel-slide class="carousel-inner" v-for="img in images" :img-src="img.src" :key="img.id">
        </b-carousel-slide>
      </b-carousel>
      <br>
      <b-card-text>
        {{ descripcion }}
      </b-card-text>
      <p style="color: blue">
        {{ precio }}€
      </p>
      <b-row>
        <router-link to="ProductPage" variant="primary" class="btn" style="background-color: darkgray; margin-right: 5px">Ver Producto
        </router-link>
        <ShareButton></ShareButton>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import ShareButton from "./Share";

  export default {
    name: "ProductBox",
    components: {ShareButton},
    data() {
      return {
        descripcion: "Producto a la venta, recién estrenado y en muy buen estado, todavía en garantía, solamente se vende porque me han regalado otro.",
        precio: 25,
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
