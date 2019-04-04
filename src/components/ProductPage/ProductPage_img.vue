<template>
  <div>
    <b-card
      img-alt="Image"
      img-top
      tag="article"
      no-body
      style="margin-top: 20px; margin-left: 20px;">
      <h4 slot="header" style="text-align: center; text-emphasis: black ">Detalles del vendedor</h4>

      <!--<b-card-body>-->
      <!--<b-card-title>Imágenes del producto</b-card-title>-->
      <!--</b-card-body>-->

      <b-list-group>
        <b-list-group-item>{{ method.vendido_por }}</b-list-group-item>
        <b-list-group-item>Aqui viene la info del vendedor, obtenida de la bdd y comunicada del padre al hijo
        </b-list-group-item>
        <b-list-group-item>Aqui pueden venir las fotos del vendedor</b-list-group-item>
      </b-list-group>

      <!--<b-list-group flush border="none">-->
      <!--<img :src=method.images[0].src width="40px">-->
      <!--<img :src=method.images[1].src width="40px">-->
      <!--</b-list-group>-->

      <!--<b-card-img :src="fotoExtra" alt="Image" bottom/>-->
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "ProductPage_img",

    // la funcion que hereda del papi
    props: {
      method: {type: Function},
    },
    mounted() {
      this.method();
    },
    methods: {
      emitTo(event) {
        this
      }
    }
  }
</script>

<style scoped>

</style>
