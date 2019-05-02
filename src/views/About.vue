<template>
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
      <v-list subheader>
        <v-list-tile
          v-for="(chat, index) in conversaciones"
          :key="index"
          avatar
        >
          <v-list-tile-avatar v-if="!msjMio(chat.user)">
            <img :src="msjMio(chat.user) ? avatar1 : avatar2">
          </v-list-tile-avatar>

          <!--<p :class=" msjMio(chat.user) ? 'message-in' : 'message-out'" :style="msjMio(chat.user) ? 'alingment-right' : 'alingment-left'">-->
            <!--{{chat.text}}-->
          <!--</p>-->

          <v-list-tile-content :class=" msjMio(chat.user) ? 'message-in' : 'message-out'" >
            <v-list-tile-title v-html="chat.text"></v-list-tile-title>
            <v-list-tile-sub-title v-html="chat.hora"></v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-avatar v-if="msjMio(chat.user)">
            <img :src="msjMio(chat.user) ? avatar1 : avatar2">
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
          },{
            user: 'R',
            text: 'Mensaje de prueba 2',
            hora: '11:22'
          },{
            user: 'L',
            text: 'Mensaje de prueba 3',
            hora: '11:22'
          },{
            user: 'R',
            text: 'Mensaje de prueba 4',
            hora: '11:22'
          },{
            user: 'L',
            text: 'Mensaje de prueba 5',
            hora: '11:22'
          },{
            user: 'L',
            text: 'Mensaje de prueba 6',
            hora: '11:22'
          },
        ]
      }
    },
    methods: {
      msjMio(Usuario){
        return (Usuario === 'R');
      },
      nuevoMsj(){
        let d = new Date();
        let a = {
          user: 'R',
          text: this.msj,
          hora: d.getHours()+":"+d.getMinutes()
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
</style>
