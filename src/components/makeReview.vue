<template>
  <!--<v-card height="300px" width="500px">-->
  <v-card>
    <form>
      <v-text-field
        v-model="titulo"
        label="Titulo"
        required
      ></v-text-field>
      <v-textarea
        v-model="descripcion"
        label="descripcion"
        required
      ></v-textarea>
      <StarRating @rating="setRating" :value="valor" class="d-block"></StarRating>
      <v-btn @click="uploadReview">Submit</v-btn>
      <v-btn @click="clear">Clear</v-btn>
    </form>
  </v-card>
</template>

<script>
  import StarRating from './StarRating';
  import axios from 'axios';
  import {API_BASE} from "../config";

  export default {
    name: "makeReview",
    components: {StarRating},
    props: ['valorado'],
    data() {
      return {
        titulo: '',
        descripcion: '',
        valor: 0,
        fecha: null
      }
    },
    methods: {
      submit() {
        this.fecha = new Date();
      },
      clear() {
        this.titulo = ''
        this.descripcion = ''
      },
      setRating(value) {
        this.valor = value;
      },
      uploadReview() {
        this.fecha = new Date();
        let data = {
          titulo: this.titulo,
          descripcion: this.descripcion,
          puntuacion: this.valor,
          puntuado: this.valorado
        };
        let url = API_BASE + '/valoracion/' + this.$store.getters.user;
        let headers = {
          'Content-Type': 'application/json',
          'Authorization': this.$store.getters.token
        };
        axios.post(url, data, {headers: headers}).catch(error => (console.log(error)));
        console.log(data);
        this.$emit('close');
      }
    }
  }
</script>

<style scopped>

</style>
