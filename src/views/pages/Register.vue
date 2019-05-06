<template>
  <div class="flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center" style="margin-top: 20%">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1>Regístrate</h1>
                <p class="text-muted">Crea tu cuenta</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :state="nameState" type="text" v-model="username" class="form-control" placeholder="Nombre de usuario"
                                autocomplete="username"/>
                  <b-form-invalid-feedback id="input-live-feedback">
                    Introduce al menos 4 caracteres.
                  </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :state="validateEmail" type="email" v-model="email" class="form-control" placeholder="Email"
                                autocomplete="email"/>
                  <b-form-invalid-feedback id="input-live-feedback2">
                    El correo introducido no tiene un formato reconocido.
                  </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :state="firstPass" type="password" v-model="password" class="form-control" placeholder="Contraseña"
                                autocomplete="new-password"/>
                  <b-form-invalid-feedback id="input-live-feedback3">
                    La contraseña debe tener al menos 6 caracteres, y contener mayúsculas, minúsculas y números.
                  </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :state="secondPass" @keypress.enter="register()" type="password" v-model="password_confirmation" class="form-control"
                                placeholder="Repetir contraseña" autocomplete="new-password"/>
                  <b-form-invalid-feedback id="input-live-feedback4">
                    La contraseñas no coinciden.
                  </b-form-invalid-feedback>
                </b-input-group>

                <a style="color: red;">{{ error_output }}</a>

                <b-button @click="register" variant="success" block>Crear cuenta</b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Register",
    computed: {
      nameState() {
        return this.username.length >= 4;
      },
      validateEmail() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
          return (true);
        } else {
          return (false);
        }
      },
      firstPass() {
        if (this.password.length < 6){
          return false;
        }else{
          if(/[A-Z]/.test(this.password) && /[a-z]/.test(this.password) && /[0-9]/.test(this.password)){
            return true;
          }else{
            return false;
          }
        }
      },
      secondPass() {
        return this.password === this.password_confirmation;
      }
    },
    data() {
      return {
        email: "",
        password: "",
        username: "",
        password_confirmation: "",
        error_output: ""
      };
    },
    methods: {
      register: function () {
        let data = {
          "email": this.email,
          "password": this.password,
          "username": this.username
        };
        if (!this.validateEmail(this.email)){
          this.error_output = "El campo email es incorrecto."
        }
        else if (this.password === this.password_confirmation) {
          this.$store
            .dispatch("register", data)
            .then(() => this.$router.push("/"))
            .catch(err => console.log(err));
        } else {
          this.error_output = "Las contraseñas no coinciden."
        }
      }
    }
  }
</script>
