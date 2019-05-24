<template>
  <div>
    <b-container style="max-width: 900px;">
      <b-card title="Subir Producto"
              style="alignment: center; margin: auto; width: 75%; margin-top: 6%; margin-bottom: 10%">
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
            <b-form-textarea type="text" class="form-control" v-model="description"
                             placeholder="Descripción del producto"/>
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
            <b-input-group>
              <b-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Buscar dirección..."
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

          <b-input-group v-if="type === 'subasta'">
            <v-time-picker v-model="picker" color="green lighten-1" header-color="blue"></v-time-picker>
          </b-input-group>
          <b-button v-on:click="logImg">Log picker</b-button>

          <b-form-file
            v-model="file_2"
            :state="Boolean(file_2)"
            placeholder="Choose or drop a file..."
            drop-placeholder="Drop file here..."
            multiple
            accept=".jpg, .png, .gif"
          ></b-form-file>

          <a style="color: red;">{{ notSelected }}<br/><br/></a>
          <b-button variant="success" v-on:click="subirProducto" block>Subir producto</b-button>
          <b-button variant="danger" v-on:click="cancelarSubida" block>Cancelar</b-button>
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
  import axios from "axios";

  export default {
    name: "UploadProduct",
    components: {Uploader, VueSlideBar, Datepicker, Mapa},
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
      async subirProducto () {
        if(this.tipo === 'subasta') {
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
        console.log(data);
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

          let url = 'http://34.90.77.95:5000/producto/';
          let response = await axios.post(url,data);
          console.log(response);
          this.prod_id = response.data.id;
          url = 'http://34.90.77.95:5000/multimedia/' + this.prod_id;

          //console.log(prod_id);
          let formData = null;
          for(let i = 0; i < this.file_2.length; i++) {
            formData = new FormData();
            formData.append('file',this.file_2[i]);
            console.log(this.file_2[i]);
            response = await axios.post(url, formData).catch(error => (console.log(error)));
          }
        }
      },
      cancelarSubida: function(){
        this.$router.push({path:'Search'})
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
