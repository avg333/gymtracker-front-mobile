import { defineStore } from 'pinia';

interface UserInterface {
  id: string;
  username: string;
  token: string;
}

export const useLoginStore = defineStore('login', {
  state: () => ({
    userId: '',
    userName: '',
    jwtType: 'Bearer',
    jwt: '',
    logged: false,
  }),
  getters: {
    getUserId: function (state) {
      return state.userId;
    },
    getLogedUserName: function (state) {
      return state.userName;
    },
    getAuthHeader: function (state) {
      return state.jwt && state.jwtType ? `${state.jwtType} ${state.jwt}` : '';
    },
    getIsLogged: function (state) {
      return state.logged;
    },
  },
  actions: {
    async login(user: UserInterface) {
      this.userId = user.id;
      this.userName = user.username;
      this.jwt = user.token;
      this.logged = true;
    },
    async logout() {
      this.userId = '';
      this.userName = '';
      this.jwt = '';
      this.logged = false;
    },
  },
});
