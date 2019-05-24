<template>
  <div>
    <b-container style="max-width: 900px;">
      <b-card style="alignment: center; margin: auto; width: 75%; margin-top: 6%; margin-bottom: 10%">
        <b-form>
          <h1>Subir producto</h1>
          <br/>
          <h4>Título del anuncio: </h4>
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control" v-model="title" placeholder="Titulo del producto" required/>
          </b-input-group>

          <h4>Descripción del anuncio:</h4>
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-textarea type="text" class="form-control" v-model="description"
                             placeholder="Descripción del producto" required/>
          </b-input-group>

          <!--<b-input-group class="mb-3">-->
          <!--<b-input-group-prepend>-->
          <!--<b-input-group-text><i class="icon-direction"></i></b-input-group-text>-->
          <!--</b-input-group-prepend>-->
          <!--<b-form-input class="text" v-model="location" placeholder="Localización"/>-->
          <!--</b-input-group>-->

          <h4>Seleccione la categoría a la que pertenece:</h4>
          <b-input-group class="mb-3">
            <select name="selCategory" v-model="selCategory" id="selCategory" class="form-control" tabindex="12"
                    required>
              <option v-for="(category, index) in cat"
                      :key="index"
                      :value="category.nombre">{{ category.nombre }}
              </option>
            </select>
          </b-input-group>

          <h4>Seleccione una opción de venta:</h4>
          <b-input-group class="mb-3">
            <select name="type" v-model="type" id="type" class="form-control" tabindex="12" required>
              <option v-for="(option, index) in optionsType"
                      :key="index"
                      :value="option.value">{{ option.text }}
              </option>
            </select>
            <!--<b-form-select v-model="type" :options="optionsType" required>-->
            <!--<template slot="first">-->
            <!--<option :value="null" disabled>&#45;&#45; Seleccione una opción de venta &#45;&#45;</option>-->
            <!--</template>-->
            <!--</b-form-select>-->
          </b-input-group>

          <div style="align-content: center">
            <a><b>
              <h4>Seleccione la ubicación del producto:</h4>
            </b></a>
            <b-input-group>
              <b-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Buscar dirección..."
                required
                v-model="address"
                @keypress.enter="buscarPosicion"
              ></b-input>
              <b-button class="mb-2 mr-sm-2 mb-sm-0"
                        variant="primary"
                        v-on:click="buscarPosicion"
              >Buscar
              </b-button>
            </b-input-group>

            <Mapa ref="map" :preview="preview" :radius="radius"></Mapa>
          </div>

          <div style="margin: 5%;">
            <a><b>
              Seleccione el radio de interés del producto:<br/><br/>
            </b></a>
            <VueSlideBar style="margin-bottom: 2rem;"
                         v-model="radius"
                         :data="radiusData"
                         :range="radiusRange"
                         :tooltip-styles="{ backgroundColor: '#20a8d8', borderColor: '#20a8d8' }"
                         :labelStyles="{ color: '#4a4a4a', backgroundColor: '#4a4a4a' }"
                         :processStyle="{ backgroundColor: '#d8d8d8' }"
            ></VueSlideBar>
          </div>

          <b-input-group v-if="type === 'normal'" class="mb-3" required>
            <b-input-group-prepend>
              <b-input-group-text required>€</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="number" min="1" v-model="price" placeholder="Precio de compra" required/>
          </b-input-group>

          <a v-if="type === 'trueque'" class="mb-3"><b>
            Añada en la descripción de producto en qué productos está interesado para realizar el trueque.<br/><br/>
          </b></a>

          <b-input-group v-if="type === 'trueque'" class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text required>€</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="number" min="1" v-model="price" placeholder="Precio orientativo del producto" required/>
          </b-input-group>

          <b-input-group v-if="type === 'trueque'" class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text required>€</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="number" min="1" v-model="priceAux" placeholder="Precio máximo del producto" required/>
          </b-input-group>

          <b-input-group v-if="type === 'subasta'" class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text required>€</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="number" min="1" v-model="price" placeholder="Precio inicial de subasta" required/>
          </b-input-group>

          <b-input-group v-if="type === 'subasta'" class="mb-3" required>
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

          <b-input-group v-if="type === 'subasta'" required>
            <v-time-picker v-model="picker" color="green lighten-1" header-color="blue"></v-time-picker>
          </b-input-group>
          <b-button v-on:click="logImg">Log picker</b-button>

          <b-form-file
            v-model="file_2"
            :state="Boolean(file_2)"
            placeholder="Escoja o arrastre un archivo..."
            drop-placeholder="Arrastre archivo aquí..."
            multiple
            button-text="Buscar"
            accept=".jpg, .png, .gif, .jpeg"
          ></b-form-file>

          <a style="color: red;">{{ notSelected }}<br/><br/></a>
          <b-button variant="success" style="font-weight: bold; font-size: 1.15rem" v-on:click="subirProducto" block>Subir producto</b-button>
          <b-button variant="danger" style="font-weight: bold; font-size: 1.15rem" v-on:click="cancelarSubida" block>Cancelar</b-button>
        </b-form>
      </b-card>
      <div>
        <b-modal id="modalexito"
                 ref="modalexito"
                 title="Éxito"
                 header-bg-variant="success"
                 hide-footer>
          <h3>Producto subido con éxito</h3>
          <br/>
          <b-btn class="btn-success" style="margin-right: 10px;font-weight: bold" @click="ocultarModal(1)">
            ACEPTAR
          </b-btn>
        </b-modal>
      </div>
      <div>
        <b-modal id="modalerror"
                 ref="modalerror"
                 title="Error"
                 header-bg-variant="danger"
                 hide-footer>
          <h3>Algo salió mal. Pruebe más tarde.</h3>
          <br/>
          <b-btn class="btn-success" style="margin-right: 10px;font-weight: bold" @click="ocultarModal(2)">
            ACEPTAR
          </b-btn>
        </b-modal>
      </div>
    </b-container>
    <button class="btn" @click="infoCats">DEBUG</button>
  </div>
