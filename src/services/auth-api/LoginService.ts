import { api } from 'src/boot/axios';
import {
  processAxiosResponse,
  processAxiosError,
} from 'src/utils/responseUtils';

const AUTH_KEY = 'gymtracker_token';

const API = 'auth-api/';

class LoginService {
  async login(username: string, password: string) {
    try {
      const res = await api.post(API + 'signin', { username, password });
      localStorage.setItem(AUTH_KEY, res.data.token);
      return processAxiosResponse(res);
    } catch (error) {
      console.error(
        'Error al intentar logear al usuario: ' + username + '. Error: ' + error
      );
      return processAxiosError(error);
    }
  }

  async logout() {
    localStorage.removeItem(AUTH_KEY);
  }

  async singup(userdata: object) {
    try {
      return await api.post(
        process.env.VUE_APP_BASE_URL_API + 'users',
        userdata
      );
    } catch (error) {
      console.error(
        'Error al crear el usuario con los datos: ' +
          userdata +
          '. Error: ' +
          error
      );
    }
  }
}

export default new LoginService();
