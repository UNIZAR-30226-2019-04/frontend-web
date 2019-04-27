<template>
  <div>
    <b-row>
      <b-col cols="2">
        <p>Tipo de orden: {{order}}</p>
        <filters @selected="newTag"></filters>
      </b-col>
      <b-col>
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
          <!--<b-table-->
          <!--id="buscados"-->
          <!--:per-page="porPagina"-->
          <!--:current-page="pagina"-->
          <!--small-->
          <!--&gt;</b-table>-->
          <b-card-group columns=true>
            <ProductBox v-for="(product, index) in products" :key="index" v-if="index<(porPagina*pagina) && index>=(porPagina*pagina-porPagina)" :product="product" style="margin-bottom: 10px;"></ProductBox>
          </b-card-group>
          <b-pagination
            v-model="pagina"
            :total-rows="elementos"
            :per-page="porPagina"
            aria-controls="buscados"
          ></b-pagination>
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
        value: '',
        order: '',
        porPagina: 2,
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
      }
    }
    ,
    computed: {
      elementos() {
        return this.products.length;
      }
    }
  }
</script>

<style scoped>

</style>
