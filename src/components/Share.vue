<template>
  <social-sharing url="localhost:8080"
                  title="RAMA, conoce el medio ambiente"
                  description="¡Qué bien me lo paso en RAMA!"
                  quote="RAMA"
                  hashtags="medioambiente,RAMA"
                  inline-template>
    <div>
      <network network="facebook">
        <b-button variant="facebook icon">
          <i class="fa fa-facebook"></i>
        </b-button>
      </network>
    </div>
  </social-sharing>
</template>


<script>
  import Vue from 'vue'

  var SocialSharing = require('vue-social-sharing');

  Vue.use(SocialSharing);

  export default {
    name: 'shareButton',
    props: {
      usersinput: Array
    }
  }
</script>
