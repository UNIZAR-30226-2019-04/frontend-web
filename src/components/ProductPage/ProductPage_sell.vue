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
        <b-card-title>{{ method.precio }}€</b-card-title>
        <button>COMPRAR AHORA</button>
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item>{{ method.razones_venta }}</b-list-group-item>
        <img :src="method.zona_geografica">
      </b-list-group>

      <b-card-body v-if="method.trueque">
        <b-card-title>Trueque disponible</b-card-title>
        <b-card-text>{{ method.cambioTrueque }}</b-card-text>
      </b-card-body>

      <b-card-footer>Otras fotos</b-card-footer>
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
