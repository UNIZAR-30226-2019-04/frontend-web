<template>
  <b-container>
    <b-row style="margin-right: 15px;">
      <b-col cols="auto" sm="3">
        <UserCard :user-info="userData()"></UserCard>
      </b-col>
      <b-col>
        <!--<h1 class="text-hide" style="background-image: url('../icons/'); width: 50px; height: 50px;">Bootstrap</h1>-->
        <UserTab></UserTab>
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
        info: {
          nick: "",
          imagen: Image
        },
        name: ""
      }
    },
    methods: {
      userData() {
        const dir = 'http://155.210.47.51:5000/user/' + this.$store.getters.user.toLocaleString();
        console.log(dir);
        console.log("HOLA");
        axios.get(dir)
          .then(function (response) {
            console.log(response);
            console.log("ADIOS");
            name = response.data.nick;
            console.log(name);
          })
          .catch(function (error) {
            console.log(error);
            console.log("ERROR");
          });
        this.info.nick = name;
        return this.info;
      }
    }

  }
</script>

<style scoped>

</style>
