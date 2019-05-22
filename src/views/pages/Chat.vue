<template>
  <div>
    <v-layout row wrap style="margin-right: 30px">
      <v-flex xs5>
        <active-chats @nuevaConversacion="conversacionElegida" :chats="chatsActivos"></active-chats>
      </v-flex>
      <v-flex style="margin-left: 10px">
        <chat-window :id_conversacion="id_chat"></chat-window>
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
        id_chat: null
      }
    },
    beforeCreate() {
      let headers = {
        Content_Type: 'application/json',
        Authorization: this.$store.getters.token
      };
      let url = `${API_BASE}conversacion/all/` + this.$store.getters.user;
      axios.get(url,{headers: headers}).then(response => (this.chatsActivos = response.data));
      if(this.chatsActivos.length > 0){
        this.id_chat = this.chatsActivos[0].id;
      }
    },
    methods: {
      conversacionElegida(id){
        this.id_chat = id;
      }
    }
  }
</script>

<style scoped>

</style>
