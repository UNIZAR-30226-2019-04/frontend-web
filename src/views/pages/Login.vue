<template>
  <div class="flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center" style="margin-top: 20%">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Acceso</h1>
                  <p class="text-muted">Accede a tu cuenta</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>@</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="email" class="form-control" v-model="email" placeholder="Correo de usuario"
                                  autocomplete/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="password" class="form-control" v-model="password" placeholder="Contraseña"
                                  autocomplete/>
                  </b-input-group>
                  <a style="color: red;">{{ error_output }}</a>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" v-on:click="register" class="px-4">Acceso</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">¿Olvidaste tu contraseña?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5" md="12" style="width:100%">
              <b-card-body class="text-center">
                <div>
                  <h2>Regístrate</h2>
                  <p>¡Forma parte de la comunidad de compra-venta y trueque más grande de España!</p>
                  <b-button variant="primary" class="active mt-3" href="#/Sign">Regístrate ahora</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        error_output: ""
      };
    },
    methods: {
      validateEmail: function (mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
          return (true);
        }
        else {
          return (false);
        }
      },
      register: function () {
        let data = {
          "email": this.email,
          "password": this.password
        };
        if (!this.validateEmail(this.email)) {
          this.error_output = "El campo email es incorrecto."
        } else {
          this.$store
            .dispatch("login", data)
            .then(() => this.$router.push("/"))
            .catch(err => console.log(err));
        }
      }
    }
  };
</script>
