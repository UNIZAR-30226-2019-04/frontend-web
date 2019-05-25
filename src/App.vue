<template>
  <div id="app">
    <head title="Telocam">
      <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
            rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css">
    </head>
      <!--<div class="mainheader">-->
      <!--</div>-->
    <div class="content">
      <Header></Header>
      <vue-particles color="#ababab" :moveSpeed="2"></vue-particles>
      <router-view></router-view>
      </div>

      <div class="footer">
        <Footer></Footer>
      </div>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import Hello from "./views/Hello";
  import DefaultHeaderDropdownAccnt from "./containers/DefaultHeaderDropdownAccnt.vue";
  import Navbars from "./views/base/Navbars";
  import Filters from "./components/Filters";

  export default {
    name: 'app',
    components: {Footer, Filters, Hello, Header, DefaultHeaderDropdownAccnt, Navbars},
    data() {
      return {
        card: 'One piece is real!'
      }
    }
  }
</script>

<style lang="scss">
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';
  body {
    margin: 0;
  }

  #particles-js {
    position: absolute; background-size: cover; top: 0; bottom: 0; left: 0; right: 0; overflow-y: hidden; z-index: 0;

  }

  #app {
    font-family: 'Trebuchet MS', Helvetica, Arial, sans-serif;
    font-size: 1.2rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    position: relative;
    display: flex;
    flex-direction: column;


    /*height: fit-content; !* Hace que el header no desaparezca cuando se hace scroll vertical. *!*/
    /*height: 105%; !* Hace que el header no desaparezca cuando se hace scroll vertical. *!*/
  }

  html, body {
    height: 100%;
  }

  footer {
    width: 100%;
    height: 41px;
  }

  main {
    text-align: center;
    margin-top: 40px;
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #fffdf5;
  }

  /*mainheader{*/
    /*!*color: #123123;*!*/
    /*!*background-color: #123123;*!*/
  /*}*/

  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }

  .content {
    min-height: calc(100vh - 40px);
  }

</style>
