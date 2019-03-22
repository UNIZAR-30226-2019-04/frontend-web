<template>
  <div>
    <b-card
      border-variant="primary"
      no-body
      class="ml-md-4"
      style="max-width: 20rem;"
      :img-src="fotoPerfil"
      img-alt="Image"
      img-top
    >
      <h4 slot="header" style="text-align: center; text-emphasis: black ">{{ usuario }}</h4>

      <b-card-body>
        <b-card-title>Descripción</b-card-title>
        <b-card-text>{{ description }}</b-card-text>
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item>Ventas realizadas: {{ ventas }}</b-list-group-item>
        <b-list-group-item>Trueues realizados: {{ trueques }}</b-list-group-item>
        <b-list-group-item>Compras realizadas: {{ compras }}</b-list-group-item>
      </b-list-group>

      <b-card-body>
        <a class="card-link" v-b-modal.modal1>Borrar cuenta</a>
        <b-modal id="modal1"
                 title="Borrar cuenta"
                 header-bg-variant="danger"
                 ok-title="Si"
                 ok-variant="danger"
                 cancel-title="Cancelar">
          <h3 class="my-4">Va a borrar su cuenta. ¿Está seguro de que desea continuar?</h3>
          <!--<b-btn class="btn-primary">SI</b-btn>-->
          <!--<b-btn class="btn-danger">NO</b-btn>-->
        </b-modal>
        <a href="#" class="card-link">Modificar</a>
      </b-card-body>

      <b-card-footer>Otras fotos</b-card-footer>
      <b-card-img :src="fotoExtra" alt="Image" bottom />
    </b-card>
  </div>
</template>

<script>
    export default {
        name: "UserCard",
        data () {
            return {
              fotoPerfil: 'https://cdn.normacomics.com/media/catalog/product/cache/1/image/588x473/9df78eab33525d08d6e5fb8d27136e95/d/e/detective-conan-18.jpg',
              usuario: 'Edogawa Conan',
              description: 'Soy un chico de 17 años encogido con la forma de un niño, les dije a mis conocidos que mi nombre era Conan para protegerlos de la organización que me hizo esto.',
              compras: 1998,
              ventas: 22,
              trueques: 5,
              fotoExtra: 'https://cdn.myanimelist.net/images/characters/14/308382.jpg'
            }
        }
    }
</script>

<style scoped>

</style>
