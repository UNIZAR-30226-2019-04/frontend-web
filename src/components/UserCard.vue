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
      <div>
        <floating-uploader buttonIcon="photo_camera"></floating-uploader>
        <h4 slot="header" style="text-align: center; text-emphasis: black">{{ userInfo.nick }}</h4>
      </div>
      <!--<Uploader></Uploader>-->
      <b-card-body>
        <b-card-title>Nombre y apellido(s)</b-card-title>
        <b-card-text>{{ userInfo.nombre }} {{ userInfo.apellidos }}</b-card-text>
      </b-card-body>
      <b-card-body>
        <b-card-title>Descripción</b-card-title>
        <b-card-text>{{ userInfo.descripcion }}</b-card-text>
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item>Ventas realizadas: {{ userInfo.productos_vendidos }}</b-list-group-item>
        <!--<b-list-group-item>Trueques realizados: {{ trueques }}</b-list-group-item>-->
        <b-list-group-item>Compras realizadas: {{ userInfo.productos_comprados }}</b-list-group-item>
      </b-list-group>

      <b-card-body>
        <b-btn variant="outline-primary">
          <a class="card-link" v-b-modal.modal1>Borrar cuenta</a>
        </b-btn>
        <b-modal id="modal1"
                 ref="modalBorrado"
                 title="Borrar cuenta"
                 header-bg-variant="danger"
                 hide-footer
         >
          <h3 class="my-4">Va a borrar su cuenta. ¿Está seguro de que desea continuar?</h3>
          <b-input-group class="mb-4">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input :state="firstPass" :type="tipo" class="form-control" v-model="delPass" placeholder="Contraseña"
                          autocomplete/>
            <b-input-group-prepend>
              <b-input-group-text v-on:click="showHidePass"><i :class="icono"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-invalid-feedback id="input-live-feedback3">
              Escriba su contraseña para poder borrar la cuenta (al menos 6 caracteres).
            </b-form-invalid-feedback>
          </b-input-group>
          <b-btn class="btn-danger" v-on:click="borrarUsuario" style="margin-right: 10px">SI</b-btn>
          <b-btn @click="ocultarModal">CANCELAR</b-btn>
        </b-modal>
        <hr/>
        <router-link to="EditProfile" class="btn" style="border-color: #20a8d8; color: #20a8d8">Modificar cuenta
        </router-link>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import FloatingUploader from './FloatingUploader';
  import axios from 'axios';
  export default {
    name: "UserCard",
    components: {FloatingUploader},
    props: ['userInfo'],
    data() {
      return {
        fotoPerfil: 'https://cdn.normacomics.com/media/catalog/product/cache/1/image/588x473/9df78eab33525d08d6e5fb8d27136e95/d/e/detective-conan-18.jpg',
        tipo: 'password',
        icono: 'far fa-eye-slash',
        delPass: ''
      }
    },
    computed: {
      firstPass() {
        return this.delPass.length >= 6;
      }
    },
    methods: {
      cambiarFoto: function () {
        this.$emit('cambiarFoto');
      },
      showHidePass: function(){
        if(this.tipo === "password"){
          this.tipo = 'text';
          this.icono = 'far fa-eye';
        }else{
          this.tipo = 'password';
          this.icono = 'far fa-eye-slash';
        }
      },
      borrarUsuario() {
        let url = 'http://34.90.77.95:5000/' + this.$store.getters.user + '/remove';
        let headers = {
          Content_Type: 'application/json',
          Authorization: this.$store.getters.token
        };
        let data = { actual_pass: this.delPass};
        if(this.firstPass) {
          axios.post(url, data, {headers}).catch(error => {
            console.log(error)
          });
        }
      },
      ocultarModal() {
        this.$refs['modalBorrado'].hide()
      }
    }
  }
</script>

<style scoped>

</style>
