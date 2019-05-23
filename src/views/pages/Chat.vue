<template>
  <div>
    <v-layout row wrap style="margin-right: 30px">
      <v-flex xs5>
        <active-chats @nuevaConversacion="conversacionElegida" :chats="chatsActivos"></active-chats>
      </v-flex>
      <v-flex style="margin-left: 10px">
        <chat-window :msgs="mensajesChat" :id_chat="id_chat" :imagenOtro="imagenOtro" :imagenYo="imagenYo"></chat-window>
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
        imagenOtro: null,
        imagenYo: null,
      }
    },
    async mounted () {
      let headers = {
        Content_Type: 'application/json',
        Authorization: this.$store.getters.token
      };
      let url = `${API_BASE}conversacion/all/` + this.$store.getters.user;

      let response = await axios.get(url,{headers: headers});
        this.chatsActivos = response.data.data;
        if(response.data.data.length > 0) {
          this.id_chat = response.data.data[0].id;
          console.log('------------');
          console.log(this.id_chat);
          console.log('-------------');
          if (response.data.data[0].vendedor === this.$store.getters.user) {
            this.imagenOtro = response.data.data[0].imagen_comprador;
            this.imagenYo = response.data.data[0].imagen_vendedor;
          } else {
            this.imagenOtro = response.data.data[0].imagen_vendedor;
            this.imagenYo = response.data.data[0].imagen_comprador;
          }
        }
      url = `${API_BASE}chat/` + this.id_chat;
      response = await axios.get(url,{headers: headers});
      this.mensajesChat = response.data.data;
      console.log('-------------');
      console.log(response);
      console.log('-------------');
    },
    methods: {
      conversacionElegida(id){
        console.log('Capturado emit');
        this.id_chat = id;
      }
    }
  }
</script>

<style scoped>

</style>
