<template>
  <!--<b-navbar toggleable="md" type="357ff4" variant="357ff4" fixed="top" sticky class="shadow p-3 mb-5">-->
  <!--<b-navbar toggleable="md" type="light" variant="light" fixed="top" sticky class="shadow p-3 mb-5">-->
  <b-navbar toggleable="md" type="dark" variant="blue" fixed="top" sticky class="shadow p-1 mb-5"> <!-- #20a8d8 -->

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand style="margin-left: 10px;" href="/">
      <!--<img src="../../public/img/telocam-logo.png" class="rounded-circle" width="70" height="70" alt="Logo de Telocam"/>-->
      <img src="../../public/img/telocam-logo2.png" width="64" height="64"
           alt="Logo de Telocam"/>
      <a style="font-size: 1.3rem; margin-left: 5px">
        Telocam
      </a>
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" style="margin-right: 20px;">

        <b-navbar-nav>
          <b-nav-item v-if="!isLogged" style="outline-color: green">
            <router-link to="LogIn" style="font-size: 1.3rem; color: white">
              <b-btn variant="outline-light" style="font-size: 1rem; color: white; font-weight: bold;">
                <b>
                  Acceder
                </b>
              </b-btn>
            </router-link>
          </b-nav-item>
          <!--<b-nav-item v-if="!isLogged" style="outline-color: green">-->
          <!--<router-link to="LogIn">Log In</router-link>-->
          <!--</b-nav-item>-->
          <!--<b-nav-item v-if="!isLogged">-->
          <!--<router-link to="Sign">Sing Up</router-link>-->
          <!--</b-nav-item>-->
        </b-navbar-nav>

        <!--<span @mouseover="over = true"-->
        <!--@mouseleave="over = false"-->
        <!--:class="{elegido: over }"-->
        <!--&gt;Chat</span>-->

        <b-nav-item v-if="this.$store.getters.user !== 'no_user'">
          <router-link to="Search" style="color: white">
            <b-btn variant="outline-light">
              <b>
                Búsqueda
              </b>
            </b-btn>
          </router-link>
        </b-nav-item>

        <b-nav-item v-if="this.$store.getters.user !== 'no_user'">
          <router-link to="Chat"
                       style="color: white"
          >
            <b-btn variant="outline-light">
              <b class="icon-envelope"></b>
            </b-btn>
          </router-link>
        </b-nav-item>

        <b-nav-item-dropdown right v-if="this.$store.getters.user !== 'no_user'">
          <!-- Using button-content slot -->
          <template slot="button-content" style="color: white">
            <em style="color: white"><b-btn variant="outline-light"><b>Usuario</b></b-btn></em>
          </template>
          <b-dropdown-item href="#/Profile">
            <!--<router-link to="Profile">Perfil</router-link>-->Perfil
          </b-dropdown-item>
          <b-dropdown-item href="#/UploadProduct">
            Subir producto
          </b-dropdown-item>
          <b-dropdown-item v-on:click="logout">Salir</b-dropdown-item>
          </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  import * as router from "vue-router";

  export default {
    name: "Header",
    data() {
      return {
        picture: '../static/img/icons/safari-pinned-tab.svg',
        texto: '',
        over: false
      }
    },
    methods: {
      logout: function () {
        this.$store
          .dispatch("logout")
          .then(() => this.$router.push("/Login"))
          .catch(err => console.log(err));
      },
      // buscarTexto() {
      //   router.push({ name: 'Search', params: { texto: this.texto }});
      // }
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

  .elegido {
    background: green;
  }
</style>
