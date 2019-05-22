<template>
    <div>
      <b-card title="Editar Perfil" style="width: 60vw; margin-left: 30px">
        <b-form>
          <div style="width: 60%; margin: 40px auto;">

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
          </div>

          <div style="align-content: center">
            <a><b>
              <br/>Seleccione su ubicación:<br/><br/>
            </b></a>
            <b-input-group>
              <b-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Buscar dirección..."
                v-model="address"
              ></b-input>
              <b-button class="mb-2 mr-sm-2 mb-sm-0" variant="primary" v-on:click="buscarPosicion">Buscar</b-button>
            </b-input-group>

            <Mapa ref="map" :preview="preview" :radius="radius"></Mapa>
          </div>

          <div style="margin: 5%;">
            <a><b>
              Seleccione el radio de interés de productos:<br/><br/>
            </b></a>
            <VueSlideBar style="margin-bottom: 2rem;"
                         v-model="radius"
                         :data="radiusData"
                         :range="radiusRange"
                         :tooltip-styles="{ backgroundColor: '#20a8d8', borderColor: '#20a8d8' }"
                         :labelStyles="{ color: '#4a4a4a', backgroundColor: '#4a4a4a' }"
                         :processStyle="{ backgroundColor: '#d8d8d8' }"
            ></VueSlideBar>
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
  import VueSlideBar from 'vue-slide-bar'
  import Mapa from "./Mapa.vue";

  import axios from "axios";
    export default {
      name: "ModUserForm",
      components: {VueSlideBar, Mapa},
      props: ['userData'],
      computed: {
        validateEmail() {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userData.mail);
        },
        nameState() {
          return this.userData.nick.length >= 4;
        },
        telephone() {
          return this.userData.telefono.length === 9;
        }
      },
      data() {
        return {
          acceptMailsUpdated: "false",
          radius: null,
          address: null,
          preview: false,
          radiusData: [
            100,
            200,
            500,
            750,
            1000,
            5000,
            15000,
            30000,
            45000,
            60000,
            90000,
            120000,
            300000
          ],
          radiusRange: [
            {
              label: '100 m'
            },
            {
              label: '200 m',
              isHide: true
            },
            {
              label: '500 m'
            },
            {
              label: '750 m',
              isHide: true
            },
            {
              label: '1 km'
            },
            {
              label: '5 km',
              isHide: true
            },
            {
              label: '15 km',
            },
            {
              label: '30 km',
              isHide: true
            },
            {
              label: '45 km'
            },
            {
              label: '60 km',
              isHide: true
            },
            {
              label: '90 km'
            },
            {
              label: '120 km',
              isHide: true
            },
            {
              label: '300 km'
            }
          ]
        }
      },
      methods: {
        validateEmail: function() {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userData.mail);
        },
        nameState: function() {
          return this.userData.nick.length >= 4;
        },
        updateData: function () {
          let centerPos = this.$refs.map.getCenter();
          this.userData.longitud = centerPos['lng'];
          this.userData.latitud = centerPos['lat'];
          this.userData.radio_ubicacion = this.radius;
          this.userData.quiereEmails = this.userData.quiereEmails === 'true';
          console.log(this.userData);
          let url = 'http://155.210.47.51:5000/user/' + this.$store.getters.user;
          if (this.validateEmail() && this.nameState()) {
            axios.put(url, this.userData).then(function (response) {
              console.log(response);
            });
          }
        },
        buscarPosicion: function () {
          for (var i = 0; i < 3; i++) {
            this.$store.dispatch("getPosition", this.address).then(() => {
              let candidates = this.$store.getters.last_position;
              console.log(candidates);

              console.log(candidates.length)
              if (candidates.length !== 1) {
                this.notSelected = "Sea más específico con la dirección.\n"
              } else {
                this.notSelected = "";
                let location = candidates[0];
                let newCenter = {
                  lat: location['lat'],
                  lng: location['lon']
                };
                console.log(newCenter);
                this.$refs.map.zoomUpdated(17);
                this.$refs.map.centerUpdated(newCenter);
              }
            })
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
      // beforeMount() {
      //   let newCenter = {
      //     lat: this.userData.latitud,
      //     lng: this.userData.longitud
      //   };
      //   console.log(newCenter);
      //   this.$refs.map.zoomUpdated(17);
      //   this.$refs.map.centerUpdated(newCenter);
      // }
    }
</script>

<style scoped>

</style>
