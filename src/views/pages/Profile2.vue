<template>
  <b-container fluid>
    <b-row style="margin-right: 15px;">
      <b-col cols="auto" sm="3">
        <UserCard :user-info="currentUser"></UserCard>
      </b-col>
      <b-col>
        <!--<h1 class="text-hide" style="background-image: url('../icons/'); width: 50px; height: 50px;">Bootstrap</h1>-->
        <UserTab :user="usuario"></UserTab>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import UserCard from '../../components/UserCard'
  import UserTab from "../../components/UserTab";
  import axios from "axios";

  export default {
    name: "Profile",
    components: {UserTab, UserCard},
    data() {
      return {
        usuario: null
      }
    },
    async beforeCreate() {
      let url = API_BASE + 'user/' + this.$route.query.usuario;
      let response = await axios.get(url);
      this.usuario = response;
    },
    computed: {
      currentUser() {
        return this.usuario.data;
      }
    }
  }
</script>

<style scoped>

</style>
