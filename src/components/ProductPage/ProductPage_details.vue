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
        <!--<b-card-body class="carousel">-->
        <b-carousel
          id="carousel1"
          style="height:auto; "
          controls
          indicators
          img-height="500"
          :interval="5000"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide class="carousel-inner" v-for="img in method.images " :img-src="img.src" :key="img.id"
          >
          </b-carousel-slide>
        </b-carousel>
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item style="font-weight: bold;">{{ method.titulo }}</b-list-group-item>
        <b-list-group-item style="font-size: 1.1rem">{{ method.descripcion }}</b-list-group-item>
        <b-list-group-item>{{ method.precio }}€</b-list-group-item>
      </b-list-group>

      <!--<b-card-footer>Otras fotos</b-card-footer>-->
      <!--<b-card-img :src="fotoExtra" alt="Image" bottom/>-->
    </b-card>
  </div>
</template>

<script>
  import BCardBody from "bootstrap-vue/src/components/card/card-body";

  export default {
    name: "ProductPage_details",
    components: {BCardBody},
    props: {
      method: {type: Function},
    },
    mounted() {
      this.method();
    }
  }
</script>

<style scoped>

</style>
