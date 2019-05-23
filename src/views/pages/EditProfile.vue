<template>
  <b-container>
    <b-row>
        <b-card >
          <b-btn size="lg" style="width: 100%;" v-on:click="changePass(false)" variant="outline-primary">Editar perfil</b-btn>
          <hr/>
          <b-btn size="lg" style="width: 100%;" v-on:click="changePass(true)" variant="outline-primary">Cambiar contraseña</b-btn>
          <!--<hr/>-->
          <!--<uploader buttonTitle="Establecer imagen de perfil"></uploader>-->
        </b-card>
        <ModUserForm v-if="!optionPass" :userData="user_info"></ModUserForm>
        <ModPassForm v-else></ModPassForm>
    </b-row>
  </b-container>
</template>

<script>
  import ModUserForm from "../../components/ModUserForm";
  import ModPassForm from "../../components/ModPassForm";
  import Uploader from "../../components/Uploader";
  import axios from "axios";
  export default {
    name: "EditProfile",
    components: {Uploader, ModPassForm, ModUserForm},
    data() {
      return {
        optionPass: false,
        user_info: {
          nick: '',
          descripcion: '',
          latitud: '',
          longitud: '',
          radio_ubicacion: '',
          nombre : '',
          apellidos : '',
          mail : '',
          telefono : '',
          quiere_mails : ''
        },
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
    // computed: {
    //   userdata(){
    //     let url = 'http://155.210.47.51:5000/user/' + this.$store.getters.user +'/edit';
    //     axios.get(url).then(response => {
    //       console.log(response);
    //       return response.data;
    //     });
    //     // console.log('Holaaa');
    //     // console.log(datos);
    //     // console.log('Holaaa');
    //     return datos;
    //   }
    // },
    beforeCreate() {
      let url = 'http://34.90.77.95:5000/user/' + this.$store.getters.user +'/edit';
      axios.get(url).then(response => (this.user_info = response.data));
    }
  }
</script>

<style scoped>

</style>
