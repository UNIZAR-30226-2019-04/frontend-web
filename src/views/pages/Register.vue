<template>
  <div class="flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center"  style="margin-top: 20%">
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
                  <b-form-input type="text" v-model="username" class="form-control" placeholder="Nombre de usuario" autocomplete="username" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="email" v-model="email" class="form-control" placeholder="Email" autocomplete="email" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" v-model="password" class="form-control" placeholder="Contraseña" autocomplete="new-password" />
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" v-model="password_confirmation" class="form-control" placeholder="Repetir contraseña" autocomplete="new-password" />
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
      register: function() {
        let data = {
          "email": this.email,
          "password": this.password,
          "username": this.username
        };
        if (this.password === this.password_confirmation) {
          this.$store
            .dispatch("register", data)
            .then(() => this.$router.push("/"))
            .catch(err => console.log(err));
        } else {
          this.error_output = "Las contraseñas no coinciden."
        }
      }
    }
  };
</script>
