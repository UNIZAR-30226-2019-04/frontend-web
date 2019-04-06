<template>
  <div>
    <b-row style="height: 20rem; margin-top: 20px; margin-right: 15px;">
        <b-card style="width: 15rem; height: 10rem; margin-left: 15px">
          <b-card-body style="height: 2rem"><b-card-text><b-btn v-on:click="changePass(false)">Editar perfil</b-btn></b-card-text></b-card-body>
          <hr/>
          <b-card-body style="height: 5rem"><b-card-text><b-btn v-on:click="changePass(true)">Cambiar contraseña</b-btn></b-card-text></b-card-body>
        </b-card>
        <ModUserForm v-if="!optionPass" :userData="currentUser"></ModUserForm>
        <ModPassForm v-else></ModPassForm>
    </b-row>
  </div>
</template>

<script>
  import ModUserForm from "../../components/ModUserForm";
  import ModPassForm from "../../components/ModPassForm";
  export default {
    name: "EditProfile",
    components: {ModPassForm, ModUserForm},
    data() {
      return {
        currentUser: {
          location: 'Zaragoza',
          name: 'Ignacio',
          lastName: 'Galve Ceamanos',
          username: 'Galvecea',
          description: 'Soy ingeniero informático.',
          mail: 'goingtoraftel@gmail.com'
        },
        optionPass: false
      }
    },
    methods: {
      changePass: function (option) {
        this.optionPass = option;
      }
    }
  }
</script>

<style scoped>

</style>
