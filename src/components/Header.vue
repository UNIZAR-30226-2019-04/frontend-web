<template>
  <!--<b-navbar toggleable="md" type="357ff4" variant="357ff4" fixed="top" sticky class="shadow p-3 mb-5">-->
  <!--<b-navbar toggleable="md" type="light" variant="light" fixed="top" sticky class="shadow p-3 mb-5">-->
  <b-navbar toggleable="md" type="dark" variant="blue" fixed="top" sticky class="shadow p-3 mb-5"> <!-- #20a8d8 -->

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">
      <!--<img src="../../public/img/telocam-logo.png" class="rounded-circle" width="70" height="70" alt="Logo de Telocam"/>-->
      <img src="../../public/img/logo_sombrablanca_v2.png" class="rounded-circle" width="70" height="70" alt="Logo de Telocam"/>
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item v-if="!isLogged" style="outline-color: green">
          <router-link to="LogIn" style="font-size: 1.3rem; color: white">Acceder</router-link>
        </b-nav-item>
        <!--<b-nav-item v-if="!isLogged" style="outline-color: green">-->
        <!--<router-link to="LogIn">Log In</router-link>-->
        <!--</b-nav-item>-->
        <!--<b-nav-item v-if="!isLogged">-->
        <!--<router-link to="Sign">Sing Up</router-link>-->
        <!--</b-nav-item>-->
        <b-nav-item>
          <router-link to="Search" style="font-size: 1.3rem; color: white">Búsqueda</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Búsqueda" v-model="texto"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" href="#/Search">Buscar</b-button>
          </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content" style="color: white">
            <em style="color: white">Usuario</em>
          </template>
          <b-dropdown-item href="#/Profile">
            <!--<router-link to="Profile">Perfil</router-link>-->Perfil
          </b-dropdown-item>
          <b-dropdown-item href="#/UploadProduct">
            Subir producto
          </b-dropdown-item>
          <b-dropdown-item href="#">Ajustes</b-dropdown-item>
          <b-dropdown-item v-on:click="logout">Salir</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item>
          <router-link to="About" style="color: white">About</router-link>
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
            picture : '../static/img/icons/safari-pinned-tab.svg',
            texto: ''
          }
      },
      methods: {
        logout: function() {
          this.$store
            .dispatch("logout")
            .then(() => this.$router.push("/"))
            .catch(err => console.log(err));
        },
      },
    },
    computed: {
      isLogged() {
        return this.$store.getters.isLoggedIn
      }
    }
  }
</script>

<style scoped>
  .header {
    /*background: #333;*/
    background: #4DBD74;
    /*color: #fff;*/
    color: #4DBD74;
    text-align: center;
    padding: 10px;
  }

  .header a {
    color: #4DBD74;
    padding-right: 5px;
    text-decoration: none;
  }
</style>
