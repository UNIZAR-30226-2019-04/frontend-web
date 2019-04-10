import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { API_BASE } from "./config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
      console.log("Auth sucessful", state);
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: `${API_BASE}/user/login`,
          data: user,
          method: "POST"
        })
          .then(resp => {
            console.log(resp);

            const token = resp.data.Authorization;
            const user = resp.data.user;

            console.log(token, user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", user);

            // Add the following line:
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);

            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: `${API_BASE}/user/`,
          data: user,
          method: "POST"
        })
          .then(resp => {
            console.log(resp);
            const token = resp.data.Authorization;
            const user = resp.data.user;

            localStorage.setItem("token", token);
            localStorage.setItem("user", user);

            // Add the following line:
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        axios({
          url: `${API_BASE}/logout/`,
          data: localStorage.getItem("token"),
          method: "POST"
        }).then( resp => {
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
          resolve(resp);
        });
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    token: state => state.token
  }
});
