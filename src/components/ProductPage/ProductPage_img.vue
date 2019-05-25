<template>
  <div>
    <b-card no-body class="mb-1" style="margin-left: 15px ">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info"
                  style="background-color: #20a8d8; color: white; font-size: 1.3rem; font-weight: bold; margin-top: 0.5%; margin-bottom: 0.5%">
          Detalles del vendedor
        </b-button>
      </b-card-header>

      <b-list-group style="font-size: 1.1rem; font-weight: lighter">
        <b-list-group-item style="text-align: center">{{ info.data.nick }}</b-list-group-item>
        <b-list-group-item>
          <img :src=info.data.imagen_perfil width=100%>
        </b-list-group-item>
        <div v-if="info.data.nombre !== null">
          <b-list-group-item>
            {{ info.data.nombre }}
            <div v-if="info.data.apellidos !== null">
              {{ info.data.apellidos }}
            </div>
          </b-list-group-item>
        </div>

        <div v-if="info.data.descripcion !== null">
          <b-list-group-item>
            {{ info.data.descripcion }}
          </b-list-group-item>
        </div>
        <b-list-group-item>
          <p style="font-weight: bold">Ventas realizadas:</p>
          {{ info.data.productos_vendidos }}
        </b-list-group-item>
        <!--<b-row style="alignment: center; align-items: center; align-content: center; align-self: center">-->
        <div v-if="this.id_vendedor !== this.$store.getters.user">
          <b-list-group-item style="align-content: center; ">
            <v-btn style="background-color: green; font-weight: bold; color: white;" @click="nuevoChat">Chat</v-btn>
            <v-btn style="background-color: #20a8d8; font-weight: bold; color: white;" @click="seguirUser">Seguir
              Usuario
            </v-btn>
          </b-list-group-item>
        </div>

        <!--Aqui-->

      </b-list-group>
    </b-card>
    <!--<button @click="showInfo">debug</button>-->
  </div>
</template>

<script>
  import {API_BASE} from "../../config";
  import axios from "axios";
  import ButtonGroups from "../../views/buttons/ButtonGroups";
  import BListGroup from "bootstrap-vue/src/components/list-group/list-group";

  export default {
    name: "ProductPage_img",
    components: {BListGroup, ButtonGroups},
    data() {
      return {
        id_vendedor: this.method.vendido_por,
        info: null,
        miNick: null,
        seguidos: [],
        siguiendo: false

        // vendor_data: null,
      }
    },
    props: {
      method: {type: Function},
    },
    async mounted() {
      //console.log('MOUUUUUUUUUUUUUUUUUUUUUUUUUUNTED--------------');
      // this.method();
      //console.log(`${API_BASE}user/${this.id_vendedor}`);
      //http://155.210.47.51:5000/user/8e4de80f-d9bf-411c-a696-58e3481a1b36
      axios.get(`${API_BASE}user/${this.id_vendedor}`).then(response => (this.info = response));
      let url = API_BASE + 'seguir/' + this.$store.getters.user +'/seguidos';
      console.log('-------------');
      let response = await axios.get(url);
      this.seguidos = response.data;
      let vend = this.id_vendedor;
      let ind = this.seguidos.findIndex(function (element) {
        return element.seguido === vend;
      });
      this.siguiendo = (ind > -1);

    },
    methods: {
      async nuevoChat() {
        let url = API_BASE + 'conversacion/';
        let header = {
          Content_Type: 'application/json',
          Authorization: this.$store.getters.token
        };
        let datos = {
          "comprador": this.$store.getters.user,
          "vendedor": this.id_vendedor,
          "email_comprador": this.$store.getters.name,
          "email_vendedor": this.info.data.nick
        };
        console.log('---------------');
        console.log(this.$store.getters.currentUser);
        console.log('---------------');
        console.log('---------------');
        console.log(datos);
        console.log('---------------');
        console.log('---------------');
        console.log(this.info);
        console.log('---------------');
        let respuesta = await axios.post(url, datos, {headers: header}).catch(error => (console.log(error)));
        console.log(respuesta);
        this.$router.push({path: 'Chat', query: {id_conv: respuesta.data}})
      },
      seguirUser() {
        let url = API_BASE + 'seguir/' + this.$store.getters.user;
        let header = {
          Content_Type: 'application/json',
          Authorization: this.$store.getters.token
        };
        let data = {
          "seguido": this.id_vendedor
        };
        console.log('---------------');
        console.log(data);
        console.log('---------------');
        axios.post(url, data, {headers: header}).then(response => (console.log(response)));
        this.siguiendo = true;
      },
      dejarSeguir() {
        let url = API_BASE + 'seguir/' + this.$store.getters.user + '/remove';
        let header = {
          Content_Type: 'application/json',
          Authorization: this.$store.getters.token
        };
        let data = {
          "seguido": this.id_vendedor
        };
        console.log('---------------');
        console.log(data);
        console.log('---------------');
        axios.post(url, data, {headers: header}).then(response => (console.log(response)));
        this.siguiendo = false;
      },
      showInfo: function () {
        console.log(this.info);
        console.log(this.info.data);
        console.log(this.info.data.nick);
        console.log(this.id_vendedor);
        console.log(this.$store.getters.user);
        let vende = this.id_vendedor;
        let user = this.$store.getters.user;
        console.log(vende, user);
        console.log(vende === user);

        // if(kkk === ){}

      }
    }
  }
</script>

<style scoped>

</style>
