<template>
  <social-sharing url="localhost:8080"
                  title="RAMA, conoce el medio ambiente"
                  description="¡Qué bien me lo paso en RAMA!"
                  quote="RAMA"
                  hashtags="medioambiente,RAMA"
                  inline-template>
    <div>
      <network network="facebook" style="margin-right: 5px;">
        <b-button variant="facebook icon">
          <i class="fab fa-facebook"></i>
        </b-button>
      </network>
      <network network="twitter" style="margin-right: 5px;">
        <b-button variant="twitter icon">
          <i class="fab fa-twitter"></i>
        </b-button>
      </network>
      <network network="linkedin" style="margin-right: 5px;">
        <b-button variant="linkedin icon">
          <i class="fab fa-linkedin"></i>
        </b-button>
      </network>
      <network network="vk" style="margin-right: 5px;">
        <b-button variant="vk icon">
          <i class="fab fa-vk"></i>
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
