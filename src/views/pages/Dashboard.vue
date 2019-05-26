<template>
  <div>
    <b-card style="margin-right: 20px; margin-left: 20px;">
      <b-jumbotron bg-variant="blue" text-variant="white" style="width: 100%; height: 100%">
        <template slot="header">
          Bienvenido a Telocam
        </template>
        <template slot="lead">
          Aquí podrás encontrar todo lo que necesitas, desde un boligrafo... ¡hasta la casa de tus sueños!
        </template>
        <hr class="my-4">
        <p>
          Compras, trueques o subastas. Tú eliges qué quieres y cómo lo quieres. ¿A qué esperas para descubrir qué hay en la tienda?
        </p>
        <b-btn href="/Login" size="lg" variant="light" style="margin-right: 10px;">
          <b class="icon-bag" style="margin-right: 4px;"></b> Entrar a la tienda
        </b-btn>
      </b-jumbotron>
    </b-card>
    <b-row>
      <b-row style="margin-top: 30px; width: 100%">
        <b-col cols="9">
          <div
            style="margin-right: 10px;   padding: 0 0 0 15px;">
            <h2 style="margin-left: 30px;">
              Quizá te interese...
            </h2>
          </div>
        </b-col>
        <b-col cols="3" align="right">
          <b-btn v-on:click="resetSelection" size="lg" variant="outline-primary" style="margin-right: 10px;">
            <b class="icon-refresh" style="margin-right: 4px;"></b> Recomiéndame otros
          </b-btn>
        </b-col>
      </b-row>

      <b-tab title="Productos recomendados" active
             style="margin-top: 10px; margin-left: 15px; max-height: 90vh; width: 1000%; padding: 0 30px 0 15px;">
        <div id="wrapper">
          <table id="fluid">
            <tr>
              <td v-for="(product, index) in productSelection" :key="index" ><ProductBox
                              :product="product"
                              :comprado="false"
                              style="margin-right: 10px; margin-left: 10px;"></ProductBox></td>
            </tr>
          </table>
        </div>
      </b-tab>
      <hr/>
      <b-row style="margin-top: 30px;">
        <div
          style="margin-right: 10px;   padding: 0 0 0 15px;">
          <h2 style="margin-left: 50px;">
            Últimos productos
          </h2>
        </div>
      </b-row>
      <b-tab title="Productos nuevos" active
             style="margin-top: 30px; margin-bottom: 30px; margin-left: 30px; width: 100%; padding: 0 30px 0 15px;">
        <b-card-group columns>
          <ProductBox v-for="(product, index) in productsById.slice(0, 7 + Math.floor(Math.random() * 2))"
                      :key="index"
                      :product="product"
                      :comprado="false"
                      style="margin-bottom: 10px;"></ProductBox>
        </b-card-group>
      </b-tab>
    </b-row>
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
        productSelection: []
      }
    },
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
      resetSelection: function() {
        let max = this.products.length - 5;
        let min = 0;
        let baseSel = Math.floor(Math.random() * (max - min)) + min;
        console.log(baseSel);
        this.productSelection = this.products.slice(baseSel, 5 + baseSel);
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
        this.resetSelection();
        this.total = response.data.resultados;
      });
      let url_prods_by_id = API_BASE + 'producto/?orden_id=True&number=10';
      axios.get(url_prods_by_id).then(response => {
        this.productsById = response.data.productos;
        this.totalById = response.data.resultados;
      });
    },
    computed: {
      isLogged() {
        return this.$store.getters.isLoggedIn
      }
    }
  }
</script>

<style scoped>
  #wrapper {
  }
  table#fluid {
    width: 100%;
  }
  table#fixed {
    width: 1000px;
    margin: 10px 0 0;
  }
  table td {
    width: 300px;
  }

</style>
