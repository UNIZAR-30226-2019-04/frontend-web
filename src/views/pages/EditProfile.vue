<template>
  <b-container>
    <b-row>
        <b-card >
          <b-btn v-on:click="changePass(false)" variant="outline-primary">Editar perfil</b-btn>
          <hr/>
          <b-btn v-on:click="changePass(false)" variant="outline-primary">Cambiar contraseña</b-btn>
          <hr/>
          <uploader></uploader>
        </b-card>
        <ModUserForm v-if="!optionPass" :userData="currentUser"></ModUserForm>
        <ModPassForm v-else></ModPassForm>
    </b-row>
  </b-container>
</template>

<script>
  import ModUserForm from "../../components/ModUserForm";
  import ModPassForm from "../../components/ModPassForm";
  import Uploader from "../../components/Uploader";
  export default {
    name: "EditProfile",
    components: {Uploader, ModPassForm, ModUserForm},
    data() {
      return {
        optionPass: false
      }
    },
    methods: {
      changePass: function (option) {
        this.optionPass = option;
      }
    },
    beforeCreate() {
      this.$store
        .dispatch("retrieveProfile")
        .catch(err => console.log(err));
    },
    computed: {
      currentUser() {
        return this.$store.getters.currentUser;
      }
    }
  }
</script>

<style scoped>

</style>
