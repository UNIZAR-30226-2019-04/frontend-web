<template>
  <div>
    <b-row>
      <b-col cols="3">
        <StarRating :value="valoracion.puntuacion" :disabled="true" class="d-block">
        </StarRating>
        <img :src="valoracion.puntuador_img" class="rounded-circle mx-auto d-block" width="70" height="70" style="align-self: center" alt="Logo de Telocam"/>
      </b-col>
      <b-col>
        <h3>{{valoracion.titulo}}</h3>
        <small>{{valoracion.puntuador_nick}}</small>
        <p>{{valoracion.descripcion}}</p>
      </b-col>
    </b-row>
    <hr/>
  </div>
</template>

<script>
import StarRating  from './StarRating';
export default {
    name: 'UserReview',
    components: {StarRating},
    props: ['valoracion'],
    data () {
      return {
        value: 4,
        name: "Detective Conan",
        titulo: "Primera review",
        descripcion: "Primera descripcion"
      }
    }
}
</script>

<style>

</style>
