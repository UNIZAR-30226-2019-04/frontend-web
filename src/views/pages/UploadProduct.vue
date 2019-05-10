<template>
  <div>
    <b-container style="max-width: 900px;">
      <b-card title="Subir Producto" style="margin-left: 30px">
        <b-form>
          <!--<h1>Editar Perfil</h1>-->
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control" v-model="title" placeholder="Titulo del producto"/>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-textarea type="text" class="text-body" v-model="description" placeholder="Descripción del producto"/>
          </b-input-group>

          <!--<b-input-group class="mb-3">-->
            <!--<b-input-group-prepend>-->
              <!--<b-input-group-text><i class="icon-direction"></i></b-input-group-text>-->
            <!--</b-input-group-prepend>-->
            <!--<b-form-input class="text" v-model="location" placeholder="Localización"/>-->
          <!--</b-input-group>-->

          <b-input-group class="mb-3">
            <b-form-select v-model="selCategory" :options="optionsCategory">
              <template slot="first">
                <option :value="null" disabled>-- Seleccione una categoría de producto --</option>
              </template>
            </b-form-select>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-form-select v-model="type" :options="optionsType">
              <template slot="first">
                <option :value="null" disabled>-- Seleccione una opción de venta --</option>
              </template>
            </b-form-select>
          </b-input-group>

          <div style="align-content: center">
            <a><b>
              <br/>Seleccione la ubicación del producto:<br/><br/>
            </b></a>
            <Mapa ref="map"></Mapa>
          </div>

          <div style="margin: 5%;">
            <a><b>
              Seleccione el radio de interés del producto:<br/><br/>
            </b></a>
            <VueSlideBar style="margin-bottom: 2rem;"
                         v-model="radius"
                         :data="radiusData"
                         :range="radiusRange"
                         :labelStyles="{ color: '#4a4a4a', backgroundColor: '#4a4a4a' }"
                         :processStyle="{ backgroundColor: '#d8d8d8' }"
            ></VueSlideBar>
          </div>

          <b-input-group v-if="type === 'normal'" class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>€</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="number" min="1" v-model="price" placeholder="Precio de compra"/>
          </b-input-group>

          <a v-if="type === 'trueque'" class="mb-3"><b>
            Añada en la descripción de producto en qué productos está interesado para realizar el trueque.<br/><br/>
          </b></a>

          <b-input-group v-if="type === 'trueque'" class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>€</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="number" min="1" v-model="price" placeholder="Precio orientativo del producto"/>
          </b-input-group>

          <b-input-group v-if="type === 'trueque'" class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>€</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="number" min="1" v-model="priceAux" placeholder="Precio máximo del producto"/>
          </b-input-group>

          <b-input-group v-if="type === 'subasta'" class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>€</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="number" min="1" v-model="price" placeholder="Precio inicial de subasta"/>
          </b-input-group>

          <b-input-group v-if="type === 'subasta'" class="mb-3">
            <!--<p>Fecha fin subasta: {{select}}</p>-->
            <datepicker @closed="fechaSeleccionada"
                        :bootstrap-styling="true"
                        v-model="select"
                        name="fecha"
                        :open-date="today"
                        calendar-button
                        calendar-button-icon="icon-calendar"></datepicker>
            <!--class-calendar="bootstrap-datepicker3"-->
            <span v-if="err" style="color: red;">La fecha elegida debe ser posterior a la fecha actual</span>
          </b-input-group>

