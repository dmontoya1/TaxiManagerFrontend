import API from "./api";

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  phone: string;
  role: "driver" | "boss"; // Nuevo campo
}

export const login = async (credentials: LoginData) => {
  const response = await API.post("/accounts/login/", credentials);
  const { access, refresh, user } = response.data;
  
  // Guardar el token y el rol en localStorage
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
  localStorage.setItem("user_role", user.role); // Guardar el rol del usuario
  
  return response.data;
};

export const register = async (data: {
  username: string;
  email: string;
  password: string;
  password2: string;
  phone: string
}) => {
  return await API.post("/accounts/register/", data);
};