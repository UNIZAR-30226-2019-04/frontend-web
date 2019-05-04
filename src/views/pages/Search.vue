<template>
  <div>
    <b-row>
      <b-col cols="2" style="margin-left: 15px">
        <filters @selected="newTag"></filters>
      </b-col>
      <b-col style="margin-right: 0px">
        <b-row>
          <b-col cols="10">
            <b-btn v-for="(tag, index) in tags" style="margin-right: 4px" :key="index" v-on:click="deleteTag(index)">
              {{tag.tag}}
            </b-btn>
          </b-col>
          <b-col cols="2">
            <div
              style="margin-right: 50px;alignment: left">
              <b-form-select v-model="order" :options="options" size="sm" class="mt-3"></b-form-select>
            </div>
          </b-col>
        </b-row>
        <b-tab title="Productos encontrados" active style="margin-top: 30px; margin-left: 30px; margin-right: 30px">
          <p class="mt-3">Current Page: {{ pagina }}</p>
          <b-card-group columns=true>
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

  export default {
    name: "Search",
    components: {ProductBox, Filters},
    data() {
      return {
        tags: [],
        estilo: 'success',
        estilo2: 'white',
        value: '',
        order: null,
        porPagina: 25,
        pagina: 1,
        options: [
          {value: null, text: 'Búsqueda'},
          {value: 'a', text: 'Precio: más caros primero'},
          {value: 'b', text: 'Precio: más baratos primero'},
          {value: 'c', text: 'Novedades'},
          {value: 'd', text: 'Ofertas'}
        ],
        products: [
          {
            nombre: "Portátil ASUS nuevo",
            like: false,
            descripcion: "Producto a la venta, recién estrenado y en muy buen estado, todavía en garantía, solamente se vende porque me han regalado otro.",
            precio: 25,
            images: [{
              src: "https://picsum.photos/1024/480/?image=52",
              id: 1
            },
              {
                src: "https://picsum.photos/1024/480/?image=54",
                id: 4
              },
              {
                src: "https://picsum.photos/1024/480/?image=58",
                id: 3
              }]
          },
          {
            nombre: "Portátil ASUS nuevo",
            descripcion: "Producto a la venta, recién estrenado y en muy buen estado, todavía en garantía, solamente se vende porque me han regalado otro.",
            precio: 25,
            like: false,
            images: [{
              src: "https://picsum.photos/1024/480/?image=52",
              id: 1
            },
              {
                src: "https://picsum.photos/1024/480/?image=54",
                id: 4
              },
              {
                src: "https://picsum.photos/1024/480/?image=58",
                id: 3
              }]
          },
          {
            nombre: "Portátil ASUS nuevo",
            descripcion: "Producto a la venta, recién estrenado y en muy buen estado, todavía en garantía, solamente se vende porque me han regalado otro.",
            precio: 25,
            like: false,
            images: [{
              src: "https://picsum.photos/1024/480/?image=52",
              id: 1
            },
              {
                src: "https://picsum.photos/1024/480/?image=54",
                id: 4
              },
              {
                src: "https://picsum.photos/1024/480/?image=58",
                id: 3
              }]
          }
        ]
      }
    }
    ,
    methods: {
      deleteTag: function (id) {
        this.tags.splice(id, 1);
      }
      ,
      newTag: function (elem) {
        let a = {tag: elem};
        let found = this.tags.findIndex(function (element) {
          return element.tag === a.tag;
        });
        if (found === -1) {
          this.tags.push(a);
        } else {
          this.deleteTag(found);
        }
      }
      ,
      showOrder: function (value) {
        console.log(value);
        this.order = value;
      },
      elemPerPage: function (num) {
        this.porPagina = num;
      },
      elegido: function (num) {
        return (num === this.porPagina);
      }
    },
    computed: {
      elementos() {
        return this.products.length;
      }
    }
  }
</script>

<style scoped>

</style>
