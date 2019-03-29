<template>
  <b-row style="margin-right: 10px;">
    <b-col cols="auto" sm="3">
      <ProductPage_img :method="informacion()"></ProductPage_img>
    </b-col>
    <b-col>
      <!--<h1 class="text-hide" style="background-image: url('../icons/'); width: 50px; height: 50px;">Bootstrap</h1>-->
      <ProductPage_details :method="informacion()"></ProductPage_details>
    </b-col>
    <b-col cols="auto" sm="3">
      <!--<h1 class="text-hide" style="background-image: url('../icons/'); width: 50px; height: 50px;">Bootstrap</h1>-->
      <ProductPage_sell :method="informacion()"></ProductPage_sell>
    </b-col>

  </b-row>
</template>

<script>
  import ProductPage_img from './ProductPage_img'
  import ProductPage_details from './ProductPage_details'
  import ProductPage_sell from './ProductPage_sell'

  export default {
    name: "ProductPage",
    components: {ProductPage_img, ProductPage_details, ProductPage_sell},
    data() {
      return {
        myData: "jojojojojojojojojoj",
        fotoPerfil: 'https://www.pcper.com/files/imagecache/article_max_width/review/2011-04-24/asusk53e-3.jpg',
        descripcion: "Ordenador muy cuidado, siempre en casa y de uso ocasional. Únicamente navegación web y visualización de películas, nada de juegos.\n Se vende por falta de uso. Se acepta cambio por smartphone valorado en más de 300€",
        precio: 500,
        vendido_por: "Conan",
        images: [{
          src: "https://www.pcper.com/files/imagecache/article_max_width/review/2011-04-24/asusk53e-3.jpg",
          id: 1
        },
          {
            src: "https://www.google.es/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiVtN7isqXhAhWJDxQKHaa3C4wQjRx6BAgBEAU&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fwww.laptopmag.com%252Freviews%252Flaptops%252Fasus-k53e-b1%26psig%3DAOvVaw1Y4RlXW3JT1bb3sIzZ9D-G%26ust%3D1553881734706147&psig=AOvVaw1Y4RlXW3JT1bb3sIzZ9D-G&ust=1553881734706147",
            id: 2
          },]
      }
    },
    methods: {
      informacion: function () {
        return{
          myData: "jojojojojojojojojoj",
          fotoPerfil: 'https://www.pcper.com/files/imagecache/article_max_width/review/2011-04-24/asusk53e-3.jpg',
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
  }

</script>

<style scoped>
  .col-img {
    margin-left: 20px;
    float: none;
    width: 30%;
  }

  .col-detalle {
    margin-left: 20px;
    float: none;
    width: fit-content;
  }

  .col-venta {
    margin-left: 20px;
    float: none;
    width: 30%;
  }

  /* Clear floats after the columns */
  .row:after {
    content: "";
    display: table;
    clear: both;
  }
</style>
