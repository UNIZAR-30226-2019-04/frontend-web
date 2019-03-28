<template>
  <div>
    <div style="margin-left: 20px; margin-top: 20px">
      <b-row style="margin-right: 15px;">
        <b-col cols="auto" sm="3">
          <div class="product__image" style="float: left; width: auto">
            <div>
              <!--<img-->
                <!--class="img-responsive" src="https://www.notebookcheck.net/fileadmin/_migrated/pics/100-18.JPG" alt="">-->
            </div>
            <div>
              <b-carousel
                id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                fade
                background="#ababab"
                :interval="3000"
                img-width="60"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
              >
                <b-carousel-slide class="carousel-inner" v-for="img in images" :img-src="img.src" :key="img.id">{{img.id}}
                </b-carousel-slide>
              </b-carousel>
            </div>
            <!-- Links que llevam al usuario-->
            <router-link to="Profile" class="product-link">
              <h2 style="margin-left: 20px"> Vendido por {{vendido_por}} </h2>
            </router-link>
          </div>
        </b-col>
      </b-row>
    </div>
    <b-col>
      <!--<h1 class="text-hide" style="background-image: url('../icons/'); width: 50px; height: 50px;">Bootstrap</h1>-->
      <!--<UserTab></UserTab>-->
      <b-card-body>
        <b-card-title>Descripción</b-card-title>
        <b-card-text>{{ descripcion }}</b-card-text>
        <b-card-text>{{ precio }}€</b-card-text>
      </b-card-body>
    </b-col>
  </div>
</template>

<script>
  export default {
    name: "ProductInfo",

    data() {
      return {
        descripcion: "Ordenador muy cuidado, siempre en casa y de uso ocasional. Únicamente navegación web y visualización de películas, nada de juegos.\n Se vende por falta de uso. Se acepta cambio por smartphone valorado en más de 300€",
        precio: 500,
        vendido_por: "Conan",
        images: [{
          src: "https://www.google.es/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwj_h-jZsqXhAhXV7eAKHROBAtwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.notebookcheck.net%2FAsus-K53-Series.51772.0.html&psig=AOvVaw1Y4RlXW3JT1bb3sIzZ9D-G&ust=1553881734706147",
          id: 1
        },
          {
            src: "https://www.google.es/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiVtN7isqXhAhWJDxQKHaa3C4wQjRx6BAgBEAU&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fwww.laptopmag.com%252Freviews%252Flaptops%252Fasus-k53e-b1%26psig%3DAOvVaw1Y4RlXW3JT1bb3sIzZ9D-G%26ust%3D1553881734706147&psig=AOvVaw1Y4RlXW3JT1bb3sIzZ9D-G&ust=1553881734706147",
            id: 2
          },]
      }
    }
  }

</script>

<style scoped>

</style>
