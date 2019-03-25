<template>
  <div>
    <b-row>
      <b-col cols="2">
        <StarRating :value="value" :disabled="true" style="mx-auto d-block">
        </StarRating>
        <img src="../../public/img/telocam-icon.jpg" class="rounded-circle mx-auto d-block" width="50" height="50" alt="Logo de Telocam"/>
      </b-col>
      <b-col>
        <h3>{{ titulo }}</h3>
        <small>{{ name }}</small>
        <p>{{ descripcion }}</p>
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
