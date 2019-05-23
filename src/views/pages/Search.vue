<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col col lg="4">
        <b-form-input size="lg" class="mr-sm-2" type="text" placeholder="Búsqueda"
                      v-on:change="actualizarProds"
                      @keypress="actualizarProds"
                      v-model="texto"/>
      </b-col>
      <b-btn variant="outline-primary" v-on:click="actualizarProds">
        Buscar
      </b-btn>
    </b-row>
    <b-row>
      <b-col cols="3" style="margin-left: 15px">
        <!--<p>Precio máximo: {{prMax}}</p>-->
        <!--<p>Distancia máxima: {{distanciaMax}}</p>-->
        <!--<p>ValoracionMin: {{valMax}}</p>-->
        <filters :valVendedor="valMax" :precioMax="prMax" @selected="newTag" @precio="nuevoPrecio"
                 @dist="nuevaDistancia"></filters>
      </b-col>

      <b-col style="margin-right: 10px">
        <b-row>
        <!--<b-row class="justify-content-md-center">-->
          <!--<b-col col lg="4">-->
            <!--<b-form-input size="md" class="mr-sm-2" type="text" placeholder="Búsqueda"-->
                          <!--v-on:change="actualizarProds"-->
                          <!--@keypress="actualizarProds"-->
                          <!--v-model="texto"/>-->
          <!--</b-col>-->
          <!--<b-btn v-on:click="actualizarProds">-->
            <!--Buscar-->
          <!--</b-btn>-->
        <!--</b-row>-->
        <b-row style="margin-top: 10px; margin-left: 30px;">
          <b-col cols="8">
            <b-btn size="lg" v-for="(tag, index) in tags" style="margin-right: 4px; font-size: 0.9rem" :key="index"
                   v-on:click="deleteTag(index)">
              {{tag.tag}}
            </b-btn>
            <b-btn size="lg" v-for="(cat, index) in cats" style="margin-right: 4px" :key="index" v-on:click="deleteCat(index)">
              {{cat}}
            </b-btn>
            <b-btn size="lg" v-for="(tipo, index) in tipo" style="margin-right: 4px" :key="index" v-on:click="deleteTipo(index)">
              {{tipo}}
            </b-btn>
          </b-col>
          <b-col cols="4">
            <div
              style="margin-right: 50px; alignment: right">
              <!--<b-form-select v-model="order" :options="options" size="md" style="font-size: 1rem;"-->
              <!--class="mt-3"></b-form-select>-->
              <b-button v-on:click="noMapa = !noMapa">{{noMapa ? 'Ver mapa' : 'Ver lista'}}</b-button>
            </div>
          </b-col>
        </b-row>
        <b-tab v-if="noMapa" title="Productos encontrados" active
               style="margin-top: 30px; margin-left: 30px; margin-right: 30px">
        <a style="margin-left: 30px;">
          Número de productos por página:
        </a>
        <b-button-group style="margin-left: 30px; align-self: center; border-color: darkgray">
          <b-button v-on:click="elemPerPage(10)" :variant="elegido(10) ? 'primary' : 'white'">10</b-button>
          <b-button v-on:click="elemPerPage(25)" :variant="elegido(25) ? 'primary': 'white'">25</b-button>
          <b-button v-on:click="elemPerPage(50)" :variant="elegido(59) ? 'primary': 'white'">50</b-button>
        </b-button-group>
        <b-tab title="Productos encontrados" active style="margin-top: 30px; margin-left: 30px; margin-right: 30px">
          <!--<p class="mt-3">Página {{ pagina }} de {{ (elementos/porPagina + 1).toFixed(0) }}</p>-->
          <b-card-group columns>
            <!--v-if="index<(porPagina*pagina) && index>=(porPagina*pagina-porPagina)"-->
            <ProductBox v-for="(product, index) in products" :key="index"
                        :product="product"
                        :comprado="false"
                        style="margin-bottom: 10px;"></ProductBox>
          </b-card-group>
          <b-button-group style="margin-bottom: 30px; align-self: center">
            <b-button v-on:click="currentPage(pagina-1)"><-</b-button>
            <b-button v-for="i in paginas" :key="i"
                      style="border-color: darkgray"
                      v-on:click="currentPage(i)"
                      :variant=" i === pagina ? 'primary' : 'white'">{{i}}
            </b-button>
            <b-button v-on:click="currentPage(pagina+1)">-></b-button>
          </b-button-group>
        </b-tab>
        <b-tab v-else title="Mapa de productos encontrados" active
               style="margin-top: 30px; margin-left: 30px; margin-right: 30px">
          <p>Productos a mostrar: {{products.length}}</p>
          <b-button v-on:click="logProds">Log prods</b-button>
          <Mapa :preview="preview" :radius="radius" :prods="products"></Mapa>
        </b-tab>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Filters from "../../components/Filters";
  import ProductBox from "../../components/ProductBox";
  import axios from "axios";
  import LIcon from "vue2-leaflet/src/components/LIcon";
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
        noMapa: true,
        preview: false,
        radius: null,
        tags: [],
        total: 0,
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
        options: [
          {value: null, text: 'Filtrar'},
          {value: 'a', text: 'Precio: más caros primero'},
          {value: 'b', text: 'Precio: más baratos primero'},
          {value: 'c', text: 'Novedades'},
          {value: 'd', text: 'Ofertas'}
        ],
        products: []
      }
    }
    ,
    methods: {
      deleteTag: function (id) {
        this.tags.splice(id, 1);
        this.actualizarProds();
      },
      logProds(){
        console.log(this.products);
      }
      ,
      deleteCat: function (id) {
        this.cats.splice(id, 1);
        this.actualizarProds();
      }
      ,
      deleteTipo: function (id) {
        this.tipo = [];
        this.actualizarProds();
      }
      ,
      newTag: function (elem, tipo, newVal) {
        let a = {tag: elem};
        if (tipo === 'cat') {
          let found2 = this.cats.findIndex(function (element) {
            return element === elem;
          });
          if (found2 === -1) {
            this.cats.push(elem);
            this.actualizarProds();
          } else {
            this.deleteCat(found2);
          }
        }
        if (tipo === 'tipo') {
          this.tipo = [];
          this.tipo.push(elem);
          this.actualizarProds();
        }
        if (tipo === 'valoracion') {
          this.valMax = newVal;
          let found = this.tags.findIndex(function (element) {
            return element.tag === a.tag;
          });
          if (found === -1) {
            this.tags.push(a);
            this.actualizarProds();
          } else {
            this.deleteTag(found);
          }
        }
      },
      nuevoPrecio: function (precio) {
        this.prMax = precio;
        this.actualizarProds();
      }
      ,
      nuevaDistancia: function (dist) {
        this.distanciaMax = dist;
        this.actualizarProds();
      }
      ,
      showOrder: function (value) {
        this.order = value;
      },
      elemPerPage: function (num) {
        this.porPagina = num;
        this.actualizarProds();
      },
      elegido: function (num) {
        return (num === this.porPagina);
      },
      currentPage(val) {
        this.pagina = val;
        this.actualizarProds();
      },
      actualizarProds: function () {
        let urlTags = 'http://155.210.47.51:5000/producto/?preciomin=0&valoracionMax=' + this.valMax;
        urlTags = urlTags + '&preciomax=' + this.prMax + '&page=' + (this.pagina - 1) + '&number=' + this.porPagina;
        // urlTags = urlTags + '&longitud=' + this.$store.getters.currentUser.longitud;
        // urlTags = urlTags + '&latitud=' + this.$store.getters.currentUser.latitud;
        // urlTags = urlTags + '&radioUbicacion=' + this.distanciaMax*1000;
        if (this.texto.length > 0) {
          console.log('texto : ', this.texto);
          urlTags = urlTags + '&textoBusqueda=' + this.texto;
        }
        if (this.tipo.length > 0) {
          urlTags = urlTags + '&tipo=' + this.tipo[0];
        }
        if (this.cats.length > 0) {
          urlTags = urlTags + '&categorias=';
          for (let i = 0; i < this.cats.length; i++) {
            urlTags = urlTags + this.cats[i];
            if (i < (this.cats.length - 1)) {
              urlTags = urlTags + ';';
            }
          }
        }
        // console.log(urlTags);
        axios.get(urlTags).then(response => {
          this.products = response.data.productos;
          this.total = response.data.resultados;
          console.log(response);
        });
      }
    },
    computed: {
      paginas() {
        let pag = Number((this.total / this.porPagina).toFixed(0));
        if (pag < 1) {
          return 1;
        } else {
          return pag;
        }
      }
    },
    mounted() {
      let urlTags = 'http://155.210.47.51:5000/producto/?preciomin=0&valoracionMax=' + this.valMax;
      urlTags = urlTags + '&preciomax=' + this.prMax + '&page=0' + '&number=' + this.porPagina;
      // urlTags = urlTags + '&longitud=' + this.$store.getters.currentUser.longitud;
      // urlTags = urlTags + '&latitud=' + this.$store.getters.currentUser.latitud;
      // urlTags = urlTags + '&radioUbicacion=' + this.distanciaMax*1000;
      // console.log('texto : ', this.texto);
      if (this.texto.length > 0) {
        urlTags = urlTags + '&textoBusqueda=' + this.texto;
      }
      // console.log('lat : ',this.$store.getters.currentUser.latitud);
      // console.log(urlTags);
      // console.log('long : ',this.$store.getters.currentUser.longitud);
      axios.get(urlTags).then(response => {
        this.products = response.data.productos;
        this.total = response.data.resultados;
        // console.log(response);
      });
    }
  }
</script>

<style scoped>

</style>