</template>

<script>
  import VueSlideBar from 'vue-slide-bar'
  import Datepicker from "vuejs-datepicker/src/components/Datepicker";
  import Mapa from "../../components/Mapa.vue";
  import Uploader from "../../components/Uploader";
  import axios from "axios";
  import {API_BASE} from "../../config";
  import BRow from "bootstrap-vue/src/components/layout/row";

  export default {
    name: "UploadProduct",
    components: {BRow, Uploader, VueSlideBar, Datepicker, Mapa},
    data() {
      return {
        preview: false,
        title: '',
        picker: null,
        file_2: [],
        address: "",
        description: '',
        price: null,
        priceAux: null,
        radius: null,
        radiusData: [
          100,
          200,
          500,
          750,
          1000,
          5000,
          15000,
          30000,
          45000,
          60000,
          90000,
          120000,
          300000
        ],
        radiusRange: [
          {
            label: '100 m'
          },
          {
            label: '200 m',
            isHide: true
          },
          {
            label: '500 m'
          },
          {
            label: '750 m',
            isHide: true
          },
          {
            label: '1 km'
          },
          {
            label: '5 km',
            isHide: true
          },
          {
            label: '15 km',
          },
          {
            label: '30 km',
            isHide: true
          },
          {
            label: '45 km'
          },
          {
            label: '60 km',
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
          year: 2020,
          month: 4,
          day: 22,
          hora: 11,
          min: 57
        },
        prod_id: 0,
        type: null,
        optionsType: [
          {value: 'trueque', text: 'Intercambiar producto'},
          {value: 'normal', text: 'Venta normal'},
          {value: 'subasta', text: 'Subastar producto'}
        ],
        selCategory: null,
        cat: [],
      }
    },
    async mounted() {
      axios
        .get(API_BASE + 'categoria/')
        .then(response => (this.cat = response.data.data));
    },
    methods: {
      // llamadaALosModals: function(estado){
      //   console.log('La response status: ',  estado);
      //   console.log('Paso a evaluar la respuesta');
      //   if (estado === 200) {
      //     console.log('Ha habido éxito');
      //     // $("#modalexito").modal("toggle");
      //     $('#modalexito').on('shown.bs.collapse', function (e) {
      //       // Action to execute once the collapsible area is expanded
      //     })
      //   }else{
      //     console.log('Ha habido algun problema');
      //     $("#modalerror").modal();
      //   }
      // },
      ocultarModal(num) {
        if(num === 1) {
          this.$refs['modalexito'].hide();
          this.$router.push("/Profile");
        }else{
          this.$refs['modalerror'].hide();
        }
      },
      infoCats: function () {
        console.log(this.tamanio);
        console.log(typeof this.cat);
        console.log(this.cat);
        // console.log(this.cat.length);
        // console.log(typeof this.cat.data);
        // console.log(typeof this.cat.data.nombre);
        // console.log(this.cat.data[0].nombre);
      },
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
      buscarPosicion: function () {
        for (var i = 0; i < 3; i++) {
          this.$store.dispatch("getPosition", this.address).then(() => {
            let candidates = this.$store.getters.last_position;
            //console.log(candidates);

            //console.log(candidates.length);
            if (candidates.length < 1) {
              this.notSelected = "Sea más específico con la dirección.\n"
            } else {
              this.notSelected = "";
              let location = candidates[0];
              let newCenter = {
                lat: location['lat'],
                lng: location['lon']
              };
              this.$refs.map.zoomUpdated(17);
              this.$refs.map.centerUpdated(newCenter);
            }
          })
        }
      },
      logImg() {
        console.log(this.picker);
        console.log(typeof this.picker);
      },
      async subirProducto() {
        if (this.tipo === 'subasta') {
          let clock = this.picker.split(':');
          this.endTime.hora = clock[0];
          this.endTime.min = clock[1];
        }
        let centerPos = this.$refs.map.getCenter();
        let data = {
          "tipo": this.type,
          "titulo": this.title,
          "descripcion": this.description,
          "categoria": this.selCategory,
          "fechaexpiracion": this.endTime.day + '/' + this.endTime.month + '/' + this.endTime.year + ' ' + this.endTime.hora + ':' + this.endTime.min + ':00',
          "vendedor": this.$store.getters.user,
          "precioBase": parseInt(this.price),
          "longitud": centerPos['lng'],
          "latitud": centerPos['lat'],
          "precioAux": parseInt(this.priceAux),
          "radio_ubicacion": this.radius
        };
        console.log('Los datos: ', data);
        if (data["categoria"] === null) {
          this.notSelected = "Seleccione una categoría.\n"
        } else if (data["tipo"] === null) {
          this.notSelected = "Seleccione una opción de venta.\n"
        } else if (data["precio"] < data["precioAux"] && data["tipo"] === "trueque") {
          this.notSelected = "Ajuste el valor del máximo estimado.\n"
        } else {
          this.notSelected = "";
          /*this.$store
            .dispatch("uploadProduct", data)
            .then(() => this.$router.push("/"))
            .catch(err => console.log(err));*/

          let url = API_BASE + 'producto/';
          let response = await axios.post(url, data);
          console.log('La response: ',  response);
          let estado = response.status;

          // this.llamadaALosModals(response.status);

          console.log('La response status: ',  estado);
          console.log('Paso a evaluar la respuesta');
          if (estado === 200) {
            console.log('Ha habido éxito');
            this.$router.push("/Profile");
          }else{
            console.log('Ha habido algun problema');
            $("#modalerror").modal();
          }

          this.prod_id = response.data.id;
          url = API_BASE + 'multimedia/' + this.prod_id;

          //console.log(prod_id);
          let formData = null;
          for (let i = 0; i < this.file_2.length; i++) {
            formData = new FormData();
            formData.append('file', this.file_2[i]);
            console.log('El form: ',this.file_2[i]);
            response = await axios.post(url, formData).catch(error => (console.log(error)));
          }

        }
      },
      cancelarSubida: function () {
        this.$router.push({path: 'Search'})
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
