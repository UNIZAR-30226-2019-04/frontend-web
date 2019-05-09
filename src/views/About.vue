<template>
  <div>
    <makeReview></makeReview>
  </div>
</template>

<script>
  import ChatWindow from "../components/chatWindow";
  import makeReview from '../components/makeReview'
  export default {
    name: "About",
    components: {ChatWindow,makeReview},
    data() {
      return {
        conversaciones: null
      }

    },
    methods:{
      getMsg: function (idConversacion) {

      }
    }
  }
</script>

<style scoped>

</style>
