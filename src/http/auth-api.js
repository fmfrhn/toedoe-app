// auth-api.js
import api from "./api";

export const csrfCookie = () => api.get("/auth/sanctum/csrf-token");

export const login = (credentials) => api.post("/api/auth/login", credentials);

export const register = (user) => api.post("/auth/register", user);

export const logout = () => api.post("/auth/logout");

export const getUser = () => api.get("/api/user");
