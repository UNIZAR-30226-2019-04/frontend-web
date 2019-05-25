<template>
  <div>
    <b-row>
      <b-col sm style="margin-right: 60px;">
        <b-row style="margin-top: 30px;">
          <b-col cols="6">
            <div
              style="margin-right: 10px;   padding: 0 0 0 15px;">
              <h3 style="margin-left: 30px;">
                Productos recomendados para ti
              </h3>
            </div>
          </b-col>
        </b-row>

        <b-tab title="Productos recomendados" active
               style="margin-top: 30px; margin-left: 30px; width: 100%; padding: 0 30px 0 15px;">
          <b-card-group columns>
            <ProductBox v-for="(product, index) in products.slice(0, 5 + Math.floor(Math.random() * 2))" :key="index"
                        :product="product"
                        :comprado="false"
                        style="margin-bottom: 10px;"></ProductBox>
          </b-card-group>
        </b-tab>
      </b-col>
      <b-col sm style="margin-right: 60px;">
        <b-row style="margin-top: 30px;">
          <b-col cols="6">
            <div
              style="margin-right: 10px;   padding: 0 0 0 15px;">
              <h3 style="margin-left: 30px;">
                Productos nuevos
              </h3>
            </div>
          </b-col>
        </b-row>
        <b-tab title="Productos nuevos" active
               style="margin-top: 30px; margin-left: 30px; width: 100%; padding: 0 30px 0 15px;">
          <b-card-group columns>
            <ProductBox v-for="(product, index) in productsById.slice(0, 5 + Math.floor(Math.random() * 2))"
                        :key="index"
                        :product="product"
                        :comprado="false"
                        style="margin-bottom: 10px;"></ProductBox>
          </b-card-group>
        </b-tab>
      </b-col>
      <button @click="showProds()">DEBUG</button>
    </b-row>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <h1>---------------------------------------------</h1>
    <h1>---------------------------------------------</h1>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <h1>---------------------------------------------</h1>
    <h1>---------------------------------------------</h1>
    <h1>---------------------------------------------</h1>
    <h1>---------------------------------------------</h1>
    <h1>---------------------------------------------</h1>


    <div class="container-fluid">
      <h1 class="text-center my-3">Bootstrap 4 Card Carousel</h1>
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner row w-100 mx-auto">
          <b-card-group columns>
            <ProductBox v-for="(product, index) in products" :key="index"
                        :product="product"
                        :comprado="false"
                        style="margin-bottom: 10px;"></ProductBox>
          </b-card-group>


          <div class="carousel-item col-md-4 active">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Card 1</h4>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
                  content. This content is
                  a little bit longer.</p>
                <p class="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>


          <div class="carousel-item col-md-4">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Card 7</h4>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
                  content. This content is
                  a little bit longer.</p>
                <p class="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>


          <!--</div>-->
          <div class="container">
            <div class="row">
              <div class="col-12 text-center mt-4">
                <a class="btn btn-outline-secondary mx-1 prev" href="javascript:void(0)" title="Previous">
                  <i class="fa fa-lg fa-chevron-left"></i>
                </a>
                <a class="btn btn-outline-secondary mx-1 next" href="javascript:void(0)" title="Next">
                  <i class="fa fa-lg fa-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Filters from "../../components/Filters";
  import ProductBox from "../../components/ProductBox";
  import axios from "axios";
  import LIcon from "vue2-leaflet/src/components/LIcon";
  import {API_BASE} from "../../config";
  import Mapa from "../../components/Mapa";

  export default {
    name: "Search",
    components: {Mapa, LIcon, ProductBox, Filters},
    props: {
      textoProp: {
        type: String,
        default: 'prod'
      }
    },
    data() {
      return {
        preview: false,
        radius: null,
        tags: [],
        total: 0,
        totalById: 0,
        valMax: 5,
        texto: '',
        prMax: 1000,
        distanciaMax: 1000,
        value: '',
        order: null,
        porPagina: 10,
        pagina: 1,
        cats: [],
        tipo: [],
        products: [],
        productsById: [],
      }
    }
    ,
    methods: {
      showProds: function () {
        console.log('debug');
        console.log(this.products);
        console.log(this.productsById);
      },
      deleteTag: function (id) {
        this.tags.splice(id, 1);
        this.actualizarProds();
      },
      logProds() {
        console.log(this.products);
      },
      // ,
      // deleteCat: function (id) {
      //   this.cats.splice(id, 1);
      //   this.actualizarProds();
      // }
      // ,
      // deleteTipo: function (id) {
      //   this.tipo = [];
      //   this.actualizarProds();
      // }
      // ,
      // newTag: function (elem, tipo, newVal) {
      //   let a = {tag: elem};
      //   if (tipo === 'cat') {
      //     let found2 = this.cats.findIndex(function (element) {
      //       return element === elem;
      //     });
      //     if (found2 === -1) {
      //       this.cats.push(elem);
      //       this.actualizarProds();
      //     } else {
      //       this.deleteCat(found2);
      //     }
      //   }
      //   if (tipo === 'tipo') {
      //     this.tipo = [];
      //     this.tipo.push(elem);
      //     this.actualizarProds();
      //   }
      //   if (tipo === 'valoracion') {
      //     this.valMax = newVal;
      //     let found = this.tags.findIndex(function (element) {
      //       return element.tag === a.tag;
      //     });
      //     if (found === -1) {
      //       this.tags.push(a);
      //       this.actualizarProds();
      //     } else {
      //       this.deleteTag(found);
      //     }
      //   }
      // },
      // nuevoPrecio: function (precio) {
      //   this.prMax = precio;
      //   this.actualizarProds();
      // }
      // ,
      // nuevaDistancia: function (dist) {
      //   this.distanciaMax = dist;
      //   this.actualizarProds();
      // }
      // ,
      showOrder: function (value) {
        this.order = value;
      },
      elemPerPage: function (num) {
        this.porPagina = num;
        this.actualizarProds();
      },
      // elegido: function (num) {
      //   return (num === this.porPagina);
      // },
      currentPage(val) {
        this.pagina = val;
        this.actualizarProds();
      },
      // actualizarProds: function () {
      //
      //   let urlTags = API_BASE+'producto/?preciomin=0&valoracionMax=' + this.valMax;
      //   urlTags = urlTags + '&preciomax=' + this.prMax + '&page=' + (this.pagina-1) + '&number=' + this.porPagina;
      //   if (this.texto.length > 0) {
      //     console.log('texto : ', this.texto);
      //     urlTags = urlTags + '&textoBusqueda=' + this.texto;
      //   }
      //   if (this.tipo.length > 0) {
      //     urlTags = urlTags + '&tipo=' + this.tipo[0];
      //   }
      //   if (this.cats.length > 0) {
      //     urlTags = urlTags + '&categorias=';
      //     for (let i = 0; i < this.cats.length; i++) {
      //       urlTags = urlTags + this.cats[i];
      //       if (i < (this.cats.length - 1)) {
      //         urlTags = urlTags + ';';
      //       }
      //     }
      //   }
      //   // console.log(urlTags);
      //   axios.get(urlTags).then(response => {
      //     this.products = response.data.productos;
      //     this.total = response.data.resultados;
      //     console.log(response);
      //   });
      // }
    },
    // computed: {
    //   paginas() {
    //     let pag = Number((this.total / this.porPagina).toFixed(0));
    //     if (pag < 1) {
    //       return 1;
    //     } else {
    //       return pag+1;
    //     }
    //   }
    // },
    mounted() {
      let url_prods = API_BASE + 'producto';
      axios.get(url_prods).then(response => {
        this.products = response.data.productos;
        this.total = response.data.resultados;
      });
      let url_prods_by_id = API_BASE + 'producto/?orden_id=True&number=10';
      axios.get(url_prods_by_id).then(response => {
        this.productsById = response.data.productos;
        this.totalById = response.data.resultados;
      });
    }
  }
</script>

<style scoped>

</style>
