import { api } from "src/boot/axios";

const AUTH_KEY = "gymtracker_token"

const API = "auth/"

class LoginService {

  async login(username, password) {
    try {
      const res = await api.post(API + "signin", { username, password })
      localStorage.setItem(AUTH_KEY, res.data.token)
      return res.data;
    } catch (error) {
      console.error("Error al intentar logear al usuario: " + username + ". Error: " + error)
    }
  }

  async logout() {
    try {
      await api.post(API + "signout")
      localStorage.removeItem(AUTH_KEY);
      return true
    } catch (error) {
      console.error("Error al deslogear y borrar el token del usuario. Error: " + error)
    }
  }

  async singup(userdata) {
    try {
      return await api.post(process.env.VUE_APP_BASE_URL_API + "users", userdata);
    } catch (error) {
      console.error("Error al crear el usuario con los datos: " + userdata + ". Error: " + error)
    }
  }
}

export default new LoginService()
