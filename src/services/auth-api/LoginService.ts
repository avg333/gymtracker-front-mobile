import { api } from 'src/boot/axios';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from 'src/types/auth-api/AuthServiceTypes';

const AUTH_KEY = 'gymtracker_token';

const API = 'auth-api/';

class LoginService {
  async login(request: LoginRequest): Promise<LoginResponse | null> {
    try {
      const res = await api.post(API + 'signin', request);
      localStorage.setItem(AUTH_KEY, res.data.token);
      return res.data;
    } catch (error) {
      console.error(
        `Error al intentar logear al usuario: ${request.username}. Error: `,
        error
      );
      return null;
    }
  }

  async logout() {
    localStorage.removeItem(AUTH_KEY);
  }

  async singup(request: RegisterRequest): Promise<RegisterResponse | null> {
    try {
      const res = await api.post(API + 'register', request);
      localStorage.setItem(AUTH_KEY, res.data.token);
      return res.data;
    } catch (error) {
      console.error(
        `Error al crear al usuario: ${request.username}. Error: `,
        error
      );
      return null;
    }
  }
}

export default new LoginService();
