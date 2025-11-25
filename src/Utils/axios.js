// src/api/axios.js
import axios from "axios";

const getAuthToken = () => localStorage.getItem("auth_token");

const api = axios.create({
  baseURL: "https://mind-ease-backend-f68j.onrender.com/api/v1/user",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token dynamically via interceptor
api.interceptors.request.use((config) => {
  const token = getAuthToken(); // returns auth_token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
