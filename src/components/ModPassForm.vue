<template>
  <div>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <b-card title="Cambiar contraseña" style="width: 45rem; margin-top: 20px; margin-left: 30px">
      <b-form>
        <b-input-group class="mb-4">
          <b-input-group-prepend>
            <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
          </b-input-group-prepend>
          <b-form-input :type="tipo" class="form-control" v-model="actual_pass" placeholder="Contraseña actual"
                        autocomplete/>
          <b-input-group-prepend>
            <b-input-group-text v-on:click="showHidePass"><i :class="icono"></i></b-input-group-text>
          </b-input-group-prepend>
        </b-input-group>
        <b-input-group class="mb-4">
          <b-input-group-prepend>
            <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
          </b-input-group-prepend>
          <b-form-input :type="tipo" :state="firstPass" class="form-control" v-model="new_pass" placeholder="Contraseña nueva"
                        autocomplete/>
          <b-input-group-prepend>
            <b-input-group-text v-on:click="showHidePass"><i :class="icono"></i></b-input-group-text>
          </b-input-group-prepend>
          <b-form-invalid-feedback id="input-live-feedback3">
            La contraseña debe tener al menos 6 caracteres, y contener mayúsculas, minúsculas y números.
          </b-form-invalid-feedback>
        </b-input-group>

        <b-input-group class="mb-4">
          <b-input-group-prepend>
            <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
          </b-input-group-prepend>
          <b-form-input type="password" class="form-control" placeholder="Repetir nueva contraseña"
                        v-model="new_pass2"/>
        </b-input-group>
        <b-button variant="success" v-on:click="updateData" block>Actualizar contraseña</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "ModPassForm",
    data() {
      return {
        new_pass: '',
        actual_pass: '',
        new_pass2: '',
        tipo: 'password',
        icono: 'far fa-eye-slash'
      }
    },
    computed: {
      firstPass() {
        if (this.new_pass.length < 6){
          return false;
        }else{
          if(/[A-Z]/.test(this.new_pass) && /[a-z]/.test(this.new_pass) && /[0-9]/.test(this.new_pass)){
            return true;
          }else{
            return false;
          }
        }
      },
    },
    methods: {
      updateData: function () {
        let url = 'http://155.210.47.51:5000/user/' + this.$store.getters.user;
        let headers = {
          'Content-Type': 'application/json',
          'Authorization': this.$store.getters.token
        };
        let data = {

        };
        axios.post(url,data,{headers: headers});

      },
      showHidePass: function(){
        if(this.tipo === "password"){
          this.tipo = 'text';
          this.icono = 'far fa-eye';
        }else{
          this.tipo = 'password';
          this.icono = 'far fa-eye-slash';
        }
      }
    }
  }
</script>

<style scoped>

</style>
