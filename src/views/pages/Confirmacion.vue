<template>
  <div>
    <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
      <template slot="header">Bienvenido a Telocam</template>

      <template slot="lead">
        Ya se ha confirmado la tu nueva cuenta con nosotros, inicia sesión para poder
        disfrutar de todos los increibles productos que ofrecemos
      </template>

      <hr class="my-4">

      <p>
        Si tienes cualquier pregunta no dudes en ponerte en contacto con nosotros
      </p>
    </b-jumbotron>
  </div>
</template>

<script>
    import {API_BASE} from "../../config";
    import axios from "axios";

    export default {
        name: "Confirmacion",
        mounted() {
          let url = API_BASE + 'user/' + this.$route.query.user + '/confirmar_email/' + this.$route.query.token;
          console.log("Public id: ", this.$route.query.user);
          console.log("Token: ", this.$route.query.token);
          axios.get(url).catch(error => (console.log(error)));
        }
    }
</script>

<style scoped>

</style>
