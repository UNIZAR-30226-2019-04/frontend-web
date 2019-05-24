import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { API_BASE } from "./config";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    public_id: localStorage.getItem("public_id") || "no_user",
    currentUser: {},
    last_position: [],
    name: ""
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, data) {
      state.status = "success";
      state.token = data.token;
      state.public_id = data.public_id;
      console.log("Auth sucessful", state);
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      // state.public_id = "no_user";
    },
    retrieve_request(state) {
      state.status = "loading";
    },
    retrieve_success(state, data) {
      state.status = "success";
      state.currentUser = data;
    },
    retrieve_error(state) {
      state.status = "error";
    },
    update_request(state) {
      state.status = "loading";
    },
    update_success(state, data) {
      state.status = "success";
      state.currentUser = data;
    },
    update_error(state) {
      state.status = "error";
    },
    upload_request(state) {
      state.status = "loading";
    },
    upload_success(state) {
      state.status = "success";
    },
    upload_error(state) {
      state.status = "error";
    },
    resetState (state) {
      state.status = "";
      state.token = "";
      state.public_id = "no_user";
      state.currentUser = {};
    },
    location_request(state) {
      state.status = "loading";
    },
    location_success(state, data) {
      state.status = "success";
      state.last_position = data;
    },
    location_error(state) {
      state.status = "error";
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: `${API_BASE}user/login`,
          data: user,
          method: "POST"
        })
          .then(resp => {
            console.log(resp);

            const token = resp.data.Authorization;
            const public_id = resp.data.public_id;

            localStorage.setItem("token", token);
            localStorage.setItem("public_id", public_id);
            console.log(resp.data.public_id);
            console.log(resp.data.Authorization);
            commit("auth_success", {
              name: user.email,
              token: resp.data.Authorization,
              public_id: resp.data.public_id,
            });

            // Add the following line:
            // axios.defaults.headers.common["Authorization"] = resp.data.token;
            // commit("auth_success", resp.data.Authorization, resp.data.public_id);

            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            localStorage.removeItem("public_id");

            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: `${API_BASE}user/`,
          data: user,
          method: "POST"
        })
          .then(resp => {
            console.log(resp);
            const token = resp.data.Authorization;
            const public_id = resp.data.public_id;

            localStorage.setItem("token", token);
            localStorage.setItem("public_id", public_id);

            // Add the following line:
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, public_id);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            localStorage.removeItem("public_id");

            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('resetState');
        console.log({"Authorization": localStorage.getItem("token")})
        axios({
          url: `${API_BASE}user/logout`,
          headers: {Authorization: localStorage.getItem("token")},
          method: "POST"
        }).then( resp => {
          localStorage.removeItem("token");
          localStorage.removeItem("public_id");
          localStorage.removeItem("current_user");
          delete axios.defaults.headers.common["Authorization"];
          resolve(resp);
          this.$router.push("/");
          commit('resetState');
        }).catch( err => {
          commit("auth_error");
          console.log(err);
          localStorage.removeItem("token");
          localStorage.removeItem("public_id");
          localStorage.removeItem("current_user");
          delete axios.defaults.headers.common["Authorization"];
          //this.$route.router.go("/LogIn");
          reject(err);
        });
      });
    },
    retrieveProfile({ commit }) {
      return new Promise( (resolve, reject) => {
        const user_id = localStorage.getItem("public_id");
        commit("retrieve_request");
        axios({
          url: `${API_BASE}user/${user_id}`,
          data: localStorage.getItem("public_id"),
          method: "GET"
        })
          .then( resp => {
          console.log(resp);
          localStorage.setItem("currentUser",resp.data);
          commit("retrieve_success", resp.data);
          resolve(resp);
        })
          .catch( err => {
          commit("retrieve_error");
          localStorage.removeItem("currentUser");
          reject(err);
        })
      });
    },
    updateProfile({ commit }, user) {
      return new Promise( (resolve, reject) =>  {
        const user_id = localStorage.getItem("public_id");
        commit("update_request");
        axios({
          url: `${API_BASE}user/${user_id}/edit`,
          data: user,
          method: "POST"
        })
          .then( resp => {
            console.log(resp);
            localStorage.setItem("currentUser", user);
            commit("update_success", user);
            resolve(resp);
          })
          .catch( err => {
            commit("update_error");
            reject(err);
          })
      });
    },
    uploadProduct({ commit }, product) {
      return new Promise( (resolve, reject) => {
        commit("upload_request");
        axios({
          url: `${API_BASE}producto/`,
          data: product,
          method: "POST"
        })
          .then( resp => {
            console.log(resp);
            commit("upload_success");
            resolve(resp);
          })
          .catch( err => {
            commit("upload_error");
            reject(err);
          })
      })
    },
    getPosition({ commit }, location) {
      commit("location_request");
      return new Promise(  (resolve, reject) => {
        axios({
          url: `${API_BASE}geocode/point/${location}`,
          data: location,
          method: "GET"
        })
          .then( resp => {
            console.log(resp);

            let data = resp.data;

            localStorage.setItem("last_position", data);
            commit("location_success", data);
            resolve(resp);
          })
          .catch( err => {
            commit("location_error");
            reject(err);
          })
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    token: state => state.token,
    user: state => state.public_id,
    currentUser: state => state.currentUser,
    last_position: state => state.last_position,
    name: state => state.name
  }
});
