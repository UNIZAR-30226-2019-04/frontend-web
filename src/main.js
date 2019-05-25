// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from "./store";
import Axios from "axios";

import Vuetify from 'vuetify';

Vue.prototype.$http = Axios;
import 'vuetify/dist/vuetify.min.css'


import * as Vue2Leaflet from 'vue2-leaflet'
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.component('l-map', Vue2Leaflet.LMap);
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer);

// todo
// cssVars()
Vue.use(BootstrapVue)


Vue.use(Vuetify)
const token = localStorage.getItem("user-token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;

}
Vue.config.productionTip = false;


// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
