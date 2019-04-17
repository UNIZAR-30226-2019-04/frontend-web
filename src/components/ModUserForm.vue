<template>
    <div>
      <b-card title="Editar Perfil" style="width: 45rem; margin-left: 30px">
        <b-form>
          <!--<h1>Editar Perfil</h1>-->
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control" v-model="userUpdatedData.nick" placeholder="Nombre de usuario"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control" v-model="userUpdatedData.nombre" placeholder="Nombre"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control" v-model="userUpdatedData.apellidos" placeholder="Apellido(s)"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>@</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="email" class="form-control" v-model="userUpdatedData.email" placeholder="Correo"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-book-open"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-textarea class="text-body" v-model="userUpdatedData.description" placeholder="Descripción"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-phone"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input class="tel" v-model="tfNumber" placeholder="Número de teléfono"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-direction"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input class="text" v-model="userUpdatedData.location" placeholder="Localización"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-form-checkbox
              id="checkbox-1"
              v-model="acceptMailsUpdated"
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
    export default {
      name: "ModUserForm",
      props: ['userData'],
      data() {
        return {
          userUpdatedData: this.userData,
          acceptMailsUpdated: "false",
          tfNumber: null
        }
      },
      methods: {
        updateData: function () {
          this.normalizeData();

          let data = this.userUpdatedData;
          console.log(data);
          this.$store
            .dispatch("updateProfile", data)
            .then(() => this.$router.push("/#/Profile"))
            .catch(err => {
              console.log("AAAAAA");
              console.log(err);
              console.log("BBBBBB");
              this.showModal();
              console.log("CCCCCC");
            });
        },
        showModal() {
          console.log("BBBBCCC");
          this.$refs['modal1'].show();
          console.log("BBCCCCC");
        },
        hideModal() {
          this.$refs['modal1'].hide();
        },
        normalizeData(){
          this.userUpdatedData["quiereEMails"] = this.acceptMailsUpdated === "true";
          this.userUpdatedData["telefono"] = parseInt(this.tfNumber);
        }
      },
      created() {
        this.userUpdatedData = this.userData;
      }
    }
</script>

<style scoped>

</style>
