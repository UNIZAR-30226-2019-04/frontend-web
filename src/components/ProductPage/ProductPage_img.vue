<template>
  <div>
    <b-card
      border-variant="none"
      no-body
      style="margin-top: 20px; margin-left: 5px;">
      <h4 slot="header" style="text-align: center; text-emphasis: black ">Imágenes del producto</h4>

      <b-card-body>
        <b-card-title>Imágenes del producto</b-card-title>
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item>{{ method.images[0].src }}</b-list-group-item>
        <b-list-group-item>{{ method.images[1].src }}</b-list-group-item>
        <img :src=method.images[0].src width="auto">
      </b-list-group>

      <b-card-footer>Otras fotos</b-card-footer>
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
    mounted(){
      this.method();
    }
  }
</script>

<style scoped>

</style>
