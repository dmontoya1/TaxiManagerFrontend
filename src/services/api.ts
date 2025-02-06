import axios from "axios";

const API = axios.create({
  baseURL: 'https://taximanager-backend-1060073980134.us-central1.run.app/api',
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token de autenticación
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;