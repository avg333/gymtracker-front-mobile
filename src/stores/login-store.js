import { defineStore } from "pinia";
import LoginService from "src/services/LoginService";

export const useLoginStore = defineStore("login", {
  state: () => ({
    userId: 0,
    userName: "",
    jwtType: "Bearer",
    jwt: "",
    logged: false
  }),
  getters: {
    getUserId: function (state) {
      return state.userId
    },
    getLogedUserName: function (state) {
      return state.userName
    },
    getAuthHeader: function (state) {
      return state.jwt && state.jwtType ? `${state.jwtType} ${state.jwt}` : ''
    },
    getIsLogged: function (state) {
      return state.logged
    }
  },
  actions: {
    async login(user) {
      this.userId = user.id;
      this.userName = user.username;
      this.jwt = user.token;
      this.logged = true;
    },
    async logout() {
      try {
        await LoginService.logout()
        this.userId = 0;
        this.userName = "";
        this.jwt = "";
        this.logged = false
        return true;
      } catch (error) {
        console.error("Error al intentar realizar el logout. Error:" + error)
        return false;
      }
    }
  },
});
