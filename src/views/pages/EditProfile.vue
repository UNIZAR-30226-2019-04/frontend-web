<template>
  <div>
    <b-row style="height: 20rem; margin-top: 20px; margin-right: 15px;">
        <b-card style="width: 15rem; height: 10rem; margin-left: 15px">
          <b-card-body style="height: 2rem"><b-card-text><router-link to="EditProfile">Editar perfil</router-link></b-card-text></b-card-body>
          <hr/>
          <b-card-body style="height: 5rem"><b-card-text><router-link to="About">Cambiar contraseña</router-link></b-card-text></b-card-body>
        </b-card>
      <b-card title="Editar Perfil" style="width: 45rem; margin-top: 20px; margin-left: 30px">
        <b-form>
          <!--<h1>Editar Perfil</h1>-->
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control" placeholder="Nombre de usuario" autocomplete="username"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control" placeholder="Nombre" autocomplete="name"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control" placeholder="Apellidos" autocomplete="lastName"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>@</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="email" class="form-control" placeholder="Email" autocomplete="email"/>
          </b-input-group>

          <b-input-group class="mb-4">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-exclamation"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-textarea class="text-body" placeholder="Descripción" autocomplete="description"/>
          </b-input-group>

          <b-input-group class="mb-4">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-direction"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input class="text" placeholder="Localización" autocomplete="location"/>
          </b-input-group>

          <b-button variant="success" block>Actualizar datos</b-button>
        </b-form>
      </b-card>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "EditProfile",
    data() {
      return {
        location: '',
        name: '',
        lastName: 'Galve Ceamanos',
        username: '',
        description: ''
      }
    }
  }
</script>

<style scoped>

</style>
