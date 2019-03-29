<template>
  <div>
    <b-card
      border-variant="none"
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
        <img :src=method.fotoPerfil width="auto">
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item>hueheuheuheuheue</b-list-group-item>
        <b-list-group-item>{{ method.descripcion }}</b-list-group-item>
        <b-list-group-item>{{ method.precio }}€</b-list-group-item>
      </b-list-group>

      <b-card-footer>Otras fotos</b-card-footer>
      <!--<b-card-img :src="fotoExtra" alt="Image" bottom/>-->
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "ProductPage_details",
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
