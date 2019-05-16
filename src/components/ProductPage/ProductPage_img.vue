<template>
  <div>
    <b-card no-body class="mb-1" style="margin-left: 15px ">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info"
                  style="background-color: #20a8d8; color: white; font-size: 1.3rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%">
          Detalles del vendedor
        </b-button>
      </b-card-header>
      <!--<b-card-->
      <!--img-alt="Image"-->
      <!--img-top-->
      <!--tag="article"-->
      <!--no-body-->
      <!--style="margin-top: 20px; margin-left: 20px;">-->
      <!--<h4 slot="header" style="text-align: center; text-emphasis: black ">Detalles del vendedor</h4>-->

      <!--<b-card-body>-->
      <!--<b-card-title>Imágenes del producto</b-card-title>-->
      <!--</b-card-body>-->

      <b-list-group style="font-size: 1.1rem; font-weight: lighter">
        <b-list-group-item>{{ method.vendido_por }}</b-list-group-item>
        <!--<b-list-group-item>{{ method.vendor_data }}</b-list-group-item>-->
        <!--<button @click="jeje()">jeje</button>-->
        <!--<h1>{{this.info}}</h1>-->
        <b-list-group-item>
          <!--<img src=info.data.imagen_perfil-->
          <img :src=info.data.imagen_perfil width=100%>
        </b-list-group-item>
        <b-list-group-item>
          {{ info.data.nombre }}
          <br/>
          {{ info.data.apellidos }}
        </b-list-group-item>
        <b-list-group-item>{{ info.data.descripcion }}</b-list-group-item>
        <b-list-group-item>{{ info.data.productos_vendidos }}</b-list-group-item>
        <b-list-group-item>Aqui pueden venir las fotos del vendedor</b-list-group-item>
      </b-list-group>
      <!--<b-list-group flush border="none">-->
      <!--<img :src=method.images[0].src width="40px">-->
      <!--<img :src=method.images[1].src width="40px">-->
      <!--</b-list-group>-->

      <!--<b-card-img :src="fotoExtra" alt="Image" bottom/>-->
    </b-card>
  </div>
</template>

<script>
  import {API_BASE} from "../../config";
  import axios from "axios";

  export default {
    name: "ProductPage_img",
    data() {
      return {
        id_vendedor: this.method.vendido_por,
        info: null,
        // vendor_data: null,
      }
    },
    // la funcion que hereda del papi
    props: {
      method: {type: Function},
    },
    mounted() {
      console.log('MOUUUUUUUUUUUUUUUUUUUUUUUUUUNTED--------------');
      // this.method();
      console.log(`${API_BASE}/user/${this.id_vendedor}`);
      //http://155.210.47.51:5000/user/8e4de80f-d9bf-411c-a696-58e3481a1b36
      axios.get(`${API_BASE}/user/${this.id_vendedor}`).then(response => (this.info = response));
      // axios.get(`http://155.210.47.51:5000/user/${this.id_vendedor}`).then(response => (this.info = response));
      // console.log(info.nombre);
    },
    methods: {}
  }
</script>

<style scoped>

</style>
