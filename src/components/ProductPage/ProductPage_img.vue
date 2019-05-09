<template>
  <div>
    <b-card no-body class="mb-1" style="margin-left: 15px ">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info"
                  style="background-color: #20a8d8; color: white; font-size: 1.3rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%">Detalles del
          vendedor
        </b-button>
      </b-card-header>
      <!--<b-card-->
      <!--img-alt="Image"-->
      <!--img-top-->
      <!--tag="article"-->
      <!--no-body-->
      <!--style="margin-top: 20px; margin-left: 20px;">-->
      <!--<h4 slot="header" style="text-align: center; text-emphasis: black ">Detalles del vendedor</h4>-->

      <!--<b-card-body>-->
      <!--<b-card-title>Imágenes del producto</b-card-title>-->
      <!--</b-card-body>-->

      <b-list-group style="font-size: 1.1rem; font-weight: lighter">
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
