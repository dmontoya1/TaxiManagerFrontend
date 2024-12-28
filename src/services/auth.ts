import api from "./api";

export interface LoginData {
  username: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await api.post("/accounts/login/", data);
  localStorage.setItem("access_token", response.data.access);
  localStorage.setItem("refresh_token", response.data.refresh);
  return response.data;
};

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  phone: string;
}

export const register = async (data: RegisterData) => {
  return await api.post("/accounts/register/", data);
};