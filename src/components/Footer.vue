<template>
  <div id="Footer">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <v-footer
      dark
      color="#20a8d8"
    >
      <v-card
        class="flex"
        flat
        tile
      >
        <!--<v-card-title class="blue">-->
        <!--&lt;!&ndash;<v-card-title style="color: #20a8d8">&ndash;&gt;-->
          <!--<strong class="subheading">Get connected with us on social networks!</strong>-->
          <!--<v-spacer></v-spacer>-->
          <!--<v-btn-->
            <!--v-for="icon in icons"-->
            <!--:key="icon"-->
            <!--class="mx-3"-->
            <!--dark-->
            <!--icon-->
          <!--&gt;-->
            <!--<v-icon size="24px">{{ icon }}</v-icon>-->
          <!--</v-btn>-->
        <!--</v-card-title>-->

        <v-card-actions class="grey darken-3 justify-center">
          &copy;2019 — <strong>Telocam</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram',
      ]
    })
  }
</script>
