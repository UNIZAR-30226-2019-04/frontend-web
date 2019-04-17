<template>
  <b-container fluid>
    <b-row style="margin-right: 15px;">
      <b-col cols="auto" sm="3">
        <UserCard :user-info="currentUser"></UserCard>
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
        currentUserAux: this.computed.currentUser()
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
