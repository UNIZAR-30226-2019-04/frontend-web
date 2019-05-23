<template>
  <div
    style="max-width: 700px"
    id="e3"
    class="grey lighten-3"
  >
    <v-card >
      <v-toolbar color="blue" dark>
        <v-toolbar-title class="text-xs-center">Chat</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list class="v-list" ref="mensajes">
        <v-list-tile
          style="margin-bottom: 7px"
          avatar
          v-for="(chat, index) in msgs" :key="index"
        >

          <v-list-tile-avatar v-if="!msjMio(chat.usuario)">
            <img :src="msjMio(chat.usuario) ? imagenYo : imagenOtro" alt="Avatar del usuario">
          </v-list-tile-avatar>


          <!--<v-card class="message-in" :color="msjMio(chat.user) ? 'blue' : 'green'">-->
          <!--{{chat.text}}-->
          <!--&lt;!&ndash;{{chat.text}}&ndash;&gt;-->
          <!--&lt;!&ndash;{{chat.text}}&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="subheading mr-sm-n1">{{chat.hora}}</span>&ndash;&gt;-->
          <!--</v-card>-->

          <v-list-tile-content  :class="msjMio(chat.usuario) ? 'message-out' : 'message-in'" >
            <v-list-tile-title v-html="chat.texto" style="align-self: self-end"></v-list-tile-title>
            <v-list-tile-sub-title v-html="hora(chat.fecha)"></v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-avatar v-if="msjMio(chat.user)">
            <img :src="msjMio(chat.usuario) ? imagenYo : imagenOtro" alt="Avatar del usuario">
          </v-list-tile-avatar>
        </v-list-tile>

      </v-list>
    </v-card>

    <v-card>
      <v-container
        fluid
        grid-list-lg
      >
        <b-row>
          <v-flex>
            <v-textarea
              v-model="msj"
              auto-grow
              box
              color="deep-purple"
              label="Mensaje"
              rows="1"
              @keypress.enter="nuevoMsj"
            >
            </v-textarea>
          </v-flex>
          <v-btn dark fab color="blue" v-on:click="nuevoMsj()">
            <v-icon>send</v-icon>
          </v-btn>
        </b-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>

  import {API_BASE} from "../config";
  import axios from "axios";
  import SocketIOClient from "socket.io-client/dist/socket.io";
  import * as easings from 'vuetify/es5/util/easing-patterns'
  import io from "socket.io-client";

  export default {
    name: "chatWindow",
    components: {},
    props: {id_chat: {default: 0}, msgs: {default: []}, imagenYo : {default: ""}, imagenOtro: {default: ""}},
    data() {
      return {
        mensajesChat: [],
        dias: [[]],
        msj: '',
        user: 'R',
        setState: null,
        socket: io(`${API_BASE}mychat`),
        avatar1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        avatar2: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      }
    },

    async mounted(){
      console.log("Socket : ", this.socket);
      this.socket.emit("JOINED", {
        room: this.id_chat
      });

      this.socket.on("MESSAGE", data => {
        console.log("MESSAGE", data);
        this.msgs.push(data);
      });
      //this.$refs['mensajes'].scrollTop = this.$refs['mensajes'].scrollHeight;
      let prim = 0;
      let elem = 0;
      for (let i = 0; i < this.msgs.length; i++) {
        let f1 = new Date(this.msgs[i].fecha);
        let f2 = new Date(this.msgs[i+1].fecha);
        if(f1.getDate() !== f2.getDate()){
          this.dias.push(this.msgs.slice(prim,i+1));
          prim = i + 1;
        }
      }
    },
    methods: {
      hora: function(fecha){
        let f = new Date(fecha);
        return (f.getHours() + ':' + f.getMinutes());
      },
      sendMessage(msg) {
        console.log("Room: ", this.id_chat);
        let d = new Date();
        console.log("SEND_MESSAGE", msg);
        this.socket.emit("SEND_MESSAGE", {
          usuario: this.$store.getters.user,
          texto: msg,
          conversacion: this.id_chat,
          room: this.id_chat,
          fecha: d
        });
      },
      msjMio(Usuario) {
        return (Usuario === this.$store.getters.user);
      },
      nuevoMsj() {
        this.sendMessage(this.msj);
        this.msj = '';
      }
    }
  }
</script>

<style scoped>

  .v-list {
    height: 400px;
    overflow-y: auto;
  }

  .message-out {
    width: 45%;
    border-radius: 10px;
    padding: .5em;
    /*   margin-bottom: .5em; */
    font-size: .8em;
    background: #407FFF;
    color: white;
  }

  .message-in {
    width: 45%;
    border-radius: 10px;
    padding: .5em;
    /*   margin-bottom: .5em; */
    font-size: .8em;
    background: #F1F0F0;
    color: black;
  }

  .msg_cotainer {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    border-radius: 25px;
    background-color: #82ccdd;
    padding: 10px;
    position: relative;
  }

  .msg_cotainer_send {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    border-radius: 25px;
    background-color: #78e08f;
    padding: 10px;
    position: relative;
  }

  .msg_time_send {
    position: absolute;
    right: 0;
    bottom: -15px;
    color: rgba(115, 109, 108, 0.91);
    font-size: 10px;
  }

  .msg_time {
    position: absolute;
    left: 0;
    bottom: -15px;
    color: rgba(115, 109, 108, 0.91);
    font-size: 10px;
  }

  .message {
    margin-bottom: 3px;
  }

  .message.own {
    text-align: right;
  }

  .message.own .content {
    background-color: lightskyblue;
  }

  .chat-container .username {
    font-size: 18px;
    font-weight: bold;
  }

  .chat-container .content {
    padding: 8px;
    background-color: lightgreen;
    border-radius: 10px;
    display: inline-block;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
    max-width: 50%;
    word-wrap: break-word;
  }

  @media (max-width: 480px) {
    .chat-container .content {
      max-width: 60%;
    }
  }

</style>
