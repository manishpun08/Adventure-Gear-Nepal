import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
});

// Add a request interceptor
$axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem("token");
  // token xa vane
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default $axios;
