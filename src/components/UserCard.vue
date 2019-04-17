<template>
  <div>
     <b-card
      border-variant="none"
      no-body

      style=" margin-top: 20px; margin-left: 15px;"
      :img-src="fotoPerfil"
      img-alt="Foto de perfil"
      img-top
    >
      <h4 slot="header" style="text-align: center; text-emphasis: black ">{{ userInfo.nick }}</h4>
      <!--<Uploader></Uploader>-->
      <b-card-body>
        <b-card-title>Nombre y apellido(s)</b-card-title>
        <b-card-text>{{ userInfo.nombre }} {{ userInfo.apellidos }}</b-card-text>
      </b-card-body>
      <b-card-body>
        <b-card-title>Descripción</b-card-title>
        <b-card-text>{{ userInfo.description }}</b-card-text>
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item>Ventas realizadas: {{ ventas }}</b-list-group-item>
        <b-list-group-item>Trueques realizados: {{ trueques }}</b-list-group-item>
        <b-list-group-item>Compras realizadas: {{ compras }}</b-list-group-item>
      </b-list-group>

      <b-card-body>
        <b-btn variant="outline-primary">
          <a class="card-link" v-b-modal.modal1>Borrar cuenta</a>
        </b-btn>
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
        <hr/>
        <router-link to="EditProfile" class="btn" style="border-color: #20a8d8; color: #20a8d8">Modificar cuenta</router-link>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "UserCard",
    props: ['userInfo'],
    data() {
      return {
        fotoPerfil: 'https://cdn.normacomics.com/media/catalog/product/cache/1/image/588x473/9df78eab33525d08d6e5fb8d27136e95/d/e/detective-conan-18.jpg',
        usuario: 'Edogawa Conan',
        description: 'Soy un chico de 17 años encogido con la forma de un niño, les dije a mis conocidos que mi nombre era Conan para protegerlos de la organización que me hizo esto.',
        compras: 1998,
        ventas: 22,
        trueques: 5
      }
    }
  }
</script>

<style scoped>

</style>
