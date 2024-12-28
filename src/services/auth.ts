import API from "./api";

export interface LoginData {
  username: string;
  password: string;
}

export const login = async (credentials: { username: string; password: string }) => {
  const response = await API.post("/accounts/login/", credentials);
  const { access } = response.data;

  // Guardar el token en localStorage
  localStorage.setItem("access_token", access);

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
  return await API.post("/accounts/register/", data);
};