<!--          <b-input-group class="mb-3">
            <b-form-file
              v-model="file"
              :state="Boolean(file)"
              placeholder="Seleccione archivo..."
              drop-placeholder="Arrastre archivo aquí..."
              accept=".jpg, .png"
              multiple
            ></b-form-file>
          </b-input-group>-->
          <Uploader buttonTitle="Subir imagen de producto"></Uploader>

          <a style="color: red;">{{ notSelected }}<br/><br/></a>
          <b-button variant="success" v-on:click="subirProducto" block>Subir producto</b-button>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
  import VueSlideBar from 'vue-slide-bar'
  import Datepicker from "vuejs-datepicker/src/components/Datepicker";
  import Mapa from "../../components/Mapa.vue";
  import Uploader from "../../components/Uploader";

  export default {
    name: "UploadProduct",
    components: {Uploader, VueSlideBar, Datepicker, Mapa},
    data() {
      return {
        title: '',
        file: [],
        description: '',
        price: null,
        priceAux: null,
        radius: null,
        radiusData: [
          5,
          15,
          30,
          45,
          60,
          75,
          90,
          120,
          300
        ],
        radiusRange: [
          {
            label: '5 km'
          },
          {
            label: '15 km',
            isHide: true,
          },
          {
            label: '30 km'
          },
          {
            label: '45 km',
            isHide: true
          },
          {
            label: '60 km'
          },
          {
            label: '75 km',
            isHide: true
          },
          {
            label: '90 km'
          },
          {
            label: '120 km',
            isHide: true
          },
          {
            label: '300 km'
          }
        ],
        select: null,
        err: false,
        notSelected: "",
        endTime: {
          year: 0,
          month: 0,
          day: 0,
          hour: 0,
        },
        type: null,
        optionsType: [
          {value: 'trueque', text: 'Intercambiar producto'},
          {value: 'normal', text: 'Venta normal'},
          {value: 'subasta', text: 'Subastar producto'}
        ],
        selCategory: null,
        optionsCategory: [
          {value: 'Coche', text: 'Coche'},
          {value: 'Inmuebles', text: 'Inmuebles'},
          {value: 'Motos', text: 'Motos'},
          {value: 'Moviles y Accesorios', text: 'Moviles y Accesorios'},
          {value: 'TV, audio, cámaras', text: 'TV, audio, cámaras'},
          {value: 'Ordenadores', text: 'Ordenadores'},
          {value: 'Deportes', text: 'Deportes'},
          {value: 'Bicicletas', text: 'Bicicletas'},
          {value: 'Juegos y Consolas', text: 'Juegos y Consolas'},
          {value: 'Moda y accesorios', text: 'Moda y accesorios'},
          {value: 'Libros y música', text: 'Libros y música'},
          {value: 'Servicios', text: 'Servicios'},
          {value: 'Otros', text: 'Otros'}
        ]
      }
    },
    methods: {
      fechaSeleccionada: function () {
        let today = new Date().getTime();
        console.log(today);
        let sel = this.select.getTime();
        console.log(sel);
        if (today > sel) {
          this.err = true;
        } else {
          this.err = false;
          this.endTime.day = this.select.getDay();
          this.endTime.month = this.select.getMonth();
          this.endTime.year = this.select.getFullYear();
        }
      },
      subirProducto: function () {
        let centerPos = this.$refs.map.getCenter();
        let data = {
          "tipo": this.type,
          "titulo": this.title,
          "descripcion": this.description,
          "categoria": this.selCategory,
          //"fecha": "2019-05-03T16:47:58.480Z",
          "vendedor": this.$store.getters.user,
          "precioBase": parseInt(this.price),
          "longitud": centerPos['lng'],
          "latitud": centerPos['lat'],
          "precioAux": parseInt(this.priceAux),
          "radio_ubicacion": this.radius
        };
        console.log(data);
        if (data["categoria"] === null) {
          this.notSelected = "Seleccione una categoría.\n"
        } else if (data["tipo"] === null) {
          this.notSelected = "Seleccione una opción de venta.\n"
        } else if (data["precio"] < data["precioAux"] && data["tipo"] === "trueque") {
          this.notSelected = "Ajuste el valor del máximo estimado.\n"
        } else {
          this.notSelected = ""
          this.$store
            .dispatch("uploadProduct", data)
            .then(() => this.$router.push("/"))
            .catch(err => console.log(err));
        }


      }
    },
    computed: {
      today() {
        return new Date();
      }
    }
  }
</script>

<style scoped>

</style>
