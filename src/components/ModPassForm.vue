<template>
  <div>
    <b-card title="Cambiar contraseña" style="width: 45rem; margin-top: 20px; margin-left: 30px">
      <b-form>
        <b-input-group class="mb-3">
          <b-input-group-prepend>
            <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
          </b-input-group-prepend>
          <b-form-input type="password" class="form-control" placeholder="Nueva contraseña" v-model="new_pass" />
        </b-input-group>

        <b-input-group class="mb-4">
          <b-input-group-prepend>
            <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
          </b-input-group-prepend>
          <b-form-input type="password" class="form-control" placeholder="Repetir nueva contraseña" v-model="new_pass2" />
        </b-input-group>
        <p>Nueva contraseña: {{new_pass}}</p>
        </b-form>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "ModPassForm",
    data() {
      return {
        new_pass: '',
        new_pass2: ''
      }
    }
  }
</script>

<style scoped>

</style>
