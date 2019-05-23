<template>
  <div>
    <h1>ESTO ES UNA PRUEBA</h1>
    <h1>Hola Fulanito!</h1>
    <h1>Productos para ti</h1>
    <h1>Productos nuevos</h1>
    <h1>ESTO ES UNA PRUEBA</h1>
    <!--&lt;!&ndash;BÚSQUEDA DE PRODUCTOS&ndash;&gt;-->
    <!--&lt;!&ndash;<b-row class="justify-content-md-center">&ndash;&gt;-->
      <!--&lt;!&ndash;<b-col col lg="4">&ndash;&gt;-->
        <!--&lt;!&ndash;<b-form-input size="md" class="mr-sm-2" type="text" placeholder="Búsqueda"&ndash;&gt;-->
                      <!--&lt;!&ndash;v-on:change="actualizarProds"&ndash;&gt;-->
                      <!--&lt;!&ndash;@keypress="actualizarProds"&ndash;&gt;-->
                      <!--&lt;!&ndash;v-model="texto"/>&ndash;&gt;-->
      <!--&lt;!&ndash;</b-col>&ndash;&gt;-->
      <!--&lt;!&ndash;<b-btn v-on:click="actualizarProds">&ndash;&gt;-->
        <!--&lt;!&ndash;Buscar&ndash;&gt;-->
      <!--&lt;!&ndash;</b-btn>&ndash;&gt;-->
    <!--&lt;!&ndash;</b-row>&ndash;&gt;-->
    <!--<b-row>-->
      <!--<b-col style="margin-right: 10px">-->
        <!--<b-row>-->
          <!--<b-col cols="4">-->
            <!--<div-->
              <!--style="margin-right: 50px; alignment: right">-->
              <!--<b-form-select v-model="order" :options="options" size="md" style="font-size: 1rem;"-->
                             <!--class="mt-3"></b-form-select>-->
            <!--</div>-->
          <!--</b-col>-->
        <!--</b-row>-->
        <!--<b-tab title="Productos encontrados" active style="margin-top: 30px; margin-left: 30px; margin-right: 30px">-->
          <!--&lt;!&ndash;<p class="mt-3">Página {{ pagina }} de {{ (elementos/porPagina + 1).toFixed(0) }}</p>&ndash;&gt;-->
          <!--<b-card-group columns>-->
            <!--&lt;!&ndash;v-if="index<(porPagina*pagina) && index>=(porPagina*pagina-porPagina)"&ndash;&gt;-->
            <!--<ProductBox v-for="(product, index) in productos" :key="index"-->
                        <!--:product="product"-->
                        <!--:comprado="false"-->
                        <!--style="margin-bottom: 10px;"></ProductBox>-->
          <!--</b-card-group>-->
        <!--</b-tab>-->
      <!--</b-col>-->
    <!--</b-row>-->
    <!--<br/>-->
    <!--<br/>-->
    <!--<br/>-->
    <!--<br/>-->
    <!--<br/>-->
    <!--<br/>-->
    <!--<br/>-->
    <!--<br/>-->
    <!--<br/>-->
    <!--<br/>-->
    <!--<br/>-->
    <!--<br/>-->
    <!--<br/>-->
    <!--<h1>juejeujeujeuejeujeuje</h1>-->
    <!--&lt;!&ndash;{{this.$store.state.public_id}}&ndash;&gt;-->
    <!--<br/>-->
    <!--{{this.temporary_public_id}}-->
    <br/>
    {{this.infoUser}}
    <br/>
    <br/>
    <br/>
    Productos comprados: {{this.infoUser.productos_comprados}}
    <br/>
    Valoracion: {{this.infoUser.valoracion}}
    <br/>
    Nick: {{this.infoUser.nick}}
    <br/>
    <br/>

    <button @click="loquesea()">BOTON</button>
    <br/>
    <br/>
    <!--<br/>-->
    <!--<br/>-->
    <!--<br/>-->

  </div>
</template>

<script>
  import axios from "axios";
  import {API_BASE} from "../../config";
  import ProductBox from "../../components/ProductBox";

  export default {
    name: "Dashboard",
    components: {ProductBox},
    data() {
      return {
        temporary_public_id: "bbf845ee-c5cb-4a03-a7c0-7efbb101c48a",
        infoUser: null,
        productos: [],
      }
    },
    mounted() {
      axios.get(`${API_BASE}/user/${this.temporary_public_id}`).then(response => (this.infoUser = response.data));
      axios.get(`${API_BASE}/producto/`).then(response => (this.productos = response.data));
  },
    methods: {
      loquesea: function () {
        console.log('JJEJEJEJ');
        console.log('JJEJEJEJ');
        console.log(this.$store.state.public_id);
        console.log(typeof this.productos.productos);
        console.log(this.productos.productos);
        console.log(this.productos.productos);
      }
    }
  }
</script>

<style scoped>

</style>
