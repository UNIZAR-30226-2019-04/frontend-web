<template>
  <div>
    <div>
      <router-link to="PruebaProducto">Ir a integracion de producto</router-link>
    </div>
    <div>
      <makeReview></makeReview>
    </div>
  </div>
</template>

<script>
  import ChatWindow from "../components/chatWindow";
  import makeReview from '../components/makeReview'

  export default {
    name: "About",
    components: {ChatWindow, makeReview},
    data() {
      return {
        conversaciones: null
      }

    },
    methods: {
      getMsg: function (idConversacion) {

      }
    }
  }
</script>

<style scoped>

</style>
