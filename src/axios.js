import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4444",
});
// міделвер для додовання токена якщо користувач ввійшов в систему
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
