<template>
  <div>
    <b-card
      no-body
      style="margin-top: 20px; margin-left: 5px;"
      :img-src="fotoPerfil"
      img-alt="Image"
      img-top
    >
      <h4 slot="header" style="text-align: center; text-emphasis: black ">Detalles del producto</h4>

      <b-card-body>
        <b-card-title>{{parentData}}</b-card-title>
        <!--<b-card-title>llelelellelelel</b-card-title>-->
        <!--<img :src=method.fotoPerfil width="auto">-->
      </b-card-body>

      <b-card-body>
        <b-carousel
          id="carousel1"
          style="width:100%; height:auto ;"
          controls
          indicators
          img-height="500"
          :interval="5000"
          v-model="slide"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide class="carousel-inner" v-for="img in method.images " :img-src="img.src" :key="img.id"
                            width="30px">
          </b-carousel-slide>
        </b-carousel>
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item>{{ method.titulo }}</b-list-group-item>
        <b-list-group-item>{{ method.descripcion }}</b-list-group-item>
        <b-list-group-item>{{ method.precio }}€</b-list-group-item>
      </b-list-group>

      <b-card-footer>Otras fotos</b-card-footer>
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
