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

      <!--<b-card-body>-->
        <!--<b-card-title>{{parentData}}</b-card-title>-->
        <!--&lt;!&ndash;<b-card-title>llelelellelelel</b-card-title>&ndash;&gt;-->
        <!--&lt;!&ndash;<img :src=method.fotoPerfil width="auto">&ndash;&gt;-->
      <!--</b-card-body>-->

      <b-card-body style="width: 36rem; height: 36rem;">
      <!--<b-card-body class="carousel">-->
        <b-carousel
          id="carousel1"
          style="height:auto"
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
        <b-list-group-item>Titulo: {{ method.titulo }}</b-list-group-item>
        <b-list-group-item>Descripcion: {{ method.descripcion }}</b-list-group-item>
        <b-list-group-item>Numero de visualizaciones: {{ method.visualizaciones }}</b-list-group-item>
        <b-list-group-item>Precio: {{ method.precio }}€</b-list-group-item>
        <b-list-group-item>Tipo de venta: {{ method.tipoVenta }}</b-list-group-item>
        <b-list-group-item>Categoria del producto: {{ method.categoria}}</b-list-group-item>
        <b-list-group-item>Fecha: {{ method.fecha}}</b-list-group-item>
        <b-list-group-item>Texto mio de prueba: {{ method.whatever }}</b-list-group-item>
        <b-list-group-item>Numero mio de prueba{{ method.numero }}</b-list-group-item>
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
