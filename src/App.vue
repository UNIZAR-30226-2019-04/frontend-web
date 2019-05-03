<template>
  <div id="app">
    <head>
      <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
            rel="stylesheet">
    </head>
    <Header></Header>
    <router-view></router-view>

    <div id="Footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Hello from "./views/Hello";
  import DefaultHeaderDropdownAccnt from "./containers/DefaultHeaderDropdownAccnt.vue";
  import Navbars from "./views/base/Navbars";
  import Filters from "./components/Filters";
  import Footer from "./components/Footer";

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

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    position: relative;
    display: flex;
    flex-direction: column;
    /*height: fit-content; !* Hace que el header no desaparezca cuando se hace scroll vertical. *!*/
    /*height: 105%; !* Hace que el header no desaparezca cuando se hace scroll vertical. *!*/
  }

  html, body {
    height: 100%;
  }

  Footer {
    /*bottom: 0%;*/
    width: 100%;
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
    color: #123123;
  }

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

</style>
