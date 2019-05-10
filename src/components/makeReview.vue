<template>
    <v-card height="300px" width="500px">
    <form>
      <v-text-field
        v-model="name"
        label="Titulo"
        required
      ></v-text-field>
      <v-textarea
        v-model="descripcion"
        label="descripcion"
        required
      ></v-textarea>
      <StarRating @rating="setRating" :value="valor" style="mx-auto d-block"></StarRating>
      <v-btn @click="submit">Submit</v-btn>
      <v-btn @click="clear">Clear</v-btn>
    </form>
    <p>Valoracion: {{valor}}</p>
    </v-card>
</template>

<script>
import StarRating from './StarRating';


  export default {
    name: "makeReview",
    components: {StarRating},
    data() {
      return {
        titulo: '',
        descripcion: '',
        valor: 0,
        fecha: null
      }
    },
    methods: {
      submit () {
        this.fecha = new Date();
      },
      clear () {
        this.titulo = ''
        this.descripcion = ''
      },
      setRating (value){
        this.valor = value;
      }
    }
  }
</script>

<style scopped>

</style>
