<template>
  <div>
    <b-card
      border-variant="none"
      no-body
      style="margin-top: 20px; margin-left: 5px;">
      <!--&lt;!&ndash;:img-src="fotoPerfil"&ndash;&gt;-->
      <!--img-alt="Image"-->
      <!--img-top-->
      <!--&gt;-->
      <h4 slot="header" style="text-align: center; text-emphasis: black ">Detalles de la venta</h4>

      <b-card-body>
        <b-card-title>jejejjejjejeje</b-card-title>
        <b-card-text>hueheuheuheuheue</b-card-text>
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item>{{ method.descripcion }}</b-list-group-item>
        <b-list-group-item>hueheuheuheuheue</b-list-group-item>
        <b-list-group-item>hueheuheuheuheue</b-list-group-item>
      </b-list-group>

      <b-card-footer>Otras fotos</b-card-footer>
      <!--<b-card-img :src="fotoExtra" alt="Image" bottom/>-->
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "ProductPage_sell",
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
