import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const instance = axios.create({
  baseURL: process.env.REACT_API_BASE_URL,
});
// міделвер для додовання токена якщо користувач ввійшов в систему
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
