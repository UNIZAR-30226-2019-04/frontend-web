<template>
  <div>
    <b-row>
      <b-col cols="2" style="margin-left: 15px">
        <p>Precio máximo: {{prMax}}</p>
        <p>ValoracionMin: {{valMax}}</p>
        <filters :valVendedor="valMax" :precioMax="prMax" @selected="newTag" @precio="nuevoPrecio"></filters>
      </b-col>
      <b-col style="margin-right: 0px">
        <b-row>
          <b-col cols="8">
            <b-btn v-for="(tag, index) in tags" style="margin-right: 4px; font-size: 0.9rem" :key="index" v-on:click="deleteTag(index)">
              {{tag.tag}}
            </b-btn>
            <b-btn v-for="(cat, index) in cats" style="margin-right: 4px" :key="index" v-on:click="deleteCat(index)">
              {{cat}}
            </b-btn>
            <b-btn v-for="(tipo, index) in tipo" style="margin-right: 4px" :key="index" v-on:click="deleteTipo(index)">
              {{tipo}}
            </b-btn>
          </b-col>
          <b-col cols="4">
            <div
              style="margin-right: 50px; alignment: right">
              <b-form-select v-model="order" :options="options" size="md" style="font-size: 1rem;" class="mt-3"></b-form-select>
            </div>
          </b-col>
        </b-row>
        <b-tab title="Productos encontrados" active style="margin-top: 30px; margin-left: 30px; margin-right: 30px">
          <!--<p class="mt-3">Página {{ pagina }} de {{ (elementos/porPagina + 1).toFixed(0) }}</p>-->
          <b-card-group columns>
            <ProductBox v-for="(product, index) in products" :key="index"
                        v-if="index<(porPagina*pagina) && index>=(porPagina*pagina-porPagina)" :product="product"
                        style="margin-bottom: 10px;"></ProductBox>
          </b-card-group>
          <b-pagination
            style="align-self: center"
            v-model="pagina"
            :total-rows="elementos"
            :per-page="porPagina"
            aria-controls="buscados"
          ></b-pagination>
          <b-button-group style="margin-bottom: 30px; align-self: center">
            <b-button v-on:click="elemPerPage(25)" :variant="elegido(25) ? estilo : estilo2">25</b-button>
            <b-button v-on:click="elemPerPage(50)" :variant="elegido(50) ? estilo: estilo2">50</b-button>
            <b-button v-on:click="elemPerPage(100)" :variant="elegido(100) ? estilo: estilo2">100</b-button>
          </b-button-group>
        </b-tab>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Filters from "../../components/Filters";
  import ProductBox from "../../components/ProductBox";
  import axios from "axios";

  export default {
    name: "Search",
    components: {ProductBox, Filters},

    data() {
      return {
        tags: [],
        valMax:5,
        prMax: 1000,
        estilo: 'success',
        estilo2: 'white',
        value: '',
        order: null,
        porPagina: 25,
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
          if(tipo === 'cat'){let found2 = this.cats.findIndex(function (element) {
            return element === elem;
          });
            if (found2 === -1) {
              this.cats.push(elem);
              this.actualizarProds();
            } else {
              this.deleteCat(found2);
            }
          }
        if(tipo === 'tipo'){
          this.tipo = [];
          this.tipo.push(elem);
          this.actualizarProds();
        }
        if(tipo === 'valoracion') {
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
      actualizarProds: function () {
        let urlTags = 'http://155.210.47.51:5000/producto/?preciomin=0&valoracionMax=' + this.valMax;
        urlTags = urlTags + '&preciomax=' + this.prMax + '&page=' + this.pagina + '&number=' + this.porPagina;
        if(this.tipo.length > 0) {
          urlTags = urlTags + '&tipo=' + this.tipo[0];
        }
        if(this.cats.length > 0) {
          urlTags = urlTags + '&categorias=';
          for (let i = 0; i < this.cats.length; i++) {
            urlTags = urlTags + this.cats[i];
            if(i < (this.cats.length-1)){
              urlTags = urlTags + ';';
            }
          }
        }
        console.log(urlTags);
        axios.get(urlTags).then(response => (this.products = response.data));
      }
    },
    computed: {
      elementos() {
        return this.products.length;
      }
    },
    mounted () {
      let urlTags = 'http://155.210.47.51:5000/producto/?preciomin=0&valoracionMax=' + this.valMax;
      urlTags = urlTags + '&preciomax=' + this.prMax + '&page=' + this.page + '&number=' + this.porPagina;
      axios.get(urlTags).then(response => (this.products = response.data));
    }
  }
</script>

<style scoped>

</style>
