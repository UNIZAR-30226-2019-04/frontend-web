<template>
  <div>
    <v-layout row wrap style="margin-right: 30px">
      <v-flex xs4>
        <active-chats @nuevaConversacion="conversacionElegida" :chats="chatsActivos"></active-chats>
      </v-flex>
      <v-flex style="margin-left: 10px">
        <chat-window ref="ventanaChat" :msgs="mensajesChat" :id_chat="id_chat" :imagenOtro="imagenOtro" :imagenYo="imagenYo" :otro="otro"></chat-window>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import ChatWindow from "../../components/chatWindow";
  import ActiveChats from "../../components/ActiveChats";
  import axios from 'axios';
  import {API_BASE} from "../../config";

  export default {
    name: "Chat",
    components: {ActiveChats, ChatWindow},
    data() {
      return {
        chatsActivos: [],
        mensajesChat: [],
        id_chat: 0,
        id_param: 0,
        imagenOtro: null,
        imagenYo: null,
        otro: ""
      }
    },
    async mounted () {
      let headers = {
        Content_Type: 'application/json',
        Authorization: this.$store.getters.token
      };
      //Mejor q sea el usuario el que elija chat al entrar en la pagina
      let url = `${API_BASE}conversacion/all/` + this.$store.getters.user;

      let response = await axios.get(url,{headers: headers});
      this.chatsActivos = response.data.data;
      /*if(response.data.data.length > 0) {
        this.id_chat = response.data.data[0].id;

        console.log('------------');
        console.log(this.id_chat);
        console.log('-------------');
        if (response.data.data[0].vendedor === this.$store.getters.user) {
          this.imagenOtro = response.data.data[0].imagen_comprador;
          this.imagenYo = response.data.data[0].imagen_vendedor;
          this.otro = response.data.data[0].email_comprador;
        } else {
          this.imagenOtro = response.data.data[0].imagen_vendedor;
          this.imagenYo = response.data.data[0].imagen_comprador;
          this.otro = response.data.data[0].email_vendedor;

        }
      }*/


      url = `${API_BASE}chat/` + this.id_chat;
      response = await axios.get(url,{headers: headers});
      this.mensajesChat = response.data.data;
      console.log('-------------');
      console.log(response);
      console.log('-------------');
    },
    methods: {
      async conversacionElegida(id, mail){
        console.log('Capturado emit');
        let headers = {
          Content_Type: 'application/json',
          Authorization: this.$store.getters.token
        };
        this.id_chat = id;
        let url = `${API_BASE}chat/` + this.id_chat;
        let response = await axios.get(url,{headers: headers});
        this.otro = mail;
        this.mensajesChat = response.data.data;
        let ind = this.chatsActivos.findIndex(function (element) {
          return element.id === id;
        });
        if (this.chatsActivos[ind].vendedor === this.$store.getters.user) {
          this.imagenOtro = this.chatsActivos[ind].imagen_comprador;
          this.imagenYo = this.chatsActivos[ind].imagen_vendedor;
          this.otro = this.chatsActivos[ind].email_comprador;
        } else {
          this.imagenOtro = this.chatsActivos[ind].imagen_vendedor;
          this.imagenYo = this.chatsActivos[ind].imagen_comprador;
          this.otro = this.chatsActivos[ind].email_vendedor;

        }
        this.$refs['ventanaChat'].nuevoSocket(id);
      }
    }
  }
</script>

<style scoped>

</style>
