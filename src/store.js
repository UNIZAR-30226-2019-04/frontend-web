import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { API_BASE } from "./config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    public_id: localStorage.getItem("public_id") || "no_user"
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
            const public_id = resp.data.public_id;

            localStorage.setItem("token", token);
            localStorage.setItem("public_id", public_id);
            console.log(resp.data.public_id);
            console.log(resp.data.Authorization);
            commit("auth_success", {
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
          url: `${API_BASE}/user/`,
          data: user,
          method: "POST"
        })
          .then(resp => {
            console.log(resp);
            const token = resp.data.Authorization;
            const public_id = resp.data.public_id;

            localStorage.setItem("token", token);
            localStorage.setItem("user", public_id);

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
        commit("logout");
        axios({
          url: `${API_BASE}/user/logout`,
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
    token: state => state.token,
    user: state => state.public_id
  }
});
