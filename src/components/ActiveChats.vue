<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="blue" dark>
          <v-toolbar-title class="text-xs-center">Chats Activos</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list subheader>
          <v-subheader>Recent chat</v-subheader>
          <v-list-tile
            v-for="(item, index) in chats"
            :key="index"
            avatar
            @click="conversacionElegida(item.id)"
          >
            <v-list-tile-avatar>
              <img :src="avatar(item)">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="mailOtro(item)"></v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
    export default {
        name: "ActiveChats",
      props: ['chats'],
      data () {
        return {
          items: [
            { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
            { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
            { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
            { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
          ],
          items2: [
            { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' }
          ]
        }
      },
      methods: {
          conversacionElegida(id){
            this.$emit('nuevaConversacion', id);
          },
        avatar: function (item) {
          if(item.vendedor === this.$store.getters.user){
            return item.imagen_comprador;
          }else{
            return item.imagen_vendedor;
          }
        },
        mailOtro: function (item) {
          if(item.vendedor === this.$store.getters.user){
            return item.email_comprador;
          }else{
            return item.email_vendedor;
          }
        },

      }
    }
</script>

<style scoped>

</style>
