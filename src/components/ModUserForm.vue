<template>
    <div>
      <b-card title="Editar Perfil" style="width: 45rem; margin-left: 30px">
        <b-form>
          <!--<h1>Editar Perfil</h1>-->
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input :state="nameState" type="text" class="form-control" v-model="userData.nick" placeholder="Nombre de usuario"/>
            <b-form-invalid-feedback id="input-live-feedback">
              Introduce al menos 4 caracteres.
            </b-form-invalid-feedback>
          </b-input-group>



          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control" v-model="userData.nombre" placeholder="Nombre"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control" v-model="userData.apellidos" placeholder="Apellido(s)"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>@</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input :state="validateEmail" type="email" class="form-control" v-model="userData.mail" placeholder="Correo"/>
            <b-form-invalid-feedback id="input-live-feedback2">
              El correo introducido no tiene un formato reconocido.
            </b-form-invalid-feedback>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-book-open"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-textarea class="text-body" v-model="userData.descripcion" placeholder="Descripción"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-phone"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input class="tel" v-model="userData.telefono" placeholder="Número de teléfono"/>
            <b-form-invalid-feedback id="input-live-feedback3">
              Introduce un teléfono de 9 dígitos.
            </b-form-invalid-feedback>
          </b-input-group>

          <div style="align-content: center">
            <b-input-group>
              <b-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Buscar dirección..."
                v-model="address"
                @keypress.enter="buscarPosicion"
              ></b-input>
              <b-button class="mb-2 mr-sm-2 mb-sm-0"
                        variant="primary"
                        v-on:click="buscarPosicion"
              >Buscar
              </b-button>
            </b-input-group>
            <Mapa ref="map" :preview="false" :radius="100"></Mapa>
          </div>

          <b-input-group class="mb-3">
            <b-form-checkbox
              id="checkbox-1"
              v-model="userData.quiereEmails"
              name="checkbox-1"
              value="true"
              uncheckedValue="false"
            >
              <b>Deseo recibir recomendaciones de productos a mi cuenta de correo.</b>
            </b-form-checkbox>
          </b-input-group>

          <b-button variant="success" v-on:click="updateData" block>Actualizar datos</b-button>
          <b-modal id="modal1"
                   title="Error"
                   header-bg-variant="danger">
            <h1 class="my-4">Ups...</h1>
            <h3>Algo salió mal. Pruebe más tarde.</h3>
            <b-btn class="btn-primary" v-on:click="hideModal">Aceptar</b-btn>
          </b-modal>
        </b-form>
      </b-card>
    </div>
</template>

<script>
  import axios from "axios";
  import Mapa from "./Mapa";
    export default {
      name: "ModUserForm",
      components: {Mapa},
      props: ['userData'],
      computed: {
        nameState() {
          return this.userData.nick.length >= 4;
        },
        validateEmail() {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userData.mail)) {
            return (true);
          } else {
            return (false);
          }
        },
        telephone() {
          return this.userData.telefono.length === 9;
        }
      },
      data() {
        return {
          userUpdatedData: this.userData,
          acceptMailsUpdated: "false",
          notSelected: "",
          address: null
        }
      },
      methods: {
        buscarPosicion: function () {
          for (var i = 0; i < 3; i++) {
            this.$store.dispatch("getPosition", this.address).then(() => {
              let candidates = this.$store.getters.last_position;
              //console.log(candidates);

              //console.log(candidates.length);
              if (candidates.length < 1) {
                this.notSelected = "Sea más específico con la dirección.\n"
              } else {
                this.notSelected = "";
                let location = candidates[0];
                let newCenter = {
                  lat: location['lat'],
                  lng: location['lon']
                };
                this.$refs.map.zoomUpdated(17);
                this.$refs.map.centerUpdated(newCenter);
              }
            })
          }
        },
        updateData: function () {
          let centerPos = this.$refs.map.getCenter();
          this.userData.longitud = centerPos['lng'];
          this.userData.latitud = centerPos['lat'];
          this.userData.radio_ubicacion = 100.0;
          if(this.userData.quiereEmails === 'true'){
            this.userData.quiereEmails = true;
          }else{
            this.userData.quiereEmails = false;
          }
          console.log(this.userData);

          let url = 'http://34.90.77.95:5000/user/' + this.$store.getters.user;
          if(this.validateEmail && this.nameState) {
            axios.put(url, this.userData).then(function (response) {
              console.log(response);
            });
          }
        },
        showModal() {
          this.$refs['modal1'].show();
        },
        hideModal() {
          this.$refs['modal1'].hide();
        },
        // normalizeData(){
        //   this.userUpdatedData["quiereEMails"] = this.acceptMailsUpdated === "true";
        //   this.userUpdatedData["telefono"] = parseInt(this.tfNumber);
        // }
      },
      created() {
        this.userUpdatedData = this.userData;
      }
    }
</script>

<style scoped>

</style>
