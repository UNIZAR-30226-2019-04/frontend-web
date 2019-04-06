<template>
    <div>
      <b-card title="Editar Perfil" style="width: 45rem; margin-top: 20px; margin-left: 30px">
        <b-form>
          <!--<h1>Editar Perfil</h1>-->
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control" v-model="userData.username"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control" v-model="userData.name"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control" v-model="userData.lastName"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>@</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="email" class="form-control" v-model="userData.email"/>
          </b-input-group>

          <b-input-group class="mb-4">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-exclamation"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-textarea class="text-body" v-model="userData.description"/>
          </b-input-group>

          <b-input-group class="mb-4">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-direction"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input class="text" v-model="userData.location"/>
          </b-input-group>

          <b-button variant="success" block>Actualizar datos</b-button>
        </b-form>
      </b-card>
    </div>
</template>

<script>
    export default {
        name: "ModUserForm",
      props: ['userData']
    }
</script>

<style scoped>

</style>
