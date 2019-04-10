<template>
  <b-container>
    <b-row style="margin-right: 15px;">
      <b-col cols="auto" sm="3">
        <UserCard></UserCard>
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
    export default {
        name: "Profile",
      components: {UserTab, UserCard}
    }
</script>

<style scoped>

</style>
