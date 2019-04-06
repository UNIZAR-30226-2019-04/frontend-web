<template>
  <b-navbar toggleable="md" type="light" variant="light" fixed="top" sticky class="shadow p-3 mb-5 bg-purple">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">
      <img src="../../public/img/telocam-icon.jpg" class="rounded-circle" width="40" height="40" alt="Logo de Telocam"/>
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item style="outline-color: green">
          <router-link to="LogIn">Log In</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="Sign">Sing Up</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#/Profile">
            <!--<router-link to="Profile">Perfil</router-link>-->Perfil
          </b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item>
          <router-link to="About">About</router-link>
        </b-nav-item>
      </b-navbar-nav>


    </b-collapse>
  </b-navbar>
</template>

<script>
    export default {
        name: "Header",
      data() {
          return {
            picture : '../static/img/icons/safari-pinned-tab.svg'
          }
      }

    }
</script>

<style>
  .header {
    background: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
  }
  .header a {
    color: #fff;
    padding-right: 5px;
    text-decoration: none;
  }
</style>
