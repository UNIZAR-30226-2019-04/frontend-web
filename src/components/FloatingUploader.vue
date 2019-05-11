<template>
  <div>
    <v-btn dark fab small color="blue" v-on:click="toggleShow">
      <v-icon class="material-icons">{{buttonIcon}}</v-icon>
    </v-btn>
    <my-upload field="img"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="show"
               :width="300"
               :height="300"
               :url="imgDataUrl"
               lang-type="en"
               :params="params"
               :headers="headers"
               img-format="png"></my-upload>
  </div>
</template>

<script>
  import upload from 'vue-image-crop-upload';

  export default {
    name: "FloatingUploader",
    props: ['buttonIcon'],
    data() {
      return {
        show: false,
        params: {
          token: '123456798',
          name: 'avatar'
        },
        headers: {
          smail: '*_~'
        },
        imgDataUrl: 'http://httpbin.org/post' // the datebase64 url of created image
      }
    },
    components: {
      'my-upload': upload
    },
    methods: {
      toggleShow() {
        this.show = !this.show;
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl, field){
        console.log('-------- crop success --------');
        this.imgDataUrl = imgDataUrl;
      },
      /**
       * upload success
       *
       * [param] jsonData  server api return data, already json encode
       * [param] field
       */
      cropUploadSuccess(jsonData, field){
        console.log('-------- upload success --------');
        console.log(jsonData);
        console.log('field: ' + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field){
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      }
    }
  };
</script>
