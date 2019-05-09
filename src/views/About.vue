<template>
  <div>
    <router-link to="PruebaProducto">Ir a integracion de producto</router-link>
    <div
      id="e3"
      style="max-width: 400px; margin: auto;"
      class="grey lighten-3"
    >

      <v-toolbar
        color="pink"
        dark
      >
        <v-toolbar-title>Chat</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card>
        <v-list expand="true">
          <v-list-tile
            style="align-items: end"
            avatar
            v-for="(chat, index) in conversaciones" :key="index"
          >

            <v-list-tile-avatar v-if="!msjMio(chat.user)">
              <img :src="msjMio(chat.user) ? avatar1 : avatar2" alt="Avatar del usuario">
            </v-list-tile-avatar>


            <v-card class="message-in" :color="msjMio(chat.user) ? 'blue' : 'green'">
              {{chat.text}}
              <!--{{chat.text}}-->
              <!--{{chat.text}}-->
              <!--<span class="subheading mr-sm-n1">{{chat.hora}}</span>-->
            </v-card>


            <v-list-tile-avatar v-if="msjMio(chat.user)">
              <img :src="msjMio(chat.user) ? avatar1 : avatar2" alt="Avatar del usuario">
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
              <v-text-field label="Mensaje" v-model="msj" outline></v-text-field>
            </v-flex>
            <v-btn dark fab color="pink" v-on:click="nuevoMsj()">
              <v-icon>send</v-icon>
            </v-btn>
          </b-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>

  export default {
    name: "About",
    components: {},
    data() {
      return {
        msj: '',
        user: 'R',
        avatar1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        avatar2: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        conversaciones: [
          {
            user: 'R',
            text: 'Mensaje de prueba 1',
            hora: '11:22'
          }, {
            user: 'R',
            text: 'Mensaje de prueba 2',
            hora: '11:22'
          }, {
            user: 'L',
            text: 'Mensaje de prueba 3',
            hora: '11:22'
          }, {
            user: 'R',
            text: 'Mensaje de prueba 4',
            hora: '11:22'
          }, {
            user: 'L',
            text: 'Mensaje de prueba 5',
            hora: '11:22'
          }, {
            user: 'L',
            text: 'Mensaje de prueba 6',
            hora: '11:22'
          },
        ]
      }
    },
    methods: {
      msjMio(Usuario) {
        return (Usuario === 'R');
      },
      nuevoMsj() {
        let d = new Date();
        let a = {
          user: 'R',
          text: this.msj,
          hora: d.getHours() + ":" + d.getMinutes()
        };
        this.conversaciones.push(a);
        this.msj = '';
      }
    }
  }
</script>

<style scoped>
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
