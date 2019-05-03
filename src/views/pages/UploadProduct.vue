<template>
  <div>
    <!--<b-card title="Subir Producto" style="alignment: center; margin-right: 50px; margin-left: 50px;">-->
    <b-card title="Subir Producto" style="alignment: center; margin: auto; width: 75%;">
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
          <b-form-input type="text" class="form-control" v-model="description" placeholder="Descripción del producto"/>
        </b-input-group>

        <b-input-group class="mb-3">
          <b-input-group-prepend>
            <b-input-group-text><i class="icon-direction"></i></b-input-group-text>
          </b-input-group-prepend>
          <b-form-input class="text" v-model="location" placeholder="Localización"/>
        </b-input-group>

        <b-input-group class="mb-3">
          <b-form-select v-model="type" :options="options"></b-form-select>
        </b-input-group>


        <b-input-group v-if="type === 'Compra'" class="mb-3">
          <b-input-group-prepend>
            <b-input-group-text>€</b-input-group-text>
          </b-input-group-prepend>
          <b-form-input type="number" v-model="price" placeholder="Precio de compra"/>
        </b-input-group>

        <b-input-group v-if="type === 'Trueque'" class="mb-3">
          <b-input-group-prepend>
            <b-input-group-text><i class="icon-bag"></i></b-input-group-text>
          </b-input-group-prepend>
          <b-form-input class="text" v-model="descriptionT" placeholder="Descripción del objetos de interes buscados"/>
        </b-input-group>

        <b-input-group v-if="type === 'Subasta'" class="mb-3">
          <b-input-group-prepend>
            <b-input-group-text>€</b-input-group-text>
          </b-input-group-prepend>
          <b-form-input class="number" v-model="price" placeholder="Precio inicial de subasta"/>
        </b-input-group>

        <b-input-group v-if="type === 'Subasta'" class="mb-3">
          <!--<p>Fecha fin subasta: {{select}}</p>-->
          <datepicker @closed="fechaSeleccionada"
                      v-model="select"
                      name="fecha"
                      :open-date="today"
                      calendar-button
                      calendar-button-icon="icon-calendar"></datepicker>
          <!--class-calendar="bootstrap-datepicker3"-->
          <span v-if="err" style="color: red;">La fecha elegida debe ser posterior a la fecha actual</span>
        </b-input-group>

        <b-input-group class="mb-3">
          <b-form-file
            v-model="file"
            :state="Boolean(file)"
            placeholder="Seleccione archivo..."
            drop-placeholder="Arrastre archivo aquí..."
            accept=".jpg, .png"
            multiple
          ></b-form-file>
        </b-input-group>
        <b-button variant="success" block>Subir producto</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
    import Datepicker from "vuejs-datepicker/src/components/Datepicker";
    import moment from "moment";
    export default {
        name: "UploadProduct",
      components: {Datepicker},
      data() {
          return {
            title: '',
            file: [],
            description: '',
            descriptionT: '',
            price: '',
            location: null,
            select: null,
            err: false,
            endTime: {
              year: 0,
              month: 0,
              day: 0,
              hour: 0,
            },
            type: '',
            options: [
              { value: '', text: 'Por favor seleccione una opción de venta' },
              { value: 'Trueque', text: 'Intercambiar producto' },
              { value: 'Compra', text: 'Venta normal' },
              { value: 'Subasta', text: 'Subastar producto' }
            ]
          }
      },
      methods: {
        fechaSeleccionada: function() {
          let today = new Date().getTime();
          console.log(today);
          let sel = this.select.getTime();
          console.log(sel);
          if(today > sel){
            this.err = true;
          }else{
            this.err = false;
            this.endTime.day = this.select.getDay();
            this.endTime.month = this.select.getMonth();
            this.endTime.year = this.select.getFullYear();
          }
        }
      },
      computed: {
          today(){
            return new Date();
          }
      }
    }
</script>

<style scoped>

</style>
