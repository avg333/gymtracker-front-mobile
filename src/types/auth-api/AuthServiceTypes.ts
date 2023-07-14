export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  registerCode: string;
}

export interface LoginResponse {
  type: string;
  token: string;
  id: string;
  username: string;
}

export interface RegisterResponse {
  type: string;
  token: string;
  id: string;
  username: string;
}
