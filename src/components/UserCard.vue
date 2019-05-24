<template>
  <div>
    <b-card
      border-variant="none"
      no-body

      style=" margin-top: 20px; margin-left: 15px;"
      :img-src="userInfo.imagen_perfil"
      img-alt="Foto de perfil"
      img-top
    >
      <div>
        <!--<floating-uploader style="position: absolute; right: 5px; top: 5px; " buttonIcon="photo_camera"></floating-uploader>-->
        <v-btn v-if="selectedFoto" v-on:click="uploadFoto" dark fab small color="blue" style="position: absolute; left: 5px; top: 5px; ">
          <v-icon class="material-icons">cloud_upload</v-icon>
        </v-btn>
        <v-btn dark fab small color="blue" style="position: absolute; right: 5px; top: 5px; ">
          <v-icon class="material-icons">photo_camera</v-icon>
          <b-form-file
            v-model="file"
            :state="Boolean(file)"
            v-on:change="cambiarFoto"
            placeholder="Choose a file..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
        </v-btn>
        <h3 slot="header" style="text-align: center; margin-top: 20px; text-emphasis: black">{{ userInfo.nick }}</h3>
      </div>
      <!--<Uploader></Uploader>-->
      <b-card-body>
        <b-card-title><b>Nombre y apellido(s)</b></b-card-title>
        <b-card-text>{{ userInfo.nombre }} {{ userInfo.apellidos }}</b-card-text>
      </b-card-body>
      <b-card-body>
        <b-card-title><b>Descripción</b></b-card-title>
        <b-card-text>{{ userInfo.descripcion }}</b-card-text>
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item>Ventas realizadas: {{ userInfo.productos_vendidos }}</b-list-group-item>
        <!--<b-list-group-item>Trueques realizados: {{ trueques }}</b-list-group-item>-->
        <b-list-group-item>Compras realizadas: {{ userInfo.productos_comprados }}</b-list-group-item>
      </b-list-group>

      <b-card-body>
        <b-btn variant="outline-primary" style="width: 100%;">
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
          <b-btn class="btn-danger" v-on:click="borrarUsuario" style="margin-right: 10px;">SI</b-btn>
          <b-btn @click="ocultarModal">CANCELAR</b-btn>
        </b-modal>
        <hr/>
        <router-link to="EditProfile" class="btn" style="width: 100%; border-color: #20a8d8; color: #20a8d8">Modificar cuenta
        </router-link>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import FloatingUploader from './FloatingUploader';
  import axios from 'axios';
  import {API_BASE} from "../config";

  export default {
    name: "UserCard",
    components: {FloatingUploader},
    props: ['userInfo'],
    data() {
      return {
        file: null,
        tipo: 'password',
        icono: 'far fa-eye-slash',
        delPass: '',
        selectedFoto: false,
        file2 : null
      }
    },
    computed: {
      firstPass() {
        return this.delPass.length >= 6;
      }
    },
    methods: {
      logFile(){
        console.log(this.file);
      },
      uploadFoto(){
        console.log("Cambiando fot...");
        let url = API_BASE + 'user/' + this.$store.getters.user + '/fotoPerfil/';
        let formData = new FormData();

        formData.append('file',this.file);
        console.log(this.file);

        axios.put(url, formData).then(response => {
          console.log('0000000000000');
          console.log(response);
          console.log('0000000000000');
          this.userInfo.imagen_perfil = response.data.data[0].path;
        }).catch(error => (console.log(error)));
        this.selectedFoto = false;
      },
      cambiarFoto() {
        console.log("Foto elegida...");
        this.selectedFoto = true;
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
        let url = API_BASE + 'user/' + this.$store.getters.user + '/remove';
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
