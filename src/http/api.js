import axios from "axios";

// Authentication Axios
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const api = axios.create({
  // baseURL: "http://127.0.0.1:8000",
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true
});

export default api;
